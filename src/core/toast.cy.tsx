import React from 'react';
import { ToastContainer } from '../components';
import { toast } from './toast';

beforeEach(() => {
  cy.viewport('macbook-15');
});

describe('without container', () => {
  it('should enqueue toasts till container is mounted', () => {
    toast('hello1');
    toast('hello2');

    cy.findByText('hello1').should('not.exist');
    cy.findByText('hello2').should('not.exist');

    cy.mount(<ToastContainer autoClose={false} />);

    cy.resolveEntranceAnimation();
    cy.findByText('hello1').should('exist');
    cy.findByText('hello2').should('exist');
  });

  it('should remove toast from render queue', () => {
    toast('hello1');
    const id = toast('hello2');
    toast.dismiss(id);

    cy.mount(<ToastContainer autoClose={false} />);
    cy.resolveEntranceAnimation();

    cy.findByText('hello1').should('exist');
    cy.findByText('hello2').should('not.exist');
  });
});

describe('with container', () => {
  beforeEach(() => {
    cy.mount(<ToastContainer autoClose={false} />);
  });

  it('should render toast', () => {
    toast('hello');
    cy.resolveEntranceAnimation();
    cy.findByText('hello').should('exist').click().should('not.exist');
  });

  it('should return a new id each time a notification is pushed', () => {
    const firstId = toast('Hello');
    const secondId = toast('Hello');

    expect(firstId).not.to.be.eq(secondId);
  });

  it('Should use the provided toastId from options', () => {
    const toastId = 11;
    const id = toast('Hello', { toastId });

    expect(id).to.be.eq(toastId);
  });

  it('should handle change event', () => {
    toast.onChange(cy.stub().as('onChange'));

    const id = toast('hello', { data: 'xxxx' });
    cy.get('@onChange').should('have.been.calledWithMatch', {
      status: 'added',
      content: 'hello',
      data: 'xxxx'
    });

    toast.update(id, {
      render: 'world'
    });

    cy.get('@onChange').should('have.been.calledWithMatch', {
      status: 'updated',
      content: 'world'
    });

    toast.dismiss(id);
    cy.get('@onChange').should('have.been.calledWithMatch', {
      status: 'removed'
    });
  });

  it('should unsubsribe from change event', () => {
    const unsub = toast.onChange(cy.stub().as('onChange'));
    unsub();
    toast('hello');
    cy.get('@onChange').should('not.have.been.called');
  });

  it('should be able remove toast programmatically', () => {
    const id = toast('hello');

    cy.findByText('hello').should('exist');

    toast.dismiss(id);

    cy.findByText('hello').should('not.exist');
  });

  describe('update function', () => {
    it('Should be able to update an existing toast', () => {});

    it('Should be able to update the same toast many times', () => {});

    it('Should be able to update a Toast and keep the same content', () => {});

    it('Should update a toast only if it exist and if the container is mounted', () => {});

    it('Should be able to update the toastId', () => {});

    it('Should be able to update a toast even when using multi containers', () => {});
  });

  describe('isActive function', () => {
    it('toast.isActive should return false until the container is mounted', () => {});

    it('Should be able to tell if a toast is active based on the id as soon as the container is mounted', () => {});

    it('Should work with multi container', () => {});
  });

  it('Can append classNames', () => {});

  it('Should be able to use syntaxic sugar for different notification type', () => {});

  describe('Controlled progress bar', () => {
    it('When `toast.done` is called, it should set scaleX to 1', () => {});
  });
});
