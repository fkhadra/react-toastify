import React from 'react';
import { ToastContainer } from './components';
import { toast } from './core';
import { ToastContentProps } from './types';

it('allows to specify the reason when calling closeToast', () => {
  const onCloseFunc = cy.stub().as('onCloseFunc');

  function CustomNotification({ closeToast }: ToastContentProps) {
    return (
      <button
        onClick={() => {
          closeToast('foobar');
        }}
      >
        closeme
      </button>
    );
  }

  cy.mount(
    <div>
      <button
        onClick={() => {
          toast(CustomNotification, {
            onClose: onCloseFunc
          });
        }}
      >
        notify
      </button>
      <ToastContainer autoClose={false} />
    </div>
  );

  cy.findByRole('button', { name: 'notify' }).click();
  cy.findByRole('alert').should('exist');
  cy.findByRole('button', { name: 'closeme' }).click();

  cy.get('@onCloseFunc').should('have.been.calledWith', 'foobar');
});
