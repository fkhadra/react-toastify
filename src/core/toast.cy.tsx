import React from 'react';
import { ToastContainer } from '../components';
import { toast } from './toast';

beforeEach(() => {
  cy.viewport('macbook-15');
});

describe('without container', () => {
  it('enqueue toasts till container is mounted', () => {
    toast('msg1');
    toast('msg2');

    cy.findByText('msg1').should('not.exist');
    cy.findByText('msg2').should('not.exist');

    cy.mount(<ToastContainer autoClose={false} />);

    cy.resolveEntranceAnimation();
    cy.findByText('msg1').should('exist');
    cy.findByText('msg2').should('exist');
  });

  it('remove toast from render queue', () => {
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
    cy.mount(
      <>
        <ToastContainer autoClose={false} closeOnClick />
        <button onClick={() => toast('msg')}>display msg</button>
      </>
    );
  });

  it('render toast', () => {
    cy.mount(
      <>
        <ToastContainer autoClose={false} closeOnClick />
        <button onClick={() => toast('msg')}>display msg</button>
      </>
    );
    cy.findByRole('button').click();
    cy.findByText('msg').should('exist');
  });

  it('return a new id each time a notification is pushed', () => {
    const firstId = toast('Hello');
    const secondId = toast('Hello');

    expect(firstId).not.to.be.eq(secondId);
  });

  it('use the provided toastId from options', () => {
    const toastId = 11;
    const id = toast('Hello', { toastId });

    expect(id).to.be.eq(toastId);
  });

  it('handle change event', () => {
    toast.onChange(cy.stub().as('onChange'));
    const id = 'qq';

    cy.mount(
      <>
        <button
          onClick={() => {
            toast('msg', { data: 'xxxx', toastId: id });
          }}
        >
          display msg
        </button>
        <button
          onClick={() => {
            toast.update(id, {
              render: 'world'
            });
          }}
        >
          update
        </button>
        <button onClick={() => toast.dismiss(id)}>remove</button>
        <ToastContainer />
      </>
    );

    cy.findByRole('button', { name: 'display msg' }).click();

    cy.get('@onChange').should('have.been.calledWithMatch', {
      status: 'added',
      content: 'msg',
      data: 'xxxx'
    });

    cy.findByRole('button', { name: 'update' }).click();

    cy.get('@onChange').should('have.been.calledWithMatch', {
      status: 'updated',
      content: 'world'
    });

    // cy.wait(1000);

    // cy.findByRole('button', { name: 'remove' }).click();
    //
    // cy.get('@onChange').should('have.been.calledWithMatch', {
    //   status: 'removed'
    // });
  });

  it('unsubscribe from change event', () => {
    const unsub = toast.onChange(cy.stub().as('onChange'));
    unsub();
    cy.findByRole('button').click();
    cy.get('@onChange').should('not.have.been.called');
  });

  describe('sa', () => {
    // it('be able remove toast programmatically', () => {
    //   const id = 'test';
    //
    //   cy.mount(
    //     <>
    //       <button
    //         onClick={() => {
    //           toast('msg', { toastId: id });
    //         }}
    //       >
    //         display msg
    //       </button>
    //       <button onClick={() => toast.dismiss(id)}>remove</button>
    //       <ToastContainer />
    //     </>
    //   );
    //
    //   cy.findByRole('button', { name: 'display msg' }).click();
    //   cy.findByText('msg').should('exist');
    //
    //   cy.findByRole('button', { name: 'remove' }).click();
    //   cy.resolveEntranceAnimation();
    //   cy.findByText('msg').should('not.exist');
    // });

    it('pause and resume notification', () => {
      const id = toast('msg', {
        autoClose: 10000
      });

      cy.findByRole('progressbar').as('progressBar');

      cy.get('@progressBar')
        .should('have.attr', 'style')
        .and('include', 'animation-play-state: running')
        .then(() => {
          toast.pause({ id });
          cy.get('@progressBar')
            .should('have.attr', 'style')
            .and('include', 'animation-play-state: paused')
            .then(() => {
              toast.play({ id });

              cy.get('@progressBar').should('have.attr', 'style').and('include', 'animation-play-state: running');
            });
        });
    });
  });

  describe('update function', () => {
    it('update an existing toast', () => {
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

    it('keep the same content', () => {
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

    it('update a toast only when it exists', () => {
      toast.update(0, {
        render: 'msg'
      });

      cy.resolveEntranceAnimation();
      cy.findByText('msg').should('not.exist');
    });

    it('update the toastId', () => {
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

  it('can append classNames', () => {
    toast('msg', {
      className: 'class1',
      progressClassName: 'class3'
    });

    cy.get('.class1').should('exist');
    cy.get('.class3').should('exist');
  });

  it('uses syntactic sugar for different notification type', () => {
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
        cy.findByRole('progressbar').should('have.attr', 'style').and('include', 'scaleX(1)');
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
    const id = 'hello';

    cy.mount(
      <>
        <button
          onClick={() => {
            toast('msg', {
              toastId: id,
              onOpen: cy.stub().as('onOpen'),
              onClose: cy.stub().as('onClose')
            });
          }}
        >
          display msg
        </button>
        <button onClick={() => toast.dismiss(id)}>remove</button>
        <ToastContainer />
      </>
    );

    cy.findByRole('button', { name: 'display msg' }).click();
    cy.get('@onOpen').should('have.been.calledOnce');

    cy.findByRole('button', { name: 'remove' }).click();
    cy.get('@onClose').should('have.been.calledOnce');
  });

  xit('remove all toasts', () => {
    cy.mount(
      <>
        <button
          onClick={() => {
            toast('msg1');
            // toast('msg2');
          }}
        >
          display msg
        </button>
        <button
          onClick={() => {
            toast.dismiss();
          }}
        >
          remove
        </button>
        <ToastContainer />
      </>
    );

    cy.findByRole('button', { name: 'display msg' }).click();
    cy.findByText('msg1').should('exist');

    cy.findByRole('button', { name: 'remove' }).click();
    cy.wait(2000);
    cy.findByText('msg1').should('not.exist');
  });
});

describe.skip('with multi containers', () => {
  const Containers = {
    First: 'first',
    Second: 'second',
    Third: 'third'
  };

  it('clear waiting queue for a given container', () => {
    cy.mount(
      <>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <button
            onClick={() => {
              toast('msg1-c1', {
                containerId: Containers.First
              });
              toast('msg2-c1', {
                containerId: Containers.First
              });
            }}
          >
            first
          </button>
          <button
            onClick={() => {
              toast('msg1-c2', {
                containerId: Containers.Second
              });
              toast('msg2-c2', {
                containerId: Containers.Second
              });
            }}
          >
            second
          </button>
          <button
            onClick={() => {
              toast.clearWaitingQueue({ containerId: Containers.First });
            }}
          >
            clear
          </button>
        </div>

        <ToastContainer autoClose={false} position="top-left" limit={1} containerId={Containers.First} closeOnClick />
        <ToastContainer autoClose={false} position="top-right" limit={1} containerId={Containers.Second} closeOnClick />
      </>
    );
    cy.findByRole('button', { name: 'first' }).click();
    cy.findByRole('button', { name: 'second' }).click();
    cy.resolveEntranceAnimation();

    cy.findByText('msg2-c1').should('not.exist');
    cy.findByText('msg2-c2').should('not.exist');

    cy.findByText('msg1-c1').should('exist');
    cy.findByText('msg1-c2').should('exist');

    cy.findByText('msg1-c1').then(() => {
      cy.findByRole('button', { name: 'clear' }).click();
      cy.findByText('msg1-c1')
        .click()
        .then(() => {
          cy.resolveEntranceAnimation();
          cy.findByText('msg1-c1').should('not.exist');
          cy.findByText('msg2-c1').should('not.exist');
        });
    });
  });

  it('update a toast even when using multi containers', () => {
    const id = 'boo';

    cy.mount(
      <>
        <button
          onClick={() => {
            toast('second container', {
              toastId: id,
              containerId: Containers.Second
            });
          }}
        >
          notify
        </button>
        <button
          onClick={() => {
            toast.update(id, {
              render: 'second container updated',
              containerId: Containers.Second
            });
          }}
        >
          update
        </button>
        <ToastContainer autoClose={false} position="top-right" containerId={Containers.Second} closeOnClick />
      </>
    );
    cy.findByRole('button', { name: 'notify' }).click();
    cy.resolveEntranceAnimation();

    cy.findByText('second container')
      .should('exist')
      .then(() => {
        cy.findByRole('button', { name: 'update' }).click();
        cy.findByText('second container updated').should('exist');
      });
  });

  xit('remove toast for a given container', () => {
    const toastId = '123';

    cy.mount(
      <>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <button
            onClick={() => {
              toast('second container', {
                toastId,
                containerId: Containers.Second
              });
            }}
          >
            notify
          </button>
          <button
            onClick={() => {
              toast.dismiss({
                containerId: Containers.Second,
                id: toastId
              });
            }}
          >
            clear
          </button>
        </div>

        <ToastContainer autoClose={false} position="top-right" containerId={Containers.Second} closeOnClick />
      </>
    );

    cy.findByRole('button', { name: 'notify' }).click();
    cy.resolveEntranceAnimation();

    cy.findByText('second container')
      .should('exist')
      .then(() => {
        cy.findByRole('button', { name: 'clear' }).click();

        cy.findByText('second container').should('not.exist');
      });
  });

  xit('remove all toasts for a given container', () => {
    const toastId = '123';

    cy.mount(
      <>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <button
            onClick={() => {
              toast('first container', {
                toastId,
                containerId: Containers.First
              });
              toast('third container', {
                toastId,
                containerId: Containers.Third
              });
              toast('third container second toast', {
                containerId: Containers.Third
              });
            }}
          >
            notify
          </button>
          <button
            onClick={() => {
              toast.dismiss({
                containerId: Containers.Third
              });
            }}
          >
            clear third
          </button>
          <button
            onClick={() => {
              toast.dismiss({ containerId: 'Non-Existing Container Id' });
            }}
          >
            clear non-existent
          </button>
        </div>

        <ToastContainer autoClose={false} position="top-left" containerId={Containers.First} closeOnClick />
        <ToastContainer autoClose={false} position="top-right" containerId={Containers.Second} closeOnClick />
        <ToastContainer autoClose={false} position="top-right" containerId={Containers.Third} closeOnClick />
      </>
    );

    cy.findByRole('button', { name: 'notify' }).click();

    cy.resolveEntranceAnimation();

    cy.findByText('first container').should('exist');
    cy.findByText('third container second toast').should('exist');
    cy.findByText('third container')
      .should('exist')
      .then(() => {
        cy.findByRole('button', { name: 'clear third' }).click();
        cy.resolveEntranceAnimation();

        cy.findByText('first container').should('exist');
        cy.findByText('third container').should('not.exist');
        cy.findByText('third container second toast').should('not.exist');
        cy.findByText('first container')
          .should('exist')
          .then(() => {
            cy.findByRole('button', { name: 'clear non-existent' }).click();
            cy.findByText('first container').should('not.exist');
            cy.findByText('third container').should('not.exist');
          });
      });
  });

  describe('with limit', () => {
    beforeEach(() => {
      cy.mount(<ToastContainer autoClose={false} limit={2} closeOnClick />);
    });
    it('limit the number of toast displayed', () => {
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
  });
});

describe('with stacked container', () => {
  it('render toasts', () => {
    cy.mount(<ToastContainer autoClose={false} stacked />);
    toast('hello 1');
    toast('hello 2');
    toast('hello 3');

    cy.findByText('hello 1').should('exist').and('not.be.visible');
    cy.findByText('hello 2').should('exist').and('not.be.visible');
    cy.findByText('hello 3').should('exist').and('be.visible');
  });
});
