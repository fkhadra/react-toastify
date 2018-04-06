import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ProgressBar from './ProgressBar';
import { POSITION, TYPE } from './../utils/constant';
import {
  falseOrElement,
  falseOrDelay,
  objectValues
} from './../utils/propValidator';

class Toast extends Component {
  static propTypes = {
    closeButton: falseOrElement.isRequired,
    autoClose: falseOrDelay.isRequired,
    children: PropTypes.node.isRequired,
    closeToast: PropTypes.func.isRequired,
    position: PropTypes.oneOf(objectValues(POSITION)).isRequired,
    pauseOnHover: PropTypes.bool.isRequired,
    closeOnClick: PropTypes.bool.isRequired,
    transition: PropTypes.func.isRequired,
    isDocumentHidden: PropTypes.bool.isRequired,
    rtl: PropTypes.bool.isRequired,
    in: PropTypes.bool,
    onExited: PropTypes.func,
    hideProgressBar: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(objectValues(TYPE)),
    className: PropTypes.string,
    bodyClassName: PropTypes.string,
    progressClassName: PropTypes.string,
    updateId: PropTypes.number,
    ariaLabel: PropTypes.string
  };

  static defaultProps = {
    type: TYPE.DEFAULT,
    in: true,
    hideProgressBar: false,
    onOpen: null,
    onClose: null,
    className: null,
    bodyClassName: null,
    progressClassName: null,
    updateId: null,
    role: 'alert'
  };

  state = {
    isRunning: true,
    disableExitTransition: false
  };

  isDragged = false;

  position = {
    start: null,
    x: null,
    delta: null
  };

  ref = null;

  componentDidMount() {
    this.props.onOpen !== null && this.props.onOpen(this.getChildrenProps());
    document.addEventListener('mousemove', this.onSwipeMove);
    document.addEventListener('mouseup', this.onSwipeEnd);

    document.addEventListener('touchmove', this.onSwipeMove);
    document.addEventListener('touchend', this.onSwipeEnd);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isDocumentHidden !== nextProps.isDocumentHidden) {
      this.setState({
        isRunning: !nextProps.isDocumentHidden
      });
    }
  }

  componentWillUnmount() {
    this.props.onClose !== null && this.props.onClose(this.getChildrenProps());
  }

  pauseToast = () => {
    this.setState({ isRunning: false });
  };

  playToast = () => {
    this.setState({ isRunning: true });
  };

  getChildrenProps() {
    return this.props.children.props;
  }

  getToastProps() {
    const toastProps = {};

    if (this.props.autoClose !== false && this.props.pauseOnHover === true) {
      toastProps.onMouseEnter = this.pauseToast;
      toastProps.onMouseLeave = this.playToast;
    }
    typeof this.props.className === 'string' &&
      (toastProps.className = this.props.className);
    this.props.closeOnClick && (toastProps.onClick = this.props.closeToast);

    return toastProps;
  }

  getX(e) {
    if (e.targetTouches && e.targetTouches.length >= 1) {
      return e.targetTouches[0].clientX;
    }
    // mouse event
    return e.clientX;
  }

  onSwipeStart = e => {
    this.isDragged = true;
    this.ref.style.transition = '';
    this.position.start = this.getX(e.nativeEvent);
    this.position.x = this.getX(e.nativeEvent);
  };

  onSwipeMove = e => {
    if (this.isDragged) {
      //this.position.delta = Math.abs(this.position.x - this.getX(e));
      this.position.x = this.getX(e);
      this.ref.style.transform = `translateX(${this.position.x -
        this.position.start}px)`;
        this.ref.style.opacity = 1- Math.abs((this.position.x -
          this.position.start) / (this.ref.offsetWidth * 0.8));
    }
  };

  onSwipeEnd = e => {
    if (this.isDragged) {
      this.isDragged = false;

      if(this.ref.style.opacity <= 0.3 ){
        this.setState({
          disableExitTransition: true
        }, this.props.closeToast);
        return;
      }
      
      this.ref.style.transition = 'transform 0.2s, opacity 0.2s';
      this.ref.style.transform = 'translateX(0)';
      this.ref.style.opacity = 1;

      this.position = {
        start: null,
        x: null,
        delta: null
      };
      this.playToast();
    }
  };

  render() {
    const {
      closeButton,
      children,
      autoClose,
      type,
      hideProgressBar,
      closeToast,
      transition: Transition,
      position,
      onExited,
      className,
      bodyClassName,
      progressClassName,
      updateId,
      role,
      rtl
    } = this.props;

    const toastClassname = cx(
      'Toastify__toast',
      `Toastify__toast--${type}`,
      className,
      {
        'Toastify__toast--rtl': rtl
      }
    );

    const bodyClassname = cx('Toastify__toast-body', bodyClassName);
    return (
      <Transition
        in={this.props.in}
        appear
        unmountOnExit
        onExited={onExited}
        position={position}
        disableExitTransition={this.state.disableExitTransition}
      >
        <div
          className={toastClassname}
          {...this.getToastProps()}
          ref={ref => (this.ref = ref)}
          onMouseDown={this.onSwipeStart}
          onTouchStart={this.onSwipeStart}
        >
          <div {...this.props.in && { role: role }} className={bodyClassname}>
            {children}
          </div>
          {closeButton !== false && closeButton}
          {autoClose !== false && (
            <ProgressBar
              key={`pb-${updateId}`}
              rtl={rtl}
              delay={autoClose}
              isRunning={this.state.isRunning}
              closeToast={closeToast}
              hide={hideProgressBar}
              type={type}
              className={progressClassName}
            />
          )}
        </div>
      </Transition>
    );
  }
}

export default Toast;
