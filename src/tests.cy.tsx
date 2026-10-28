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

it('focus notification when alt+t is pressed', () => {
  cy.mount(
    <div>
      <button
        onClick={() => {
          toast('hello', {
            ariaLabel: 'notification'
          });
        }}
      >
        notify
      </button>
      <ToastContainer autoClose={false} />
    </div>
  );

  cy.findByRole('button', { name: 'notify' }).click();
  cy.resolveEntranceAnimation();
  cy.findByRole('alert').should('exist');
  cy.get('body').type('{alt+t}');
  cy.focused().should('have.attr', 'role', 'alert').and('have.attr', 'aria-label', 'notification');
});

describe('transition disabled', () => {
  it('auto closes without animation', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(<ToastContainer transition={false} autoClose={300} />);

    toast('hello', { onClose });

    cy.findByRole('alert').then(el => expect(el).not.to.have.class('Toastify--animate'));
    cy.findByText('hello').should('not.exist');
    cy.get('@onClose').should('have.been.calledOnce');
  });

  it('removes the toast when dismissed', () => {
    cy.mount(<ToastContainer transition={false} autoClose={false} />);

    const id = toast('hello');

    cy.findByText('hello').should('exist');
    cy.then(() => toast.dismiss(id));
    cy.findByText('hello').should('not.exist');
  });

  it('can be disabled per toast', () => {
    cy.mount(<ToastContainer autoClose={false} />);

    toast('hello', { transition: false });

    cy.findByRole('alert').then(el => expect(el).not.to.have.class('Toastify--animate'));
  });
});
