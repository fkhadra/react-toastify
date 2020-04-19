import * as React from 'react';

import {Header} from './Header';
import {Radio} from './Radio';
import {Checkbox} from './Checkbox';
import {ContainerCode} from './ContainerCode';
import {ToastCode} from './ToastCode';

import {
  ToastContainer,
  toast,
  Bounce,
  Slide,
  Flip,
  Zoom,
  Id
} from '../../src/index';
import '../../scss/main.scss';

// Attach to window. Can be useful to debug
// @ts-ignore
window.toast = toast;

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
    id: 'pauseOnFocusLoss',
    label: 'Pause toast when the window loses focus'
  },
  {
    id: 'rtl',
    label: 'Right to left layout*'
  },
  {
    id: 'draggable',
    label: 'Allow to drag and close the toast'
  },
];

const transitions = {
  bounce: Bounce,
  slide: Slide,
  zoom: Zoom,
  flip: Flip
};

class App extends React.Component {
  state = App.getDefaultState();
  toastId: Id;
  
  static getDefaultState() {
    return {
      ...ToastContainer.defaultProps,
      transition: 'bounce',
      type: 'default',
      progress: '',
      disableAutoClose: false,
      limit: 0
    };
  }

  handleReset = () =>
    this.setState({
      ...App.getDefaultState()
    });

  clearAll = () => toast.dismiss();

  showToast = () => {
    this.toastId = this.state.type === 'default'
      ? toast('🦄 Wow so easy !', { progress: this.state.progress })
      : toast[this.state.type]('🚀 Wow so easy !', { progress: this.state.progress });
  }

  updateToast = () => toast.update(this.toastId, { progress: this.state.progress })

  handleAutoCloseDelay = e =>
    this.setState({
      autoClose: e.target.value > 0 ? parseInt(e.target.value, 10) : 1
    });

  isDefaultProps() {
    return (
      this.state.position === 'top-right' &&
      (this.state.autoClose === 5000 && !this.state.disableAutoClose) &&
      !this.state.hideProgressBar &&
      !this.state.newestOnTop &&
      !this.state.rtl &&
      this.state.pauseOnFocusLoss &&
      this.state.pauseOnHover &&
      this.state.closeOnClick &&
      this.state.draggable
    );
  }

  handleRadioOrSelect = e =>
    this.setState({
      [e.target.name]: e.target.name === 'limit' ? parseInt(e.target.value,10) : e.target.value
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
          <p>
            By default, all toasts will inherit ToastContainer's props. Props
            defined on toast supersede ToastContainer's props. Props marked with
            * can only be set on the ToastContainer. The demo is not exhaustive,
            check the repo for more!
          </p>
          <section className="container__options">
            <div>
              <h3>Position</h3>
              <ul>
                <Radio
                  options={toast.POSITION}
                  name="position"
                  checked={this.state.position}
                  onChange={this.handleRadioOrSelect}
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
                  onChange={this.handleRadioOrSelect}
                />
              </ul>
            </div>
            <div>
              <h3>Options</h3>
              <div>
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
                <label htmlFor="transition">
                  Transition
                  <select
                    name="transition"
                    id="transition"
                    onChange={this.handleRadioOrSelect}
                    value={this.state.transition}
                  >
                    {Object.keys(transitions).map(k => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <label htmlFor="progress">
                  Progress
                  <input
                    type="number"
                    name="progress"
                    id="progress"
                    value={this.state.progress}
                    onChange={this.handleRadioOrSelect}
                  />
                </label>
                <label htmlFor="limit">
                  Limit
                  <input
                    type="number"
                    name="limit"
                    id="limit"
                    value={this.state.limit}
                    onChange={this.handleRadioOrSelect}
                  />
                </label>
              </div>
              <ul>{this.renderFlags()}</ul>
              <ul className="container__actions">
                <li>
                  <button className="btn" onClick={this.showToast}>
                    <span role="img" aria-label="show alert">
                      🚀
                    </span>{' '}
                    Show Toast
                  </button>
                </li>
                <li>
                  <button className="btn" onClick={this.updateToast}>
                    Update
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
            <ContainerCode
              {...this.state}
              isDefaultProps={this.isDefaultProps()}
            />
            <ToastCode {...this.state} />
          </section>
        </div>
        <ToastContainer
          {...this.state}
          transition={transitions[this.state.transition]}
          autoClose={this.state.disableAutoClose ? false : this.state.autoClose}
        />
      </main>
    );
  }
}

export {App};
