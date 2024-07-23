import { __assign } from "tslib";
import React from 'react';
import { Toast } from './Toast';
import { defaultProps } from './ToastContainer';
var REQUIRED_PROPS = __assign(__assign({}, defaultProps), { isIn: true, autoClose: false, closeToast: function () { }, type: 'default', toastId: 'id', key: 'key', collapseAll: function () { } });
var cssClasses = {
    rtl: ".".concat("Toastify" /* Default.CSS_NAMESPACE */, "__toast--rtl"),
    closeOnClick: ".".concat("Toastify" /* Default.CSS_NAMESPACE */, "__toast--close-on-click"),
    progressBar: ".".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar"),
    progressBarController: ".".concat("Toastify" /* Default.CSS_NAMESPACE */, "__progress-bar--controlled"),
    closeButton: ".".concat("Toastify" /* Default.CSS_NAMESPACE */, "__close-button"),
    container: ".".concat("Toastify" /* Default.CSS_NAMESPACE */, "__toast-container")
};
var progressBar = {
    isRunning: function () {
        cy.wait(100);
        cy.findByRole('progressbar')
            .should('have.attr', 'style')
            .and('include', 'animation-play-state: running');
    },
    isPaused: function () {
        cy.wait(100);
        cy.findByRole('progressbar')
            .should('have.attr', 'style')
            .and('include', 'animation-play-state: paused')
            .as('pause progress bar');
    },
    isControlled: function (progress) {
        cy.wait(100);
        cy.get(cssClasses.progressBarController).should('exist');
        cy.findByRole('progressbar')
            .should('have.attr', 'style')
            .and('include', "scaleX(".concat(progress, ")"));
    }
};
describe('Toast', function () {
    var _loop_1 = function (name_1, className, bodyClassName) {
        it("merge container and body className when using ".concat(name_1), function () {
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { className: className, bodyClassName: bodyClassName }), "FooBar"));
            cy.get('.container-class').should('exist');
            cy.get('.body-class').should('exist');
        });
    };
    for (var _i = 0, _a = [
        {
            name: 'string',
            className: 'container-class',
            bodyClassName: 'body-class'
        },
        {
            name: 'function',
            className: function () { return 'container-class'; },
            bodyClassName: function () { return 'body-class'; }
        }
    ]; _i < _a.length; _i++) {
        var _b = _a[_i], name_1 = _b.name, className = _b.className, bodyClassName = _b.bodyClassName;
        _loop_1(name_1, className, bodyClassName);
    }
    it('support rtl', function () {
        cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { rtl: true }), "FooBar"));
        cy.get(cssClasses.rtl).should('have.css', 'direction', 'rtl');
    });
    describe('closeOnClick', function () {
        it('call closeToast when enabled', function () {
            var closeToast = cy.stub().as('closeToast');
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { closeOnClick: true, closeToast: closeToast }), "FooBar"));
            cy.findByRole('alert').click();
            cy.get('@closeToast').should('have.been.called');
        });
        it('does not call closeToast when disabled', function () {
            var closeToast = cy.stub().as('closeToast');
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { closeOnClick: false, closeToast: closeToast }), "FooBar"));
            cy.findByRole('alert').click();
            cy.get('@closeToast').should('not.have.been.called');
        });
    });
    describe('autoClose', function () {
        it('does not render progress bar when false', function () {
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { autoClose: false }), "FooBar"));
            cy.findByRole('progressbar').should('not.exist');
        });
        it('resume and pause progress bar', function () {
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { autoClose: 5000 }), "hello"));
            cy.resolveEntranceAnimation();
            cy.findByRole('alert').should('be.visible').trigger('mouseover');
            progressBar.isPaused();
            cy.findByRole('alert').trigger('mouseout');
            progressBar.isRunning();
            cy.findByRole('alert').trigger('mouseover');
            progressBar.isPaused();
        });
    });
    it('does not render close button when closeButton is false', function () {
        cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { closeButton: false }), "FooBar"));
        cy.findByLabelText('close').should('not.exist');
    });
    it('resume and pause progress bar when pauseOnFocusLoss is enabled', function () {
        cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { autoClose: 5000, pauseOnFocusLoss: true }), "hello"));
        cy.resolveEntranceAnimation();
        progressBar.isRunning();
        cy.window().blur();
        progressBar.isPaused();
        cy.window().focus();
        progressBar.isRunning();
    });
    it('does not pause progress bar when pauseOnHover is disabled', function () {
        cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { autoClose: 5000, pauseOnHover: false }), "hello"));
        cy.resolveEntranceAnimation();
        cy.findByRole('alert').trigger('mouseover');
        progressBar.isRunning();
    });
    describe('controller progress bar', function () {
        it('set the correct progress value bar disregarding autoClose value', function () {
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { progress: 0.3, autoClose: false }), "hello"));
            cy.resolveEntranceAnimation();
            progressBar.isControlled(0.3);
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { progress: 0.3, autoClose: 5000 }), "hello"));
            cy.resolveEntranceAnimation();
            progressBar.isControlled(0.3);
        });
        it('call closeToast when progress value is >= 1', function () {
            var closeToast = cy.stub().as('closeToast');
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { progress: 1.1, closeToast: closeToast }), "hello"));
            cy.findByRole('progressbar').trigger('transitionend');
            cy.get('@closeToast').should('have.been.called');
        });
    });
    it('call closeToast when autoClose duration exceeded', function () {
        var closeToast = cy.stub().as('closeToast');
        cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { autoClose: 200, closeToast: closeToast }), "hello"));
        cy.get('@closeToast').should('have.been.called');
    });
    it('attach specified attributes: role, id, etc...', function () {
        var style = {
            background: 'purple'
        };
        var bodyStyle = {
            fontWeight: 'bold'
        };
        cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { role: "status", toastId: "foo", style: style, bodyStyle: bodyStyle }), "hello"));
        cy.resolveEntranceAnimation();
        cy.findByRole('status').should('exist');
        cy.get('#foo').should('exist');
        cy.findByRole('status')
            .parent()
            .should('have.attr', 'style')
            .and('include', 'background: purple');
        cy.findByRole('status')
            .should('have.attr', 'style')
            .and('include', 'font-weight: bold');
    });
    var _loop_2 = function (type, value) {
        it("render ".concat(type), function () {
            cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS), value));
            cy.findByText('hello').should('exist');
        });
    };
    for (var _c = 0, _d = [
        {
            type: 'string',
            value: 'hello'
        },
        {
            type: 'react element',
            value: React.createElement("div", null, "hello")
        }
    ]; _c < _d.length; _c++) {
        var _e = _d[_c], type = _e.type, value = _e.value;
        _loop_2(type, value);
    }
    it('override default closeButton', function () {
        cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { closeButton: React.createElement("span", null, "\uD83D\uDCA9") }), "hello"));
        cy.resolveEntranceAnimation();
        cy.findByText('💩').should('exist');
    });
    it('fallback to default closeButton', function () {
        cy.mount(React.createElement(Toast, __assign({}, REQUIRED_PROPS, { closeButton: true }), "hello"));
        cy.resolveEntranceAnimation();
        cy.findByLabelText('close').should('exist');
    });
    describe('Drag event', function () {
        beforeEach(function () {
            cy.viewport('macbook-16');
        });
        var _loop_3 = function (axis, delta) {
            it("close toast when dragging on ".concat(axis, "-axis"), function () {
                cy.mount(React.createElement("div", { style: { width: '300px', position: 'fixed', right: 0 } },
                    React.createElement(Toast, __assign({}, REQUIRED_PROPS, { autoClose: 5000, draggable: true, draggableDirection: axis, closeToast: cy.stub().as('closeToast') }), "hello")));
                cy.resolveEntranceAnimation();
                cy.findByRole('alert').move(delta);
                cy.get('@closeToast').should('have.been.called');
            });
        };
        for (var _i = 0, _a = [
            { axis: 'x', delta: { deltaX: -300 } },
            { axis: 'y', delta: { deltaY: 300 } }
        ]; _i < _a.length; _i++) {
            var _b = _a[_i], axis = _b.axis, delta = _b.delta;
            _loop_3(axis, delta);
        }
        var _loop_4 = function (axis, delta) {
            it("does not close toast when dragging on ".concat(axis, "-axis"), function () {
                cy.mount(React.createElement("div", { style: { width: '300px', position: 'fixed', right: 0 } },
                    React.createElement(Toast, __assign({}, REQUIRED_PROPS, { autoClose: 5000, draggable: true, draggableDirection: axis, closeToast: cy.stub().as('closeToast') }), "hello")));
                cy.resolveEntranceAnimation();
                cy.findByRole('alert').move(delta);
                cy.get('@closeToast').should('not.have.been.called');
            });
        };
        for (var _c = 0, _d = [
            { axis: 'x', delta: { deltaX: -100 } },
            { axis: 'y', delta: { deltaY: 40 } }
        ]; _c < _d.length; _c++) {
            var _e = _d[_c], axis = _e.axis, delta = _e.delta;
            _loop_4(axis, delta);
        }
    });
});
//# sourceMappingURL=Toast.cy.js.map