const style = {
  width: "320px",
  colorDefault: "#fff",
  colorInfo: "#3498db",
  colorSuccess: "#07bc0c",
  colorWarning: "#f1c40f",
  colorError: "#e74c3c",
  colorProgressDefault: "linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)",
  mobile: "only screen and (max-width : 480px)",
  zIndex: 9999,
};

export function defineStyle(props){
  Object.keys(props).forEach(k => {
    const val = props[k];
    if(style.hasOwnProperty(k)){
      style[k] = val;
    }
  });
}

export default style;
