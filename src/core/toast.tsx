import * as React from 'react';
import { render } from 'react-dom';

import { POSITION, TYPE, canUseDom, isStr, isNum, isFn } from '../utils';
import { eventManager, OnChangeCallback, Event } from './eventManager';
import {
  ToastContent,
  ToastOptions,
  ToastProps,
  Id,
  ToastContainerProps,
  UpdateOptions,
  ClearWaitingQueueParams,
  NotValidatedToastProps
} from '../types';
import { ContainerInstance } from 'hooks';
import { ToastContainer } from '../components';

interface EnqueuedToast {
  content: ToastContent;
  options: NotValidatedToastProps;
}

let containers = new Map<ContainerInstance | Id, ContainerInstance>();
let latestInstance: ContainerInstance | Id;
let containerDomNode: HTMLElement;
let containerConfig: ToastContainerProps;
let queue: EnqueuedToast[] = [];
let lazy = false;

/**
 * Check whether any container is currently mounted in the DOM
 */
function isAnyContainerMounted() {
  return containers.size > 0;
}

/**
 * Get the toast by id, given it's in the DOM, otherwise returns null
 */
function getToast(toastId: Id, { containerId }: ToastOptions) {
  const container = containers.get(containerId || latestInstance);
  if (!container) return null;

  return container.getToast(toastId);
}

/**
 * Generate a random toastId
 */
function generateToastId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

/**
 * Generate a toastId or use the one provided
 */
function getToastId(options?: ToastOptions) {
  if (options && (isStr(options.toastId) || isNum(options.toastId))) {
    return options.toastId;
  }

  return generateToastId();
}

/**
 * If the container is not mounted, the toast is enqueued and
 * the container lazy mounted
 */
function dispatchToast(
  content: ToastContent,
  options: NotValidatedToastProps
): Id {
  if (isAnyContainerMounted()) {
    eventManager.emit(Event.Show, content, options);
  } else {
    queue.push({ content, options });
    if (lazy && canUseDom) {
      lazy = false;
      containerDomNode = document.createElement('div');
      document.body.appendChild(containerDomNode);
      render(<ToastContainer {...containerConfig} />, containerDomNode);
    }
  }

  return options.toastId;
}

/**
 * Merge provided options with the defaults settings and generate the toastId
 */
function mergeOptions(type: string, options?: ToastOptions) {
  return {
    ...options,
    type: (options && options.type) || type,
    toastId: getToastId(options)
  } as NotValidatedToastProps;
}

const createToastByType = (type: string) => (
  content: ToastContent,
  options?: ToastOptions
) => dispatchToast(content, mergeOptions(type, options));

const toast = (content: ToastContent, options?: ToastOptions) =>
  dispatchToast(content, mergeOptions(TYPE.DEFAULT, options));

toast.success = createToastByType(TYPE.SUCCESS);
toast.info = createToastByType(TYPE.INFO);
toast.error = createToastByType(TYPE.ERROR);
toast.warning = createToastByType(TYPE.WARNING);
toast.dark = createToastByType(TYPE.DARK);
toast.warn = toast.warning;

/**
 * Remove toast programmaticaly
 */
toast.dismiss = (id?: Id) => eventManager.emit(Event.Clear, id);

/**
 * Clear waiting queue when limit is used
 */
toast.clearWaitingQueue = (params: ClearWaitingQueueParams = {}) =>
  eventManager.emit(Event.ClearWaitingQueue, params);

/**
 * return true if one container is displaying the toast
 */
toast.isActive = (id: Id) => {
  let isToastActive = false;

  containers.forEach(container => {
    if (container.isToastActive && container.isToastActive(id)) {
      isToastActive = true;
    }
  });

  return isToastActive;
};

toast.update = (toastId: Id, options: UpdateOptions = {}) => {
  // if you call toast and toast.update directly nothing will be displayed
  // this is why I defered the update
  setTimeout(() => {
    const toast = getToast(toastId, options as ToastOptions);
    if (toast) {
      const { props: oldOptions, content: oldContent } = toast;

      const nextOptions = {
        ...oldOptions,
        ...options,
        toastId: options.toastId || toastId,
        updateId: generateToastId()
      } as ToastProps & UpdateOptions;

      if (nextOptions.toastId !== toastId) nextOptions.staleId = toastId;

      const content = nextOptions.render || oldContent;
      delete nextOptions.render;

      dispatchToast(content, nextOptions);
    }
  }, 0);
};

/**
 * Used for controlled progress bar.
 */
toast.done = (id: Id) => {
  toast.update(id, {
    progress: 1
  });
};

/**
 * Track changes. The callback get the number of toast displayed
 *
 */
toast.onChange = (callback: OnChangeCallback) => {
  if (isFn(callback)) {
    eventManager.on(Event.Change, callback);
  }
  return () => {
    isFn(callback) && eventManager.off(Event.Change, callback);
  };
};

/**
 * Configure the ToastContainer when lazy mounted
 */
toast.configure = (config: ToastContainerProps = {}) => {
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
  .on(Event.DidMount, (containerInstance: ContainerInstance) => {
    latestInstance = containerInstance.containerId || containerInstance;
    containers.set(latestInstance, containerInstance);

    queue.forEach(item => {
      eventManager.emit(Event.Show, item.content, item.options);
    });

    queue = [];
  })
  .on(Event.WillUnmount, (containerInstance: ContainerInstance) => {
    containers.delete(containerInstance.containerId || containerInstance);

    if (containers.size === 0) {
      eventManager
        .off(Event.Show)
        .off(Event.Clear)
        .off(Event.ClearWaitingQueue);
    }

    if (canUseDom && containerDomNode) {
      document.body.removeChild(containerDomNode);
    }
  });

export { toast };
