import React, { Component, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TransitionGroup } from 'react-transition-group';

import Toast from './Toast';
import CloseButton from './CloseButton';
import { Bounce } from './Transitions';
import {
  POSITION,
  ACTION,
  RT_NAMESPACE,
  eventManager,
  falseOrDelay,
  isValidDelay,
  objectValues
} from './../utils';

class ToastContainer extends Component {
  static propTypes = {
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
    progressClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

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

  static defaultProps = {
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
    role: 'alert'
  };

  /**
   * Hold toast ids
   */
  state = {
    toast: []
  };

  /**
   * Keep reference for toastKey
   */
  toastKey = 1;

  /**
   * Hold toast's informations:
   * - what to render
   * - position
   * - raw content
   * - options
   */
  collection = {};

  componentDidMount() {
    eventManager
      .on(ACTION.SHOW, (content, options) => this.buildToast(content, options))
      .on(ACTION.CLEAR, id =>
        id == null ? this.clear() : this.removeToast(id)
      )
      .emit(ACTION.DID_MOUNT, this);
  }

  componentWillUnmount() {
    eventManager.emit(ACTION.WILL_UNMOUNT, this);
  }

  isToastActive = id => this.state.toast.indexOf(id) !== -1;

  removeToast(id) {
    this.setState(
      {
        toast: this.state.toast.filter(v => v !== id)
      },
      this.dispatchChange
    );
  }

  dispatchChange() {
    eventManager.emit(ACTION.ON_CHANGE, this.state.toast.length);
  }

  makeCloseButton(toastClose, toastId, type) {
    let closeButton = this.props.closeButton;

    if (isValidElement(toastClose) || toastClose === false) {
      closeButton = toastClose;
    } else if (toastClose === true) {
      closeButton =
        this.props.closeButton &&
        typeof this.props.closeButton !== 'boolean' ? (
          this.props.closeButton
        ) : (
          <CloseButton />
        );
    }

    return closeButton === false
      ? false
      : cloneElement(closeButton, {
          closeToast: () => this.removeToast(toastId),
          type: type
        });
  }

  getAutoCloseDelay(toastAutoClose) {
    return toastAutoClose === false || isValidDelay(toastAutoClose)
      ? toastAutoClose
      : this.props.autoClose;
  }

  canBeRendered(content) {
    return (
      isValidElement(content) ||
      typeof content === 'string' ||
      typeof content === 'number' ||
      typeof content === 'function'
    );
  }

  parseClassName(prop) {
    if (typeof prop === 'string') {
      return prop;
    } else if (
      prop !== null &&
      typeof prop === 'object' &&
      'toString' in prop
    ) {
      return prop.toString();
    }

    return null;
  }

  belongToContainer({ containerId }) {
    return containerId === this.props.containerId;
  }

  buildToast(content, { delay, ...options }) {
    if (!this.canBeRendered(content)) {
      throw new Error(
        `The element you provided cannot be rendered. You provided an element of type ${typeof content}`
      );
    }

    const { toastId, updateId } = options;

    // Check for multi-container and also for duplicate toastId
    // Maybe it would be better to extract it
    if (
      (this.props.enableMultiContainer && !this.belongToContainer(options)) ||
      (this.isToastActive(toastId) && updateId == null)
    ) {
      return;
    }

    const closeToast = () => this.removeToast(toastId);
    const toastOptions = {
      id: toastId,
      // ⚠️ if no options.key, this.toastKey - 1 is assigned
      key: options.key || this.toastKey++,
      type: options.type,
      closeToast: closeToast,
      updateId: options.updateId,
      rtl: this.props.rtl,
      position: options.position || this.props.position,
      transition: options.transition || this.props.transition,
      className: this.parseClassName(
        options.className || this.props.toastClassName
      ),
      bodyClassName: this.parseClassName(
        options.bodyClassName || this.props.bodyClassName
      ),
      onClick: options.onClick || this.props.onClick,
      closeButton: this.makeCloseButton(
        options.closeButton,
        toastId,
        options.type
      ),
      pauseOnHover:
        typeof options.pauseOnHover === 'boolean'
          ? options.pauseOnHover
          : this.props.pauseOnHover,
      pauseOnFocusLoss:
        typeof options.pauseOnFocusLoss === 'boolean'
          ? options.pauseOnFocusLoss
          : this.props.pauseOnFocusLoss,
      draggable:
        typeof options.draggable === 'boolean'
          ? options.draggable
          : this.props.draggable,
      draggablePercent:
        typeof options.draggablePercent === 'number' &&
        !isNaN(options.draggablePercent)
          ? options.draggablePercent
          : this.props.draggablePercent,
      closeOnClick:
        typeof options.closeOnClick === 'boolean'
          ? options.closeOnClick
          : this.props.closeOnClick,
      progressClassName: this.parseClassName(
        options.progressClassName || this.props.progressClassName
      ),
      progressStyle: this.props.progressStyle,
      autoClose: this.getAutoCloseDelay(options.autoClose),
      hideProgressBar:
        typeof options.hideProgressBar === 'boolean'
          ? options.hideProgressBar
          : this.props.hideProgressBar,
      progress: parseFloat(options.progress),
      role: typeof options.role === 'string' ? options.role : this.props.role
    };

    typeof options.onOpen === 'function' &&
      (toastOptions.onOpen = options.onOpen);

    typeof options.onClose === 'function' &&
      (toastOptions.onClose = options.onClose);

    // add closeToast function to react component only
    if (
      isValidElement(content) &&
      typeof content.type !== 'string' &&
      typeof content.type !== 'number'
    ) {
      content = cloneElement(content, {
        closeToast
      });
    } else if (typeof content === 'function') {
      content = content({ closeToast });
    }

    if (isValidDelay(delay)) {
      setTimeout(() => {
        this.appendToast(toastOptions, content, options.staleToastId);
      }, delay);
    } else {
      this.appendToast(toastOptions, content, options.staleToastId);
    }
  }

  appendToast(options, content, staleToastId) {
    const { id, updateId } = options;

    this.collection = {
      ...this.collection,
      [id]: {
        options,
        content,
        position: options.position
      }
    };

    this.setState(
      {
        toast: (updateId
          ? [...this.state.toast]
          : [...this.state.toast, id]
        ).filter(id => id !== staleToastId)
      },
      this.dispatchChange
    );
  }

  clear() {
    this.setState({ toast: [] });
  }

  renderToast() {
    const toastToRender = {};
    const { className, style, newestOnTop } = this.props;
    const collection = newestOnTop
      ? Object.keys(this.collection).reverse()
      : Object.keys(this.collection);

    // group toast by position
    collection.forEach(toastId => {
      const { position, options, content } = this.collection[toastId];
      toastToRender[position] || (toastToRender[position] = []);

      if (this.state.toast.indexOf(options.id) !== -1) {
        toastToRender[position].push(
          <Toast
            {...options}
            isDocumentHidden={this.state.isDocumentHidden}
            key={`toast-${options.key}`}
          >
            {content}
          </Toast>
        );
      } else {
        toastToRender[position].push(null);
        delete this.collection[toastId];
      }
    });

    return Object.keys(toastToRender).map(position => {
      const disablePointer =
        toastToRender[position].length === 1 &&
        toastToRender[position][0] === null;
      const props = {
        className: cx(
          `${RT_NAMESPACE}__toast-container`,
          `${RT_NAMESPACE}__toast-container--${position}`,
          { [`${RT_NAMESPACE}__toast-container--rtl`]: this.props.rtl },
          this.parseClassName(className)
        ),
        style: disablePointer
          ? { ...style, pointerEvents: 'none' }
          : { ...style }
      };

      return (
        <TransitionGroup {...props} key={`container-${position}`}>
          {toastToRender[position]}
        </TransitionGroup>
      );
    });
  }

  render() {
    return <div className={`${RT_NAMESPACE}`}>{this.renderToast()}</div>;
  }
}

export default ToastContainer;
