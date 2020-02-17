import { objectValues } from '../../src/utils';

describe('Validator', () => {
  describe('objectValues', () => {
    it('Should return the values hold by an object', () => {
      expect(objectValues({ a: 1, b: 3 })).toMatchObject([1, 3]);
    });
  });
});
