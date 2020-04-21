(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{141:function(t,e,n){"use strict";n.r(e),n.d(e,"frontMatter",(function(){return h})),n.d(e,"metadata",(function(){return v})),n.d(e,"rightToc",(function(){return g})),n.d(e,"default",(function(){return w}));var a=n(1),o=n(6),r=n(0),i=n.n(r),c=n(142),s=n(152),l=n(151);const u=i.a.createContext(null);function d(){return i.a.useContext(u)}function p(t){const[e,n]=i.a.useState(0);return i.a.createElement(u.Provider,Object(a.a)({value:[e,n]},t))}function m(){const[t,e]=d();return i.a.createElement(l.a,{onClick:()=>e(t=>t+1)},"Increment ",t)}function b(){const[t]=d();return i.a.createElement("div",null,"The current counter count is ",t)}const f=()=>i.a.createElement(p,null,i.a.createElement(l.b,null,i.a.createElement(m,null),i.a.createElement(l.a,{lookAtMe:!0,onClick:()=>{Object(s.f)(i.a.createElement(b,null))}},"Display toast")),i.a.createElement(s.d,{autoClose:!1,draggable:!1}));var h={id:"render-what-you-want",title:"Render more than string",sidebar_label:"Render more than string"},v={id:"render-what-you-want",title:"Render more than string",description:"You can render any valid `ReactNode`: string, number, component... This is really straightforward. ",source:"@site/docs/render-what-you-want.md",permalink:"/react-toastify/render-what-you-want",editUrl:"https://github.com/fkhadra/react-toastify-doc/edit/master/docs/render-what-you-want.md",sidebar_label:"Render more than string",sidebar:"someSidebar",previous:{title:"Handling autoClose",permalink:"/react-toastify/autoClose"},next:{title:"Remove toast programmatically",permalink:"/react-toastify/remove-toast"}},g=[{value:"Basic example",id:"basic-example",children:[]},{value:"Awesome example \ud83d\ude80",id:"awesome-example-",children:[]}],j={rightToc:g};function w(t){var e=t.components,n=Object(o.a)(t,["components"]);return Object(c.b)("wrapper",Object(a.a)({},j,n,{components:e,mdxType:"MDXLayout"}),Object(c.b)("p",null,"You can render any valid ",Object(c.b)("inlineCode",{parentName:"p"},"ReactNode"),": string, number, component... This is really straightforward. "),Object(c.b)("h2",{id:"basic-example"},"Basic example"),Object(c.b)("div",{className:"admonition admonition-important alert alert--info"},Object(c.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(c.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(c.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"Important")),Object(c.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(c.b)("p",{parentName:"div"},"  When you render a component, a ",Object(c.b)("inlineCode",{parentName:"p"},"closeToast")," prop is injected into your component."))),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"import React from 'react';\nimport { ToastContainer, toast } from \"react-toastify\";\n\nconst Msg = ({ closeToast }) => (\n  <div>\n    Lorem ipsum dolor\n    <button>Retry</button>\n    <button onClick={closeToast}>Close</button>\n  </div>\n)\n\nfunction App(){\n  const displayMsg = () => {\n    toast(<Msg />) \n    // toast(Msg) would also work\n  }\n\n  return (\n  <div>\n    <button onClick={displayMsg}>Click me</button>\n    <ToastContainer />\n  </div>\n);\n}\n")),Object(c.b)("p",null,'You can also render a component using a function. More or less like a "render props":'),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"toast(({ closeToast }) => <div>Functional swag \ud83d\ude0e</div>);\n")),Object(c.b)("h2",{id:"awesome-example-"},"Awesome example \ud83d\ude80"),Object(c.b)("p",null,"In this example we will use react context to share state accross a component and a toast. Increment and display a toast at the same time to see how the state stay in sync !"),Object(c.b)(f,{mdxType:"ContextExample"}),Object(c.b)("pre",null,Object(c.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),'import React from "react";\nimport { ToastContainer, toast } from "react-toastify";\n\nconst CountContext = React.createContext(null);\n\nfunction useCount() {\n  const context = React.useContext(CountContext);\n  return context;\n}\n\nfunction CountProvider(props) {\n  const [count, setCount] = React.useState(0);\n\n  return <CountContext.Provider value={[count, setCount]} {...props} />;\n}\n\nfunction Counter() {\n  const [count, setCount] = useCount();\n  const increment = () => setCount((c) => c + 1);\n\n  return <Button onClick={increment}>Increment {count}</Button>;\n}\n\nfunction CountDisplay() {\n  const [count] = useCount();\n  return <div>The current counter count is {count}</div>;\n}\n\nexport const ContextExample = () => {\n  const displayToast = () => {\n    toast(<CountDisplay />);\n  };\n\n  return (\n    <CountProvider>\n      <Container>\n        <Counter />\n        <Button onClick={displayToast}>\n          Display toast\n        </Button>\n      </Container>\n      <ToastContainer autoClose={false} draggable={false} />\n    </CountProvider>\n  );\n};\n\n')),Object(c.b)("div",{className:"admonition admonition-important alert alert--info"},Object(c.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(c.b)("h5",{parentName:"div"},Object(c.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(c.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(c.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"Important")),Object(c.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(c.b)("p",{parentName:"div"},"  When you want to use a hook inside a toast you must do ",Object(c.b)("inlineCode",{parentName:"p"},"toast(<YourComponent />)"),"."),Object(c.b)("p",{parentName:"div"},"  ",Object(c.b)("inlineCode",{parentName:"p"},"toast(YourComponent)")," would not work because there is no way to know that this is a react element"))))}w.isMDXComponent=!0},151:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var a=n(146);const o=a.b`
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
`,r=a.a.button`
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
`,i=a.a.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 1rem auto;
`}}]);