import { isValidElement } from 'react';
export var isNum = function (v) {
  return typeof v === 'number' && !isNaN(v);
};
export var isStr = function (v) {
  return typeof v === 'string';
};
export var isFn = function (v) {
  return typeof v === 'function';
};
export var isId = function (v) {
  return isStr(v) || isNum(v);
};
export var parseClassName = function (v) {
  return isStr(v) || isFn(v) ? v : null;
};
export var getAutoCloseDelay = function (toastAutoClose, containerAutoClose) {
  return toastAutoClose === false ||
    (isNum(toastAutoClose) && toastAutoClose > 0)
    ? toastAutoClose
    : containerAutoClose;
};
export var canBeRendered = function (content) {
  return (
    isValidElement(content) || isStr(content) || isFn(content) || isNum(content)
  );
};
//# sourceMappingURL=propValidator.js.map
