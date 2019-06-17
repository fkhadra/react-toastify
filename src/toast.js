import React from 'react';
import { render } from 'react-dom';

import eventManager from './utils/eventManager';
import { POSITION, TYPE, ACTION, NOOP } from './utils/constant';
import { ToastContainer } from '.';
import { canUseDom } from './utils/propValidator';

let container = null;
let containerDomNode = null;
let containerConfig = {};
let queue = [];
let lazy = false;

/**
 * Merge provided options with the defaults settings and generate the toastId
 */
function mergeOptions(options, type) {
  return { ...options, type, toastId: getToastId(options) };
}

/**
 * Generate a random toastId
 */
function generateToastId() {
  return (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10);
}

/**
 * Generate a toastId or use the one provided
 */
function getToastId(options) {
  if (
    options &&
    (typeof options.toastId === 'string' ||
      (typeof options.toastId === 'number' && !isNaN(options.toastId)))
  ) {
    return options.toastId;
  }

  return generateToastId();
}

/**
 * If the container is not mounted, the toast is enqueued and
 * the container lazy mounted
 */
function dispatchToast(content, options) {
  if (container) {
    eventManager.emit(ACTION.SHOW, content, options);
  } else {
    queue.push({ action: ACTION.SHOW, content, options });
    if (lazy && canUseDom) {
      lazy = false;
      containerDomNode = document.createElement('div');
      document.body.appendChild(containerDomNode);
      render(<ToastContainer {...containerConfig} />, containerDomNode);
    }
  }

  return options.toastId;
}

const toast = (content, options) =>
  dispatchToast(
    content,
    mergeOptions(options, (options && options.type) || TYPE.DEFAULT)
  );

/**
 * For each available type create a shortcut
 */
for (const t in TYPE) {
  if (TYPE[t] !== TYPE.DEFAULT) {
    toast[TYPE[t].toLowerCase()] = (content, options) =>
      dispatchToast(
        content,
        mergeOptions(options, (options && options.type) || TYPE[t])
      );
  }
}

/**
 * Maybe I should remove warning in favor of warn, I don't know
 */
toast.warn = toast.warning;

/**
 * Remove toast programmaticaly
 */
toast.dismiss = (id = null) => container && eventManager.emit(ACTION.CLEAR, id);

/**
 * Do nothing until the container is mounted. Reassigned later
 */
toast.isActive = NOOP;

toast.update = (toastId, options = {}) => {
  // if you call toast and toast.update directly nothing will be displayed
  // this is why I defered the update
  setTimeout(() => {
    if (container && typeof container.collection[toastId] !== 'undefined') {
      const { options: oldOptions, content: oldContent } = container.collection[
        toastId
      ];

      const nextOptions = {
        ...oldOptions,
        ...options,
        toastId: options.toastId || toastId
      };

      if (!options.toastId || options.toastId === toastId) {
        nextOptions.updateId = generateToastId();
      } else {
        nextOptions.staleToastId = toastId;
      }

      const content =
        typeof nextOptions.render !== 'undefined'
          ? nextOptions.render
          : oldContent;
      delete nextOptions.render;
      dispatchToast(content, nextOptions);
    }
  }, 0);
};

/**
 * Used for controlled progress bar.
 */
toast.done = id => {
  toast.update(id, {
    progress: 1
  });
};

/**
 * Track changes. The callback get the number of toast displayed
 */
toast.onChange = callback => {
  if (typeof callback === 'function') {
    eventManager.on(ACTION.ON_CHANGE, callback);
  }
};

/**
 * Configure the ToastContainer when lazy mounted
 */
toast.configure = config => {
  lazy = true;
  containerConfig = config;
};

toast.POSITION = POSITION;
toast.TYPE = TYPE;

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
    toast.isActive = NOOP;

    if (canUseDom && containerDomNode) {
      document.body.removeChild(containerDomNode);
    }
  });

export default toast;
