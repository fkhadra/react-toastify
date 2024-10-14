import '@cypress/code-coverage/support';
import './commands';
import '../../scss/main.scss';
import './style.css';
import { mount } from 'cypress/react18';
declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}
