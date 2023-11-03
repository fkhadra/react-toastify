import cx from 'clsx';
import React, { cloneElement, isValidElement, ReactNode } from 'react';

import { useToast } from '../hooks/useToast';
import { ToastProps } from '../types';
import { Default, isFn } from '../utils';
import { CloseButton } from './CloseButton';
import { ProgressBar } from './ProgressBar';
import { getIcon } from './Icons';

export const Toast: React.FC<ToastProps> = props => {
  const {
    isRunning,
    preventExitTransition,
    toastRef,
    eventHandlers,
    playToast
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
    isIn,
    isLoading,
    closeOnClick,
    theme
  } = props;
  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__toast`,
    `${Default.CSS_NAMESPACE}__toast-theme--${theme}`,
    `${Default.CSS_NAMESPACE}__toast--${type}`,
    {
      [`${Default.CSS_NAMESPACE}__toast--rtl`]: rtl
    },
    {
      [`${Default.CSS_NAMESPACE}__toast--close-on-click`]: closeOnClick
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
  const icon = getIcon(props);
  const isProgressControlled = !!progress || !autoClose;

  const closeButtonProps = { closeToast, type, theme };
  let Close: React.ReactNode = null;

  if (closeButton === false) {
    // hide
  } else if (isFn(closeButton)) {
    Close = closeButton(closeButtonProps);
  } else if (isValidElement(closeButton)) {
    Close = cloneElement(closeButton, closeButtonProps);
  } else {
    Close = CloseButton(closeButtonProps);
  }

  return (
    <Transition
      isIn={isIn}
      done={deleteToast}
      position={position}
      preventExitTransition={preventExitTransition}
      nodeRef={toastRef}
      playToast={playToast}
    >
      <div
        id={toastId as string}
        onClick={onClick}
        data-in={isIn}
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
          {icon != null && (
            <div
              className={cx(`${Default.CSS_NAMESPACE}__toast-icon`, {
                [`${Default.CSS_NAMESPACE}--animate-icon ${Default.CSS_NAMESPACE}__zoom-enter`]:
                  !isLoading
              })}
            >
              {icon}
            </div>
          )}
          <div>{children as ReactNode}</div>
        </div>
        {Close}
        <ProgressBar
          {...(updateId && !isProgressControlled
            ? { key: `pb-${updateId}` }
            : {})}
          rtl={rtl}
          theme={theme}
          delay={autoClose as number}
          isRunning={isRunning}
          isIn={isIn}
          closeToast={closeToast}
          hide={hideProgressBar}
          type={type}
          style={progressStyle}
          className={progressClassName}
          controlledProgress={isProgressControlled}
          progress={progress || 0}
        />
      </div>
    </Transition>
  );
};
