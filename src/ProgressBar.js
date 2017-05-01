import React from 'react';
import PropTypes from 'prop-types';

import config from './config';

function ProgressBar({ delay, isRunning, closeToast, type, hide }) {
  const style = {
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? 'running' : 'paused'
  };
  style.WebkitAnimationPlayState = style.animationPlayState;

  if (hide) {
    style.opacity = 0;
  }

  return (
    <div
      className={`toastify__progress toastify__progress--${type}`}
      style={style}
      onAnimationEnd={closeToast}
    />
  );
}

ProgressBar.propTypes = {
  /**
   * The animation delay which determine when to close the toast
   */
  delay: PropTypes.number.isRequired,

  /**
   * Whether or not the animation is running or paused
   */
  isRunning: PropTypes.bool.isRequired,

  /**
   * Func to close the current toast
   */
  closeToast: PropTypes.func.isRequired,

  /**
   * Optional type : info, success ...
   */
  type: PropTypes.string,

  /**
   * Hide or not the progress bar
   */
  hide: PropTypes.bool
};

ProgressBar.defaultProps = {
  type: config.TYPE.DEFAULT,
  hide: false
};

export default ProgressBar;
