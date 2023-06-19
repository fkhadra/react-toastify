import { Bounce, Slide, Flip, Zoom } from '../../../src/index';

export const flags = [
  {
    id: 'disableAutoClose',
    label: 'Disable auto-close'
  },
  {
    id: 'hideProgressBar',
    label: 'Hide progress bar(less fanciness!)'
  },
  {
    id: 'newestOnTop',
    label: 'Newest on top*'
  },
  {
    id: 'closeOnClick',
    label: 'Close on click'
  },
  {
    id: 'pauseOnHover',
    label: 'Pause delay on hover'
  },
  {
    id: 'pauseOnFocusLoss',
    label: 'Pause toast when the window loses focus'
  },
  {
    id: 'rtl',
    label: 'Right to left layout*'
  },
  {
    id: 'draggable',
    label: 'Allow to drag and close the toast'
  }
];

export const transitions = {
  bounce: Bounce,
  slide: Slide,
  zoom: Zoom,
  flip: Flip
};

export const themes = <const>['light', 'dark', 'colored'];

export const positions = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center'
};

export const typs = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DEFAULT: 'default'
};
