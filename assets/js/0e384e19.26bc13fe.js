"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[9671],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(n),h=a,f=u["".concat(c,".").concat(h)]||u[h]||d[h]||o;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9881:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return h},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={sidebar_position:0},c="Overview",l={unversionedId:"intro",id:"intro",title:"Overview",description:"Hydra is the layer-two scalability solution for Cardano, which aims to increase the speed of transactions (low latency, high throughput) and minimize transaction cost.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/hydra-poc/docs/intro",editUrl:"https://github.com/input-output-hk/hydra-poc/tree/master/docs/docs/intro.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",next:{title:"Getting Started",permalink:"/hydra-poc/docs/getting-started/"}},p={},d=[],u={toc:d};function h(e){var t=e.components,s=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"overview"},"Overview"),(0,o.kt)("p",null,"Hydra is the layer-two scalability solution for Cardano, which aims to increase the speed of transactions (low latency, high throughput) and minimize transaction cost. "),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"https://eprint.iacr.org/2020/299.pdf"},"Hydra Head")," protocol is the first protocol of the Hydra family and embodies the foundation for more advanced deployment scenarios relying on isomorphic, multi-party state-channels. There exist various flavors and extensions of the Hydra Head protocol, but let's start by a look at a full life cycle of a basic Hydra Head and how it allows for isomorphic state transfer between layer 1 and layer 2."),(0,o.kt)("p",null,(0,o.kt)("img",{loading:"lazy",src:n(1190).Z,width:"960",height:"540"})),(0,o.kt)("p",null,"A Hydra Head is formed by a group of online and responsive participants. Participants ",(0,o.kt)("strong",{parentName:"p"},"init"),"ialize a Head by announcing several parameters on-chain including the participants list. Then each of the participants ",(0,o.kt)("strong",{parentName:"p"},"commit"),"s unspent transaction outputs (UTXO) from the Cardano main-chain to it, before all the UTXO are ",(0,o.kt)("strong",{parentName:"p"},"collect"),"ed and made available in a Hydra Head as initial state (",(0,o.kt)("inlineCode",{parentName:"p"},"U0"),"). At any moment before collecting, participants may also ",(0,o.kt)("strong",{parentName:"p"},"abort")," the process and recover their fund. "),(0,o.kt)("p",null,"While open, they can use the Hydra Head via a hydra-node to submit transactions over the Head network. Transactions have the same format and properties as on the main-chain: they are said ",(0,o.kt)("em",{parentName:"p"},"isomorphic"),". When UTXO entries are spent and new UTXO entries are created in a Hydra Head, all participants are required to acknowledge and agree on the new state in so-called snapshots (",(0,o.kt)("inlineCode",{parentName:"p"},"U1..Un"),")."),(0,o.kt)("p",null,"Any participant can ",(0,o.kt)("strong",{parentName:"p"},"close")," the Head using an agreed state, when for example they wish to cash-out on the mainnet or if another party misbehaves or stalls the Head evolution. There is a mechanism to ",(0,o.kt)("strong",{parentName:"p"},"contest")," the final state on the main chain. Ultimately, a ",(0,o.kt)("strong",{parentName:"p"},"fanout")," transaction distributes the final agreed state and makes available on the layer 1, what was only virtually existing in the head."))}h.isMDXComponent=!0},1190:function(e,t,n){t.Z=n.p+"assets/images/hydra-head-lifecycle-b8449385e9041a214bf8c6e52830de3c.svg"}}]);