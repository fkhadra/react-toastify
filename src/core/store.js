import { canBeRendered, isId } from '../utils';
import { createContainerObserver } from './containerObserver';
var containers = new Map();
var renderQueue = [];
var listeners = new Set();
var dispatchChanges = function (data) { return listeners.forEach(function (cb) { return cb(data); }); };
var hasContainers = function () { return containers.size > 0; };
function flushRenderQueue() {
    renderQueue.forEach(function (v) { return pushToast(v.content, v.options); });
    renderQueue = [];
}
export var getToast = function (id, _a) {
    var _b;
    var containerId = _a.containerId;
    return (_b = containers.get(containerId || 1 /* Default.CONTAINER_ID */)) === null || _b === void 0 ? void 0 : _b.toasts.get(id);
};
export function isToastActive(id, containerId) {
    var _a;
    if (containerId)
        return !!((_a = containers.get(containerId)) === null || _a === void 0 ? void 0 : _a.isToastActive(id));
    var isActive = false;
    containers.forEach(function (c) {
        if (c.isToastActive(id))
            isActive = true;
    });
    return isActive;
}
export function removeToast(params) {
    if (!hasContainers()) {
        renderQueue = renderQueue.filter(function (v) { return params != null && v.options.toastId !== params; });
        return;
    }
    if (params == null || isId(params)) {
        containers.forEach(function (c) {
            c.removeToast(params);
        });
    }
    else if (params && ('containerId' in params || 'id' in params)) {
        var container = containers.get(params.containerId);
        container
            ? container.removeToast(params.id)
            : containers.forEach(function (c) {
                c.removeToast(params.id);
            });
    }
}
export function clearWaitingQueue(p) {
    if (p === void 0) { p = {}; }
    containers.forEach(function (c) {
        if (c.props.limit && (!p.containerId || c.id === p.containerId)) {
            c.clearQueue();
        }
    });
}
export function pushToast(content, options) {
    if (!canBeRendered(content))
        return;
    if (!hasContainers())
        renderQueue.push({ content: content, options: options });
    containers.forEach(function (c) {
        c.buildToast(content, options);
    });
}
export function registerToggle(opts) {
    var _a;
    (_a = containers
        .get(opts.containerId || 1 /* Default.CONTAINER_ID */)) === null || _a === void 0 ? void 0 : _a.setToggle(opts.id, opts.fn);
}
export function toggleToast(v, opt) {
    containers.forEach(function (c) {
        if (opt == null || !(opt === null || opt === void 0 ? void 0 : opt.containerId)) {
            c.toggle(v, opt === null || opt === void 0 ? void 0 : opt.id);
        }
        else if ((opt === null || opt === void 0 ? void 0 : opt.containerId) === c.id) {
            c.toggle(v, opt === null || opt === void 0 ? void 0 : opt.id);
        }
    });
}
export function registerContainer(props) {
    var id = props.containerId || 1 /* Default.CONTAINER_ID */;
    return {
        subscribe: function (notify) {
            var container = createContainerObserver(id, props, dispatchChanges);
            containers.set(id, container);
            var unobserve = container.observe(notify);
            flushRenderQueue();
            return function () {
                unobserve();
                containers.delete(id);
            };
        },
        setProps: function (p) {
            var _a;
            (_a = containers.get(id)) === null || _a === void 0 ? void 0 : _a.setProps(p);
        },
        getSnapshot: function () {
            var _a;
            return (_a = containers.get(id)) === null || _a === void 0 ? void 0 : _a.getSnapshot();
        }
    };
}
export function onChange(cb) {
    listeners.add(cb);
    return function () {
        listeners.delete(cb);
    };
}
//# sourceMappingURL=store.js.map