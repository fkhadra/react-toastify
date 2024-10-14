import { __assign } from 'tslib';
import { isFn, isNum, isStr } from '../utils';
import { genToastId } from './genToastId';
import {
  clearWaitingQueue,
  getToast,
  isToastActive,
  onChange,
  pushToast,
  removeToast,
  toggleToast
} from './store';
/**
 * Generate a toastId or use the one provided
 */
function getToastId(options) {
  return options && (isStr(options.toastId) || isNum(options.toastId))
    ? options.toastId
    : genToastId();
}
/**
 * If the container is not mounted, the toast is enqueued
 */
function dispatchToast(content, options) {
  pushToast(content, options);
  return options.toastId;
}
/**
 * Merge provided options with the defaults settings and generate the toastId
 */
function mergeOptions(type, options) {
  return __assign(__assign({}, options), {
    type: (options && options.type) || type,
    toastId: getToastId(options)
  });
}
function createToastByType(type) {
  return function (content, options) {
    return dispatchToast(content, mergeOptions(type, options));
  };
}
function toast(content, options) {
  return dispatchToast(
    content,
    mergeOptions('default' /* Type.DEFAULT */, options)
  );
}
toast.loading = function (content, options) {
  return dispatchToast(
    content,
    mergeOptions(
      'default' /* Type.DEFAULT */,
      __assign(
        {
          isLoading: true,
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          draggable: false
        },
        options
      )
    )
  );
};
function handlePromise(promise, _a, options) {
  var pending = _a.pending,
    error = _a.error,
    success = _a.success;
  var id;
  if (pending) {
    id = isStr(pending)
      ? toast.loading(pending, options)
      : toast.loading(pending.render, __assign(__assign({}, options), pending));
  }
  var resetParams = {
    isLoading: null,
    autoClose: null,
    closeOnClick: null,
    closeButton: null,
    draggable: null
  };
  var resolver = function (type, input, result) {
    // Remove the toast if the input has not been provided. This prevents the toast from hanging
    // in the pending state if a success/error toast has not been provided.
    if (input == null) {
      toast.dismiss(id);
      return;
    }
    var baseParams = __assign(
      __assign(__assign({ type: type }, resetParams), options),
      { data: result }
    );
    var params = isStr(input) ? { render: input } : input;
    // if the id is set we know that it's an update
    if (id) {
      toast.update(id, __assign(__assign({}, baseParams), params));
    } else {
      // using toast.promise without loading
      toast(params.render, __assign(__assign({}, baseParams), params));
    }
    return result;
  };
  var p = isFn(promise) ? promise() : promise;
  //call the resolvers only when needed
  p.then(function (result) {
    return resolver('success', success, result);
  }).catch(function (err) {
    return resolver('error', error, err);
  });
  return p;
}
/**
 * Supply a promise or a function that return a promise and the notification will be updated if it resolves or fails.
 * When the promise is pending a spinner is displayed by default.
 * `toast.promise` returns the provided promise so you can chain it.
 *
 * Simple example:
 *
 * ```
 * toast.promise(MyPromise,
 *  {
 *    pending: 'Promise is pending',
 *    success: 'Promise resolved 👌',
 *    error: 'Promise rejected 🤯'
 *  }
 * )
 *
 * ```
 *
 * Advanced usage:
 * ```
 * toast.promise<{name: string}, {message: string}, undefined>(
 *    resolveWithSomeData,
 *    {
 *      pending: {
 *        render: () => "I'm loading",
 *        icon: false,
 *      },
 *      success: {
 *        render: ({data}) => `Hello ${data.name}`,
 *        icon: "🟢",
 *      },
 *      error: {
 *        render({data}){
 *          // When the promise reject, data will contains the error
 *          return <MyErrorComponent message={data.message} />
 *        }
 *      }
 *    }
 * )
 * ```
 */
toast.promise = handlePromise;
toast.success = createToastByType('success' /* Type.SUCCESS */);
toast.info = createToastByType('info' /* Type.INFO */);
toast.error = createToastByType('error' /* Type.ERROR */);
toast.warning = createToastByType('warning' /* Type.WARNING */);
toast.warn = toast.warning;
toast.dark = function (content, options) {
  return dispatchToast(
    content,
    mergeOptions(
      'default' /* Type.DEFAULT */,
      __assign({ theme: 'dark' }, options)
    )
  );
};
function dismiss(params) {
  removeToast(params);
}
/**
 * Remove toast programmatically
 *
 * - Remove all toasts:
 * ```
 * toast.dismiss()
 * ```
 *
 * - Remove all toasts that belongs to a given container
 * ```
 * toast.dismiss({ container: "123" })
 * ```
 *
 * - Remove toast that has a given id regardless the container
 * ```
 * toast.dismiss({ id: "123" })
 * ```
 *
 * - Remove toast that has a given id for a specific container
 * ```
 * toast.dismiss({ id: "123", containerId: "12" })
 * ```
 */
toast.dismiss = dismiss;
/**
 * Clear waiting queue when limit is used
 */
toast.clearWaitingQueue = clearWaitingQueue;
/**
 * Check if a toast is active
 *
 * - Check regardless the container
 * ```
 * toast.isActive("123")
 * ```
 *
 * - Check in a specific container
 * ```
 * toast.isActive("123", "containerId")
 * ```
 */
toast.isActive = isToastActive;
/**
 * Update a toast, see https://fkhadra.github.io/react-toastify/update-toast/ for more
 *
 * Example:
 * ```
 * // With a string
 * toast.update(toastId, {
 *    render: "New content",
 *    type: "info",
 * });
 *
 * // Or with a component
 * toast.update(toastId, {
 *    render: MyComponent
 * });
 *
 * // Or a function
 * toast.update(toastId, {
 *    render: () => <div>New content</div>
 * });
 *
 * // Apply a transition
 * toast.update(toastId, {
 *   render: "New Content",
 *   type: toast.TYPE.INFO,
 *   transition: Rotate
 * })
 * ```
 */
toast.update = function (toastId, options) {
  if (options === void 0) {
    options = {};
  }
  var toast = getToast(toastId, options);
  if (toast) {
    var oldOptions = toast.props,
      oldContent = toast.content;
    var nextOptions = __assign(
      __assign(__assign({ delay: 100 }, oldOptions), options),
      { toastId: options.toastId || toastId, updateId: genToastId() }
    );
    if (nextOptions.toastId !== toastId) nextOptions.staleId = toastId;
    var content = nextOptions.render || oldContent;
    delete nextOptions.render;
    dispatchToast(content, nextOptions);
  }
};
/**
 * Used for controlled progress bar. It will automatically close the notification.
 *
 * If you don't want your notification to be clsoed when the timer is done you should use `toast.update` instead as follow instead:
 *
 * ```
 * toast.update(id, {
 *    progress: null, // remove controlled progress bar
 *    render: "ok",
 *    type: "success",
 *    autoClose: 5000 // set autoClose to the desired value
 *   });
 * ```
 */
toast.done = function (id) {
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
/**
 * Play a toast(s) timer progammatically
 *
 * Usage:
 *
 * - Play all toasts
 * ```
 * toast.play()
 * ```
 *
 * - Play all toasts for a given container
 * ```
 * toast.play({ containerId: "123" })
 * ```
 *
 * - Play toast that has a given id regardless the container
 * ```
 * toast.play({ id: "123" })
 * ```
 *
 * - Play toast that has a given id for a specific container
 * ```
 * toast.play({ id: "123", containerId: "12" })
 * ```
 */
toast.play = function (opts) {
  return toggleToast(true, opts);
};
/**
 * Pause a toast(s) timer progammatically
 *
 * Usage:
 *
 * - Pause all toasts
 * ```
 * toast.pause()
 * ```
 *
 * - Pause all toasts for a given container
 * ```
 * toast.pause({ containerId: "123" })
 * ```
 *
 * - Pause toast that has a given id regardless the container
 * ```
 * toast.pause({ id: "123" })
 * ```
 *
 * - Pause toast that has a given id for a specific container
 * ```
 * toast.pause({ id: "123", containerId: "12" })
 * ```
 */
toast.pause = function (opts) {
  return toggleToast(false, opts);
};
export { toast };
//# sourceMappingURL=toast.js.map
