import React from 'react';
import { CloseButtonProps, IconProps } from '../components';

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

export type Theme = 'light' | 'dark' | 'colored';

export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface ToastContentProps<Data = {}> {
  closeToast?: () => void;
  toastProps: ToastProps;
  data?: Data;
}

export type ToastContent<T = unknown> =
  | React.ReactNode
  | ((props: ToastContentProps<T>) => React.ReactNode);

export type ToastIcon =
  | boolean
  | ((props: IconProps) => React.ReactNode)
  | React.ReactElement<IconProps>
  | string
  | number
  | React.ReactNode;

export type Id = number | string;

export type ToastTransition =
  | React.FC<ToastTransitionProps>
  | React.ComponentClass<ToastTransitionProps>;

/**
 * ClassName for the elements - can take a function to build a classname or a raw string that is cx'ed to defaults
 */
export type ToastClassName =
  | ((context?: {
      type?: TypeOptions;
      defaultClassName?: string;
      position?: ToastPosition;
      rtl?: boolean;
    }) => string)
  | string;

export interface ClearWaitingQueueParams {
  containerId?: Id;
}

export type DraggableDirection = 'x' | 'y';

interface CommonOptions {
  /**
   * Pause the timer when the mouse hover the toast.
   * `Default: true`
   */
  pauseOnHover?: boolean;

  /**
   * Pause the toast when the window loses focus.
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
    | boolean
    | ((props: CloseButtonProps) => React.ReactNode)
    | React.ReactElement<CloseButtonProps>;

  /**
   * An optional css class to set for the progress bar.
   */
  progressClassName?: ToastClassName;

  /**
   * An optional style to set for the progress bar.
   */
  progressStyle?: React.CSSProperties;

  /**
   * An optional css class to set for the toast content.
   */
  bodyClassName?: ToastClassName;

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
   * Specify in which direction should you swipe to dismiss the toast
   * `Default: "x"`
   */

  draggableDirection?: DraggableDirection;

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
   * @deprecated
   * ⚠️ Will be removed in the next major release. You can pass a react component with you handler instead.
   *
   * Fired when clicking inside toaster
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Support right to left display.
   * `Default: false`
   */
  rtl?: boolean;

  /**
   * Used to display a custom icon. Set it to `false` to prevent
   * the icons from being displayed
   */
  icon?: ToastIcon;

  /**
   * Theme to use.
   * `One of: 'light', 'dark', 'colored'`
   * `Default: 'light'`
   */
  theme?: Theme;
}

export interface ToastOptions<Data = {}> extends CommonOptions {
  /**
   * An optional css class to set.
   */
  className?: ToastClassName;

  /**
   * @deprecated
   * ⚠️ Will be removed in the next major release. You can rely on `toast.onChange` instead.
   *
   * Called when toast is mounted.
   */
  onOpen?: <T = {}>(props: T) => void;

  /**
   * @deprecated
   * ⚠️ Will be removed in the next major release. You can rely on `toast.onChange` instead.
   *
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

  isLoading?: boolean;

  data?: Data;
}

export interface UpdateOptions<T = unknown> extends Nullable<ToastOptions<T>> {
  /**
   * Used to update a toast.
   * Pass any valid ReactNode(string, number, component)
   */
  render?: ToastContent<T>;
}

export interface ToastContainerProps extends CommonOptions {
  /**
   * An optional css class to set.
   */
  className?: ToastClassName;

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
  toastClassName?: ToastClassName;

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
  isIn: boolean;
  done: () => void;
  position: ToastPosition | string;
  preventExitTransition: boolean;
  nodeRef: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
}

/**
 * @INTERNAL
 */
export interface ToastProps extends ToastOptions {
  isIn: boolean;
  staleId?: Id;
  toastId: Id;
  key: Id;
  transition: ToastTransition;
  closeToast: () => void;
  position: ToastPosition;
  children?: ToastContent;
  draggablePercent: number;
  draggableDirection?: DraggableDirection;
  progressClassName?: ToastClassName;
  className?: ToastClassName;
  bodyClassName?: ToastClassName;
  deleteToast: () => void;
  theme: Theme;
  type: TypeOptions;
  iconOut?: React.ReactNode;
}

/**
 * @INTERNAL
 */
export interface NotValidatedToastProps extends Partial<ToastProps> {
  toastId: Id;
}

/**
 * @INTERNAL
 */
export interface Toast {
  content: ToastContent;
  props: ToastProps;
}

export type ToastItemStatus = 'added' | 'removed' | 'updated';

export interface ToastItem<Data = {}> {
  content: ToastContent<Data>;
  id: Id;
  theme?: Theme;
  type?: TypeOptions;
  isLoading?: boolean;
  containerId?: Id;
  data: Data;
  icon?: ToastIcon;
  status: ToastItemStatus;
}
