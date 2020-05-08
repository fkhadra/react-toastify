import { RT_NAMESPACE, cssTransition, onExited } from './../utils';

const Bounce = cssTransition({
  enter: `${RT_NAMESPACE}__bounce-enter`,
  exit: `${RT_NAMESPACE}__bounce-exit`,
  appendPosition: true,
  onExited
});

const Slide = cssTransition({
  enter: `${RT_NAMESPACE}__slide-enter`,
  exit: `${RT_NAMESPACE}__slide-exit`,
  duration: [450, 750],
  appendPosition: true,
  onExited
});

const Zoom = cssTransition({
  enter: `${RT_NAMESPACE}__zoom-enter`,
  exit: `${RT_NAMESPACE}__zoom-exit`,
  onExited
});

const Flip = cssTransition({
  enter: `${RT_NAMESPACE}__flip-enter`,
  exit: `${RT_NAMESPACE}__flip-exit`,
  onExited
});

export { Bounce, Slide, Zoom, Flip };
