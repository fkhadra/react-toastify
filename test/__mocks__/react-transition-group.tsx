import React from 'react';

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children, className, style, ...rest }) => {
    const props: Record<string, any> = {};
    
    if (className) props.className = className;
    if (style) props.style = style;

    return (
      <div {...Object.assign(props, rest)}>
        {children}
      </div>
    );
  });

  return {
    Transition: FakeTransition,
    TransitionGroup: FakeTransition
  };
});