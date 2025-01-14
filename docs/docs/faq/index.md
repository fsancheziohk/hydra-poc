# Frequently Asked Questions

> And their answers!

<details>
  <summary>When Hydra?</summary>
  
  Our [roadmap](https://github.com/orgs/input-output-hk/projects/21) is publicly available on Github. Note that there are multiple sections behind tabs to view it from different angles (as release packages, as quarters, etc...)  
</details>

<details>
  <summary>When is the Hydra Head protocol a good fit?</summary>

  The Hydra Head protocol is well-suited for any situation where a known set of participants know each other well-enough to agree on building a network but don't trust one another enough with funds management to do so without ways to secure their assets backed by the possibility to settle disputes on the main chain.
</details>

<details>
  <summary>Can a third-party run a Hydra node on behalf of a wallet owners (e.g. running managed Hydra Heads)?</summary>

  Totally! This is similar for instance to [Phoenix](https://phoenix.acinq.co/) in Bitcoin Lightning: a non-custodial managed lightning node. As an end-user, one still have full control on the keys and funds, but the underlying infrastructure is managed on one's behalf (provided fees). This however implies some form of trust between the service provider and the user. Indeed, the user implicitly trusts the service provider to, for instance, properly handle contestations and closure of a head.   
</details>

<details>
  <summary>What is the relationship between Hydra heads and Hydra nodes?</summary>

  It is (at least\*) a **one-to-many** relationship. Each Hydra head is comprised of several Hydra nodes. We are currently aiming for up to 100 nodes per head as a stretch goal. Heads are independent and form an isolated network. It is possible to have infinitely many heads running in parallel. 

  _(\*) It is possible to make Hydra nodes support multiple heads making it a many-to-many relationship._
</details>
