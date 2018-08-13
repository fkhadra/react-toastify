/* eslint-env jest */
import eventManager from './../../utils/eventManager';

jest.useFakeTimers();

describe('EventManager', () => {
  it('Should be able to bind an event', () => {
    eventManager.on('foo', () => {});

    expect(eventManager.list.has('foo')).toBe(true);
  });

  it('Should be able to emit event', () => {
    const cb = jest.fn();

    eventManager.on('foo', cb);
    expect(cb).not.toHaveBeenCalled();

    eventManager.emit('foo');
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });

  it('Should return false when trying to call unbound event', () => {
    const id = eventManager.emit('bar');
    jest.runAllTimers();
    expect(id).toBe(false);
  });

  it('Should be able to remove event', () => {
    eventManager.on('foo', () => {});
    expect(eventManager.list.size).toBe(1);

    eventManager.off('foo');
    expect(eventManager.list.size).toBe(0);
  });
});
