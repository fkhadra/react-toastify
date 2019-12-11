export const eventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on(event, callback) {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event).push(callback);
    return this;
  },

  off(event) {
    this.list.delete(event);
    return this;
  },

  cancelEmit(event) {
    const timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach(timer => clearTimeout(timer));
      this.emitQueue.delete(event);
    }

    return this;
  },

  /**
   * Enqueue the event at the end of the call stack
   * Doing so let the user call toast as follow:
   * toast('1')
   * toast('2')
   * toast('3')
   * Without setTimemout the code above will not work
   */
  emit(event, ...args) {
    this.list.has(event) &&
      this.list.get(event).forEach(callback => {
        const timer = setTimeout(() => {
          callback(...args);
        }, 0);

        this.emitQueue.has(event) || this.emitQueue.set(event, []);
        this.emitQueue.get(event).push(timer);
      });
  }
};
