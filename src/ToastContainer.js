import React, { Component, PropTypes } from 'react';
import { EventManager, objectValues } from './util';
import Toaster from './Toaster';
import { config } from './config';
import Transition from 'react-addons-transition-group';

const propTypes = {
  position: PropTypes.oneOf(objectValues(config.POSITION)),
  delay: PropTypes.number
};

const defaultProps = {
  position: config.POSITION.TOP_RIGHT,
  delay: null,
};

class ToasterProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: {}
    };
    this.handleCloseBtn = this.handleCloseBtn.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.toastId = 0;
  }

  handleCloseBtn(e) {
    this.removeToast(e.target.value);
  }

  handleMouseEnter(e) {

  }

  makeToast(params, id) {
    return (
      <Toaster
        {...params}
        id={id}
        key={id}
        handleCloseBtn={this.handleCloseBtn}
        handleMouseEnter={this.handleMouseEnter}
      >
        {params.content}
      </Toaster>
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

  componentDidMount() {
    EventManager.on('TOASTIFY_SHOW', params => this.show(params));

    EventManager.on('TOASTIFY_DISMISS', () => this.dismiss());
  }

  isObjectEmpty() {
    return Object.keys(this.state.toast).length === 0 && this.state.toast.constructor === Object;
  }

  getPositionClassName() {
    switch (this.props.position) {
      case config.POSITION.TOP_RIGHT:
        return 'top-right';
      case config.POSITION.TOP_LEFT:
        return 'top-left';
      case config.POSITION.BOTTOM_RIGHT:
        return 'bottom-right';
      case config.POSITION.BOTTOM_LEFT:
        return 'bottom-left';
    }
  }

  renderToast() {
    const toasts = this.state.toast;
    return Object.keys(toasts).map(k => toasts[k]);
  }

  render() {
    return (
      <div className={`toastify toastify--${this.getPositionClassName()}`}>
        <Transition>
          {this.isObjectEmpty() ? null : this.renderToast()}
        </Transition>
      </div>
    )

  }
}

ToasterProvider.defaultProps = defaultProps;
ToasterProvider.propTypes = propTypes;

export default ToasterProvider;