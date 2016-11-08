import { EventManager } from './util';
import { config } from './config';

const emitEvent = (params) => EventManager.emit('TOASTIFY_SHOW', params);

export default Object.assign(
  (params) => emitEvent(params),
  {
    success: (params) => emitEvent(Object.assign(params, {type: config.TYPE.SUCCESS})),
    info: (params) => emitEvent(Object.assign(params, {type: config.TYPE.INFO})),
    warn: (params) => emitEvent(Object.assign(params, {type: config.TYPE.WARNING})),
    error: (params) => emitEvent(Object.assign(params, {type: config.TYPE.ERROR})),
  },
  config
);
