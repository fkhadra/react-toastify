/*
* Default Config values
* */

const config = {
  POSITION: {
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right'
  },
  TYPE: {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    DEFAULT: 'default'
  }
};

/*
* Will be used if many provider are rendered
* */
let id = 0;
const getProviderId = () => `rt__${++id}`;

export { config, getProviderId };
