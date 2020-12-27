import * as React from 'react';
import cx from 'clsx';

import { Toast } from './Toast';
import { CloseButton } from './CloseButton';
import { Bounce } from './Transitions';
import { POSITION, DEFAULT, parseClassName, isFn } from '../utils';
import { useToastContainer } from '../hooks';
import { ToastContainerProps, ToastPosition } from '../types';

export const ToastContainer: React.FC<ToastContainerProps> = props => {
  const { getToastToRender, containerRef, isToastActive } = useToastContainer(
    props
  );
  const { className, style, rtl, containerId } = props;

  function getClassName(position: ToastPosition) {
    const defaultClassName = cx(
      `${DEFAULT.CSS_NAMESPACE}__toast-container`,
      `${DEFAULT.CSS_NAMESPACE}__toast-container--${position}`,
      { [`${DEFAULT.CSS_NAMESPACE}__toast-container--rtl`]: rtl }
    );
    return isFn(className)
      ? className({
          position,
          rtl,
          defaultClassName
        })
      : cx(defaultClassName, parseClassName(className));
  }

  return (
    <div
      ref={containerRef}
      className={DEFAULT.CSS_NAMESPACE as string}
      id={containerId as string}
    >
      {getToastToRender((position, toastList) => {
        const containerStyle: React.CSSProperties =
          toastList.length === 0
            ? { ...style, pointerEvents: 'none' }
            : { ...style };

        return (
          <div
            className={getClassName(position)}
            style={containerStyle}
            key={`container-${position}`}
          >
            {toastList.map(({ content, props: toastProps }) => {
              return (
                <Toast
                  {...toastProps}
                  isIn={isToastActive(toastProps.toastId)}
                  key={`toast-${toastProps.key}`}
                  closeButton={
                    toastProps.closeButton === true
                      ? CloseButton
                      : toastProps.closeButton
                  }
                >
                  {content}
                </Toast>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

ToastContainer.defaultProps = {
  position: POSITION.TOP_RIGHT as ToastPosition,
  transition: Bounce,
  rtl: false,
  autoClose: 5000,
  hideProgressBar: false,
  closeButton: CloseButton,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  newestOnTop: false,
  draggable: true,
  draggablePercent: 80,
  role: 'alert'
};
