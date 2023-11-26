import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import {
  NotificationCenterItem,
  UseNotificationCenterParams,
  useNotificationCenter
} from './useNotificationCenter';

function TestComponent(props: UseNotificationCenterParams) {
  const [content, setContent] = React.useState('');
  const [updateId, setUpdateId] = React.useState('');
  const {
    unreadCount,
    markAllAsRead,
    markAsRead,
    notifications,
    remove,
    add,
    clear,
    update
  } = useNotificationCenter(props || {});

  const flex = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  };

  return (
    <div>
      <div style={flex}>
        <button onClick={markAllAsRead}>markAllAsRead</button>
        <button onClick={clear}>clear</button>
        <button onClick={() => add({ content })}>addNotification</button>
        <button onClick={() => update(updateId, { content })}>
          updateNotification
        </button>
      </div>
      <ul>
        <li>
          <span>count</span>
          <span data-testid="count">{notifications.length}</span>
        </li>
        <li>
          <span>unread count</span>
          <span data-testid="unreadCount">{unreadCount}</span>
        </li>
      </ul>

      <input
        data-testid="content"
        type="text"
        onChange={e => setContent(e.target.value)}
        value={content}
      />
      <input
        data-testid="updateId"
        type="text"
        onChange={e => setUpdateId(e.target.value)}
        value={updateId}
      />

      <ul data-testid="notifications">
        {notifications.map(el => (
          <li key={el.id} style={flex}>
            {/* @ts-ignore */}
            <span data-testid={`content-${el.id}`}>{el.content}</span>
            <span data-testid={`read-${el.id}`}>{el.read.toString()}</span>
            <button
              data-testid={`markAsRead-${el.id}`}
              onClick={() => markAsRead(el.id)}
            >
              markAsRead
            </button>
            <button
              data-testid={`remove-${el.id}`}
              onClick={() => remove(el.id)}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

describe('NotificationCenter', () => {
  beforeEach(() => {
    cy.mount(<TestComponent />);
  });

  it('listen for new notifications', () => {
    cy.findByTestId('count').should('contain.text', 0);
    cy.findByTestId('unreadCount').should('contain.text', 0);

    // hacky asf???
    cy.wait(1000).then(() => {
      toast('msg');
      cy.findByTestId('count').should('contain.text', 1, { timeout: 10000 });
      cy.findByTestId('unreadCount').should('contain.text', 1);
    });
  });

  it('add notification', () => {
    cy.findByTestId('count').should('contain.text', 0);
    cy.findByTestId('unreadCount').should('contain.text', 0);

    cy.findByTestId('content').type('something');
    cy.findByText('addNotification').click();

    cy.findByText('something').should('exist');
    cy.findByTestId('count').should('contain.text', 1);
    cy.findByTestId('unreadCount').should('contain.text', 1);
  });

  it('update', () => {
    const id = toast('msg');

    cy.resolveEntranceAnimation();

    toast.update(id, {
      render: 'msg updated'
    });
    cy.findAllByText('msg updated').should('exist');
  });

  it('mark as read a single notification', () => {
    cy.findByTestId('unreadCount').should('contain.text', 0);
    cy.findByTestId('count').should('contain.text', 0);
    const id = toast('msg');
    cy.resolveEntranceAnimation();

    cy.findByTestId('count').should('contain.text', 1);
    cy.findByTestId('unreadCount').should('contain.text', 1);
    cy.findByTestId(`read-${id}`).should('contain.text', false);

    cy.findByTestId(`markAsRead-${id}`).click();
    cy.findByTestId('unreadCount').should('contain.text', 0);
    cy.findByTestId(`read-${id}`).should('contain.text', true);
  });

  describe('with initial state', () => {
    const initialState: NotificationCenterItem[] = [
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

    beforeEach(() => {
      cy.mount(<TestComponent data={initialState} />);
    });

    it('handle initial state', () => {
      cy.findByTestId('count').should('contain.text', initialState.length);

      cy.findByTestId('unreadCount').should('contain.text', 1);

      initialState.forEach(v => {
        cy.findByText(v.content as string).should('exist');
      });
    });

    it('clear all', () => {
      cy.findByTestId('count').should('contain.text', initialState.length);
      cy.findByTestId('unreadCount').should('contain.text', 1);

      cy.findByText('clear').click();

      cy.findByTestId('count').should('contain.text', 0);
      cy.findByTestId('unreadCount').should('contain.text', 0);
    });

    it('mark all as read', () => {
      cy.findByTestId('unreadCount').should('contain.text', 1);

      cy.findByText('markAllAsRead').click();

      cy.findByTestId('unreadCount').should('contain.text', 0);
    });
  });
});
