const style = {
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
  zIndex: 9999
};

export function defineStyle(props) {
  for (let prop in props) {
    style[prop] = props[prop];
  }
}

export default style;
