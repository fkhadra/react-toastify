import * as React from "react";
import Transition from "react-transition-group/Transition";

type ToastType = "info" | "success" | "warning" | "error" | "default";

interface styleProps {
  width?: string,
  colorDefault?: string,
  colorInfo?: string,
  colorSuccess?: string,
  colorWarning?: string,
  colorError?: string,
  colorProgressDefault?: string,
  mobile?: string,
  zIndex?: string | number,
}

interface CommonOptions {
  pauseOnHover?: boolean;
  closeOnClick?: boolean;
  autoClose?: number | false;
  position?: string;
  closeButton?: React.ReactNode | false;
  progressClassName?: string | object;
  className?: string | object;
  bodyClassName?: string | object;
  hideProgressBar?: boolean;
  transition?: Transition;
}

interface ToastOptions extends CommonOptions {
  onOpen?: () => void;
  onClose?: () => void;
  type?: ToastType;
}

interface UpdateOptions extends ToastOptions {
  render?: React.ReactNode
}

interface ToastContainerProps extends CommonOptions {
  newestOnTop?: boolean;
  style?: object;
  toastClassName?: string | object;
}

interface Toast {
  success(content: React.ReactNode, options?: ToastOptions): number;
  info(content: React.ReactNode, options?: ToastOptions): number;
  warn(content: React.ReactNode, options?: ToastOptions): number;
  error(content: React.ReactNode, options?: ToastOptions): number;
  isActive(toastId: number): boolean;
  dismiss(toastId: number): void;
  update(toastId: number, options?: UpdateOptions): number;
  (content: React.ReactNode, options?: ToastOptions): number;
}

export class ToastContainer extends React.Component<ToastContainerProps> {}

export function style(props: styleProps): void;

export let toast: Toast;
