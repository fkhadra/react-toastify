# React Toastify [![npm](https://img.shields.io/npm/dt/react-toastify.svg)]() [![npm](https://img.shields.io/npm/v/react-toastify.svg)]() [![license](https://img.shields.io/github/license/sniphpet/react-toastify.svg?maxAge=2592000)]()
   
React-Toastify allow you to add toast notification to your app with ease.

## Demo
   
Check the demo [here](https://sniphpet.github.io/react-toastify/)   
   
## Installation 
   
```
$ npm install --save react-toastify
```
   
If you use a style loader you can import the stylesheet as follow :
   
```javascript
import 'react-toastify/dist/ReactToastify.min.css' 
```

## Features

- Can display a react component inside the toast !
- Has ```onOpen``` and ```onClose``` hooks. Both can access the props passed to the react component rendered inside the toast
- Can be positioned
- Define behavior per toast
- Super easy to style

## Deprecation Notice

Starting v1.2.0 passing props using toast options will be removed. Use the react way instead :

```javascript
toast(<MyComponent foo="bar" foorbar={myFunction} />);
//instead of 
toast(<MyComponent />, {
    props: {
        foo: "bar",
        foorbar: myFunction
    }
});
```

Thank you for your understanding, God bless you !


## How it works ?
   
The component use a dead simple pubsub to listen and trigger event. The pubsub allow us to display a toast from everywhere in your app.
   
- Add a ToastContainer to your app
   
```javascript
import React from 'react';
import { render } from ReactDOM;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

const App = () => {
  return (
    <div>
        {/*Your others component*/}
      <ToastContainer autoClose={3000} position="top-center"/>
    </div>
  );
};

render(
  <App/>,
  document.getElementById('root')
);

```

- Display a Toast from everywhere !
   
```javascript
import React from 'react';
import { toast } from 'react-toastify';
    
function handleClick() {
    toast('Hello', {
      type: toast.TYPE.INFO
    });
}
    
const ToastBtn = () => {
    return(
        <button onClick={handleClick}>My Awesome Button</button>
    )
}
```
  
## Api
  
### ToastContainer (Type : React Component)
   
|Props|Type|Default|Description|
|-----|----|-------|-----------|
|position|string|top-right|Define where the toast appear|
|autoClose|false\|int|5000|Delay in ms to close the toast. If set to false, the notification need to be closed manualy|
|className|string|-|Add classes to the container|
|style|object|-|Add inline style to the container|
      
position accept the following value : 
      
```javascript
top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
```
      
You can use the toast object to avoid any typo :

```javascript
import { toast } from 'react-toastify';
      
toast.POSITION.TOP_LEFT, toast.POSITION.TOP_RIGHT, toast.POSITION.TOP_CENTER
toast.POSITION.BOTTOM_LEFT,toast.POSITION.BOTTOM_RIGHT, toast.POSITION.BOTTOM_CENTER
```  
   
### toast (Type: Object)
   
All the function inside toast can take 2 parameters :
   
|Parameter|Type|Required|Description|
|---------|----|--------|-----|
|content|string\|React Element|✓|Element that will be displayed|
|options|object|✘|Possible keys : autoClose, type, props
   
If you pass an autoClose parameter it will overwrite the autoClose behavior defined in the container.

```javascript
const Img = (props) => <div><img width={48} src={props.foo} /></div>;
const options = {
    //callback can access props passed to the component
    onOpen: (props) => {console.log(props.foo)},
    onClose: (props) => {console.log(props.foo)},
    autoClose: false, //The user need to close the toast to remove it
    // props will be passed to the component displayed by the notification 
    // Will be removed at the next release. Pass the props directly to the component instead
    props: { 
           foo: 'bar'
    },
    type: toast.TYPE.INFO
};
   
toast(<Img foo={bar}/>, options) // default, type: 'default'
toast.success("Hello", options) // add type: 'success' to options
toast.info("World", options) // add type: 'info' to options
toast.warn(<Img />, options) // add type: 'warning' to options
toast.error(<Img />, options) // add type: 'error' to options
toast.dismiss() // Remove all toasts !
```

## Release Notes

### 1.2.2

I was storing react component into state which is a bad practice. [What should Go in State](http://web.archive.org/web/20150419023006/http://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html)
This is no more the case now. The separation of concern between the data and the view is respected.

#### Bug fix

- Was calling cloneElement on undefined which cause your console bleed. See issue [#2](https://github.com/sniphpet/react-toastify/issues/2)


### 1.2.1

#### Bug fix

- Added Object.values polyfill otherwise won't work with IE or EDGE

### 1.1.1

#### Bug fix

- OnClose and OnOpen can access all the props passed to the component. Before
only the props passed using toast options were accessible

#### Features

- Passing prop using toast option will be removed at the next release. It doesn't
make sense to keep both way to pass props. Use the react way instead

### 1.1.0

#### Features

- Added onOpen callback
- Added onClose callback

## Contribute

Any suggestions and pull request are welcome !
   
## License
   
Licensed under MIT
