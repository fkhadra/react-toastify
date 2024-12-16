"use strict";(self.webpackChunkreact_toastify_doc=self.webpackChunkreact_toastify_doc||[]).push([[4395],{1102:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"use-a-controlled-progress-bar","title":"Use a controlled progress bar","description":"Imagine you want to see the progress of a file upload. The example below features axios, but it works with anything!","source":"@site/docs/controlled-progress-bar.md","sourceDirName":".","slug":"/use-a-controlled-progress-bar","permalink":"/react-toastify/use-a-controlled-progress-bar","draft":false,"unlisted":false,"editUrl":"https://github.com/fkhadra/react-toastify-doc/edit/master/docs/controlled-progress-bar.md","tags":[],"version":"current","frontMatter":{"id":"use-a-controlled-progress-bar","title":"Use a controlled progress bar","sidebar_label":"Use a controlled progress bar"},"sidebar":"someSidebar","previous":{"title":"Limit the number of toast displayed","permalink":"/react-toastify/limit-the-number-of-toast-displayed"},"next":{"title":"Update a toast","permalink":"/react-toastify/update-toast"}}');var r=o(5105),s=o(9621);const a={id:"use-a-controlled-progress-bar",title:"Use a controlled progress bar",sidebar_label:"Use a controlled progress bar"},l=void 0,i={},d=[];function c(e){const t={a:"a",code:"code",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["Imagine you want to see the progress of a file upload. The example below features ",(0,r.jsx)(t.a,{href:"https://github.com/axios/axios",children:"axios"}),", but it works with anything!"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-jsx",children:"import axios from 'axios';\nimport { toast } from 'react-toastify';\n\nfunction Example(){\n  // we need to keep a reference of the toastId to be able to update it\n  const toastId = React.useRef(null);\n\n  function handleUpload(){\n    axios.request({\n      method: \"post\", \n      url: \"/foobar\", \n      data: myData, \n      onUploadProgress: p => {\n        const progress = p.loaded / p.total;\n\n        // check if we already displayed a toast\n        if (toastId.current === null) {\n          toastId.current = toast('Upload in Progress', { progress });\n        } else {\n          toast.update(toastId.current, { progress });\n        }\n      }\n    }).then(data => {\n      // Upload is done! \n      // The remaining progress bar will be filled up\n      // The toast will be closed when the transition end\n      toast.done(toastId.current);\n    })\n  }\n\n  return (\n    <div>\n      <button onClick={handleUpload}>Upload something</button>\n    </div>\n  )\n}\n\n"})})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},9621:(e,t,o)=>{o.d(t,{R:()=>a,x:()=>l});var n=o(8101);const r={},s=n.createContext(r);function a(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);