import { isValidElement } from 'react';

export function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export function isNumber(val) {
  return typeOf(val) === 'Number' && !isNaN(val);
}

export function falseOrNumber(props, propName, componentName) {
  const prop = props[propName];
  console.log('Num:' + typeOf(prop));
  if (prop !== false || typeOf(prop) !== 'Number') {
    return new Error(`${componentName} expect ${propName} 
      to be a valid Number or equal to false. ${prop} given.`);
  }

  return null;
}

export function falseOrElement(props, propName, componentName) {
  const prop = props[propName];
  if (prop !== false || !isValidElement(prop) || prop !== null) {
    return new Error(`${componentName} expect ${propName} 
      to be a valid react element or equal to false. ${prop} given.`);
  }

  return null;
}

export function falsy(props, propName, componentName) {
  const prop = props[propName];
  if (prop !== false ) {
    return new Error(`${componentName} expect ${propName} 
      to be a valid react element or equal to false. ${prop} given.`);
  }

  return null;
}
