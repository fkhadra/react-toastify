---
id: 'define-callback'
title: 'Define callback'
sidebar_label: 'Define callback'
---

You can define two callbacks. Their names are self-explanatory:

- `onOpen`
- `onClose`

```jsx
import React from 'react';
import { toast } from 'react-toastify';

function Example(){

  const notify = () => {
    toast("Hello there", {
      onOpen: () => window.alert('Called when I open'),
      onClose: () => window.alert('Called when I close')
    });
  }

  return <button onClick={notify}>Notify</button>;
}
```

:::tip Tip
  If you use a component, the callback will also have access to the component props

```jsx
import React from 'react';
import { toast } from 'react-toastify';

function Msg({ uid }){
  return <span>{uid}</span>;
}

function Example(){

  const notify = () => {
    toast(<Msg uid={"this is a uid for real"} />, {
      onOpen: ({ uid }) => window.alert(uid),
      onClose: ({ uid }) => window.alert(uid)
    });
  }

  return <button onClick={notify}>Notify</button>;
}
```
:::
