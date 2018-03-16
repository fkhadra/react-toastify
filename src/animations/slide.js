import { POSITION } from './../utils/constant';

// animation state used by enter:to and exit:from
const commonState = { transform: 'translate3d(0, 0, 0)' };

export default function getAnimation(pos) {
  switch (pos) {
    case POSITION.TOP_RIGHT:
    case POSITION.BOTTOM_RIGHT:
    default:
      return {
        enter: {
          from: {
            transform: 'translate3d(-100%, 0, 0)',
            visibility: 'visible'
          },
          to: commonState
        },
        exit: {
          from: commonState,
          to: {
            visibility: 'hidden',
            transform: 'translate3d(100%, 0, 0)'
          }
        }
      };
    case POSITION.TOP_LEFT:
    case POSITION.BOTTOM_LEFT:
      return {
        enter: {
          from: {
            transform: 'translate3d(100%, 0, 0)',
            visibility: 'visible'
          },
          to: commonState
        },
        exit: {
          from: commonState,
          to: {
            visibility: 'hidden',
            transform: 'translate3d(100%, 0, 0)'
          }
        }
      };
    case POSITION.BOTTOM_CENTER:
      return {
        enter: {
          from: {
            transform: 'translate3d(0, 100%, 0)',
            visibility: 'visible'
          },
          to: commonState
        },
        exit: {
          from: commonState,
          to: {
            visibility: 'hidden',
            transform: 'translate3d(0, 100%, 0)'
          }
        }
      };
    case POSITION.TOP_CENTER:
      return {
        enter: {
          from: {
            transform: 'translate3d(0, -100%, 0)',
            visibility: 'visible'
          },
          to: commonState
        },
        exit: {
          from: commonState,
          to: {
            visibility: 'hidden',
            transform: 'translate3d(0, -100%, 0)'
          }
        }
      };
  }
}
