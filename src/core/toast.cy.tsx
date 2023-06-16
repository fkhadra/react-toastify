import React from 'react';
import { ToastContainer } from '../components';
import { toast } from './toast';

beforeEach(() => {
  cy.viewport('macbook-15');
});

describe('without container', () => {
  it('should enqueue toasts till container is mounted', () => {
    toast('msg1');
    toast('msg2');

    cy.findByText('msg1').should('not.exist');
    cy.findByText('msg2').should('not.exist');

    cy.mount(<ToastContainer autoClose={false} />);

    cy.resolveEntranceAnimation();
    cy.findByText('msg1').should('exist');
    cy.findByText('msg2').should('exist');
  });

  it('should remove toast from render queue', () => {
    toast('msg1');
    const id = toast('msg2');
    toast.dismiss(id);

    cy.mount(<ToastContainer autoClose={false} />);
    cy.resolveEntranceAnimation();

    cy.findByText('msg1').should('exist');
    cy.findByText('msg2').should('not.exist');
  });
});

describe('with container', () => {
  beforeEach(() => {
    cy.mount(<ToastContainer autoClose={false} />);
  });

  it('should render toast', () => {
    toast('msg');
    cy.resolveEntranceAnimation();
    cy.findByText('msg').should('exist').click().should('not.exist');
  });

  it('should return a new id each time a notification is pushed', () => {
    const firstId = toast('Hello');
    const secondId = toast('Hello');

    expect(firstId).not.to.be.eq(secondId);
  });

  it('should use the provided toastId from options', () => {
    const toastId = 11;
    const id = toast('Hello', { toastId });

    expect(id).to.be.eq(toastId);
  });

  it('should handle change event', () => {
    toast.onChange(cy.stub().as('onChange'));

    const id = toast('msg', { data: 'xxxx' });
    cy.get('@onChange').should('have.been.calledWithMatch', {
      status: 'added',
      content: 'msg',
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
    toast('msg');
    cy.get('@onChange').should('not.have.been.called');
  });

  it('should be able remove toast programmatically', () => {
    const id = toast('msg');

    cy.findByText('msg').should('exist');

    toast.dismiss(id);

    cy.findByText('msg').should('not.exist');
  });

  describe('update function', () => {
    it('should be able to update an existing toast', () => {
      const id = toast('msg');

      cy.resolveEntranceAnimation();
      cy.findByText('msg')
        .should('exist')
        .then(() => {
          toast.update(id, {
            render: 'foobar'
          });

          cy.findByText('msg').should('not.exist');
          cy.findByText('foobar').should('exist');
        })
        .then(() => {
          toast.update(id, {
            render: 'bazbar'
          });
          cy.findByText('foobar').should('not.exist');
          cy.findByText('bazbar').should('exist');
        });
    });

    it('should be able to update a Toast and keep the same content', () => {
      const id = toast('msg');

      cy.resolveEntranceAnimation();
      cy.findByText('msg').should('exist');
      cy.get('.myClass')
        .should('not.exist')
        .then(() => {
          toast.update(id, {
            className: 'myClass'
          });

          cy.get('.myClass').should('exist');
          cy.findByText('msg').should('exist');
        });
    });

    it('should update a toast only if it exist and if the container is mounted', () => {
      toast.update(0, {
        render: 'msg'
      });

      cy.resolveEntranceAnimation();
      cy.findByText('msg').should('not.exist');
    });

    it('should be able to update the toastId', () => {
      const id = toast('msg');
      const nextId = 123;

      cy.resolveEntranceAnimation();

      cy.findByText('msg')
        .should('exist')
        .then(() => {
          expect(toast.isActive(id)).to.be.true;
          toast.update(id, {
            render: 'foobar',
            toastId: nextId
          });
        });

      cy.findByText('foobar')
        .should('exist')
        .then(() => {
          expect(toast.isActive(id)).to.be.false;
          expect(toast.isActive(nextId)).to.be.true;
        });
    });
  });

  it('Can append classNames', () => {
    toast('msg', {
      className: 'class1',
      bodyClassName: 'class2',
      progressClassName: 'class3'
    });

    cy.get('.class1').should('exist');
    cy.get('.class2').should('exist');
    cy.get('.class3').should('exist');
  });

  it('should be able to use syntaxic sugar for different notification type', () => {
    toast('default');
    toast.success('success');
    toast.error('error');
    toast.warning('warning');
    toast.info('info');
    toast.warn('warn');
    toast.dark('dark');

    cy.resolveEntranceAnimation();

    cy.findByText('default').should('exist');
    cy.findByText('success').should('exist');
    cy.findByText('error').should('exist');
    cy.findByText('warning').should('exist');
    cy.findByText('info').should('exist');
    cy.findByText('warn').should('exist');
    cy.findByText('dark').should('exist');
  });

  it('handle controlled progress bar', () => {
    const id = toast('msg', {
      progress: 0.3
    });

    cy.resolveEntranceAnimation();
    cy.findByRole('progressbar')
      .should('have.attr', 'style')
      .and('include', 'scaleX(0.3)')
      .then(() => {
        toast.done(id);
        cy.findByRole('progressbar')
          .should('have.attr', 'style')
          .and('include', 'scaleX(1)');
      });
  });

  it('handle rejected promise', () => {
    function rejectPromise() {
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('oops'));
        }, 2000);
      });
    }

    toast.promise<unknown, Error>(rejectPromise, {
      pending: 'loading',
      error: {
        render(props) {
          return <>{props.data?.message}</>;
        }
      }
    });

    cy.resolveEntranceAnimation();
    cy.findByText('loading').should('exist');

    cy.wait(2000);
    cy.findByText('loading').should('not.exist');
    cy.findByText('oops').should('exist');
  });

  it('handle resolved promise', () => {
    function resolvePromise() {
      return new Promise<string>((resolve, _) => {
        setTimeout(() => {
          resolve('it worked');
        }, 2000);
      });
    }

    toast.promise<string>(resolvePromise, {
      pending: 'loading',
      success: {
        render(props) {
          return <>{props.data}</>;
        }
      }
    });

    cy.resolveEntranceAnimation();
    cy.findByText('loading').should('exist');

    cy.wait(2000);
    cy.findByText('loading').should('not.exist');
    cy.findByText('it worked').should('exist');
  });

  it('support onOpen and onClose callback', () => {
    const id = toast('msg', {
      onOpen: cy.stub().as('onOpen'),
      onClose: cy.stub().as('onClose')
    });

    cy.resolveEntranceAnimation();

    cy.get('@onOpen').should('have.been.calledOnce');
    toast.dismiss(id);
    cy.get('@onClose').should('have.been.calledOnce');
  });

  it('remove all toasts', () => {
    toast('msg1');
    toast('msg2');

    cy.resolveEntranceAnimation();
    cy.findByText('msg1').should('exist');
    cy.findByText('msg2')
      .should('exist')
      .then(() => {
        toast.dismiss();
        cy.findByText('msg1').should('not.exist');
        cy.findByText('msg2').should('not.exist');
      });
  });
});

describe('with limit', () => {
  it('limit the numder of toast displayed', () => {
    cy.mount(<ToastContainer autoClose={false} limit={2} />);

    toast('msg1');
    toast('msg2');
    toast('msg3');
    cy.resolveEntranceAnimation();

    cy.findByText('msg3').should('not.exist');
    cy.findByText('msg1').should('exist');
    cy.findByText('msg2')
      .should('exist')
      .click()
      .then(() => {
        cy.resolveEntranceAnimation();
        cy.findByText('msg3').should('exist');
      });
  });

  it('clear waiting queue', () => {
    cy.mount(<ToastContainer autoClose={false} limit={2} />);

    toast('msg1');
    toast('msg2');
    toast('msg3');
    cy.resolveEntranceAnimation();

    cy.findByText('msg3').should('not.exist');
    cy.findByText('msg1').should('exist');
    cy.findByText('msg2')
      .should('exist')
      .then(() => {
        toast.clearWaitingQueue();
        cy.findByText('msg2')
          .click()
          .then(() => {
            cy.resolveEntranceAnimation();
            cy.findByText('msg3').should('not.exist');
          });
      });
  });

  beforeEach(() => {
    cy.mount(
      <>
        <ToastContainer
          position="top-left"
          autoClose={false}
          limit={1}
          containerId="1"
        />
        <ToastContainer
          position="top-right"
          autoClose={false}
          limit={1}
          containerId="xxx"
        />
      </>
    );
  });

  it.only('clear waiting queue for a given container', () => {
    toast('msg1-c1', {
      containerId: '1'
    });
    toast('msg2-c1', {
      containerId: '1'
    });

    toast('msg1-c2', {
      containerId: 'xxx'
    });
    toast('msg2-c2', {
      containerId: '2'
    });

    cy.resolveEntranceAnimation();

    // cy.findByText('msg2-c1').should('not.exist');
    // cy.findByText('msg2-c2').should('not.exist');

    // cy.findByText('msg1-c1').should('exist');
    // cy.findByText('msg1-c2').should('exist');

    // cy.findByText('msg1-c1').then(() => {
    //   toast.clearWaitingQueue({ containerId: '1' });
    //   cy.findByText('msg1-c1')
    //     .click()
    //     .then(() => {
    //       cy.resolveEntranceAnimation();
    //       cy.findByText('msg1-c1').should('not.exist');
    //       cy.findByText('msg2-c1').should('exist');
    //     });
    // });
  });
});

describe('with multi containers', () => {
  const Containers = {
    First: 'first',
    Second: 'second'
  };

  beforeEach(() => {
    cy.mount(
      <>
        <ToastContainer
          autoClose={false}
          position="top-left"
          containerId={Containers.First}
        />
        <ToastContainer
          autoClose={false}
          position="top-right"
          containerId={Containers.Second}
        />
      </>
    );
  });

  it('should be able to update a toast even when using multi containers', () => {
    toast('first container', {
      containerId: Containers.First
    });

    toast('second container', {
      containerId: Containers.Second
    });

    cy.resolveEntranceAnimation();
  });
});
