import React, { Component } from 'react';

import Header from './Header';
import Radio from './Radio';
import Checkbox from './Checkbox';
import ContainerCode from './ContainerCode';
import ToastCode from './ToastCode';

import { ToastContainer, toast } from './../../src/index';

const flags = [
  {
    id: 'disableAutoClose',
    label: 'Disable auto-close'
  },
  {
    id: 'hideProgressBar',
    label: 'Hide progress bar(less fanciness!)'
  },
  {
    id: 'newestOnTop',
    label: 'Newest on top*'
  },
  {
    id: 'closeOnClick',
    label: 'Close on click'
  },
  {
    id: 'pauseOnHover',
    label: 'Pause delay on hover'
  },
  {
    id: 'rtl',
    label: 'Right to left layout*'
  },
  {
    id: 'pauseOnVisibilityChange',
    label: 'Pause toast on visibility change*'
  }
];

class App extends Component {
  state = App.getDefaultState();

  static getDefaultState() {
    return {
      ...ToastContainer.defaultProps,
      type: 'default',
      disableAutoClose: false
    };
  }

  handleReset = () =>
    this.setState({
      ...App.getDefaultState()
    });

  clearAll = () => toast.dismiss();

  // showToast = () => toast

  handleAutoCloseDelay = e =>
    this.setState({
      autoClose: e.target.value > 0 ? parseInt(e.target.value, 10) : 1
    });

  handleRadio = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  toggleCheckbox = e =>
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });

  renderFlags() {
    return flags.map(({ id, label }) => (
      <li key={id}>
        <Checkbox
          id={id}
          label={label}
          onChange={this.toggleCheckbox}
          checked={this.state[id]}
        />
      </li>
    ));
  }

  render() {
    return (
      <main>
        <Header />
        <div className="container">
            <p>By default, all toasts will inherit ToastContainer's props. Props defined on toast supersede ToastContainer's props.
              Props marked with * can only be set on the ToastContainer.
            </p>
          <section className="container__options">
            <div>
              <h3>Position</h3>
              <ul>
                <Radio
                  options={toast.POSITION}
                  name="position"
                  checked={this.state.position}
                  onChange={this.handleRadio}
                />
              </ul>
            </div>
            <div>
              <h3>Type</h3>
              <ul>
                <Radio
                  options={toast.TYPE}
                  name="type"
                  checked={this.state.type}
                  onChange={this.handleRadio}
                />
              </ul>
            </div>
            <div>
              <h3>Options</h3>
              <label htmlFor="autoClose">
                Delay
                <input
                  type="number"
                  name="autoClose"
                  id="autoClose"
                  value={this.state.autoClose}
                  onChange={this.handleAutoCloseDelay}
                  disabled={this.state.disableAutoClose}
                />
                ms
              </label>
              <ul>{this.renderFlags()}</ul>
              <ul className="container__actions">
                <li>
                  <button className="btn">
                    <span role="img" aria-label="show alert">
                      🚀
                    </span>{' '}
                    Show Toast
                  </button>
                </li>
                <li>
                  <button className="btn bg-red" onClick={this.clearAll}>
                    <span role="img" aria-label="clear all">
                      💩
                    </span>{' '}
                    Clear All
                  </button>
                </li>
                <li>
                  <button className="btn bg-blue" onClick={this.handleReset}>
                    <span role="img" aria-label="reset options">
                      🔄
                    </span>{' '}
                    Reset
                  </button>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <ContainerCode {...this.state} />
            <ToastCode {...this.state} />
          </section>
        </div>
        <ToastContainer />
      </main>
    );
  }
}

export default App;
