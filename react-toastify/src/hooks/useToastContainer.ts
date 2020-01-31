import {
  useEffect,
  useRef,
  useReducer,
  cloneElement,
  isValidElement
} from 'react';
import {
  eventManager,
  parseClassName,
  canBeRendered,
  isBool,
  isFn,
  isNum,
  isStr
} from '../utils';

import {
  ToastId,
  ToastContainerProps,
  ContainerId,
 WithInjectedOptions,
  ToastContent,
  Toast,
  ToastPosition
} from '../types';

type State = Array<ToastId>;
type Action =
  | { type: 'ADD'; toastId: ToastId; staleId?: ToastId }
  | { type: 'UPDATE' }
  | { type: 'REMOVE'; toastId?: ToastId };

type CollectionItem = Record<ToastId, Toast>;
type ToastToRender = Partial<Record<ToastPosition, Toast[]>>;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toastId].filter(id => id !== action.staleId);
    case 'UPDATE':
      return [...state];
    case 'REMOVE':
      return action.toastId ? state.filter(id => id !== action.toastId) : [];
    default:
      throw "";
  }
}

export interface ContainerInstance {
  containerId?: ContainerId | null;
  isToastActive: false | ((toastId: ToastId) => boolean);
  getToast: (id: ToastId) => Toast | null;
}

export function useToastContainer(props: ToastContainerProps) {
  const [toast, dispatch] = useReducer(reducer, []);
  const collectionRef = useRef<CollectionItem>({});
  const containerRef = useRef(null);
  const toastKeyRef = useRef(1);
  const instanceRef = useRef<ContainerInstance>({
    containerId: null,
    isToastActive: false,
    getToast: id => collectionRef.current[id] || null
  });

  useEffect(() => {
    instanceRef.current.containerId = props.containerId;
    eventManager
      .cancelEmit('willUnmount')
      .on('show', buildToast)
      .on('clear', toastId =>
        // Dark magix FTW
        !containerRef.current
          ? null
          : toastId == null
          ? dispatch({ type: 'REMOVE' })
          : dispatch({ type: 'REMOVE', toastId })
      )
      .emit('didMount', instanceRef.current);

    return () => eventManager.emit('willUnmount', instanceRef.current);
  }, []);

  useEffect(() => {
    instanceRef.current.isToastActive = isToastActive;
    eventManager.emit('change', toast.length, props.containerId);
  }, [toast]);

  function isToastActive(id: ToastId) {
    return toast.indexOf(id) !== -1;
  }

  function removeToast(toastId?: ToastId) {
    dispatch({ type: 'REMOVE', toastId });
  }

  function getAutoCloseDelay(toastAutoClose?: false | number) {
    return toastAutoClose === false ||
      (isNum(toastAutoClose) && toastAutoClose as number > 0)
      ? toastAutoClose
      : props.autoClose;
  }

  /**
   * check is a container is attached
   * check for multi-container, build only if associated
   * check for duplicate toastId if no update
   */
  function isNotValid({ containerId, toastId, updateId }: WithInjectedOptions) {
    return !containerRef.current ||
      (props.enableMultiContainer && containerId !== props.containerId) ||
      (isToastActive(toastId) && updateId == null)
      ? true
      : false;
  }

  function buildToast(
    content: ToastContent,
    { delay, staleId, ...options }: WithInjectedOptions
  ) {
    if (!canBeRendered(content) || isNotValid(options)) return;

    const { toastId, updateId } = options;
    const closeToast = () => removeToast(toastId);
    const toastOptions: WithInjectedOptions = {
      toastId,
      updateId,
      key: options.key || toastKeyRef.current++,
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
        : props.draggablePercent,
      closeOnClick: isBool(options.closeOnClick)
        ? options.closeOnClick
        : props.closeOnClick,
      progressClassName: parseClassName(
        options.progressClassName || props.progressClassName
      ),
      progressStyle: props.progressStyle,
      autoClose: getAutoCloseDelay(options.autoClose),
      hideProgressBar: isBool(options.hideProgressBar)
        ? options.hideProgressBar
        : props.hideProgressBar,
      progress: options.progress,
      role: isStr(options.role) ? options.role : props.role
    };

    if (isFn(options.onOpen)) toastOptions.onOpen = options.onOpen;
    if (isFn(options.onClose)) toastOptions.onClose = options.onClose;

    let toastContent = content;

    if (isValidElement(content)) {
      toastContent = cloneElement(content, {
        closeToast
      });
    } else if (isFn(content)) {
      toastContent = (content as Function)({ closeToast });
    }

    if (isNum(delay) && delay as number > 0) {
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
    staleId?: ToastId
  ) {
    const { toastId, updateId } = options;

    collectionRef.current[toastId] = {
      content,
      options
    };

    updateId
      ? dispatch({ type: 'UPDATE' })
      : dispatch({
          type: 'ADD',
          toastId,
          staleId
        });
  }

  function getToastToRender() {
    const toastToRender: ToastToRender = {};
    const collection = collectionRef.current;
    const { newestOnTop } = props;
    const toastList = newestOnTop
      ? Object.keys(collection).reverse()
      : Object.keys(collection);

    // reduce nope  😜
    for (let i = 0; i < toastList.length; i++) {
      const toastId = toastList[i];
      const toast = collection[toastId];
      const position = toast.options.position;

      toastToRender[position] || (toastToRender[position] = []);
      isToastActive(toastId)
        ? toastToRender[position]!.push(toast)
        : delete collection[toastId];
    }

    return toastToRender;
  }

  return {
    toast,
    getToastToRender,
    collection: collectionRef.current,
    containerRef,
    isToastActive,
    removeToast
  };
}
