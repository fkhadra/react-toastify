import React from 'react';

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children, className = '', style = {} }) => {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  });

  return {
    Transition: FakeTransition,
    TransitionGroup: FakeTransition
  };
});