"use strict";(self.webpackChunkreact_toastify_doc=self.webpackChunkreact_toastify_doc||[]).push([[3011],{824:(s,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>e,toc:()=>d});const e=JSON.parse('{"id":"how-to-style","title":"How to style","description":"Read first Use your own component if you haven\'t","source":"@site/docs/how-to-style.mdx","sourceDirName":".","slug":"/how-to-style","permalink":"/react-toastify/how-to-style","draft":false,"unlisted":false,"editUrl":"https://github.com/fkhadra/react-toastify-doc/edit/master/docs/how-to-style.mdx","tags":[],"version":"current","frontMatter":{"id":"how-to-style","title":"How to style","sidebar_label":"How to style \u2728"},"sidebar":"someSidebar","previous":{"title":"Use Your Own Component","permalink":"/react-toastify/use-your-own-component"},"next":{"title":"Positioning toast","permalink":"/react-toastify/positioning-toast"}}');var n=o(5105),a=o(9621),i=o(4637);const r={id:"how-to-style",title:"How to style",sidebar_label:"How to style \u2728"},c=void 0,l={},d=[{value:"Bring your own component",id:"bring-your-own-component",level:2},{value:"Custom progress bar",id:"custom-progress-bar",level:2},{value:"Override css variables",id:"override-css-variables",level:2},{value:"Override existing css classes",id:"override-existing-css-classes",level:2},{value:"Passing css classes to component",id:"passing-css-classes-to-component",level:2},{value:"Css classes as function",id:"css-classes-as-function",level:2},{value:"How to style with styled-components",id:"how-to-style-with-styled-components",level:2},{value:"Extend existing css classes",id:"extend-existing-css-classes",level:3},{value:"Pass css classes to props",id:"pass-css-classes-to-props",level:3},{value:"Mobile",id:"mobile",level:2}];function f(s){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...s.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.admonition,{title:"Important",type:"important",children:(0,n.jsxs)(t.p,{children:["Read first ",(0,n.jsx)(t.a,{href:"./use-your-own-component",children:"Use your own component"})," if you haven't"]})}),"\n",(0,n.jsx)(t.h2,{id:"bring-your-own-component",children:"Bring your own component"}),"\n",(0,n.jsx)(t.p,{children:"This is by far the most flexible and the best approach when you need to fully customize the notifications. As you can see, you can accomplish a lot."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"customization FTW",src:o(4290).A+"",width:"1240",height:"857"})}),"\n",(0,n.jsx)(t.admonition,{type:"info",children:(0,n.jsxs)(t.p,{children:["Head to ",(0,n.jsx)(t.a,{href:"https://stackblitz.com/edit/react-toastify-how-to-style?file=src%2FApp.tsx",children:"stackblitz"})," to check the code."]})}),"\n",(0,n.jsx)(t.p,{children:"Let's review together the one with the split buttons for example. I'm using tailwind, but you can write your own css of course."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"split buttons",src:o(1397).A+"",width:"824",height:"186"})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-tsx",children:'import { ToastContainer, ToastContentProps, toast } from \'react-toastify\';\n\nexport default function App() {\n  const notify = () => {\n    toast(SplitButtons, {\n      closeButton: false,\n      // remove the padding on the toast wrapper\n      // make it 400px width\n      // add a thin purple border because I like purple\n      className: \'p-0 w-[400px] border border-purple-600/40\',\n      ariaLabel: \'Email received\',\n    });\n  };\n\n  return (\n    <div className="grid place-items-center h-dvh bg-zinc-950/80">\n      <Button onClick={notify}>Notify !</Button>\n      <ToastContainer autoClose={false} />\n    </div>\n  );\n}\n\n\nfunction SplitButtons({ closeToast }: ToastContentProps) {\n  return (\n    // using a grid with 3 columns \n    <div className="grid grid-cols-[1fr_1px_80px] w-full">\n      <div className="flex flex-col p-4">\n        <h3 className="text-zinc-800 text-sm font-semibold">Email Received</h3>\n        <p className="text-sm">You received a new email from somebody</p>\n      </div>\n      {/* that\'s the vertical line which separate the text and the buttons*/}\n      <div className="bg-zinc-900/20 h-full" />\n      <div className="grid grid-rows-[1fr_1px_1fr] h-full">\n        {/*specifying a custom closure reason that can be used with the onClose callback*/}\n        <button onClick={() => closeToast("reply")} className="text-purple-600">\n          Reply\n        </button>\n        <div className="bg-zinc-900/20 w-full" />\n        {/*specifying a custom closure reason that can be used with the onClose callback*/}\n        <button onClick={() => closeToast("ignore")}>Ignore</button>\n      </div>\n    </div>\n  );\n}\n'})}),"\n",(0,n.jsx)(t.h2,{id:"custom-progress-bar",children:"Custom progress bar"}),"\n",(0,n.jsxs)(t.p,{children:["When rendering your custom component, the ",(0,n.jsx)(t.code,{children:"isPaused"})," prop is injected. It let you know when you should play or pause your animation for the progress bar."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-tsx",children:"function App() {\n  const notify = () => {\n    toast(CustomComponent, {\n      autoClose: 8000,\n      // removes the built-in progress bar\n      customProgressBar: true\n    });\n  };\n\n  return (\n    <div>\n      <button onClick={notify}>notify</button>\n      <ToastContainer />\n    </div>\n  );\n}\n\n// isPaused is now available in your component\n// it tells you when to pause the animation: pauseOnHover, pauseOnFocusLoss etc...\nfunction CustomComponent({ isPaused, closeToast }: ToastContentProps) {\n  return (\n    <div>\n      <span>Hello</span>\n      <MyCustomProgressBar isPaused={isPaused} onAnimationEnd={() => closeToast()} />\n    </div>\n  );\n}\n"})}),"\n",(0,n.jsx)(i.C,{url:"https://stackblitz.com/edit/react-toastify-custom-progress-bar"}),"\n",(0,n.jsx)(t.h2,{id:"override-css-variables",children:"Override css variables"}),"\n",(0,n.jsx)(t.p,{children:"Below the list of the css variables that are exposed by the library."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-css",children:":root {\n  --toastify-color-light: #fff;\n  --toastify-color-dark: #121212;\n  --toastify-color-info: #3498db;\n  --toastify-color-success: #07bc0c;\n  --toastify-color-warning: #f1c40f;\n  --toastify-color-error: hsl(6, 78%, 57%);\n  --toastify-color-transparent: rgba(255, 255, 255, 0.7);\n  \n  --toastify-icon-color-info: var(--toastify-color-info);\n  --toastify-icon-color-success: var(--toastify-color-success);\n  --toastify-icon-color-warning: var(--toastify-color-warning);\n  --toastify-icon-color-error: var(--toastify-color-error);\n  \n  --toastify-container-width: fit-content;\n  --toastify-toast-width: 320px;\n  --toastify-toast-offset: 16px;\n  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));\n  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));\n  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));\n  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));\n  --toastify-toast-background: #fff;\n  --toastify-toast-padding: 14px;\n  --toastify-toast-min-height: 64px;\n  --toastify-toast-max-height: 800px;\n  --toastify-toast-bd-radius: 6px;\n  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);\n  --toastify-font-family: sans-serif;\n  --toastify-z-index: 9999;\n  --toastify-text-color-light: #757575;\n  --toastify-text-color-dark: #fff;\n\n  /* Used only for colored theme */\n  --toastify-text-color-info: #fff;\n  --toastify-text-color-success: #fff;\n  --toastify-text-color-warning: #fff;\n  --toastify-text-color-error: #fff;\n\n  --toastify-spinner-color: #616161;\n  --toastify-spinner-color-empty-area: #e0e0e0;\n  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);\n  --toastify-color-progress-dark: #bb86fc;\n  --toastify-color-progress-info: var(--toastify-color-info);\n  --toastify-color-progress-success: var(--toastify-color-success);\n  --toastify-color-progress-warning: var(--toastify-color-warning);\n  --toastify-color-progress-error: var(--toastify-color-error);\n  /* used to control the opacity of the progress trail */\n  --toastify-color-progress-bgo: 0.2;\n}\n"})}),"\n",(0,n.jsx)(t.h2,{id:"override-existing-css-classes",children:"Override existing css classes"}),"\n",(0,n.jsx)(t.p,{children:"If overriding the css variables and using your own component are not enough for you, you can override the existing CSS classes. Below, a list of the CSS classes used."}),"\n",(0,n.jsx)(t.admonition,{title:"Info",type:"info",children:(0,n.jsx)(t.p,{children:"Classes used for animation and media query are omitted."})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-css",children:"/** Used to define container behavior: width, position: fixed etc... **/\n.Toastify__toast-container {\n}\n\n/** Used to define the position of the ToastContainer **/\n.Toastify__toast-container--top-left {\n}\n.Toastify__toast-container--top-center {\n}\n.Toastify__toast-container--top-right {\n}\n.Toastify__toast-container--bottom-left {\n}\n.Toastify__toast-container--bottom-center {\n}\n.Toastify__toast-container--bottom-right {\n}\n\n/** Classes for the displayed toast **/\n.Toastify__toast {\n}\n.Toastify__toast--rtl {\n}\n\n/** Used to position the icon **/\n.Toastify__toast-icon {\n}\n\n/** handle the notification color and the text color based on the theme **/\n.Toastify__toast-theme--dark {\n}\n.Toastify__toast-theme--light {\n}\n.Toastify__toast-theme--colored.Toastify__toast--default {\n}\n.Toastify__toast-theme--colored.Toastify__toast--info {\n}\n.Toastify__toast-theme--colored.Toastify__toast--success {\n}\n.Toastify__toast-theme--colored.Toastify__toast--warning {\n}\n.Toastify__toast-theme--colored.Toastify__toast--error {\n}\n\n.Toastify__progress-bar {\n}\n.Toastify__progress-bar--rtl {\n}\n.Toastify__progress-bar-theme--light {\n}\n.Toastify__progress-bar-theme--dark {\n}\n.Toastify__progress-bar--info {\n}\n.Toastify__progress-bar--success {\n}\n.Toastify__progress-bar--warning {\n}\n.Toastify__progress-bar--error {\n}\n/** colored notifications share the same progress bar color **/\n.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,\n.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,\n.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,\n.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {\n}\n\n/** Classes for the close button. Better use your own closeButton **/\n.Toastify__close-button {\n}\n.Toastify__close-button--default {\n}\n.Toastify__close-button > svg {\n}\n.Toastify__close-button:hover,\n.Toastify__close-button:focus {\n}\n"})}),"\n",(0,n.jsx)(t.h2,{id:"passing-css-classes-to-component",children:"Passing css classes to component"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"ToastContainer"})," accept the following props for styling:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"className: applied to the container"}),"\n",(0,n.jsx)(t.li,{children:"toastClassName: applied on the toast wrapper"}),"\n",(0,n.jsx)(t.li,{children:"progressClassName: applied on the progress bar"}),"\n"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsx",children:'<ToastContainer className="foo" style={{ width: "2000px" }} />\n'})}),"\n",(0,n.jsx)(t.p,{children:"When displaying a notification you can also set some css classes:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["className: applied on the toast wrapper (this override ",(0,n.jsx)(t.code,{children:"toastClassName"})," is set by the container )"]}),"\n",(0,n.jsxs)(t.li,{children:["progressClassName: applied on the progress bar (this override ",(0,n.jsx)(t.code,{children:"progressClassName"})," is set by the container )"]}),"\n"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsx",children:'toast("Custom style", {\n  className: "black-background",\n  progressClassName: "fancy-progress-bar",\n});\n'})}),"\n",(0,n.jsx)(t.h2,{id:"css-classes-as-function",children:"Css classes as function"}),"\n",(0,n.jsx)(t.p,{children:"You can also provide a function. This is what it looks like with tailwind css"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsx",children:'const contextClass = {\n  success: "bg-blue-600",\n  error: "bg-red-600",\n  info: "bg-gray-600",\n  warning: "bg-orange-400",\n  default: "bg-indigo-600",\n  dark: "bg-white-600 font-gray-300",\n};\n\nconst App = () => {\n  return (\n    <>\n      <Main />\n      <ToastContainer\n        toastClassName={(context) =>\n          contextClass[context?.type || "default"] +\n          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"\n        }\n        position="bottom-left"\n        autoClose={3000}\n      />\n    </>\n  );\n};\n'})}),"\n",(0,n.jsx)(t.h2,{id:"how-to-style-with-styled-components",children:"How to style with styled-components"}),"\n",(0,n.jsx)(t.h3,{id:"extend-existing-css-classes",children:"Extend existing css classes"}),"\n",(0,n.jsxs)(t.p,{children:["You can override the css classes with ",(0,n.jsx)(t.code,{children:"styled-components"}),". You can find the list of the css classes used ",(0,n.jsx)(t.a,{href:"/react-toastify/how-to-style#override-existing-css-classes",children:"here"}),". This is where you will also define the style for your notification."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsx",children:'import React from "react";\nimport styled from "styled-components";\nimport { ToastContainer } from "react-toastify";\n\nconst StyledContainer = styled(ToastContainer)`\n  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity\n  &&&.Toastify__toast-container {\n  }\n  .Toastify__toast {\n  }\n  .Toastify__toast-body {\n  }\n  .Toastify__progress-bar {\n  }\n`;\n'})}),"\n",(0,n.jsx)(t.h3,{id:"pass-css-classes-to-props",children:"Pass css classes to props"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsx",children:'const StyledToastContainer = styled(ToastContainer).attrs({\n  className: "toast-container",\n  toastClassName: "toast",\n  bodyClassName: "body",\n  progressClassName: "progress",\n})`\n  /* .toast-container */\n  width: 100%;\n\n  /* .toast is passed to toastClassName */\n  .toast {\n    background-color: var(--color-black);\n  }\n\n  button[aria-label="close"] {\n    display: none;\n  }\n\n  /* .body is passed to bodyClassName */\n  .body {\n  }\n\n  /* .progress is passed to progressClassName */\n  .progress {\n  }\n`;\n'})}),"\n",(0,n.jsx)(t.h2,{id:"mobile",children:"Mobile"}),"\n",(0,n.jsx)(t.p,{children:"On mobile, the toast will take all the available width."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:"https://user-images.githubusercontent.com/5574267/28754040-ae7195ea-753d-11e7-86e1-f23c5e6bc531.gif",alt:"react toastiy mobile"})})]})}function p(s={}){const{wrapper:t}={...(0,a.R)(),...s.components};return t?(0,n.jsx)(t,{...s,children:(0,n.jsx)(f,{...s})}):f(s)}},4637:(s,t,o)=>{o.d(t,{C:()=>n});var e=o(5105);function n(s){let{url:t}=s;return(0,e.jsx)("iframe",{src:t+"?embed=1&file=src%2FApp.tsx&hideExplorer=1&theme=dark&view=preview&hideNavigation=1",style:{width:"100%",height:"600px",border:0,borderRadius:"4px",overflow:"hidden"}})}},4290:(s,t,o)=>{o.d(t,{A:()=>e});const e=o.p+"assets/images/customization-cd456b577c98ddff63db05aa8b9460bd.png"},1397:(s,t,o)=>{o.d(t,{A:()=>e});const e=o.p+"assets/images/split-buttons-9f54edcb32b79cd6917aaa0404276ab3.png"},9621:(s,t,o)=>{o.d(t,{R:()=>i,x:()=>r});var e=o(8101);const n={},a=e.createContext(n);function i(s){const t=e.useContext(a);return e.useMemo((function(){return"function"==typeof s?s(t):{...t,...s}}),[t,s])}function r(s){let t;return t=s.disableParentContext?"function"==typeof s.components?s.components(n):s.components||n:i(s.components),e.createElement(a.Provider,{value:t},s.children)}}}]);