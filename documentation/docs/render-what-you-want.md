---
id: 'render-what-you-want'
title: 'Render more than string'
sidebar_label: 'Render more than string'
---

You can render any valid `ReactNode`: string, number, component... This is really straightforward. 

:::important Important
  When you render a component, a `closeToast` prop is injected into your component.
:::

```jsx
import React from 'react';
import { ToastContainer, toast } from "react-toastify";

const Msg = ({ closeToast }) => (
  <div>
    Lorem ipsum dolor
    <button>Retry</button>
    <button onClick={closeToast}>Close</button>
  </div>
)

function App(){
  const displayMsg = () => {
    toast(Msg);
    // toast(<Msg />) would also work
  }

  return (
  <div>
    <button onClick={displayMsg}>Click me</button>
    <ToastContainer />
  </div>
);
}
```

You can also render a component using a function. More or less like a "render props":

```jsx
toast(({ closeToast }) => <div>Functional swag 😎</div>);
```