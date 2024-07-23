import React from 'react';
import { CloseButton } from './CloseButton';
describe('CloseButton', function () {
    it('call close toast when clicking', function () {
        var closeToast = cy.stub().as('closeToast');
        cy.mount(React.createElement(CloseButton, { closeToast: closeToast, type: "default", theme: "light" }));
        cy.get('@closeToast').should('not.have.been.called');
        cy.findByRole('button').click();
        cy.get('@closeToast').should('have.been.called');
    });
    it('have a default aria-label', function () {
        cy.mount(React.createElement(CloseButton, { closeToast: cy.stub, type: "default", theme: "light" }));
        cy.findByLabelText('close').should('exist');
    });
    it('set aria-label', function () {
        cy.mount(React.createElement(CloseButton, { closeToast: cy.stub, type: "default", theme: "light", ariaLabel: "foobar" }));
        cy.findByLabelText('foobar').should('exist');
    });
});
//# sourceMappingURL=CloseButton.cy.js.map