// https://github.com/yannickcr/eslint-plugin-react/issues/3140
/* eslint react/prop-types: "off" */
import cx from 'clsx';
import React, { forwardRef, useEffect, useMemo } from 'react';

import { useToastContainer } from '../hooks/useToastContainer';
import { ToastContainerProps, ToastPosition } from '../types';
import { Default, Direction, isFn, parseClassName } from '../utils';
import { CloseButton } from './CloseButton';
import { Toast } from './Toast';
import { Bounce } from './Transitions';

export const defaultProps: ToastContainerProps = {
  position: 'top-right',
  transition: Bounce,
  autoClose: 5000,
  closeButton: CloseButton,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: 'touch',
  draggablePercent: Default.DRAGGABLE_PERCENT as number,
  draggableDirection: Direction.X,
  role: 'alert',
  theme: 'light'
};

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  (props, ref) => {
    let containerProps: ToastContainerProps = useMemo(
      () => ({
        ...defaultProps,
        ...props
      }),
      [props]
    );
    const { getToastToRender, containerRef, isToastActive } =
      useToastContainer(containerProps);
    const { className, style, rtl, containerId } = containerProps;

    function getClassName(position: ToastPosition) {
      const defaultClassName = cx(
        `${Default.CSS_NAMESPACE}__toast-container`,
        `${Default.CSS_NAMESPACE}__toast-container--${position}`,
        { [`${Default.CSS_NAMESPACE}__toast-container--rtl`]: rtl }
      );
      return isFn(className)
        ? className({
            position,
            rtl,
            defaultClassName
          })
        : cx(defaultClassName, parseClassName(className));
    }

    useEffect(() => {
      if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement>).current =
          containerRef.current!;
      }
    }, []);

    return (
      <div
        ref={containerRef}
        className={Default.CSS_NAMESPACE as string}
        id={containerId as string}
      >
        {getToastToRender((position, toastList) => {
          const containerStyle: React.CSSProperties = !toastList.length
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
                    isIn={isToastActive(
                      toastProps.toastId,
                      toastProps.containerId
                    )}
                    style={toastProps.style}
                    key={`toast-${toastProps.key}`}
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
  }
);

ToastContainer.displayName = 'ToastContainer';
