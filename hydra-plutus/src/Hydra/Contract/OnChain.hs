{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeApplications #-}
{-# OPTIONS_GHC -fno-specialize #-}

module Hydra.Contract.OnChain where

import PlutusPrelude (Generic)
import PlutusTx.Prelude

import Data.Aeson (ToJSON)
import Ledger hiding (out, value)
import Ledger.Constraints (TxConstraints, checkValidatorCtx)
import Ledger.Typed.Scripts (ScriptType (DatumType, RedeemerType))
import Ledger.Value (TokenName (..))
import PlutusTx.AssocMap (Map)
import PlutusTx.IsData.Class (IsData (..))

import Ledger.Constraints.TxConstraints (
  mustBeSignedBy,
  mustPayToOtherScript,
  mustPayToTheScript,
  mustProduceAtLeast,
  mustSpendAtLeast,
  mustSpendPubKeyOutput,
 )

import qualified Ledger.Typed.Scripts as Scripts
import qualified Ledger.Value as Value
import qualified PlutusTx
import qualified PlutusTx.AssocMap as Map

{- HLINT ignore "Use &&" -}

--
-- State-Machine
--

data HydraState
  = Initial [PubKeyHash]
  | Open [TxOut]
  deriving stock (Generic, Show)
  deriving anyclass (ToJSON)
PlutusTx.makeLift ''HydraState
PlutusTx.unstableMakeIsData ''HydraState

data HydraInput
  = CollectCom
  deriving (Generic, Show)
PlutusTx.makeLift ''HydraInput
PlutusTx.unstableMakeIsData ''HydraInput

νHydra ::
  MonetaryPolicyHash ->
  HydraState ->
  HydraInput ->
  ValidatorCtx ->
  Bool
νHydra policyId s i tx = case (s, i) of
  (Initial vks, CollectCom) ->
    let utxos = filterInputs (const True) tx
     in mustSatisfy @HydraInput @HydraState
          [ mustPayToTheScript (Open []) (foldMap snd utxos)
          , foldMap (mustForwardParticipationToken policyId) vks
          ]
          tx
          && tx `mustBeSignedByOneOf` vks
  _ ->
    False
{-# INLINEABLE νHydra #-}

data Hydra
instance Scripts.ScriptType Hydra where
  type DatumType Hydra = HydraState
  type RedeemerType Hydra = HydraInput

{- ORMOLU_DISABLE -}
νHydraInstance
  :: MonetaryPolicyHash
  -> Scripts.ScriptInstance Hydra
νHydraInstance policyId = Scripts.validator @Hydra
    ( $$(PlutusTx.compile [|| νHydra ||])
      `PlutusTx.applyCode` PlutusTx.liftCode policyId
    )
    $$(PlutusTx.compile [|| wrap ||])
    where
        wrap = Scripts.wrapValidator @(DatumType Hydra) @(RedeemerType Hydra)
{- ORMOLU_ENABLE -}

νHydraAddress :: MonetaryPolicyHash -> Address
νHydraAddress = Scripts.scriptAddress . νHydraInstance

νHydraHash :: MonetaryPolicyHash -> ValidatorHash
νHydraHash = Scripts.scriptHash . νHydraInstance
{-# INLINEABLE νHydraHash #-}

δOpen :: Datum
δOpen = Datum (toData (Open []))
{-# INLINEABLE δOpen #-}

ρInit :: Redeemer
ρInit = Redeemer (toData CollectCom)
{-# INLINEABLE ρInit #-}

--
-- Participation Tokens
--

type CurrencyId = Integer -- TODO: This should ultimately be a TxOutRef

validateHydraMonetaryPolicy :: CurrencyId -> PolicyCtx -> Bool
validateHydraMonetaryPolicy _ _ = True

{- ORMOLU_DISABLE -}
hydraMonetaryPolicy :: CurrencyId -> MonetaryPolicy
hydraMonetaryPolicy currencyId = mkMonetaryPolicyScript $
    $$(PlutusTx.compile
      [||Scripts.wrapMonetaryPolicy . validateHydraMonetaryPolicy||])
      `PlutusTx.applyCode` PlutusTx.liftCode currencyId
{- ORMOLU_ENABLE -}

hydraMonetaryPolicyHash :: CurrencyId -> MonetaryPolicyHash
hydraMonetaryPolicyHash = monetaryPolicyHash . hydraMonetaryPolicy

--
-- νInitial
--

-- | The Validator 'νInitial' ensures the following: either the output
-- is consumed by
--
-- 1. an SM abort transaction (see below) or
-- 2. a commit transaction, identified by:
--    (a) Having validator 'νCommit' in its only output
--    (b) A signature that verifies as valid with verification key k_i
--    (c) The presence of a single participation token in outputs
νInitial ::
  MonetaryPolicyHash ->
  ValidatorHash ->
  PubKeyHash ->
  () ->
  ValidatorCtx ->
  Bool
νInitial policyId script vk () tx =
  consumedByCommit || consumedByAbort
 where
  consumedByAbort = False -- FIXME
  consumedByCommit =
    let committed = filterInputs (not . hasParticipationToken policyId) tx
        participationToken = filterInputs (hasParticipationToken policyId) tx
     in case committed of
          [utxo] ->
            mustSatisfy @() @PubKeyHash
              [ mustBeSignedBy vk
              , mustCommitUtxos script utxo (<> foldMap snd participationToken)
              , mustForwardParticipationToken policyId vk
              ]
              tx
          _ ->
            False

data Initial
instance Scripts.ScriptType Initial where
  type DatumType Initial = PubKeyHash
  type RedeemerType Initial = ()

{- ORMOLU_DISABLE -}
νInitialInstance
  :: MonetaryPolicyHash
  -> Scripts.ScriptInstance Initial
νInitialInstance policyId = Scripts.validator @Initial
  ($$(PlutusTx.compile [||νInitial||])
      `PlutusTx.applyCode` PlutusTx.liftCode policyId
      `PlutusTx.applyCode` PlutusTx.liftCode (νCommitHash policyId)
  )
  $$(PlutusTx.compile [|| wrap ||])
 where
  wrap = Scripts.wrapValidator @(DatumType Initial) @(RedeemerType Initial)
{- ORMOLU_ENABLE -}

νInitialAddress :: MonetaryPolicyHash -> Address
νInitialAddress = Scripts.scriptAddress . νInitialInstance

νInitialHash :: MonetaryPolicyHash -> ValidatorHash
νInitialHash = Scripts.scriptHash . νInitialInstance
{-# INLINEABLE νInitialHash #-}

δInitial :: PubKeyHash -> Datum
δInitial = Datum . toData
{-# INLINEABLE δInitial #-}

ρInitial :: Redeemer
ρInitial = Redeemer (toData ())
{-# INLINEABLE ρInitial #-}

--
-- νCommit
--

-- |  To lock outputs for a Hydra head, the ith head member will attach a commit
-- transaction to the i-th output of the initial transaction.
-- Validator 'νCommit' ensures that the commit transaction correctly records the
-- partial UTxO set Ui committed by the party.
--
-- The data field of the output of the commit transaction is
--
--     Ui = makeUTxO(o_1 , . . . , o_m),
--
-- where the o_j are the outputs referenced by the commit transaction’s inputs
-- and makeUTxO stores pairs (out-ref_j , o_j) of outputs o_j with the
-- corresponding output reference out-ref_j .
νCommit ::
  MonetaryPolicyHash ->
  ValidatorHash ->
  TxOutRef ->
  PubKeyHash ->
  ValidatorCtx ->
  Bool
νCommit policyId νCollectComHash _out vk tx =
  consumedByCollectCom || consumedByAbort
 where
  consumedByAbort = False -- FIXME
  consumedByCollectCom =
    let utxos = filterInputs (const True) tx
     in mustSatisfy @PubKeyHash @TxOutRef
          [ mustCollectCommit νCollectComHash utxos
          , mustForwardParticipationToken policyId vk
          ]
          tx

data Commit
instance Scripts.ScriptType Commit where
  type DatumType Commit = TxOutRef
  type RedeemerType Commit = PubKeyHash

{- ORMOLU_DISABLE -}
νCommitInstance
  :: MonetaryPolicyHash
  -> Scripts.ScriptInstance Commit
νCommitInstance policyId = Scripts.validator @Commit
  ($$(PlutusTx.compile [|| νCommit ||])
    `PlutusTx.applyCode` PlutusTx.liftCode policyId
    `PlutusTx.applyCode` PlutusTx.liftCode (νHydraHash policyId)
  )
  $$(PlutusTx.compile [|| wrap ||])
 where
  wrap = Scripts.wrapValidator @(DatumType Commit) @(RedeemerType Commit)
{- ORMOLU_ENABLE -}

νCommitAddress :: MonetaryPolicyHash -> Address
νCommitAddress = Scripts.scriptAddress . νCommitInstance

νCommitHash :: MonetaryPolicyHash -> ValidatorHash
νCommitHash = Scripts.scriptHash . νCommitInstance
{-# INLINEABLE νCommitHash #-}

δCommit :: TxOutRef -> Datum
δCommit = Datum . toData
{-# INLINEABLE δCommit #-}

ρCommit :: PubKeyHash -> Redeemer
ρCommit = Redeemer . toData
{-# INLINEABLE ρCommit #-}

--
-- Helpers
--

-- | Small helper to make constraint validation a little easier to write.
mustSatisfy ::
  forall i o.
  IsData o =>
  [TxConstraints i o] ->
  ValidatorCtx ->
  Bool
mustSatisfy constraints =
  checkValidatorCtx (mconcat constraints)
{-# INLINEABLE mustSatisfy #-}

mustBeSignedByOneOf ::
  ValidatorCtx ->
  [PubKeyHash] ->
  Bool
mustBeSignedByOneOf tx vks =
  or ((`checkValidatorCtx` tx) . mustBeSignedBy @() @() <$> vks)
{-# INLINEABLE mustBeSignedByOneOf #-}

mustForwardParticipationToken ::
  forall i o.
  MonetaryPolicyHash ->
  PubKeyHash ->
  TxConstraints i o
mustForwardParticipationToken policyId vk =
  let participationToken = mkParticipationToken policyId vk
   in mconcat
        [ mustSpendAtLeast participationToken
        , mustProduceAtLeast participationToken
        ]
{-# INLINEABLE mustForwardParticipationToken #-}

-- TODO: According to the paper, this should also enforce that the transaction
-- only have a single output. Not only is this not possible to express with the
-- current 'TxConstraints' API, but also is this quite unpractical. In fact,
-- wallets will have to balance a transaction for fee, using extra inputs and
-- causing in most cases, a resulting change output.
--
-- I'd like therefore to challenge that 'single output' constraint with the
-- researchers. IMO, It would suffice to pay a certain amount to the commit
-- script, so long as this amount corresponds exactly to the balance of the UTxO
-- committed.
mustCommitUtxos ::
  forall i o.
  ValidatorHash ->
  (TxOutRef, Value) ->
  (Value -> Value) ->
  TxConstraints i o
mustCommitUtxos script (ref, value) total =
  mconcat
    [ mustPayToOtherScript script (δCommit ref) (total value)
    , mustSpendPubKeyOutput ref
    ]
{-# INLINEABLE mustCommitUtxos #-}

mustCollectCommit ::
  forall i o.
  ValidatorHash ->
  [(TxOutRef, Value)] ->
  TxConstraints i o
mustCollectCommit νCollectComHash utxos =
  let value = foldMap snd utxos
   in mustPayToOtherScript νCollectComHash δOpen value
{-# INLINEABLE mustCollectCommit #-}

mkParticipationToken :: MonetaryPolicyHash -> PubKeyHash -> Value
mkParticipationToken policyId vk =
  Value.singleton (Value.mpsSymbol policyId) (mkParticipationTokenName vk) 1
{-# INLINEABLE mkParticipationToken #-}

mkParticipationTokenName :: PubKeyHash -> TokenName
mkParticipationTokenName =
  TokenName . getPubKeyHash
{-# INLINEABLE mkParticipationTokenName #-}

filterInputs :: (TxInInfo -> Bool) -> ValidatorCtx -> [(TxOutRef, Value)]
filterInputs predicate =
  mapMaybe fn . txInfoInputs . valCtxTxInfo
 where
  fn info
    | predicate info = Just (txInInfoOutRef info, txInInfoValue info)
    | otherwise = Nothing
{-# INLINEABLE filterInputs #-}

hasParticipationToken :: MonetaryPolicyHash -> TxInInfo -> Bool
hasParticipationToken policyId input =
  let currency = Value.mpsSymbol policyId
   in currency `elem` symbols (txInInfoValue input)
{-# INLINEABLE hasParticipationToken #-}

-- NOTE: Not using `Value.symbols` because it is broken. In fact, a 'Value' may
-- carry null quantities of some particular tokens, leading to weird situation
-- where both:
--
--   - value == lovelaceValueOf n
--   - symbols value /= [adaSymbol]
--
-- are true at the same time. The equality makes no difference between the
-- absence of a certain symbol/token, and a null quantity of that symbol. Such
-- null quantities are probably constructed when moving values around but they
-- don't really mean anything so they should be discarded from views of the
-- value itself, like 'symbols'
symbols :: Value -> [CurrencySymbol]
symbols = foldr normalize [] . Map.toList . Value.getValue
 where
  normalize :: (CurrencySymbol, Map TokenName Integer) -> [CurrencySymbol] -> [CurrencySymbol]
  normalize (currency, tokens) acc
    | currency `elem` acc = acc
    | otherwise =
      let elems = snd <$> Map.toList tokens
       in if sum elems == 0 then acc else currency : acc
{-# INLINEABLE symbols #-}