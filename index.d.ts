import * as React from 'react';
import Transition from 'react-transition-group/Transition';

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

type ToastContent = React.ReactNode | { (): void };

interface styleProps {
  /**
   * Set the default toast width. 
   * Default: '320px' 
   */
  width?: string;

  /**
   * Set the toast color when no type is provided. 
   * Default: '#fff'
   */
  colorDefault?: string;

  /**
   * Set the toast color when the type is INFO.
   * Default: '#3498db'
   */
  colorInfo?: string;

  /**
   * Set the toast color when the type is SUCCESS. 
   * Default: '#07bc0c'
   */
  colorSuccess?: string;
  
  /**
   * Set the toast color when the type is WARNING. 
   * Default: '#f1c40f'
   */
  colorWarning?: string;

  /**
   * Set the toast color when the type is ERROR. 
   * Default: '#e74c3c'
   */
  colorError?: string;

  /**
   * Set the progress bar color when no type is provided.
   * Default: 'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)' 
   */
  colorProgressDefault?: string;

  /**
   * Media query to apply mobile style. 
   * Default: 'only screen and (max-width : 480px)'
   */
  mobile?: string;

  /**
   * Set the z-index for the ToastContainer.
   * Default: 9999
   */
  zIndex?: string | number;
  
  /**
   * Override the default position.
   * Default: {
   *   top: '1em',
   *   left: '1em'
   * }  
   */
  TOP_LEFT?: object;

  /**
   * Override the default position.
   * Default: {
   *   top: '1em',
   *   left: '50%'
   * }  
   */
  TOP_CENTER?: object;

  /**
   * Override the default position.
   * Default: {
   *   top: '1em',
   *   right: '1em'
   *}
   */
  TOP_RIGHT?: object;

  /**
   * Override the default position.
   * Default: {
   *   bottom: '1em',
   *   left: '1em'
   * }  
   */
  BOTTOM_LEFT?: object;

 /**
   * Override the default position.
   * Default: {
   *   bottom: '1em',
   *   left: '50%'
   *} 
   */
  BOTTOM_CENTER?: object;

  /**
   * Override the default position.
   * Default: {
   *   bottom: '1em',
   *   right: '1em'
   *}  
   */
  BOTTOM_RIGHT?: object;
}

interface CommonOptions {
  /**
   * Pause the timer when the mouse hover the toast.
   */
  pauseOnHover?: boolean;

  /**
   * Remove the toast when clicked.
   */
  closeOnClick?: boolean;

  /**
   * Set the delay in ms to close the toast automatically. 
   * Use `false` to prevent the toast from closing.
   */
  autoClose?: number | false;

  /**
   * Set the default position to use.
   * One of: 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'
   */
  position?: string;

  /**
   * Pass a custom close button. 
   * To remove the close button pass `false`
   */
  closeButton?: React.ReactNode | false;

  /**
   * An optional css class to set for the progress bar. It can be a glamor rule
   * or a css class name.
   */
  progressClassName?: string | object;

  /**
   * An optional css class to set. It can be a glamor rule
   * or a css class name.
   */
  className?: string | object;

  /**
   * An optional css class to set for the toast content. It can be a glamor rule
   * or a css class name.
   */
  bodyClassName?: string | object;

  /**
   * Show or not the progress bar.
   */
  hideProgressBar?: boolean;

  /**
   * Pass a custom transition built with react-transition-group.
   */
  transition?: Transition;
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
   * One of: 'info', 'success', 'warning', 'error', 'default'.
   */
  type?: ToastType;
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
   * Default: false
   */
  newestOnTop?: boolean;

  /**
   * An optional inline style to apply.
   */
  style?: object;

  /**
   * An optional css class to set. It can be a glamor rule
   * or a css class name.
   */
  toastClassName?: string | object;
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
  update(toastId: number, options?: UpdateOptions): number;

  /**
   * Display a toast without a specific type.
   */
  (content: ToastContent, options?: ToastOptions): number;
}

export class ToastContainer extends React.Component<ToastContainerProps> {}

/**
 * Helper to override the global style.
 */
export function style(props: styleProps): void;

export let toast: Toast;
