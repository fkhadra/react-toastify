/* eslint-env jest */
import { falseOrDelay, objectValues } from './../../utils';

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

  describe('Can be set as Required', () => {
    it('Should return an Error if the prop is required but undefined', () => {
      const props = {};

      expect(
        falseOrDelay.isRequired(props, 'autoClose', 'TestComponent')
      ).toBeInstanceOf(Error);
    });
  });
  describe('ObjectValues', () => {
    it('Should return the values contained in an Object', () => {
      expect(objectValues({ a: 1, b: 3 })).toMatchObject([1, 3]);
    });
  });
});
