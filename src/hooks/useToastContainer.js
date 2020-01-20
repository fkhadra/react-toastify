import {
  useEffect,
  useRef,
  useReducer,
  cloneElement,
  isValidElement
} from "react";
import {
  eventManager,
  ACTION,
  parseClassName,
  canBeRendered,
  isValidDelay
} from "../utils";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.toastId].filter(
        id => id !== action.staleToastId
      );
    case "UPDATE":
      return [...state];
    case "REMOVE":
      return action.id ? state.filter(v => v !== action.id) : [];
    default:
      break;
  }
}

export function useToastContainer(props) {
  const [toast, dispatch] = useReducer(reducer, []);
  const collectionRef = useRef({});
  const containerRef = useRef(null);
  const toastKeyRef = useRef(1);
  const instanceRef = useRef({
    containerId: null,
    isToastActive: false
  });

  useEffect(() => {
    eventManager
      .cancelEmit(ACTION.WILL_UNMOUNT)
      .on(ACTION.SHOW, (content, options) => {
        const { toastId, updateId, staleToastId, delay } = options;
        
        if (containerRef.current) {
          collectionRef.current[toastId] = {
            content,
            options
          };

          updateId
            ? dispatch({ type: "UPDATE" })
            : dispatch({
                type: "ADD",
                toastId,
                staleToastId
              });
        }
      })
      .on(ACTION.CLEAR, id =>
        // Dark magix FTW
        !containerRef.current
          ? null
          : id == null
          ? dispatch({ type: "REMOVE" })
          : dispatch({ type: "REMOVE", id })
      )
      .emit(ACTION.DID_MOUNT, instanceRef.current);

    return () => eventManager.emit(ACTION.WILL_UNMOUNT, instanceRef.current);
  }, []);

  useEffect(() => {
    eventManager.emit(ACTION.ON_CHANGE, toast.length, props.containerId);
  }, [toast]);

  function isToastActive(id) {
    return toast.indexOf(id) !== -1;
  }

  function removeToast(id) {
    dispatch({ type: "REMOVE", id });
  }

  function getAutoCloseDelay(toastAutoClose) {
    return toastAutoClose === false || isValidDelay(toastAutoClose)
      ? toastAutoClose
      : props.autoClose;
  }

  // Check for multi-container and also for duplicate toastId
  function canBuildToast({ containerId, toastId, updateId, content }) {
    return (
      (props.enableMultiContainer && containerId === props.containerId) ||
      canBeRendered(content)
    );
  }

  function build({ content, options }) {
    const { toastId, updateId } = options;
    const collection = collectionRef.current;
    const closeToast = () => removeToast(toastId);
    const toastOptions = {
      toastId,
      updateId,
      key: options.key || toastKeyRef.current++,
      type: options.type,
      closeToast: closeToast,
      rtl: props.rtl,
      position: options.position || props.position,
      transition: options.transition || props.transition,
      className: parseClassName(options.className || props.toastClassName),
      bodyClassName: parseClassName(
        options.bodyClassName || props.bodyClassName
      ),
      onClick: options.onClick || props.onClick,
      // closeButton: makeCloseButton(options.closeButton, toastId, options.type),
      pauseOnHover:
        typeof options.pauseOnHover === "boolean"
          ? options.pauseOnHover
          : props.pauseOnHover,
      pauseOnFocusLoss:
        typeof options.pauseOnFocusLoss === "boolean"
          ? options.pauseOnFocusLoss
          : props.pauseOnFocusLoss,
      draggable:
        typeof options.draggable === "boolean"
          ? options.draggable
          : props.draggable,
      draggablePercent:
        typeof options.draggablePercent === "number" &&
        !isNaN(options.draggablePercent)
          ? options.draggablePercent
          : props.draggablePercent,
      closeOnClick:
        typeof options.closeOnClick === "boolean"
          ? options.closeOnClick
          : props.closeOnClick,
      progressClassName: parseClassName(
        options.progressClassName || props.progressClassName
      ),
      progressStyle: props.progressStyle,
      autoClose: getAutoCloseDelay(options.autoClose),
      hideProgressBar:
        typeof options.hideProgressBar === "boolean"
          ? options.hideProgressBar
          : props.hideProgressBar,
      progress: parseFloat(options.progress),
      role: typeof options.role === "string" ? options.role : props.role
    };

    typeof options.onOpen === "function" &&
      (toastOptions.onOpen = options.onOpen);

    typeof options.onClose === "function" &&
      (toastOptions.onClose = options.onClose);

    let contentWithClose = content;

    if (
      isValidElement(content) &&
      typeof content.type !== "string" &&
      typeof content.type !== "number"
    ) {
      contentWithClose = cloneElement(content, {
        closeToast
      });
    } else if (typeof content === "function") {
      contentWithClose = content({ closeToast });
    }

    collection[toastId] = {
      // add closeToast function to react component only
      content: contentWithClose,
      options: toastOptions
    };

    return collection[toastId];

    // if (isValidDelay(delay)) {
    //   setTimeout(() => {
    //     appendToast(toastOptions, content, options.staleToastId);
    //   }, delay);
    // } else {
    //   appendToast(toastOptions, content, options.staleToastId);
    // }
  }

  function getToastToRender() {
    const toastToRender = {};
    const collection = collectionRef.current;
    const { newestOnTop } = props;
    const toastList = newestOnTop
      ? Object.keys(collection).reverse()
      : Object.keys(collection);

    // reduce nope  😜
    for (let i = 0; i < toastList.length; i++) {
      const toastId = toastList[i];
      const rawToast = collection[toastId];
      const position = rawToast.options.position || props.position;

      toastToRender[position] || (toastToRender[position] = []);

      if (isToastActive(toastId) && canBuildToast(rawToast)) {
        const toast = build(rawToast);
        toastToRender[position].push(toast);
      } else {
        delete collection[toastId];
      }
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
