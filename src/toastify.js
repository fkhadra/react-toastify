import { EventManager } from './util';
import config from './config';

const { POSITION, TYPE, ACTION } = config;

const defaultOptions = {
  type: TYPE.DEFAULT,
  autoClose: null
};

function mergeOptions(options) {
  return Object.assign({}, defaultOptions, options);
}

const emitEvent = (content, options) => EventManager.emit(ACTION.SHOW, content, options);

export default Object.assign(
  (content, options) => emitEvent(content, mergeOptions(options)),
  {
    success: (content, options) => emitEvent(Object.assign(mergeOptions(options), { type: TYPE.SUCCESS })),
    info: (content, options) => emitEvent(Object.assign(mergeOptions(options), { type: TYPE.INFO })),
    warn: (content, options) => emitEvent(Object.assign(mergeOptions(options), { type: TYPE.WARNING })),
    error: (content, options) => emitEvent(Object.assign(mergeOptions(options), { type: TYPE.ERROR })),
  },
  POSITION,
  TYPE
);
