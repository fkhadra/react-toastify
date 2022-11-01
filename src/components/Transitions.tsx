import { Default, cssTransition } from '../utils';

const getConfig = (animationName: string, appendPosition = false) => ({
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__${animationName}-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__${animationName}-exit`,
  appendPosition
});

const Bounce = cssTransition(getConfig('bounce', true));

const Slide = cssTransition(getConfig('slide', true));

const Zoom = cssTransition(getConfig('zoom'));

const Flip = cssTransition(getConfig('flip'));

export { Bounce, Slide, Zoom, Flip };
