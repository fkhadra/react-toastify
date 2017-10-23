import * as React from "react";
import Transition from "react-transition-group/Transition"; 

export let toast: Toast;

interface Toast {
  success(content: React.ReactNode, options?: ToastOptions): number;
  info(content: React.ReactNode, options?: ToastOptions): number;
  warn(content: React.ReactNode, options?: ToastOptions): number;
  error(content: React.ReactNode, options?: ToastOptions): number;
  isActive(toastId: number): boolean;
  dismiss(toastId: number): void;
  (content: React.ReactNode, options?: ToastOptions): number;
}

interface CommonOptions {
  pauseOnHover?: boolean;
  closeOnClick?: boolean;
  autoClose?: number | false;
  position?: string;
  closeButton?: React.ReactNode | false;
  progressClassName?: string;
  className?: string;
  bodyClassName?: string;
  hideProgressBar?: boolean;
  transition?: Transition;
}

interface ToastOptions extends CommonOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

interface ToastContainerProps extends CommonOptions {
  newestOnTop?: boolean;
  style?: object;
  toastClassName?: string;
}

export class ToastContainer extends React.Component<ToastContainerProps> {}
