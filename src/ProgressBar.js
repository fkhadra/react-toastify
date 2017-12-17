import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { TYPE } from './constant';
import style from './style';

const trackProgress = css.keyframes('track-progress', {
  '0%': { width: '100%' },
  '100%': { width: 0 }
});

const progress = (type, isRunning, hide, delay) =>
  css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: '5px',
    zIndex: style.zIndex,
    opacity: hide ? 0 : 0.7,
    animation: `${trackProgress} linear 1`,
    animationPlayState: isRunning ? 'running' : 'paused',
    animationDuration: `${delay}ms`,
    backgroundColor: 'rgba(255,255,255,.7)',
    ...(type === 'default' ? { background: style.colorProgressDefault } : {})
  });

function ProgressBar({ delay, isRunning, closeToast, type, hide, className }) {
  return (
    <div
      {...(typeof className !== 'string'
        ? css(progress(type, isRunning, hide, delay), className)
        : progress(type, isRunning, hide, delay))}
      {...typeof className === 'string' && { className }}
      onAnimationEnd={closeToast}
    />
  );
}

ProgressBar.propTypes = {
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
  hide: PropTypes.bool,

  /**
   * Optionnal className
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

ProgressBar.defaultProps = {
  type: TYPE.DEFAULT,
  hide: false,
  className: ''
};

export default ProgressBar;
