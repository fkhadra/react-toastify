import * as React from 'react';
import { ToastContainerProps } from '../../src';

function getProp<L, R>(prop: L, value: R) {
  return value ? (
    <div>
      <span className="code__props">{prop}</span>
    </div>
  ) : (
    <div>
      <span className="code__props">{prop}</span>
      {`={false}`}
    </div>
  );
}

export interface ContainerCodeProps extends Partial<ToastContainerProps> {
  isDefaultProps: boolean;
  disableAutoClose: boolean;
}

export const ContainerCode: React.FC<ContainerCodeProps> = ({
  position,
  disableAutoClose,
  autoClose,
  hideProgressBar,
  newestOnTop,
  closeOnClick,
  pauseOnHover,
  rtl,
  pauseOnFocusLoss,
  isDefaultProps,
  draggable
}) => (
  <div>
    <h3>Toast Container</h3>
    <div className="code">
      <div>
        <span>{`<`}</span>
        <span className="code__component">ToastContainer</span>
      </div>
      <div>
        <span className="code__props">position</span>
        {`="${position}"`}
      </div>
      <div>
        <span className="code__props">autoClose</span>
        {`={${disableAutoClose ? false : autoClose}}`}
      </div>
      {!disableAutoClose ? getProp('hideProgressBar', hideProgressBar) : ''}
      {getProp('newestOnTop', newestOnTop)}
      {getProp('closeOnClick', closeOnClick)}
      {getProp('rtl', rtl)}
      {getProp('pauseOnFocusLoss', pauseOnFocusLoss)}
      {getProp('draggable', draggable)}
      {!disableAutoClose ? getProp('pauseOnHover', pauseOnHover) : ''}
      <div>
        <span>{`/>`}</span>
      </div>
      {isDefaultProps && (
        <div>
          <div>{`{/* Same as */}`}</div>
          <span>{`<`}</span>
          <span className="code__component">ToastContainer</span>
          <span>{'/>'}</span>
        </div>
      )}
    </div>
  </div>
);
