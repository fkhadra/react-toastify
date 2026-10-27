import React from 'react';
import { StyledToastContainer } from '../components/StyledToastContainer';

describe('useStyleSheet', () => {
  it('injects the stylesheet before stylesheets already in the document so they can override it', () => {
    // Simulates the consumer's own stylesheet, loaded before the container mounts
    cy.document().then(doc => {
      const userStyle = doc.createElement('style');
      userStyle.id = 'user-style';
      userStyle.textContent = ':root { --toastify-color-light: rgb(1, 2, 3); }';
      doc.head.appendChild(userStyle);
    });

    cy.mount(<StyledToastContainer nonce="order-test" />);

    cy.document().should(doc => {
      const injected = doc.head.querySelector('style[nonce="order-test"]')!;
      const userStyle = doc.head.querySelector('#user-style')!;
      expect(injected, 'injected style tag').to.exist;
      // DOCUMENT_POSITION_FOLLOWING: userStyle comes after the injected tag
      expect(injected.compareDocumentPosition(userStyle) & Node.DOCUMENT_POSITION_FOLLOWING).to.not.equal(0);
    });
  });
});
