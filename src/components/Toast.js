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

function getY(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
}

const noop = () => {};

class Toast extends Component {
  static propTypes = {
    closeButton: falseOrElement.isRequired,
    autoClose: falseOrDelay.isRequired,
    children: PropTypes.node.isRequired,
    closeToast: PropTypes.func.isRequired,
    position: PropTypes.oneOf(objectValues(POSITION)).isRequired,
    pauseOnHover: PropTypes.bool.isRequired,
    pauseOnFocusLoss: PropTypes.bool.isRequired,
    closeOnClick: PropTypes.bool.isRequired,
    transition: PropTypes.func.isRequired,
    rtl: PropTypes.bool.isRequired,
    hideProgressBar: PropTypes.bool.isRequired,
    draggable: PropTypes.bool.isRequired,
    draggablePercent: PropTypes.number.isRequired,
    in: PropTypes.bool,
    onExited: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(objectValues(TYPE)),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    bodyClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    progressClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    progressStyle: PropTypes.object,
    updateId: PropTypes.number,
    ariaLabel: PropTypes.string
  };

  static defaultProps = {
    type: TYPE.DEFAULT,
    in: true,
    onOpen: noop,
    onClose: noop,
    className: null,
    bodyClassName: null,
    progressClassName: null,
    updateId: null,
    role: 'alert'
  };

  state = {
    isRunning: true,
    preventExitTransition: false
  };

  flag = {
    canCloseOnClick: true,
    canDrag: false
  };

  drag = {
    start: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    removalDistance: 0
  };

  ref = null;

  componentDidMount() {
    this.props.onOpen(this.props.children.props);

    if (this.props.draggable) {
      this.bindDragEvents();
    }

    // Maybe I could bind the event in the ToastContainer and rely on delegation
    if (this.props.pauseOnFocusLoss) {
      this.bindFocusEvents();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.draggable !== this.props.draggable) {
      if (this.props.draggable) {
        this.bindDragEvents();
      } else {
        this.unbindDragEvents();
      }
    }

    if (prevProps.pauseOnFocusLoss !== this.props.pauseOnFocusLoss) {
      if (this.props.pauseOnFocusLoss) {
        this.bindFocusEvents();
      } else {
        this.unbindFocusEvents();
      }
    }
  }

  componentWillUnmount() {
    this.props.onClose(this.props.children.props);

    if (this.props.draggable) {
      this.unbindDragEvents();
    }

    if (this.props.pauseOnFocusLoss) {
      this.unbindFocusEvents();
    }
  }

  bindFocusEvents() {
    window.addEventListener('focus', this.playToast);
    window.addEventListener('blur', this.pauseToast);
  }

  unbindFocusEvents() {
    window.removeEventListener('focus', this.playToast);
    window.removeEventListener('blur', this.pauseToast);
  }

  bindDragEvents() {
    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup', this.onDragEnd);

    document.addEventListener('touchmove', this.onDragMove);
    document.addEventListener('touchend', this.onDragEnd);
  }

  unbindDragEvents() {
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);

    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('touchend', this.onDragEnd);
  }

  pauseToast = () => {
    if (this.props.autoClose) {
      this.setState({ isRunning: false });
    }
  };

  playToast = () => {
    if (this.props.autoClose) {
      this.setState({ isRunning: true });
    }
  };

  onDragStart = e => {
    this.flag.canCloseOnClick = true;
    this.flag.canDrag = true;

    this.ref.style.transition = '';

    this.drag.start = this.drag.x = getX(e.nativeEvent);
    this.drag.removalDistance =
      this.ref.offsetWidth * (this.props.draggablePercent / 100);
  };

  onDragMove = e => {
    if (this.flag.canDrag) {
      if (this.state.isRunning) {
        this.pauseToast();
      }

      this.drag.x = getX(e);
      this.drag.deltaX = this.drag.x - this.drag.start;

      // prevent false positif during a toast click
      this.drag.start !== this.drag.x && (this.flag.canCloseOnClick = false);

      this.ref.style.transform = `translateX(${this.drag.deltaX}px)`;
      this.ref.style.opacity =
        1 - Math.abs(this.drag.deltaX / this.drag.removalDistance);
    }
  };

  onDragEnd = e => {
    if (this.flag.canDrag) {
      this.flag.canDrag = false;

      if (Math.abs(this.drag.deltaX) > this.drag.removalDistance) {
        this.setState(
          {
            preventExitTransition: true
          },
          this.props.closeToast
        );
        return;
      }

      this.drag.y = getY(e);
      this.ref.style.transition = 'transform 0.2s, opacity 0.2s';
      this.ref.style.transform = 'translateX(0)';
      this.ref.style.opacity = 1;
    }
  };

  onDragTransitionEnd = () => {
    const { top, bottom, left, right } = this.ref.getBoundingClientRect();

    if (
      this.props.pauseOnHover &&
      this.drag.x >= left &&
      this.drag.x <= right &&
      this.drag.y >= top &&
      this.drag.y <= bottom
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
      pauseOnHover,
      closeOnClick,
      type,
      hideProgressBar,
      closeToast,
      transition: Transition,
      position,
      onExited,
      className,
      bodyClassName,
      progressClassName,
      progressStyle,
      updateId,
      role,
      rtl
    } = this.props;

    const toastProps = {
      className: cx(
        'Toastify__toast',
        `Toastify__toast--${type}`,
        {
          'Toastify__toast--rtl': rtl
        },
        className
      )
    };

    if (autoClose && pauseOnHover) {
      toastProps.onMouseEnter = this.pauseToast;
      toastProps.onMouseLeave = this.playToast;
    }

    // prevent toast from closing when user drags the toast
    if (closeOnClick) {
      toastProps.onClick = () => this.flag.canCloseOnClick && closeToast();
    }

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
          {...toastProps}
          ref={ref => (this.ref = ref)}
          onMouseDown={this.onDragStart}
          onTouchStart={this.onDragStart}
          onTransitionEnd={this.onDragTransitionEnd}
        >
          <div
            {...this.props.in && { role: role }}
            className={cx('Toastify__toast-body', bodyClassName)}
          >
            {children}
          </div>
          {closeButton && closeButton}
          {autoClose && (
            <ProgressBar
              {...(updateId ? { key: `pb-${updateId}` } : {})}
              rtl={rtl}
              delay={autoClose}
              isRunning={this.state.isRunning}
              closeToast={closeToast}
              hide={hideProgressBar}
              type={type}
              style={progressStyle}
              className={progressClassName}
            />
          )}
        </div>
      </Transition>
    );
  }
}

export default Toast;
