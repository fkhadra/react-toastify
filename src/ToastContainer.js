import React, {
  Component,
  isValidElement,
  cloneElement
} from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/TransitionGroup';

import Toast from './Toast';
import DefaultCloseButton from './DefaultCloseButton';
import config from './config';
import EventManager from './util/EventManager';
import objectValues from './util/objectValues';
import {
  falseOrNumber,
  falseOrElement,
  isValidDelay,
  typeOf
} from './util/propValidator';

class ToastContainer extends Component {

  static propTypes = {
    /**
     * Set toast position
     */
    position: PropTypes.oneOf(objectValues(config.POSITION)),

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
     * An optional className
     */
    className: PropTypes.string,

    /**
     * An optional style
     */
    style: PropTypes.object
  };

  static defaultProps = {
    position: config.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: <DefaultCloseButton />,
    className: null,
    style: null
  };

  constructor(props) {
    super(props);
    this.state = {
      toast: []
    };
    this.collection = {};
  }

  componentDidMount() {
    EventManager
      .on(config.ACTION.SHOW,
        (content, options) => this.show(content, options))
      .on(config.ACTION.CLEAR,
        id => (id !== null ? this.removeToast(id) : this.clear()))
      .emit(config.ACTION.MOUNTED);
  }

  componentWillUnmount() {
    EventManager.off(config.ACTION.SHOW);
    EventManager.off(config.ACTION.CLEAR);
  }

  removeToast(id) {
    this.setState({
      toast: this.state.toast.filter(v => v !== parseInt(id, 10))
    });
  }

  with(component, props) {
    return cloneElement(component, { ...props, ...component.props });
  }

  makeCloseButton(toastClose, toastId) {
    let closeButton = this.props.closeButton;

    if (isValidElement(toastClose) || toastClose === false) {
      closeButton = toastClose;
    }

    return closeButton === false
      ? false
      : this.with(closeButton, {
        closeToast: () => this.removeToast(toastId)
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

  /**
   * TODO: check if throwing an error can be helpful
   */
  canBeRendered(content) {
    return isValidElement(content)
      || typeOf(content) === 'String'
      || typeOf(content) === 'Number';
  }

  show(content, options) {
    if (this.canBeRendered(content)) {
      const toastId = options.toastId;
      const closeToast = () => this.removeToast(toastId);
      const toastOptions = {
        id: toastId,
        type: options.type,
        closeButton: this.makeCloseButton(options.closeButton, toastId),
        position: options.position || this.props.position
      };

      this.isFunction(options.onOpen) &&
      (toastOptions.onOpen = options.onOpen);

      this.isFunction(options.onClose) &&
      (toastOptions.onClose = options.onClose);

      toastOptions.autoClose = this.getAutoCloseDelay(
        options.autoClose !== false
          ? parseInt(options.autoClose, 10)
          : options.autoClose
      );

      toastOptions.hideProgressBar = typeof options.hideProgressBar ===
      'boolean'
        ? options.hideProgressBar
        : this.props.hideProgressBar;

      toastOptions.closeToast = closeToast;

      if (isValidElement(content) && typeOf(content.type) !== 'String') {
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
  }

  makeToast(content, options) {
    return (
      <Toast
        {...options}
        key={`toast-${options.id} `}
      >
        {content}
      </Toast>
    );
  }

  clear() {
    this.setState({ toast: [] });
  }

  hasToast() {
    return this.state.toast.length > 0;
  }

  getContainerProps(pos, disablePointer) {
    const props = {
      className: `toastify toastify--${pos}`,
      style: disablePointer ? { pointerEvents: 'none' } : {}
    };

    if (this.props.className !== null) {
      props.className = `${props.className} ${this.props.className}`;
    }

    if (this.props.style !== null) {
      props.style = Object.assign({},
        this.props.style,
        props.style
      );
    }

    return props;
  }

  renderToast() {
    const toastToRender = {};
    const collection = Object.keys(this.collection);

    collection.forEach(toastId => {
      const item = this.collection[toastId];
      toastToRender[item.position] || (toastToRender[item.position] = []);

      if (this.state.toast.includes(parseInt(toastId, 10))) {
        toastToRender[item.position].push(item.content);
      } else {
        // Temporal zone for animation
        toastToRender[item.position].push(null);
        // Delay garbage collecting. Useful when a lots of toast
        setTimeout(
          () => delete this.collection[toastId]
          , collection.length * 10);
      }
    });

    return Object.keys(toastToRender).map(position => {
      const disablePointer = toastToRender[position].length === 1
        && toastToRender[position][0] === null;

      return (
        <Transition
          component="div"
          {...this.getContainerProps(position, disablePointer)}
          key={`container-${position}`}
        >
          {toastToRender[position].map(item => item)}
        </Transition>
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
