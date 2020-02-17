import { isValidElement } from 'react';

export const isNum = (v: any): v is Number =>
  typeof v === 'number' && !isNaN(v);
export const isBool = (v: any): v is Boolean => typeof v === 'boolean';
export const isStr = (v: any): v is String => typeof v === 'string';
export const isFn = (v: any): v is Function => typeof v === 'function';

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
    // TODO: Check if allowing object is still relevant
  } else if (prop !== null && typeof prop === 'object' && 'toString' in prop) {
    return prop.toString();
  }
  return null;
}
