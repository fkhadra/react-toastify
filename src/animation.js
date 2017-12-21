import { POSITION } from './constant';

export default function getAnimation(pos) {
  switch (pos) {
    case POSITION.TOP_RIGHT:
    case POSITION.BOTTOM_RIGHT:
    default:
      return {
        enter: {
          from: {
            opacity: 0,
            transform: 'translate3d(3000px, 0, 0)'
          },
          '60%': {
            opacity: 1,
            transform: 'translate3d(-25px, 0, 0)'
          },
          '75%': {
            transform: 'translate3d(10px, 0, 0)'
          },
          '90%': {
            transform: 'translate3d(-5px, 0, 0)'
          },
          to: {
            transform: 'none'
          }
        },
        exit: {
          '20%': {
            opacity: 1,
            transform: 'translate3d(-20px, 0, 0)'
          },
          to: {
            opacity: 0,
            transform: 'translate3d(2000px, 0, 0)'
          }
        }
      };
    case POSITION.TOP_LEFT:
    case POSITION.BOTTOM_LEFT:
      return {
        enter: {
          '0%': {
            opacity: 0,
            transform: 'translate3d(-3000px, 0, 0)'
          },
          '60%': {
            opacity: 1,
            transform: 'translate3d(25px, 0, 0)'
          },
          '75%': {
            transform: 'translate3d(-10px, 0, 0)'
          },
          '90%': {
            transform: 'translate3d(5px, 0, 0)'
          },
          to: {
            transform: 'none'
          }
        },
        exit: {
          '20%': {
            opacity: 1,
            transform: 'translate3d(20px, 0, 0)'
          },
          to: {
            opacity: 0,
            transform: 'translate3d(-2000px, 0, 0)'
          }
        }
      };
    case POSITION.BOTTOM_CENTER:
      return {
        enter: {
          from: {
            opacity: 0,
            transform: 'translate3d(0, 3000px, 0)'
          },
          '60%': {
            opacity: 1,
            transform: 'translate3d(0, -20px, 0)'
          },
          '75%': {
            transform: 'translate3d(0, 10px, 0)'
          },
          '90%': {
            transform: 'translate3d(0, -5px, 0)'
          },
          to: {
            transform: 'translate3d(0, 0, 0)'
          }
        },
        exit: {
          '20%': {
            transform: 'translate3d(0, 10px, 0)'
          },
          '40%, 45%': {
            opacity: 1,
            transform: 'translate3d(0, -20px, 0)'
          },
          to: {
            opacity: 0,
            transform: 'translate3d(0, 2000px, 0)'
          }
        }
      };
    case POSITION.TOP_CENTER:
      return {
        enter: {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0, -3000px, 0)'
          },
          '60%': {
            opacity: 1,
            transform: 'translate3d(0, 25px, 0)'
          },
          '75%': {
            transform: 'translate3d(0, -10px, 0)'
          },
          '90%': {
            transform: 'translate3d(0, 5px, 0)'
          },
          to: {
            transform: 'none'
          }
        },
        exit: {
          '20%': {
            transform: 'translate3d(0, -10px, 0)'
          },
          '40%, 45%': {
            opacity: 1,
            transform: 'translate3d(0, 20px, 0)'
          },
          to: {
            opacity: 0,
            transform: 'translate3d(0, -2000px, 0)'
          }
        }
      };
  }
}
