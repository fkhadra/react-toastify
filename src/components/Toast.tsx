import * as React from 'react';
import cx from 'clsx';

import { ProgressBar } from './ProgressBar';
import { Icons } from './Icons';
import { ToastProps } from '../types';
import { Default, isFn, isStr } from '../utils';
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
    isIn,
    isLoading,
    icon,
    theme
  } = props;
  const defaultClassName = cx(
    `${Default.CSS_NAMESPACE}__toast`,
    `${Default.CSS_NAMESPACE}__toast-theme--${theme}`,
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
  const maybeIcon = Icons[type as keyof typeof Icons];
  const iconProps = { theme, type };
  let Icon: React.ReactNode = maybeIcon && maybeIcon(iconProps);

  if (icon === false) {
    Icon = void 0;
  } else if (isFn(icon)) {
    Icon = icon(iconProps);
  } else if (React.isValidElement(icon)) {
    Icon = React.cloneElement(icon, iconProps);
  } else if (isStr(icon)) {
    Icon = icon;
  } else if (isLoading) {
    Icon = Icons.spinner();
  }

  function renderCloseButton(closeButton: any) {
    if (!closeButton) return;

    const props = { closeToast, type, theme };

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
          {Icon && (
            <div
              className={cx(`${Default.CSS_NAMESPACE}__toast-icon`, {
                [`${Default.CSS_NAMESPACE}--animate-icon ${Default.CSS_NAMESPACE}__zoom-enter`]: !isLoading
              })}
            >
              {Icon}
            </div>
          )}
          <div>{children}</div>
        </div>
        {renderCloseButton(closeButton)}
        {(autoClose || isProgressControlled) && (
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
            progress={progress}
          />
        )}
      </div>
    </Transition>
  );
};
