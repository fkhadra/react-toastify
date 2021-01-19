import React, { useEffect, useLayoutEffect, useRef } from 'react';
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
   * Append current toast position to the classname.
   * If multiple classes are provided, only the last one will get the position
   * For instance `myclass--top-center`...
   * `Default: false`
   */
  appendPosition?: boolean;

  /**
   * Collapse toast smoothly when exit animation end
   * `Default: true`
   */
  collapse?: boolean;

  /**
   * Collapse transition duration
   * `Default: 300`
   */
  collapseDuration?: number;
}

/**
 * Css animation that just work.
 * You could use animate.css for instance
 *
 *
 * ```
 * cssTransition({
 *   enter: "animate__animated animate__bounceIn",
 *   exit: "animate__animated animate__bounceOut"
 * })
 * ```
 *
 */
export function cssTransition({
  enter,
  exit,
  appendPosition = false,
  collapse = true,
  collapseDuration = Default.COLLAPSE_DURATION
}: CSSTransitionProps) {
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
    const baseClassName = useRef<string>();

    useLayoutEffect(() => {
      onEnter();
    }, []);

    useEffect(() => {
      if (!isIn) preventExitTransition ? onExited() : onExit();
    }, [isIn]);

    const onEnter = () => {
      const node = nodeRef.current!;
      baseClassName.current = node.className;
      node.className += ` ${enterClassName}`;
      node.addEventListener('animationend', onEntered);
    };

    const onEntered = () => {
      const node = nodeRef.current!;
      node.removeEventListener('animationend', onEntered);
      node.className = baseClassName.current!;
    };

    const onExit = () => {
      const node = nodeRef.current!;

      node.className += ` ${exitClassName}`;
      node.addEventListener('animationend', onExited);
    };

    const onExited = () => {
      const node = nodeRef.current!;

      node.removeEventListener('animationend', onExited);
      collapse ? collapseToast(node, done, collapseDuration) : done();
    };

    return <>{children}</>;
  };
}
