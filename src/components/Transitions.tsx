import { DEFAULT, cssTransition } from '../utils';

const Bounce = cssTransition({
  enter: `${DEFAULT.CSS_NAMESPACE}__bounce-enter`,
  exit: `${DEFAULT.CSS_NAMESPACE}__bounce-exit`,
  appendPosition: true
});

const Slide = cssTransition({
  enter: `${DEFAULT.CSS_NAMESPACE}__slide-enter`,
  exit: `${DEFAULT.CSS_NAMESPACE}__slide-exit`,
  duration: [450, 750],
  appendPosition: true
});

const Zoom = cssTransition({
  enter: `${DEFAULT.CSS_NAMESPACE}__zoom-enter`,
  exit: `${DEFAULT.CSS_NAMESPACE}__zoom-exit`
});

const Flip = cssTransition({
  enter: `${DEFAULT.CSS_NAMESPACE}__flip-enter`,
  exit: `${DEFAULT.CSS_NAMESPACE}__flip-exit`
});

export { Bounce, Slide, Zoom, Flip };
