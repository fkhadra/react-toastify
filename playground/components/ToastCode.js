import React from 'react';

function getType(type) {
  switch (type) {
    case 'default':
    default:
      return 'toast';
    case 'success':
      return 'toast.success';
    case 'error':
      return 'toast.error';
    case 'info':
      return 'toast.info';
    case 'warning':
      return 'toast.warn';
  }
}

const ToastCode = ({
  position,
  disableAutoClose,
  autoClose,
  hideProgressBar,
  enableCustomContent,
  newestOnTop,
  closeOnClick,
  pauseOnHover,
  rtl,
  pauseOnVisibilityChange,
  type,
  draggable
}) => (
  <div>
    <h3>Toast Emitter</h3>
    <div className="code">
      <div>
        <span className="code__component">{getType(type)}</span>
        {`('🦄 Wow so easy!', { `}
      </div>
      <div>
        <span className="code__props">position</span>
        {`: "${position}"`}
      </div>
      <div>
        <span className="code__props">autoClose</span>
        {`: ${disableAutoClose ? false : autoClose}`}
      </div>
      <div>
        <span className="code__props">hideProgressBar</span>
        {`: ${hideProgressBar ? 'true' : 'false'}`}
      </div>
      <div>
        <span className="code__props">closeOnClick</span>
        {`: ${closeOnClick ? 'true' : 'false'}`}
      </div>
      <div>
        <span className="code__props">pauseOnHover</span>
        {`: ${pauseOnHover ? 'true' : 'false'}`}
      </div>
      <div>
        <span className="code__props">draggable</span>
        {`: ${draggable ? 'true' : 'false'}`}
      </div>
        {
          enableCustomContent ?
            <div>
              <span className="code__props">useCustomContent</span>
              : false - [* mandatory to disable customComponent]
            </div> : 
            ''
        }

      <div>{`});`}</div>
    </div>
  </div>
);

export default ToastCode;
