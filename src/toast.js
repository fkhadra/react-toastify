import React from 'react';
import { render } from 'react-dom';

import eventManager from './utils/eventManager';
import { POSITION, TYPE, ACTION } from './utils/constant';
import { ToastContainer } from '.';
import { canUseDom } from './utils/propValidator';

let containers = new Map();
let latestInstance = null;
let containerDomNode = null;
let containerConfig = {};
let queue = [];
let lazy = false;

/**
 * Check whether any container is currently mounted in the DOM
 */
function isAnyContainerMounted() {
  return containers.size > 0;
}

/**
 * Get the container by id. Returns the last container declared when no id is given.
 */
function getContainer(containerId) {
  if (!isAnyContainerMounted()) return null;

  if (!containerId) return containers.get(latestInstance);

  return containers.get(containerId);
}

/**
 * Get the toast by id, given it's in the DOM, otherwise returns null
 */
function getToast(toastId, { containerId }) {
  const container = getContainer(containerId);
  if (!container) return null;

  const toast = container.collection[toastId];
  if (typeof toast === 'undefined') return null;

  return toast;
}

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
  if (isAnyContainerMounted()) {
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
toast.dismiss = (id = null) =>
  isAnyContainerMounted() && eventManager.emit(ACTION.CLEAR, id);

toast.update = (toastId, options = {}) => {
  // if you call toast and toast.update directly nothing will be displayed
  // this is why I defered the update
  setTimeout(() => {
    const toast = getToast(toastId, options);
    if (toast) {
      const { options: oldOptions, content: oldContent } = toast;

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
 * Whether a toast is active within its container.
 */
toast.isActive = (id, containerId) => {
  if (containerId) {
    const containerInstance = containers.get(id);
    return Boolean(containerInstance && containerInstance.isToastActive(id));
  } else {
    const allContainers = Array.from(containers);
    return Boolean(
      allContainers && allContainers[0] && allContainers[0][1].isToastActive(id)
    );
  }
};

/**
 * Wait until the ToastContainer is mounted to dispatch the toast
 * and attach isActive method
 */
eventManager
  .on(ACTION.DID_MOUNT, containerInstance => {
    latestInstance = containerInstance.props.containerId || containerInstance;
    containers.set(latestInstance, containerInstance);

    queue.forEach(item => {
      eventManager.emit(item.action, item.content, item.options);
    });

    queue = [];
  })
  .on(ACTION.WILL_UNMOUNT, containerInstance => {
    if (containerInstance)
      containers.delete(
        containerInstance.props.containerId || containerInstance
      );
    else containers.clear();

    containers.forEach(container => {
      container.listenToToastActions();
    })

    if (canUseDom && containerDomNode) {
      document.body.removeChild(containerDomNode);
    }
  });

export default toast;
