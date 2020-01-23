import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { TYPE, RT_NAMESPACE, TypeOptions } from './../utils';

export interface ProgressBarProps {
  delay: number;
  isRunning: boolean;
  closeToast: () => void;
  type: TypeOptions;
  hide?: boolean;
  className?: string;
  style?: CSSProperties;
  controlledProgress?: boolean;
  progress?: number;
  rtl?: boolean;
}

export function ProgressBar({
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
}: ProgressBarProps) {
  const style: CSSProperties = {
    ...userStyle,
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? 'running' : 'paused',
    opacity: hide ? 0 : 1
  };

  if (controlledProgress) style.transform = `scaleX(${progress})`;

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

  // 🧐 controlledProgress is derived from progress
  // so if controlledProgress is set
  // it means that this is also the case for progress
  const animationEvent = {
    [controlledProgress && progress! >= 1
      ? 'onTransitionEnd'
      : 'onAnimationEnd']:
      controlledProgress && progress! < 1 ? null : closeToast
  };

  return <div className={classNames} style={style} {...animationEvent} />;
}

ProgressBar.propTypes = {
  /**
   * The animation delay which determine when to close the toast
   */
  delay: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,

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
