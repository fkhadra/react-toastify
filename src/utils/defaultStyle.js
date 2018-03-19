const defaultStyle = {
  width: '320px',
  colorDefault: '#fff',
  colorInfo: '#3498db',
  colorSuccess: '#07bc0c',
  colorWarning: '#f1c40f',
  colorError: '#e74c3c',
  colorProgressDefault:
    'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)',
  mobile: 'only screen and (max-width : 480px)',
  fontFamily: 'sans-serif',
  zIndex: 9999,
  TOP_LEFT: {
    top: '1em',
    left: '1em'
  },
  TOP_CENTER: {
    top: '1em',
    left: '50%'
  },
  TOP_RIGHT: {
    top: '1em',
    right: '1em'
  },
  BOTTOM_LEFT: {
    bottom: '1em',
    left: '1em'
  },
  BOTTOM_CENTER: {
    bottom: '1em',
    left: '50%'
  },
  BOTTOM_RIGHT: {
    bottom: '1em',
    right: '1em'
  }
};

export function defineStyle(props) {
  for (let prop in props) {
    defaultStyle[prop] = props[prop];
  }
}

export default defaultStyle;
