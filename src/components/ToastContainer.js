import React, { Component, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Toast from './Toast';
import CloseButton from './CloseButton';
import { Bounce } from './Transitions';
import { POSITION, ACTION } from './../utils/constant';
import EventManager from './../utils/EventManager';
import {
  falseOrDelay,
  falseOrElement,
  isValidDelay,
  objectValues
} from './../utils/propValidator';

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
    progressClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

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
     * ⚠️ NOT WORKING ATM, has been disabled until I fix it ⚠️
     * pause on document visibility change
     */
    pauseOnVisibilityChange: PropTypes.bool
  };

  static defaultProps = {
    position: POSITION.TOP_RIGHT,
    transition: Bounce,
    rtl: false,
    pauseOnVisibilityChange: true,
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: <CloseButton />,
    pauseOnHover: true,
    closeOnClick: true,
    newestOnTop: false,
    draggable: true,
    draggablePercent: 80,
    className: null,
    style: null,
    toastClassName: null,
    bodyClassName: null,
    progressClassName: null
  };

  /**
   * Hold toast ids
   */
  state = {
    toast: [],
    isDocumentHidden: false
  };

  /**
   * Hold toast's informations:
   * - what to render
   * - position
   * - raw content
   * - options
   */
  collection = {};

  componentDidMount() {
    const { SHOW, CLEAR, MOUNTED } = ACTION;
    EventManager.on(SHOW, (content, options) => this.show(content, options))
      .on(CLEAR, id => (id !== null ? this.removeToast(id) : this.clear()))
      .emit(MOUNTED, this);

    //this.props.pauseOnVisibilityChange &&
    //  document.addEventListener('visibilitychange', this.isDocumentHidden);
  }

  componentWillUnmount() {
    EventManager.off(ACTION.SHOW);
    EventManager.off(ACTION.CLEAR);

    // this.props.pauseOnVisibilityChange &&
    //   document.removeEventListener('visibilitychange', this.isDocumentHidden);
  }

  //isDocumentHidden = () => this.setState({ isDocumentHidden: document.hidden });

  isToastActive = id => this.state.toast.indexOf(parseInt(id, 10)) !== -1;

  removeToast(id) {
    this.setState(
      {
        toast: this.state.toast.filter(v => v !== parseInt(id, 10))
      },
      this.dispatchChange
    );
  }

  dispatchChange() {
    EventManager.emit(ACTION.ON_CHANGE, this.state.toast.length);
  }

  makeCloseButton(toastClose, toastId, type) {
    let closeButton = this.props.closeButton;

    if (isValidElement(toastClose) || toastClose === false) {
      closeButton = toastClose;
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

  parseClassName(prop){
    if (typeof prop === 'string') {
      return prop;
    } else if(prop !== null && typeof prop === 'object' && 'toString' in prop) {
      return prop.toString()
    }

    return null;
  }

  show(content, options) {
    if (!this.canBeRendered(content)) {
      throw new Error(
        `The element you provided cannot be rendered. You provided an element of type ${typeof content}`
      );
    }
    const toastId = options.toastId;
    const closeToast = () => this.removeToast(toastId);
    const toastOptions = {
      id: toastId,
      type: options.type,
      closeToast: closeToast,
      updateId: options.updateId,
      rtl: this.props.rtl,
      position: options.position || this.props.position,
      transition: options.transition || this.props.transition,
      className: this.parseClassName(options.className || this.props.toastClassName),
      bodyClassName: this.parseClassName(options.bodyClassName || this.props.bodyClassName),
      closeButton: this.makeCloseButton(
        options.closeButton,
        toastId,
        options.type
      ),
      pauseOnHover:
        options.pauseOnHover !== null
          ? options.pauseOnHover
          : this.props.pauseOnHover,
      draggable:
        options.draggable !== null ? options.draggable : this.props.draggable,
      draggablePercent:
        options.draggable !== null
          ? options.draggablePercent
          : this.props.draggablePercent,
      closeOnClick:
        options.closeOnClick !== null
          ? options.closeOnClick
          : this.props.closeOnClick,
      progressClassName:
        this.parseClassName(options.progressClassName || this.props.progressClassName),
      autoClose: this.getAutoCloseDelay(
        options.autoClose !== false
          ? parseInt(options.autoClose, 10)
          : options.autoClose
      ),
      hideProgressBar:
        typeof options.hideProgressBar === 'boolean'
          ? options.hideProgressBar
          : this.props.hideProgressBar
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

    this.collection = {
      ...this.collection,
      [toastId]: {
        position: toastOptions.position,
        options: toastOptions,
        content: content
      }
    };

    this.setState(
      {
        toast:
          toastOptions.updateId !== null
            ? [...this.state.toast]
            : [...this.state.toast, toastId]
      },
      this.dispatchChange
    );
  }

  makeToast(content, options) {
    return (
      <Toast
        {...options}
        isDocumentHidden={this.state.isDocumentHidden}
        key={`toast-${options.id}`}
      >
        {content}
      </Toast>
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
      const toast = this.collection[toastId];
      toastToRender[toast.position] || (toastToRender[toast.position] = []);

      if (this.state.toast.indexOf(parseInt(toastId, 10)) !== -1) {
        toastToRender[toast.position].push(
          this.makeToast(toast.content, toast.options)
        );
      } else {
        toastToRender[toast.position].push(null);
        delete this.collection[toastId];
      }
    });

    return Object.keys(toastToRender).map(position => {
      const disablePointer =
        toastToRender[position].length === 1 &&
        toastToRender[position][0] === null;
      const props = {
        className: cx(
          'Toastify__toast-container',
          `Toastify__toast-container--${position}`,
          { 'Toastify__toast-container--rtl': this.props.rtl },
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
    return <div className="Toastify">{this.renderToast()}</div>;
  }
}

export default ToastContainer;
