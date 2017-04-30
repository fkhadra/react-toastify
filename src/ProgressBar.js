import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import config from './config';

class ProgressBar extends PureComponent {
  static propTypes = {
    /**
     * The animation delay which determine when to close the toast
     */
    delay: PropTypes.number.isRequired,

    /**
     * Whether or not the animation is running or paused
     */
    isRunning: PropTypes.bool.isRequired,

    /**
     * Func to close the current toast
     */
    closeToast: PropTypes.func.isRequired,

    /**
     * Optional type : info, success ...
     */
    type: PropTypes.string,

    /**
     * Hide or not the progress bar
     */
    hide: PropTypes.bool
  };

  static defaultProps = {
    type: config.TYPE.DEFAULT
  };

  render() {
    const style = {
      animationDuration: `${this.props.delay}ms`,
      animationPlayState: this.props.isRunning ? 'running' : 'paused'
    };
    style.WebkitAnimationPlayState = style.animationPlayState;

    if (this.props.hide){
      style.opacity = 0;
    }

    return <div
      className={`toastify__progress toastify__progress--${this.props.type}`}
      style={style}
      onAnimationEnd={this.props.closeToast}
    />;
  }
}

export default ProgressBar;
