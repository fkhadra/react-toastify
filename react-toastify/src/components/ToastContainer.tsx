import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TransitionGroup } from 'react-transition-group';

// import Toast from "./Toast";
import { CloseButton } from './CloseButton';
import { Bounce } from './Transitions';
import {
  POSITION,
  RT_NAMESPACE,
  parseClassName,
  objectValues
} from '../utils';
import { useToastContainer } from '../hooks';
import { ToastContainerProps, ToastPosition } from '../types';

export const ToastContainer: React.FC<ToastContainerProps> = props => {
  const { getToastToRender, containerRef } = useToastContainer(props);

  // function makeCloseButton({
  //   closeButton: toastClose,
  //   type,
  //   closeToast
  // }: WithInjectedOptions) {
  //   let closeButton = props.closeButton;

  //   if (toastClose === false || isValidElement(toastClose)) {
  //     closeButton = toastClose;
  //   } else if (toastClose === true) {
  //     closeButton = (isValidElement(props.closeButton)
  //       ? props.closeButton
  //       : CloseButton) as React.ReactElement;
  //   }

  //   return closeButton === false
  //     ? false
  //     : cloneElement(clcoseButton as React.ReactElement, {
  //         closeToast,
  //         type
  //       });
  // }

  function renderToast() {
    const { className, style } = props;
    const toastToRender = getToastToRender();

    return (Object.keys(toastToRender) as Array<ToastPosition>).map((position ) => {
      const currentPosition = toastToRender[position]!;
      const disablePointer =
        currentPosition.length === 1 && currentPosition[0] === null;
      const propsp = {
        className: cx(
          `${RT_NAMESPACE}__toast-container`,
          `${RT_NAMESPACE}__toast-container--${position}`,
          { [`${RT_NAMESPACE}__toast-container--rtl`]: props.rtl },
          parseClassName(className)
        ),
        style: disablePointer
          ? { ...style, pointerEvents: 'none' }
          : { ...style }
      };

      return (
        <TransitionGroup {...propsp} key={`container-${position}`}>
          {currentPosition.map(({ content }) => {
            return (
              <div>{content}</div>
              // <Toast
              //   {...options}
              //   key={`toast-${options.key}`}
              //   closeButton={makeCloseButton(options)}
              // >
              //   {content}
              // </Toast>
            );
          })}
        </TransitionGroup>
      );
    });
  }

  return (
    <div ref={containerRef} className={`${RT_NAMESPACE}`}>
      {renderToast()}
    </div>
  );
};

// @ts-ignore
ToastContainer.propTypes = {
  /**
   * Set toast position
   */
  position: PropTypes.oneOf(objectValues(POSITION)),

  /**
   * Disable or set autoClose delay
   */
  autoClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),

  /**
   * Disable or set a custom react element for the close button
   */
  closeButton: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),

  /**
   * Hide or not progress bar when autoClose is enabled
   */
  hideProgressBar: PropTypes.bool,

  /**
   * Pause toast duration on hover
   */
  pauseOnHover: PropTypes.bool,

  /**
   * Dismiss toast on click
   */
  closeOnClick: PropTypes.bool,

  /**
   * Newest on top
   */
  newestOnTop: PropTypes.bool,

  /**
   * An optional className
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * An optional style
   */
  style: PropTypes.object,

  /**
   * An optional className for the toast
   */
  toastClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * An optional className for the toast body
   */
  bodyClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * An optional className for the toast progress bar
   */
  progressClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * An optional style for the toast progress bar
   */
  progressStyle: PropTypes.object,

  /**
   * Define enter and exit transition using react-transition-group
   */
  transition: PropTypes.func,

  /**
   * Support rtl display
   */
  rtl: PropTypes.bool,

  /**
   * Allow toast to be draggable
   */
  draggable: PropTypes.bool,

  /**
   * The percentage of the toast's width it takes for a drag to dismiss a toast
   */
  draggablePercent: PropTypes.number,

  /**
   * Pause the toast on focus loss
   */
  pauseOnFocusLoss: PropTypes.bool,

  /**
   * Show the toast only if it includes containerId and it's the same as containerId
   */
  enableMultiContainer: PropTypes.bool,

  /**
   * Set id to handle multiple container
   */
  containerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Set role attribute for the toast body
   */
  role: PropTypes.string,

  /**
   * Fired when clicking inside toaster
   */
  onClick: PropTypes.func
};

//
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
