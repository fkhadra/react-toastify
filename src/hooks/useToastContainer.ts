import {
  useEffect,
  useRef,
  useReducer,
  cloneElement,
  isValidElement
} from 'react';
import { eventManager, Event } from '../core';
import {
  parseClassName,
  canBeRendered,
  isBool,
  isFn,
  isNum,
  isStr
} from '../utils';

import {
  Id,
  ToastContainerProps,
  WithInjectedOptions,
  ToastContent,
  Toast,
  ToastPosition
} from '../types';
import { useKeeper } from './useKeeper';

type State = Array<Id>;
type Action =
  | { type: 'ADD'; toastId: Id; staleId?: Id }
  | { type: 'REMOVE'; toastId?: Id };

type CollectionItem = Record<Id, Toast>;
type ToastToRender = Partial<Record<ToastPosition, Toast[]>>;

interface QueuedToast {
  toastContent: ToastContent;
  toastOptions: WithInjectedOptions;
  staleId?: Id;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toastId].filter(id => id !== action.staleId);
    case 'REMOVE':
      return action.toastId === 0 || action.toastId
        ? state.filter(id => id !== action.toastId)
        : [];
  }
}

export interface ContainerInstance {
  toastKey: number;
  displayedToast: number;
  props: ToastContainerProps;
  containerId?: Id | null;
  isToastActive: (toastId: Id) => boolean;
  getToast: (id: Id) => Toast | null;
}

export function useToastContainer(props: ToastContainerProps) {
  const [toast, dispatch] = useReducer(reducer, []);
  const containerRef = useRef(null);
  const queue = useKeeper<QueuedToast[]>([]);
  const collection = useKeeper<CollectionItem>({});
  const instance = useKeeper<ContainerInstance>({
    toastKey: 1,
    displayedToast: 0,
    props,
    containerId: null,
    isToastActive: isToastActive,
    getToast: id => collection[id] || null
  });

  useEffect(() => {
    instance.containerId = props.containerId;
    eventManager
      .cancelEmit(Event.WillUnmount)
      .on(Event.Show, buildToast)
      .on(Event.Clear, toastId => containerRef.current && removeToast(toastId))
      .emit(Event.DidMount, instance);

    return () => eventManager.emit(Event.WillUnmount, instance);
  }, []);

  useEffect(() => {
    instance.props = props;
  });

  useEffect(() => {
    instance.isToastActive = isToastActive;
    instance.displayedToast = toast.length;
    eventManager.emit(Event.Change, toast.length, props.containerId);
  }, [toast]);

  function isToastActive(id: Id) {
    return toast.indexOf(id) !== -1;
  }

  function removeToast(toastId?: Id) {
    dispatch({ type: 'REMOVE', toastId });

    if (queue.length > 0) {
      const {
        toastContent,
        toastOptions,
        staleId
      } = queue.shift() as QueuedToast;
      // ensure that exit transition has been completed
      // this could be tweaked
      setTimeout(() => {
        appendToast(toastContent, toastOptions, staleId);
      }, 500);
    }
  }

  /**
   * check if a container is attached to the dom
   * check for multi-container, build only if associated
   * check for duplicate toastId if no update
   */
  function isNotValid({ containerId, toastId, updateId }: WithInjectedOptions) {
    return !containerRef.current ||
      (instance.props.enableMultiContainer &&
        containerId !== instance.props.containerId) ||
      (instance.isToastActive(toastId) && updateId == null)
      ? true
      : false;
  }

  function getAutoCloseDelay(toastAutoClose?: false | number) {
    return toastAutoClose === false ||
      (isNum(toastAutoClose) && (toastAutoClose as number) > 0)
      ? toastAutoClose
      : instance.props.autoClose;
  }

  // this function and all the function called inside needs to rely on ref(`useKeeper`)
  function buildToast(
    content: ToastContent,
    { delay, staleId, ...options }: WithInjectedOptions
  ) {
    if (!canBeRendered(content) || isNotValid(options)) return;

    const { toastId, updateId } = options;
    const { props, displayedToast, isToastActive } = instance;
    const closeToast = () => removeToast(toastId);
    const toastOptions: WithInjectedOptions = {
      toastId,
      updateId,
      key: options.key || instance.toastKey++,
      type: options.type,
      closeToast: closeToast,
      closeButton: options.closeButton,
      rtl: props.rtl,
      position: options.position || props.position,
      transition: options.transition || props.transition,
      className: parseClassName(options.className || props.toastClassName),
      bodyClassName: parseClassName(
        options.bodyClassName || props.bodyClassName
      ),
      style: options.style || props.toastStyle,
      bodyStyle: options.bodyStyle || props.bodyStyle,
      onClick: options.onClick || props.onClick,
      pauseOnHover: isBool(options.pauseOnHover)
        ? options.pauseOnHover
        : props.pauseOnHover,
      pauseOnFocusLoss: isBool(options.pauseOnFocusLoss)
        ? options.pauseOnFocusLoss
        : props.pauseOnFocusLoss,
      draggable: isBool(options.draggable)
        ? options.draggable
        : props.draggable,
      draggablePercent: isNum(options.draggablePercent)
        ? options.draggablePercent
        : (props.draggablePercent as number),
      closeOnClick: isBool(options.closeOnClick)
        ? options.closeOnClick
        : props.closeOnClick,
      progressClassName: parseClassName(
        options.progressClassName || props.progressClassName
      ),
      progressStyle: options.progressStyle || props.progressStyle,
      autoClose: getAutoCloseDelay(options.autoClose),
      hideProgressBar: isBool(options.hideProgressBar)
        ? options.hideProgressBar
        : props.hideProgressBar,
      progress: options.progress,
      role: isStr(options.role) ? options.role : props.role
    };

    if (isFn(options.onOpen)) toastOptions.onOpen = options.onOpen;
    if (isFn(options.onClose)) toastOptions.onClose = options.onClose;

    let closeButton = props.closeButton;

    if (options.closeButton === false || canBeRendered(options.closeButton)) {
      closeButton = options.closeButton;
    } else if (options.closeButton === true) {
      closeButton = canBeRendered(props.closeButton) ? props.closeButton : true;
    }

    toastOptions.closeButton = closeButton;

    let toastContent = content;

    if (isValidElement(content) && !isStr(content.type)) {
      toastContent = cloneElement(content, {
        closeToast
      });
    } else if (isFn(content)) {
      toastContent = content({ closeToast });
    }

    // not handling limit + delay by design. Waiting for user feedback first
    if (
      props.limit &&
      props.limit > 0 &&
      displayedToast === props.limit &&
      !isToastActive(toastId)
    ) {
      queue.push({ toastContent, toastOptions, staleId });
    } else if (isNum(delay) && (delay as number) > 0) {
      setTimeout(() => {
        appendToast(toastContent, toastOptions, staleId);
      }, delay);
    } else {
      appendToast(toastContent, toastOptions, staleId);
    }
  }

  function appendToast(
    content: ToastContent,
    options: WithInjectedOptions,
    staleId?: Id
  ) {
    const { toastId } = options;

    collection[toastId] = {
      content,
      options
    };
    dispatch({
      type: 'ADD',
      toastId,
      staleId
    });
  }

  function getToastToRender<T>(
    cb: (position: ToastPosition, toastList: Toast[]) => T
  ) {
    const toastToRender: ToastToRender = {};
    const toastList = props.newestOnTop
      ? Object.keys(collection).reverse()
      : Object.keys(collection);

    for (let i = 0; i < toastList.length; i++) {
      const toast = collection[toastList[i]];
      const { position, toastId } = toast.options;
      toastToRender[position] || (toastToRender[position] = []);

      isToastActive(toastId)
        ? toastToRender[position]!.push(toast)
        : delete collection[toastId];
    }

    return (Object.keys(toastToRender) as Array<ToastPosition>).map(p =>
      cb(p, toastToRender[p]!)
    );
  }

  return {
    toast,
    getToastToRender,
    collection,
    containerRef,
    isToastActive,
    removeToast
  };
}
