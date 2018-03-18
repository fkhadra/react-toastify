import React from 'react';
import Transition from 'react-transition-group/Transition';
import { css } from 'glamor';

import getAnimation from './../animations/bounce';

const animate = {
  animationDuration: '0.75s',
  animationFillMode: 'both'
};

const styles = pos => {
  const { enter, exit } = getAnimation(pos);

  return {
    enter: css({ ...animate, animationName: css.keyframes(enter) }),
    exit: css({ ...animate, animationName: css.keyframes(exit) })
  };
};

function DefaultTransition({ children, position, ...props }) {
  const { enter, exit } = styles(position);
  const onEnter = node => node.classList.add(enter);
  const onEntered = node => node.classList.remove(enter);
  const onExit = node => node.classList.add(exit);

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
