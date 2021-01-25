import * as React from 'react';
import cx from 'clsx';

import { ProgressBar } from './ProgressBar';
import { ToastProps } from '../types';
import { Default, isFn } from '../utils';
import { useToast } from '../hooks';

export const Toast: React.FC<ToastProps> = props => {
  const {
    isRunning,
    preventExitTransition,
    toastRef,
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
    transition: Transition,
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
    toastId,
    deleteToast,
    isIn
  } = props;
  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__toast`,
    `${Default.CSS_NAMESPACE}__toast--${type}`,
    {
      [`${Default.CSS_NAMESPACE}__toast--rtl`]: rtl
    }
  );
  const cssClasses = isFn(className)
    ? className({
        rtl,
        position,
        type,
        defaultClassName
      })
    : cx(defaultClassName, className);
  const isProgressControlled = !!progress;

  function renderCloseButton(closeButton: any) {
    if (!closeButton) return;

    const props = { closeToast, type };

    if (isFn(closeButton)) return closeButton(props);

    if (React.isValidElement(closeButton))
      return React.cloneElement(closeButton, props);
  }

  return (
    <Transition
      isIn={isIn}
      done={deleteToast}
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
          {...(isIn && { role: role })}
          className={
            isFn(bodyClassName)
              ? bodyClassName({ type })
              : cx(`${Default.CSS_NAMESPACE}__toast-body`, bodyClassName)
          }
          style={bodyStyle}
        >
          {children}
        </div>
        {renderCloseButton(closeButton)}
        {(autoClose || isProgressControlled) && (
          <ProgressBar
            {...(updateId && !isProgressControlled
              ? { key: `pb-${updateId}` }
              : {})}
            rtl={rtl}
            delay={autoClose as number}
            isRunning={isRunning}
            isIn={isIn}
            closeToast={closeToast}
            hide={hideProgressBar}
            type={type}
            style={progressStyle}
            className={progressClassName}
            controlledProgress={isProgressControlled}
            progress={progress}
          />
        )}
      </div>
    </Transition>
  );
};
