import { isValidElement } from 'react';

export const isNum = <T>(v: T) => typeof v === 'number' && !isNaN(v);
export const isBool = <T>(v: T) => typeof v === 'boolean';
export const isStr = <T>(v: T) => typeof v === 'string';
export const isFn = <T>(v: T) => typeof v === 'function';

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

export function parseClassName(prop?: string | object | null) {
  if (typeof prop === 'string') {
    return prop;
  } else if (prop !== null && typeof prop === 'object' && 'toString' in prop) {
    return prop.toString();
  }
 return null;
}
