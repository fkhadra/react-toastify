---
id: 'replace-default-transition'
title: 'Replace the default transition'
sidebar_label: 'Replace the default transition'
---

There are 4 built-in transitions provided.

- Bounce
<img src ="https://user-images.githubusercontent.com/5574267/38770379-985f49c8-4012-11e8-9db1-5d4d1f26a3d5.gif" />

- Slide
<img src ="https://user-images.githubusercontent.com/5574267/38770381-98a81d24-4012-11e8-8011-1190f3fb17c3.gif" />

- Zoom
<img src ="https://user-images.githubusercontent.com/5574267/38770382-98c16342-4012-11e8-9abf-3cf3d3eabd8c.gif" />

- Flip
<img src ="https://user-images.githubusercontent.com/5574267/38770380-9877dde4-4012-11e8-9485-0dc43346ce30.gif" />


Bounce is used by default, but you can replace it with your own transition, or with one from the list above.


```jsx
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

  <ToastContainer
    transition={Slide}
  />
//...
  <ToastContainer
    transition={YourCustomTransition}
  />

```

You get the idea...This can also be done per toast.

```jsx
toast("hello", {
  transition: Slide
})
```

