import buildAnimation from './animations/buildAnimation';
import bounce from './animations/bounce';
import slide from './animations/slide';
import zoom from './animations/zoom';

const bounceAnimation = buildAnimation(bounce);
const slideAnimation = buildAnimation(slide);
const zoomAnimation = buildAnimation(zoom);

export {
  bounceAnimation as bounce,
  slideAnimation as slide,
  zoomAnimation as zoom
};
