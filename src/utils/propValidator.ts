import { isValidElement } from 'react';

import { Id } from '../types';

export function isNum(v: any): v is Number {
  return typeof v === 'number' && !isNaN(v);
}

export function isBool(v: any): v is Boolean {
  return typeof v === 'boolean';
}

export function isStr(v: any): v is String {
  return typeof v === 'string';
}

export function isFn(v: any): v is Function {
  return typeof v === 'function';
}

export function parseClassName(v: any) {
  return isStr(v) || isFn(v) ? v : null;
}

export function objectValues<T>(obj: Record<string, T>) {
  return Object.keys(obj).map(key => obj[key]);
}

export function hasToastId(toastId?: Id) {
  return toastId === 0 || toastId;
}

export function getAutoCloseDelay(
  toastAutoClose?: false | number,
  containerAutoClose?: false | number
) {
  return toastAutoClose === false ||
    (isNum(toastAutoClose) && toastAutoClose > 0)
    ? toastAutoClose
    : containerAutoClose;
}

export const canUseDom = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function canBeRendered<T>(content: T): boolean {
  return (
    isValidElement(content) || isStr(content) || isFn(content) || isNum(content)
  );
}
