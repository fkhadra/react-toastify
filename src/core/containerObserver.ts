import { ReactElement, cloneElement, isValidElement } from 'react';
import {
  Id,
  NotValidatedToastProps,
  OnChangeCallback,
  Toast,
  ToastContainerProps,
  ToastContent,
  ToastProps
} from '../types';
import {
  canBeRendered,
  getAutoCloseDelay,
  isFn,
  isNum,
  isStr,
  parseClassName,
  toToastItem
} from '../utils';

interface QueuedToast {
  content: ToastContent<any>;
  props: ToastProps;
  staleId?: Id;
}

type Notify = () => void;

interface ActiveToast {
  content: ToastContent<any>;
  props: ToastProps;
  staleId?: Id;
}

export type ContainerObserver = ReturnType<typeof createContainerObserver>;

export function createContainerObserver(
  id: Id,
  containerProps: ToastContainerProps,
  dispatchChanges: OnChangeCallback
) {
  let toastKey = 1;
  let toastCount = 0;
  let queue: QueuedToast[] = [];
  let activeToasts: Id[] = [];
  let snapshot: Toast[] = [];
  let props = containerProps;
  const toasts = new Map<Id, Toast>();
  const listeners = new Set<Notify>();

  const observe = (notify: Notify) => {
    listeners.add(notify);
    return () => listeners.delete(notify);
  };

  const notify = () => {
    snapshot = Array.from(toasts.values());
    listeners.forEach(cb => cb());
  };

  const shouldIgnoreToast = ({
    containerId,
    toastId,
    updateId
  }: NotValidatedToastProps) => {
    const containerMismatch = containerId ? containerId !== id : id !== 1;
    const isDuplicate = toasts.has(toastId) && updateId == null;

    return containerMismatch || isDuplicate;
  };

  const toggle = (v: boolean, id?: Id) => {
    toasts.forEach(t => {
      if (id == null || id === t.props.toastId) isFn(t.toggle) && t.toggle(v);
    });
  };

  const removeToast = (id?: Id) => {
    activeToasts = id == null ? [] : activeToasts.filter(v => v !== id);
    notify();
  };

  const clearQueue = () => {
    toastCount -= queue.length;
    queue = [];
  };

  const addActiveToast = (toast: ActiveToast) => {
    const { toastId, onOpen, updateId, children } = toast.props;
    const isNew = updateId == null;

    if (toast.staleId) toasts.delete(toast.staleId);

    toasts.set(toastId, toast);
    activeToasts = [...activeToasts, toast.props.toastId].filter(
      v => v !== toast.staleId
    );
    notify();
    dispatchChanges(toToastItem(toast, isNew ? 'added' : 'updated'));

    if (isNew && isFn(onOpen))
      onOpen(isValidElement(children) && children.props);
  };

  const buildToast = <TData = unknown>(
    content: ToastContent<TData>,
    options: NotValidatedToastProps
  ) => {
    if (shouldIgnoreToast(options)) return;

    const { toastId, updateId, data, staleId, delay } = options;
    const closeToast = () => {
      removeToast(toastId);
    };

    const isNotAnUpdate = updateId == null;

    if (isNotAnUpdate) toastCount++;

    const toastProps = {
      ...props,
      style: props.toastStyle,
      key: toastKey++,
      ...Object.fromEntries(
        Object.entries(options).filter(([_, v]) => v != null)
      ),
      toastId,
      updateId,
      data,
      closeToast,
      isIn: false,
      className: parseClassName(options.className || props.toastClassName),
      bodyClassName: parseClassName(
        options.bodyClassName || props.bodyClassName
      ),
      progressClassName: parseClassName(
        options.progressClassName || props.progressClassName
      ),
      autoClose: options.isLoading
        ? false
        : getAutoCloseDelay(options.autoClose, props.autoClose),
      deleteToast() {
        const toastToRemove = toasts.get(toastId)!;
        const { onClose, children } = toastToRemove.props;
        if (isFn(onClose)) onClose(isValidElement(children) && children.props);

        dispatchChanges(toToastItem(toastToRemove, 'removed'));
        toasts.delete(toastId);

        toastCount--;
        if (toastCount < 0) toastCount = 0;

        if (queue.length > 0) {
          addActiveToast(queue.shift() as ActiveToast);
          return;
        }

        notify();
      }
    } as ToastProps;

    toastProps.closeButton = props.closeButton;

    if (options.closeButton === false || canBeRendered(options.closeButton)) {
      toastProps.closeButton = options.closeButton;
    } else if (options.closeButton === true) {
      toastProps.closeButton = canBeRendered(props.closeButton)
        ? props.closeButton
        : true;
    }

    let toastContent = content;

    if (isValidElement(content) && !isStr(content.type)) {
      toastContent = cloneElement(content as ReactElement, {
        closeToast,
        toastProps,
        data
      });
    } else if (isFn(content)) {
      toastContent = content({ closeToast, toastProps, data: data as TData });
    }

    const activeToast = {
      content: toastContent,
      props: toastProps,
      staleId
    };

    // not handling limit + delay by design. Waiting for user feedback first
    if (
      props.limit &&
      props.limit > 0 &&
      toastCount > props.limit &&
      isNotAnUpdate
    ) {
      queue.push(activeToast);
    } else if (isNum(delay)) {
      setTimeout(() => {
        addActiveToast(activeToast);
      }, delay);
    } else {
      addActiveToast(activeToast);
    }
  };

  return {
    id,
    props,
    observe,
    toggle,
    removeToast,
    toasts,
    clearQueue,
    buildToast,
    setProps(p: ToastContainerProps) {
      props = p;
    },
    setToggle: (id: Id, fn: (v: boolean) => void) => {
      toasts.get(id)!.toggle = fn;
    },
    isToastActive: (id: Id) => activeToasts.some(v => v === id),
    getSnapshot: () => (props.newestOnTop ? snapshot.reverse() : snapshot)
  };
}
