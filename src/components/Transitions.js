import { cssTransition } from '../utils';
var getConfig = function (animationName, appendPosition) {
  if (appendPosition === void 0) {
    appendPosition = false;
  }
  return {
    enter: ''
      .concat('Toastify' /* Default.CSS_NAMESPACE */, '--animate ')
      .concat('Toastify' /* Default.CSS_NAMESPACE */, '__')
      .concat(animationName, '-enter'),
    exit: ''
      .concat('Toastify' /* Default.CSS_NAMESPACE */, '--animate ')
      .concat('Toastify' /* Default.CSS_NAMESPACE */, '__')
      .concat(animationName, '-exit'),
    appendPosition: appendPosition
  };
};
var Bounce = cssTransition(getConfig('bounce', true));
var Slide = cssTransition(getConfig('slide', true));
var Zoom = cssTransition(getConfig('zoom'));
var Flip = cssTransition(getConfig('flip'));
export { Bounce, Slide, Zoom, Flip };
//# sourceMappingURL=Transitions.js.map
