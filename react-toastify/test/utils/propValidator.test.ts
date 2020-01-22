import { isValidDelay, objectValues } from '../../src/utils';

describe('Validator', () => {
  describe('isValidDelay', () => {
    it('Should return true only for positive number', () => {
      for (const value of [-1, '100', NaN, () => {}]) {
        expect(isValidDelay(value)).toBe(false);
      }
      expect(isValidDelay(200)).toBe(true);
    });
  });

  describe('objectValues', () => {
    it('Should return the values hold by an object', () => {
      expect(objectValues({ a: 1, b: 3 })).toMatchObject([1, 3]);
    });
  });
});
