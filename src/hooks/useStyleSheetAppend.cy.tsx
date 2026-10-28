import React from 'react';
import { StyledToastContainer } from '../components/StyledToastContainer';

// Separate spec: the injected tag is cached per document, so it needs a fresh one
describe('useStyleSheet with appendStyleSheet', () => {
  it('injects the stylesheet after stylesheets already in the document', () => {
    cy.document().then(doc => {
      const userStyle = doc.createElement('style');
      userStyle.id = 'user-style';
      doc.head.appendChild(userStyle);
    });

    cy.mount(<StyledToastContainer nonce="append-test" appendStyleSheet />);

    cy.document().should(doc => {
      const injected = doc.head.querySelector('style[nonce="append-test"]')!;
      const userStyle = doc.head.querySelector('#user-style')!;
      expect(injected, 'injected style tag').to.exist;
      expect(injected.compareDocumentPosition(userStyle) & Node.DOCUMENT_POSITION_PRECEDING).to.not.equal(0);
    });
  });
});
