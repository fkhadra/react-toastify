import React, { Component, PropTypes, Children, cloneElement } from 'react';
import config from './config';

const propTypes = {
  id: PropTypes.number.isRequired,
  handleCloseBtn: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  autoCloseId: PropTypes.number,
  autoCloseDelay: PropTypes.number,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(Object.values(config.TYPE)),
  childrenProps: PropTypes.object,
  position: PropTypes.oneOf(Object.values(config.POSITION))
};

const defaultProps = {
  type: config.TYPE.DEFAULT,
  childrenProps: {}
};

class Toast extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.ref = null;
  }

  componentDidMount() {
    this.props.onOpen(this.getChildrenProps());
  }

  componentWillUnmount() {
    this.props.onClose(this.getChildrenProps());
  }

  setRef(ref) {
    this.ref = ref;
  }

  getChildrenProps() {
    return Object.assign({}, this.props.childrenProps, this.props.children.props);
  }

  getChildren() {
    const props = this.props.childrenProps;
    return Children.map(this.props.children, child => cloneElement(child, { ...props, ...child.props }));
  }

  getToastProps() {
    const { autoCloseId, autoCloseDelay, handleMouseEnter, handleMouseLeave } = this.props;
    const props = {
      'data-toast-id': this.props.id,
      className: `toastify-content toastify-content--${this.props.type}`,
      ref: this.setRef,
    };

    if (this.props.autoCloseId) {
      props['data-auto-close-id'] = autoCloseId;
      props['data-auto-close-delay'] = autoCloseDelay;
      props.onMouseEnter = handleMouseEnter;
      props.onMouseLeave = handleMouseLeave;
    }

    return props;
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

  render() {
    return (
      <div {...this.getToastProps()}>
        <button
          className="toastify__close"
          type="button"
          onClick={this.props.handleCloseBtn}
          value={this.props.id}
        >
          ×
        </button>
        <div className="toastify__body">
          {this.getChildren()}
        </div>
      </div>
    );
  }
}

Toast.defaultProps = defaultProps;
Toast.propTypes = propTypes;

export default Toast;
