import React from 'react';
export function CloseButton(_a) {
    var closeToast = _a.closeToast, theme = _a.theme, _b = _a.ariaLabel, ariaLabel = _b === void 0 ? 'close' : _b;
    return (React.createElement("button", { className: "".concat("Toastify" /* Default.CSS_NAMESPACE */, "__close-button ").concat("Toastify" /* Default.CSS_NAMESPACE */, "__close-button--").concat(theme), type: "button", onClick: function (e) {
            e.stopPropagation();
            closeToast(e);
        }, "aria-label": ariaLabel },
        React.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 14 16" },
            React.createElement("path", { fillRule: "evenodd", d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z" }))));
}
//# sourceMappingURL=CloseButton.js.map