import eventManager from './utils/eventManager';
import { POSITION, TYPE, ACTION } from './utils/constant';

let container = null;
let queue = [];
let toastId = 0;
const noop = () => false;

/**
 * Merge provided options with the defaults settings and generate the toastId
 */
function mergeOptions(options, type) {
  return { ...options, type, toastId: generateToastId(options) };
}

/**
 * Generate the toastId either automatically or by provided toastId
 */
function generateToastId(options) {
  if (
    options &&
    ((typeof options.toastId === 'number' && !isNaN(options.toastId)) ||
      typeof options.toastId === 'string')
  ) {
    return options.toastId;
  }

  return ++toastId;
}

/**
 * Dispatch toast. If the container is not mounted, the toast is enqueued
 */
function emitEvent(content, options) {
  if (container !== null) {
    eventManager.emit(ACTION.SHOW, content, options);
  } else {
    queue.push({ action: ACTION.SHOW, content, options });
  }

  return options.toastId;
}

const toast = Object.assign(
  (content, options) =>
    emitEvent(
      content,
      mergeOptions(options, (options && options.type) || TYPE.DEFAULT)
    ),
  {
    success: (content, options) =>
      emitEvent(content, mergeOptions(options, TYPE.SUCCESS)),
    info: (content, options) =>
      emitEvent(content, mergeOptions(options, TYPE.INFO)),
    warn: (content, options) =>
      emitEvent(content, mergeOptions(options, TYPE.WARNING)),
    warning: (content, options) =>
      emitEvent(content, mergeOptions(options, TYPE.WARNING)),
    error: (content, options) =>
      emitEvent(content, mergeOptions(options, TYPE.ERROR)),
    dismiss: (id = null) => container && eventManager.emit(ACTION.CLEAR, id),
    isActive: noop,
    update(toastId, options) {
      setTimeout(() => {
        if (container && typeof container.collection[toastId] !== 'undefined') {
          const {
            options: oldOptions,
            content: oldContent
          } = container.collection[toastId];
          const updateId = oldOptions.updateId ? oldOptions.updateId + 1 : 1;

          const nextOptions = {
            ...oldOptions,
            ...options,
            toastId,
            updateId
          };

          const content =
            typeof nextOptions.render !== 'undefined'
              ? nextOptions.render
              : oldContent;
          delete nextOptions.render;
          emitEvent(content, nextOptions);
        }
      }, 0);
    },
    onChange(callback) {
      if (typeof callback === 'function') {
        eventManager.on(ACTION.ON_CHANGE, callback);
      }
    },
    POSITION,
    TYPE
  }
);

/**
 * Wait until the ToastContainer is mounted to dispatch the toast
 * and attach isActive method
 */
eventManager
  .on(ACTION.DID_MOUNT, containerInstance => {
    container = containerInstance;
    toast.isActive = id => container.isToastActive(id);

    queue.forEach(item => {
      eventManager.emit(item.action, item.content, item.options);
    });

    queue = [];
  })
  .on(ACTION.WILL_UNMOUNT, () => {
    container = null;
    toast.isActive = noop;
    toastId = 0;
  });

export default toast;
