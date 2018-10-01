import * as React from 'react';

export const enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  DEFAULT = 'default'
}

export const enum ToastPosition {
  TOP_RIGHT = 'top-right',
  TOP_CENTER = 'top-center',
  TOP_LEFT = 'top-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_LEFT = 'bottom-left'
}

type ToastContent = React.ReactNode | { (): void };

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
  position?: ToastPosition;

  /**
   * Pass a custom close button.
   * To remove the close button pass `false`
   */
  closeButton?: React.ReactNode | false;

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
  type?: ToastType;

  /**
   * Set a custom `toastId`
   */
  toastId?: number|string;
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
}

interface Toast {
  /**
   * Shorthand to display toast of type 'success'.
   */
  success(content: ToastContent, options?: ToastOptions): number;

  /**
   * Shorthand to display toast of type 'info'.
   */
  info(content: ToastContent, options?: ToastOptions): number;

  /**
   * Shorthand to display toast of type 'warning'.
   */
  warn(content: ToastContent, options?: ToastOptions): number;

  /**
   * Shorthand to display toast of type 'error'.
   */
  error(content: ToastContent, options?: ToastOptions): number;

  /**
   * Check if a toast is active by passing the `toastId`.
   * Each time you display a toast you receive a `toastId`.
   */
  isActive(toastId: number): boolean;

  /**
   * Remove a toast. If no `toastId` is used, all the active toast
   * will be removed.
   */
  dismiss(toastId?: number): void;

  /**
   * Update an existing toast. By default, we keep the initial content and options of the toast.
   */
  update(toastId: number, options?: UpdateOptions): void;

  /**
   * Listen for change when a toast is added or removed. The number of toast displayed is passed as paran to the callback
   */
  onChange(callback: ((count?: number) => void)): void;

  /**
   * Display a toast without a specific type.
   */
  (content: ToastContent, options?: ToastOptions): number;

  /**
   * Helper to set notification type
   */
  TYPE: {
    /**
     * Set notification type to `'info'`
     */
    INFO: ToastType.INFO;

    /**
     * Set notification type to `'success'`
     */
    SUCCESS: ToastType.SUCCESS;

    /**
     * Set notification type to `'warning'`
     */
    WARNING: ToastType.WARNING;

    /**
     * Set notification type to `'error'`
     */
    ERROR: ToastType.ERROR;

    /**
     * Set notification type to `'default'`
     */
    DEFAULT: ToastType.DEFAULT;
  };

  /**
   * Helper to set position
   */
  POSITION: {
    /**
     * Set the position to `'top-left'`
     */
    TOP_LEFT: ToastPosition.TOP_LEFT;

    /**
     * Set the position to `'top-right'`
     */
    TOP_RIGHT: ToastPosition.TOP_RIGHT;

    /**
     * Set the position to `'top-center'`
     */
    TOP_CENTER: ToastPosition.TOP_CENTER;

    /**
     * Set the position to `'bottom-left'`
     */
    BOTTOM_LEFT: ToastPosition.BOTTOM_LEFT;

    /**
     * Set the position to `'bottom-right'`
     */
    BOTTOM_RIGHT: ToastPosition.BOTTOM_RIGHT;

    /**
     * Set the position to `'bottom-center'`
     */
    BOTTOM_CENTER: ToastPosition.BOTTOM_CENTER;
  };
}

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
