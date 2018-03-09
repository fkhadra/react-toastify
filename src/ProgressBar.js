import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { TYPE } from './constant';
import defaultStyle from './defaultStyle';

const trackProgress = css.keyframes({
  '0%': { width: '100%' },
  '100%': { width: 0 }
});

const styles = (type, isRunning, hide, delay, rtl) =>
  css({
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: '5px',
    zIndex: defaultStyle.zIndex,
    opacity: hide ? 0 : 0.7,
    animation: `${trackProgress} linear 1`,
    animationPlayState: isRunning ? 'running' : 'paused',
    animationDuration: `${delay}ms`,
    backgroundColor: 'rgba(255,255,255,.7)',
    ...(type === 'default'
      ? {
          // uumm, ok I was lazy
          background: rtl
            ? defaultStyle.colorProgressDefault.replace('to right', 'to left')
            : defaultStyle.colorProgressDefault
        }
      : {}),
    ...(rtl ? { right: 0 } : { left: 0 })
  });

function ProgressBar({
  delay,
  isRunning,
  closeToast,
  type,
  hide,
  className,
  rtl
}) {
  return (
    <div
      {...css(
        styles(type, isRunning, hide, delay, rtl),
        typeof className !== 'string' && className
      )}
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
   * Support rtl content
   */
  rtl: PropTypes.bool.isRequired,

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
