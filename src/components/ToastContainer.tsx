import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Toast } from './Toast';
import { CloseButton } from './CloseButton';
import { Bounce } from './Transitions';
import { POSITION, DEFAULT, parseClassName, objectValues } from '../utils';
import { useToastContainer } from '../hooks';
import { ToastContainerProps, ToastPosition } from '../types';
import { ToastPositioner } from './ToastPositioner';

export const ToastContainer: React.FC<ToastContainerProps> = props => {
  const { getToastToRender, containerRef, isToastActive } = useToastContainer(
    props
  );
  const { className, style, rtl, containerId } = props;

  return (
    <div
      ref={containerRef}
      className={DEFAULT.CSS_NAMESPACE as string}
      id={containerId as string}
    >
      {getToastToRender((position, toastList) => {
        const swag = {
          className: cx(
            `${DEFAULT.CSS_NAMESPACE}__toast-container`,
            `${DEFAULT.CSS_NAMESPACE}__toast-container--${position}`,
            { [`${DEFAULT.CSS_NAMESPACE}__toast-container--rtl`]: rtl },
            parseClassName(className)
          ),
          style:
            toastList.length === 0
              ? { ...style, pointerEvents: 'none' }
              : { ...style }
        } as any;

        return (
          <ToastPositioner {...swag} key={`container-${position}`}>
            {toastList.map(({ content, props: toastProps }) => {
              return (
                <Toast
                  {...toastProps}
                  in={isToastActive(toastProps.toastId)}
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
          </ToastPositioner>
        );
      })}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  ToastContainer.propTypes = {
    // @ts-ignore
    position: PropTypes.oneOf(objectValues(POSITION)),

    // @ts-ignore
    autoClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),

    // @ts-ignore
    closeButton: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool,
      PropTypes.func
    ]),
    hideProgressBar: PropTypes.bool,
    pauseOnHover: PropTypes.bool,
    closeOnClick: PropTypes.bool,
    newestOnTop: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    toastClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    progressClassName: PropTypes.string,
    progressStyle: PropTypes.object,
    transition: PropTypes.func,
    rtl: PropTypes.bool,
    draggable: PropTypes.bool,
    draggablePercent: PropTypes.number,
    pauseOnFocusLoss: PropTypes.bool,
    enableMultiContainer: PropTypes.bool,
    containerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string,
    onClick: PropTypes.func
  };
}

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
