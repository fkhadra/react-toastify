import * as React from 'react';
import cx from 'clsx';

import { ProgressBar } from './ProgressBar';
import { ToastProps } from '../types';
import { DEFAULT, isFn } from '../utils';
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
    deleteToast
  } = props;
  const defaultClassArr = [
    `${DEFAULT.CSS_NAMESPACE}__toast`,
    `${DEFAULT.CSS_NAMESPACE}__toast--${type}`,
    {
      [`${DEFAULT.CSS_NAMESPACE}__toast--rtl`]: rtl
    }
  ];
  const cssClasses = isFn(className)
    ? className({
        rtl,
        position,
        type,
        defaultClassName: cx(...defaultClassArr)
      })
    : cx(...[...defaultClassArr, className]);
  const controlledProgress = !!progress;

  function renderCloseButton(closeButton: any) {
    if (!closeButton) return;

    const props = { closeToast, type };
    if (isFn(closeButton)) return closeButton(props);
    if (React.isValidElement(closeButton))
      return React.cloneElement(closeButton, props);
  }

  return (
    <Transition
      in={props.in!}
      appear
      done={deleteToast}
      position={position}
      preventExitTransition={preventExitTransition}
      nodeRef={toastRef}
    >
      <div
        id={toastId as string}
        onClick={onClick}
        className={cssClasses || undefined}
        {...eventHandlers}
        style={style}
        ref={toastRef}
      >
        <div
          {...(props.in && { role: role })}
          className={
            isFn(bodyClassName)
              ? bodyClassName({ type })
              : cx(`${DEFAULT.CSS_NAMESPACE}__toast-body`, bodyClassName)
          }
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
            isIn={props.in}
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
