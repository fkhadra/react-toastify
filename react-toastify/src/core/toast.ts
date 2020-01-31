// import React from 'react';
// import { render } from 'react-dom';

import {
  POSITION,
  TYPE,
  eventManager,
  canUseDom,
  isStr,
  isNum,
  OnChangeCallback
} from '../utils';
import {
  ToastContent,
  ToastOptions,
  WithInjectedOptions,
  ToastId,
  //TypeOptions,
  ContainerId,
  ToastContainerProps,
  UpdateOptions
} from '../types';
import { ContainerInstance } from 'hooks';
//import { ToastContainer } from '.';

// interface Toast {
//   /**
//    * Shorthand to display toast of type 'success'.
//    */
//   success(content: ToastContent, options?: ToastOptions): ToastId;

//   /**
//    * Shorthand to display toast of type 'info'.
//    */
//   info(content: ToastContent, options?: ToastOptions): ToastId;

//   /**
//    * Shorthand to display toast of type 'warning'.
//    */
//   warn(content: ToastContent, options?: ToastOptions): ToastId;

//   /**
//    * Shorthand to display toast of type 'error'.
//    */
//   error(content: ToastContent, options?: ToastOptions): ToastId;

//   /**
//    * Check if a toast is active by passing the `toastId`.
//    * Each time you display a toast you receive a `toastId`.
//    */
//   isActive(toastId: ToastId): boolean;

//   /**
//    * Remove a toast. If no `toastId` is used, all the active toast
//    * will be removed.
//    */
//   dismiss(toastId?: ToastId): void;

//   /**
//    * Update an existing toast. By default, we keep the initial content and options of the toast.
//    */
//   update(toastId: ToastId, options?: UpdateOptions): void;

//   /**
//    * Listen for change when a toast is added or removed. The number of toast displayed is passed as paran to the callback
//    */
//   onChange(
//     callback: (count?: number, containerId?: string | number) => void
//   ): void;

//   /**
//    * Set a controlled progress bar value to 100% then close the toast
//    */
//   done(toastId: ToastId): void;

//   /**
//    * Let you define `ToastContainer` props when lazy mounted.
//    * When called enable lazy mounted container
//    */
//   configure(config?: ToastContainerProps): void;

//   /**
//    * Display a toast without a specific type.
//    */
//   (content: ToastContent, options?: ToastOptions): ToastId;

//   /**
//    * Helper to set notification type
//    */
//   TYPE: typeof TYPE;

//   /**
//    * Helper to set position
//    */
//   POSITION: typeof POSITION;
// }

interface EnqueuedToast {
  content: ToastContent;
  options: WithInjectedOptions;
}

let containers = new Map<ContainerInstance | ContainerId, ContainerInstance>();
let latestInstance: ContainerInstance | ContainerId;
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
 * Get the container by id. Returns the last container declared when no id is given.
 */
function getContainer(containerId?: ContainerId) {
  if (!isAnyContainerMounted()) return null;
  return containers.get(!containerId ? latestInstance : containerId);
}

/**
 * Get the toast by id, given it's in the DOM, otherwise returns null
 */
function getToast(toastId: ToastId, { containerId }: ToastOptions) {
  const container = getContainer(containerId);
  if (!container) return null;

  return container.getToast(toastId);
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
function getToastId(options: ToastOptions) {
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
  options: WithInjectedOptions
): ToastId {
  if (isAnyContainerMounted()) {
    eventManager.emit('show', content, options);
  } else {
    queue.push({ content, options });
    if (lazy && canUseDom) {
      lazy = false;
      containerDomNode = document.createElement('div');
      document.body.appendChild(containerDomNode);
      //   render(<ToastContainer {...containerConfig} />, containerDomNode);
    }
  }

  return options.toastId;
}

/**
 * Merge provided options with the defaults settings and generate the toastId
 */
function mergeOptions(options: ToastOptions, type: string) {
  return {
    ...options,
    type: (options && options.type) || type,
    toastId: getToastId(options)
  } as WithInjectedOptions;
}

const toast = (content: ToastContent, options: ToastOptions) =>
  dispatchToast(content, mergeOptions(options, TYPE.DEFAULT));

toast.success = (content: ToastContent, options: ToastOptions) =>
  dispatchToast(content, mergeOptions(options, TYPE.SUCCESS));

toast.info = (content: ToastContent, options: ToastOptions) =>
  dispatchToast(content, mergeOptions(options, TYPE.INFO));

toast.error = (content: ToastContent, options: ToastOptions) =>
  dispatchToast(content, mergeOptions(options, TYPE.ERROR));

toast.warning = (content: ToastContent, options: ToastOptions) =>
  dispatchToast(content, mergeOptions(options, TYPE.WARNING));

/**
 * Maybe I should remove warning in favor of warn, I don't know
 */
toast.warn = toast.warning;

/**
 * Remove toast programmaticaly
 */
toast.dismiss = (id?: ToastId) =>
  isAnyContainerMounted() && eventManager.emit('clear', id);

/**
 * return true if one container is displaying the toast
 */
toast.isActive = (id: ToastId) => {
  let isToastActive = false;

  containers.forEach(container => {
    if (container.isToastActive && container.isToastActive(id)) {
      isToastActive = true;
    }
  });

  return isToastActive;
};

toast.update = (toastId: ToastId, options: UpdateOptions = {}) => {
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
        (nextOptions as any).staleToastId = toastId;
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
toast.done = (id: ToastId) => {
  toast.update(id, {
    progress: 1
  });
};

/**
 * Track changes. The callback get the number of toast displayed
 */
toast.onChange = (callback: OnChangeCallback) => {
  if (typeof callback === 'function') {
    eventManager.on('change', callback);
  }
};

/**
 * Configure the ToastContainer when lazy mounted
 */
toast.configure = (config: ToastContainerProps) => {
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
  .on('didMount', containerInstance => {
    latestInstance = containerInstance.containerId || containerInstance;
    containers.set(latestInstance, containerInstance);

    queue.forEach(item => {
      eventManager.emit('show', item.content, item.options);
    });

    queue = [];
  })
  .on('willUnmount', containerInstance => {
    if (containerInstance)
      containers.delete(containerInstance.containerId || containerInstance);
    else containers.clear();

    if (containers.size === 0) {
      eventManager.off('show').off('clear');
    }

    if (canUseDom && containerDomNode) {
      document.body.removeChild(containerDomNode);
    }
  });

export default toast;
