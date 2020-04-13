---
id: 'accessibility'
title: 'Accessibility'
sidebar_label: 'Accessibility'
---

By default, all toasts are diplayed with the ARIA role `alert`. This can be changed globally or per toast.

- Globally
```jsx
<ToastContainer role="alert" />
```

- Per toast
```jsx
toast("hello", {
  role: "alert"
})
```

