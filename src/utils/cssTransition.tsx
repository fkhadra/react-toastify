import * as React from 'react';
import { Transition } from 'react-transition-group';
import { ToastTransitionProps } from '../types';

import { collapseToast } from './collapseToast';
import { DEFAULT } from './constant';

export interface CSSTransitionProps {
  /**
   * Css class to apply when toast enter
   */
  enter: string;

  /**
   * Css class to apply when toast leave
   */
  exit: string;

  /**
   * Define the duration of the transition in ms
   * You can also pass an array `[enterDuration, exitDuration]`
   * `Default: 750`
   */
  duration?: number | [number, number];

  /**
   * Append current toast position to the classname.
   * For instance `myclass--top-center`...
   * `Default: false`
   */
  appendPosition?: boolean;

  /**
   * Collapse toast smoothly when animation end
   * `Default: true`
   */
  collapse?: boolean;

  /**
   * Collapse transition duration
   * `Default: 300`
   */
  collapseDuration?: number;
}

export function cssTransition({
  enter,
  exit,
  duration = 750,
  appendPosition = false,
  collapse = true,
  collapseDuration = DEFAULT.COLLAPSE_DURATION
}: CSSTransitionProps) {
  let enterDuration: number, exitDuration: number;

  if (Array.isArray(duration) && duration.length === 2) {
    [enterDuration, exitDuration] = duration;
  } else {
    enterDuration = exitDuration = duration as number;
  }

  return function ToastTransition({
    children,
    position,
    preventExitTransition,
    done,
    ...props
  }: ToastTransitionProps) {
    const enterClassName = appendPosition ? `${enter}--${position}` : enter;
    const exitClassName = appendPosition ? `${exit}--${position}` : exit;

    const onEnter = () => {
      const node = props.nodeRef.current;
      if (node) {
        node.classList.add(enterClassName);
        node.style.animationFillMode = 'forwards';
        node.style.animationDuration = `${enterDuration}ms`;
      }
    };

    const onEntered = () => {
      const node = props.nodeRef.current;
      if (node) {
        node.classList.remove(enterClassName);
        node.style.cssText = '';
      }
    };

    const onExited = () => {
      const node = props.nodeRef.current;

      if (node) {
        node.removeEventListener('animationend', onExited);
        collapse ? collapseToast(node, done, collapseDuration) : done();
      }
    };

    const onExit = () => {
      const node = props.nodeRef.current;
      if (node) {
        node.classList.add(exitClassName);
        node.style.animationFillMode = 'forwards';
        node.style.animationDuration = `${exitDuration}ms`;
        node.addEventListener('animationend', onExited);
      }
    };

    return (
      <Transition
        {...props}
        timeout={
          preventExitTransition
            ? collapse
              ? collapseDuration
              : DEFAULT.DEBOUNCE_DURATION
            : {
                enter: enterDuration,
                exit: collapse
                  ? exitDuration + collapseDuration
                  : exitDuration + DEFAULT.DEBOUNCE_DURATION
              }
        }
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={preventExitTransition ? onExited : onExit}
        unmountOnExit
      >
        {children}
      </Transition>
    );
  };
}
