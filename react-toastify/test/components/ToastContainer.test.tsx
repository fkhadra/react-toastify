import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { ToastContainer } from '../../src/components/ToastContainer';
import { toast, eventManager } from '../../src/core';
import { ToastOptions } from '../../src/types';

import { cssClasses } from '../helpers';

beforeEach(() => {
  jest.useFakeTimers();
});

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children, className = '', style = {} }) => {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  });

  return {
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

  it('Should prevent duplicate toast when same id is used', () => {
    const { queryByText } = render(<ToastContainer />);

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

    expect(queryByText('REAL_TOAST')).not.toBe(null);
    expect(queryByText('DUPLICATE_TOAST')).toBe(null);
  });

  it('Should be able to render a react element, a string, a number, a render props without crashing', () => {
    const { getByText } = render(<ToastContainer />);
    act(() => {
      toast('coucou');
      toast(123);
      toast(<div>foo</div>);
      toast(() => <div>bar</div>);
      jest.runAllTimers();
    });

    expect(getByText('coucou')).not.toBe(null);
    expect(getByText('123')).not.toBe(null);
    expect(getByText('foo')).not.toBe(null);
    expect(getByText('bar')).not.toBe(null);
  });

  it('Should be able to display new toast on top', () => {
    const { getAllByText } = render(<ToastContainer newestOnTop />);
    const toastValues = ['t 1', 't 2', 't 3'];

    act(() => {
      for (const value of toastValues) {
        toast(value);
      }
      jest.runAllTimers();
    });

    expect(getAllByText(/t [1,2,3]/).map(el => el.textContent)).toEqual(
      toastValues.reverse()
    );
  });

  // this test could be improved by checking all the options
  it('Toast options should supersede ToastContainer props', () => {
    const { getByText, container } = render(<ToastContainer />);
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

    expect(getByText('Close')).not.toBe(null);
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
    const { container } = render(<ToastContainer />);

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    // ensure that close button is present by default
    expect(container.querySelector(cssClasses.closeButton)).not.toBe(null);

    act(() => {
      toast.dismiss();
      toast('hello', {
        closeButton: false
      });
      jest.runAllTimers();
    });

    expect(container.querySelector(cssClasses.closeButton)).toBe(null);
  });

  it('Should be able to delay toast rendering', () => {
    const { getByText } = render(<ToastContainer />);
    act(() => {
      toast('hello', { delay: 1000 });
      jest.runAllTimers();
    });

    expect(getByText('hello')).not.toBe(null);
  });

  it('Should use default CloseButton when toast option set to true and ToastContainer options is false', () => {
    // set closeButton to false to remove it by default
    const { container } = render(<ToastContainer closeButton={false} />);

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    // ensure that close button is NOT present by default
    expect(container.querySelector(cssClasses.closeButton)).toBe(null);

    act(() => {
      toast('hello', { closeButton: true });
      jest.runAllTimers();
    });

    // now the close button should be present
    expect(container.querySelector(cssClasses.closeButton)).not.toBe(null);
  });

  it('Should use custom CloseButton when toast option set to true and ToastContainer options is custom', () => {
    const CloseBtn = () => <div>CUSTOM_BUTTON</div>;
    const { getByText } = render(<ToastContainer closeButton={CloseBtn} />);

    act(() => {
      toast('hello', { closeButton: true });
      jest.runAllTimers();
    });

    // now the close button should be present
    expect(getByText('CUSTOM_BUTTON')).not.toBe(null);
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

  // Most of css-in-js use toString to translate to className
  it('Should support css-in-js rules', () => {
    const className = {
      background: 'purple',
      toString() {
        return 'random-class-name';
      }
    };

    const { container } = render(
      <ToastContainer className={className} style={{ background: 'red' }} />
    );

    act(() => {
      toast('hello');
      jest.runAllTimers();
    });

    expect(container.innerHTML).toMatch(/class=".+random-class-name"/);
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
    const { container, queryByText } = render(<ToastContainer />);

    act(() => {
      toast('Holy');
      jest.runAllTimers();
    });

    expect(queryByText('Holy')).not.toBe(null);
    fireEvent.click(
      container.querySelector(cssClasses.closeButton) as HTMLElement
    );

    expect(queryByText('Holy')).toBe(null);
  });

  describe('Multiple container support', () => {
    it('Should render toasts in all container if enableMultiContainer is not set/false', () => {
      const { getAllByText } = render(
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

      expect(getAllByText('Toast 1').length).toBe(3);
      expect(getAllByText('Toast 2').length).toBe(3);
    });

    it('Should show only related toasts aka- same containerId and containerId', () => {
      const { getAllByText } = render(
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

      expect(getAllByText('containerId 1').length).toBe(1);
      expect(getAllByText('containerId 2').length).toBe(1);
    });

    it('Should not display unrelated toasts', () => {
      const { queryByText } = render(
        <ToastContainer containerId={1} enableMultiContainer />
      );

      act(() => {
        toast('hello', { containerId: 2 });
        jest.runAllTimers();
      });

      expect(queryByText('hello')).toBe(null);
    });

    it('Should display toasts when no containerId is set on the container', () => {
      const { getByText } = render(<ToastContainer enableMultiContainer />);
      act(() => {
        toast('hello');
        jest.runAllTimers();
      });
      expect(getByText('hello')).not.toBe(null);
    });

    it('Should not display any toasts with containerId', () => {
      const { queryByText } = render(<ToastContainer enableMultiContainer />);

      act(() => {
        toast('hello', { containerId: 1 });
        jest.runAllTimers();
      });

      expect(queryByText('hello')).toBe(null);
    });
  });
});
