import { isValidElement } from 'react';

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
  return typeof v === 'string' ? v : null;
}

export function objectValues<T>(obj: Record<string, T>) {
  return Object.keys(obj).map(key => obj[key]);
}

export const canUseDom = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function canBeRendered<T>(content: T): boolean {
  return (
    isValidElement(content) ||
    typeof content === 'string' ||
    typeof content === 'number' ||
    typeof content === 'function'
  );
}
