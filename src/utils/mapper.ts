import { Toast, ToastItem } from '../types';

export function toToastItem(toast: Toast): ToastItem {
  return {
    content: toast.content,
    containerId: toast.props.containerId,
    id: toast.props.toastId,
    theme: toast.props.theme,
    type: toast.props.type,
    data: toast.props.data,
    isLoading: toast.props.isLoading,
    icon: toast.props.icon
  };
}
