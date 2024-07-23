import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNotificationCenter } from './useNotificationCenter';
function TestComponent(props) {
    var _a = React.useState(''), content = _a[0], setContent = _a[1];
    var _b = React.useState(''), updateId = _b[0], setUpdateId = _b[1];
    var _c = useNotificationCenter(props || {}), unreadCount = _c.unreadCount, markAllAsRead = _c.markAllAsRead, markAsRead = _c.markAsRead, notifications = _c.notifications, remove = _c.remove, add = _c.add, clear = _c.clear, update = _c.update;
    var flex = {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    };
    return (React.createElement("div", null,
        React.createElement("div", { style: flex },
            React.createElement("button", { onClick: markAllAsRead }, "markAllAsRead"),
            React.createElement("button", { onClick: clear }, "clear"),
            React.createElement("button", { onClick: function () { return add({ content: content }); } }, "addNotification"),
            React.createElement("button", { onClick: function () { return update(updateId, { content: content }); } }, "updateNotification")),
        React.createElement("ul", null,
            React.createElement("li", null,
                React.createElement("span", null, "count"),
                React.createElement("span", { "data-testid": "count" }, notifications.length)),
            React.createElement("li", null,
                React.createElement("span", null, "unread count"),
                React.createElement("span", { "data-testid": "unreadCount" }, unreadCount))),
        React.createElement("input", { "data-testid": "content", type: "text", onChange: function (e) { return setContent(e.target.value); }, value: content }),
        React.createElement("input", { "data-testid": "updateId", type: "text", onChange: function (e) { return setUpdateId(e.target.value); }, value: updateId }),
        React.createElement("ul", { "data-testid": "notifications" }, notifications.map(function (el) { return (React.createElement("li", { key: el.id, style: flex },
            React.createElement("span", { "data-testid": "content-".concat(el.id) }, el.content),
            React.createElement("span", { "data-testid": "read-".concat(el.id) }, el.read.toString()),
            React.createElement("button", { "data-testid": "markAsRead-".concat(el.id), onClick: function () { return markAsRead(el.id); } }, "markAsRead"),
            React.createElement("button", { "data-testid": "remove-".concat(el.id), onClick: function () { return remove(el.id); } }, "remove"))); })),
        React.createElement(ToastContainer, null)));
}
describe('NotificationCenter', function () {
    beforeEach(function () {
        cy.mount(React.createElement(TestComponent, null));
    });
    it('listen for new notifications', function () {
        cy.findByTestId('count').should('contain.text', 0);
        cy.findByTestId('unreadCount').should('contain.text', 0);
        // hacky asf???
        cy.wait(1000).then(function () {
            toast('msg');
            cy.findByTestId('count').should('contain.text', 1, { timeout: 10000 });
            cy.findByTestId('unreadCount').should('contain.text', 1);
        });
    });
    it('add notification', function () {
        cy.findByTestId('count').should('contain.text', 0);
        cy.findByTestId('unreadCount').should('contain.text', 0);
        cy.findByTestId('content').type('something');
        cy.findByText('addNotification').click();
        cy.findByText('something').should('exist');
        cy.findByTestId('count').should('contain.text', 1);
        cy.findByTestId('unreadCount').should('contain.text', 1);
    });
    it('update', function () {
        var id = toast('msg');
        cy.resolveEntranceAnimation();
        toast.update(id, {
            render: 'msg updated'
        });
        cy.findAllByText('msg updated').should('exist');
    });
    it('mark as read a single notification', function () {
        cy.findByTestId('unreadCount').should('contain.text', 0);
        cy.findByTestId('count').should('contain.text', 0);
        var id = toast('msg');
        cy.resolveEntranceAnimation();
        cy.findByTestId('count').should('contain.text', 1);
        cy.findByTestId('unreadCount').should('contain.text', 1);
        cy.findByTestId("read-".concat(id)).should('contain.text', false);
        cy.findByTestId("markAsRead-".concat(id)).click();
        cy.findByTestId('unreadCount').should('contain.text', 0);
        cy.findByTestId("read-".concat(id)).should('contain.text', true);
    });
    describe('with initial state', function () {
        var initialState = [
            {
                id: 1,
                createdAt: Date.now(),
                read: false,
                content: 'noti1'
            },
            {
                id: 2,
                createdAt: Date.now(),
                read: true,
                content: 'noti2'
            }
        ];
        beforeEach(function () {
            cy.mount(React.createElement(TestComponent, { data: initialState }));
        });
        it('handle initial state', function () {
            cy.findByTestId('count').should('contain.text', initialState.length);
            cy.findByTestId('unreadCount').should('contain.text', 1);
            initialState.forEach(function (v) {
                cy.findByText(v.content).should('exist');
            });
        });
        it('clear all', function () {
            cy.findByTestId('count').should('contain.text', initialState.length);
            cy.findByTestId('unreadCount').should('contain.text', 1);
            cy.findByText('clear').click();
            cy.findByTestId('count').should('contain.text', 0);
            cy.findByTestId('unreadCount').should('contain.text', 0);
        });
        it('mark all as read', function () {
            cy.findByTestId('unreadCount').should('contain.text', 1);
            cy.findByText('markAllAsRead').click();
            cy.findByTestId('unreadCount').should('contain.text', 0);
        });
    });
});
//# sourceMappingURL=NotificationCenter.cy.js.map