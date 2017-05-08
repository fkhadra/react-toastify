import { isValidElement } from 'react';

export function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export function isValidDelay(val) {
  return typeOf(val) === 'Number' && !isNaN(val) && val > 0;
}

function withRequired(fn) {
  fn.isRequired = function (props, propName, componentName) {
    const prop = props[propName];

    if (typeof prop === 'undefined') {
      return new Error(`The prop ${propName} is marked as required in 
      ${componentName}, but its value is undefined.`);
    }

    fn(props, propName, componentName);
  };
  return fn;
}

/**
 * TODO: Maybe rethink about the name
 */
export const falseOrNumber = withRequired(
  (props, propName, componentName) => {
    const prop = props[propName];

    if (prop !== false && !isValidDelay(prop)) {
      return new Error(`${componentName} expect ${propName} 
      to be a valid Number > 0 or equal to false. ${prop} given.`);
    }

    return null;
  }
);

export const falseOrElement = withRequired(
  (props, propName, componentName) => {
    const prop = props[propName];

    if (prop !== false && !isValidElement(prop)) {
      return new Error(`${componentName} expect ${propName} 
      to be a valid react element or equal to false. ${prop} given.`);
    }

    return null;
  }
);
