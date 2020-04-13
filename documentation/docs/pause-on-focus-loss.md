---
id: 'pause-on-focus-loss'
title: 'Pause toast timer when the window loses focus'
sidebar_label: 'Pause toast timer when the window loses focus'
---

The default behavior is to pause the toast timer whenever the window loses focus. You can opt-out by setting the `pauseOnFocusLoss` props to false.

```jsx
// Opt-out for all toast
<ToastContainer pauseOnFocusLoss={false} />

// Opt-out per toast
toast('Hello', {
  pauseOnFocusLoss: false
})
```