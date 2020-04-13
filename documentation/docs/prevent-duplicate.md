---
id: 'prevent-duplicate'
title: 'Prevent duplicate'
sidebar_label: 'Prevent duplicate'
---

There are two ways to prevent duplicates toast. Use the one that fits your use case 👌.

## Simply provide a toast id

Providing a custom toast id is certainly the most straightforward way to prevent duplicate.

```js
import React from 'react';
import { toast } from 'react-toastify';

const customId = "custom-id-yes";

function Example(){
  const notify = () => {
    toast("I cannot be duplicated!", {
      toastId: customId
    });
  }

  return (
    <div>
      <button onClick={notify}>Notify</button>
    </div>
  )
}
```

## Check if a toast is already displayed

Maybe there is some situations where you cannot provide a custom toast id, in that case, you can check if a toast is already displayed by calling `toast.isActive(id)`.

```jsx
import React from 'react';
import { toast } from 'react-toastify';

function Example(){
  const toastId = React.useRef(null);
  
  const notify = () => {
    if(! toast.isActive(toastId.current)) {
      toastId.current = toast("I cannot be duplicated!");
    }
  }

  return (
    <div>
      <button onClick={notify}>Notify</button>
    </div>
  )
}
```
