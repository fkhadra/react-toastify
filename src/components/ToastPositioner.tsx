import * as React from 'react';
import { ToastProps } from '../types';
import { isFn } from '../utils';
type ToastPositionerProps = Pick<ToastProps, 'className' | 'style' | 'in'>;

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
    <div className={isFn(className) ? className({}) : className} style={style}>
      {React.Children.map(children, child =>
        React.cloneElement(child as React.ReactElement<any>, rest)
      )}
    </div>
  );
};
