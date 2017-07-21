/*
* TODO: Add validation here :
*   - Validate type
*   - Maybe autoClose
*   - Maybe closeButton as well
* */
import EventManager from './util/EventManager';
import config from './config';

const { POSITION, TYPE, ACTION } = config;

const defaultOptions = {
  type: TYPE.DEFAULT,
  autoClose: null,
  closeButton: null,
  hideProgressBar: null,
  position: null,
  pauseOnHover: null
};

let isContainerMounted = false;
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
 * Wait until the ToastContainer is mounted to dispatch the toast
 */
EventManager.on(ACTION.MOUNTED, () => {
  isContainerMounted = true;
  queue.forEach(item => {
    EventManager.emit(item.action, item.content, item.options);
  });
  queue = [];
});

/**
 * Dispatch toast. If the container is not mounted with add the toast is enqueued
 * @param {*} content 
 * @param {*} options 
 */
const emitEvent = (content, options) => {
  if (isContainerMounted) {
    EventManager.emit(ACTION.SHOW, content, options);
  } else {
    queue.push({ action: ACTION.SHOW, content, options });
  }

  return options.toastId;
};

export default Object.assign(
  (content, options) => emitEvent(content, mergeOptions(options)),
  {
    success: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.SUCCESS })),
    info: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.INFO })),
    warn: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.WARNING })),
    error: (content, options) => emitEvent(content, Object.assign(mergeOptions(options), { type: TYPE.ERROR })),
    dismiss: (id = null) => EventManager.emit(ACTION.CLEAR, id),
    isRunning: id => EventManager.emit(ACTION.IS_RUNNING, id)
  },
  {
    POSITION,
    TYPE
  }
);
