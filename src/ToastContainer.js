import React, { Component, PropTypes, isValidElement, cloneElement } from 'react';
import Transition from 'react-addons-transition-group';
import EventManager from './util/EventManager';
import Toast from './Toast';
import config from './config';

const propTypes = {
  position: PropTypes.oneOf(Object.values(config.POSITION)),
  autoClose: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  className: PropTypes.string,
  style: PropTypes.object
};

const defaultProps = {
  position: config.POSITION.TOP_RIGHT,
  autoClose: 5000,
};

class ToastContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: {}
    };
    this.toastId = 0;
    this.handleCloseBtn = this.handleCloseBtn.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    EventManager
      .on(config.ACTION.SHOW, (content, options) => this.show(content, options))
      .on(config.ACTION.CLEAR, () => this.clear());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.isEqualToPreviousState(nextState);
  }

  componentWillUnmount() {
    EventManager.off(config.ACTION.SHOW);
    EventManager.off(config.ACTION.CLEAR);
  }

  setAutoClose(toastId, delay) {
    return setTimeout(() => this.removeToast(toastId), delay);
  }

  isEqualToPreviousState(nextState) {
    const nextToastIds = Object.keys(nextState.toast);
    const previousToastIds = Object.keys(this.state.toast);

    if (nextToastIds.length !== previousToastIds.length) {
      return false;
    }

    for (let i = 0; i < previousToastIds.length; i++) {
      if (previousToastIds[i] !== nextToastIds[i]) {
        return false;
      }
    }

    return true;
  }

  isContentValid(content) {
    return isValidElement(content);
  }

  childrenHasProps(props) {
    return typeof props === 'object' && props.constructor.name === 'Object';
  }

  shouldAutoClose(autoCloseOpt) {
    return !!((this.props.autoClose !== false && autoCloseOpt !== false)
    || (this.props.autoClose === false && autoCloseOpt !== false && autoCloseOpt !== null));
  }

  removeToast(id) {
    const nextState = Object.assign({}, this.state.toast);
    delete nextState[id];
    this.setState({ toast: nextState });
  }

  show(content, options) {
    content = typeof content === 'string' ? <div>{content}</div> : content;

    if (this.isContentValid(content)) {
      const toastId = ++this.toastId;
      const autoCloseOpt = options.autoClose;
      const toastOptions = { id: toastId, type: options.type };

      if (this.childrenHasProps(options.props)) {
        toastOptions.childrenProps = options.props;
      }

      if (this.shouldAutoClose(autoCloseOpt)) {
        const delay = autoCloseOpt !== null ? parseInt(autoCloseOpt, 10) : this.props.autoClose;

        toastOptions.autoCloseId = this.setAutoClose(toastId, delay);
        toastOptions.autoCloseDelay = delay;
        toastOptions.handleMouseEnter = this.handleMouseEnter;
        toastOptions.handleMouseLeave = this.handleMouseLeave;
      }

      this.setState({
        toast: Object.assign({}, this.state.toast, {
          [toastId]: this.makeToast(content, toastOptions)
        })
      });
    }
  }

  makeToast(content, options) {
    return (
      <Toast
        {...options}
        position={this.props.position}
        key={`toast-${options.id} `}
        handleCloseBtn={this.handleCloseBtn}
      >
        {content}
      </Toast>
    );
  }

  clear() {
    this.setState({ toast: {} });
  }

  handleCloseBtn(e) {
    this.removeToast(e.target.value);
  }

  handleMouseEnter(e) {
    clearTimeout(e.currentTarget.dataset.autoCloseId);
  }

  handleMouseLeave(e) {
    const { toastId, autoCloseDelay } = e.currentTarget.dataset;
    const toast = cloneElement(this.state.toast[toastId], { autoCloseId: this.setAutoClose(toastId, autoCloseDelay) });
    const nextState = Object.assign({}, this.state.toast);

    delete nextState[toastId];
    nextState[toastId] = toast;
    this.setState({
      toast: nextState
    });
  }

  isObjectEmpty() {
    return Object.keys(this.state.toast).length === 0;
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
    return Object.values(this.state.toast);
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
