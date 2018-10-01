import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { TYPE } from './../utils/constant';

function ProgressBar({
  delay,
  isRunning,
  closeToast,
  type,
  hide,
  className,
  style: userStyle,
  rtl
}) {
  const style = {
    ...userStyle,
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? 'running' : 'paused',
    opacity: hide ? 0 : 1
  };

  const classNames = cx(
    'Toastify__progress-bar',
    `Toastify__progress-bar--${type}`,
    {
      'Toastify__progress-bar--rtl': rtl
    },
    className
  );

  return (
    <div className={classNames} style={style} onAnimationEnd={closeToast} />
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
   * Support rtl content
   */
  rtl: PropTypes.bool.isRequired,

  /**
   * Optional type : info, success ...
   */
  type: PropTypes.string,

  /**
   * Hide or not the progress bar
   */
  hide: PropTypes.bool,

  /**
   * Optionnal className
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

ProgressBar.defaultProps = {
  type: TYPE.DEFAULT,
  hide: false
};

export default ProgressBar;
