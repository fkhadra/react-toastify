import {
  Id,
  NotValidatedToastProps,
  ToastContent,
  ToastOptions,
  ToastProps,
  TypeOptions,
  UpdateOptions
} from '../types';
import { Type, isFn, isNum, isStr } from '../utils';
import { genToastId } from './genToastId';
import {
  clearWaitingQueue,
  getToast,
  isToastActive,
  onChange,
  pushToast,
  removeToast
} from './store';

/**
 * Generate a toastId or use the one provided
 */
function getToastId(options?: ToastOptions) {
  return options && (isStr(options.toastId) || isNum(options.toastId))
    ? options.toastId
    : genToastId();
}

/**
 * If the container is not mounted, the toast is enqueued and
 * the container lazy mounted
 */
function dispatchToast<TData>(
  content: ToastContent<TData>,
  options: NotValidatedToastProps
): Id {
  pushToast(content, options);
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

function createToastByType(type: string) {
  return <TData = unknown>(
    content: ToastContent<TData>,
    options?: ToastOptions
  ) => dispatchToast(content, mergeOptions(type, options));
}

function toast<TData = unknown>(
  content: ToastContent<TData>,
  options?: ToastOptions
) {
  return dispatchToast(content, mergeOptions(Type.DEFAULT, options));
}

toast.loading = <TData = unknown>(
  content: ToastContent<TData>,
  options?: ToastOptions
) =>
  dispatchToast(
    content,
    mergeOptions(Type.DEFAULT, {
      isLoading: true,
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      ...options
    })
  );

export interface ToastPromiseParams<
  TData = unknown,
  TError = unknown,
  TPending = unknown
> {
  pending?: string | UpdateOptions<TPending>;
  success?: string | UpdateOptions<TData>;
  error?: string | UpdateOptions<TError>;
}

function handlePromise<TData = unknown, TError = unknown, TPending = unknown>(
  promise: Promise<TData> | (() => Promise<TData>),
  { pending, error, success }: ToastPromiseParams<TData, TError, TPending>,
  options?: ToastOptions
) {
  let id: Id;

  if (pending) {
    id = isStr(pending)
      ? toast.loading(pending, options)
      : toast.loading(pending.render, {
          ...options,
          ...(pending as ToastOptions)
        });
  }

  const resetParams = {
    isLoading: null,
    autoClose: null,
    closeOnClick: null,
    closeButton: null,
    draggable: null
  };

  const resolver = <T>(
    type: TypeOptions,
    input: string | UpdateOptions<T> | undefined,
    result: T
  ) => {
    // Remove the toast if the input has not been provided. This prevents the toast from hanging
    // in the pending state if a success/error toast has not been provided.
    if (input == null) {
      toast.dismiss(id);
      return;
    }

    const baseParams = {
      type,
      ...resetParams,
      ...options,
      data: result
    };
    const params = isStr(input) ? { render: input } : input;

    // if the id is set we know that it's an update
    if (id) {
      toast.update(id, {
        ...baseParams,
        ...params
      } as UpdateOptions);
    } else {
      // using toast.promise without loading
      toast(params!.render, {
        ...baseParams,
        ...params
      } as ToastOptions);
    }

    return result;
  };

  const p = isFn(promise) ? promise() : promise;

  //call the resolvers only when needed
  p.then(result => resolver('success', success, result)).catch(err =>
    resolver('error', error, err)
  );

  return p;
}

toast.promise = handlePromise;
toast.success = createToastByType(Type.SUCCESS);
toast.info = createToastByType(Type.INFO);
toast.error = createToastByType(Type.ERROR);
toast.warning = createToastByType(Type.WARNING);
toast.warn = toast.warning;
toast.dark = (content: ToastContent, options?: ToastOptions) =>
  dispatchToast(
    content,
    mergeOptions(Type.DEFAULT, {
      theme: 'dark',
      ...options
    })
  );

interface RemoveParams {
  id?: Id;
  containerId: Id;
}

function dismiss(params: RemoveParams): void;
function dismiss(params?: Id): void;
function dismiss(params?: Id | RemoveParams) {
  removeToast(params);
}
/**
 * Remove toast programmaticaly
 */
toast.dismiss = dismiss;

/**
 * Clear waiting queue when limit is used
 */
toast.clearWaitingQueue = clearWaitingQueue;

/**
 * return true if one container is displaying the toast
 */
toast.isActive = isToastActive;

toast.update = <TData = unknown>(
  toastId: Id,
  options: UpdateOptions<TData> = {}
) => {
  const toast = getToast(toastId, options as ToastOptions);

  if (toast) {
    const { props: oldOptions, content: oldContent } = toast;

    const nextOptions = {
      delay: 100,
      ...oldOptions,
      ...options,
      toastId: options.toastId || toastId,
      updateId: genToastId()
    } as ToastProps & UpdateOptions;

    if (nextOptions.toastId !== toastId) nextOptions.staleId = toastId;

    const content = nextOptions.render || oldContent;
    delete nextOptions.render;

    dispatchToast(content, nextOptions);
  }
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
 * Subscribe to change when a toast is added, removed and updated
 *
 * Usage:
 * ```
 * const unsubscribe = toast.onChange((payload) => {
 *   switch (payload.status) {
 *   case "added":
 *     // new toast added
 *     break;
 *   case "updated":
 *     // toast updated
 *     break;
 *   case "removed":
 *     // toast has been removed
 *     break;
 *   }
 * })
 * ```
 */
toast.onChange = onChange;

export { toast };
