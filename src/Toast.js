import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';
import config from './config';
import objectValues from './util/objectValues';

class Toast extends Component {
  static propTypes = {
    closeButton: PropTypes.element.isRequired,
    children: PropTypes.node.isRequired,
    autoCloseDelay: PropTypes.number,
    hideProgressBar: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(objectValues(config.TYPE)),
    position: PropTypes.oneOf(objectValues(config.POSITION))
  };

  static defaultProps = {
    type: config.TYPE.DEFAULT,
    autoCloseDelay: null,
    hideProgressBar: false
  };

  constructor(props) {
    super(props);
    this.ref = null;
    this.state = {
      isRunning: true
    };
  }

  componentDidMount() {
    this.props.onOpen(this.getChildrenProps());
  }

  componentWillUnmount() {
    this.props.onClose(this.getChildrenProps());
  }

  setRef = (ref) => {
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

    if (this.props.autoCloseDelay !== null) {
      toastProps.onMouseEnter = this.pauseToast;
      toastProps.onMouseLeave = this.playToast;
    }

    return toastProps;
  }

  componentWillEnter(callback) {
    this.ref.classList.add(`bounceIn--${this.props.position}`, 'animated');
    callback();
  }

  componentWillLeave(callback) {
    this.ref.classList.remove(`bounceIn--${this.props.position}`, 'animated');
    this.ref.classList.add(`bounceOut--${this.props.position}`, 'animated');
    setTimeout(() => callback(), 1000);
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
      autoCloseDelay,
      type,
      hideProgressBar,
      closeToast
    } = this.props;

    return (
      <div
        {...this.getToastProps()}
      >
        {closeButton}
        <div className="toastify__body">
          {children}
        </div>
        {
          autoCloseDelay !== null &&
          <ProgressBar
            delay={autoCloseDelay}
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
