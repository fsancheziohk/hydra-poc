"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[8981],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,f=d["".concat(l,".").concat(m)]||d[m]||s[m]||o;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5692:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return s}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],c={slug:10,title:"10. Use Direct Connection to `cardano-node`\n",authors:[],tags:["Accepted"]},l=void 0,u={permalink:"/hydra-poc/adr/10",source:"@site/adr/2021-10-23_010-use-direct-chain.md",title:"10. Use Direct Connection to `cardano-node`\n",description:"Status",date:"2021-10-23T00:00:00.000Z",formattedDate:"October 23, 2021",tags:[{label:"Accepted",permalink:"/hydra-poc/adr/tags/accepted"}],readingTime:1.03,truncated:!1,authors:[],frontMatter:{slug:"10",title:"10. Use Direct Connection to `cardano-node`\n",authors:[],tags:["Accepted"]},prevItem:{title:"9. Simplify Logging\n",permalink:"/hydra-poc/adr/9"},nextItem:{title:"11. Use cardano-api\n",permalink:"/hydra-poc/adr/11"}},p={authorsImageUrls:[]},s=[{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Consequences",id:"consequences",level:2}],d={toc:s};function m(e){var t=e.components,c=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,c,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"status"},"Status"),(0,o.kt)("p",null,"Accepted"),(0,o.kt)("h2",{id:"context"},"Context"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"On-Chain Validation is a critical part of the Hydra protocol, it requires both the ability to ",(0,o.kt)("em",{parentName:"li"},"submit")," transactions to the ",(0,o.kt)("em",{parentName:"li"},"Layer 1")," chain advancing the state of a Head, and ",(0,o.kt)("em",{parentName:"li"},"observing")," those transactions as the ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/input-output-hk/plutus"},"Plutus")," contracts are validated"),(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/input-output-hk/plutus-apps"},"Plutus Application Framework"),' is expected to provide the necessary machinery to allow "Smart Contracts" applications to interact with the chain but it\'s still under active development and not ready for deployment on-chain'),(0,o.kt)("li",{parentName:"ul"},'We want to gather feedback as early as possible and deliver a fully functional Hydra Head node for early adopters to test on a "real" chain (testnet)'),(0,o.kt)("li",{parentName:"ul"},"Our experiment connecting directly to a Cardano node has been conclusive. We can:",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Connect to a node using local protocols,"),(0,o.kt)("li",{parentName:"ul"},"Build and submit Head transactions triggering smart contracts validation, and"),(0,o.kt)("li",{parentName:"ul"},"Observe transactions using chain-sync protocol.")))),(0,o.kt)("h2",{id:"decision"},"Decision"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Therefore")),(0,o.kt)("p",null,"For the time being, until ",(0,o.kt)("em",{parentName:"p"},"Plutus Application Framework")," is released, we will implement on-chain interaction of Hydra nodes ",(0,o.kt)("em",{parentName:"p"},"directly"),", connecting to a Cardano node through a ",(0,o.kt)("em",{parentName:"p"},"local socket"),"."),(0,o.kt)("h2",{id:"consequences"},"Consequences"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Limit Hydra dependencies to ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/input-output-hk/plutus"},"plutus")," repository"),(0,o.kt)("li",{parentName:"ul"},"Remove all PAB-related code as well as off-chain ",(0,o.kt)("inlineCode",{parentName:"li"},"Contract"),"s code and related dependencies"),(0,o.kt)("li",{parentName:"ul"},"An updated architecture diagram:")),(0,o.kt)("p",null,(0,o.kt)("img",{loading:"lazy",src:n(4086).Z,width:"3420",height:"1827"})))}m.isMDXComponent=!0},4086:function(e,t,n){t.Z=n.p+"assets/images/hydra-architecture-direct-f8764611c3938f0155b30eba9f6339f2.jpg"}}]);