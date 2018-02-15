import React from 'react';
import Transition from 'react-transition-group/Transition';
import { css } from 'glamor';

import getAnimation from './animation';

const animate = {
  animationDuration: '0.75s',
  animationFillMode: 'both'
};

const styles = pos => {
  const { enter, exit } = getAnimation(pos);
  const enterAnimation = css.keyframes({
    'from, 60%, 75%, 90%, to': {
      animationTimingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
    },
    ...enter
  });
  const exitAnimation = css.keyframes(exit);

  return {
    enter: css({ ...animate, animationName: enterAnimation }),
    exit: css({ ...animate, animationName: exitAnimation })
  };
};

function DefaultTransition({ children, position, ...props }) {
  const { enter, exit } = styles(position);
  const onEnter = node => node.classList.add(enter);
  const onEntered = node => node.classList.remove(enter);
  const onExit = node => {
    const height = node.getBoundingClientRect().height;
    node.style.transition = 'padding 0.75s, height 0.75s, maringBottom 0.75s';
    node.style.minHeight = 0;
    node.style.height = height >= 48 ? height + 'px' : '48px';

    requestAnimationFrame(() => {
      node.style.padding = 0;
      node.style.height = 0;
      node.style.marginBottom = 0;
      requestAnimationFrame(() => node.classList.add(exit));
    });
  };

  return (
    <Transition
      {...props}
      timeout={750}
      onEnter={onEnter}
      onEntered={onEntered}
      onExit={onExit}
    >
      {children}
    </Transition>
  );
}

export default DefaultTransition;
