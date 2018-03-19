import React from 'react';
import Transition from 'react-transition-group/Transition';
import { css } from 'glamor';

export default function(animation, options = {
  duration: 750
}) {
  const animate = {
    animationDuration: `${options.duration * 0.001}s`,
    animationFillMode: 'both'
  };

  const styles = pos => {
    const { enter, exit } = typeof animation === 'function' ? animation(pos) : animation;
  
    return {
      enter: css({ ...animate, animationName: css.keyframes(enter) }),
      exit: css({ ...animate, animationName: css.keyframes(exit) })
    };
  };
  
  return function Animation({ children, position, ...props }) {
    const { enter, exit } = styles(position);
    const onEnter = node => node.classList.add(enter);
    const onEntered = node => node.classList.remove(enter);
    const onExit = node => node.classList.add(exit);
  
    return (
      <Transition
        {...props}
        timeout={options.duration}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
      >
        {children}
      </Transition>
    );
  }
}
