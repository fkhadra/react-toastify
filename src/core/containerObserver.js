import { __assign, __spreadArray } from 'tslib';
import { cloneElement, isValidElement } from 'react';
import {
  canBeRendered,
  getAutoCloseDelay,
  isFn,
  isNum,
  isStr,
  parseClassName,
  toToastItem
} from '../utils';
export function createContainerObserver(id, containerProps, dispatchChanges) {
  var toastKey = 1;
  var toastCount = 0;
  var queue = [];
  var activeToasts = [];
  var snapshot = [];
  var props = containerProps;
  var toasts = new Map();
  var listeners = new Set();
  var observe = function (notify) {
    listeners.add(notify);
    return function () {
      return listeners.delete(notify);
    };
  };
  var notify = function () {
    snapshot = Array.from(toasts.values());
    listeners.forEach(function (cb) {
      return cb();
    });
  };
  var shouldIgnoreToast = function (_a) {
    var containerId = _a.containerId,
      toastId = _a.toastId,
      updateId = _a.updateId;
    var containerMismatch = containerId ? containerId !== id : id !== 1;
    var isDuplicate = toasts.has(toastId) && updateId == null;
    return containerMismatch || isDuplicate;
  };
  var toggle = function (v, id) {
    toasts.forEach(function (t) {
      if (id == null || id === t.props.toastId) isFn(t.toggle) && t.toggle(v);
    });
  };
  var removeToast = function (id) {
    activeToasts =
      id == null
        ? []
        : activeToasts.filter(function (v) {
            return v !== id;
          });
    notify();
  };
  var clearQueue = function () {
    toastCount -= queue.length;
    queue = [];
  };
  var addActiveToast = function (toast) {
    var _a = toast.props,
      toastId = _a.toastId,
      onOpen = _a.onOpen,
      updateId = _a.updateId,
      children = _a.children;
    var isNew = updateId == null;
    if (toast.staleId) toasts.delete(toast.staleId);
    toasts.set(toastId, toast);
    activeToasts = __spreadArray(
      __spreadArray([], activeToasts, true),
      [toast.props.toastId],
      false
    ).filter(function (v) {
      return v !== toast.staleId;
    });
    notify();
    dispatchChanges(toToastItem(toast, isNew ? 'added' : 'updated'));
    if (isNew && isFn(onOpen))
      onOpen(isValidElement(children) && children.props);
  };
  var buildToast = function (content, options) {
    if (shouldIgnoreToast(options)) return;
    var toastId = options.toastId,
      updateId = options.updateId,
      data = options.data,
      staleId = options.staleId,
      delay = options.delay;
    var closeToast = function () {
      removeToast(toastId);
    };
    var isNotAnUpdate = updateId == null;
    if (isNotAnUpdate) toastCount++;
    var toastProps = __assign(
      __assign(
        __assign(__assign({}, props), {
          style: props.toastStyle,
          key: toastKey++
        }),
        Object.fromEntries(
          Object.entries(options).filter(function (_a) {
            var _ = _a[0],
              v = _a[1];
            return v != null;
          })
        )
      ),
      {
        toastId: toastId,
        updateId: updateId,
        data: data,
        closeToast: closeToast,
        isIn: false,
        className: parseClassName(options.className || props.toastClassName),
        bodyClassName: parseClassName(
          options.bodyClassName || props.bodyClassName
        ),
        progressClassName: parseClassName(
          options.progressClassName || props.progressClassName
        ),
        autoClose: options.isLoading
          ? false
          : getAutoCloseDelay(options.autoClose, props.autoClose),
        deleteToast: function () {
          var toastToRemove = toasts.get(toastId);
          var _a = toastToRemove.props,
            onClose = _a.onClose,
            children = _a.children;
          if (isFn(onClose))
            onClose(isValidElement(children) && children.props);
          dispatchChanges(toToastItem(toastToRemove, 'removed'));
          toasts.delete(toastId);
          toastCount--;
          if (toastCount < 0) toastCount = 0;
          if (queue.length > 0) {
            addActiveToast(queue.shift());
            return;
          }
          notify();
        }
      }
    );
    toastProps.closeButton = props.closeButton;
    if (options.closeButton === false || canBeRendered(options.closeButton)) {
      toastProps.closeButton = options.closeButton;
    } else if (options.closeButton === true) {
      toastProps.closeButton = canBeRendered(props.closeButton)
        ? props.closeButton
        : true;
    }
    var toastContent = content;
    if (isValidElement(content) && !isStr(content.type)) {
      toastContent = cloneElement(content, {
        closeToast: closeToast,
        toastProps: toastProps,
        data: data
      });
    } else if (isFn(content)) {
      toastContent = content({
        closeToast: closeToast,
        toastProps: toastProps,
        data: data
      });
    }
    var activeToast = {
      content: toastContent,
      props: toastProps,
      staleId: staleId
    };
    // not handling limit + delay by design. Waiting for user feedback first
    if (
      props.limit &&
      props.limit > 0 &&
      toastCount > props.limit &&
      isNotAnUpdate
    ) {
      queue.push(activeToast);
    } else if (isNum(delay)) {
      setTimeout(function () {
        addActiveToast(activeToast);
      }, delay);
    } else {
      addActiveToast(activeToast);
    }
  };
  return {
    id: id,
    props: props,
    observe: observe,
    toggle: toggle,
    removeToast: removeToast,
    toasts: toasts,
    clearQueue: clearQueue,
    buildToast: buildToast,
    setProps: function (p) {
      props = p;
    },
    setToggle: function (id, fn) {
      toasts.get(id).toggle = fn;
    },
    isToastActive: function (id) {
      return activeToasts.some(function (v) {
        return v === id;
      });
    },
    getSnapshot: function () {
      return props.newestOnTop ? snapshot.reverse() : snapshot;
    }
  };
}
//# sourceMappingURL=containerObserver.js.map
