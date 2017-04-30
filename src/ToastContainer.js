import React, { Component, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-addons-transition-group';
import EventManager from './util/EventManager';
import Toast from './Toast';
import DefaultCloseButton from './DefaultCloseButton';
import config from './config';

const propTypes = {
  position: PropTypes.oneOf(Object.values(config.POSITION)),
  autoClose: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  closeButton: PropTypes.element,
  className: PropTypes.string,
  style: PropTypes.object
};

const defaultProps = {
  position: config.POSITION.TOP_RIGHT,
  autoClose: 5000,
  closeButton: null
};

class ToastContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: []
    };
    this.toastId = 0;
    this.collection = {};
    this.dumbFn = () => {};
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    EventManager
      .on(config.ACTION.SHOW, (content, options) => this.show(content, options))
      .on(config.ACTION.CLEAR, () => this.clear());
  }

  componentWillUnmount() {
    EventManager.off(config.ACTION.SHOW);
    EventManager.off(config.ACTION.CLEAR);
  }

  setAutoClose(toastId, delay) {
    return setTimeout(() => this.removeToast(toastId), delay);
  }

  isFunction(object) {
    return !!(object && object.constructor && object.call && object.apply);
  }

  shouldAutoClose(autoCloseOpt) {
    return !!((this.props.autoClose !== false && autoCloseOpt !== false)
    || (this.props.autoClose === false && autoCloseOpt !== false && autoCloseOpt !== null));
  }

  removeToast(id) {
    this.setState({ toast: this.state.toast.filter(v => v !== parseInt(id, 10)) });
  }

  withClose(component, props) {
    return cloneElement(component, { ...props, ...component.props });
  }

  validateCloseButton(closeButton) {
    if (!isValidElement(closeButton)) {
      throw new Error(`CloseButton must be a valid react element instead of ${typeof closeButton}`);
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

    return this.withClose(closeButton, { closeToast: () => this.removeToast(toastId) });
  }

  show(content, options) {
    content = typeof content === 'string' ? <div>{content}</div> : content;

    if (isValidElement(content)) {
      const toastId = ++this.toastId;
      const autoCloseOpt = options.autoClose;
      const toastOptions = {
        id: toastId,
        type: options.type,
        onOpen: this.isFunction(options.onOpen) ? options.onOpen : this.dumbFn,
        onClose: this.isFunction(options.onClose) ? options.onClose : this.dumbFn,
        closeButton: this.makeCloseButton(options.closeButton, toastId)
      };

      if (this.shouldAutoClose(autoCloseOpt)) {
        const delay = autoCloseOpt !== null ? parseInt(autoCloseOpt, 10) : this.props.autoClose;

        toastOptions.autoCloseId = this.setAutoClose(toastId, delay);
        toastOptions.autoCloseDelay = delay;
        toastOptions.handleMouseEnter = this.handleMouseEnter;
        toastOptions.handleMouseLeave = this.handleMouseLeave;
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

  handleMouseEnter(e) {
    clearTimeout(e.currentTarget.dataset.autoCloseId);
  }

  handleMouseLeave(e) {
    const { toastId, autoCloseDelay } = e.currentTarget.dataset;
    if (this.state.toast.length > 0 && typeof this.collection[toastId] !== 'undefined') {
      this.collection[toastId] = cloneElement(this.collection[toastId], {
        autoCloseId: this.setAutoClose(toastId, autoCloseDelay)
      });

      this.forceUpdate();
    }
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

ToastContainer.defaultProps = defaultProps;
ToastContainer.propTypes = propTypes;

export default ToastContainer;
