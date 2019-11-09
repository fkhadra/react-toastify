import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { TYPE, RT_NAMESPACE, falseOrDelay } from './../utils';

function ProgressBar({
  delay,
  isRunning,
  closeToast,
  type,
  hide,
  className,
  style: userStyle,
  controlledProgress,
  progress,
  rtl
}) {
  const style = {
    ...userStyle,
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? 'running' : 'paused',
    opacity: hide ? 0 : 1,
    transform: controlledProgress ? `scaleX(${progress})` : null
  };

  const classNames = cx(
    `${RT_NAMESPACE}__progress-bar`,
    controlledProgress
      ? `${RT_NAMESPACE}__progress-bar--controlled`
      : `${RT_NAMESPACE}__progress-bar--animated`,
    `${RT_NAMESPACE}__progress-bar--${type}`,
    {
      [`${RT_NAMESPACE}__progress-bar--rtl`]: rtl
    },
    className
  );

  const animationEvent = {
    [controlledProgress && progress >= 1
      ? 'onTransitionEnd'
      : 'onAnimationEnd']:
      controlledProgress && progress < 1 ? null : closeToast
  };

  return <div className={classNames} style={style} {...animationEvent} />;
}

ProgressBar.propTypes = {
  /**
   * The animation delay which determine when to close the toast
   */
  delay: falseOrDelay.isRequired,

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
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Controlled progress value
   */
  progress: PropTypes.number,

  /**
   * Tell wether or not controlled progress bar is used
   */
  controlledProgress: PropTypes.bool
};

ProgressBar.defaultProps = {
  type: TYPE.DEFAULT,
  hide: false
};

export default ProgressBar;
