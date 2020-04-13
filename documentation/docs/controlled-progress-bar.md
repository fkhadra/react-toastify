---
id: 'use-a-controlled-progress-bar'
title: 'Use a controlled progress bar'
sidebar_label: 'Use a controlled progress bar'
---

Imagine you want to see the progress of a file upload. The example below features [axios](https://github.com/axios/axios), but it works with anything!

```jsx
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Example(){
  // we need to keep a reference of the toastId to be able to update it
  const toastId = React.useRef(null);

  function handleUpload(){
    axios.request({
      method: "post", 
      url: "/foobar", 
      data: myData, 
      onUploadProgress: p => {
        const progress = p.loaded / p.total;

        // check if we already displayed a toast
        if(toastId.current === null){
            toastId = toast('Upload in Progress', {
            progress: progress
          });
        } else {
          toast.update(toastId.current, {
            progress: progress
          })
        }
      }
    }).then(data => {
      // Upload is done! 
      // The remaining progress bar will be filled up
      // The toast will be closed when the transition end
      toast.done(toastId.current);
    })
  }

  return (
    <div>
      <button onClick={handleUpload}>Upload something</button>
    </div>
  )
}

```
