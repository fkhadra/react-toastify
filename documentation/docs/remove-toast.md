---
id: remove-toast
title: Remove toast programmatically 
sidebar_label: Remove toast programmatically
---

An id is returned each time you display a toast, use it to remove a given toast programmatically by calling `toast.dismiss(id)`

:::info Info
If you call `toast.dismiss` without argument, all the displayed toasts will be removed.
:::

```jsx
import React from 'react';
import { toast } from 'react-toastify';

function Example(){
  const toastId = React.useRef(null);

  const notify = () => toastId.current = toast("Lorem ipsum dolor");

  const dismiss = () =>  toast.dismiss(toastId.current);

  const dismissAll = () =>  toast.dismiss();

  return (
    <div>
      <button onClick={notify}>Notify</button>
      <button onClick={dismiss}>Dismiss</button>
      <button onClick={dismissAll}>Dismiss All</button>
    </div>
  );
}
```
