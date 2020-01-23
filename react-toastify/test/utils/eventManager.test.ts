import { eventManager, Event } from '../../src/utils';

jest.useFakeTimers();

const eventList: Event[] = [
  'show',
  'clear',
  'didMount',
  'willUnmount',
  'change'
];

beforeEach(() => {
  eventManager.list.clear();
  eventManager.emitQueue.clear();
});

describe('EventManager', () => {
  it('Should be able to listen for an event', () => {
    eventManager
      .on('change', () => {})
      .on('clear', () => {})
      .on('didMount', () => {})
      .on('willUnmount', () => {})
      .on('show', () => {});

    for (const event of eventList) {
      expect(eventManager.list.has(event)).toBe(true);
    }
  });

  it('Should be able to emit event', () => {
    const cb = jest.fn();

    eventManager.on('change', cb);
    expect(cb).not.toHaveBeenCalled();

    eventManager.emit('change', 1);
    jest.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });

  it('Should be possible to cancel event by kind', () => {
    const cb = jest.fn();
    eventManager.on('change', cb);
    eventManager.emit('change', 1);
    eventManager.cancelEmit('change');
    jest.runAllTimers();
    expect(cb).not.toHaveBeenCalled();
  });

  it('Should be able to remove event', () => {
    eventManager.on('change', () => {});
    expect(eventManager.list.size).toBe(1);

    eventManager.off('change');
    expect(eventManager.list.size).toBe(0);
  });
});
