import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';
import config from './config';
import objectValues from './util/objectValues';
import { falseOrElement, falseOrNumber } from './util/propValidator';

class Toast extends Component {
  static propTypes = {
    closeButton: falseOrElement.isRequired,
    autoClose: falseOrNumber.isRequired,
    children: PropTypes.node.isRequired,
    closeToast: PropTypes.func.isRequired,
    position: PropTypes.oneOf(objectValues(config.POSITION)).isRequired,
    hideProgressBar: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(objectValues(config.TYPE))
  };

  static defaultProps = {
    type: config.TYPE.DEFAULT,
    hideProgressBar: false,
    onOpen: null,
    onClose: null
  };

  constructor(props) {
    super(props);
    this.ref = null;
    this.state = {
      isRunning: true
    };
  }

  componentDidMount() {
    this.props.onOpen !== null && this.props.onOpen(this.getChildrenProps());
  }

  componentWillUnmount() {
    this.props.onClose !== null && this.props.onClose(this.getChildrenProps());
  }

  setRef = ref => {
    this.ref = ref;
  };

  getChildrenProps() {
    return this.props.children.props;
  }

  getToastProps() {
    const toastProps = {
      className: `toastify-content toastify-content--${this.props.type}`,
      ref: this.setRef
    };

    if (this.props.autoClose !== false) {
      toastProps.onMouseEnter = this.pauseToast;
      toastProps.onMouseLeave = this.playToast;
    }

    return toastProps;
  }

  componentWillEnter(callback) {
    this.ref.classList.add(`toast-enter--${this.props.position}`, 'animated');
    callback();
  }

  componentWillLeave(callback) {
    this.ref.classList.remove(`toast-enter--${this.props.position}`,
      'animated');
    this.ref.classList.add(`toast-exit--${this.props.position}`, 'animated');
    setTimeout(() => callback(), 750);
  }

  pauseToast = () => {
    this.setState({ isRunning: false });
  };

  playToast = () => {
    this.setState({ isRunning: true });
  };

  render() {
    const {
      closeButton,
      children,
      autoClose,
      type,
      hideProgressBar,
      closeToast
    } = this.props;

    return (
      <div
        {...this.getToastProps()}
      >
        {closeButton !== false && closeButton}
        <div className="toastify__body">
          {children}
        </div>
        {
          autoClose !== false &&
          <ProgressBar
            delay={autoClose}
            isRunning={this.state.isRunning}
            closeToast={closeToast}
            hide={hideProgressBar}
            type={type}
          />
        }
      </div>
    );
  }
}

export default Toast;
