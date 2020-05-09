import React from 'react';
import { isFn } from '../../src/utils';

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(
    ({ children, onEnter, onEntered, onExit, nodeRef, in: isIn }) => {
      if (onEnter) isFn(onEnter) && isIn && onEnter(nodeRef);
      if (onEntered) isFn(onEntered) && isIn && onEntered(nodeRef);
      if (onExit) isFn(onExit) && !isIn && onExit(nodeRef);

      return isIn ? <div>{children}</div> : null;
    }
  );

  return {
    Transition: FakeTransition,
    TransitionGroup: jest.fn(({ children }) => children)
  };
});
