import React, { Component, PropTypes } from 'react';
import {config} from './config';
import { objectValues } from './util';

const defaultProps = {
  type: config.TYPE.DEFAULT
};

const propTypes = {
  type: PropTypes.oneOf(objectValues(config.TYPE)),
  handleCloseBtn: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

class Toaster extends Component {

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
        ref={ref => this.ref = ref}
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