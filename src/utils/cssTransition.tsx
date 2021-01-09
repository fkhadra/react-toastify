import React, { useEffect, useLayoutEffect } from 'react';
import { ToastTransitionProps } from '../types';

import { collapseToast } from './collapseToast';
import { Default } from './constant';

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
  collapseDuration = Default.COLLAPSE_DURATION
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
    nodeRef,
    isIn
  }: ToastTransitionProps) {
    const enterClassName = appendPosition ? `${enter}--${position}` : enter;
    const exitClassName = appendPosition ? `${exit}--${position}` : exit;

    useLayoutEffect(() => {
      onEnter();
    }, []);

    useEffect(() => {
      if (!isIn) preventExitTransition ? onExited() : onExit();
    }, [isIn]);

    const onEnter = () => {
      const node = nodeRef.current!;
      node.classList.add(enterClassName);
      node.style.animationFillMode = 'forwards';
      node.style.animationDuration = `${enterDuration}ms`;
      node.addEventListener('animationend', onEntered);
    };

    const onEntered = () => {
      const node = nodeRef.current!;

      node.removeEventListener('animationend', onEntered);
      node.classList.remove(enterClassName);
      node.style.removeProperty('animationFillMode');
      node.style.removeProperty('animationDuration');
    };

    const onExited = () => {
      const node = nodeRef.current!;

      node.removeEventListener('animationend', onExited);
      collapse ? collapseToast(node, done, collapseDuration) : done();
    };

    const onExit = () => {
      const node = nodeRef.current!;

      node.classList.add(exitClassName);
      node.style.animationFillMode = 'forwards';
      node.style.animationDuration = `${exitDuration}ms`;
      node.addEventListener('animationend', onExited);
    };

    return <>{children}</>;
  };
}
