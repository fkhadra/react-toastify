---
id: 'lazy-container-and-multi-container'
title: 'Lazy container and multi-container'
sidebar_label: 'Lazy container and multi-container'
---

## Lazy ToastContainer

```js
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  // Call it once in your app. At the root of your app is the best place
  toast.configure()

  const App = () => {
    const notify = () => toast("Wow so easy !");
    
    return <button onClick={notify}>Notify !</button>;
  }
```

The library will mount a `ToastContainer` for you if none is mounted. 


### Configure the ToastContainer when it is mounted on demand

The configure function accepts the same props as the ToastContainer. As soon as the container is
rendered, the call to configure will have no effect.

```js
toast.configure({
  autoClose: 8000,
  draggable: false,
  //etc you get the idea
});
```


## Multi container support

To enable multiple container support, you have to pass `enableMultiContainer` and specify a `containerId` and use it in
each toast, to do so add `containerId` to the toast's options object.



Note: adding `enableMultiContainer` prop to the `<ToastContainer/ >` will:
- Check each toast to verify if its `containerId` match the container `containerId` so it can be rendered.
- Ensure not to render any `toast` that has `containerId`.
- Render any toast if both the `toast` and `<ToastContainer/ >`  does not include `containerId` and `containerId` respectively.

A simple example to demonstrate multi toast container capability.

- Notify A button will show a toast on the bottom left.
- Notify B button will show a toast on the top right.
   
```js
  import React, { Component } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


 class App extends Component {
    notifyA = () => toast('Wow so easy !', {containerId: 'A'});
    notifyB = () => toast('Wow so easy !', {containerId: 'B'});

    render(){
      return (
        <div>
            <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.BOTTOM_LEFT} />
            <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_RIGHT} />
     
            <button onClick={this.notifyA}>Notify A !</button>
            <button onClick={this.notifyB}>Notify B !</button>          
        </div>
      );
    }
  }

```
