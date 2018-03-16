/* eslint-env jest */
import EventManager from './../utils/EventManager';

jest.useFakeTimers();

describe('EventManager', () => {
  it('Should be able to bind an event', () => {
    EventManager.on('foo', () => {});

    expect(EventManager.eventList.has('foo')).toBe(true);
  });

  it('Should be able to emit event', () => {
    const cb = jest.fn();

    EventManager.on('foo', cb);
    expect(cb).not.toHaveBeenCalled();

    EventManager.emit('foo');
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });

  it('Should return false when trying to call unbound event', () => {
    const id = EventManager.emit('bar');
    jest.runAllTimers();
    expect(id).toBe(false);
  });

  it('Should remove the given event', () => {
    EventManager.on('foo', () => {});
    expect(EventManager.eventList.size).toBe(1);

    EventManager.off('foo');
    expect(EventManager.eventList.size).toBe(0);
  });

  it('Should not remove event if none is passed to off', () => {
    EventManager.on('foo', () => {});
    EventManager.on('foobar', () => {});
    expect(EventManager.eventList.size).toBe(2);

    EventManager.off();
    expect(EventManager.eventList.size).toBe(2);
  });
});
