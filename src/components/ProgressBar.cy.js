import { __assign } from "tslib";
import React from 'react';
import { ProgressBar } from './ProgressBar';
var getProps = function () { return ({
    delay: 5000,
    isRunning: true,
    rtl: false,
    closeToast: cy.stub,
    isIn: true,
    theme: ['colored', 'light', 'dark'][Math.floor(Math.random() * 3)]
}); };
var Wrapper = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { style: {
            padding: '1rem',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            outline: '1px solid'
        } }, children));
};
describe('ProgressBar', function () {
    it('merge className', function () {
        cy.mount(React.createElement(Wrapper, null,
            React.createElement(ProgressBar, __assign({}, getProps(), { className: "test" }))));
        cy.get('.test').should('exist');
    });
    it('merge className in function form', function () {
        cy.mount(React.createElement(Wrapper, null,
            React.createElement(ProgressBar, __assign({}, getProps(), { className: function () { return 'test'; } }))));
        cy.get('.test').should('exist');
    });
    it('trigger closeToast when animation end', function () {
        var closeToast = cy.stub().as('closeToast');
        var delay = 1000;
        cy.mount(React.createElement(Wrapper, null,
            React.createElement(ProgressBar, __assign({}, getProps(), { closeToast: closeToast, delay: delay }))));
        cy.get('@closeToast').should('not.have.been.called');
        cy.wait(delay);
        cy.get('@closeToast').should('have.been.called');
    });
    it('hide the progress bar', function () {
        cy.mount(React.createElement(Wrapper, null,
            React.createElement(ProgressBar, __assign({}, getProps(), { hide: true }))));
        cy.get('[role=progressbar]').should('exist').should('not.be.visible');
    });
    it('pause the progress bar', function () {
        cy.mount(React.createElement(Wrapper, null,
            React.createElement(ProgressBar, __assign({}, getProps(), { isRunning: false }))));
        cy.findByRole('progressbar')
            .should('have.attr', 'style')
            .and('include', 'animation-play-state: paused');
    });
    it('control progress bar', function () {
        cy.mount(React.createElement(Wrapper, null,
            React.createElement(ProgressBar, __assign({}, getProps(), { controlledProgress: true, progress: 0.7 }))));
        cy.findByRole('progressbar')
            .should('have.attr', 'style')
            .and('include', 'scaleX(0.7)');
    });
});
//# sourceMappingURL=ProgressBar.cy.js.map