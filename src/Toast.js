import React, { Component, PropTypes } from 'react';
import {config} from './config';
import { objectValues } from './util';

const propTypes = {
  id: PropTypes.number.isRequired,
  handleCloseBtn: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(objectValues(config.TYPE)),
};

const defaultProps = {
  type: config.TYPE.DEFAULT
};

class Toaster extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.ref = null;
  }

  setRef(ref) {
    this.ref = ref;
  }

  componentWillEnter(callback) {
    this.ref.classList.add('bounceInRight', 'animated');
    callback();
  }

  componentWillLeave(callback) {
    this.ref.classList.add('bounceOutRight', 'animated');
    setTimeout(()=> callback(), 750);
  }

  render() {
    return (
      <div
        className={`toastify-content toastify-content--${this.props.type}`}
        ref={this.setRef}
        onMouseEnter={this.props.handleMouseEnter}
      >
        <button
          className="toastify__close"
          type="button"
          onClick={this.props.handleCloseBtn}
          value={this.props.id}
        >
          ×
        </button>
        <div className="toastify__body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Toaster.defaultProps = defaultProps;
Toaster.propTypes = propTypes;

export default Toaster;