import { POSITION } from './../utils/constant';

// animation state used by enter:to and exit:from
const commonState = { transform: 'translate3d(0, 0, 0)' };

export default function(pos) {
  let animation;

  switch (pos) {
    case POSITION.TOP_RIGHT:
    case POSITION.BOTTOM_RIGHT:
    default:
      animation = {
        enter: {
          from: {
            transform: 'translate3d(100%, 0, 0)',
            visibility: 'visible'
          }
        },
        exit: {
          to: {
            visibility: 'hidden',
            transform: 'translate3d(100%, 0, 0)'
          }
        }
      };
      break;
    case POSITION.TOP_LEFT:
    case POSITION.BOTTOM_LEFT:
      animation = {
        enter: {
          from: {
            transform: 'translate3d(-100%, 0, 0)',
            visibility: 'visible'
          }
        },
        exit: {
          to: {
            visibility: 'hidden',
            transform: 'translate3d(-100%, 0, 0)'
          }
        }
      };
      break;
    case POSITION.BOTTOM_CENTER:
      animation = {
        enter: {
          from: {
            transform: 'translate3d(0, 100%, 0)',
            visibility: 'visible'
          }
        },
        exit: {
          to: {
            visibility: 'hidden',
            transform: 'translate3d(0, 100%, 0)'
          }
        }
      };
      break;
    case POSITION.TOP_CENTER:
      animation = {
        enter: {
          from: {
            transform: 'translate3d(0, -100%, 0)',
            visibility: 'visible'
          }
        },
        exit: {
          to: {
            visibility: 'hidden',
            transform: 'translate3d(0, -100%, 0)'
          }
        }
      };
      break;
  }

  animation.enter.to = animation.exit.from = commonState;

  return animation;
}
