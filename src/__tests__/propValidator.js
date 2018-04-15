/* eslint-env jest */
import React from 'react';
import {
  falseOrElement,
  falseOrDelay,
  objectValues
} from './../utils/propValidator';

const ValidReactElement = () => <div>Hello</div>;

describe('Custom PropTypes', () => {
  describe('falseOrDelay', () => {
    it('Can be false or int', () => {
      const props = { autoClose: false };
      expect(falseOrDelay(props, 'autoClose', 'TestComponent')).toBe(null);
      props.autoClose = 1000;
      expect(falseOrDelay(props, 'autoClose', 'TestComponent')).toBe(null);
    });

    it('Should return an Error if int is <= 0 or prop equal to true', () => {
      const props = { autoClose: true };
      expect(falseOrDelay(props, 'autoClose', 'TestComponent')).toBeInstanceOf(
        Error
      );

      props.autoClose = -1;
      expect(falseOrDelay(props, 'autoClose', 'TestComponent')).toBeInstanceOf(
        Error
      );

      props.autoClose = 0;
      expect(falseOrDelay(props, 'autoClose', 'TestComponent')).toBeInstanceOf(
        Error
      );
    });
  });

  describe('falseOrElement', () => {
    it('Can be false or a valid react element', () => {
      const props = { closeButton: false };
      expect(falseOrElement(props, 'closeButton', 'TestComponent')).toBe(null);
      props.closeButton = <ValidReactElement />;
      expect(falseOrElement(props, 'closeButton', 'TestComponent')).toBe(null);
    });

    it('Should return an Error if prop equal true or not a valid react element', () => {
      const props = { closeButton: true };
      expect(
        falseOrElement(props, 'closeButton', 'TestComponent')
      ).toBeInstanceOf(Error);

      props.closeButton = 'coucou';
      expect(
        falseOrElement(props, 'closeButton', 'TestComponent')
      ).toBeInstanceOf(Error);
    });
  });
  describe('Can be set as Required', () => {
    it('Should return an Error if the prop is required but undefined', () => {
      const props = {};

      expect(
        falseOrDelay.isRequired(props, 'autoClose', 'TestComponent')
      ).toBeInstanceOf(Error);
      expect(
        falseOrElement.isRequired(props, 'closeButton', 'TestComponent')
      ).toBeInstanceOf(Error);
    });
  });
  describe('ObjectValues', () => {
    it('Should return the values contained in an Object', () => {
      expect(objectValues({ a: 1, b: 3 })).toMatchObject([1, 3]);
    });
  });
});
