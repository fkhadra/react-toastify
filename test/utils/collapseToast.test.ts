import { collapseToast } from '../../src/utils';

beforeEach(() => {
  // @ts-ignore
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
  // @ts-ignore
  window.requestAnimationFrame.mockRestore();
});

jest.useFakeTimers();

describe('collapseToast function', () => {
  it('Should handle collapse function', () => {
    const done = jest.fn();
    const node = document.createElement('div');


    collapseToast(node, done);
    jest.runAllTimers();

    expect(done).toHaveBeenCalled();
  });
});
