---
id: 'update-toast'
title: 'Update a toast'
sidebar_label: 'Update a toast'
---

When you update a toast, the toast options and the content are inherited but don't worry you can update them as well.

![update-without-transition](https://user-images.githubusercontent.com/5574267/33761953-1ce2e0ea-dc0b-11e7-8967-a63c1185ce0e.gif)

## Basic example

```jsx
import React from 'react';
import { toast } from 'react-toastify';

function Example() {
  const toastId = React.useRef(null);

  const notify = () => toastId.current = toast("Hello", { autoClose: false });

  const update = () => toast.update(toastId.current, { type: toast.TYPE.INFO, autoClose: 5000 });

  return (
    <div>
      <button onClick={notify}>Notify</button>
      <button onClick={update}>Update</button>
    </div>
  );
}
```

## Update the content

If you want to change the content it's straightforward as well. You can render any valid element including a react component. Pass your value to a `render` option as follow:

```jsx
 // With a string
 toast.update(toastId, {
    render: "New content",
    type: toast.TYPE.INFO,
    autoClose: 5000
  });

// Or with a component
toast.update(toastId, {
    render: MyComponent
    type: toast.TYPE.INFO,
    autoClose: 5000
});

toast.update(toastId, {
    render: () => <div>New content</div>
    type: toast.TYPE.INFO,
    autoClose: 5000
});
```

## Update the toast id

If you want to update the `toastId` it can be done. But don't forget to use the new id if you want to update your toast again 😅!

```jsx
const myNewToastId = 'loremIpsum';

toast.update(toastId, {
  render: "New content",
  type: toast.TYPE.INFO,
  autoClose: 5000,
  toastId: myNewToastId
});

toast.update(myNewToastId, {
  render: MyComponent
  autoClose: 6000
}); 
```

## Apply a transition

By default, when you update a toast, there is no transition applied. If you want to apply a transition, it can be done via the `className` or the `transition` option:

![update-with-transition](https://user-images.githubusercontent.com/5574267/33761952-1cc9d55a-dc0b-11e7-9a05-29186ea1c1f0.gif)

```jsx
// with css
toast.update(toastId, {
  render: "New Content",
  type: toast.TYPE.INFO,
  //Here the magic
  className: 'rotateY animated'
})

// with transition
toast.update(toastId, {
  render: "New Content",
  type: toast.TYPE.INFO,
  //Here the magic
  transition: Rotate
})
```

## Reset option or inherit from ToastContainer

If you want to inherit props from the `ToastContainer`, you can reset an option by passing null.
It's particularly useful when you remove the `closeButton` from a toast and you want it back during the update.

```jsx
function Example(){
  const toastId = React.useRef(null);

  const notify = () => {
    toastId.current = toast("Hello", {
      autoClose: false,
      closeButton: false // Remove the closeButton
    });
  }

  const update = () => {
    toast.update(toastId.current, {
      type: toast.TYPE.INFO,
      autoClose: 5000,
      closeButton: null // The closeButton defined on ToastContainer will be used
    });
  }

  return (
    <div>
      <button onClick={notify}>Notify</button>
      <button onClick={update}>Update</button>
    </div>
  );
}
```
