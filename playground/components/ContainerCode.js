import React from 'react';

function getProp(prop, value) {
  return value ? prop : `${prop}={false}`;
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
  pauseOnVisibilityChange
}) => (
  <div>
    <h3>Toast Container</h3>
    <div className="code">
      <div>
        <span>{`<`}</span>ToastContainer
      </div>
      <div>{`position="${position}"`}</div>
      <div>{`autoClose={${disableAutoClose ? false : autoClose}}`}</div>
      <div>{`${
        !disableAutoClose ? getProp('hideProgressBar', hideProgressBar) : ''
      }`}</div>
      <div>{`${getProp('newestOnTop', newestOnTop)}`}</div>
      <div>{`${getProp('closeOnClick', closeOnClick)}`}</div>
      <div>{`${getProp('rtl', rtl)}`}</div>
      <div>{`${getProp(
        'pauseOnVisibilityChange',
        pauseOnVisibilityChange
      )}`}</div>
      <div>{` ${
        !disableAutoClose ? getProp('pauseOnHover', pauseOnHover) : ''
      }`}</div>
      <div>
        <span>{`/>`}</span>
      </div>
    </div>
  </div>
);

export default ContainerCode;
