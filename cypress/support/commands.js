/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
import '@4tw/cypress-drag-drop';
import '@testing-library/cypress/add-commands';
Cypress.Commands.add('resolveEntranceAnimation', function () {
    cy.wait(800);
});
//# sourceMappingURL=commands.js.map