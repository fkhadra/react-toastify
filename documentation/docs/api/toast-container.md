---
id: toast-container
title: ToastContainer
sidebar_label: ToastContainer
---

## Props

| Props                | Type              | Default   | Description                                                                                                 |
|----------------------|-------------------|-----------|-------------------------------------------------------------------------------------------------------------|
| position             | string            | top-right | One of top-right, top-center, top-left, bottom-right, bottom-center, bottom-left                            |
| autoClose            | bool \| number    | 5000      | Delay in ms to close the toast. If set to false, the notification needs to be closed manually               |
| closeButton          | ReactNode \| bool | -         | A React Component to replace the default close button or `false` to hide the button                         |
| transition           | ReactNode         | Bounce    | A reference to a valid react-transition-group/Transition component                                          |
| hideProgressBar      | bool              | false     | Display or not the progress bar below the toast(remaining time)                                             |
| pauseOnHover         | bool              | true      | Keep the timer running or not on hover                                                                      |
| pauseOnFocusLoss     | bool              | true      | Pause the timer when the window loses focus                                                                 |
| rtl                  | bool              | false     | Support right to left content                                                                               |
| closeOnClick         | bool              | true      | Dismiss toast on click                                                                                      |
| newestOnTop          | bool              | false     | Display newest toast on top                                                                                 |
| className            | string            | -         | Add optional classes to the container                                                                       |
| grouClassName        | string            | -         | Add optional classes to the TransitionGroup container                                                       |
| style                | object            | -         | Add optional inline style to the container                                                                  |
| groupStyle           | object            | -         | Add optional inline style to the TransitionGroup container                                                  |
| toastClassName       | string            | -         | Add optional classes to the toast                                                                           |
| bodyClassName        | string            | -         | Add optional classes to the toast body                                                                      |
| progressClassName    | string            | -         | Add optional classes to the progress bar                                                                    |
| progressStyle        | object            | -         | Add optional inline style to the progress bar                                                               |
| draggable            | bool              | true      | Allow toast to be draggable                                                                                 |
| draggablePercent     | number            | 80        | The percentage of the toast's width it takes for a drag to dismiss a toast(value between 0 and 100)         |
| enableMultiContainer | bool              | -         | Enable multi toast container support                                                                        |
| containerId          | string \| number  | -         | Used to identify the ToastContainer when working with multiple container. Also used to set the id attribute |
| limit                | number            | -         | Used to limit the number of toast displayed on screen at the same time                                    |
| role                 | string            | alert     | Define the ARIA role for the toasts                                                                         |

## Usage

```jsx
import { ToastContainer } from 'react-toastify';

<ToastContainer 
  containerId="an id"
  draggable={false}
  {/* etc... */}
/>
```
