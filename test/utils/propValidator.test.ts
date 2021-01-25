import { parseClassName } from '../../src/utils';

describe('Validator', () => {


  describe("parseClassName", () => {
    it("Should return a string if input is a string", () => {
      expect(parseClassName('foo')).toBe('foo');
    });

    it("Should return null on invalid input", () => {
      // @ts-ignore
      expect(parseClassName(113123412)).toBe(null);
    })
  })
});
