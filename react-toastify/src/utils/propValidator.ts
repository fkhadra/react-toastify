import { isValidElement } from 'react';

export function isValidDelay<T>(val: T): boolean {
  return typeof val === 'number' && !isNaN(val) && val > 0;
}

export function objectValues<T>(obj: Record<string, T>) {
  return Object.keys(obj).map(key => obj[key]);
}

export const canUseDom = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

// function withRequired(fn) {
//   if (process.env.NODE_ENV === 'development') {
//     fn.isRequired = function(props, propName, componentName) {
//       const prop = props[propName];

//       if (typeof prop === 'undefined') {
//         return new Error(`The prop ${propName} is marked as required in
//         ${componentName}, but its value is undefined.`);
//       }

//       fn(props, propName, componentName);
//     };
//   }
//   return fn;
// }

// export const falseOrDelay = withRequired((props, propName, componentName) => {
//   const prop = props[propName];

//   if (prop !== false && !isValidDelay(prop)) {
//     return new Error(`${componentName} expect ${propName}
//       to be a valid Number > 0 or equal to false. ${prop} given.`);
//   }

//   return null;
// });

export function canBeRendered<T>(content: T): boolean {
  return (
    isValidElement(content) ||
    typeof content === 'string' ||
    typeof content === 'number' ||
    typeof content === 'function'
  );
}

export function parseClassName(prop: string | object) {
  if (typeof prop === 'string') {
    return prop;
  } else if (prop !== null && typeof prop === 'object' && 'toString' in prop) {
    return prop.toString();
  }

  return null;
}
