import React from 'react';
import { DraggableDirection, ToastProps } from '../types';
import { Default } from '../utils';
import { Toast } from './Toast';
import { defaultProps } from './ToastContainer';

const REQUIRED_PROPS = {
  ...defaultProps,
  isIn: true,
  autoClose: false,
  closeToast: () => {},
  type: 'default',
  toastId: 'id',
  key: 'key',
  collapseAll: () => {}
} as ToastProps;

const cssClasses = {
  rtl: `.${Default.CSS_NAMESPACE}__toast--rtl`,
  closeOnClick: `.${Default.CSS_NAMESPACE}__toast--close-on-click`,
  progressBar: `.${Default.CSS_NAMESPACE}__progress-bar`,
  progressBarController: `.${Default.CSS_NAMESPACE}__progress-bar--controlled`,
  closeButton: `.${Default.CSS_NAMESPACE}__close-button`,
  container: `.${Default.CSS_NAMESPACE}__toast-container`
};

const progressBar = {
  isRunning: () => {
    cy.wait(100);
    cy.findByRole('progressbar')
      .should('have.attr', 'style')
      .and('include', 'animation-play-state: running');
  },
  isPaused: () => {
    cy.wait(100);
    cy.findByRole('progressbar')
      .should('have.attr', 'style')
      .and('include', 'animation-play-state: paused')
      .as('pause progress bar');
  },
  isControlled: (progress: number) => {
    cy.wait(100);
    cy.get(cssClasses.progressBarController).should('exist');
    cy.findByRole('progressbar')
      .should('have.attr', 'style')
      .and('include', `scaleX(${progress})`);
  }
};

describe('Toast', () => {
  for (const { name, className, bodyClassName } of [
    {
      name: 'string',
      className: 'container-class',
      bodyClassName: 'body-class'
    },
    {
      name: 'function',
      className: () => 'container-class',
      bodyClassName: () => 'body-class'
    }
  ]) {
    it(`merge container and body className when using ${name}`, () => {
      cy.mount(
        <Toast
          {...REQUIRED_PROPS}
          className={className}
          bodyClassName={bodyClassName}
        >
          FooBar
        </Toast>
      );

      cy.get('.container-class').should('exist');
      cy.get('.body-class').should('exist');
    });
  }

  it('support rtl', () => {
    cy.mount(
      <Toast {...REQUIRED_PROPS} rtl>
        FooBar
      </Toast>
    );

    cy.get(cssClasses.rtl).should('have.css', 'direction', 'rtl');
  });

  describe('closeOnClick', () => {
    it('call closeToast when enabled', () => {
      const closeToast = cy.stub().as('closeToast');

      cy.mount(
        <Toast {...REQUIRED_PROPS} closeOnClick closeToast={closeToast}>
          FooBar
        </Toast>
      );

      cy.findByRole('alert').click();
      cy.get('@closeToast').should('have.been.called');
    });

    it('does not call closeToast when disabled', () => {
      const closeToast = cy.stub().as('closeToast');

      cy.mount(
        <Toast {...REQUIRED_PROPS} closeOnClick={false} closeToast={closeToast}>
          FooBar
        </Toast>
      );

      cy.findByRole('alert').click();
      cy.get('@closeToast').should('not.have.been.called');
    });
  });

  describe('autoClose', () => {
    it('does not render progress bar when false', () => {
      cy.mount(
        <Toast {...REQUIRED_PROPS} autoClose={false}>
          FooBar
        </Toast>
      );

      cy.findByRole('progressbar').should('not.exist');
    });

    it('resume and pause progress bar', () => {
      cy.mount(
        <Toast {...REQUIRED_PROPS} autoClose={5000}>
          hello
        </Toast>
      );

      cy.resolveEntranceAnimation();

      cy.findByRole('alert').should('be.visible').trigger('mouseover');
      progressBar.isPaused();

      cy.findByRole('alert').trigger('mouseout');
      progressBar.isRunning();

      cy.findByRole('alert').trigger('mouseover');
      progressBar.isPaused();
    });
  });

  it('does not render close button when closeButton is false', () => {
    cy.mount(
      <Toast {...REQUIRED_PROPS} closeButton={false}>
        FooBar
      </Toast>
    );

    cy.findByLabelText('close').should('not.exist');
  });

  it('resume and pause progress bar when pauseOnFocusLoss is enabled', () => {
    cy.mount(
      <Toast {...REQUIRED_PROPS} autoClose={5000} pauseOnFocusLoss>
        hello
      </Toast>
    );

    cy.resolveEntranceAnimation();
    progressBar.isRunning();

    cy.window().blur();
    progressBar.isPaused();

    cy.window().focus();
    progressBar.isRunning();
  });

  it('does not pause progress bar when pauseOnHover is disabled', () => {
    cy.mount(
      <Toast {...REQUIRED_PROPS} autoClose={5000} pauseOnHover={false}>
        hello
      </Toast>
    );

    cy.resolveEntranceAnimation();

    cy.findByRole('alert').trigger('mouseover');
    progressBar.isRunning();
  });

  describe('controller progress bar', () => {
    it('set the correct progress value bar disregarding autoClose value', () => {
      cy.mount(
        <Toast {...REQUIRED_PROPS} progress={0.3} autoClose={false}>
          hello
        </Toast>
      );

      cy.resolveEntranceAnimation();

      progressBar.isControlled(0.3);

      cy.mount(
        <Toast {...REQUIRED_PROPS} progress={0.3} autoClose={5000}>
          hello
        </Toast>
      );

      cy.resolveEntranceAnimation();

      progressBar.isControlled(0.3);
    });

    it('call closeToast when progress value is >= 1', () => {
      const closeToast = cy.stub().as('closeToast');
      cy.mount(
        <Toast {...REQUIRED_PROPS} progress={1.1} closeToast={closeToast}>
          hello
        </Toast>
      );

      cy.findByRole('progressbar').trigger('transitionend');
      cy.get('@closeToast').should('have.been.called');
    });
  });

  it('call closeToast when autoClose duration exceeded', () => {
    const closeToast = cy.stub().as('closeToast');
    cy.mount(
      <Toast {...REQUIRED_PROPS} autoClose={200} closeToast={closeToast}>
        hello
      </Toast>
    );

    cy.get('@closeToast').should('have.been.called');
  });

  it('attach specified attributes: role, id, etc...', () => {
    const style: React.CSSProperties = {
      background: 'purple'
    };
    const bodyStyle: React.CSSProperties = {
      fontWeight: 'bold'
    };

    cy.mount(
      <Toast
        {...REQUIRED_PROPS}
        role="status"
        toastId="foo"
        style={style}
        bodyStyle={bodyStyle}
      >
        hello
      </Toast>
    );

    cy.resolveEntranceAnimation();

    cy.findByRole('status').should('exist');
    cy.get('#foo').should('exist');

    cy.findByRole('status')
      .parent()
      .should('have.attr', 'style')
      .and('include', 'background: purple');
    cy.findByRole('status')
      .should('have.attr', 'style')
      .and('include', 'font-weight: bold');
  });

  for (const { type, value } of [
    {
      type: 'string',
      value: 'hello'
    },
    {
      type: 'react element',
      value: <div>hello</div>
    }
  ]) {
    it(`render ${type}`, () => {
      cy.mount(<Toast {...REQUIRED_PROPS}>{value}</Toast>);

      cy.findByText('hello').should('exist');
    });
  }

  it('override default closeButton', () => {
    cy.mount(
      <Toast {...REQUIRED_PROPS} closeButton={<span>💩</span>}>
        hello
      </Toast>
    );
    cy.resolveEntranceAnimation();

    cy.findByText('💩').should('exist');
  });

  it('fallback to default closeButton', () => {
    cy.mount(
      <Toast {...REQUIRED_PROPS} closeButton={true}>
        hello
      </Toast>
    );
    cy.resolveEntranceAnimation();

    cy.findByLabelText('close').should('exist');
  });

  describe('Drag event', () => {
    beforeEach(() => {
      cy.viewport('macbook-16');
    });

    for (const { axis, delta } of [
      { axis: 'x', delta: { deltaX: -300 } },
      { axis: 'y', delta: { deltaY: 300 } }
    ]) {
      it(`close toast when dragging on ${axis}-axis`, () => {
        cy.mount(
          <div style={{ width: '300px', position: 'fixed', right: 0 }}>
            <Toast
              {...REQUIRED_PROPS}
              autoClose={5000}
              draggable
              draggableDirection={axis as DraggableDirection}
              closeToast={cy.stub().as('closeToast')}
            >
              hello
            </Toast>
          </div>
        );

        cy.resolveEntranceAnimation();

        cy.findByRole('alert').move(delta);
        cy.get('@closeToast').should('have.been.called');
      });
    }

    for (const { axis, delta } of [
      { axis: 'x', delta: { deltaX: -100 } },
      { axis: 'y', delta: { deltaY: 40 } }
    ]) {
      it(`does not close toast when dragging on ${axis}-axis`, () => {
        cy.mount(
          <div style={{ width: '300px', position: 'fixed', right: 0 }}>
            <Toast
              {...REQUIRED_PROPS}
              autoClose={5000}
              draggable
              draggableDirection={axis as DraggableDirection}
              closeToast={cy.stub().as('closeToast')}
            >
              hello
            </Toast>
          </div>
        );

        cy.resolveEntranceAnimation();

        cy.findByRole('alert').move(delta);
        cy.get('@closeToast').should('not.have.been.called');
      });
    }
  });
});
