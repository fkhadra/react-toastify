// https://github.com/yannickcr/eslint-plugin-react/issues/3140
/* eslint react/prop-types: "off" */
import React, { forwardRef, StyleHTMLAttributes, useEffect } from 'react';
import cx from 'clsx';
import { toast } from '../core';
import { Toast } from './Toast';
import { CloseButton } from './CloseButton';
import { Bounce } from './Transitions';
import { Direction, Default, parseClassName, isFn } from '../utils';
import { useToastContainer } from '../hooks/useToastContainer';
import { ToastContainerProps, ToastPosition } from '../types';
export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  (props, ref) => {
    const { getToastToRender, containerRef, isToastActive } =
      useToastContainer(props);
    const { className, style, rtl, containerId } = props;
    const closeAllprop = {
      backgroundColor: '#fff',
      border: '2px solid white',
      padding: '5px',
      borderRadius: '50%',
      color: '#000'
    };

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
      console.log('check');
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
              {toastList.map(({ content, props: toastProps }, i) => {
                return (
                  <Toast
                    {...toastProps}
                    isIn={isToastActive(toastProps.toastId)}
                    style={
                      {
                        ...toastProps.style,
                        '--nth': i + 1,
                        '--len': toastList.length
                      } as StyleHTMLAttributes<HTMLDivElement>
                    }
                    key={`toast-${toastProps.key}`}
                  >
                    {content}
                  </Toast>
                );
              })}
              {toastList.length > 1 && (
                <button
                  className={`${Default.CSS_NAMESPACE}__close-button ${Default.CSS_NAMESPACE}__close-button`}
                  style={closeAllprop}
                  onClick={() => toast.dismiss()}
                >
                  {' '}
                  <svg aria-hidden="true" viewBox="0 0 14 16">
                    <path
                      fillRule="evenodd"
                      d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
                    />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

ToastContainer.displayName = 'ToastContainer';

ToastContainer.defaultProps = {
  position: 'top-right',
  transition: Bounce,
  autoClose: 5000,
  closeButton: CloseButton,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  draggable: true,
  draggablePercent: Default.DRAGGABLE_PERCENT as number,
  draggableDirection: Direction.X,
  role: 'alert',
  theme: 'light'
};
