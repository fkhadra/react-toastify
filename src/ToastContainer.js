import React, { Component, isValidElement, cloneElement } from "react";
import PropTypes from "prop-types";
import { css } from "glamor";
import TransitionGroup from "react-transition-group/TransitionGroup";

import Toast from "./Toast";
import DefaultCloseButton from "./DefaultCloseButton";
import DefaultTransition from "./DefaultTransition";
import { POSITION, ACTION } from "./constant";
import style from "./style";
import EventManager from "./util/EventManager";
import objectValues from "./util/objectValues";
import {
  falseOrNumber,
  falseOrElement,
  isValidDelay,
  typeOf
} from "./util/propValidator";

const container = () => css({
  zIndex: 999,
  position: "fixed",
  padding: "4px",
  width: style.width,
  boxSizing: "border-box",
  color: "#fff",
  [`@media ${style.mobile}`]: {
    width: "100vw",
    padding: 0
  }
});

const toastPosition = pos => {
  let rule;
  const marginLeft = `-${parseInt(style.width,10)/2}px`;
  switch (pos) {
    case POSITION.TOP_LEFT:
      rule = {
        top: "1em",
        left: "1em"
      };
      break;
    case POSITION.TOP_CENTER:
      rule = {
        top: "1em",
        left: "50%",
        marginLeft: marginLeft
      }; 
      break;
    case POSITION.TOP_RIGHT:
    default:
      rule = {
        top: "1em",
        right: "1em"
      };  
      break;
    case POSITION.BOTTOM_LEFT: 
      rule = {
        bottom: "1em",
        left: "1em"
      };
      break;
    case POSITION.BOTTOM_CENTER:
      rule = {
        bottom: "1em",
        left: "50%",
        marginLeft: marginLeft
      };
      break;
    case POSITION.BOTTOM_RIGHT:
      rule = {
        bottom: "1em",
        right: "1em"
      }; 
  }
  return css(rule, css({
    [`@media ${style.mobile}`]: {
      left: 0,
      margin: 0,
      position: "fixed",
      ...pos.substring(0,3) === "top" ? { top: 0 } : { bottom: 0 }
    }
  }));
};

class ToastContainer extends Component {
  static propTypes = {
    /**
     * Set toast position
     */
    position: PropTypes.oneOf(objectValues(POSITION)),

    /**
     * Disable or set autoClose delay
     */
    autoClose: falseOrNumber,

    /**
     * Disable or set a custom react element for the close button
     */
    closeButton: falseOrElement,

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
     * Define enter and exit transition using react-transition-group
     */
    transition: PropTypes.func
  };

  static defaultProps = {
    position: POSITION.TOP_RIGHT,
    transition: DefaultTransition,
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: <DefaultCloseButton />,
    pauseOnHover: true,
    closeOnClick: true,
    newestOnTop: false,
    className: null,
    style: null,
    toastClassName: '',
    bodyClassName: '',
    progressClassName: '',
  };

  state = {
    toast: []
  };

  collection = {};

  componentDidMount() {
    const { SHOW, CLEAR, MOUNTED } = ACTION;
    EventManager
    .on(SHOW, (content, options) => this.show(content, options))
    .on(CLEAR, id => (id !== null ? this.removeToast(id) : this.clear()))
    .emit(MOUNTED, this);
  }

  componentWillUnmount() {
    EventManager.off(ACTION.SHOW);
    EventManager.off(ACTION.CLEAR);
  }

  isToastActive = id => this.state.toast.indexOf(parseInt(id, 10)) !== -1;

  removeToast(id) {
    this.setState({
      toast: this.state.toast.filter(v => v !== parseInt(id, 10))
    });
  }

  with(component, props) {
    return cloneElement(component, { ...props, ...component.props });
  }

  makeCloseButton(toastClose, toastId, type) {
    let closeButton = this.props.closeButton;

    if (isValidElement(toastClose) || toastClose === false) {
      closeButton = toastClose;
    }

    return closeButton === false
      ? false
      : this.with(closeButton, {
        closeToast: () => this.removeToast(toastId),
        type: type
      });
  }

  getAutoCloseDelay(toastAutoClose) {
    return toastAutoClose === false || isValidDelay(toastAutoClose)
      ? toastAutoClose
      : this.props.autoClose;
  }

  isFunction(object) {
    return !!(object && object.constructor && object.call && object.apply);
  }

  canBeRendered(content) {
    return (
      isValidElement(content) ||
      typeOf(content) === "String" ||
      typeOf(content) === "Number"
    );
  }

  show(content, options) {
    if (!(this.canBeRendered(content))) {
      throw new Error(`The element you provided cannot be rendered. You provided an element of type ${typeof content}`);
    }
    const toastId = options.toastId;
    const closeToast = () => this.removeToast(toastId);
    const toastOptions = {
      id: toastId,
      type: options.type,
      closeButton: this.makeCloseButton(options.closeButton, toastId, options.type),
      position: options.position || this.props.position,
      transition: options.transition || this.props.transition,
      pauseOnHover:
          options.pauseOnHover !== null
            ? options.pauseOnHover
            : this.props.pauseOnHover,
      closeOnClick: options.closeOnClick !== null ? options.closeOnClick : this.props.closeOnClick,
      className: options.className || this.props.toastClassName,
      bodyClassName: options.bodyClassName || this.props.bodyClassName,
      progressClassName: options.progressClassName || this.props.progressClassName,
    };

    this.isFunction(options.onOpen) && (toastOptions.onOpen = options.onOpen);

    this.isFunction(options.onClose) &&
        (toastOptions.onClose = options.onClose);

    toastOptions.autoClose = this.getAutoCloseDelay(
        options.autoClose !== false
          ? parseInt(options.autoClose, 10)
          : options.autoClose
      );

    toastOptions.hideProgressBar =
        typeof options.hideProgressBar === "boolean"
          ? options.hideProgressBar
          : this.props.hideProgressBar;

    toastOptions.closeToast = closeToast;

    if (isValidElement(content) && typeOf(content.type) !== "String") {
      content = this.with(content, {
        closeToast
      });
    }

    this.collection = Object.assign({}, this.collection, {
      [toastId]: {
        content: this.makeToast(content, toastOptions),
        position: toastOptions.position
      }
    });

    this.setState({
      toast: [...this.state.toast, toastId]
    });
  }

  makeToast(content, options) {
    return (
      <Toast {...options} key={`toast-${options.id}`}>
        {content}
      </Toast>
    );
  }

  clear() {
    this.setState({ toast: [] });
  }

  getContainerProps(disablePointer) {
    const props = {
      style: disablePointer ? { pointerEvents: "none" } : {}
    };

    if (this.props.className !== null) {
      props.className = this.props.className;
    }

    if (this.props.style !== null) {
      props.style = {...this.props.style, ...props.style};
    }

    return props;
  }

  renderToast() {
    const toastToRender = {};
    const collection = this.props.newestOnTop
    ? Object.keys(this.collection).reverse()
    : Object.keys(this.collection);

    collection.forEach(toastId => {
      const item = this.collection[toastId];
      toastToRender[item.position] || (toastToRender[item.position] = []);

      if (this.state.toast.indexOf(parseInt(toastId, 10)) !== -1) {
        toastToRender[item.position].push(item.content);
      } else {
        toastToRender[item.position].push(null);
        delete this.collection[toastId]
      }
    });
 
    return Object.keys(toastToRender).map(position => {
      const disablePointer =
        toastToRender[position].length === 1 &&
        toastToRender[position][0] === null;

      return (
        <TransitionGroup
          {...container()}
          {...toastPosition(position)}
          {...this.getContainerProps(disablePointer)}
          key={`container-${position}`}
        >
          {toastToRender[position]}
        </TransitionGroup>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderToast()}
      </div>
    );
  }
}

export default ToastContainer;
