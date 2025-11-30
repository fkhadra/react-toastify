import React from 'react';
import cx from 'clsx';

import { Default, isFn, Type } from '../utils';
import { Theme, ToastClassName, TypeOptions } from '../types';

export interface ProgressBarProps {
  /**
   * The animation delay which determine when to close the toast
   */
  delay: number;

  /**
   * The animation is running or paused
   */
  isRunning: boolean;

  /**
   * Func to close the current toast
   */
  closeToast: () => void;

  /**
   * Optional type : info, success ...
   */
  type?: TypeOptions;

  /**
   * The theme that is currently used
   */
  theme: Theme;

  /**
   * Hide or not the progress bar
   */
  hide?: boolean;

  /**
   * Optional className
   */
  className?: ToastClassName;

  /**
   * Tell whether a controlled progress bar is used
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

  /**
   * Tell if the component is visible on screen or not
   */
  isIn?: boolean;
}

export function ProgressBar({
  delay,
  isRunning,
  closeToast,
  type = Type.DEFAULT,
  hide,
  className,
  controlledProgress,
  progress,
  rtl,
  isIn,
  theme
}: ProgressBarProps) {
  const isHidden = hide || (controlledProgress && progress === 0);
  const style: React.CSSProperties = {
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? 'running' : 'paused'
  };

  if (controlledProgress) style.transform = `scaleX(${progress})`;
  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__progress-bar`,
    controlledProgress
      ? `${Default.CSS_NAMESPACE}__progress-bar--controlled`
      : `${Default.CSS_NAMESPACE}__progress-bar--animated`,
    `${Default.CSS_NAMESPACE}__progress-bar-theme--${theme}`,
    `${Default.CSS_NAMESPACE}__progress-bar--${type}`,
    {
      [`${Default.CSS_NAMESPACE}__progress-bar--rtl`]: rtl
    }
  );
  const classNames = isFn(className)
    ? className({
        rtl,
        type,
        defaultClassName
      })
    : cx(defaultClassName, className);

  // 🧐 controlledProgress is derived from progress
  // so if controlledProgress is set
  // it means that this is also the case for progress
  const animationEvent = {
    [controlledProgress && (progress as number)! >= 1 ? 'onTransitionEnd' : 'onAnimationEnd']:
      controlledProgress && (progress as number)! < 1
        ? null
        : () => {
            isIn && closeToast();
          }
  };

  // ARIA attributes for progress bar accessibility
  // Only provide aria-valuenow for controlled progress bars where we know the exact value
  // For animated progress bars, we omit aria-valuenow as the value changes continuously
  const ariaProps: {
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuenow'?: number;
  } = {
    'aria-valuemin': 0,
    'aria-valuemax': 1
  };

  if (controlledProgress && typeof progress === 'number') {
    ariaProps['aria-valuenow'] = Math.max(0, Math.min(1, progress));
  }

  return (
    <div className={`${Default.CSS_NAMESPACE}__progress-bar--wrp`} data-hidden={isHidden}>
      <div
        className={`${Default.CSS_NAMESPACE}__progress-bar--bg ${Default.CSS_NAMESPACE}__progress-bar-theme--${theme} ${Default.CSS_NAMESPACE}__progress-bar--${type}`}
      />
      <div
        role="progressbar"
        aria-hidden={isHidden ? 'true' : 'false'}
        aria-label="notification timer"
        className={classNames}
        style={style}
        {...ariaProps}
        {...animationEvent}
      />
    </div>
  );
}
