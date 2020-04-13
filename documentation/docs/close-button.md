---
id: 'use-a-custom-close-button-or-remove-it'
title: 'Use a custom close button or remove it'
sidebar_label: 'Use a custom close button or remove it'
---

## Override the default one

You can pass a custom close button to the `ToastContainer` to replace the default one.

:::important Important
  When you use a custom close button, your button will receive a ```closeToast``` function.
  You need to use it to close the toast.
:::


```jsx
  import React from 'react';
  import { toast, ToastContainer } from 'react-toastify';

  const CloseButton = ({ closeToast }) => (
    <i
      className="material-icons"
      onClick={closeToast}
    >
    delete
    </i>
  );

function App() {
  const notify = () => {
    toast("The close button change when Chuck Norris display a toast");
  };

  return (
    <div>
      <button onClick={notify}>Notify</button>;
      <ToastContainer closeButton={CloseButton} />
    </div>
  );
}
```

## Define it per toast

```jsx
toast("Hello", {
  closeButton: CloseButton
})
```

## Remove it

Sometimes you don't want to display a close button. It can be removed globally or per toast. Pass
`false` to `closeButton` props:

- remove it by default

```jsx
  <ToastContainer closeButton={false} />
```

- remove it per toast

```jsx
  toast("hello", {
    closeButton: false
  })
```

:::important Important
  if you removed it globally, you can still choose to display it for a specific toast  
  ```jsx
  toast("hello", {
    closeButton: true // or MyCustomCloseButton
  })
```
:::
 