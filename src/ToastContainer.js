import React, { Component, PropTypes } from 'react';
import { EventManager, objectValues } from './util';
import Toast from './Toast';
import config  from './config';
import Transition from 'react-addons-transition-group';

const propTypes = {
  position: PropTypes.oneOf(objectValues(config.POSITION)),
  autoClose: PropTypes.number
};

const defaultProps = {
  position: config.POSITION.TOP_RIGHT,
  autoClose: null,
};

class ToastContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: {}
    };
    this.handleCloseBtn = this.handleCloseBtn.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.toastId = 0;
  }

  componentDidMount() {
    EventManager
      .on(config.ACTION.SHOW, params => this.show(params))
      .on(config.ACTION.CLEAR, () => this.clear());
  }

  componentWillUnmount(){
    EventManager.off(config.ACTION.SHOW);
    EventManager.off(config.ACTION.CLEAR);
  }

  clear() {
    this.setState({toast: {}});
  }

  handleCloseBtn(e) {
    this.removeToast(e.target.value);
  }

  handleMouseEnter(e) {

  }

  makeToast(params, id) {
    return (
      <Toast
        {...params}
        id={id}
        key={id}
        handleCloseBtn={this.handleCloseBtn}
        handleMouseEnter={this.handleMouseEnter}
      >
        {params.content}
      </Toast>
    );
  }

  hasContent(params) {
    if (typeof params.content === 'undefined') {
      console.warn('Content is missing for your toast');
      return false;
    }
    return true;
  }

  hasDelay(params) {
  }

  removeToast(id) {
    const nextState = Object.assign({}, this.state.toast);
    delete nextState[id];
    this.setState({toast: nextState});
  }

  show(params) {
    if (this.hasContent(params)) {
      const toastId = ++this.toastId;
      const nextState = Object.assign({}, this.state.toast, {
        [toastId]: this.makeToast(params, toastId)
      });


      /*const toastId = setTimeout(() => {
        //this.removeToast(toastId);
      }, params.delay || Toaster.defaultProps.delay);*/



      this.setState({toast: nextState})
    }
  }



  isObjectEmpty() {
    return this.state.toast.constructor === Object && Object.keys(this.state.toast).length === 0;
  }

  renderToast() {
    const toasts = this.state.toast;
    return Object.keys(toasts).map(k => toasts[k]);
  }

  render() {
    return (
      <div className={`toastify toastify--${this.props.position}`}>
        <Transition>
          {this.isObjectEmpty() ? null : this.renderToast()}
        </Transition>
      </div>
    )

  }
}

ToastContainer.defaultProps = defaultProps;
ToastContainer.propTypes = propTypes;

export default ToastContainer;