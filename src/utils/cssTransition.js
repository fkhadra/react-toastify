import React from 'react';
import Transition from 'react-transition-group/Transition';

export default function({
  enter,
  exit,
  duration = 750,
  appendPosition = false
}) {
  return function Animation({ children, position, disableExitTransition, ...props }) {
    const enterClassName = appendPosition ? `${enter}--${position}` : enter;
    const exitClassName = appendPosition ? `${exit}--${position}` : exit;

    const onEnter = node => {
      node.classList.add(enterClassName);
      node.style.animationFillMode = 'both';
      node.style.animationDuration = `${duration * 0.001}s`;
    };
    const onEntered = node => {
      node.classList.remove(enterClassName);
      node.style.cssText = '';
    };
    const onExit = node => {
      node.classList.add(exitClassName);
      node.style.animationFillMode = 'both';
      node.style.animationDuration = `${duration * 0.001}s`;
    };

    return (
      <Transition
        {...props}
        timeout={disableExitTransition ? 0 : duration}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={disableExitTransition ? () => {} : onExit}
      >
        {children}
      </Transition>
    );
  };
}
