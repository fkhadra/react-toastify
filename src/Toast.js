import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import ProgressBar from './ProgressBar';
import { POSITION, TYPE } from './constant';
import defaultStyle from './defaultStyle';
import {
  falseOrElement,
  falseOrDelay,
  objectValues
} from './util/propValidator';

const styles = {
  container: (type, rtl) =>
    css({
      position: 'relative',
      minHeight: '64px',
      boxSizing: 'border-box',
      marginBottom: '1rem',
      padding: '8px',
      borderRadius: '1px',
      boxShadow:
        '0 1px 10px 0 rgba(0, 0, 0, .1), 0 2px 15px 0 rgba(0, 0, 0, .05)',
      display: 'flex',
      justifyContent: 'space-between',
      maxHeight: '800px',
      overflow: 'hidden',
      fontFamily: defaultStyle.fontFamily,
      cursor: 'pointer',
      background:
        defaultStyle[`color${type.charAt(0).toUpperCase()}${type.slice(1)}`],
      ...(type === 'default' ? { color: '#aaa' } : {}),
      [`@media ${defaultStyle.mobile}`]: {
        marginBottom: 0
      },
      direction: rtl ? 'rtl' : 'ltr'
    }),
  body: css({
    margin: 'auto 0',
    flex: 1
  })
};

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
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    bodyClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    progressClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
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
    isRunning: true
  };

  componentDidMount() {
    this.props.onOpen !== null && this.props.onOpen(this.getChildrenProps());
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

    return (
      <Transition
        in={this.props.in}
        appear
        unmountOnExit
        onExited={onExited}
        position={position}
      >
        <div
          {...css(
            styles.container(type, rtl),
            typeof className !== 'string' && className
          )}
          {...this.getToastProps()}
        >
          <div
            {...this.props.in && { role: role }}
            {...css(
              styles.body,
              typeof bodyClassName !== 'string' && bodyClassName
            )}
            {...typeof bodyClassName === 'string' && {
              className: bodyClassName
            }}
          >
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
