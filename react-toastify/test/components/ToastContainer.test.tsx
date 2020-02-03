import React from 'react';
import { render } from '@testing-library/react';

import { ToastContainer } from '../../src/components/ToastContainer';

import { toast, eventManager } from '../../src/core';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  jest.useFakeTimers();
});

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn(props =>
    props.in ? <FakeTransition>{props.children}</FakeTransition> : null
  );
  return {
    CSSTransition: FakeCSSTransition,
    Transition: FakeTransition,
    TransitionGroup: FakeTransition
  };
});

describe('ToastContainer', () => {
  it('Should bind events when mounted and unbind them when unmounted', () => {
    const { unmount } = render(<ToastContainer />);

    expect(eventManager.list.has('show')).toBe(true);
    expect(eventManager.list.has('clear')).toBe(true);

    unmount();
    jest.runAllTimers();

    expect(eventManager.list.has('show')).toBe(false);
    expect(eventManager.list.has('clear')).toBe(false);
  });

  it('Should bind event when re-mounted', () => {
    const { unmount } = render(<ToastContainer />);

    expect(eventManager.list.has('show')).toBe(true);
    expect(eventManager.list.has('clear')).toBe(true);

    unmount();
    render(<ToastContainer />);
    jest.runAllTimers();

    expect(eventManager.list.has('show')).toBe(true);
    expect(eventManager.list.has('clear')).toBe(true);
  });

  it('Should clear all toast when clear is called without id', () => {
    const { queryAllByText } = render(<ToastContainer />);

    act(() => {
      toast('coucou');
      toast('coucou');
      jest.runAllTimers();
    });

    expect(queryAllByText('coucou').length).toBe(2);

    act(() => {
      toast.dismiss();
      jest.runAllTimers();
    });
    expect(queryAllByText('coucou').length).toBe(0);
  });

  it('Should dismiss toast with id == 0 only', () => {
    const { getAllByText } = render(<ToastContainer />);

    act(() => {
      toast('toast id 0', {
        toastId: 0
      });
      toast('toast id 1', {
        toastId: 1
      });

      jest.runAllTimers();
    });
    expect(getAllByText(/toast id/).length).toBe(2);
    act(() => {
      toast.dismiss(0);
      jest.runAllTimers();
    });

    expect(getAllByText(/toast id/).length).toBe(1);
  });

  it("Should prevent duplicate toast when same id is used", () => {
    const { queryByText } = render(<ToastContainer />);

    act(() => {
      toast("REAL_TOAST", {
        toastId: "foo"
      });
      jest.runAllTimers();
    });
    

    act(() => {
      toast("DUPLICATE_TOAST", {
        toastId: "foo"
      });
      jest.runAllTimers();
    });

    expect(queryByText('REAL_TOAST')).not.toBe(null);
    expect(queryByText('DUPLICATE_TOAST')).toBe(null);
  });

  it.only("Should be able to render a react element, a string, a number, a render props without crashing", () => {
    const { container } = render(<ToastContainer />);
    act(() => {
      toast('coucou');
      toast(123);
      toast(<div>plop</div>);
      toast(() => <div>plop</div>);
      jest.runAllTimers();
    })

    console.log(container.childNodes);
  });
});
