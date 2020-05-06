import React from 'react';
import { WithInjectedOptions } from 'types';

type ToastPositionerProps = Pick<
  WithInjectedOptions,
  'className' | 'style' | 'in'
>;

export const ToastPositioner: React.FC<ToastPositionerProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  // Monkey patch react-transition-group
  // As exit transition is broken with strict mode
  delete rest.in;

  return (
    <div className={className!} style={style}>
      {React.Children.map(children, child =>
        React.cloneElement(child as React.ReactElement<any>, rest)
      )}
    </div>
  );
};
