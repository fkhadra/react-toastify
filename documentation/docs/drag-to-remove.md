---
id: 'drag-to-remove'
title: 'Drag to remove'
sidebar_label: 'Drag to remove'
---

You can drag the toast to remove it:

![drag](https://user-images.githubusercontent.com/5574267/38770523-9438ff7c-4014-11e8-93a5-acd7dbdae52b.gif)

## Define the width percentage to remove the toast

You need to drag 80% of the toast width to remove it. This can be changed to fit your need:

- Replace the default one:

```jsx
<ToastContainer draggablePercent={60} />
```

- Replace per toast:

```jsx
toast('Hello', {
  draggablePercent: 60
});
```

## Disable it

- Disable by default for all toast:

```jsx
<ToastContainer draggable={false} />
```

- Disable per toast:

```jsx
toast('Hello', {
  draggable: false
});
```

