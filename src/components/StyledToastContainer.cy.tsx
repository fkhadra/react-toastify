import React from 'react';
import { StyledToastContainer } from './StyledToastContainer';

describe('StyledToastContainer', () => {
  it('injects a style tag into the document head on mount', () => {
    cy.mount(<StyledToastContainer />);

    cy.document()
      .its('head')
      .then(head => {
        const styleTags = head.querySelectorAll('style');
        const all = Array.from(styleTags).map(s => (s.textContent || '').slice(0, 40));
        // eslint-disable-next-line no-console
        console.log('[test] style tags in head:', all.length, all);
      });

    cy.document()
      .its('head')
      .find('style')
      .should('satisfy', (tags: NodeListOf<HTMLStyleElement>) =>
        Array.from(tags).some(s => (s.textContent || '').includes('--toastify-color-light'))
      );
  });

  it('sets the nonce attribute on the injected style tag when the nonce prop is passed', () => {
    cy.mount(<StyledToastContainer nonce="test-nonce-abc123" />);

    cy.document()
      .its('head')
      .find('style[nonce="test-nonce-abc123"]')
      .should('have.length.greaterThan', 0)
      .and('satisfy', (tags: NodeListOf<HTMLStyleElement>) =>
        Array.from(tags).some(s => (s.textContent || '').includes('--toastify-color-light'))
      );
  });
});
