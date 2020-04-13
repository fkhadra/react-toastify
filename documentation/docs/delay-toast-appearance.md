---
id: 'delay-toast-appearance'
title: 'Delay notification appearance'
sidebar_label: 'Delay notification appearance'
---

You can delay the notification appearance as shown below. Under the hood, the library simply uses `setTimeout` for you.

```js
toast('Show now');
toast('Show after 1sec', { delay: 1000 });
```

:::important Important
`toast.dismiss` has no effect if called during the delay before a given toast appears.
:::
