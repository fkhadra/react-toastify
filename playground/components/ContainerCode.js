import React from 'react';

function getProp(prop, value) {
  const P = () => <span className="code__props">{prop}</span>;
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

const ContainerCode = ({
  position,
  disableAutoClose,
  autoClose,
  hideProgressBar,
  newestOnTop,
  closeOnClick,
  pauseOnHover,
  rtl,
  pauseOnVisibilityChange,
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
      {getProp('pauseOnVisibilityChange', pauseOnVisibilityChange)}
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
          <span> /></span>
        </div>
      )}
    </div>
  </div>
);

export default ContainerCode;
