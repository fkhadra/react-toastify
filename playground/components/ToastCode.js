import React from 'react';

function getProp(prop, value) {
  return value ? prop : `${prop}={false}`;
}

function getType(type) {
  switch (type) {
    case "default":
    default:
      return 'toast(';
    case "success":
    return 'toast.success(';
    case "error":
      return 'toast.error(';
    case "info":
      return 'toast.info(';
    case "warning":
    return 'toast.warn(';
  }
}

const ToastCode = ({
  position,
  disableAutoClose,
  autoClose,
  hideProgressBar,
  newestOnTop,
  closeOnClick,
  pauseOnHover,
  rtl,
  pauseOnVisibilityChange,
  type
}) => (
  <div>
    <h3>Toast Emitter</h3>
    <div className="code">
      <div>
        {`${getType(type)}Lorem Ipsum, { `}
      </div>
      <div>{`position: "${position}"`}</div>
      <div>{`autoClose: ${disableAutoClose ? false : autoClose}`}</div>
      <div>{`hideProgressBar: ${hideProgressBar ? 'true' : 'false'}`}</div>
      <div>{`closeOnClick: ${closeOnClick ? 'true' : 'false'}`}</div>
      <div>{`pauseOnHover: ${pauseOnHover ? 'true' : 'false'}`}</div>
      <div>
        {`});`}
      </div>
    </div>
  </div>
);

export default ToastCode;
