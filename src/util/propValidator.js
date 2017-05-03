import { isValidElement } from 'react';

export function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export function isNumber(val) {
  return typeOf(val) === 'Number' && !isNaN(val);
}

export function falseOrNumber(props, propName, componentName) {
  const prop = props[propName];

  if (prop !== false && !isNumber(prop) && prop > 0) {
    return new Error(`${componentName} expect ${propName} 
      to be a valid Number > 0 or equal to false. ${prop} given.`);
  }

  return null;
}

export function falseOrElement(props, propName, componentName) {
  const prop = props[propName];

  if (prop !== false && !isValidElement(prop)) {
    return new Error(`${componentName} expect ${propName} 
      to be a valid react element or equal to false. ${prop} given.`);
  }

  return null;
}
