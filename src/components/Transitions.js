import cssTransition from './../utils/cssTransition';

const Bounce = cssTransition({
  enter: 'Toastify__bounce-enter',
  exit: 'Toastify__bounce-exit',
  appendPosition: true
});

const Slide = cssTransition({
  enter: 'Toastify__slide-enter',
  exit: 'Toastify__slide-exit',
  duration: [450, 750],
  appendPosition: true
});

const Zoom = cssTransition({
  enter: 'Toastify__zoom-enter',
  exit: 'Toastify__zoom-exit'
});

const Flip = cssTransition({
  enter: 'Toastify__flip-enter',
  exit: 'Toastify__flip-exit'
});

export { Bounce, Slide, Zoom, Flip };
