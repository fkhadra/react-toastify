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


function getX(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientX
    : e.clientX;
}

function getY(e){
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
}

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
    draggable: PropTypes.bool,
    draggablePercent: PropTypes.number,
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
    draggable: true,
    draggablePercent: 0.8,
    role: 'alert'
  };

  state = {
    isRunning: true,
    preventExitTransition: false
  };

  flags = {
    canCloseOnClick: true,
    canDrag: false
  };

  position = {
    start: 0,
    x: 0,
    y: 0,
    deltaX: 0
  };

  ref = null;

  removalDistance = -1;

  componentDidMount() {
    this.props.onOpen !== null && this.props.onOpen(this.getChildrenProps());
    if (this.props.draggable) {
      document.addEventListener('mousemove', this.onDragMove);
      document.addEventListener('mouseup', this.onDragEnd);

      document.addEventListener('touchmove', this.onDragMove);
      document.addEventListener('touchend', this.onDragEnd);
    }
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
    if (this.props.draggable) {
      document.removeEventListener('mousemove', this.onDragMove);
      document.removeEventListener('mouseup', this.onDragEnd);

      document.removeEventListener('touchmove', this.onDragMove);
      document.removeEventListener('touchend', this.onDragEnd);
    }
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
    const { autoClose, pauseOnHover, closeOnClick, closeToast } = this.props;

    if (autoClose && pauseOnHover) {
      toastProps.onMouseEnter = this.pauseToast;
      toastProps.onMouseLeave = this.playToast;
    }

    // prevent toast from closing when user drags the toast
    if (closeOnClick) {
      toastProps.onClick = () => this.flags.canCloseOnClick && closeToast();
    }

    return toastProps;
  }

  onDragStart = e => {
    this.flags.canCloseOnClick = true;
    this.flags.canDrag = true;
    this.ref.style.transition = '';
    this.position.start = this.position.x = getX(e.nativeEvent);
    this.removalDistance = this.ref.offsetWidth * this.props.draggablePercent;
  };

  onDragMove = e => {
    if (this.flags.canDrag) {

      if (this.state.isRunning) {
        this.pauseToast();
      }

      this.position.x = getX(e);
      this.position.deltaX = this.position.x - this.position.start;
      //prevent false positif during a toast click
      this.position.start !== this.position.x &&
        (this.flags.canCloseOnClick = false);

      this.ref.style.transform = `translateX(${this.position.deltaX}px)`;
      this.ref.style.opacity =
        1 - Math.abs(this.position.deltaX / this.removalDistance);
    }
  };

  onDragEnd = e => {
    if (this.flags.canDrag) {
      this.flags.canDrag = false;

      if (Math.abs(this.position.deltaX) > this.removalDistance) {
        this.setState(
          {
            preventExitTransition: true
          },
          this.props.closeToast
        );
        return;
      }

      this.position.y = getY(e);
      this.ref.style.transition = 'transform 0.2s, opacity 0.2s';
      this.ref.style.transform = 'translateX(0)';
      this.ref.style.opacity = 1;
    }
  };

  onDragTransitionEnd = () => {
    const { top, bottom, left, right } = this.ref.getBoundingClientRect();

    if (
      this.props.pauseOnHover &&
      this.position.x >= left &&
      this.position.x <= right &&
      this.position.y >= top &&
      this.position.y <= bottom
    ) {
      this.pauseToast();
    } else {
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
        preventExitTransition={this.state.preventExitTransition}
      >
        <div
          className={toastClassname}
          {...this.getToastProps()}
          ref={ref => (this.ref = ref)}
          onMouseDown={this.onDragStart}
          onTouchStart={this.onDragStart}
          onTransitionEnd={this.onDragTransitionEnd}
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
