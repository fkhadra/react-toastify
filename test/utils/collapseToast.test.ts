import { collapseToast } from '../../src/utils';

beforeEach(() => {
  // @ts-ignore
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
  // @ts-ignore
  window.requestAnimationFrame.mockRestore();
});

describe('collapseToast function', () => {
  it('Should handle collapse function', () => {
    const done = jest.fn();
    const node = document.createElement('div');
    const addEvent = jest.fn((_, fn) => {
      fn();
    });
    const removeEvent = jest.fn();

    node.addEventListener = addEvent;
    node.removeEventListener = removeEvent;

    collapseToast(node, done);

    expect(addEvent).toHaveBeenCalled();
    expect(removeEvent).toHaveBeenCalled();
    expect(done).toHaveBeenCalled();
  });
});
