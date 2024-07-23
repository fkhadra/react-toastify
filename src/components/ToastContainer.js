import { __assign } from "tslib";
import cx from 'clsx';
import React, { useRef, useState } from 'react';
import { toast } from '../core';
import { useToastContainer } from '../hooks/useToastContainer';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { isFn, parseClassName } from '../utils';
import { Toast } from './Toast';
import { Bounce } from './Transitions';
export var defaultProps = {
    position: 'top-right',
    transition: Bounce,
    autoClose: 5000,
    closeButton: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: 'touch',
    draggablePercent: 80 /* Default.DRAGGABLE_PERCENT */,
    draggableDirection: "x" /* Direction.X */,
    role: 'alert',
    theme: 'light',
};
export function ToastContainer(props) {
    var containerProps = __assign(__assign({}, defaultProps), props);
    var stacked = props.stacked;
    var _a = useState(true), collapsed = _a[0], setIsCollapsed = _a[1];
    var containerRef = useRef(null);
    var _b = useToastContainer(containerProps), getToastToRender = _b.getToastToRender, isToastActive = _b.isToastActive, count = _b.count;
    var className = containerProps.className, style = containerProps.style, rtl = containerProps.rtl, containerId = containerProps.containerId;
    function getClassName(position) {
        var _a;
        var defaultClassName = cx("".concat("Toastify" /* Default.CSS_NAMESPACE */, "__toast-container"), "".concat("Toastify" /* Default.CSS_NAMESPACE */, "__toast-container--").concat(position), (_a = {}, _a["".concat("Toastify" /* Default.CSS_NAMESPACE */, "__toast-container--rtl")] = rtl, _a));
        return isFn(className)
            ? className({
                position: position,
                rtl: rtl,
                defaultClassName: defaultClassName
            })
            : cx(defaultClassName, parseClassName(className));
    }
    function collapseAll() {
        if (stacked) {
            setIsCollapsed(true);
            toast.play();
        }
    }
    useIsomorphicLayoutEffect(function () {
        var _a;
        if (stacked) {
            var nodes = containerRef.current.querySelectorAll('[data-in="true"]');
            var gap_1 = 12;
            var isTop_1 = (_a = containerProps.position) === null || _a === void 0 ? void 0 : _a.includes('top');
            var usedHeight_1 = 0;
            var prevS_1 = 0;
            Array.from(nodes)
                .reverse()
                .forEach(function (n, i) {
                var node = n;
                node.classList.add("".concat("Toastify" /* Default.CSS_NAMESPACE */, "__toast--stacked"));
                if (i > 0)
                    node.dataset.collapsed = "".concat(collapsed);
                if (!node.dataset.pos)
                    node.dataset.pos = isTop_1 ? 'top' : 'bot';
                var y = usedHeight_1 * (collapsed ? 0.2 : 1) + (collapsed ? 0 : gap_1 * i);
                node.style.setProperty('--y', "".concat(isTop_1 ? y : y * -1, "px"));
                node.style.setProperty('--g', "".concat(gap_1));
                node.style.setProperty('--s', "".concat(1 - (collapsed ? prevS_1 : 0)));
                usedHeight_1 += node.offsetHeight;
                prevS_1 += 0.025;
            });
        }
    }, [collapsed, count, stacked]);
    return (React.createElement("div", { ref: containerRef, className: "Toastify" /* Default.CSS_NAMESPACE */, id: containerId, onMouseEnter: function () {
            if (stacked) {
                setIsCollapsed(false);
                toast.pause();
            }
        }, onMouseLeave: collapseAll }, getToastToRender(function (position, toastList) {
        var containerStyle = !toastList.length
            ? __assign(__assign({}, style), { pointerEvents: 'none' }) : __assign({}, style);
        return (React.createElement("div", { className: getClassName(position), style: containerStyle, key: "container-".concat(position) }, toastList.map(function (_a) {
            var content = _a.content, toastProps = _a.props;
            return (React.createElement(Toast, __assign({}, toastProps, { stacked: stacked, collapseAll: collapseAll, isIn: isToastActive(toastProps.toastId, toastProps.containerId), style: toastProps.style, key: "toast-".concat(toastProps.key) }), content));
        })));
    })));
}
//# sourceMappingURL=ToastContainer.js.map