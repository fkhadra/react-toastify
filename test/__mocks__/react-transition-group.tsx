import React from 'react';

jest.mock('react-transition-group', () => {
  // @ts-ignore ...rest
  const FakeTransition = jest.fn(
    ({ children, className, style, onEnter, onEntered, onExit }) => {
      const props: Record<string, any> = {};
      const node = document.createElement('div');

      if (className) props.className = className;
      if (style) props.style = style;

      if (onEnter)
        typeof onEnter === 'function' && onEnter(node);
      if (onEntered)
        typeof onEntered === 'function' &&
          onEntered(node);
      if (onExit)
        typeof onExit === 'function' && onExit(node);

      return <div {...props}>{children}</div>;
    }
  );

  return {
    Transition: FakeTransition,
    TransitionGroup: FakeTransition
  };
});
