"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[3437],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return h}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),h=a,m=d["".concat(s,".").concat(h)]||d[h]||u[h]||o;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8675:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return h},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={slug:12,title:"12. Top-down Test-driven Design\n",authors:[],tags:["Draft"]},s=void 0,p={permalink:"/hydra-poc/adr/12",source:"@site/adr/2021-11-25_012-top-down-test-driven-design.md",title:"12. Top-down Test-driven Design\n",description:"Status",date:"2021-11-25T00:00:00.000Z",formattedDate:"November 25, 2021",tags:[{label:"Draft",permalink:"/hydra-poc/adr/tags/draft"}],readingTime:1.47,truncated:!1,authors:[],frontMatter:{slug:"12",title:"12. Top-down Test-driven Design\n",authors:[],tags:["Draft"]},prevItem:{title:"11. Use cardano-api\n",permalink:"/hydra-poc/adr/11"},nextItem:{title:"13. Plutus Contracts Testing Strategy\n",permalink:"/hydra-poc/adr/13"}},c={authorsImageUrls:[]},u=[{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Consequences",id:"consequences",level:2}],d={toc:u};function h(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"status"},"Status"),(0,o.kt)("p",null,"Draft"),(0,o.kt)("h2",{id:"context"},"Context"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Test-driven_development"},"Test-Driven Development")," or ",(0,o.kt)("em",{parentName:"li"},"Test-Driven Design")," is a technique that helps team promotes simple and loosely coupled design, reduces the amount of code written, increases confidence in delivered software by providing a high level of code coverage by regression tests, and improves development speed through shorter feedback loop"),(0,o.kt)("li",{parentName:"ul"},"While initially focused on ",(0,o.kt)("em",{parentName:"li"},"unit tests"),", TDD has evolved over time to include higher-level tests like ",(0,o.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Behavior-driven_development"},"Behaviour Driven Development")," or ",(0,o.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Specification_by_example"},"Specification by Example"),", leading to comprehensive strategies like the ",(0,o.kt)("a",{parentName:"li",href:"http://tpierrain.blogspot.com/2021/03/outside-in-diamond-tdd-1-style-made.html"},"Outside-In Diamond TDD")),(0,o.kt)("li",{parentName:"ul"},"Being a foundational part of scalable applications based on Cardano blockchain, Hydra Head needs to be released early, often, and with high assurance in order to benefit from early adopters' feedback")),(0,o.kt)("h2",{id:"decision"},"Decision"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"Therefore")),(0,o.kt)("p",null,"We start as early as possible with ",(0,o.kt)("em",{parentName:"p"},"End-to-End")," tests, gradually making them more complex as we develop the various components but starting with something simple (like a system-level but dummy chain and hydra network)."),(0,o.kt)("p",null,"We flesh out other integration tests as needed, when we refine the technological stack used for the various bits and pieces."),(0,o.kt)("p",null,"We do most of our work in the ",(0,o.kt)("em",{parentName:"p"},"Executable Specifications")," layer while we are developing the core domain functions, eg. the Head protocol. The rationale being this is the level at which we can test the most complex behaviours in the fastest and safest possible way as we everything runs without external dependencies or can even run as pure code using io-sim."),(0,o.kt)("p",null,"We tactically drop to ",(0,o.kt)("em",{parentName:"p"},"Unit tests"),' level when dealing with the protocol\'s "fine prints".'),(0,o.kt)("h2",{id:"consequences"},"Consequences"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},'Development of each "feature", whether new or change to existing one, should start with a test defined at the highest level possible, but no higher'),(0,o.kt)("li",{parentName:"ul"},"A detailed presentation of the various testing layers is available in the ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/input-output-hk/hydra-poc/wiki/Testing-Strategy"},"wiki"))))}h.isMDXComponent=!0}}]);