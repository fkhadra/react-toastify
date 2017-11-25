/*
* TODO: Add validation here :
*   - Validate type
*   - Maybe autoClose
*   - Maybe closeButton as well
* */
import EventManager from './util/EventManager';
import { POSITION, TYPE, ACTION } from './constant';

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
  transition: null
};

let container = null;
let queue = [];
let toastId = 0;

/**
 * Merge provided options with the defaults settings and generate the toastId
 * @param {*} options
 */
function mergeOptions(options) {
  return Object.assign({}, defaultOptions, options, { toastId: ++toastId });
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
  (content, options) => emitEvent(content, mergeOptions(options)),
  {
    success: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.SUCCESS })),
    info: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.INFO })),
    warn: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.WARNING })),
    warning: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.WARNING })),
    error: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.ERROR })),
    dismiss: (id = null) => container && EventManager.emit(ACTION.CLEAR, id),
    isActive: () => false
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
