import * as React from 'react';

function getType(type: string) {
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

export interface ToastCodeProps {
  position: string;
  disableAutoClose: boolean;
  autoClose: boolean | number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  type: string;
  draggable: boolean;
  progress: number;
}

export const ToastCode: React.FC<ToastCodeProps> = ({
  position,
  disableAutoClose,
  autoClose,
  hideProgressBar,
  closeOnClick,
  pauseOnHover,
  type,
  draggable,
  progress
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
        {`: "${position}"`},
      </div>
      <div>
        <span className="code__props">autoClose</span>
        {`: ${disableAutoClose ? false : autoClose}`},
      </div>
      <div>
        <span className="code__props">hideProgressBar</span>
        {`: ${hideProgressBar ? 'true' : 'false'}`},
      </div>
      <div>
        <span className="code__props">closeOnClick</span>
        {`: ${closeOnClick ? 'true' : 'false'}`},
      </div>
      <div>
        <span className="code__props">pauseOnHover</span>
        {`: ${pauseOnHover ? 'true' : 'false'}`},
      </div>
      <div>
        <span className="code__props">draggable</span>
        {`: ${draggable ? 'true' : 'false'}`},
      </div>
      {!Number.isNaN(progress) && (
        <div>
          <span className="code__props">progress</span>
          {`: ${progress}`},
        </div>
      )}
      <div>{`});`}</div>
    </div>
  </div>
);
