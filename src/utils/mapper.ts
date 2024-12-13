import { Toast, ToastContentProps, ToastItem, ToastItemStatus, ToastProps } from '../types';
import { cloneElement, isValidElement, ReactElement } from 'react';
import { isFn, isStr } from './propValidator';

export function toToastItem(toast: Toast, status: ToastItemStatus): ToastItem {
  return {
    content: renderContent(toast.content, toast.props),
    containerId: toast.props.containerId,
    id: toast.props.toastId,
    theme: toast.props.theme,
    type: toast.props.type,
    data: toast.props.data || {},
    isLoading: toast.props.isLoading,
    icon: toast.props.icon,
    reason: toast.removalReason,
    status
  };
}

export function renderContent(content: unknown, props: ToastProps, isPaused: boolean = false) {
  if (isValidElement(content) && !isStr(content.type)) {
    return cloneElement<ToastContentProps>(content as ReactElement<any>, {
      closeToast: props.closeToast,
      toastProps: props,
      data: props.data,
      isPaused
    });
  } else if (isFn(content)) {
    return content({
      closeToast: props.closeToast,
      toastProps: props,
      data: props.data,
      isPaused
    });
  }

  return content;
}
