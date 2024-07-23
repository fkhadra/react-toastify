declare global {
    namespace Cypress {
        interface Chainable {
            resolveEntranceAnimation(): void;
        }
    }
}
import '@4tw/cypress-drag-drop';
import '@testing-library/cypress/add-commands';
