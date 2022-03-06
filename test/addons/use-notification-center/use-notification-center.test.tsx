import * as React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';

import {
  useNotificationCenter,
  UseNotificationCenterParams
} from 'react-toastify/addons/use-notification-center';
import { toast, ToastContainer } from 'react-toastify';

jest.useFakeTimers();

// Clear all previous event to avoid any clash between tests
beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    callback(1);
    return 1;
  });
});

afterEach(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
});

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

  return (
    <div>
      <span data-testid="count">{notifications.length}</span>
      <span data-testid="unreadCount">{unreadCount}</span>
      <button onClick={markAllAsRead}>markAllAsRead</button>
      <button onClick={clear}>clear</button>
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
      <button onClick={() => add({ content })}>addNotification</button>
      <button onClick={() => update(updateId, { content })}>
        updateNotification
      </button>
      <ul data-testid="notifications">
        {notifications.map(el => (
          <li key={el.id}>
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

describe('useNotificationCenter', () => {
  it('listen for new notifications', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('unreadCount')).toHaveTextContent('0');

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('unreadCount')).toHaveTextContent('1');
  });

  it('support add notification', () => {
    render(<TestComponent />);

    expect(screen.queryByText('hello')).not.toBeInTheDocument();
    fireEvent.change(screen.getByTestId('content'), {
      target: { value: 'hello' }
    });
    fireEvent.click(screen.getByText(/addNotification/));

    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('support initial state', () => {
    const initialState = [
      { id: 1, createdAt: Date.now(), read: false, content: 'noti1' },
      { id: 2, createdAt: Date.now(), read: true, content: 'noti2' }
    ];
    const unreadCount = initialState
      .reduce((prev, cur) => (!cur.read ? prev + 1 : prev), 0)
      .toString();

    render(<TestComponent data={initialState} />);

    expect(screen.getByTestId('count')).toHaveTextContent(
      initialState.length.toString()
    );
    expect(screen.getByTestId('unreadCount')).toHaveTextContent(unreadCount);

    initialState.forEach(v => {
      expect(screen.getByText(v.content)).toBeInTheDocument();
    });
  });

  it('support update', () => {
    render(<TestComponent />);
    const toastId = 'anId';

    act(() => {
      toast('hello', { toastId });
      jest.runAllTimers();
    });

    expect(screen.getByTestId(`content-${toastId}`)).toHaveTextContent('hello');

    act(() => {
      toast.update(toastId, { render: 'update content' });
      jest.runAllTimers();
    });

    expect(screen.getByTestId(`content-${toastId}`)).toHaveTextContent(
      'update content'
    );

    fireEvent.change(screen.getByTestId('content'), {
      target: { value: 'update 2' }
    });
    fireEvent.change(screen.getByTestId('updateId'), {
      target: { value: toastId }
    });

    fireEvent.click(screen.getByText(/updateNotification/));

    expect(screen.getByTestId(`content-${toastId}`)).toHaveTextContent(
      'update 2'
    );
  });

  it('support filter', () => {
    render(
      <TestComponent
        data={[{ id: 'willBeRemoved', createdAt: Date.now(), read: false }]}
        filter={v => v.id.toString().includes('keep')}
      />
    );

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    expect(screen.getByTestId('count')).toHaveTextContent('0');

    act(() => {
      toast('will be displayed', { toastId: 'keep' });
      jest.runAllTimers();
    });

    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId(`content-keep`)).toHaveTextContent(
      'will be displayed'
    );
  });

  it('support markAllAsRead', () => {
    const initialState = [
      { id: 1, createdAt: Date.now(), read: false, content: 'noti1' },
      { id: 2, createdAt: Date.now(), read: false, content: 'noti2' }
    ];

    render(<TestComponent data={initialState} />);
    expect(screen.getByTestId('unreadCount')).toHaveTextContent('2');
    fireEvent.click(screen.getByText(/markAllAsRead/));

    expect(screen.getByTestId('unreadCount')).toHaveTextContent('0');
  });

  it('support markAsRead', () => {
    const initialState = [
      { id: 1, createdAt: Date.now(), read: false, content: 'noti1' },
      { id: 2, createdAt: Date.now(), read: false, content: 'noti2' }
    ];

    render(<TestComponent data={initialState} />);

    expect(screen.getByTestId('unreadCount')).toHaveTextContent('2');

    fireEvent.change(screen.getByTestId('updateId'), {
      target: { value: 'anId' }
    });

    expect(screen.getByTestId(`read-${initialState[0].id}`)).toHaveTextContent(
      'false'
    );

    fireEvent.click(screen.getByTestId(`markAsRead-${initialState[0].id}`));

    expect(screen.getByTestId('unreadCount')).toHaveTextContent('1');
    expect(screen.getByTestId(`read-${initialState[0].id}`)).toHaveTextContent(
      'true'
    );
  });

  it('support clear', () => {
    const initialState = [
      { id: 1, createdAt: Date.now(), read: false, content: 'noti1' },
      { id: 2, createdAt: Date.now(), read: false, content: 'noti2' }
    ];

    render(<TestComponent data={initialState} />);

    expect(screen.getByTestId('count')).toHaveTextContent('2');

    fireEvent.click(screen.getByText(/clear/));

    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });
});
