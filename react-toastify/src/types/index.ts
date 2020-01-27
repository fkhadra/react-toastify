import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
export type ToastContent = React.ReactNode | (() => React.ReactNode );
export interface Toast {
  content: ToastContent;
  options: WithInjectedOptions;
}

type Id = number | string
export type ToastId = Id;
export type ContainerId = Id;

interface CommonOptions {
  /**
   * Pause the timer when the mouse hover the toast.
   * `Default: true`
   */
  pauseOnHover?: boolean;

  /**
   * Pause the toast when the window loose focus.
   * `Default: true`
   */
  pauseOnFocusLoss?: boolean;

  /**
   * Remove the toast when clicked.
   * `Default: true`
   */
  closeOnClick?: boolean;

  /**
   * Set the delay in ms to close the toast automatically.
   * Use `false` to prevent the toast from closing.
   * `Default: 5000`
   */
  autoClose?: number | false;

  /**
   * Set the default position to use.
   * `One of: 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'`
   * `Default: 'top-right'`
   */
  position?: ToastPosition;

  /**
   * Pass a custom close button.
   * To remove the close button pass `false`
   */
  closeButton?: React.ReactElement | false;

  /**
   * An optional css class to set for the progress bar.
   */
  progressClassName?: string | object | null;

  /**
   * An optional style to set for the progress bar.
   */
  progressStyle?: object;

  /**
   * An optional css class to set.
   */
  className?: string | object | null;

  /**
   * An optional css class to set for the toast content.
   */
  bodyClassName?: string | object | null;

  /**
   * Hide or show the progress bar.
   * `Default: false`
   */
  hideProgressBar?: boolean;

  /**
   * Pass a custom transition built with react-transition-group.
   */
  transition?: Transition;

  /**
   * Allow toast to be draggable
   * `Default: true`
   */
  draggable?: boolean;

  /**
   * The percentage of the toast's width it takes for a drag to dismiss a toast
   * `Default: 80`
   */
  draggablePercent?: number;

  /**
   * Define the ARIA role for the toast
   * `Default: alert`
   *  https://www.w3.org/WAI/PF/aria/roles
   */
  role?: string;

  /**
   * Set id to handle multiple container
   */
  containerId?: ContainerId;

  /**
   * Fired when clicking inside toaster
   */
  onClick?: Function;

  /**
   * Support right to left display.
   * `Default: false`
   */
  rtl?: boolean;
}

export interface ToastOptions extends CommonOptions {
  /**
   * Called when toast is mounted.
   */
  onOpen?: <T = {}>(props: T) => void;

  /**
   * Called when toast is unmounted.
   */
  onClose?: <T = {}>(props: T) => void;

  /**
   * Set the toast type.
   * `One of: 'info', 'success', 'warning', 'error', 'default'`
   */
  type?: TypeOptions;

  /**
   * Set a custom `toastId`
   */
  toastId?: ToastId;

  /**
   * Used during update
   */
  updateId?: ToastId;

  /**
   * Set the percentage for the controlled progress bar. `Value must be between 0 and 1.`
   */
  progress?: number | string;

  /**
   * Add a delay in ms before the toast appear.
   */
  delay?: number;
}

export interface WithInjectedOptions extends ToastOptions {
  staleId?: ToastId;
  toastId: ToastId;
  key: Id;
  closeToast: () => void;
  position: ToastPosition;
  // children?: ToastContent;
  // draggablePercent: number;
  // transition: Transition;
}

export interface UpdateOptions extends ToastOptions {
  /**
   * Used to update a toast.
   * Pass any valid ReactNode(string, number, component)
   */
  render?: ToastContent;
}

export interface ToastContainerProps extends CommonOptions {
  /**
   * Whether or not to display the newest toast on top.
   * `Default: false`
   */
  newestOnTop?: boolean;

  /**
   * An optional inline style to apply.
   */
  style?: object;

  /**
   * An optional css class for the toast.
   */
  toastClassName?: string | object | null;

  /**
   * Show the toast only if it includes containerId and it's the same as containerId
   * `Default: false`
   */
  enableMultiContainer?: boolean;
}


// /**
//  * Helper to set notification type
//  */

// /**
//  * Helper to set position
//  */

// /**
//  * Helper to build custom entrance and exit transition
//  */

// /**
//  * Built-in entrance and exit transition
//  */

// /**
//  * Built-in entrance and exit transition
//  */

// /**
//  * Built-in entrance and exit transition
//  */

// /**
//  * Built-in entrance and exit transition
//  */
