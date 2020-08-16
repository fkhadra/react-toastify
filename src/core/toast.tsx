import * as React from 'react';
import { PropsWithChildren, useContext } from 'react';
import { render } from 'react-dom';

import { canUseDom, isFn, isNum, isStr, POSITION, TYPE } from '../utils';
import {
  createEventManager,
  Event,
  eventManager,
  EventManager,
  OnChangeCallback
} from './eventManager';
import {
  ClearWaitingQueueParams,
  Id,
  NotValidatedToastProps,
  ToastContainerProps,
  ToastContent,
  ToastOptions,
  ToastProps,
  UpdateOptions
} from '../types';
import { ContainerInstance } from 'hooks';
import { ToastContainer } from '../components';

interface EnqueuedToast {
  content: ToastContent;
  options: NotValidatedToastProps;
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
function getToastId(options?: ToastOptions) {
  if (options && (isStr(options.toastId) || isNum(options.toastId))) {
    return options.toastId;
  }

  return generateToastId();
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

class ToastManager extends Function {
  private containers = new Map<ContainerInstance | Id, ContainerInstance>();
  private latestInstance!: ContainerInstance | Id;
  private containerDomNode!: HTMLElement;
  private containerConfig!: ToastContainerProps;
  private queue: EnqueuedToast[] = [];
  private lazy = false;

  constructor(private readonly evtManager: EventManager) {
    super();
    this.evtManager
      .on(Event.DidMount, (containerInstance: ContainerInstance) => {
        this.latestInstance =
          containerInstance.containerId || containerInstance;

        this.containers.set(this.latestInstance, containerInstance);

        this.queue.forEach(item => {
          this.evtManager.emit(Event.Show, item.content, item.options);
        });

        this.queue = [];
      })
      .on(Event.WillUnmount, (containerInstance: ContainerInstance) => {
        this.containers.delete(
          containerInstance.containerId || containerInstance
        );

        if (this.containers.size === 0) {
          this.evtManager
            .off(Event.Show)
            .off(Event.Clear)
            .off(Event.ClearWaitingQueue);
        }

        if (canUseDom && this.containerDomNode) {
          document.body.removeChild(this.containerDomNode);
        }
      });
  }

  /**
   * Check whether any container is currently mounted in the DOM
   */
  private isAnyContainerMounted = () => {
    return this.containers.size > 0;
  };

  /**
   * Get the container by id. Returns the last container declared when no id is given.
   */
  private getContainer = (containerId?: Id) => {
    if (!this.isAnyContainerMounted()) return null;
    return this.containers.get(
      !containerId ? this.latestInstance : containerId
    );
  };

  /**
   * Get the toast by id, given it's in the DOM, otherwise returns null
   */
  private getToast = (toastId: Id, { containerId }: ToastOptions) => {
    const container = this.getContainer(containerId);
    if (!container) return null;

    return container.getToast(toastId);
  };

  /**
   * If the container is not mounted, the toast is enqueued and
   * the container lazy mounted
   */
  private dispatchToast = (
    content: ToastContent,
    options: NotValidatedToastProps
  ): Id => {
    if (this.isAnyContainerMounted()) {
      this.evtManager.emit(Event.Show, content, options);
    } else {
      this.queue.push({ content, options });
      if (this.lazy && canUseDom) {
        this.lazy = false;
        this.containerDomNode = document.createElement('div');
        document.body.appendChild(this.containerDomNode);
        render(
          <ToastContainer
            eventManager={this.evtManager}
            {...this.containerConfig}
          />,
          this.containerDomNode
        );
      }
    }

    return options.toastId;
  };

  public default = (content: ToastContent, options?: ToastOptions) => {
    return this.dispatchToast(content, mergeOptions(TYPE.DEFAULT, options));
  };

  public success = (content: ToastContent, options?: ToastOptions) => {
    return this.dispatchToast(content, mergeOptions(TYPE.SUCCESS, options));
  };

  public info = (content: ToastContent, options?: ToastOptions) => {
    return this.dispatchToast(content, mergeOptions(TYPE.INFO, options));
  };

  public error = (content: ToastContent, options?: ToastOptions) => {
    return this.dispatchToast(content, mergeOptions(TYPE.ERROR, options));
  };

  public warning = (content: ToastContent, options?: ToastOptions) => {
    return this.dispatchToast(content, mergeOptions(TYPE.WARNING, options));
  };

  public dark = (content: ToastContent, options?: ToastOptions) => {
    return this.dispatchToast(content, mergeOptions(TYPE.DARK, options));
  };

  /**
   * Maybe I should remove warning in favor of warn, I don't know
   */
  public warn = (content: ToastContent, options?: ToastOptions) => {
    return this.warning(content, options);
  };

  /**
   * Remove toast programmaticaly
   */
  public dismiss = (id?: Id) => {
    return (
      this.isAnyContainerMounted() && this.evtManager.emit(Event.Clear, id)
    );
  };

  /**
   * Clear waiting queue when limit is used
   */
  public clearWaitingQueue = (params: ClearWaitingQueueParams = {}) => {
    return (
      this.isAnyContainerMounted() &&
      this.evtManager.emit(Event.ClearWaitingQueue, params)
    );
  };

  /**
   * return true if one container is displaying the toast
   */
  public isActive = (id: Id) => {
    let isToastActive = false;

    this.containers.forEach(container => {
      if (container.isToastActive && container.isToastActive(id)) {
        isToastActive = true;
      }
    });

    return isToastActive;
  };

  public update = (toastId: Id, options: UpdateOptions = {}) => {
    // if you call toast and toast.update directly nothing will be displayed
    // this is why I defered the update
    setTimeout(() => {
      const toast = this.getToast(toastId, options as ToastOptions);
      if (toast) {
        const { props: oldOptions, content: oldContent } = toast;

        const nextOptions = {
          ...oldOptions,
          ...options,
          toastId: options.toastId || toastId,
          updateId: generateToastId()
        } as ToastProps & UpdateOptions;

        if (nextOptions.toastId !== toastId) nextOptions.staleId = toastId;

        const content =
          typeof nextOptions.render !== 'undefined'
            ? nextOptions.render
            : oldContent;
        delete nextOptions.render;

        this.dispatchToast(content, nextOptions);
      }
    }, 0);
  };

  /**
   * Used for controlled progress bar.
   */
  public done = (id: Id) => {
    this.update(id, {
      progress: 1
    });
  };

  /**
   * Track changes. The callback get the number of toast displayed
   *
   */
  public onChange = (callback: OnChangeCallback) => {
    if (isFn(callback)) {
      this.evtManager.on(Event.Change, callback);
    }
    return () => {
      isFn(callback) && this.evtManager.off(Event.Change, callback);
    };
  };

  /**
   * Configure the ToastContainer when lazy mounted
   */
  public configure = (config: ToastContainerProps = {}) => {
    this.lazy = true;
    this.containerConfig = config;
  };

  public POSITION = POSITION;
  public TYPE = TYPE;
}

type ToastManagerProviderProps = PropsWithChildren<
  Omit<ToastContainerProps, 'eventManager'>
>;

type ToastManagerProviderMixin = {
  Provider: React.FC<ToastManagerProviderProps>;
};

interface ToastManagerWithProvider
  extends ToastManager,
    ToastManagerProviderMixin {
  (content: ToastContent, options?: ToastOptions): Id;
}

const createToastManager = (
  evtManager: EventManager = createEventManager()
): ToastManagerWithProvider => {
  const instance = new ToastManager(evtManager);

  const callable = new Proxy(instance, {
    apply(
      target,
      // @ts-ignore
      thisArg: unknown,
      [content, options]: [ToastContent, ToastOptions?]
    ): Id {
      return target.default(content, options);
    }
  });

  Object.assign(callable, {
    Provider: (props: ToastManagerProviderProps) => {
      const { children, ...rest } = props;

      return (
        <ToastManagerContext.Provider value={callable}>
          {children}
          <ToastContainer {...rest} eventManager={evtManager} />
        </ToastManagerContext.Provider>
      );
    }
  });

  return callable as ToastManagerWithProvider;
};

const toast = createToastManager(eventManager);

const ToastManagerContext = React.createContext<ToastManager>(toast);

const useToastManager = () => useContext(ToastManagerContext);

export { toast, createToastManager, useToastManager };
