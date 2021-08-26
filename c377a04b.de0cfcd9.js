(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{142:function(t,e,a){"use strict";a.r(e),a.d(e,"frontMatter",(function(){return D})),a.d(e,"metadata",(function(){return L})),a.d(e,"rightToc",(function(){return R})),a.d(e,"default",(function(){return X}));var o=a(1),i=a(0),r=a.n(i),n=a(146),s=(a(12),a(151));const l=s.a.input`
  position: absolute;
  opacity: 0;
  z-index: -1;
  & + label::before {
    border-radius: 1em;
  }
  &:checked + label {
    padding-left: 1em;
    color: #fff;
  }
  &:checked + label:before {
    top: 0;
    width: 100%;
    height: 2em;
    background: ${t=>t.color};
  }
`,c=s.a.label`
  font-weight: 300;
  .group {
    display: flex;
    align-items: center;
    margin-bottom: 2em;
  }

  position: relative;
  margin-right: 1em;
  padding-left: 2em;
  padding-right: 1em;
  line-height: 2;
  cursor: pointer;
  &:before {
    box-sizing: border-box;
    content: ' ';
    position: absolute;
    top: 0.3em;
    left: 0;
    display: block;
    width: 1.4em;
    height: 1.4em;
    border: 2px solid ${t=>t.color};
    border-radius: 0.25em;
    z-index: -1;
  }

  &,
  &::before {
    transition: 0.25s all ease;
  }
`,f=s.a.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2em;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`,m=t=>{const e=t.color||"#e91e63";return r.a.createElement(r.a.Fragment,null,r.a.createElement(l,Object(o.a)({type:"radio"},t,{color:e})),r.a.createElement(c,{htmlFor:t.id,color:e},t.label||t.value))},p=({options:t,name:e,onChange:a,checked:o=!1})=>r.a.createElement(f,null,Object.keys(t).map(i=>{const n=t[i];return r.a.createElement(m,{id:n,name:e,onChange:a,checked:n===o,label:n,value:n})})),d=s.a.div`
  font-family: "Source Code Pro", Menlo, Monaco, Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
  font-style: normal;
  border-left: 3px solid #a9547e;
  padding-left: 20px;
  background: #222;
  color: #fff;
  min-height: 270px;
  min-width: 270px;
  padding: 25px;

  & div {
    margin-left: 20px;
  }
  & div:first-child,
  & div:last-child {
    margin: 0;
  }
`,b=s.a.span`
  color: ${t=>0===t.kind?"#66d9ef":"#a6e22e"};
`;function u(t,e){return e?r.a.createElement("div",null,r.a.createElement(b,{kind:1},t)):r.a.createElement("div",null,r.a.createElement(b,{kind:1},t),"={false}")}const y=({position:t,disableAutoClose:e,autoClose:a,hideProgressBar:o,newestOnTop:i,closeOnClick:n,pauseOnHover:s,rtl:l,pauseOnFocusLoss:c,isDefaultProps:f,draggable:m})=>r.a.createElement("div",null,r.a.createElement("h3",null,"Toast Container"),r.a.createElement(d,null,r.a.createElement("div",null,r.a.createElement("span",null,"<"),r.a.createElement(b,{kind:0},"ToastContainer")),r.a.createElement("div",null,r.a.createElement(b,{kind:1},"position"),`="${t}"`),r.a.createElement("div",null,r.a.createElement(b,{kind:1},"autoClose"),`={${!e&&a}}`),e?"":u("hideProgressBar",o),u("newestOnTop",i),u("closeOnClick",n),u("rtl",l),u("pauseOnFocusLoss",c),u("draggable",m),e?"":u("pauseOnHover",s),r.a.createElement("div",null,r.a.createElement("span",null,"/>")),f&&r.a.createElement("div",null,r.a.createElement("div",null,"{/* Same as */}"),r.a.createElement("span",null,"<"),r.a.createElement(b,{kind:0},"ToastContainer"),r.a.createElement("span",null," />"))));const g=({position:t,disableAutoClose:e,autoClose:a,hideProgressBar:o,closeOnClick:i,pauseOnHover:n,type:s,draggable:l,progress:c})=>r.a.createElement("div",null,r.a.createElement("h3",null,"Toast Emitter"),r.a.createElement(d,null,r.a.createElement("div",null,r.a.createElement(b,{kind:0},function(t){switch(t){case"default":default:return"toast";case"success":return"toast.success";case"error":return"toast.error";case"info":return"toast.info";case"warning":return"toast.warn";case"dark":return"toast.dark"}}(s)),"('\ud83e\udd84 Wow so easy!', { "),r.a.createElement("div",null,r.a.createElement(b,{kind:1},"position"),`: "${t}"`,","),r.a.createElement("div",null,r.a.createElement(b,{kind:1},"autoClose"),`: ${!e&&a}`,","),r.a.createElement("div",null,r.a.createElement(b,{kind:1},"hideProgressBar"),`: ${o?"true":"false"}`,","),r.a.createElement("div",null,r.a.createElement(b,{kind:1},"closeOnClick"),`: ${i?"true":"false"}`,","),r.a.createElement("div",null,r.a.createElement(b,{kind:1},"pauseOnHover"),`: ${n?"true":"false"}`,","),r.a.createElement("div",null,r.a.createElement(b,{kind:1},"draggable"),`: ${l?"true":"false"}`,","),!Number.isNaN(c)&&r.a.createElement("div",null,r.a.createElement(b,{kind:1},"progress"),`: ${c}`,","),r.a.createElement("div",null,"});")));var h=a(167),_=a(199);const v=[{id:"disableAutoClose",label:"Disable auto-close"},{id:"hideProgressBar",label:"Hide progress bar(less fanciness!)"},{id:"newestOnTop",label:"Newest on top* (play nice with bottom toast)"},{id:"closeOnClick",label:"Close on click"},{id:"pauseOnHover",label:"Pause delay on hover"},{id:"pauseOnFocusLoss",label:"Pause toast when the window loses focus"},{id:"rtl",label:"Right to left layout*"},{id:"draggable",label:"Allow to drag and close the toast"}],x={bounce:h.a,slide:h.c,zoom:h.e,flip:h.b},T=s.a.label`
  cursor: pointer;
`,O=({label:t,onChange:e,id:a,checked:o})=>r.a.createElement(T,{htmlFor:a},r.a.createElement("input",{id:a,type:"checkbox",name:a,checked:o,onChange:e}),t),k=s.a.div`
  width: 100%;
  margin-bottom: 1rem;
`,w=s.a.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
  & ul {
    list-style: none;
    padding: 0;
  }
`,j=({autoClose:t,disableAutoClose:e,handleAutoCloseDelay:a,handleInput:o,transition:i,limit:n,progress:s,handleCheckbox:l,...c})=>{const f={left:[],right:[]};return v.forEach(({id:t,label:e},a)=>{a%2==1?f.left.push(r.a.createElement("li",{key:t},r.a.createElement(O,{id:t,label:e,onChange:l,checked:c[t]}))):f.right.push(r.a.createElement("li",{key:t},r.a.createElement(O,{id:t,label:e,onChange:l,checked:c[t]})))}),r.a.createElement(k,null,r.a.createElement("h3",null,"Options"),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"autoClose"},"Delay",r.a.createElement("input",{type:"number",name:"autoClose",id:"autoClose",value:t,onChange:a,disabled:e}),"ms"),r.a.createElement("label",{htmlFor:"transition"},"Transition",r.a.createElement("select",{name:"transition",id:"transition",onChange:o,value:i},Object.keys(x).map(t=>r.a.createElement("option",{key:t,value:t},t)))),r.a.createElement("label",{htmlFor:"progress"},"Progress",r.a.createElement("input",{type:"number",name:"progress",id:"progress",value:s,onChange:o,placeholder:"0..1",min:"0",max:"1"})),r.a.createElement("label",{htmlFor:"limit"},"Limit",r.a.createElement("input",{type:"number",name:"limit",id:"limit",value:n,onChange:o}))),r.a.createElement(w,null,r.a.createElement("ul",null,f.left),r.a.createElement("ul",null,f.right)))};var E=a(164);const C=({clearAll:t,handleReset:e,showToast:a,updateToast:o,showPromise:i})=>r.a.createElement(E.b,null,r.a.createElement(E.a,{lookAtMe:!0,onClick:a},r.a.createElement("span",{role:"img","aria-label":"show alert"},"\ud83d\ude80")," ","Show Toast"),r.a.createElement(E.a,{onClick:i},"Promise"),r.a.createElement(E.a,{onClick:o},r.a.createElement("span",{role:"img","aria-label":"update"})," Update"),r.a.createElement(E.a,{onClick:t},r.a.createElement("span",{role:"img","aria-label":"clear all"},"\ud83d\udca9")," ","Clear All"),r.a.createElement(E.a,{onClick:e},r.a.createElement("span",{role:"img","aria-label":"reset options"},"\ud83d\udd04")," ","Reset"));function z(){return{...h.d.defaultProps,transition:"bounce",type:"default",progress:void 0,disableAutoClose:!1,limit:0}}const N=s.a.section`
  display: flex;
  justify-content: space-between;
  flex-direction: "row";
  margin-bottom: 1rem;
  flex-wrap: wrap;
`,I=s.a.main`
  margin-top: 1rem;
`,P={light:"light",dark:"dark",colored:"colored"};let F=!0;function A(){const[t,e]=Object(i.useState)(()=>z()),a=Object(i.useRef)();Object(i.useEffect)(()=>{Object(_.injectStyle)()},[]);const n=a=>e({...t,[a.target.name]:"limit"===a.target.name?parseInt(a.target.value,10):a.target.value});return r.a.createElement(I,null,r.a.createElement(N,null,r.a.createElement(y,Object(o.a)({},t,{isDefaultProps:"top-right"===t.position&&5e3===t.autoClose&&!t.disableAutoClose&&!t.hideProgressBar&&!t.newestOnTop&&!t.rtl&&t.pauseOnFocusLoss&&t.pauseOnHover&&t.closeOnClick&&t.draggable&&"light"===t.theme})),r.a.createElement(g,t)),r.a.createElement("div",null,r.a.createElement("h3",null,"Position"),r.a.createElement(p,{options:h.f.POSITION,name:"position",checked:t.position,onChange:n})),r.a.createElement("div",null,r.a.createElement("h3",null,"Type"),r.a.createElement(p,{options:h.f.TYPE,name:"type",checked:t.type,onChange:n})),r.a.createElement("div",null,r.a.createElement("h3",null,"Theme"),r.a.createElement(p,{options:P,name:"theme",checked:t.theme,onChange:n})),r.a.createElement(j,Object(o.a)({},t,{handleAutoCloseDelay:a=>{e({...t,autoClose:a.target.value>0?parseInt(a.target.value,10):1})},handleInput:n,handleCheckbox:a=>e({...t,[a.target.name]:!t[a.target.name]})})),r.a.createElement(C,{clearAll:()=>h.f.dismiss(),handleReset:()=>{e(z())},showToast:()=>{a.current="default"===t.type?Object(h.f)("\ud83e\udd84 Wow so easy !",{progress:t.progress}):h.f[t.type]("Wow so easy !",{progress:t.progress})},showPromise:()=>{h.f.promise(new Promise((t,e)=>{setTimeout(F?t:e,3e3),F=!F}),{error:"Promise rejected",success:"Promise resolved",pending:"Promise is pending..."})},updateToast:()=>h.f.update(a.current,{progress:t.progress})}),r.a.createElement(h.d,Object(o.a)({},t,{transition:x[t.transition],autoClose:!t.disableAutoClose&&t.autoClose})))}const D={id:"introduction",title:"React-toastify",sidebar_label:"Introduction"},L={id:"introduction",title:"React-toastify",description:"[![Financial Contributors on Open Collective](https://opencollective.com/react-toastify/all/badge.svg?label=financial+contributors)](https://opencollective.com/react-toastify) ![Travis (.org)](https://img.shields.io/travis/fkhadra/react-toastify.svg?label=%F0%9F%9A%A7Build&style=for-the-badge)",source:"@site/docs/index.md",permalink:"/react-toastify/introduction",editUrl:"https://github.com/fkhadra/react-toastify-doc/edit/master/docs/index.md",sidebar_label:"Introduction",sidebar:"someSidebar",next:{title:"Installation",permalink:"/react-toastify/installation"}},R=[{value:"The playground",id:"the-playground",children:[]},{value:"Features",id:"features",children:[]},{value:"Contribute",id:"contribute",children:[]},{value:"Contributors",id:"contributors",children:[{value:"Code Contributors",id:"code-contributors",children:[]},{value:"Financial Contributors",id:"financial-contributors",children:[]}]},{value:"License",id:"license",children:[]}],B={rightToc:R};function X({components:t,...e}){return Object(n.b)("wrapper",Object(o.a)({},B,e,{components:t,mdxType:"MDXLayout"}),Object(n.b)("p",null,Object(n.b)("a",Object(o.a)({parentName:"p"},{href:"https://opencollective.com/react-toastify"}),Object(n.b)("img",Object(o.a)({parentName:"a"},{src:"https://opencollective.com/react-toastify/all/badge.svg?label=financial+contributors",alt:"Financial Contributors on Open Collective"})))," ",Object(n.b)("img",Object(o.a)({parentName:"p"},{src:"https://img.shields.io/travis/fkhadra/react-toastify.svg?label=%F0%9F%9A%A7Build&style=for-the-badge",alt:"Travis (.org)"})),"\n",Object(n.b)("img",Object(o.a)({parentName:"p"},{src:"https://img.shields.io/npm/dm/react-toastify.svg?label=%E2%8F%ACdownloads&style=for-the-badge",alt:"npm"})),"\n",Object(n.b)("img",Object(o.a)({parentName:"p"},{src:"https://img.shields.io/npm/v/react-toastify.svg?style=for-the-badge",alt:"npm"})),"\n",Object(n.b)("img",Object(o.a)({parentName:"p"},{src:"https://img.shields.io/npm/l/react-toastify.svg?label=%F0%9F%93%9Clicense&style=for-the-badge",alt:"NPM"})),"\n",Object(n.b)("img",Object(o.a)({parentName:"p"},{src:"https://img.shields.io/coveralls/github/fkhadra/react-toastify.svg?label=%E2%9B%B1coverage&style=for-the-badge",alt:"Coveralls github"}))),Object(n.b)("h2",{id:"the-playground"},"The playground"),Object(n.b)(A,{mdxType:"App"}),Object(n.b)("div",{className:"admonition admonition-info alert alert--info"},Object(n.b)("div",Object(o.a)({parentName:"div"},{className:"admonition-heading"}),Object(n.b)("h5",{parentName:"div"},Object(n.b)("span",Object(o.a)({parentName:"h5"},{className:"admonition-icon"}),Object(n.b)("svg",Object(o.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(n.b)("path",Object(o.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"Important")),Object(n.b)("div",Object(o.a)({parentName:"div"},{className:"admonition-content"}),Object(n.b)("p",{parentName:"div"},"By default, all toasts will inherit ToastContainer's props. Props defined on toast supersede ToastContainer's props. Props marked with * can only be set on the ToastContainer. The demo is not exhaustive, check the doc for more!"))),Object(n.b)("h2",{id:"features"},"Features"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"Easy to set up for real, you can make it work in less than 10sec!"),Object(n.b)("li",{parentName:"ul"},"Super easy to customize"),Object(n.b)("li",{parentName:"ul"},"RTL support"),Object(n.b)("li",{parentName:"ul"},"Swipe to close \ud83d\udc4c"),Object(n.b)("li",{parentName:"ul"},"Beautiful by default"),Object(n.b)("li",{parentName:"ul"},"Can choose swipe direction"),Object(n.b)("li",{parentName:"ul"},"Super easy to use an animation of your choice"),Object(n.b)("li",{parentName:"ul"},"Can display a react component inside the toast!"),Object(n.b)("li",{parentName:"ul"},"Has ",Object(n.b)("inlineCode",{parentName:"li"},"onOpen")," and ",Object(n.b)("inlineCode",{parentName:"li"},"onClose")," hooks. Both can access the props passed to the react component rendered inside the toast"),Object(n.b)("li",{parentName:"ul"},"Can remove a toast programmatically"),Object(n.b)("li",{parentName:"ul"},"Define behavior per toast"),Object(n.b)("li",{parentName:"ul"},"Pause toast when the window loses focus \ud83d\udc41"),Object(n.b)("li",{parentName:"ul"},"Fancy progress bar to display the remaining time"),Object(n.b)("li",{parentName:"ul"},"Possibility to update a toast"),Object(n.b)("li",{parentName:"ul"},"You can control the progress bar a la ",Object(n.b)("inlineCode",{parentName:"li"},"nprogress")," \ud83d\ude32"),Object(n.b)("li",{parentName:"ul"},"You can limit the number of toast displayed at the same time"),Object(n.b)("li",{parentName:"ul"},"Dark mode \ud83c\udf12"),Object(n.b)("li",{parentName:"ul"},"Colored theme"),Object(n.b)("li",{parentName:"ul"},"Promise support"),Object(n.b)("li",{parentName:"ul"},"And much more !")),Object(n.b)("h2",{id:"contribute"},"Contribute"),Object(n.b)("p",null,"Show your \u2764\ufe0f and support by giving a \u2b50. Any suggestions are welcome! Take a look at the contributing guide."),Object(n.b)("p",null,"You can also find me on ",Object(n.b)("a",Object(o.a)({parentName:"p"},{href:"https://www.reactiflux.com/"}),"reactiflux"),". My pseudo is Fadi."),Object(n.b)("h2",{id:"contributors"},"Contributors"),Object(n.b)("h3",{id:"code-contributors"},"Code Contributors"),Object(n.b)("p",null,"This project exists thanks to all the people who contribute. [",Object(n.b)("a",Object(o.a)({parentName:"p"},{href:"CONTRIBUTING.md"}),"Contribute"),"]."),Object(n.b)("a",{href:"https://github.com/fkhadra/react-toastify/graphs/contributors"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/contributors.svg?width=890&button=false"})),Object(n.b)("h3",{id:"financial-contributors"},"Financial Contributors"),Object(n.b)("p",null,"Become a financial contributor and help us sustain our community. [",Object(n.b)("a",Object(o.a)({parentName:"p"},{href:"https://opencollective.com/react-toastify/contribute"}),"Contribute"),"]"),Object(n.b)("h4",{id:"individuals"},"Individuals"),Object(n.b)("a",{href:"https://opencollective.com/react-toastify"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/individuals.svg?width=890"})),Object(n.b)("h4",{id:"organizations"},"Organizations"),Object(n.b)("p",null,"Support this project with your organization. Your logo will show up here with a link to your website. [",Object(n.b)("a",Object(o.a)({parentName:"p"},{href:"https://opencollective.com/react-toastify/contribute"}),"Contribute"),"]"),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/0/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/0/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/1/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/1/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/2/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/2/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/3/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/3/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/4/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/4/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/5/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/5/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/6/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/6/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/7/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/7/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/8/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/8/avatar.svg"})),Object(n.b)("a",{href:"https://opencollective.com/react-toastify/organization/9/website"},Object(n.b)("img",{src:"https://opencollective.com/react-toastify/organization/9/avatar.svg"})),Object(n.b)("h2",{id:"license"},"License"),Object(n.b)("p",null,"Licensed under MIT"))}X.isMDXComponent=!0},164:function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return n}));var o=a(151);const i=o.b`
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
`,r=o.a.button`
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  height: 2.8rem;
  letter-spacing: 0.1rem;
  line-height: 2.8rem;
  padding: 0 1.8rem;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  z-index: 0;
  color: #fff;
  border-color: transparent;

  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${i} 20s linear infinite;
    opacity: ${t=>t.lookAtMe?1:0};
    transition: opacity 0.3s ease-in-out;
  }

  &:active {
    color: #000;
  }

  &:active:after {
    background: transparent;
  }

  &:hover:before {
    opacity: 1;
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
  }
`,n=o.a.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 1rem auto;
`},199:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.injectStyle=function(){var t=document.createElement("style");t.innerText=":root{--toastify-color-light:#fff;--toastify-color-dark:#121212;--toastify-color-info:#3498db;--toastify-color-success:#07bc0c;--toastify-color-warning:#f1c40f;--toastify-color-error:#e74c3c;--toastify-color-transparent:hsla(0,0%,100%,.7);--toastify-icon-color-info:var(--toastify-color-info);--toastify-icon-color-success:var(--toastify-color-success);--toastify-icon-color-warning:var(--toastify-color-warning);--toastify-icon-color-error:var(--toastify-color-error);--toastify-toast-width:320px;--toastify-toast-background:#fff;--toastify-toast-min-height:64px;--toastify-toast-max-height:800px;--toastify-font-family:sans-serif;--toastify-z-index:9999;--toastify-text-color-light:#757575;--toastify-text-color-dark:#fff;--toastify-text-color-info:#fff;--toastify-text-color-success:#fff;--toastify-text-color-warning:#fff;--toastify-text-color-error:#fff;--toastify-spinner-color:#616161;--toastify-spinner-color-empty-area:#e0e0e0;--toastify-color-progress-light:linear-gradient(90deg,#4cd964,#5ac8fa,#007aff,#34aadc,#5856d6,#ff2d55);--toastify-color-progress-dark:#bb86fc;--toastify-color-progress-info:var(--toastify-color-info);--toastify-color-progress-success:var(--toastify-color-success);--toastify-color-progress-warning:var(--toastify-color-warning);--toastify-color-progress-error:var(--toastify-color-error)}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translateZ(var(--toastify-z-index));position:fixed;padding:4px;width:var(--toastify-toast-width);box-sizing:border-box;color:#fff}.Toastify__toast-container--top-left{top:1em;left:1em}.Toastify__toast-container--top-center{top:1em;left:50%;transform:translateX(-50%)}.Toastify__toast-container--top-right{top:1em;right:1em}.Toastify__toast-container--bottom-left{bottom:1em;left:1em}.Toastify__toast-container--bottom-center{bottom:1em;left:50%;transform:translateX(-50%)}.Toastify__toast-container--bottom-right{bottom:1em;right:1em}@media only screen and (max-width:480px){.Toastify__toast-container{width:100vw;padding:0;left:0;margin:0}.Toastify__toast-container--top-center,.Toastify__toast-container--top-left,.Toastify__toast-container--top-right{top:0;transform:translateX(0)}.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-right{bottom:0;transform:translateX(0)}.Toastify__toast-container--rtl{right:0;left:auto}}.Toastify__toast{position:relative;min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:8px;border-radius:4px;box-shadow:0 1px 10px 0 rgba(0,0,0,.1),0 2px 15px 0 rgba(0,0,0,.05);display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;max-height:var(--toastify-toast-max-height);overflow:hidden;font-family:var(--toastify-font-family);cursor:pointer;direction:ltr}.Toastify__toast--rtl{direction:rtl}.Toastify__toast-body{margin:auto 0;-ms-flex:1 1 auto;flex:1 1 auto;padding:6px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.Toastify__toast-icon{-webkit-margin-end:10px;margin-inline-end:10px;width:20px;-ms-flex-negative:0;flex-shrink:0;display:-ms-flexbox;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.7s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}@media only screen and (max-width:480px){.Toastify__toast{margin-bottom:0;border-radius:0}}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--colored.Toastify__toast--default,.Toastify__toast-theme--light{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;-ms-flex-item-align:start;align-self:flex-start}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:focus,.Toastify__close-button:hover{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:5px;z-index:var(--toastify-z-index);opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:auto;transform-origin:right}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--bottom-left,.Toastify__bounce-enter--top-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--bottom-right,.Toastify__bounce-enter--top-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--bottom-left,.Toastify__bounce-exit--top-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--bottom-right,.Toastify__bounce-exit--top-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:perspective(400px)}30%{transform:perspective(400px) rotateX(-20deg);opacity:1}to{transform:perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translateZ(0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translateZ(0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translateZ(0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translateZ(0)}}@keyframes Toastify__slideOutRight{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(110%,0,0)}}@keyframes Toastify__slideOutLeft{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(-110%,0,0)}}@keyframes Toastify__slideOutDown{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translateZ(0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--bottom-left,.Toastify__slide-enter--top-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--bottom-right,.Toastify__slide-enter--top-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--bottom-left,.Toastify__slide-exit--top-left{animation-name:Toastify__slideOutLeft}.Toastify__slide-exit--bottom-right,.Toastify__slide-exit--top-right{animation-name:Toastify__slideOutRight}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown}@keyframes Toastify__spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}",document.head.appendChild(t)}}}]);