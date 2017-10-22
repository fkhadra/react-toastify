import React, { Component } from "react";
import PropTypes from "prop-types";

import ProgressBar from "./ProgressBar";
import { POSITION, TYPE } from "./constant";
import objectValues from "./util/objectValues";
import { falseOrElement, falseOrNumber } from "./util/propValidator";

class Toast extends Component {
  static propTypes = {
    closeButton: falseOrElement.isRequired,
    autoClose: falseOrNumber.isRequired,
    children: PropTypes.node.isRequired,
    closeToast: PropTypes.func.isRequired,
    position: PropTypes.oneOf(objectValues(POSITION)).isRequired,
    pauseOnHover: PropTypes.bool.isRequired,
    closeOnClick: PropTypes.bool.isRequired,
    transition: PropTypes.func.isRequired,
    in: PropTypes.bool,
    onExited: PropTypes.func,
    hideProgressBar: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(objectValues(TYPE)),
    className: PropTypes.string,
    bodyClassName: PropTypes.string,
    progressClassName: PropTypes.string
  };

  static defaultProps = {
    type: TYPE.DEFAULT,
    in: true,
    hideProgressBar: false,
    onOpen: null,
    onClose: null,
    className: "",
    bodyClassName: "",
    progressClassName: ""
  };

  state = {
    isRunning: true
  };
  
  componentDidMount() {
    this.props.onOpen !== null && this.props.onOpen(this.getChildrenProps());
    document.addEventListener("visibilitychange", this.handleVisibility);
  }

  componentWillUnmount() {
    this.props.onClose !== null && this.props.onClose(this.getChildrenProps());
    document.removeEventListener("visibilitychange", this.handleVisibility);
  }

  handleVisibility = () => this.setState({ isRunning: !document.hidden });

  getChildrenProps() {
    return this.props.children.props;
  }

  getToastProps() {
    const toastProps = {
      className: `toastify-content toastify-content--${this.props.type} ${this
        .props.className}`
    };

    if (this.props.autoClose !== false && this.props.pauseOnHover === true) {
      toastProps.onMouseEnter = this.pauseToast;
      toastProps.onMouseLeave = this.playToast;
    }

    this.props.closeOnClick && (toastProps.onClick = this.props.closeToast);

    return toastProps;
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
      closeToast,
      transition,
      position,
      onExited
    } = this.props;

    const Transition = transition;

    return (
      <Transition in={this.props.in} appear unmountOnExit onExited={onExited} position={position}>
        <div {...this.getToastProps()}>
          <div className={`toastify__body ${this.props.bodyClassName}`}>
            {children}
          </div>
          {closeButton !== false && closeButton}
          {autoClose !== false && (
            <ProgressBar
              delay={autoClose}
              isRunning={this.state.isRunning}
              closeToast={closeToast}
              hide={hideProgressBar}
              type={type}
              className={this.props.progressClassName}
            />
          )}
        </div>
      </Transition>
    );
  }
}

export default Toast;
