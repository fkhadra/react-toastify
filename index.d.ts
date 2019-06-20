import * as React from 'react';

interface Position {
  /**
   * Set the position to `'top-left'`
   */
  TOP_LEFT: 'top-left';

  /**
   * Set the position to `'top-right'`
   */
  TOP_RIGHT: 'top-right';

  /**
   * Set the position to `'top-center'`
   */
  TOP_CENTER: 'top-center';

  /**
   * Set the position to `'bottom-left'`
   */
  BOTTOM_LEFT: 'bottom-left';

  /**
   * Set the position to `'bottom-right'`
   */
  BOTTOM_RIGHT: 'bottom-right';

  /**
   * Set the position to `'bottom-center'`
   */
  BOTTOM_CENTER: 'bottom-center';
}

interface Type {
  /**
   * Set notification type to `'info'`
   */
  INFO: 'info';

  /**
   * Set notification type to `'success'`
   */
  SUCCESS: 'success';

  /**
   * Set notification type to `'warning'`
   */
  WARNING: 'warning';

  /**
   * Set notification type to `'error'`
   */
  ERROR: 'error';

  /**
   * Set notification type to `'default'`
   */
  DEFAULT: 'default';
}

type PositionOptions =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

type ToastContent = React.ReactNode | { (): void };

type ToastId = number | string;

interface cssTransitionProps {
  /**
   * Css class to apply when toast enter
   */
  enter: string;

  /**
   * Css class to apply when toast leave
   */
  exit: string;

  /**
   * Define the duration of the transition in ms
   * `Default: 750`
   */
  duration?: number | Array<number>;

  /**
   * Append current toast position to the classname.
   * For instance `myclass--top-center`...
   * `Default: false`
   */
  appendPosition?: boolean;
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
  position?: PositionOptions;

  /**
   * Pass a custom close button.
   * To remove the close button pass `false`
   */
  closeButton?: React.ReactNode | boolean;

  /**
   * An optional css class to set for the progress bar.
   */
  progressClassName?: string | object;

  /**
   * An optional style to set for the progress bar.
   */
  progressStyle?: object;

  /**
   * An optional css class to set.
   */
  className?: string | object;

  /**
   * An optional css class to set for the toast content.
   */
  bodyClassName?: string | object;

  /**
   * Hide or show the progress bar.
   * `Default: false`
   */
  hideProgressBar?: boolean;

  /**
   * Pass a custom transition built with react-transition-group.
   */
  transition?: React.ComponentType;

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
  containerId?: string | number;

  /**
   * Fired when clicking inside toaster
   */
  onClick?: Function;
}

interface ToastOptions extends CommonOptions {
  /**
   * Called inside componentDidMount.
   */
  onOpen?: () => void;

  /**
   * Called inside componentWillUnMount.
   */
  onClose?: () => void;

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
   * Set the percentage for the controlled progress bar. `Value must be between 0 and 1.`
   */
  progress?: number;

  /**
   * Add a delay in ms before the toast appear.
   */
  delay?: number;
}

interface UpdateOptions extends ToastOptions {
  /**
   * Used to update a toast.
   * Pass any valid ReactNode(string, number, component)
   */
  render?: ToastContent;
}

interface ToastContainerProps extends CommonOptions {
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
  toastClassName?: string | object;

  /**
   * Support right to left display.
   * `Default: false`
   */
  rtl?: boolean;

  /**
   * Show the toast only if it includes containerId and it's the same as containerId
   * `Default: false`
   */
  enableMultiContainer?: boolean;
}

interface Toast {
  /**
   * Shorthand to display toast of type 'success'.
   */
  success(content: ToastContent, options?: ToastOptions): ToastId;

  /**
   * Shorthand to display toast of type 'info'.
   */
  info(content: ToastContent, options?: ToastOptions): ToastId;

  /**
   * Shorthand to display toast of type 'warning'.
   */
  warn(content: ToastContent, options?: ToastOptions): ToastId;

  /**
   * Shorthand to display toast of type 'error'.
   */
  error(content: ToastContent, options?: ToastOptions): ToastId;

  /**
   * Check if a toast is active by passing the `toastId`.
   * Each time you display a toast you receive a `toastId`.
   */
  isActive(toastId: ToastId): boolean;

  /**
   * Remove a toast. If no `toastId` is used, all the active toast
   * will be removed.
   */
  dismiss(toastId?: ToastId): void;

  /**
   * Update an existing toast. By default, we keep the initial content and options of the toast.
   */
  update(toastId: ToastId, options?: UpdateOptions): void;

  /**
   * Listen for change when a toast is added or removed. The number of toast displayed is passed as paran to the callback
   */
  onChange(callback: (count?: number) => void): void;

  /**
   * Set a controlled progress bar value to 100% then close the toast
   */
  done(toastId: ToastId): void;

  /**
   * Let you define `ToastContainer` props when lazy mounted.
   * When called enable lazy mounted container
   */
  configure(config?: ToastContainerProps): void;

  /**
   * Display a toast without a specific type.
   */
  (content: ToastContent, options?: ToastOptions): ToastId;

  /**
   * Helper to set notification type
   */
  TYPE: Type;

  /**
   * Helper to set position
   */
  POSITION: Position;
}

/**
 * Helper to set notification type
 */
export const ToastType: Type;

/**
 * Helper to set position
 */
export const ToastPosition: Position;

export class ToastContainer extends React.Component<ToastContainerProps, any> {}

/**
 * Helper to build custom entrance and exit transition
 */
export function cssTransition(props: cssTransitionProps): React.ComponentType;

export const toast: Toast;

/**
 * Built-in entrance and exit transition
 */
export const Slide: React.ComponentType;

/**
 * Built-in entrance and exit transition
 */
export const Bounce: React.ComponentType;

/**
 * Built-in entrance and exit transition
 */
export const Flip: React.ComponentType;

/**
 * Built-in entrance and exit transition
 */
export const Zoom: React.ComponentType;
