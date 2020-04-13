---
id: 'custom-transition'
title: 'Define a custom enter and exit transition'
sidebar_label: 'Define a custom enter and exit transition'
---

The toast relies on `react-transition-group` for the enter and exit transition. Any transition built with react-transition-group should work!

## Create a transition from scratch

I'll use the zoom animation from animate.css. Of course, you could create your own animation.

![toastify_custom_trans](https://user-images.githubusercontent.com/5574267/31049179-0d52e14c-a62e-11e7-9abd-b0d169a0fadc.gif)

```css
/* style.css*/
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  50% {
    opacity: 1;
  }
}

.zoomIn {
  animation-name: zoomIn;
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(.3, .3, .3);
  }

  to {
    opacity: 0;
  }
}

.zoomOut {
  animation-name: zoomOut;
}

.animate {
  animation-duration: 800ms;
}
```


```jsx
import React from 'react';
import { toast } from 'react-toastify';
import Transition from 'react-transition-group/Transition';
import './style.css';

const ZoomInAndOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    {/* Same as the animation duration */}
    timeout={800}
    onEnter={node => node.classList.add('zoomIn', 'animate')}
    onExit={node => {
      node.classList.remove('zoomIn', 'animate');
      node.classList.add('zoomOut', 'animate');
    }}
  >
    {children}
  </Transition>
);

function App(){
  const notify = () => {
    toast("ZoomIn and ZoomOut", {
      transition: ZoomInAndOut,
      autoClose: 5000
    });
  };

  return <button onClick={this.notify}>Notify</button>;
}

```

## Ease your life with the cssTransition helper

The easiest way to roll your own transition is by using the `cssTransition` helper. Doing so you don't need to deal with `react-transition-group`. You only need to provide the `enter` and the `exit` class name, the transition `duration` is set
to `750ms` by default but it can be overridden:

```jsx
import React from 'react';
import { toast, cssTransition } from 'react-toastify';
import './style.css';

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: 800,
});

function App(){
  const notify = () => {
    toast("ZoomIn and ZoomOut", {
      transition: Zoom,
      autoClose: 5000
    });
  };

  return <button onClick={this.notify}>Notify</button>;
}
```

### Different duration for enter and exit

If you want the transition duration to be different between the enter and exit transition pass an array:

```jsx
const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: [500, 800]
});
```

### Handle transition based on the toast position

Some transitions are based on the toast position. This is the case for the default one. If you pass `appendPosition` to the `cssTransition` helper as shown below, the current position will be appended to the `enter` and `exit` class name:

```jsx
const Zoom = cssTransition({
  // zoomIn will become zoomIn--top-right or zoomIn--top-left and so on
  enter: 'zoomIn',
  // zoomIn will become zoomOut--top-right or zoomOut--top-left and so on
  exit: 'zoomOut',
  // default to false
  appendPosition: true
});
```
