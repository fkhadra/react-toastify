import * as React from 'react';
import cx from 'classnames';

import { ProgressBar } from './ProgressBar';
import { ToastProps } from '../types';
import { DEFAULT } from '../utils';
import { useToast } from '../hooks';

export const Toast: React.FC<ToastProps> = props => {
  const {
    isRunning,
    preventExitTransition,
    toastRef,
    eventHandlers
  } = useToast(props);
  const {
    children,
    autoClose,
    onClick,
    type,
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
    progress,
    rtl,
    toastId,
    deleteToast,
    title,
    color
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
        <div
          id={`toast-${toastId}`}
          className={cx(`${DEFAULT.CSS_NAMESPACE}__toast-body`, bodyClassName)}
          style={bodyStyle}
        >
          {title && <h1>{title}</h1>}
          <div className={`circle ${color}`}></div>
          <p className="toast-content">{children}</p>
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
