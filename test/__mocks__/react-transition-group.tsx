import React from 'react';
import { isFn } from '../../src/utils';

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(
    ({ children, onEnter, onEntered, onExit, in: isIn }) => {
      if (onEnter) isFn(onEnter) && isIn && onEnter();
      if (onEntered) isFn(onEntered) && isIn && onEntered();
      if (onExit) {
        isFn(onExit) && !isIn && onExit();
      }

      return isIn ? <div>{children}</div> : null;
    }
  );

  return {
    Transition: FakeTransition,
    TransitionGroup: jest.fn(({ children }) => children)
  };
});
