import React, { HTMLAttributes } from 'react';
import { CloseButtonProps, IconProps } from './components';
import { clearWaitingQueue } from './core/store';

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

export type Theme = 'light' | 'dark' | 'colored' | (string & {});

export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';

export type CloseToastFunc = ((reason?: boolean | string) => void) & ((e: React.MouseEvent) => void);

export interface ToastContentProps<Data = unknown> {
  closeToast: CloseToastFunc;
  toastProps: ToastProps;
  isPaused: boolean;
  data: Data;
}

export type ToastContent<T = unknown> = React.ReactNode | ((props: ToastContentProps<T>) => React.ReactNode);

export type ToastIcon = false | ((props: IconProps) => React.ReactNode) | React.ReactElement<IconProps>;

export type Id = number | string;

export type ToastTransition = React.FC<ToastTransitionProps> | React.ComponentClass<ToastTransitionProps>;

/**
 * ClassName for the elements - can take a function to build a classname or a raw string that is cx'ed to defaults
 */
export type ToastClassName =
  | ((context?: { type?: TypeOptions; defaultClassName?: string; position?: ToastPosition; rtl?: boolean }) => string)
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
   * `Default: false`
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
  closeButton?: boolean | ((props: CloseButtonProps) => React.ReactNode) | React.ReactElement<CloseButtonProps>;

  /**
   * An optional css class to set for the progress bar.
   */
  progressClassName?: ToastClassName;

  /**
   * Hide or show the progress bar.
   * `Default: false`
   */
  hideProgressBar?: boolean;

  /**
   * Pass a custom transition see https://fkhadra.github.io/react-toastify/custom-animation/
   */
  transition?: ToastTransition;

  /**
   * Allow toast to be draggable
   * `Default: 'touch'`
   */
  draggable?: boolean | 'mouse' | 'touch';

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

  /**
   * When set to `true` the built-in progress bar won't be rendered at all. Autoclose delay won't have any effect as well
   * This is only used when you want to replace the progress bar with your own.
   *
   * See https://stackblitz.com/edit/react-toastify-custom-progress-bar?file=src%2FApp.tsx for an example.
   */
  customProgressBar?: boolean;
}

export interface ToastOptions<Data = unknown> extends CommonOptions {
  /**
   * An optional css class to set.
   */
  className?: ToastClassName;

  /**
   * Called when toast is mounted.
   */
  onOpen?: () => void;

  /**
   * Called when toast is unmounted.
   * The callback first argument is the closure reason.
   * It is "true" when the notification is closed by a user action like clicking on the close button.
   */
  onClose?: (reason?: boolean | string) => void;

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
  progress?: number;

  /**
   * Let you provide any data, useful when you are using your own component
   */
  data?: Data;

  /**
   * Let you specify the aria-label
   */
  ariaLabel?: string;

  /**
   * Add a delay in ms before the toast appear.
   */
  delay?: number;

  isLoading?: boolean;
}

export interface UpdateOptions<T = unknown> extends Nullable<ToastOptions<T>> {
  /**
   * Used to update a toast.
   * Pass any valid ReactNode(string, number, component)
   */
  render?: ToastContent<T>;
}

export interface ToastContainerProps extends CommonOptions, Pick<HTMLAttributes<HTMLElement>, 'aria-label'> {
  /**
   * An optional css class to set.
   */
  className?: ToastClassName;

  /**
   * Will stack the toast with the newest on the top.
   */
  stacked?: boolean;

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
   * Limit the number of toast displayed at the same time
   */
  limit?: number;

  /**
   * Shortcut to focus the first notification with the keyboard
   * `default: Alt+t`
   *
   * ```
   * // focus when user presses ⌘ + F
   * const matchShortcut = (e: KeyboardEvent) => e.metaKey && e.key === 'f'
   * ```
   */
  hotKeys?: (e: KeyboardEvent) => boolean;
}

export interface ToastTransitionProps {
  isIn: boolean;
  done: () => void;
  position: ToastPosition | string;
  preventExitTransition: boolean;
  nodeRef: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
  playToast(): void;
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
  closeToast: CloseToastFunc;
  position: ToastPosition;
  children?: ToastContent;
  draggablePercent: number;
  draggableDirection?: DraggableDirection;
  progressClassName?: ToastClassName;
  className?: ToastClassName;
  deleteToast: () => void;
  theme: Theme;
  type: TypeOptions;
  collapseAll: () => void;
  stacked?: boolean;
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
  toggle?: (v: boolean) => void;
  removalReason?: true | undefined;
  isActive: boolean;
  staleId?: Id;
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
  reason?: boolean | string;
}

export type OnChangeCallback = (toast: ToastItem) => void;

export type IdOpts = {
  id?: Id;
  containerId?: Id;
};

export type ClearWaitingQueueFunc = typeof clearWaitingQueue;
