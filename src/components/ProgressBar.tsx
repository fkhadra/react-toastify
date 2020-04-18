import React, { CSSProperties } from 'react';
import cx from 'classnames';

import { TYPE, RT_NAMESPACE, TypeOptions } from './../utils';

export interface ProgressBarProps {
  /**
   * The animation delay which determine when to close the toast
   */
  delay: number;

  /**
   * Whether or not the animation is running or paused
   */
  isRunning: boolean;

  /**
   * Func to close the current toast
   */
  closeToast: () => void;

  /**
   * Optional type : info, success ...
   */
  type: TypeOptions;

  /**
   * Hide or not the progress bar
   */
  hide?: boolean;

  /**
   * Optionnal className
   */
  className?: string | null;

  /**
   * Optionnal inline style
   */
  style?: CSSProperties;

  /**
   * Tell wether or not controlled progress bar is used
   */
  controlledProgress?: boolean;

  /**
   * Controlled progress value
   */
  progress?: number | string;

  /**
   * Support rtl content
   */
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

ProgressBar.defaultProps = {
  type: TYPE.DEFAULT,
  hide: false
};
