import React from 'react';
import { ToastContainer } from '../components';
import { toast } from './toast';
beforeEach(function () {
    cy.viewport('macbook-15');
});
describe('without container', function () {
    it('enqueue toasts till container is mounted', function () {
        toast('msg1');
        toast('msg2');
        cy.findByText('msg1').should('not.exist');
        cy.findByText('msg2').should('not.exist');
        cy.mount(React.createElement(ToastContainer, { autoClose: false }));
        cy.resolveEntranceAnimation();
        cy.findByText('msg1').should('exist');
        cy.findByText('msg2').should('exist');
    });
    it('remove toast from render queue', function () {
        toast('msg1');
        var id = toast('msg2');
        toast.dismiss(id);
        cy.mount(React.createElement(ToastContainer, { autoClose: false }));
        cy.resolveEntranceAnimation();
        cy.findByText('msg1').should('exist');
        cy.findByText('msg2').should('not.exist');
    });
});
describe('with container', function () {
    beforeEach(function () {
        cy.mount(React.createElement(ToastContainer, { autoClose: false, closeOnClick: true }));
    });
    it('render toast', function () {
        toast('msg');
        cy.resolveEntranceAnimation();
        cy.findByText('msg').should('exist').click().should('not.exist');
    });
    it('return a new id each time a notification is pushed', function () {
        var firstId = toast('Hello');
        var secondId = toast('Hello');
        expect(firstId).not.to.be.eq(secondId);
    });
    it('use the provided toastId from options', function () {
        var toastId = 11;
        var id = toast('Hello', { toastId: toastId });
        expect(id).to.be.eq(toastId);
    });
    it('handle change event', function () {
        toast.onChange(cy.stub().as('onChange'));
        var id = toast('msg', { data: 'xxxx' });
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
    it('unsubscribe from change event', function () {
        var unsub = toast.onChange(cy.stub().as('onChange'));
        unsub();
        toast('msg');
        cy.get('@onChange').should('not.have.been.called');
    });
    it('be able remove toast programmatically', function () {
        var id = toast('msg');
        cy.findByText('msg').should('exist');
        toast.dismiss(id);
        cy.findByText('msg').should('not.exist');
    });
    it('pause and resume notification', function () {
        var id = toast('msg', {
            autoClose: 10000
        });
        cy.findByRole('progressbar').as('progressBar');
        cy.get('@progressBar')
            .should('have.attr', 'style')
            .and('include', 'animation-play-state: running')
            .then(function () {
            toast.pause({ id: id });
            cy.get('@progressBar')
                .should('have.attr', 'style')
                .and('include', 'animation-play-state: paused')
                .then(function () {
                toast.play({ id: id });
                cy.get('@progressBar')
                    .should('have.attr', 'style')
                    .and('include', 'animation-play-state: running');
            });
        });
    });
    describe('update function', function () {
        it('update an existing toast', function () {
            var id = toast('msg');
            cy.resolveEntranceAnimation();
            cy.findByText('msg')
                .should('exist')
                .then(function () {
                toast.update(id, {
                    render: 'foobar'
                });
                cy.findByText('msg').should('not.exist');
                cy.findByText('foobar').should('exist');
            })
                .then(function () {
                toast.update(id, {
                    render: 'bazbar'
                });
                cy.findByText('foobar').should('not.exist');
                cy.findByText('bazbar').should('exist');
            });
        });
        it('keep the same content', function () {
            var id = toast('msg');
            cy.resolveEntranceAnimation();
            cy.findByText('msg').should('exist');
            cy.get('.myClass')
                .should('not.exist')
                .then(function () {
                toast.update(id, {
                    className: 'myClass'
                });
                cy.get('.myClass').should('exist');
                cy.findByText('msg').should('exist');
            });
        });
        it('update a toast only when it exists', function () {
            toast.update(0, {
                render: 'msg'
            });
            cy.resolveEntranceAnimation();
            cy.findByText('msg').should('not.exist');
        });
        it('update the toastId', function () {
            var id = toast('msg');
            var nextId = 123;
            cy.resolveEntranceAnimation();
            cy.findByText('msg')
                .should('exist')
                .then(function () {
                expect(toast.isActive(id)).to.be.true;
                toast.update(id, {
                    render: 'foobar',
                    toastId: nextId
                });
            });
            cy.findByText('foobar')
                .should('exist')
                .then(function () {
                expect(toast.isActive(id)).to.be.false;
                expect(toast.isActive(nextId)).to.be.true;
            });
        });
    });
    it('can append classNames', function () {
        toast('msg', {
            className: 'class1',
            bodyClassName: 'class2',
            progressClassName: 'class3'
        });
        cy.get('.class1').should('exist');
        cy.get('.class2').should('exist');
        cy.get('.class3').should('exist');
    });
    it('uses syntactic sugar for different notification type', function () {
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
    it('handle controlled progress bar', function () {
        var id = toast('msg', {
            progress: 0.3
        });
        cy.resolveEntranceAnimation();
        cy.findByRole('progressbar')
            .should('have.attr', 'style')
            .and('include', 'scaleX(0.3)')
            .then(function () {
            toast.done(id);
            cy.findByRole('progressbar')
                .should('have.attr', 'style')
                .and('include', 'scaleX(1)');
        });
    });
    it('handle rejected promise', function () {
        function rejectPromise() {
            return new Promise(function (_, reject) {
                setTimeout(function () {
                    reject(new Error('oops'));
                }, 2000);
            });
        }
        toast.promise(rejectPromise, {
            pending: 'loading',
            error: {
                render: function (props) {
                    var _a;
                    return React.createElement(React.Fragment, null, (_a = props.data) === null || _a === void 0 ? void 0 : _a.message);
                }
            }
        });
        cy.resolveEntranceAnimation();
        cy.findByText('loading').should('exist');
        cy.wait(2000);
        cy.findByText('loading').should('not.exist');
        cy.findByText('oops').should('exist');
    });
    it('handle resolved promise', function () {
        function resolvePromise() {
            return new Promise(function (resolve, _) {
                setTimeout(function () {
                    resolve('it worked');
                }, 2000);
            });
        }
        toast.promise(resolvePromise, {
            pending: 'loading',
            success: {
                render: function (props) {
                    return React.createElement(React.Fragment, null, props.data);
                }
            }
        });
        cy.resolveEntranceAnimation();
        cy.findByText('loading').should('exist');
        cy.wait(2000);
        cy.findByText('loading').should('not.exist');
        cy.findByText('it worked').should('exist');
    });
    it('support onOpen and onClose callback', function () {
        var id = toast('msg', {
            onOpen: cy.stub().as('onOpen'),
            onClose: cy.stub().as('onClose')
        });
        cy.resolveEntranceAnimation();
        cy.get('@onOpen').should('have.been.calledOnce');
        toast.dismiss(id);
        cy.get('@onClose').should('have.been.calledOnce');
    });
    it('remove all toasts', function () {
        toast('msg1');
        toast('msg2');
        cy.resolveEntranceAnimation();
        cy.findByText('msg1').should('exist');
        cy.findByText('msg2')
            .should('exist')
            .then(function () {
            toast.dismiss();
            cy.findByText('msg1').should('not.exist');
            cy.findByText('msg2').should('not.exist');
        });
    });
});
describe('with multi containers', function () {
    var Containers = {
        First: 'first',
        Second: 'second',
        Third: 'third'
    };
    beforeEach(function () {
        cy.mount(React.createElement(React.Fragment, null,
            React.createElement(ToastContainer, { autoClose: false, position: "top-left", limit: 1, containerId: Containers.First, closeOnClick: true }),
            React.createElement(ToastContainer, { autoClose: false, position: "top-right", limit: 1, containerId: Containers.Second, closeOnClick: true }),
            React.createElement(ToastContainer, { autoClose: false, position: "bottom-right", limit: 10, containerId: Containers.Third, closeOnClick: true })));
    });
    it('update a toast even when using multi containers', function () {
        toast('first container', {
            containerId: Containers.First
        });
        var id = toast('second container', {
            containerId: Containers.Second
        });
        cy.resolveEntranceAnimation();
        cy.findByText('first container').should('exist');
        cy.findByText('second container')
            .should('exist')
            .then(function () {
            toast.update(id, {
                render: 'second container updated',
                containerId: Containers.Second
            });
            cy.findByText('second container updated').should('exist');
        });
    });
    it('remove toast for a given container', function () {
        var toastId = '123';
        toast('first container', {
            toastId: toastId,
            containerId: Containers.First
        });
        toast('second container', {
            toastId: toastId,
            containerId: Containers.Second
        });
        cy.resolveEntranceAnimation();
        cy.findByText('first container').should('exist');
        cy.findByText('second container')
            .should('exist')
            .then(function () {
            toast.dismiss({
                containerId: Containers.Second,
                id: toastId
            });
            cy.findByText('first container').should('exist');
            cy.findByText('second container').should('not.exist');
        });
    });
    it('remove all toasts for a given container', function () {
        var toastId = '123';
        toast('first container', {
            toastId: toastId,
            containerId: Containers.First
        });
        toast('third container', {
            toastId: toastId,
            containerId: Containers.Third
        });
        toast('third container second toast', {
            containerId: Containers.Third
        });
        cy.resolveEntranceAnimation();
        cy.findByText('first container').should('exist');
        cy.findByText('third container second toast').should('exist');
        cy.findByText('third container')
            .should('exist')
            .then(function () {
            toast.dismiss({
                containerId: Containers.Third
            });
            cy.resolveEntranceAnimation();
            cy.findByText('first container').should('exist');
            cy.findByText('third container').should('not.exist');
            cy.findByText('third container second toast').should('not.exist');
            cy.findByText('first container')
                .should('exist')
                .then(function () {
                toast.dismiss({ containerId: 'Non-Existing Container Id' });
                cy.findByText('first container').should('not.exist');
                cy.findByText('third container').should('not.exist');
            });
        });
    });
    it('clear waiting queue for a given container', function () {
        toast('msg1-c1', {
            containerId: Containers.First
        });
        toast('msg2-c1', {
            containerId: Containers.First
        });
        toast('msg1-c2', {
            containerId: Containers.Second
        });
        toast('msg2-c2', {
            containerId: Containers.Second
        });
        cy.resolveEntranceAnimation();
        cy.findByText('msg2-c1').should('not.exist');
        cy.findByText('msg2-c2').should('not.exist');
        cy.findByText('msg1-c1').should('exist');
        cy.findByText('msg1-c2').should('exist');
        cy.findByText('msg1-c1').then(function () {
            toast.clearWaitingQueue({ containerId: Containers.First });
            cy.findByText('msg1-c1')
                .click()
                .then(function () {
                cy.resolveEntranceAnimation();
                cy.findByText('msg1-c1').should('not.exist');
                cy.findByText('msg2-c1').should('not.exist');
            });
        });
    });
    describe('with limit', function () {
        beforeEach(function () {
            cy.mount(React.createElement(ToastContainer, { autoClose: false, limit: 2, closeOnClick: true }));
        });
        it('limit the number of toast displayed', function () {
            toast('msg1');
            toast('msg2');
            toast('msg3');
            cy.resolveEntranceAnimation();
            cy.findByText('msg3').should('not.exist');
            cy.findByText('msg1').should('exist');
            cy.findByText('msg2')
                .should('exist')
                .click()
                .then(function () {
                cy.resolveEntranceAnimation();
                cy.findByText('msg3').should('exist');
            });
        });
        it('clear waiting queue', function () {
            toast('msg1');
            toast('msg2');
            toast('msg3');
            cy.resolveEntranceAnimation();
            cy.findByText('msg3').should('not.exist');
            cy.findByText('msg1').should('exist');
            cy.findByText('msg2')
                .should('exist')
                .then(function () {
                toast.clearWaitingQueue();
                cy.findByText('msg2')
                    .click()
                    .then(function () {
                    cy.resolveEntranceAnimation();
                    cy.findByText('msg3').should('not.exist');
                });
            });
        });
    });
});
describe('with stacked container', function () {
    beforeEach(function () {
        cy.mount(React.createElement(ToastContainer, { autoClose: false, stacked: true }));
    });
    it('render toasts', function () {
        toast('hello 1');
        toast('hello 2');
        toast('hello 3');
        cy.findByText('hello 1').should('exist').and('not.be.visible');
        cy.findByText('hello 2').should('exist').and('not.be.visible');
        cy.findByText('hello 3').should('exist').and('be.visible');
    });
});
//# sourceMappingURL=toast.cy.js.map