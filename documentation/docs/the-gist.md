---
id: the-gist-of-react-toastify
title: The gist of react-toastify
sidebar_label: The gist of react-toastify
---

```jsx
  import React, { Component } from 'react';
  import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
  // minified version is also included
  // import 'react-toastify/dist/ReactToastify.min.css';

  class App extends Component {
    notify = () => toast("Wow so easy !");

    render(){
      return (
        <div>
          <button onClick={this.notify}>Notify !</button>
          <ToastContainer />
        </div>
      );
    }
  }
```

:::important Important
Remember to render the `ToastContainer` *once* in your application tree. 
If you can't figure out where to put it, rendering it in the application root would be the best bet.
:::
