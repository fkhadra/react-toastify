import { eventManager, Event } from '../../src/core';

jest.useFakeTimers();

const eventList: Event[] = [
  Event.Change,
  Event.Clear,
  Event.DidMount,
  Event.Show,
  Event.WillUnmount
];

beforeEach(() => {
  eventManager.list.clear();
  eventManager.emitQueue.clear();
});

describe('EventManager', () => {
  it('Should be able to listen for an event', () => {
    eventManager
      .on(Event.Change, () => {})
      .on(Event.Clear, () => {})
      .on(Event.DidMount, () => {})
      .on(Event.WillUnmount, () => {})
      .on(Event.Show, () => {});

    for (const event of eventList) {
      expect(eventManager.list.has(event)).toBe(true);
    }
  });

  it('Should be able to emit event', () => {
    const cb = jest.fn();

    eventManager.on(Event.Change, cb);
    expect(cb).not.toHaveBeenCalled();

    eventManager.emit(Event.Change, 1);
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });

  it('Should be possible to remove a specific callback', () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    eventManager.on(Event.Change, cb1);
    eventManager.on(Event.Change, cb2);

    eventManager.emit(Event.Change, 1);
    jest.runAllTimers();

    expect(cb1).toHaveBeenCalled();
    expect(cb2).toHaveBeenCalled();

    eventManager.off(Event.Change, cb1);

    eventManager.emit(Event.Change, 1);
    jest.runAllTimers();

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(2);
  });

  it('Should be possible to cancel event by kind', () => {
    const cb = jest.fn();
    eventManager.on(Event.Change, cb);
    eventManager.emit(Event.Change, 1);
    eventManager.cancelEmit(Event.Change);
    jest.runAllTimers();
    expect(cb).not.toHaveBeenCalled();
  });

  it('Should be able to remove event', () => {
    eventManager.on(Event.Change, () => {});
    expect(eventManager.list.size).toBe(1);

    eventManager.off(Event.Change);
    expect(eventManager.list.size).toBe(0);
  });
});
