---
id: 'limit-the-number-of-toast-displayed'
title: 'Limit the number of toast displayed'
sidebar_label: 'Limit the number of toast displayed'
---

Notifications are useful to get the attention of the user. But displaying too many of them can also be counterproductive.
The `ToastContainer` expose a `limit` prop to meet your needs.

:::tip What happend to the notifications that are not displayed ? 🧐
  They are added to a queue. They will be displayed as soon as a slot is free.
:::

```jsx
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Display a maximum of 3 notifications at the same time
function App(){
  const notify = () => {
    toast("lorem ipsum");
  }

  return (
    <div>
      <button onClick={notify}>Click on me a lot!</button>
      <ToastContainer limit={3}>
    </div>
  )
}
```