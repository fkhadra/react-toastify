import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { collapseToast } from './collapseToast';
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
export function cssTransition(_a) {
  var enter = _a.enter,
    exit = _a.exit,
    _b = _a.appendPosition,
    appendPosition = _b === void 0 ? false : _b,
    _c = _a.collapse,
    collapse = _c === void 0 ? true : _c,
    _d = _a.collapseDuration,
    collapseDuration = _d === void 0 ? 300 /* Default.COLLAPSE_DURATION */ : _d;
  return function ToastTransition(_a) {
    var children = _a.children,
      position = _a.position,
      preventExitTransition = _a.preventExitTransition,
      done = _a.done,
      nodeRef = _a.nodeRef,
      isIn = _a.isIn,
      playToast = _a.playToast,
      comeFrom = _a.comeFrom,
      leaveFrom = _a.leaveFrom;
    var enterClassName = appendPosition
      ? ''
          .concat(enter)
          .concat(comeFrom ? comeFrom : '', '--')
          .concat(position)
      : enter;
    var exitClassName = appendPosition
      ? ''
          .concat(exit)
          .concat(leaveFrom ? leaveFrom : '', '--')
          .concat(position)
      : exit;
    var animationStep = useRef(0 /* AnimationStep.Enter */);
    useLayoutEffect(function () {
      var node = nodeRef.current;
      var classToToken = enterClassName.split(' ');
      var onEntered = function (e) {
        var _a;
        if (e.target !== nodeRef.current) return;
        playToast();
        node.removeEventListener('animationend', onEntered);
        node.removeEventListener('animationcancel', onEntered);
        if (
          animationStep.current === 0 /* AnimationStep.Enter */ &&
          e.type !== 'animationcancel'
        ) {
          (_a = node.classList).remove.apply(_a, classToToken);
        }
      };
      var onEnter = function () {
        var _a;
        (_a = node.classList).add.apply(_a, classToToken);
        node.addEventListener('animationend', onEntered);
        node.addEventListener('animationcancel', onEntered);
      };
      onEnter();
    }, []);
    useEffect(
      function () {
        var node = nodeRef.current;
        var onExited = function () {
          node.removeEventListener('animationend', onExited);
          collapse ? collapseToast(node, done, collapseDuration) : done();
        };
        var onExit = function () {
          animationStep.current = 1 /* AnimationStep.Exit */;
          node.className += ' '.concat(exitClassName);
          node.addEventListener('animationend', onExited);
        };
        if (!isIn) preventExitTransition ? onExited() : onExit();
      },
      [isIn]
    );
    return React.createElement(React.Fragment, null, children);
  };
}
//# sourceMappingURL=cssTransition.js.map
