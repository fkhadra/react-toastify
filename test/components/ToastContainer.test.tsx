import * as React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';

import { ToastContainer } from '../../src/components/ToastContainer';
import { toast, eventManager, Event } from '../../src/core';
import { ToastOptions } from '../../src/types';

import { triggerAnimationEnd } from '../helpers';

jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    callback(1);
    return 1;
  });
});

afterEach(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
});

describe('ToastContainer', () => {
  it('Should bind events when mounted and unbind them when unmounted', () => {
    const { unmount } = render(<ToastContainer />);

    expect(eventManager.list.has(Event.Show)).toBe(true);
    expect(eventManager.list.has(Event.Clear)).toBe(true);

    unmount();
    jest.runAllTimers();

    expect(eventManager.list.has(Event.Show)).toBe(false);
    expect(eventManager.list.has(Event.Clear)).toBe(false);
  });

  it('Should use the containerId as node id', () => {
    render(<ToastContainer containerId="foo" />);

    expect(document.getElementById('foo')).not.toBe(null);
  });

  it('Should bind event when re-mounted', () => {
    const { unmount } = render(<ToastContainer />);

    expect(eventManager.list.has(Event.Show)).toBe(true);
    expect(eventManager.list.has(Event.Clear)).toBe(true);

    unmount();
    render(<ToastContainer />);
    jest.runAllTimers();

    expect(eventManager.list.has(Event.Show)).toBe(true);
    expect(eventManager.list.has(Event.Clear)).toBe(true);
  });

  it('Should clear all toast when clear is called without id', () => {
    render(<ToastContainer />);

    act(() => {
      toast('coucou1');
      toast('coucou2');
      jest.runAllTimers();
    });

    const toasts = screen.queryAllByText(/coucou/);
    expect(toasts.length).toBe(2);

    act(() => {
      toast.dismiss();
      jest.runAllTimers();
    });

    triggerAnimationEnd(toasts);

    expect(screen.queryAllByText(/coucou/).length).toBe(0);
  });

  it('Should dismiss toast with id == 0 only', () => {
    render(<ToastContainer />);

    act(() => {
      toast('toast id 0', {
        toastId: 0
      });
      toast('toast id 1', {
        toastId: 1
      });

      jest.runAllTimers();
    });
    expect(screen.getAllByText(/toast id/).length).toBe(2);
    act(() => {
      toast.dismiss(0);
      jest.runAllTimers();
    });

    triggerAnimationEnd(screen.getByText('toast id 0'));

    expect(screen.getAllByText(/toast id/).length).toBe(1);
  });

  it('Should prevent duplicate toast when same id is used', () => {
    render(<ToastContainer />);

    act(() => {
      toast('REAL_TOAST', {
        toastId: 'foo'
      });
      jest.runAllTimers();
    });

    act(() => {
      toast('DUPLICATE_TOAST', {
        toastId: 'foo'
      });
      jest.runAllTimers();
    });

    expect(screen.queryByText('REAL_TOAST')).not.toBe(null);
    expect(screen.queryByText('DUPLICATE_TOAST')).toBe(null);
  });

  it('Should be able to render a react element, a string, a number, a render props without crashing', () => {
    render(<ToastContainer />);
    act(() => {
      toast('coucou');
      toast(123);
      toast(<div>foo</div>);
      toast(() => <div>bar</div>);
      jest.runAllTimers();
    });

    expect(screen.getByText('coucou')).not.toBe(null);
    expect(screen.getByText('123')).not.toBe(null);
    expect(screen.getByText('foo')).not.toBe(null);
    expect(screen.getByText('bar')).not.toBe(null);
  });

  it('Should be able to display new toast on top', () => {
    render(<ToastContainer newestOnTop />);
    const toastValues = ['t 1', 't 2', 't 3'];

    act(() => {
      for (const value of toastValues) {
        toast(value);
      }
      jest.runAllTimers();
    });

    expect(screen.getAllByText(/t [1,2,3]/).map(el => el.textContent)).toEqual(
      toastValues.reverse()
    );
  });

  // this test could be improved by checking all the options
  it('Toast options should supersede ToastContainer props', () => {
    const { container } = render(<ToastContainer />);
    const CloseBtn = () => <div>Close</div>;
    const fn = () => {};
    const desiredProps: ToastOptions = {
      pauseOnHover: false,
      closeOnClick: false,
      onOpen: fn,
      onClose: fn,
      autoClose: false,
      hideProgressBar: true,
      position: 'top-left',
      closeButton: <CloseBtn />
    };

    act(() => {
      toast('hello', desiredProps);
      jest.runAllTimers();
    });

    expect(screen.getByText('Close')).not.toBe(null);
    expect(container.innerHTML).toMatch(/top-left/);
  });

  it('Should pass closeToast function and type when using a custom CloseButton', done => {
    render(<ToastContainer />);

    const CloseBtn = (props: any) => {
      expect('closeToast' in props).toBe(true);
      expect('type' in props).toBe(true);
      done();
      return <div>x</div>;
    };
    const Msg = () => <div>Plop</div>;

    act(() => {
      toast(<Msg />, {
        closeButton: CloseBtn
      });
      jest.runAllTimers();
    });
  });

  it('Should be able to disable the close button', () => {
    render(<ToastContainer />);

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    // ensure that close button is present by default
    expect(screen.getByLabelText('close')).not.toBe(null);

    act(() => {
      toast.dismiss();
      jest.runAllTimers();
    });

    triggerAnimationEnd(screen.getByText('hello'));

    act(() => {
      toast('hello', {
        closeButton: false
      });
      jest.runAllTimers();
    });

    expect(screen.getByText('hello')).not.toBe(null);
    expect(screen.queryByLabelText('close')).toBe(null);
  });

  it('Should be able to delay toast rendering', () => {
    render(<ToastContainer />);
    act(() => {
      toast('hello', { delay: 1000 });
      jest.runOnlyPendingTimers();
    });

    expect(screen.queryByText('hello')).toBe(null);

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText('hello')).not.toBe(null);
  });

  it('Should use default CloseButton when toast option set to true and ToastContainer options is false', () => {
    // set closeButton to false to remove it by default
    render(<ToastContainer closeButton={false} />);

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    // ensure that close button is NOT present by default
    expect(screen.queryByLabelText('close')).toBe(null);

    act(() => {
      toast('hello', { closeButton: true });
      jest.runAllTimers();
    });

    // now the close button should be present
    expect(screen.queryByLabelText('close')).not.toBe(null);
  });

  it('Should use custom CloseButton when toast option set to true and ToastContainer options is custom', () => {
    const CloseBtn = () => <div aria-label="close">CUSTOM_BUTTON</div>;
    render(<ToastContainer closeButton={CloseBtn} />);

    act(() => {
      toast('hello', { closeButton: true });
      jest.runAllTimers();
    });

    // now the close button should be present
    expect(screen.getByText('CUSTOM_BUTTON')).not.toBe(null);
  });

  it('Should merge className and style', () => {
    const { container } = render(
      <ToastContainer className="foo" style={{ background: 'red' }} />
    );

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    expect(container.innerHTML).toMatch(/foo/);
    expect(container.innerHTML).toMatch(/style="background: red;"/);
  });

  it('Should merge className and style when className is functional', () => {
    const { container } = render(
      <ToastContainer className={() => 'foo'} style={{ background: 'red' }} />
    );

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    expect(container.innerHTML).toMatch(/foo/);
    expect(container.innerHTML).toMatch(/style="background: red;"/);
  });

  it('Should pass a closeToast function when displaying a react component', done => {
    render(<ToastContainer />);
    const Msg = (props: any) => {
      expect('closeToast' in props).toBe(true);
      done();

      return <div>Plop</div>;
    };

    act(() => {
      toast(<Msg />);
      jest.runAllTimers();
    });
  });

  it('Should remove toast when closeToast is called', () => {
    render(<ToastContainer />);

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    expect(screen.getByText('hello')).not.toBe(null);

    act(() => {
      fireEvent.click(screen.getByLabelText('close'));
      jest.runAllTimers();
    });

    triggerAnimationEnd(screen.getByText('hello'));

    expect(screen.queryByText('hello')).toBe(null);
  });

  it('Should be able to specify a custom icon', () => {
    render(<ToastContainer />);
    act(() => {
      toast('string', {
        icon: '🚀'
      });
      toast('component', {
        icon: () => <p>content</p>
      });
      toast('disable', {
        icon: false
      });
      jest.runAllTimers();
    });

    expect(
      screen
        .getByText('string')
        .parentElement.getElementsByClassName('Toastify__toast-icon')[0]
        .textContent
    ).toEqual('🚀');
    expect(
      screen
        .getByText('component')
        .parentElement.getElementsByClassName('Toastify__toast-icon')[0]
        .textContent
    ).toEqual('content');
    expect(
      screen
        .getByText('disable')
        .parentElement.getElementsByClassName('Toastify__toast-icon').length
    ).toEqual(0);
  });

  describe('Multiple container support', () => {
    it('Should render toasts in all container if enableMultiContainer is not set/false', () => {
      render(
        <>
          <ToastContainer enableMultiContainer={false} />
          <ToastContainer />
          <ToastContainer containerId={1} />
        </>
      );

      act(() => {
        toast('Toast 1');
        toast('Toast 2', { containerId: 1 });
        jest.runAllTimers();
      });

      expect(screen.getAllByText('Toast 1').length).toBe(3);
      expect(screen.getAllByText('Toast 2').length).toBe(3);
    });

    it('Should show only related toasts aka- same containerId and containerId', () => {
      render(
        <>
          <ToastContainer containerId={1} enableMultiContainer />
          <ToastContainer containerId={2} enableMultiContainer />
        </>
      );

      act(() => {
        toast('containerId 1', { containerId: 1 });
        toast('containerId 2', { containerId: 2 });
        jest.runAllTimers();
      });

      expect(screen.getAllByText('containerId 1').length).toBe(1);
      expect(screen.getAllByText('containerId 2').length).toBe(1);
    });

    it('Should not display unrelated toasts', () => {
      render(<ToastContainer containerId={1} enableMultiContainer />);

      act(() => {
        toast('hello', { containerId: 2 });
        jest.runAllTimers();
      });

      expect(screen.queryByText('hello')).toBe(null);
    });

    it('Should display toasts when no containerId is set on the container', () => {
      render(<ToastContainer enableMultiContainer />);
      act(() => {
        toast('hello');
        jest.runAllTimers();
      });
      expect(screen.getByText('hello')).not.toBe(null);
    });

    it('Should not display any toasts with containerId', () => {
      render(<ToastContainer enableMultiContainer />);

      act(() => {
        toast('hello', { containerId: 1 });
        jest.runAllTimers();
      });

      expect(screen.queryByText('hello')).toBe(null);
    });
  });

  describe('Limit number of toast displayed', () => {
    it('Should not crash when using limit', () => {
      render(<ToastContainer limit={2} />);

      act(() => {
        toast('Hello');
        jest.runAllTimers();
      });

      expect(screen.queryByText('Hello')).not.toBe(null);
    });

    it('Should be possible to limit the number of toast visible', () => {
      render(<ToastContainer limit={2} />);

      act(() => {
        toast('toast-1');
        toast('toast-2');
        jest.runAllTimers();
      });

      act(() => {
        toast('toast-3');
        jest.runAllTimers();
      });

      expect(screen.queryByText('toast-1')).not.toBe(null);
      expect(screen.queryByText('toast-2')).not.toBe(null);

      expect(screen.queryByText('toast-3')).toBe(null);
    });

    it('Should handle only limit that are > 0', () => {
      render(<ToastContainer limit={0} />);

      act(() => {
        toast('toast-1');
        toast('toast-2');
        jest.runAllTimers();
      });

      act(() => {
        toast('toast-3');
        jest.runAllTimers();
      });

      expect(screen.queryByText('toast-1')).not.toBe(null);
      expect(screen.queryByText('toast-2')).not.toBe(null);

      expect(screen.queryByText('toast-3')).not.toBe(null);
    });

    it('Should display a new toast as soon as a slot is available', () => {
      render(<ToastContainer limit={2} />);
      const toastId = 'id';

      act(() => {
        toast('toast-1', { toastId });
        toast('toast-2');
        jest.runAllTimers();
      });

      act(() => {
        toast('toast-3');
        jest.runAllTimers();
      });

      expect(screen.queryByText('toast-1')).not.toBe(null);
      expect(screen.queryByText('toast-2')).not.toBe(null);

      expect(screen.queryByText('toast-3')).toBe(null);

      act(() => {
        toast.dismiss(toastId);
        jest.runAllTimers();
      });

      triggerAnimationEnd(screen.getByText('toast-1'));

      expect(screen.queryByText('toast-1')).toBe(null);

      expect(screen.queryByText('toast-2')).not.toBe(null);
      expect(screen.queryByText('toast-3')).not.toBe(null);
    });

    it('Should be possible to clear limit queue', () => {
      render(<ToastContainer limit={2} />);
      const toastId = 'id';

      act(() => {
        toast('toast-1', { toastId });
        toast('toast-2');
        jest.runAllTimers();
      });

      act(() => {
        toast('toast-3');
        jest.runAllTimers();
      });

      expect(screen.queryByText('toast-1')).not.toBe(null);
      expect(screen.queryByText('toast-2')).not.toBe(null);

      expect(screen.queryByText('toast-3')).toBe(null);

      act(() => {
        toast.clearWaitingQueue();
        jest.runAllTimers();
      });

      act(() => {
        toast.dismiss(toastId);
        jest.runAllTimers();
      });

      triggerAnimationEnd(screen.getByText('toast-1'));

      expect(screen.queryByText('toast-1')).toBe(null);

      expect(screen.queryByText('toast-2')).not.toBe(null);
      expect(screen.queryByText('toast-3')).toBe(null);
    });
  });
});
