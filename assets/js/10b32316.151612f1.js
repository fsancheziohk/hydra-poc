"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[6236],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,f=m["".concat(l,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(f,o(o({ref:t},s),{},{components:n})):r.createElement(f,o({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8685:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return c},metadata:function(){return p},toc:function(){return u}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],c={slug:2,title:"2. Reactive Core\n",authors:[],tags:["Accepted"]},l=void 0,p={permalink:"/hydra-poc/adr/2",source:"@site/adr/2021-06-06_002-reactive-core.md",title:"2. Reactive Core\n",description:"Status",date:"2021-06-06T00:00:00.000Z",formattedDate:"June 6, 2021",tags:[{label:"Accepted",permalink:"/hydra-poc/adr/tags/accepted"}],readingTime:.985,truncated:!1,authors:[],frontMatter:{slug:"2",title:"2. Reactive Core\n",authors:[],tags:["Accepted"]},prevItem:{title:"1. Record Architecture Decisions\n",permalink:"/hydra-poc/adr/1"},nextItem:{title:"3. Asynchronous Duplex Client API",permalink:"/hydra-poc/adr/3"}},s={authorsImageUrls:[]},u=[{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Decision",id:"decision",level:2},{value:"Consequences",id:"consequences",level:2}],m={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"status"},"Status"),(0,i.kt)("p",null,"Accepted"),(0,i.kt)("h2",{id:"context"},"Context"),(0,i.kt)("p",null,"We are looking for a way of expressing the Hydra Head protocol logic in a Hydra node."),(0,i.kt)("p",null,"The Hydra Head protocol is defined as a ",(0,i.kt)("em",{parentName:"p"},"State machine")," in the paper, whose transitions are inputs that come from different sources which can emit outputs to other instances of the state machine or the mainchain. See the ",(0,i.kt)("a",{parentName:"p",href:"https://iohk.io/en/research/library/papers/hydrafast-isomorphic-state-channels/"},"FC2021")," paper for details"),(0,i.kt)("p",null,"It should also be easy to review / feed-back to researchers."),(0,i.kt)("p",null,"We are familiar with React's ",(0,i.kt)("a",{parentName:"p",href:"https://react-redux.js.org/"},"redux")," way of structuring applications, which in turn is inspired by ",(0,i.kt)("a",{parentName:"p",href:"https://guide.elm-lang.org/architecture/"},"The Elm Architecture")," which itself is a simplification of ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Functional_reactive_programming"},"Functional Reactive Programming")," principles."),(0,i.kt)("p",null,"We have experienced benefits with ",(0,i.kt)("em",{parentName:"p"},"Event Sourcing")," in the domain of persistence in the past"),(0,i.kt)("h2",{id:"decision"},"Decision"),(0,i.kt)("p",null,"Implements the Hydra Head core logic as a ",(0,i.kt)("em",{parentName:"p"},"loop")," that:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Consumes ",(0,i.kt)("em",{parentName:"li"},"input events")," from an event ",(0,i.kt)("em",{parentName:"li"},"queue"),","),(0,i.kt)("li",{parentName:"ol"},"Applies each ",(0,i.kt)("em",{parentName:"li"},"event")," to the current ",(0,i.kt)("em",{parentName:"li"},"state")," yielding potentially an ",(0,i.kt)("em",{parentName:"li"},"updated state")," and a sequence of ",(0,i.kt)("em",{parentName:"li"},"effects"),","),(0,i.kt)("li",{parentName:"ol"},"Execute all ",(0,i.kt)("em",{parentName:"li"},"effects"),".")),(0,i.kt)("h2",{id:"consequences"},"Consequences"),(0,i.kt)("p",null,"The internal state is only ever changed through ",(0,i.kt)("em",{parentName:"p"},"Events"),"."),(0,i.kt)("p",null,"The core state machine ",(0,i.kt)("em",{parentName:"p"},"transition")," function ",(0,i.kt)("em",{parentName:"p"},"is pure")," and reviewing it requires minimal Haskell knowledge."),(0,i.kt)("p",null,"Side-effects are all handled at the level of the ",(0,i.kt)("inlineCode",{parentName:"p"},"Node"),"."))}d.isMDXComponent=!0}}]);