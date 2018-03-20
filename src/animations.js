import buildAnimation from './animations/buildAnimation';

import bounce from './animations/bounce';
import slide from './animations/slide';
import zoom from './animations/zoom';
import flip from './animations/flip';

const bounceAnimation = buildAnimation(bounce);
const slideAnimation = buildAnimation(slide);
const zoomAnimation = buildAnimation(zoom);
const flipAnimation = buildAnimation(flip);


export {
  bounceAnimation as bounce,
  slideAnimation as slide,
  zoomAnimation as zoom,
  flipAnimation as flip
};
