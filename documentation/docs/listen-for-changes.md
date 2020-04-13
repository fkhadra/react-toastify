---
id: 'listen-for-changes'
title: 'Listen for changes'
sidebar_label: 'Listen for changes'
---

If you want to know when a toast is displayed or removed, `toast` expose a `onChange` method. When called a function to unsubscribe is returned:

```jsx
const unsubsribe = toast.onChange((numberOfToastDisplayed, containerId) => {
  // Do whatever you want
  // The containerId is useful when working with multiple containers
});

unsubscribe();
```
