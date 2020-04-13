---
id: positioning-toast
title: Positioning toast
sidebar_label: Positioning toast
---

By default, all the toasts will be positioned on the top right of your browser. If a position is set on a `toast`, the one defined on ToastContainer will be replaced.

The following values are allowed: **top-right, top-center, top-left, bottom-right, bottom-center, bottom-left**

For convenience, `toast` exposes a POSITION property to avoid any typos.

```jsx
  import React from 'react';
  import { toast } from 'react-toastify';

  function Example() {
    const notify = () => {
      toast("Default Notification !");

      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER
      });

      toast.error("Error Notification !", {
        position: toast.POSITION.TOP_LEFT
      });

      toast.warn("Warning Notification !", {
        position: toast.POSITION.BOTTOM_LEFT
      });

      toast.info("Info Notification !", {
        position: toast.POSITION.BOTTOM_CENTER
      });

      toast("Custom Style Notification with css class!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'foo-bar'
      });
    };

    return <button onClick={notify}>Notify</button>;
  }
```
