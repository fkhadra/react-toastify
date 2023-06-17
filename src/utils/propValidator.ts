import { isValidElement } from 'react';
import { Id } from '../types';

export const isNum = (v: any): v is Number =>
  typeof v === 'number' && !isNaN(v);

export const isStr = (v: any): v is String => typeof v === 'string';

export const isFn = (v: any): v is Function => typeof v === 'function';

export const isId = (v: unknown): v is Id => isStr(v) || isNum(v);

export const parseClassName = (v: any) => (isStr(v) || isFn(v) ? v : null);

export const getAutoCloseDelay = (
  toastAutoClose?: false | number,
  containerAutoClose?: false | number
) =>
  toastAutoClose === false || (isNum(toastAutoClose) && toastAutoClose > 0)
    ? toastAutoClose
    : containerAutoClose;

export const canBeRendered = <T>(content: T): boolean =>
  isValidElement(content) || isStr(content) || isFn(content) || isNum(content);
