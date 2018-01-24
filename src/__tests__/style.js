import defaultStyle, { defineStyle } from './../defaultStyle';

const defaultValues = { ...defaultStyle };

afterEach(() => defineStyle(defaultValues));

describe('style', () => {
  it('Should be able to mutate style', () => {
    expect(defaultStyle.width).toBe('320px');
    defineStyle({
      width: '100px'
    });
    expect(defaultStyle.width).toBe('100px');
  });
});
