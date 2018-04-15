import EventManager from './utils/EventManager';
import { POSITION, TYPE, ACTION } from './utils/constant';

const defaultOptions = {
  type: TYPE.DEFAULT,
  autoClose: null,
  closeButton: null,
  hideProgressBar: null,
  position: null,
  pauseOnHover: null,
  closeOnClick: null,
  className: null,
  bodyClassName: null,
  progressClassName: null,
  transition: null,
  updateId: null,
  draggable: null
};

let container = null;
let queue = [];
let toastId = 0;

/**
 * Merge provided options with the defaults settings and generate the toastId
 * @param {*} options
 */
function mergeOptions(options, type) {
  return Object.assign({}, defaultOptions, options, {
    type: type,
    toastId: ++toastId
  });
}

/**
 * Dispatch toast. If the container is not mounted, the toast is enqueued
 * @param {*} content
 * @param {*} options
 */
function emitEvent(content, options) {
  if (container !== null) {
    EventManager.emit(ACTION.SHOW, content, options);
  } else {
    queue.push({ action: ACTION.SHOW, content, options });
  }

  return options.toastId;
}

const toaster = Object.assign(
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
    dismiss: (id = null) => container && EventManager.emit(ACTION.CLEAR, id),
    isActive: () => false,
    update(id, options) {
      setTimeout(() => {
        if (container && typeof container.collection[id] !== 'undefined') {
          const {
            options: oldOptions,
            content: oldContent
          } = container.collection[id];
          const updateId =
            oldOptions.updateId !== null ? oldOptions.updateId + 1 : 1;

          const nextOptions = Object.assign({}, oldOptions, options, {
            toastId: id,
            updateId: updateId
          });
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
        EventManager.on(ACTION.ON_CHANGE, callback);
      }
    }
  },
  {
    POSITION,
    TYPE
  }
);

/**
 * Wait until the ToastContainer is mounted to dispatch the toast
 * and attach isActive method
 */
EventManager.on(ACTION.MOUNTED, containerInstance => {
  container = containerInstance;

  toaster.isActive = id => container.isToastActive(id);

  queue.forEach(item => {
    EventManager.emit(item.action, item.content, item.options);
  });
  queue = [];
});

export default toaster;
