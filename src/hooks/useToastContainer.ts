import {
  useEffect,
  useRef,
  useReducer,
  cloneElement,
  isValidElement,
  useState,
  ReactElement
} from 'react';
import {
  parseClassName,
  canBeRendered,
  isFn,
  isNum,
  isStr,
  getAutoCloseDelay,
  toToastItem
} from '../utils';
import { eventManager, Event } from '../core/eventManager';

import {
  Id,
  ToastContainerProps,
  ToastProps,
  ToastContent,
  Toast,
  ToastPosition,
  ClearWaitingQueueParams,
  NotValidatedToastProps
} from '../types';

import { getIcon } from '../components/Icons';

interface QueuedToast {
  toastContent: ToastContent;
  toastProps: ToastProps;
  staleId?: Id;
}

export interface ContainerInstance {
  toastKey: number;
  displayedToast: number;
  props: ToastContainerProps;
  containerId?: Id | null;
  isToastActive: (toastId: Id) => boolean;
  getToast: (id: Id) => Toast | null | undefined;
  queue: QueuedToast[];
  count: number;
}

export function useToastContainer(props: ToastContainerProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [toastIds, setToastIds] = useState<Id[]>([]);
  const containerRef = useRef(null);
  const toastToRender = useRef(new Map<Id, Toast>()).current;
  const isToastActive = (id: Id) => toastIds.indexOf(id) !== -1;
  const instance = useRef<ContainerInstance>({
    toastKey: 1,
    displayedToast: 0,
    count: 0,
    queue: [],
    props,
    containerId: null,
    isToastActive,
    getToast: id => toastToRender.get(id)
  }).current;

  useEffect(() => {
    instance.containerId = props.containerId;
    eventManager
      .cancelEmit(Event.WillUnmount)
      .on(Event.Show, buildToast)
      .on(Event.Clear, toastId => containerRef.current && removeToast(toastId))
      .on(Event.ClearWaitingQueue, clearWaitingQueue)
      .emit(Event.DidMount, instance);

    return () => {
      toastToRender.clear();
      eventManager.emit(Event.WillUnmount, instance);
    };
  }, []);

  useEffect(() => {
    instance.props = props;
    instance.isToastActive = isToastActive;
    instance.displayedToast = toastIds.length;
  });

  function clearWaitingQueue({ containerId }: ClearWaitingQueueParams) {
    const { limit } = instance.props;
    if (limit && (!containerId || instance.containerId === containerId)) {
      instance.count -= instance.queue.length;
      instance.queue = [];
    }
  }

  function removeToast(toastId?: Id) {
    setToastIds(state =>
      toastId == null ? [] : state.filter(id => id !== toastId)
    );
  }

  function dequeueToast() {
    const { toastContent, toastProps, staleId } =
      instance.queue.shift() as QueuedToast;
    appendToast(toastContent, toastProps, staleId);
  }

  /**
   * check if a container is attached to the dom
   * check for multi-container, build only if associated
   * check for duplicate toastId if no update
   */
  function isNotValid(options: NotValidatedToastProps) {
    return (
      !containerRef.current ||
      (instance.props.enableMultiContainer &&
        options.containerId !== instance.props.containerId) ||
      (toastToRender.has(options.toastId) && options.updateId == null)
    );
  }

  // this function and all the function called inside needs to rely on refs
  function buildToast(
    content: ToastContent,
    { delay, staleId, ...options }: NotValidatedToastProps
  ) {
    if (!canBeRendered(content) || isNotValid(options)) return;

    const { toastId, updateId, data } = options;
    const { props } = instance;
    const closeToast = () => removeToast(toastId);
    const isNotAnUpdate = updateId == null;

    if (isNotAnUpdate) instance.count++;

    const toastProps = {
      ...props,
      style: props.toastStyle,
      key: instance.toastKey++,
      ...options,
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
        const removed = toToastItem(toastToRender.get(toastId)!, 'removed');
        toastToRender.delete(toastId);

        eventManager.emit(Event.Change, removed);

        const queueLen = instance.queue.length;
        instance.count =
          toastId == null
            ? instance.count - instance.displayedToast
            : instance.count - 1;

        if (instance.count < 0) instance.count = 0;

        if (queueLen > 0) {
          const freeSlot = toastId == null ? instance.props.limit! : 1;

          if (queueLen === 1 || freeSlot === 1) {
            instance.displayedToast++;
            dequeueToast();
          } else {
            const toDequeue = freeSlot > queueLen ? queueLen : freeSlot;
            instance.displayedToast = toDequeue;

            for (let i = 0; i < toDequeue; i++) dequeueToast();
          }
        } else {
          forceUpdate();
        }
      }
    } as ToastProps;

    toastProps.iconOut = getIcon(toastProps);

    if (isFn(options.onOpen)) toastProps.onOpen = options.onOpen;
    if (isFn(options.onClose)) toastProps.onClose = options.onClose;

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
      toastContent = content({ closeToast, toastProps, data });
    }

    // not handling limit + delay by design. Waiting for user feedback first
    if (
      props.limit &&
      props.limit > 0 &&
      instance.count > props.limit &&
      isNotAnUpdate
    ) {
      instance.queue.push({ toastContent, toastProps, staleId });
    } else if (isNum(delay)) {
      setTimeout(() => {
        appendToast(toastContent, toastProps, staleId);
      }, delay);
    } else {
      appendToast(toastContent, toastProps, staleId);
    }
  }

  function appendToast(
    content: ToastContent,
    toastProps: ToastProps,
    staleId?: Id
  ) {
    const { toastId } = toastProps;

    if (staleId) toastToRender.delete(staleId);

    const toast = {
      content,
      props: toastProps
    };
    toastToRender.set(toastId, toast);

    setToastIds(state => [...state, toastId].filter(id => id !== staleId));
    eventManager.emit(
      Event.Change,
      toToastItem(toast, toast.props.updateId == null ? 'added' : 'updated')
    );
  }

  function getToastToRender<T>(
    cb: (position: ToastPosition, toastList: Toast[]) => T
  ) {
    const toRender = new Map<ToastPosition, Toast[]>();
    const collection = Array.from(toastToRender.values());

    if (props.newestOnTop) collection.reverse();

    collection.forEach(toast => {
      const { position } = toast.props;
      toRender.has(position) || toRender.set(position, []);
      toRender.get(position)!.push(toast);
    });

    return Array.from(toRender, p => cb(p[0], p[1]));
  }

  return {
    getToastToRender,
    containerRef,
    isToastActive
  };
}
