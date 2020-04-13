---
id: 'use-a-custom-id'
title: 'Use a custom id'
sidebar_label: 'Use a custom id'
---

A custom `toastId` can be used to replace the one generated. You can provide a `number` or a `string`.


```jsx
import React from 'react';
import { toast } from 'react-toastify';

function Example(){
  const notify = () => {
    toast("I use a custom id", {
      toastId: "customId"
    });
  }

  return (
    <div>
      <button onClick={notify}>Notify</button>
    </div>
  );
}
