/**
 * The playground could use some love 💖. To the brave soul reading this
 * message, any help would be appreciated 🙏
 *
 * The code is full of bad assertion 😆
 */

import { Checkbox } from './Checkbox';
import { ContainerCode, ContainerCodeProps } from './ContainerCode';
import { Header } from './Header';
import { Radio } from './Radio';
import { ToastCode, ToastCodeProps } from './ToastCode';
import { flags, positions, themes, transitions, typs } from './constants';

import React from 'react';
import { Id, toast, ToastContainer } from '../../../src';
import { defaultProps } from '../../../src/components/ToastContainer';

// Attach to window. Can be useful to debug
// @ts-ignore
window.toast = toast;

class App extends React.Component {
  state = App.getDefaultState();
  toastId: Id;
  resolvePromise = true;

  static getDefaultState() {
    return {
      ...defaultProps,
      transition: 'bounce',
      type: 'default',
      progress: 0,
      disableAutoClose: false,
      limit: 0,
      theme: 'light'
    };
  }

  handleReset = () =>
    this.setState({
      ...App.getDefaultState()
    });

  clearAll = () => toast.dismiss();

  showToast = () => {
    this.toastId =
      this.state.type === 'default'
        ? toast('🦄 Wow so easy !', { progress: this.state.progress })
        : toast[this.state.type]('🚀 Wow so easy !', {
            progress: this.state.progress
          });
  };

  firePromise = () => {
    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          this.resolvePromise ? resolve(null) : reject(null);
          this.resolvePromise = !this.resolvePromise;
        }, 3000);
      }),
      {
        pending: 'Promise is pending',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯'
      }
    );
  };

  updateToast = () => toast.update(this.toastId, { progress: this.state.progress });

  showPriorityToast = () => {
    toast('🥇 Priority toast! (prepend: true)', { prepend: true });
  };

  firePrependQueueDemo = () => {
    toast.dismiss({ containerId: 'prepend-demo' });
    toast.clearWaitingQueue({ containerId: 'prepend-demo' });
    toast('Queued 1', { containerId: 'prepend-demo' });
    toast('Queued 2', { containerId: 'prepend-demo' });
    toast('Queued 3', { containerId: 'prepend-demo' });
    toast('🥇 Priority toast, skips the queue!', {
      containerId: 'prepend-demo',
      prepend: true
    });
  };

  handleAutoCloseDelay = e =>
    this.setState({
      autoClose: e.target.value > 0 ? parseInt(e.target.value, 10) : 1
    });

  isDefaultProps() {
    return (
      this.state.position === 'top-right' &&
      this.state.autoClose === 5000 &&
      !this.state.disableAutoClose &&
      !this.state.hideProgressBar &&
      !this.state.newestOnTop &&
      !this.state.rtl &&
      this.state.pauseOnFocusLoss &&
      this.state.pauseOnHover &&
      this.state.closeOnClick &&
      this.state.draggable &&
      this.state.theme === 'light'
    );
  }

  handleRadioOrSelect = e =>
    this.setState({
      [e.target.name]: e.target.name === 'limit' ? parseInt(e.target.value, 10) : e.target.value
    });

  toggleCheckbox = e =>
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });

  renderFlags() {
    return flags.map(({ id, label }) => (
      <li key={id}>
        <Checkbox id={id} label={label} onChange={this.toggleCheckbox} checked={this.state[id]} />
      </li>
    ));
  }

  render() {
    return (
      <main>
        <Header />
        <div className="container">
          <p>
            By default, all toasts will inherit ToastContainer's props. Props defined on toast supersede
            ToastContainer's props. Props marked with * can only be set on the ToastContainer. The demo is not
            exhaustive, check the repo for more!
          </p>
          <section className="container__options">
            <div>
              <h3>Position</h3>
              <ul>
                <Radio
                  options={positions}
                  name="position"
                  checked={this.state.position as string}
                  onChange={this.handleRadioOrSelect}
                />
              </ul>
            </div>
            <div>
              <h3>Type</h3>
              <ul>
                <Radio options={typs} name="type" checked={this.state.type} onChange={this.handleRadioOrSelect} />
              </ul>
            </div>
            <div>
              <h3>Options</h3>
              <div className="options_wrapper">
                <label htmlFor="autoClose">
                  Delay
                  <input
                    type="number"
                    name="autoClose"
                    id="autoClose"
                    value={this.state.autoClose as unknown as string}
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
                <label htmlFor="theme">
                  Theme
                  <select name="theme" id="theme" onChange={this.handleRadioOrSelect} value={this.state.theme}>
                    {themes.map(k => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </label>
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
            </div>
          </section>
          <section>
            <ContainerCode
              {...(this.state as unknown as ContainerCodeProps)}
              isDefaultProps={this.isDefaultProps() as boolean}
            />
            <ToastCode {...(this.state as unknown as ToastCodeProps)} />
          </section>
          <div className="cta__wrapper">
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
                <button className="btn" onClick={this.showPriorityToast}>
                  <span role="img" aria-label="show priority alert">
                    🥇
                  </span>{' '}
                  Priority Toast (prepend)
                </button>
              </li>
              <li>
                <button className="btn" onClick={this.firePromise}>
                  Promise
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
        </div>
        <ToastContainer
          {...this.state}
          transition={transitions[this.state.transition]}
          autoClose={this.state.disableAutoClose ? false : this.state.autoClose}
        />
        <ToastContainer containerId="xxx" position="top-left" autoClose={false} theme="dark" limit={3} />
        <ToastContainer limit={3} containerId="yyy" autoClose={false} position="top-right" />
        <ToastContainer
          containerId="prepend-demo"
          limit={1}
          autoClose={false}
          position="bottom-center"
          theme="colored"
        />
      </main>
    );
  }
}

export { App };
