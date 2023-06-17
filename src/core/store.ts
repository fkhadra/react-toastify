import {
  Id,
  NotValidatedToastProps,
  ToastContainerProps,
  ToastContent,
  ToastItem,
  ToastOptions
} from '../types';
import { canBeRendered, isId } from '../utils';
import {
  ContainerObserver,
  createContainerObserver
} from './containerObserver';

interface EnqueuedToast {
  content: ToastContent<any>;
  options: NotValidatedToastProps;
}

interface ClearWaitingQueueParams {
  containerId?: Id;
}

interface RemoveParams {
  id?: Id;
  containerId: Id;
}

function createStore() {
  const DEFAULT_CONTAINER_ID = 1;
  const containers = new Map<Id, ContainerObserver>();
  let renderQueue: EnqueuedToast[] = [];
  const listeners = new Set<OnChangeCallback>();

  const dispatchChanges = (data: ToastItem) =>
    listeners.forEach(cb => cb(data));

  const hasContainers = () => containers.size > 0;

  function isToastActive(id: Id, containerId?: Id) {
    if (containerId) return !!containers.get(containerId)?.isToastActive(id);

    let isActive = false;
    containers.forEach(c => {
      if (c.isToastActive(id)) isActive = true;
    });

    return isActive;
  }

  function getToast(id: Id, { containerId }: ToastOptions) {
    return containers.get(containerId || DEFAULT_CONTAINER_ID)?.toasts.get(id);
  }

  function flushRenderQueue() {
    renderQueue.forEach(v => pushToast(v.content, v.options));
    renderQueue = [];
  }

  function remove(params?: Id | RemoveParams) {
    if (!hasContainers()) {
      renderQueue = renderQueue.filter(
        v => params != null && v.options.toastId !== params
      );
      return;
    }

    if (params == null || isId(params)) {
      containers.forEach(c => {
        c.removeActiveToast(params as Id);
      });
    } else if (params && 'containerId' in params) {
      containers.get(params.containerId)?.removeActiveToast(params.id);
    }
  }

  function clearWaitingQueue(p: ClearWaitingQueueParams) {
    console.log({
      containers,
      f: !p.containerId
    });
    containers.forEach(c => {
      if (c.props.limit && (!p.containerId || c.id === p.containerId)) {
        c.clearQueue();
      }
    });
  }

  function pushToast<TData>(
    content: ToastContent<TData>,
    options: NotValidatedToastProps
  ) {
    if (!canBeRendered(content)) return;
    if (!hasContainers()) renderQueue.push({ content, options });

    containers.forEach(c => {
      c.buildToast(content, options);
    });
  }

  return {
    registerContainer(props: ToastContainerProps) {
      const id = props.containerId || DEFAULT_CONTAINER_ID;
      return {
        subscribe(notify: () => void) {
          const container = createContainerObserver({
            id,
            props,
            dispatchChanges
          });

          containers.set(id, container);
          const unobserve = container.observe(notify);
          flushRenderQueue();

          return () => {
            unobserve();
            containers.delete(id);
          };
        },
        getSnapshot() {
          return containers.get(id)?.getSnapshot();
        }
      };
    },
    onChange(cb: OnChangeCallback) {
      listeners.add(cb);

      return () => {
        listeners.delete(cb);
      };
    },
    pushToast,
    clearWaitingQueue,
    remove,
    getToast,
    isToastActive
  };
}

export const store = createStore();
export type OnChangeCallback = (toast: ToastItem) => void;
