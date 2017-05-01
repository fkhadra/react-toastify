import React, { Component, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/TransitionGroup';

import Toast from './Toast';
import DefaultCloseButton from './DefaultCloseButton';
import config from './config';
import EventManager from './util/EventManager';
import objectValues from './util/objectValues';

class ToastContainer extends Component {

  static propTypes = {
    /**
     * Set toast position
     */
    position: PropTypes.oneOf(objectValues(config.POSITION)),

    /**
     * Disable or set autoClose delay
     */
    autoClose: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),

    /**
     * Custom react element for the close button
     */
    closeButton: PropTypes.element,

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
    closeButton: null,
    hideProgressBar: false
  };

  constructor(props) {
    super(props);
    this.state = {
      toast: []
    };
    this.toastId = 0;
    this.collection = {};
    this.dumbFn = () => {};
  }

  componentDidMount() {
    EventManager.on(config.ACTION.SHOW,
      (content, options) => this.show(content, options)).
      on(config.ACTION.CLEAR, () => this.clear());
  }

  componentWillUnmount() {
    EventManager.off(config.ACTION.SHOW);
    EventManager.off(config.ACTION.CLEAR);
  }

  isFunction(object) {
    return !!(object && object.constructor && object.call && object.apply);
  }

  isValidAutoClose(val) {
    return val === false || (!isNaN(val) && typeof val === 'number');
  }

  shouldAutoClose(autoCloseOpt) {
    return ((this.props.autoClose !== false && autoCloseOpt !== false)
    || (this.props.autoClose === false && autoCloseOpt !== false &&
    autoCloseOpt !== null));
  }

  removeToast(id) {
    this.setState({
      toast: this.state.toast.filter(v => v !== parseInt(id, 10))
    });
  }

  withClose(component, props) {
    return cloneElement(component, { ...props, ...component.props });
  }

  validateCloseButton(closeButton) {
    if (!isValidElement(closeButton)) {
      throw new Error(`CloseButton must be a valid react element 
      instead of ${typeof closeButton}`);
    }
  }

  makeCloseButton(optCloseButton, toastId) {
    let closeButton = <DefaultCloseButton />;

    if (optCloseButton === null && this.props.closeButton !== null) {
      closeButton = this.props.closeButton;
    } else if (optCloseButton !== null) {
      this.validateCloseButton(optCloseButton);
      closeButton = optCloseButton;
    }

    return this.withClose(closeButton,
      { closeToast: () => this.removeToast(toastId) });
  }

  show(content, options) {
    content = typeof content === 'string' ? <div>{content}</div> : content;

    if (isValidElement(content)) {
      const toastId = ++this.toastId;
      content = this.withClose(content, {
        closeToast: () => this.removeToast(toastId)
      });
      const autoCloseOpt = options.autoClose;
      const toastOptions = {
        id: toastId,
        type: options.type,
        onOpen: this.isFunction(options.onOpen)
          ? options.onOpen
          : this.dumbFn,
        onClose: this.isFunction(options.onClose)
          ? options.onClose
          : this.dumbFn,
        closeButton: this.makeCloseButton(options.closeButton, toastId)
      };

      if (this.shouldAutoClose(autoCloseOpt)) {
        toastOptions.autoCloseDelay = autoCloseOpt !== null
          ? parseInt(autoCloseOpt, 10)
          : this.props.autoClose;

        toastOptions.hideProgressBar = typeof options.hideProgressBar ===
        'boolean'
          ? options.hideProgressBar
          : this.props.hideProgressBar;
        toastOptions.closeToast = () => this.removeToast(toastId);
      }

      this.collection = Object.assign({}, this.collection, {
        [toastId]: this.makeToast(content, toastOptions)
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
        position={this.props.position}
        key={`toast-${options.id} `}
      >
        {content}
      </Toast>
    );
  }

  clear() {
    this.collection = {};
    this.setState({ toast: [] });
  }

  isObjectEmpty() {
    return this.state.toast.length === 0;
  }

  renderProps() {
    const props = {
      className: `toastify toastify--${this.props.position}`
    };

    if (this.props.className) {
      props.className = `${props.className} ${this.props.className}`;
    }

    if (this.props.style) {
      props.style = this.props.style;
    }

    return props;
  }

  renderToast() {
    return Object.keys(this.collection).map(idx => {
      if (this.state.toast.includes(parseInt(idx, 10))) {
        return this.collection[idx];
      } else {
        delete this.collection[idx];
      }
    });
  }

  render() {
    return (
      <div {...this.renderProps()}>
        <Transition>
          {this.isObjectEmpty() ? null : this.renderToast()}
        </Transition>
      </div>
    );
  }
}

export default ToastContainer;
