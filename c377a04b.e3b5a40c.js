(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{138:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return B})),a.d(t,"metadata",(function(){return I})),a.d(t,"rightToc",(function(){return $})),a.d(t,"default",(function(){return D}));var n=a(1),o=a(6),i=a(0),l=a.n(i),r=a(142),c=(a(12),a(146));const s=c.a.input`
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
    background: ${e=>e.color};
  }
`,b=c.a.label`
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
    border: 2px solid ${e=>e.color};
    border-radius: 0.25em;
    z-index: -1;
  }

  &,
  &::before {
    transition: 0.25s all ease;
  }
`,p=c.a.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2em;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`,m=e=>{const t=e.color||"#e91e63";return l.a.createElement(l.a.Fragment,null,l.a.createElement(s,Object(n.a)({type:"radio"},e,{color:t})),l.a.createElement(b,{htmlFor:e.id,color:t},e.label||e.value))},d=({options:e,name:t,onChange:a,checked:n=!1})=>l.a.createElement(p,null,Object.keys(e).map(o=>{const i=e[o];return l.a.createElement(m,{id:i,name:t,onChange:a,checked:i===n,label:i,value:i})})),u=c.a.div`
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
`,h=c.a.span`
  color: ${e=>0===e.kind?"#66d9ef":"#a6e22e"};
`;function g(e,t){return t?l.a.createElement("div",null,l.a.createElement(h,{kind:1},e)):l.a.createElement("div",null,l.a.createElement(h,{kind:1},e),"={false}")}const f=({position:e,disableAutoClose:t,autoClose:a,hideProgressBar:n,newestOnTop:o,closeOnClick:i,pauseOnHover:r,rtl:c,pauseOnFocusLoss:s,isDefaultProps:b,draggable:p})=>l.a.createElement("div",null,l.a.createElement("h3",null,"Toast Container"),l.a.createElement(u,null,l.a.createElement("div",null,l.a.createElement("span",null,"<"),l.a.createElement(h,{kind:0},"ToastContainer")),l.a.createElement("div",null,l.a.createElement(h,{kind:1},"position"),`="${e}"`),l.a.createElement("div",null,l.a.createElement(h,{kind:1},"autoClose"),`={${!t&&a}}`),t?"":g("hideProgressBar",n),g("newestOnTop",o),g("closeOnClick",i),g("rtl",c),g("pauseOnFocusLoss",s),g("draggable",p),t?"":g("pauseOnHover",r),l.a.createElement("div",null,l.a.createElement("span",null,"/>")),b&&l.a.createElement("div",null,l.a.createElement("div",null,"{/* Same as */}"),l.a.createElement("span",null,"<"),l.a.createElement(h,{kind:0},"ToastContainer"),l.a.createElement("span",null," />"))));const v=({position:e,disableAutoClose:t,autoClose:a,hideProgressBar:n,closeOnClick:o,pauseOnHover:i,type:r,draggable:c,progress:s})=>l.a.createElement("div",null,l.a.createElement("h3",null,"Toast Emitter"),l.a.createElement(u,null,l.a.createElement("div",null,l.a.createElement(h,{kind:0},function(e){switch(e){case"default":default:return"toast";case"success":return"toast.success";case"error":return"toast.error";case"info":return"toast.info";case"warning":return"toast.warn"}}(r)),"('\ud83e\udd84 Wow so easy!', { "),l.a.createElement("div",null,l.a.createElement(h,{kind:1},"position"),`: "${e}"`,","),l.a.createElement("div",null,l.a.createElement(h,{kind:1},"autoClose"),`: ${!t&&a}`,","),l.a.createElement("div",null,l.a.createElement(h,{kind:1},"hideProgressBar"),`: ${n?"true":"false"}`,","),l.a.createElement("div",null,l.a.createElement(h,{kind:1},"closeOnClick"),`: ${o?"true":"false"}`,","),l.a.createElement("div",null,l.a.createElement(h,{kind:1},"pauseOnHover"),`: ${i?"true":"false"}`,","),l.a.createElement("div",null,l.a.createElement(h,{kind:1},"draggable"),`: ${c?"true":"false"}`,","),!Number.isNaN(s)&&l.a.createElement("div",null,l.a.createElement(h,{kind:1},"progress"),`: ${s}`,","),l.a.createElement("div",null,"});")));var O=a(152);const y=[{id:"disableAutoClose",label:"Disable auto-close"},{id:"hideProgressBar",label:"Hide progress bar(less fanciness!)"},{id:"newestOnTop",label:"Newest on top*"},{id:"closeOnClick",label:"Close on click"},{id:"pauseOnHover",label:"Pause delay on hover"},{id:"pauseOnFocusLoss",label:"Pause toast when the window loses focus"},{id:"rtl",label:"Right to left layout*"},{id:"draggable",label:"Allow to drag and close the toast"}],j={bounce:O.a,slide:O.c,zoom:O.e,flip:O.b},E=c.a.label`
  cursor: pointer;
`,w=({label:e,onChange:t,id:a,checked:n})=>l.a.createElement(E,{htmlFor:a},l.a.createElement("input",{id:a,type:"checkbox",name:a,checked:n,onChange:t}),e),C=c.a.div`
  width: 100%;
  margin-bottom: 1rem;
`,k=c.a.div`
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
`,x=({autoClose:e,disableAutoClose:t,handleAutoCloseDelay:a,handleInput:n,transition:o,limit:i,progress:r,handleCheckbox:c,...s})=>{const b={left:[],right:[]};return y.forEach(({id:e,label:t},a)=>{a%2==1?b.left.push(l.a.createElement("li",{key:e},l.a.createElement(w,{id:e,label:t,onChange:c,checked:s[e]}))):b.right.push(l.a.createElement("li",{key:e},l.a.createElement(w,{id:e,label:t,onChange:c,checked:s[e]})))}),l.a.createElement(C,null,l.a.createElement("h3",null,"Options"),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"autoClose"},"Delay",l.a.createElement("input",{type:"number",name:"autoClose",id:"autoClose",value:e,onChange:a,disabled:t}),"ms"),l.a.createElement("label",{htmlFor:"transition"},"Transition",l.a.createElement("select",{name:"transition",id:"transition",onChange:n,value:o},Object.keys(j).map(e=>l.a.createElement("option",{key:e,value:e},e)))),l.a.createElement("label",{htmlFor:"progress"},"Progress",l.a.createElement("input",{type:"number",name:"progress",id:"progress",value:r,onChange:n,placeholder:"0..1",min:"0",max:"1"})),l.a.createElement("label",{htmlFor:"limit"},"Limit",l.a.createElement("input",{type:"number",name:"limit",id:"limit",value:i,onChange:n}))),l.a.createElement(k,null,l.a.createElement("ul",null,b.left),l.a.createElement("ul",null,b.right)))};var N=a(151);const z=({clearAll:e,handleReset:t,showToast:a,updateToast:n})=>l.a.createElement(N.b,null,l.a.createElement(N.a,{lookAtMe:!0,onClick:a},l.a.createElement("span",{role:"img","aria-label":"show alert"},"\ud83d\ude80")," ","Show Toast"),l.a.createElement(N.a,{onClick:n},l.a.createElement("span",{role:"img","aria-label":"update"})," Update"),l.a.createElement(N.a,{onClick:e},l.a.createElement("span",{role:"img","aria-label":"clear all"},"\ud83d\udca9")," ","Clear All"),l.a.createElement(N.a,{onClick:t},l.a.createElement("span",{role:"img","aria-label":"reset options"},"\ud83d\udd04")," ","Reset"));function T(){return{...O.d.defaultProps,transition:"bounce",type:"default",progress:void 0,disableAutoClose:!1,limit:0}}const F=c.a.section`
  display: flex;
  justify-content: space-between;
  flex-direction: "row";
  margin-bottom: 1rem;
  flex-wrap: wrap;
`,A=c.a.main`
  margin-top: 1rem;
`;function P(){const[e,t]=Object(i.useState)(()=>T()),a=Object(i.useRef)(),o=a=>t({...e,[a.target.name]:"limit"===a.target.name?parseInt(a.target.value,10):a.target.value});return l.a.createElement(A,null,l.a.createElement(F,null,l.a.createElement(f,Object(n.a)({},e,{isDefaultProps:"top-right"===e.position&&5e3===e.autoClose&&!e.disableAutoClose&&!e.hideProgressBar&&!e.newestOnTop&&!e.rtl&&e.pauseOnFocusLoss&&e.pauseOnHover&&e.closeOnClick&&e.draggable})),l.a.createElement(v,e)),l.a.createElement("div",null,l.a.createElement("h3",null,"Position"),l.a.createElement(d,{options:O.f.POSITION,name:"position",checked:e.position,onChange:o})),l.a.createElement("div",null,l.a.createElement("h3",null,"Type"),l.a.createElement(d,{options:O.f.TYPE,name:"type",checked:e.type,onChange:o})),l.a.createElement(x,Object(n.a)({},e,{handleAutoCloseDelay:a=>{t({...e,autoClose:a.target.value>0?parseInt(a.target.value,10):1})},handleInput:o,handleCheckbox:a=>t({...e,[a.target.name]:!e[a.target.name]})})),l.a.createElement(z,{clearAll:()=>O.f.dismiss(),handleReset:()=>{t(T())},showToast:()=>{a.current="default"===e.type?Object(O.f)("\ud83e\udd84 Wow so easy !",{progress:e.progress}):O.f[e.type]("\ud83d\ude80 Wow so easy !",{progress:e.progress})},updateToast:()=>O.f.update(a.current,{progress:e.progress})}),l.a.createElement(O.d,Object(n.a)({},e,{transition:j[e.transition],autoClose:!e.disableAutoClose&&e.autoClose})))}var B={id:"introduction",title:"React-toastify",sidebar_label:"Introduction"},I={id:"introduction",title:"React-toastify",description:"[![Financial Contributors on Open Collective](https://opencollective.com/react-toastify/all/badge.svg?label=financial+contributors)](https://opencollective.com/react-toastify) ![Travis (.org)](https://img.shields.io/travis/fkhadra/react-toastify.svg?label=%F0%9F%9A%A7Build&style=for-the-badge)",source:"@site/docs/index.md",permalink:"/react-toastify/introduction",editUrl:"https://github.com/fkhadra/react-toastify-doc/edit/master/docs/index.md",sidebar_label:"Introduction",sidebar:"someSidebar",next:{title:"Installation",permalink:"/react-toastify/installation"}},$=[{value:"The playground",id:"the-playground",children:[]},{value:"Features",id:"features",children:[]},{value:"Contribute",id:"contribute",children:[]},{value:"Contributors",id:"contributors",children:[{value:"Code Contributors",id:"code-contributors",children:[]},{value:"Financial Contributors",id:"financial-contributors",children:[]}]},{value:"License",id:"license",children:[]}],M={rightToc:$};function D(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(n.a)({},M,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://opencollective.com/react-toastify"}),Object(r.b)("img",Object(n.a)({parentName:"a"},{src:"https://opencollective.com/react-toastify/all/badge.svg?label=financial+contributors",alt:"Financial Contributors on Open Collective"})))," ",Object(r.b)("img",Object(n.a)({parentName:"p"},{src:"https://img.shields.io/travis/fkhadra/react-toastify.svg?label=%F0%9F%9A%A7Build&style=for-the-badge",alt:"Travis (.org)"})),"\n",Object(r.b)("img",Object(n.a)({parentName:"p"},{src:"https://img.shields.io/npm/dm/react-toastify.svg?label=%E2%8F%ACdownloads&style=for-the-badge",alt:"npm"})),"\n",Object(r.b)("img",Object(n.a)({parentName:"p"},{src:"https://img.shields.io/npm/v/react-toastify.svg?style=for-the-badge",alt:"npm"})),"\n",Object(r.b)("img",Object(n.a)({parentName:"p"},{src:"https://img.shields.io/npm/l/react-toastify.svg?label=%F0%9F%93%9Clicense&style=for-the-badge",alt:"NPM"})),"\n",Object(r.b)("img",Object(n.a)({parentName:"p"},{src:"https://img.shields.io/coveralls/github/fkhadra/react-toastify.svg?label=%E2%9B%B1coverage&style=for-the-badge",alt:"Coveralls github"}))),Object(r.b)("h2",{id:"the-playground"},"The playground"),Object(r.b)(P,{mdxType:"App"}),Object(r.b)("div",{className:"admonition admonition-info alert alert--info"},Object(r.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(r.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(r.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"Important")),Object(r.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(r.b)("p",{parentName:"div"},"By default, all toasts will inherit ToastContainer's props. Props defined on toast supersede ToastContainer's props. Props marked with * can only be set on the ToastContainer. The demo is not exhaustive, check the doc for more!"))),Object(r.b)("h2",{id:"features"},"Features"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Easy to set up for real, you can make it work in less than 10sec!"),Object(r.b)("li",{parentName:"ul"},"Super easy to customize"),Object(r.b)("li",{parentName:"ul"},"RTL support"),Object(r.b)("li",{parentName:"ul"},"Swipe to close \ud83d\udc4c"),Object(r.b)("li",{parentName:"ul"},"Can display a react component inside the toast!"),Object(r.b)("li",{parentName:"ul"},"Has ",Object(r.b)("inlineCode",{parentName:"li"},"onOpen")," and ",Object(r.b)("inlineCode",{parentName:"li"},"onClose")," hooks. Both can access the props passed to the react component rendered inside the toast"),Object(r.b)("li",{parentName:"ul"},"Can remove a toast programmatically"),Object(r.b)("li",{parentName:"ul"},"Define behavior per toast"),Object(r.b)("li",{parentName:"ul"},"Pause toast when the window loses focus \ud83d\udc41"),Object(r.b)("li",{parentName:"ul"},"Fancy progress bar to display the remaining time"),Object(r.b)("li",{parentName:"ul"},"Possibility to update a toast"),Object(r.b)("li",{parentName:"ul"},"You can control the progress bar a la ",Object(r.b)("inlineCode",{parentName:"li"},"nprogress")," \ud83d\ude32"),Object(r.b)("li",{parentName:"ul"},"You can limit the number of toast displayed at the same time"),Object(r.b)("li",{parentName:"ul"},"Dark mode \ud83c\udf12"),Object(r.b)("li",{parentName:"ul"},"And much more !")),Object(r.b)("h2",{id:"contribute"},"Contribute"),Object(r.b)("p",null,"Show your \u2764\ufe0f and support by giving a \u2b50. Any suggestions are welcome! Take a look at the contributing guide."),Object(r.b)("p",null,"You can also find me on ",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://www.reactiflux.com/"}),"reactiflux"),". My pseudo is Fadi."),Object(r.b)("h2",{id:"contributors"},"Contributors"),Object(r.b)("h3",{id:"code-contributors"},"Code Contributors"),Object(r.b)("p",null,"This project exists thanks to all the people who contribute. [",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"CONTRIBUTING.md"}),"Contribute"),"]."),Object(r.b)("a",{href:"https://github.com/fkhadra/react-toastify/graphs/contributors"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/contributors.svg?width=890&button=false"})),Object(r.b)("h3",{id:"financial-contributors"},"Financial Contributors"),Object(r.b)("p",null,"Become a financial contributor and help us sustain our community. [",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://opencollective.com/react-toastify/contribute"}),"Contribute"),"]"),Object(r.b)("h4",{id:"individuals"},"Individuals"),Object(r.b)("a",{href:"https://opencollective.com/react-toastify"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/individuals.svg?width=890"})),Object(r.b)("h4",{id:"organizations"},"Organizations"),Object(r.b)("p",null,"Support this project with your organization. Your logo will show up here with a link to your website. [",Object(r.b)("a",Object(n.a)({parentName:"p"},{href:"https://opencollective.com/react-toastify/contribute"}),"Contribute"),"]"),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/0/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/0/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/1/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/1/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/2/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/2/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/3/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/3/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/4/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/4/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/5/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/5/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/6/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/6/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/7/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/7/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/8/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/8/avatar.svg"})),Object(r.b)("a",{href:"https://opencollective.com/react-toastify/organization/9/website"},Object(r.b)("img",{src:"https://opencollective.com/react-toastify/organization/9/avatar.svg"})),Object(r.b)("h2",{id:"license"},"License"),Object(r.b)("p",null,"Licensed under MIT"))}D.isMDXComponent=!0},151:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return l}));var n=a(146);const o=n.b`
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
`,i=n.a.button`
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
    animation: ${o} 20s linear infinite;
    opacity: ${e=>e.lookAtMe?1:0};
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
`,l=n.a.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 1rem auto;
`}}]);