import cssTransition from './../utils/cssTransition';
import {RT_NAMESPACE} from './../utils/constant';

const Bounce = cssTransition({
  enter: `${RT_NAMESPACE}__bounce-enter`,
  exit: `${RT_NAMESPACE}__bounce-exit`,
  appendPosition: true
});

const Slide = cssTransition({
  enter: `${RT_NAMESPACE}__slide-enter`,
  exit: `${RT_NAMESPACE}__slide-exit`,
  duration: [450, 750],
  appendPosition: true
});

const Zoom = cssTransition({
  enter: `${RT_NAMESPACE}__zoom-enter`,
  exit: `${RT_NAMESPACE}__zoom-exit`
});

const Flip = cssTransition({
  enter: `${RT_NAMESPACE}__flip-enter`,
  exit: `${RT_NAMESPACE}__flip-exit`
});

export { Bounce, Slide, Zoom, Flip };
