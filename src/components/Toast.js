import { __assign } from 'tslib';
import cx from 'clsx';
import React, { cloneElement, isValidElement } from 'react';
import { useToast } from '../hooks/useToast';
import { isFn } from '../utils';
import { CloseButton } from './CloseButton';
import { ProgressBar } from './ProgressBar';
import { getIcon } from './Icons';
export var Toast = function (props) {
  var _a, _b, _c;
  var _d = useToast(props),
    isRunning = _d.isRunning,
    preventExitTransition = _d.preventExitTransition,
    toastRef = _d.toastRef,
    eventHandlers = _d.eventHandlers,
    playToast = _d.playToast;
  var closeButton = props.closeButton,
    children = props.children,
    autoClose = props.autoClose,
    onClick = props.onClick,
    type = props.type,
    hideProgressBar = props.hideProgressBar,
    closeToast = props.closeToast,
    Transition = props.transition,
    position = props.position,
    className = props.className,
    style = props.style,
    bodyClassName = props.bodyClassName,
    bodyStyle = props.bodyStyle,
    progressClassName = props.progressClassName,
    progressStyle = props.progressStyle,
    updateId = props.updateId,
    role = props.role,
    progress = props.progress,
    rtl = props.rtl,
    toastId = props.toastId,
    deleteToast = props.deleteToast,
    isIn = props.isIn,
    isLoading = props.isLoading,
    closeOnClick = props.closeOnClick,
    theme = props.theme,
    comeFrom = props.comeFrom,
    leaveFrom = props.leaveFrom;
  var defaultClassName = cx(
    ''.concat('Toastify' /* Default.CSS_NAMESPACE */, '__toast'),
    ''
      .concat('Toastify' /* Default.CSS_NAMESPACE */, '__toast-theme--')
      .concat(theme),
    ''.concat('Toastify' /* Default.CSS_NAMESPACE */, '__toast--').concat(type),
    ((_a = {}),
    (_a[''.concat('Toastify' /* Default.CSS_NAMESPACE */, '__toast--rtl')] =
      rtl),
    _a),
    ((_b = {}),
    (_b[
      ''.concat(
        'Toastify' /* Default.CSS_NAMESPACE */,
        '__toast--close-on-click'
      )
    ] = closeOnClick),
    _b)
  );
  var cssClasses = isFn(className)
    ? className({
        rtl: rtl,
        position: position,
        type: type,
        defaultClassName: defaultClassName,
        className: className
      })
    : cx(defaultClassName, className);
  var icon = getIcon(props);
  var isProgressControlled = !!progress || !autoClose;
  var closeButtonProps = { closeToast: closeToast, type: type, theme: theme };
  var Close = null;
  if (closeButton === false) {
    // hide
  } else if (isFn(closeButton)) {
    Close = closeButton(closeButtonProps);
  } else if (isValidElement(closeButton)) {
    Close = cloneElement(closeButton, closeButtonProps);
  } else {
    Close = CloseButton(closeButtonProps);
  }
  return React.createElement(
    Transition,
    {
      isIn: isIn,
      done: deleteToast,
      position: position,
      preventExitTransition: preventExitTransition,
      nodeRef: toastRef,
      playToast: playToast,
      comeFrom: comeFrom,
      leaveFrom: leaveFrom
    },
    React.createElement(
      'div',
      __assign(
        {
          id: toastId,
          onClick: onClick,
          'data-in': isIn,
          className: cssClasses
        },
        eventHandlers,
        { style: style, ref: toastRef }
      ),
      React.createElement(
        'div',
        __assign({}, isIn && { role: role }, {
          className: isFn(bodyClassName)
            ? bodyClassName({ type: type })
            : cx(
                ''.concat(
                  'Toastify' /* Default.CSS_NAMESPACE */,
                  '__toast-body'
                ),
                bodyClassName
              ),
          style: bodyStyle
        }),
        icon != null &&
          React.createElement(
            'div',
            {
              className: cx(
                ''.concat(
                  'Toastify' /* Default.CSS_NAMESPACE */,
                  '__toast-icon'
                ),
                ((_c = {}),
                (_c[
                  ''
                    .concat(
                      'Toastify' /* Default.CSS_NAMESPACE */,
                      '--animate-icon '
                    )
                    .concat(
                      'Toastify' /* Default.CSS_NAMESPACE */,
                      '__zoom-enter'
                    )
                ] = !isLoading),
                _c)
              )
            },
            icon
          ),
        React.createElement('div', null, children)
      ),
      Close,
      React.createElement(
        ProgressBar,
        __assign(
          {},
          updateId && !isProgressControlled
            ? { key: 'pb-'.concat(updateId) }
            : {},
          {
            rtl: rtl,
            theme: theme,
            delay: autoClose,
            isRunning: isRunning,
            isIn: isIn,
            closeToast: closeToast,
            hide: hideProgressBar,
            type: type,
            style: progressStyle,
            className: progressClassName,
            controlledProgress: isProgressControlled,
            progress: progress || 0
          }
        )
      )
    )
  );
};
//# sourceMappingURL=Toast.js.map
