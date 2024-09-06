import React from 'react';
import { IconParams, getIcon } from './Icons';
import { TypeOptions } from '../types';

const props: IconParams = {
  theme: 'light',
  type: 'default',
  isLoading: false
};

describe('Icons', () => {
  it('handle function', () => {
    const C = getIcon({
      ...props,
      icon: () => <div>icon</div>
    });

    cy.mount(C);
    cy.findByText('icon').should('exist');
  });

  it('handle react element', () => {
    const C = getIcon({
      ...props,
      icon: <div>icon</div>
    });

    cy.mount(C);
    cy.findByText('icon').should('exist');
  });

  it('handle loader', () => {
    const C = getIcon({
      ...props,
      isLoading: true
    });

    cy.mount(C);
    cy.get('[data-cy-root]').should('have.length', 1);
  });

  it('handle built-in icons', () => {
    for (const t of ['info', 'warning', 'success', 'error', 'spinner']) {
      const C = getIcon({
        ...props,
        type: t as TypeOptions
      });

      cy.mount(C);
      cy.get('[data-cy-root]').should('have.length', 1);
    }
  });
});
