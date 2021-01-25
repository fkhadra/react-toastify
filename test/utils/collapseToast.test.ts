import { collapseToast } from '../../src/utils';

beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    callback(1);
    return 1;
  });
});

afterEach(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
});

jest.useFakeTimers();

describe('collapseToast function', () => {
  it('Should handle dom element collapsing', () => {
    const done = jest.fn();
    const node = document.createElement('div');
    const propertiesToCheck = [
      'height',
      'padding',
      'margin',
      'min-height',
      'transition'
    ];

    // ensure that there is no style set
    propertiesToCheck.forEach(prop => {
      expect(node.style.getPropertyValue(prop).length).toBe(0);
    });

    collapseToast(node, done);
    jest.runAllTimers();

    propertiesToCheck.forEach(prop => {
      expect(node.style.getPropertyValue(prop).length).toBeGreaterThan(0);
    });

    expect(done).toHaveBeenCalled();
  });
});
