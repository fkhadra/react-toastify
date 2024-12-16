"use strict";(self.webpackChunkreact_toastify_doc=self.webpackChunkreact_toastify_doc||[]).push([[517],{900:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>s,default:()=>f,frontMatter:()=>r,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"addons/use-notification-center","title":"useNotificationCenter","description":"useNotificationCenter is a headless hook to build your notification center on top of react-toastify. In short, every time you call toast or any other variants like toast.update, toast.promise, toast.info, etc, the notification will be added to the toast center.","source":"@site/docs/addons/use-notification-center.md","sourceDirName":"addons","slug":"/addons/use-notification-center","permalink":"/react-toastify/addons/use-notification-center","draft":false,"unlisted":false,"editUrl":"https://github.com/fkhadra/react-toastify-doc/edit/master/docs/addons/use-notification-center.md","tags":[],"version":"current","frontMatter":{"id":"use-notification-center","title":"useNotificationCenter","sidebar_label":"useNotificationCenter"},"sidebar":"someSidebar","previous":{"title":"Addons","permalink":"/react-toastify/category/addons"},"next":{"title":"API Reference","permalink":"/react-toastify/category/api-reference"}}');var o=t(5105),a=t(9621);const r={id:"use-notification-center",title:"useNotificationCenter",sidebar_label:"useNotificationCenter"},s=void 0,c={},d=[{value:"Import",id:"import",level:2},{value:"Initial parameters",id:"initial-parameters",level:2},{value:"API",id:"api",level:2},{value:"<code>notifications</code>",id:"notifications",level:3},{value:"<code>clear</code>",id:"clear",level:3},{value:"<code>markAllAsRead</code>",id:"markallasread",level:3},{value:"<code>markAsRead</code>",id:"markasread",level:3},{value:"<code>unreadCount</code>",id:"unreadcount",level:3},{value:"<code>remove</code>",id:"remove",level:3},{value:"<code>sort</code>",id:"sort",level:3},{value:"<code>add</code>",id:"add",level:3},{value:"<code>update</code>",id:"update",level:3},{value:"<code>find</code>",id:"find",level:3}];function l(n){const e={admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,a.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(e.p,{children:[(0,o.jsx)(e.code,{children:"useNotificationCenter"})," is a headless hook to build your notification center on top of react-toastify. In short, every time you call ",(0,o.jsx)(e.code,{children:"toast"})," or any other variants like ",(0,o.jsx)(e.code,{children:"toast.update"}),", ",(0,o.jsx)(e.code,{children:"toast.promise"}),", ",(0,o.jsx)(e.code,{children:"toast.info"}),", etc, the notification will be added to the toast center."]}),"\n",(0,o.jsxs)(e.p,{children:["It offers a lot of flexibility out of the box like ",(0,o.jsx)(e.code,{children:"sorting"}),", ",(0,o.jsx)(e.code,{children:"filtering"}),", etc..."]}),"\n",(0,o.jsx)(e.p,{children:"Check the example below."}),"\n",(0,o.jsx)("iframe",{src:"https://codesandbox.io/embed/notification-center-framer-vddoj5?fontsize=14&hidenavigation=1&hidedevtools=1&view=preview&codemirror=1&theme=dark",style:{width:"100%",height:"700px",border:0,borderRadius:"4px",overflow:"hidden"},title:"notification-center-framer",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),"\n",(0,o.jsx)(e.h2,{id:"import",children:"Import"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n'})}),"\n",(0,o.jsx)(e.h2,{id:"initial-parameters",children:"Initial parameters"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\ninterface Data {\n  exclude: boolean\n}\n\nfunction App(){\n  const { notifications } = useNotificationCenter<Data>({\n    data: [\n      {id: "anId", createdAt: Date.now(), data: { exclude: false }},\n      {id: "anotherId", createdAt: Date.now(), data: { exclude: true }}\n      ],\n    sort: (l, r) => l.createdAt - r.createdAt,\n    filter: (item) => item.data.exclude === false\n  })\n}\n\n'})}),"\n",(0,o.jsxs)(e.table,{children:[(0,o.jsx)(e.thead,{children:(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.th,{children:"Parameter"}),(0,o.jsx)(e.th,{children:"Description"})]})}),(0,o.jsxs)(e.tbody,{children:[(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"data?: NotificationCenterItem<Data>[]"})}),(0,o.jsx)(e.td,{children:"Initial data to rehydrate the notification center. Useful if you want to persist the content of the notification center"})]}),(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"sort?: (l: NotificationCenterItem<Data>, r: NotificationCenterItem<Data>): number"})}),(0,o.jsxs)(e.td,{children:["By default, the notifications are sorted from the newest to the oldest using the ",(0,o.jsx)(e.code,{children:"createdAt"})," field. Use this to provide your sort function"]})]}),(0,o.jsxs)(e.tr,{children:[(0,o.jsx)(e.td,{children:(0,o.jsx)(e.code,{children:"filter?: (item: NotificationCenterItem<Data>): boolean"})}),(0,o.jsx)(e.td,{children:"Keep the toast that meets the condition specified in the callback function."})]})]})]}),"\n",(0,o.jsx)(e.admonition,{type:"info",children:(0,o.jsx)(e.p,{children:"All parameters are optional"})}),"\n",(0,o.jsx)(e.h2,{id:"api",children:"API"}),"\n",(0,o.jsx)(e.p,{children:"The hook gives you access to several values and functions. Let's view them one by one."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\nconst {\n    notifications,\n    clear,\n    markAllAsRead,\n    markAsRead,\n    add,\n    update,\n    remove,\n    find,\n    sort,\n    unreadCount\n} = useNotificationCenter()\n'})}),"\n",(0,o.jsx)(e.h3,{id:"notifications",children:(0,o.jsx)(e.code,{children:"notifications"})}),"\n",(0,o.jsxs)(e.p,{children:["Contains an array of ",(0,o.jsx)(e.code,{children:"NotificationItem"}),". The ",(0,o.jsx)(e.code,{children:"NotificationItem"})," has the following interface"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"interface NotificationCenter <Data = {}> {\n  id: Id\n  read: boolean;\n  createdAt: number;\n  data: Data;\n  content?: React.ReactNode\n  theme?: Theme\n  type?: TypeOptions;\n  isLoading?: boolean;\n  containerId?: Id;\n  icon?: React.ReactNode | false;\n}\n"})}),"\n",(0,o.jsxs)(e.p,{children:["Most of the properties are populated when you display a notification on the screen using the ",(0,o.jsx)(e.code,{children:"toast"})," function. A typical usage would look like this."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\nfunction App(){\n  const { notifications } = useNotificationCenter()\n\n  return (\n    <ul>\n      {notifications.map(notification => (\n        <li key={notification.id}>\n          <span>id: {notification.id}</span>\n          <span>createdAt: {notification.createdAt}</span>\n          <p>content: {notification.content}</p>\n          {/* you get the idea, you are free to use the properties the way that best suits your needs */}\n        </li>\n      ))}\n    </ul>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.admonition,{type:"tip",children:(0,o.jsxs)(e.p,{children:["The ",(0,o.jsx)(e.code,{children:"content"})," contains the value that is displayed when calling the toast function. Use ",(0,o.jsx)(e.code,{children:"data"})," if you want more control."]})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\ninterface Data {\n  title: string\n  text: string\n}\n\n// somewhere in your app\ntoast("Hello", {\n  data: {\n    title: "Hello",\n    text: "Lorem ipsum dolor..."\n  }\n})\n\nfunction App(){\n  const { notifications } = useNotificationCenter<Data>()\n\n  return (\n    <ul>\n      {notifications.map(notification => (\n        <li key={notification.id}>\n          <span>id: {notification.id}</span>\n          <span>createdAt: {notification.createdAt}</span>\n          <p>title: {notification.data.title}</p>\n          <p>text: {notification.data.text}</p>\n        </li>\n      ))}\n    </ul>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.h3,{id:"clear",children:(0,o.jsx)(e.code,{children:"clear"})}),"\n",(0,o.jsx)(e.p,{children:"Remove all notifications from the notification center."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\nfunction App(){\n  const { notifications, clear } = useNotificationCenter()\n\n  return (\n    <div>\n      <button onClick={clear}>clear</button>\n      <div>{notifications.length}</div>\n    </div>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.h3,{id:"markallasread",children:(0,o.jsx)(e.code,{children:"markAllAsRead"})}),"\n",(0,o.jsx)(e.p,{children:"Mark all notifications as read."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\nfunction App(){\n  const { notifications, markAllAsRead } = useNotificationCenter()\n\n  return (\n    <div>\n      <button onClick={markAllAsRead}>Mark all as read</button>\n      <ul>\n        {notifications.map(notification => (\n          <li key={notification.id}>\n            <span>read: {notification.read}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n'})}),"\n",(0,o.jsxs)(e.p,{children:[(0,o.jsx)(e.code,{children:"markAllAsRead"})," accepts an optional boolean argument. It's only useful to mark all notifications as not read."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\nfunction App(){\n  const { notifications, markAllAsRead } = useNotificationCenter()\n\n  return (\n    <div>\n      <button onClick={() => markAllAsRead(false)}>Mark all as not read</button>\n      <ul>\n        {notifications.map(notification => (\n          <li key={notification.id}>\n            <span>read: {notification.read}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.admonition,{type:"info",children:(0,o.jsxs)(e.p,{children:["Calling ",(0,o.jsx)(e.code,{children:"markAllasRead()"})," is equivalent to ",(0,o.jsx)(e.code,{children:"markAllAsRead(true)"})]})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"// function signature\nmarkAllAsRead(read?: boolean): void\n"})}),"\n",(0,o.jsx)(e.h3,{id:"markasread",children:(0,o.jsx)(e.code,{children:"markAsRead"})}),"\n",(0,o.jsx)(e.p,{children:"Mark one or more notifications as read."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\nfunction App(){\n  const { notifications, markAsRead } = useNotificationCenter()\n\n  return (\n    <ul>\n      {notifications.map(notification => (\n        <li key={notification.id}>\n          <span>read: {notification.read}</span>\n          <button onClick={() => markAsRead(notification.id)}>mark as read</button>\n        </li>\n      ))}\n    </ul>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.p,{children:"You can also provide an array of ids to mark multiple notifications as read."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'markAsRead(["a","list", "of", "id"])\n'})}),"\n",(0,o.jsxs)(e.p,{children:["Similar to ",(0,o.jsx)(e.code,{children:"markAllAsRead"}),", this function accepts an optional boolean argument. It's only useful to mark the notifications as not read."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'markAsRead(notification.id, false)\n\n// works for an array of ids as well\nmarkAsRead(["a","list", "of", "id"], false)\n'})}),"\n",(0,o.jsx)(e.h3,{id:"unreadcount",children:(0,o.jsx)(e.code,{children:"unreadCount"})}),"\n",(0,o.jsx)(e.p,{children:"Contains the number of unread notifications."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\nfunction App(){\n  const { unreadCount } = useNotificationCenter()\n\n  return (\n    <div>{unreadCount}</div>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.h3,{id:"remove",children:(0,o.jsx)(e.code,{children:"remove"})}),"\n",(0,o.jsx)(e.p,{children:"Remove one or more notifications."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\n\nfunction App(){\n  const { notifications, remove } = useNotificationCenter()\n\n  return (\n    <ul>\n      {notifications.map(notification => (\n        <li key={notification.id}>\n          <button onClick={() => remove(notification.id)}>remove</button>\n        </li>\n      ))}\n    </ul>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.p,{children:"To remove multiple notifications at once, you can pass an array of ids."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'remove(["a","list", "of", "id"])\n'})}),"\n",(0,o.jsx)(e.h3,{id:"sort",children:(0,o.jsx)(e.code,{children:"sort"})}),"\n",(0,o.jsxs)(e.p,{children:["By default, the notifications are sorted from the newest to the oldest using the ",(0,o.jsx)(e.code,{children:"createdAt"})," field. This can be changed anytime and you are free to use whatever field you want."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter, NotificationCenterItem } from "react-toastify/addons/useNotificationCenter"\n\nfunction App(){\n  const { notifications, sort } = useNotificationCenter()\n\n  const sortAsc = () => {\n    sort((l: NotificationCenterItem, r: NotificationCenterItem) => l.createdAt - r.createdAt)\n  }\n\n  return (\n    <div>\n      <button onClick={sortAsc}>Oldest to newest</button>\n      <ul>\n        {notifications.map(notification => (\n          <li key={notification.id}>\n            <span>{notification.id}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n'})}),"\n",(0,o.jsxs)(e.p,{children:["Another example, using a field different from ",(0,o.jsx)(e.code,{children:"createdAt"}),". We can imagine that the notification contains an ",(0,o.jsx)(e.code,{children:"order"})," field under ",(0,o.jsx)(e.code,{children:"data"}),"."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'// somewhere in your app\ntoast("hello", {\n  data: {\n    order: 1\n  }\n})\n'})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useNotificationCenter, NotificationCenterItem } from "react-toastify/addons/useNotificationCenter"\n\ninterface Data {\n  order: number\n}\n\nfunction App(){\n  const { notifications, sort } = useNotificationCenter<Data>()\n\n  const sortAsc = () => {\n    sort((l: NotificationCenterItem, r: NotificationCenterItem) => l.data.order - r.data.order)\n  }\n\n  return (\n    <div>\n      <button onClick={sortAsc}>Oldest to newest</button>\n      <ul>\n        {notifications.map(notification => (\n          <li key={notification.id}>\n            <span>{notification.id}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.h3,{id:"add",children:(0,o.jsx)(e.code,{children:"add"})}),"\n",(0,o.jsxs)(e.p,{children:["Let you add a notification without calling ",(0,o.jsx)(e.code,{children:"toast"}),". This can be useful in many cases, job listener, global store, etc..."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useEffect } from "react"\nimport { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\nimport { jobListener } from "my-job-listener"\n\nfunction App(){\n  const { notifications, add } = useNotificationCenter()\n\n  useEffect(() => {\n    const unsub = jobListener.on("jobCreate",(job) => {\n      add({ id: job.id, content: job.notification.content })\n    })\n  // although the reference of `add` changes for every render\n  // you can safely omit it from the dependency array \n  }, [])\n\n  return (\n    <ul>\n      {notifications.map(notification => (\n        <li key={notification.id}>\n          <span>{notification.id}</span>\n        </li>\n      ))}\n    </ul>\n  )\n}\n'})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["If the id is already in use, the function will return ",(0,o.jsx)(e.code,{children:"null"})," and nothing will happens."]}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'add({ id: "an existing id" }) // return null\n'})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["If you omit the ",(0,o.jsx)(e.code,{children:"id"}),", one is generated for you."]}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'add({ content: "hello" }) // return generated id\n'})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["You can also override the default values for ",(0,o.jsx)(e.code,{children:"createdAt"})," and ",(0,o.jsx)(e.code,{children:"read"})]}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:"add({ \n  // same as default value \ud83d\ude06\n  createdAt: Date.now(),\n  read: true\n})\n"})}),"\n",(0,o.jsx)(e.h3,{id:"update",children:(0,o.jsx)(e.code,{children:"update"})}),"\n",(0,o.jsxs)(e.p,{children:["Let you update a notification without calling ",(0,o.jsx)(e.code,{children:"toast.update"}),". This can be useful in many cases, job listener, global store, etc..."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useEffect } from "react"\nimport { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\nimport { jobListener } from "my-job-listener"\n\nfunction App(){\n  const { notifications, update } = useNotificationCenter()\n\n  useEffect(() => {\n    const unsub = jobListener.on("jobUpdate", (job) => {\n      update(job.id, { content: job.notification.content, data: { jobType: job.type } })\n    })\n  // although the reference of `update` changes for every render\n  // you can safely omit it from the dependency array \n  }, [])\n\n  return (\n    <ul>\n      {notifications.map(notification => (\n        <li key={notification.id}>\n          <span>{notification.id}</span>\n        </li>\n      ))}\n    </ul>\n  )\n}\n'})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"if the given id does not exist, null is returned"}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'update("nonExistingId", {content: "hello"}) // return null\n'})}),"\n",(0,o.jsx)(e.h3,{id:"find",children:(0,o.jsx)(e.code,{children:"find"})}),"\n",(0,o.jsx)(e.p,{children:"Let you retrieve one or more notifications. This can be useful in many cases, job listener, global store, etc..."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { useEffect } from "react"\nimport { useNotificationCenter } from "react-toastify/addons/useNotificationCenter"\nimport { jobListener } from "my-job-listener"\n\nfunction App(){\n  const { notifications, find } = useNotificationCenter()\n\n  useEffect(() => {\n    const unsub = jobListener.onChange((job) => {\n      const notification = find(job.id);\n\n      if(notification) {\n        // do something if it already exist, for example update it\n      } else {\n        // do something if it does not exist, for example add it\n      }\n    })\n  // although the reference of `find` changes for every render\n  // you can safely omit it from the dependency array \n  }, [])\n\n  return (\n    <ul>\n      {notifications.map(notification => (\n        <li key={notification.id}>\n          <span>{notification.id}</span>\n        </li>\n      ))}\n    </ul>\n  )\n}\n'})})]})}function f(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(l,{...n})}):l(n)}},9621:(n,e,t)=>{t.d(e,{R:()=>r,x:()=>s});var i=t(8101);const o={},a=i.createContext(o);function r(n){const e=i.useContext(a);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:r(n.components),i.createElement(a.Provider,{value:e},n.children)}}}]);