import * as React from 'react';

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type TypeOptions =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'default'
  | 'dark';

export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface ToastContentProps {
  closeToast?: () => void;
}
export type ToastContent =
  | React.ReactNode
  | ((props: ToastContentProps) => React.ReactNode);
export interface Toast {
  content: ToastContent;
  props: ToastProps;
}

export type Id = number | string;
export type ToastTransition =
  | React.FC<ToastTransitionProps>
  | React.ComponentClass<ToastTransitionProps>;
/**
 * ClassName for the elements - can take a function to build a classname or a raw string that is cx'ed to defaults
 */
export type ClassName =
  | ((context?: { type?: TypeOptions; defaultClassName?: string }) => string)
  | string;

export interface ClearWaitingQueueParams {
  containerId?: Id;
}

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
  closeButton?:
    | React.ReactElement
    | ((props: any) => React.ReactElement)
    | boolean;

  /**
   * An optional css class to set for the progress bar.
   */
  progressClassName?: ClassName;

  /**
   * An optional style to set for the progress bar.
   */
  progressStyle?: React.CSSProperties;

  /**
   * An optional css class to set.
   */
  className?: ClassName;

  /**
   * An optional css class to set for the toast content.
   */
  bodyClassName?: ClassName;

  /**
   * An optional inline style to apply for the toast content.
   */
  bodyStyle?: React.CSSProperties;

  /**
   * Hide or show the progress bar.
   * `Default: false`
   */
  hideProgressBar?: boolean;

  /**
   * Pass a custom transition built with react-transition-group.
   */
  transition?: ToastTransition;

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
  containerId?: Id;

  /**
   * Fired when clicking inside toaster
   */
  onClick?: (event: React.MouseEvent) => void;

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
   * An optional inline style to apply.
   */
  style?: React.CSSProperties;

  /**
   * Set the toast type.
   * `One of: 'info', 'success', 'warning', 'error', 'default'`
   */
  type?: TypeOptions;

  /**
   * Set a custom `toastId`
   */
  toastId?: Id;

  /**
   * Used during update
   */
  updateId?: Id;

  /**
   * Set the percentage for the controlled progress bar. `Value must be between 0 and 1.`
   */
  progress?: number | string;

  /**
   * Add a delay in ms before the toast appear.
   */
  delay?: number;
}

/**
 * @INTERNAL
 */
export interface ToastProps extends ToastOptions {
  in?: boolean;
  staleId?: Id;
  toastId: Id;
  key: Id;
  transition: ToastTransition;
  closeToast: () => void;
  position: ToastPosition;
  children?: ToastContent;
  draggablePercent: number;
  progressClassName?: ClassName;
  className?: ClassName;
  bodyClassName?: ClassName;
  deleteToast: () => void;
}

/**
 * @INTERNAL
 */
export interface NotValidatedToastProps extends Partial<ToastProps> {
  toastId: Id;
}

export interface UpdateOptions extends Nullable<ToastOptions> {
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
  style?: React.CSSProperties;

  /**
   * An optional inline style to apply for the toast.
   */
  toastStyle?: React.CSSProperties;

  /**
   * An optional css class for the toast.
   */
  toastClassName?: ClassName;

  /**
   * Show the toast only if it includes containerId and it's the same as containerId
   * `Default: false`
   */
  enableMultiContainer?: boolean;

  /**
   * Limit the number of toast displayed at the same time
   */
  limit?: number;
}

export interface ToastTransitionProps {
  in: boolean;
  appear: boolean;
  done: () => void;
  position: ToastPosition | string;
  preventExitTransition: boolean;
  nodeRef: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
}
