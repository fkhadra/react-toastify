import { ReactElement, cloneElement, isValidElement } from 'react';
import { getIcon } from '../components/Icons';
import {
  Id,
  NotValidatedToastProps,
  Toast,
  ToastContainerProps,
  ToastContent,
  ToastProps,
  OnChangeCallback
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

interface ContainerObserverParams {
  id: Id;
  props: ToastContainerProps;
  dispatchChanges: OnChangeCallback;
}

export type ContainerObserver = ReturnType<typeof createContainerObserver>;

export function createContainerObserver({
  id,
  props,
  dispatchChanges
}: ContainerObserverParams) {
  let ToastKey = 1;
  let Count = 0;
  let Queue: QueuedToast[] = [];
  let ActiveToasts: Id[] = [];
  let Snapshot: Toast[] = [];
  const Toasts = new Map<Id, Toast>();
  const Listeners = new Set<Notify>();

  const observe = (notify: Notify) => {
    Listeners.add(notify);
    return () => Listeners.delete(notify);
  };

  const notify = () => {
    Snapshot = Array.from(Toasts.values());
    Listeners.forEach(cb => cb());
  };

  const shouldIgnoreToast = ({
    containerId,
    toastId,
    updateId
  }: NotValidatedToastProps) => {
    const containerMismatch = containerId ? containerId !== id : id !== 1;
    const isDuplicate = Toasts.has(toastId) && updateId == null;

    return containerMismatch || isDuplicate;
  };

  const removeActiveToast = (id?: Id) => {
    ActiveToasts = id == null ? [] : ActiveToasts.filter(v => v !== id);
    notify();
  };

  const clearQueue = () => {
    Count -= Queue.length;
    Queue = [];
  };

  const addActiveToast = (toast: ActiveToast) => {
    const { toastId, onOpen, updateId, children } = toast.props;
    const isNew = updateId == null;

    if (toast.staleId) Toasts.delete(toast.staleId);

    Toasts.set(toastId, toast);
    ActiveToasts = [...ActiveToasts, toast.props.toastId].filter(
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
      removeActiveToast(toastId);
    };

    const isNotAnUpdate = updateId == null;

    if (isNotAnUpdate) Count++;

    const toastProps = {
      ...props,
      style: props.toastStyle,
      key: ToastKey++,
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
        const toastToRemove = Toasts.get(toastId)!;
        const { onClose, children } = toastToRemove.props;
        if (isFn(onClose)) onClose(isValidElement(children) && children.props);

        dispatchChanges(toToastItem(toastToRemove, 'removed'));
        Toasts.delete(toastId);

        Count--;
        if (Count < 0) Count = 0;

        if (Queue.length > 0) {
          addActiveToast(Queue.shift() as ActiveToast);
          return;
        }

        notify();
      }
    } as ToastProps;

    toastProps.iconOut = getIcon(toastProps);

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
      Count > props.limit &&
      isNotAnUpdate
    ) {
      Queue.push(activeToast);
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
    removeActiveToast,
    toasts: Toasts,
    clearQueue,
    isToastActive(id: Id) {
      return ActiveToasts.some(v => v === id);
    },
    getSnapshot() {
      return props.newestOnTop ? Snapshot.reverse() : Snapshot;
    },
    buildToast
  };
}
