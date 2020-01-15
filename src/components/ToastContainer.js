import React, {
  isValidElement,
  cloneElement,
  useState,
  useRef,
  useEffect
} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { TransitionGroup } from "react-transition-group";

import Toast from "./Toast";
import CloseButton from "./CloseButton";
import { Bounce } from "./Transitions";
import {
  POSITION,
  ACTION,
  RT_NAMESPACE,
  eventManager,
  falseOrDelay,
  isValidDelay,
  objectValues
} from "../utils";

export default function ToastContainer(props) {
  const [toast, setToast] = useState([]);
  const collection = useRef({});
  const containerRef = useRef(null);
  const toastKey = useRef(1);
  const ref = useRef();
  const r = useRef({
    containerId: props.containerId || null,
    isToastActive: false
  });

  function isToastActive(id) {
    return toast.indexOf(id) !== -1;
  }
  function removeToast(id){
    setToast(toast.filter(v => v !== id));
  }

  function dispatchChange(){
    eventManager.emit(ACTION.ON_CHANGE, toast.length, props.containerId);
    
  }

  function getAutoCloseDelay(toastAutoClose){
    return toastAutoClose === false || isValidDelay(toastAutoClose)
      ? toastAutoClose
      : props.autoClose;
  };

  //pure
  function canBeRendered(content) {
    return (
      isValidElement(content) ||
      typeof content === "string" ||
      typeof content === "number" ||
      typeof content === "function"
    );
  }

  function belongToContainer({ containerId }) {
    return containerId === props.containerId;
  }

  function buildToast(content, { delay, ...options }) {
    if (!canBeRendered(content)) {
      throw new Error(
        `The element you provided cannot be rendered. You provided an element of type ${typeof content}`
      );
    }

    const { toastId, updateId } = options;
    console.log({ toast });

    // Check for multi-container and also for duplicate toastId
    // Maybe it would be better to extract it
    if (
      (props.enableMultiContainer && !belongToContainer(options)) ||
      (isToastActive(toastId) && updateId == null)
    ) {
      return;
    }

    const closeToast = () => removeToast(toastId);
    const toastOptions = {
      id: toastId,
      // ⚠️ if no options.key, toastKey - 1 is assigned
      key: options.key || toastKey.current++,
      type: options.type,
      closeToast: closeToast,
      updateId: options.updateId,
      rtl: props.rtl,
      position: options.position || props.position,
      transition: options.transition || props.transition,
      className: parseClassName(options.className || props.toastClassName),
      bodyClassName: parseClassName(
        options.bodyClassName || props.bodyClassName
      ),
      onClick: options.onClick || props.onClick,
      closeButton: makeCloseButton(options.closeButton, toastId, options.type),
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

    // add closeToast function to react component only
    if (
      isValidElement(content) &&
      typeof content.type !== "string" &&
      typeof content.type !== "number"
    ) {
      content = cloneElement(content, {
        closeToast
      });
    } else if (typeof content === "function") {
      content = content({ closeToast });
    }

    if (isValidDelay(delay)) {
      setTimeout(() => {
        appendToast(toastOptions, content, options.staleToastId);
      }, delay);
    } else {
      appendToast(toastOptions, content, options.staleToastId);
    }
  }

  function appendToast(options, content, staleToastId) {
    const { id, updateId } = options;

    collection.current = {
      ...collection.current,
      [id]: {
        options,
        content,
        position: options.position
      }
    };
    setToast(
      (updateId ? [...toast] : [...toast, id]).filter(id => id !== staleToastId)
    );
  }

  function renderToast() {
    const toastToRender = {};
    const { className, style, newestOnTop } = props;
    const currentCol = collection.current;
    const col2 = newestOnTop
      ? Object.keys(currentCol).reverse()
      : Object.keys(currentCol);

    // group toast by position
    col2.forEach(toastId => {
      const { position, options, content } = currentCol[toastId];

      toastToRender[position] || (toastToRender[position] = []);

      if (toast.indexOf(options.id) !== -1) {
        toastToRender[position].push(
          <Toast {...options} key={`toast-${options.key}`}>
            {content}
          </Toast>
        );
      } else {
        toastToRender[position].push(null);
        delete collection.current[toastId];
      }
    });

    return Object.keys(toastToRender).map(position => {
      const disablePointer =
        toastToRender[position].length === 1 &&
        toastToRender[position][0] === null;
      const propsp = {
        className: cx(
          `${RT_NAMESPACE}__toast-container`,
          `${RT_NAMESPACE}__toast-container--${position}`,
          { [`${RT_NAMESPACE}__toast-container--rtl`]: props.rtl },
          parseClassName(className)
        ),
        style: disablePointer
          ? { ...style, pointerEvents: "none" }
          : { ...style }
      };

      return (
        <TransitionGroup {...propsp} key={`container-${position}`}>
          {toastToRender[position]}
        </TransitionGroup>
      );
    });
  }

  function clear() {
    setToast([]);
  }

  function parseClassName(prop) {
    if (typeof prop === "string") {
      return prop;
    } else if (
      prop !== null &&
      typeof prop === "object" &&
      "toString" in prop
    ) {
      return prop.toString();
    }

    return null;
  }

  function makeCloseButton(toastClose, toastId, type) {
    let closeButton = props.closeButton;

    if (isValidElement(toastClose) || toastClose === false) {
      closeButton = toastClose;
    } else if (toastClose === true) {
      closeButton =
        props.closeButton && typeof props.closeButton !== "boolean" ? (
          props.closeButton
        ) : (
          <CloseButton />
        );
    }

    return closeButton === false
      ? false
      : cloneElement(closeButton, {
          closeToast: () => removeToast(toastId),
          type: type
        });
  }
  useEffect(() => {
    console.log("UPDATE BUIDL");

    ref.current = buildToast;
  }, [props, toast]);

  useEffect(() => {
    console.log("ICI", toast);

    dispatchChange();
  }, [toast]);

  useEffect(() => {
    console.log("effect");

    r.current.isToastActive = isToastActive;
    eventManager
      .cancelEmit(ACTION.WILL_UNMOUNT)
      .on(ACTION.SHOW, (content, options) =>
        containerRef.current ? ref.current(content, options) : null
      )
      .on(ACTION.CLEAR, id =>
        !containerRef.current ? null : id == null ? clear() : removeToast(id)
      )
      .emit(ACTION.DID_MOUNT, r.current);

    return () => eventManager.emit(ACTION.WILL_UNMOUNT, r.current);
  }, []);

  return (
    <div ref={containerRef} className={`${RT_NAMESPACE}`}>
      {renderToast()}
    </div>
  );
}

ToastContainer.propTypes = {
  /**
   * Set toast position
   */
  position: PropTypes.oneOf(objectValues(POSITION)),

  /**
   * Disable or set autoClose delay
   */
  autoClose: falseOrDelay,

  /**
   * Disable or set a custom react element for the close button
   */
  closeButton: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),

  /**
   * Hide or not progress bar when autoClose is enabled
   */
  hideProgressBar: PropTypes.bool,

  /**
   * Pause toast duration on hover
   */
  pauseOnHover: PropTypes.bool,

  /**
   * Dismiss toast on click
   */
  closeOnClick: PropTypes.bool,

  /**
   * Newest on top
   */
  newestOnTop: PropTypes.bool,

  /**
   * An optional className
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * An optional style
   */
  style: PropTypes.object,

  /**
   * An optional className for the toast
   */
  toastClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * An optional className for the toast body
   */
  bodyClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * An optional className for the toast progress bar
   */
  progressClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * An optional style for the toast progress bar
   */
  progressStyle: PropTypes.object,

  /**
   * Define enter and exit transition using react-transition-group
   */
  transition: PropTypes.func,

  /**
   * Support rtl display
   */
  rtl: PropTypes.bool,

  /**
   * Allow toast to be draggable
   */
  draggable: PropTypes.bool,

  /**
   * The percentage of the toast's width it takes for a drag to dismiss a toast
   */
  draggablePercent: PropTypes.number,

  /**
   * Pause the toast on focus loss
   */
  pauseOnFocusLoss: PropTypes.bool,

  /**
   * Show the toast only if it includes containerId and it's the same as containerId
   */
  enableMultiContainer: PropTypes.bool,

  /**
   * Set id to handle multiple container
   */
  containerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Set role attribute for the toast body
   */
  role: PropTypes.string,

  /**
   * Fired when clicking inside toaster
   */
  onClick: PropTypes.func
};

ToastContainer.defaultProps = {
  position: POSITION.TOP_RIGHT,
  transition: Bounce,
  rtl: false,
  autoClose: 5000,
  hideProgressBar: false,
  closeButton: <CloseButton />,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  newestOnTop: false,
  draggable: true,
  draggablePercent: 80,
  className: null,
  style: null,
  toastClassName: null,
  bodyClassName: null,
  progressClassName: null,
  progressStyle: null,
  role: "alert"
};
