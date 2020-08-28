import * as React from 'react';
import cx from 'classnames';

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
    title,
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
    color = 'red',
    progress,
    rtl,
    toastId,
    deleteToast
  } = props;
  const cssClasses = cx(
    `${DEFAULT.CSS_NAMESPACE}__toast`,
    `${DEFAULT.CSS_NAMESPACE}__toast--${type}`,
    {
      [`${DEFAULT.CSS_NAMESPACE}__toast--rtl`]: rtl
    },
    className
  );
  const controlledProgress = !!progress;

  function renderCloseButton(closeButton: any) {
    if (!closeButton) return null;

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
        className={cssClasses}
        {...eventHandlers}
        style={style}
        ref={toastRef}
      >
        <div id={`toast-${toastId}`} className={cx(`${DEFAULT.CSS_NAMESPACE}__toast-body`, bodyClassName)} style={bodyStyle}>
          {title && <h1>{title}</h1>}
          <div className={`circle ${color}`}></div>
          <p className='toast-content'>{children}</p>
        </div>
        {/* <div
          {...(props.in && { role: role })}
          className={cx(`${DEFAULT.CSS_NAMESPACE}__toast-body`, bodyClassName)}
          style={bodyStyle}
        >
          {children}ㄴㅇㄹㅇㄹㅇ
        </div> */}
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
            hide={true}
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
