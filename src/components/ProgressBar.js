import { __assign } from "tslib";
import React from 'react';
import cx from 'clsx';
import { isFn } from './../utils';
export function ProgressBar(_a) {
    var _b, _c;
    var delay = _a.delay, isRunning = _a.isRunning, closeToast = _a.closeToast, _d = _a.type, type = _d === void 0 ? "default" /* Type.DEFAULT */ : _d, hide = _a.hide, className = _a.className, userStyle = _a.style, controlledProgress = _a.controlledProgress, progress = _a.progress, rtl = _a.rtl, isIn = _a.isIn, theme = _a.theme;
    var isHidden = hide || (controlledProgress && progress === 0);
    var style = __assign(__assign({}, userStyle), { animationDuration: "".concat(delay, "ms"), animationPlayState: isRunning ? 'running' : 'paused' });
    if (controlledProgress)
        style.transform = "scaleX(".concat(progress, ")");
    var defaultClassName = cx("".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar"), controlledProgress
        ? "".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar--controlled")
        : "".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar--animated"), "".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar-theme--").concat(theme), "".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar--").concat(type), (_b = {},
        _b["".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar--rtl")] = rtl,
        _b));
    var classNames = isFn(className)
        ? className({
            rtl: rtl,
            type: type,
            defaultClassName: defaultClassName
        })
        : cx(defaultClassName, className);
    // 🧐 controlledProgress is derived from progress
    // so if controlledProgress is set
    // it means that this is also the case for progress
    var animationEvent = (_c = {},
        _c[controlledProgress && progress >= 1
            ? 'onTransitionEnd'
            : 'onAnimationEnd'] = controlledProgress && progress < 1
            ? null
            : function () {
                isIn && closeToast();
            },
        _c);
    // TODO: add aria-valuenow, aria-valuemax, aria-valuemin
    return (React.createElement("div", { className: "".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar--wrp"), "data-hidden": isHidden },
        React.createElement("div", { className: "".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar--bg ").concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar-theme--").concat(theme, " ").concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar--").concat(type) }),
        React.createElement("div", __assign({ role: "progressbar", "aria-hidden": isHidden ? 'true' : 'false', "aria-label": "notification timer", className: classNames, style: style }, animationEvent))));
}
//# sourceMappingURL=ProgressBar.js.map