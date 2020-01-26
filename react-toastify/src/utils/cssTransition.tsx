import React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

import { NOOP } from './constant';

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
}

interface AnimationProps extends Partial<TransitionProps> {
  position?: Position;
  preventExitTransition?: boolean;
  
}

export function cssTransition({
  enter,
  exit,
  duration = 750,
  appendPosition = false
}: CSSTransitionProps) {
  const Animation: React.FC<AnimationProps> = ({
    children,
    position,
    preventExitTransition,
    ...props
  }) => {
    const enterClassName = appendPosition ? `${enter}--${position}` : enter;
    const exitClassName = appendPosition ? `${exit}--${position}` : exit;
    let enterDuration: number, exitDuration: number;

    if (Array.isArray(duration) && duration.length === 2) {
      [enterDuration, exitDuration] = duration;
    } else {
      enterDuration = exitDuration = duration as number;
    }

    const onEnter = (node: HTMLElement) => {
      node.classList.add(enterClassName);
      node.style.animationFillMode = 'forwards';
      node.style.animationDuration = `${enterDuration * 0.001}s`;
    };
    const onEntered = (node: HTMLElement) => {
      node.classList.remove(enterClassName);
      node.style.cssText = '';
    };
    const onExit = (node: HTMLElement) => {
      node.classList.add(exitClassName);
      node.style.animationFillMode = 'forwards';
      node.style.animationDuration = `${exitDuration * 0.001}s`;
    };

    return (
      <Transition
        {...props}
        timeout={
          preventExitTransition
            ? 0
            : {
                enter: enterDuration,
                exit: exitDuration
              }
        }
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={preventExitTransition ? NOOP : onExit}
      >
        {children}
      </Transition>
    );
  };
  return Animation;
}
