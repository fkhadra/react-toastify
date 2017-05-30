import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { Message, CustomClose } from './Message';
import ProgressBar from './ProgressBar';
import AutoClose from './AutoClose';
import 'react-toastify/dist/ReactToastify.min.css'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: toast.POSITION.TOP_RIGHT,
      delay: 5000,
      type: 'default',
      autoClose: true,
      hideProgressBar: false
    };
  }

  componentDidMount(){
    Object.keys(toast.POSITION).forEach(pos => toast(<Message/>,{
      autoClose: 6000,
      position: toast.POSITION[pos]
    }));
  }

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInput = e => {
    switch (e.target.type) {
      case 'text':
      case 'radio':
      case 'number':
        const value = e.target.type === 'number'
          ? parseInt(e.target.value, 10)
          : e.target.value;
        this.setState({
          [e.target.name]: value
        });
        break;
      case 'checkbox':
        this.setState({
          [e.target.name]: !this.state[e.target.name]
        });
        break;
      default:
        break
    }
  };

  getDelay() {
      return isNaN(this.state.delay) || this.state.delay === 0
        ? false
        : this.state.delay;
  }

  showToast = () => {
    toast(<Message/>, {
      autoClose: this.state.autoClose === false ? false : this.getDelay(),
      hideProgressBar: this.state.hideProgressBar,
      type: this.state.type,
      position: this.state.position
    });
  };

  renderPosition () {
   return Object
      .keys(toast.POSITION)
      .map(k =>
        <option
          id={k}
          key={`pos-${k}`}
          name="position"
          value={toast.POSITION[k]}
        >
          {toast.POSITION[k]}
        </option>
      )
  }

  renderType () {
    return Object
      .keys(toast.TYPE)
      .map(k => <option
        id={k}
        key={`typ-${k}`}
        name="type"
        value={toast.TYPE[k]}
      >
        {toast.TYPE[k]}
      </option>)
  }

  render() {
    const {position, autoClose, hideProgressBar, type} = this.state;
    return (
      <div className="app">
          <div className="item">
            <label>Position: </label>
            <select name="position" value={position} onChange={this.handleSelect}>
            {this.renderPosition()}
            </select>
          </div>
        <div className="item">
          <label>Type: </label>
          <select name="type" value={type} onChange={this.handleSelect}>
            {this.renderType()}
          </select>
        </div>
          <div className="item">
            <AutoClose
              autoClose={autoClose}
              onChange={this.handleInput}
            />
          </div>
          <div className="item">
            <ProgressBar
              value={hideProgressBar}
              onChange={this.handleInput}
            />
          </div>
        <div className="btn-container">
        <button className="btn btn-toast" onClick={this.showToast}>
          Notify !
        </button>
        </div>
        <ToastContainer
          autoClose={this.getDelay()}
          hideProgressBar={this.state.hideProgressBar}
          style={{}}
        />

      </div>
    );
  }
}

export default App;
