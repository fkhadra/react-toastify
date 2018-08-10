const eventManager = {
  list: new Map(),

  on(event, callback) {
    this.list.has(event) || this.list.set(event, []);

    this.list.get(event).push(callback);

    return this;
  },

  off(event = null) {
    this.list.delete(event);
    return this;
  },

  emit(event, ...args) {
    if (!this.list.has(event)) {
      return false;
    }

    for (const callback of this.list.get(event)) {
      setTimeout(() => callback.call(this, ...args), 0);
    }

    return true;
  }
};

export default eventManager;
