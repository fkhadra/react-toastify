
const eventManager = {
  eventList: new Map(),

  /**
   * Bind event
   *
   * @param event
   * @param callback
   * @param context
   * @returns {eventManager.on}
   */
  on(event, callback, context = null) {
    this.eventList.has(event) || this.eventList.set(event, []);

    this.eventList.get(event).push({
      callback,
      context: context || this
    });

    return this;
  },

  /**
   * Unbind events
   * Strict comparison voluntary omitted to check both null and undefined
   *
   * @param event
   * @param callback
   * @returns {boolean}
   */
  off(event = null, callback = null) {
    if (event != null && callback == null) {
      return this.eventList.delete(event);
    } else if (event != null && callback != null) {
      const listeners = this.eventList.get(event);

      this.eventList.set(event, listeners.filter(el =>
        !(el.callback === callback || el.callback.toString() === callback.toString())
      ));
      listeners.length > 0 || this.eventList.delete(event);

      return true;
    } else if (event === null && callback === null) {
      this.eventList.clear();
      return true;
    }
    return false;
  },
  /**
   * @param event
   * @param callback
   * @param context
   * @returns {eventManager.once}
   */
  once(event, callback, context) {
    this.on(event, callback, context);
    const listener = this.eventList.get(event);
    const idx = listener.length - 1;
    listener[idx].once = true;
    return this;
  },
  /**
   * @param event
   * @param args
   * @returns {boolean}
   */
  emit(event, ...args) {
    if (!this.eventList.has(event)) {
      /* eslint no-console: 0 */
      console.warn(`<${event}> Event is not registered. Did you forgot to bind the event ?`);
      return false;
    }
    const listeners = this.eventList.get(event);

    this.eventList.set(event, listeners.filter(listener => {
      listener.callback.call(listener.context, ...args);
      return !listener.once;
    }));

    return true;
  }
};

export default eventManager;
