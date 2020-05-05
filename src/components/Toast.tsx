import React, { isValidElement, cloneElement } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import cx from 'classnames';

import { ProgressBar } from './ProgressBar';
import { WithInjectedOptions } from '../types';
import { RT_NAMESPACE, isFn } from '../utils';
import { useToast } from '../hooks';

export const Toast: React.FC<WithInjectedOptions> = props => {
  const {
    isRunning,
    preventExitTransition,
    toastRef,
    onExitTransitionEnd,
    eventHandlers
  } = useToast(props);
  const {
    closeButton,
    children,
    autoClose,
    onClick,
    type,
    hideProgressBar,
    closeToast,
    transition,
    position,
    className,
    style,
    bodyClassName,
    bodyStyle,
    progressClassName,
    progressStyle,
    updateId,
    role,
    progress,
    rtl,
    toastId
  } = props as Required<WithInjectedOptions>;
  const cssClasses = cx(
    `${RT_NAMESPACE}__toast`,
    `${RT_NAMESPACE}__toast--${type}`,
    {
      [`${RT_NAMESPACE}__toast--rtl`]: rtl
    },
    className
  );
  const controlledProgress = !!progress;
  const Transition = transition as React.FC<Partial<TransitionProps>>;

  function renderCloseButton(closeButton: any) {
    if (!closeButton) return null;

    const props = { closeToast, type };
    if (isFn(closeButton)) return closeButton(props);
    if (isValidElement(closeButton)) return cloneElement(closeButton, props);
  }

  return (
    <Transition
      in={props.in}
      appear
      onExited={onExitTransitionEnd}
      position={position}
      preventExitTransition={preventExitTransition}
      nodeRef={toastRef}
    >
      <div
        id={toastId as string}
        onClick={onClick}
        className={cssClasses}
        {...eventHandlers}
        style={style}
        ref={toastRef}
      >
        <div
          {...(props.in && { role: role })}
          className={cx(`${RT_NAMESPACE}__toast-body`, bodyClassName)}
          style={bodyStyle}
        >
          {children}
        </div>
        {renderCloseButton(closeButton)}
        {(autoClose || controlledProgress) && (
          <ProgressBar
            {...(updateId && !controlledProgress
              ? { key: `pb-${updateId}` }
              : {})}
            rtl={rtl}
            delay={autoClose as number}
            isRunning={isRunning}
            closeToast={closeToast}
            hide={hideProgressBar}
            type={type}
            style={progressStyle}
            className={progressClassName}
            controlledProgress={controlledProgress}
            progress={progress}
          />
        )}
      </div>
    </Transition>
  );
};
