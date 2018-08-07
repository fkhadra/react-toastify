const eventManager = {
  list: new Map(),

  on(event, callback) {
    this.list.has(event) || this.list.set(event, []);

    this.list.get(event).push(callback);

    return this;
  },

  clear() {
    this.list = new Map();
  },

  emit(event, ...args) {
    if (!this.list.has(event)) {
      return false;
    }

    this.list
      .get(event)
      .forEach(callback => setTimeout(() => callback.call(this, ...args), 0));

    return true;
  }
};

export default eventManager;
