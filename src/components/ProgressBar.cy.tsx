import React from 'react';
import { ProgressBar } from './ProgressBar';
import { Theme } from '../types';

const getProps = () => ({
  delay: 5000,
  isRunning: true,
  rtl: false,
  closeToast: cy.stub,
  isIn: true,
  theme: ['colored', 'light', 'dark'][Math.floor(Math.random() * 3)] as Theme
});

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      padding: '1rem',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      outline: '1px solid'
    }}
  >
    {children}
  </div>
);

describe('ProgressBar', () => {
  it('should merge className', () => {
    cy.mount(
      <Wrapper>
        <ProgressBar {...getProps()} className="test" />
      </Wrapper>
    );

    cy.get('.test').should('exist');
  });

  it('should merge className in function form', () => {
    cy.mount(
      <Wrapper>
        <ProgressBar {...getProps()} className={() => 'test'} />
      </Wrapper>
    );

    cy.get('.test').should('exist');
  });

  it('should trigger closeToast when animation end', () => {
    const closeToast = cy.stub().as('closeToast');
    const delay = 1000;
    cy.mount(
      <Wrapper>
        <ProgressBar {...getProps()} closeToast={closeToast} delay={delay} />
      </Wrapper>
    );

    cy.get('@closeToast').should('not.have.been.called');
    cy.wait(delay);
    cy.get('@closeToast').should('have.been.called');
  });

  it('should hide the progress bar', () => {
    cy.mount(
      <Wrapper>
        <ProgressBar {...getProps()} hide />
      </Wrapper>
    );

    cy.get('[role=progressbar]').should('exist').should('not.be.visible');
  });

  it('should pause the progress bar', () => {
    cy.mount(
      <Wrapper>
        <ProgressBar {...getProps()} isRunning={false} />
      </Wrapper>
    );

    cy.findByRole('progressbar')
      .should('have.attr', 'style')
      .and('include', 'animation-play-state: paused');
  });

  it('should control progress bar', () => {
    cy.mount(
      <Wrapper>
        <ProgressBar {...getProps()} controlledProgress progress={0.7} />
      </Wrapper>
    );

    cy.findByRole('progressbar')
      .should('have.attr', 'style')
      .and('include', 'scaleX(0.7)');
  });
});
