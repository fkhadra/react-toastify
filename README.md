# React Toastify [![Build Status](https://travis-ci.org/fkhadra/react-toastify.svg?branch=master)](https://travis-ci.org/fkhadra/react-toastify) [![npm](https://img.shields.io/npm/dm/react-toastify.svg)]() [![npm](https://img.shields.io/npm/v/react-toastify.svg)]() [![license](https://img.shields.io/github/license/fkhadra/react-toastify.svg?maxAge=2592000)]() [![Coverage Status](https://coveralls.io/repos/github/fkhadra/react-toastify/badge.svg?branch=master)](https://coveralls.io/github/fkhadra/react-toastify?branch=master)



![React toastify](https://user-images.githubusercontent.com/5574267/28753331-1380a2f0-7534-11e7-8456-0b32e959db07.gif "React toastify")

🎉 React-Toastify allow you to add notification to your app with ease. No bullshit !

 * [Demo](#demo)
 * [Installation](#installation)
 * [Features](#features)
 * [Usage](#usage)
    * [Simple](#simple)
    * [Positioning toast](#positioning-toast)
    * [Remove a toast programmatically](#remove-a-toast-programmatically)
    * [Prevent duplicate](#prevent-duplicate)
    * [Define hook](#define-hook)
    * [Set a custom close button or simply remove it](#set-a-custom-close-button-or-simply-remove-it)
    * [ :fire: Define a custom enter and exit transition :fire: ](#define-a-custom-enter-and-exit-transition)
    * [Define your style](#define-your-style)
    * [Replace default sass variable](#replace-default-sass-variable)
    * [Mobile](#mobile)
 * [Api](#api)
 * [Browser Support](#browser-support)
 * [Release Notes](#release-notes)
 * [Contribute](#contribute)
 * [License](#license)

## Demo
   
[A demo is worth thousand word](https://fkhadra.github.io/react-toastify/)   
   
## Installation 
   
```
$ npm install --save react-toastify
$ yarn add react-toastify
```
   
If you use a style loader you can import the stylesheet as follow :
   
```javascript
import 'react-toastify/dist/ReactToastify.min.css' 
```

## Features

- Can display a react component inside the toast !
- Don't rely on `findDOMNode` or any DOM hack
- Has ```onOpen``` and ```onClose``` hooks. Both can access the props passed to the react component rendered inside the toast
- Can be positioned per toast
- Can remove toast programmatically
- Define behavior per toast
- Easy to setup
- Super easy to customize

## Usage

### Simple 

By default all toasts will inherits ToastContainer's props. **Props defined on toast supersede ToastContainer's props.**

```javascript
  import React, { Component } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';

  class App extends Component {
    notify = () => toast("Wow so easy !");

    render(){
      return (
        <div>
        <button onClick={this.notify}>Notify !</button>
        {/* One container to rule them all! */}
        <ToastContainer 
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        {/*Can be written <ToastContainer />. Props defined are the same as the default one. */}
        </div>
      );
    }
  }
```

### Positioning toast

By default all the toasts will be positionned on the top right of your browser. If a position is set on a toast, the one defined on ToastContainer will be overwritten

The following values are allowed: **top-right, top-center, top-left, bottom-right, bottom-center, bottom-left**

For convenience, toast expose a POSITION property to avoid any typo.

```javascript
 // toast.POSITION.TOP_LEFT, toast.POSITION.TOP_RIGHT, toast.POSITION.TOP_CENTER
 // toast.POSITION.BOTTOM_LEFT,toast.POSITION.BOTTOM_RIGHT, toast.POSITION.BOTTOM_CENTER

  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Position extends Component {
    notify = () => {
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
    toast("Custom Style Notification !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'dark-toast',
      progressClassName: 'transparent-progress'
    });
  };

    render(){
      return <button onClick={this.notify}>Notify</button>;
    }
  }
```



****
### Remove a toast programmatically

An id is returned each time you display a toast, use it to remove a given toast programmatically by calling ```toast.dismiss(id)```

Without args, all the displayed toasts will be dismissed.

```javascript
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Example extends Component {
    toastId = null;

    notify = () => this.toastId = toast("Lorem ipsum dolor");
Define hook
    dismiss = () =>  toast.dismiss(this.toastId);

    dismissAll = () =>  toast.dismiss();

    render(){
      return (
        <div>
          <button onClick={this.notify}>Notify</button>
          <button onClick={this.dismiss}>Dismiss</button>
          <button onClick={this.dismissAll}>Dismiss All</button>
        </div>
      );
    }
  }
```

### Prevent duplicate

To prevent duplicates, you can check if a given toast is active by calling toast.isActive(id) like the snippet below. With this approach, you can decide with more precision whether or not you want to display a toast.

```javascript
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Example extends Component {
    toastId = null;

    notify = () => {
      if (! toast.isActive(this.toastId)) {
        this.toastId = toast("I cannot be duplicated !");
      }
    }

    render(){
      return (
        <div>
          <button onClick={this.notify}>Notify</button>
        </div>
      );
    }
  }
```

### Define hook

You can define two hooks on toast:

- onOpen is called inside componentDidMount
- onClose is called inside componentWillUnmount

```javascript
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Hook extends Component {
    notify = () => toast("Lorem ipsum dolor", {
      onOpen: (childrenProps) => window.alert('I counted to infinity once then..'),
      onClose: (childrenProps) => window.alert('I counted to infinity twice')
    });

    render(){
      return <button onClick={this.notify}>Notify</button>;
    }
  }
```
  
### Set a custom close button or simply remove it

When you use a custom close button, your button will receive a ```closeToast``` props. You need to call it in order to close the toast. The customCloseButton can be passed to the ToastContainer so all the toast display the custom close or you can set it by toast.
If ```customCloseButton``` is set to false, the close button will be not displayed.


```javascript
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  const CloseButton = ({ YouCanPassProps, closeToast }) => (
    <i
      className="material-icons"
      onClick={closeToast}
    >
    delete
    </i>
  );

  class CustomClose extends Component {
    notify = () => {
      toast("The close button change when Chuck Norris display a toast",{
        closeButton: <CloseButton YouCanPassProps="foo" />
      });
    };

    render(){
      return <button onClick={this.notify}>Notify</button>;
    }
  }
```

### Define a custom enter and exit transition

The toast rely on `react-transition-group` for the enter and exit transition. 
![toastify_custom_trans](https://user-images.githubusercontent.com/5574267/31049179-0d52e14c-a62e-11e7-9abd-b0d169a0fadc.gif)
- I'll use the zoom animation from animate.css
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

.animate{
  animation-duration: 800ms;
}
```

- Create a transition and apply it

```js
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Transition from 'react-transition-group/Transition';
import 'style.css';

// Any transition created with react-transition-group/Transition will work ! 
const ZoomInAndOut = ({ children, position, ...props }) => (
  <Transition
    {...props}
    {/* Same as the animation duration */}
    timeout={800}
    onEnter={ node => node.classList.add('zoomIn', 'animate')}
    onExit={node => {
      node.classList.remove('zoomIn', 'animate');
      node.classList.add('zoomOut', 'animate');
    }}
  >
    {children}
  </Transition>
);

class App extends Component {
  notify = () => {
    toast("ZoomIn and ZoomOut", {
      transition: ZoomInAndOut,
      autoClose: 5000
    });
  };
    
  render(){
    return <button onClick={this.notify}>Notify</button>;
  }
}

```

- Or pass your transition to the ToastContainer to overwrite the default one.

```js
render(){
  return(
  {/*Component*/}
    <ToastContainer 
      transition={ZoomInAndOut}
    />
  {/*Component*/}
  );
}
```

### Define your style

Taste and colours are not always the same ! You have several options.

- Overwrite ```toastify-content``` and ```toastify__progress```
- Create two css classes and pass them to a toast

```css
.dark-toast{
  background: #323232;
  color: #fff;
}

.dark-toast > .toastify__close{
  color: #fff;
}

.transparent-progress{
  background:  rgba(255,255,255,.7);
}

.fancy-progress{
  background: repeating-radial-gradient(red, yellow 10%, green 15%);
}
                
```

```javascript
  import React, { Component } from 'react';
  import { toast } from 'react-toastify';

  class Style extends Component {
    notify = () => {
      toast("Dark style notification with default type progress bar",{
        className: 'dark-toast',
        autoClose: 5000
      });

      toast("Dark style with transparent progress bar, the one used with others types.",{
        className: 'dark-toast',
        progressClassName: 'transparent-progress',
        autoClose: 5000
      });

      toast("Dark style with ugly progress bar",{
        className: 'dark-toast',
        progressClassName: 'fancy-progress',
        autoClose: 5000
      });
    };
    
    render(){
      return <button onClick={this.notify}>Notify</button>;
    }
  }
```

- Or pass your classes to the ToastContainer to set the classes for all your toast in one shot.


```javascript
  render(){
    return(
      {/*Component*/}
      <ToastContainer 
        toastClassName="dark-toast"
        progressClassName="transparent-progress" 
      />
      {/*Component*/}
    );
  }
```

### Replace default sass variable

If you use a sass loader you could replace the default variable to suits your needs.

- Define your variable: 

```css
/* Below the variable you can replace */
$toast-width: 320px !default;
$toast-background: #ffffff !default;
$font-color: #999 !default;
$font-size: 13px !default;
$animation-duration: 0.75s !default;

$color-default: #fff !default;
$color-info: #3498db !default;
$color-success: #07bc0c !default;
$color-warning: #f1c40f !default;
$color-error: #e74c3c !default;

$color-progress-default: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55) !default;

$smartphone-portrait: "only screen and (max-width : 480px)" !default;
```

- Include the file and voila!
```css
@include 'my_custom_variables';
@include 'react-toastify/src/scss/main';
```

### Mobile

On mobile the toast will take all the width available.

![react toastiy mobile](https://user-images.githubusercontent.com/5574267/28754040-ae7195ea-753d-11e7-86e1-f23c5e6bc531.gif)

## Api
  
### ToastContainer (Type : React Component) 
   
| Props             | Type           | Default   | Description                                                     |
| ----------------- | -------------- | --------- | --------------------------------------------------------------- |
| position          | string         | top-right | One of top-right, top-center, top-left, bottom-right, bottom-center, bottom-left                                   |
| autoClose         | false or int   | 5000      | Delay in ms to close the toast. If set to false, the notification need to be closed manualy |
| closeButton       | React Element or false     | -                                                               | A React Component to replace the default close button or `false` to hide the button |
| transition        | function       | -     | A reference to a valid react-transition-group/Transition component  |
| hideProgressBar   | bool           | false     | Display or not the progress bar below the toast(remaining time) |
| pauseOnHover      | bool           | true      | Keep the timer running or not on hover                          |
| closeOnClick      | bool           | true      | Dismiss toast on click                                          |
| newestOnTop       | bool           | false     | Display newest toast on top                                     |
| className         | string         | -         | Add optional classes to the container                           |
| style             | object         | -         | Add optional inline style to the container                      |
| toastClassName    | string         | -         | Add optional classes to the toast                               |
| bodyClassName     | string         | -         | Add optional classes to the toast body                          |
| progressClassName | string         | -         | Add optional classes to the progress bar                        |
      

### toast (Type: Object) 
   
All the method of toast return a **toastId** except `dismiss` and `isActive`. 
The **toastId** can be used to remove a toast programmatically or to check if the toast is displayed. 

   
| Parameter | Type    | Required      | Description                                                   |
| --------- | ------- | ------------- | ------------------------------------------------------------- |
| content   | string or React Element | ✓                                                             | Element that will be displayed |
| options   | object  | ✘             | Possible keys : autoClose, type, closeButton, hideProgressBar |  |

- Available options :
    - `type`: Kind of notification. One of "default", "success", "info", "warning", "error". You can use `toast.TYPE.INFO` and so on to avoid any typo.
    - `onOpen`: Called inside componentDidMount
    - `onClose`: Called inside componentWillUnmount
    - `autoClose`: same as ToastContainer.
    - `closeButton`: same as ToastContainer.
    - `transition`: same as ToastContainer.
    - `closeOnClick`: same as ToastContainer.
    - `hideProgressBar`: same as ToastContainer.
    - `position`: same as ToastContainer
    - `pauseOnHover`: same as ToastContainer
    - `className`: same as ToastContainer toastClassName
    - `bodyClassName`: same as ToastContainer
    - `progressClassName`: same as ToastContainer
    
:warning:️ *Toast options supersede ToastContainer props* :warning:

```javascript
const Img = ({ src }) => <div><img width={48} src={src} /></div>;
const options = {
    onOpen: props => console.log(props.foo),
    onClose: props => console.log(props.foo),
    autoClose: 6000, 
    closeButton: <FontAwesomeCloseButton />,
    type: toast.TYPE.INFO,
    hideProgressBar: false,
    position: toast.POSITION.TOP_LEFT,
    pauseOnHover: true,
    transition: MyCustomTransition
};

const toastId = toast(<Img foo={bar}/>, options) // default, type: 'default'
toast.success("Hello", options) // add type: 'success' to options
toast.info("World", options) // add type: 'info' to options
toast.warn(<Img />, options) // add type: 'warning' to options
toast.error(<Img />, options) // add type: 'error' to options
toast.dismiss() // Remove all toasts !
toast.dismiss(toastId) // Remove given toast
toast.isActive(toastId) //Check if a toast is displayed or not
```

## Browser Support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- | --- | --- | --- |
IE 11+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Release Notes

### V2.1.7

- Can now use [sass variable default](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#Variable_Defaults___default) thanks to [vikpe](https://github.com/vikpe) 
### V2.1.5

- Test suites improved

### V2.1.4

- Fix broken typescript dependencies

### V2.1.3

- Added typescript definition
- Toast will pause when page is not visible thanks to page visibility api.

### V2.1.2

- Previous version was breaking compatibility with react < 16
### V2.1.1

#### Bugfix

- Remove toast from react dom when not displayed. Because of that the `onClose` callback on the toast was never called. Relate to [issue #50](https://github.com/fkhadra/react-toastify/issues/50)

### V2.1.0

#### New Features

- Can set a custom transition when the toat enter and exit the screen :sparkles:

#### Others

- Upgrade to react v16
- Upgrade to enzyme v3
- Switched to react-app preset for eslint
- Upgrade to webpack v3
- Upgrade to react-transition-group v2


### V2.0.0

This version may introduce breaking changes due to redesign. My apologies.

But, it brings a lots of new and exciting features ! 

#### New Features

- The default design has been reviewed. The component is now usable out of the box without the need to touch the css. Relate to [issue #28](https://github.com/fkhadra/react-toastify/issues/28)
- The toast timer can keep running on hover. [issue #33](https://github.com/fkhadra/react-toastify/issues/33)
- Added a possibility to check if a given toast is displayed or not. By using that method we can prevent duplicate. [issue #3](https://github.com/fkhadra/react-toastify/issues/3)
- Can decide to close the toast on click
- Can show newest toast on top
- Can define additionnal className for toast[issue #21](https://github.com/fkhadra/react-toastify/issues/21)
- Much more mobile ready than the past

#### Bug Fixes

- The space in of left boxes from window & right boxes from window is different.[issue #25](https://github.com/fkhadra/react-toastify/issues/25)
- Partial support of ie11. I still need to fix the animation but I need a computer with ie11 for that xD [issue #26](https://github.com/fkhadra/react-toastify/issues/26)

### v1.7.0

#### New Features

- Toast can now be positioned individually ! 

### v1.6.0

#### New Features

- Can now remove a toast programmatically. When you display a toast, the function return a **toastId**. You can use it
as follow to remove a given toast `toast.dismiss(toastId)`
- If the container is not mounted, the notification will be added to a queue and dispatched as soon as the container is mounted.
For more details check [issue #4](https://github.com/fkhadra/react-toastify/issues/4)

#### Others

- Added --no-idents flag to cssnano to avoid animation name collision with others libs.
- Tests are no longer transpiled 

### v1.5.0

- That version does not bring any features but it brings tests made with the amazing jest and aslo Travis CI integration. 

### v1.4.3

- React and react-dom are now peer dependencies

### v1.4.2

- Don't try to pass down the props when we render a string like so : `toast(<div>hello</div>)`

#### Bug fix

- Fixed the test to check if the toast can be rendered  

### v1.4.0

- React v16 ready : moving to prop-types and react-transition-group
- Internal rewrite of components. The implementation wasn't bad but it wasn't good either. A better props validation has been added has well.
- Removed useless dependencies. I was using the Object.values polyfill when a one line forEach can do the same is my case.
- Now I believe it's even easier to style the components. The sass sources files are now included when you install the package via yarn or npm
- The default close button has been replaced. 

#### New Features

- A progress bar is now visible to track the remaining time before the notification is closed. Of course if you don't like it, you are free to disable it.
- You can choose to display a close button or not.
- Event pointer is set to none to avoid losing pointer events on everything beneath the toast container when no toast are displayed
- The `closeToast` callback is also passed down to your component.

### v1.3.0

- PropTypes package update
- Dead code elimination

#### New Features

- Possibility to use a custom close button. Check the api docs of ToastContainer and toast.

### v1.2.2

I was storing react component into state which is a bad practice. [What should Go in State](http://web.archive.org/web/20150419023006/http://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html)
This is no more the case now. The separation of concern between the data and the view is respected.

#### Bug fix

- Was calling cloneElement on undefined which cause your console bleed. See issue [#2](https://github.com/fkhadra/react-toastify/issues/2)


### v1.2.1

#### Bug fix

- Added Object.values polyfill otherwise won't work with IE or EDGE. I ♥ IE.

### v1.1.1

#### Bug fix

- OnClose and OnOpen can access all the props passed to the component. Before
only the props passed using toast options were accessible

#### New Features

- Passing prop using toast option will be removed at the next release. It doesn't
make sense to keep both way to pass props. Use the react way instead

### v1.1.0

#### New Features

- Added onOpen callback
- Added onClose callback

## Contribute

Show your 😻 and support by giving a ⭐. Any suggestions and pull request are welcome ! 
   
## License
   
Licensed under MIT
