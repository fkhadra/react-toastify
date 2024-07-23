import React from 'react';
import { ToastTransitionProps } from '../types';
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
export declare function cssTransition({ enter, exit, appendPosition, collapse, collapseDuration }: CSSTransitionProps): ({ children, position, preventExitTransition, done, nodeRef, isIn, playToast, comeFrom, leaveFrom }: ToastTransitionProps) => React.JSX.Element;
