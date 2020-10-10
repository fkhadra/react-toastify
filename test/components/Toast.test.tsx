import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import '../__mocks__/react-transition-group';
import { cssClasses } from '../helpers';
import { Toast, ToastContainer } from '../../src/components';
import { ToastProps } from '../../src/types';

const REQUIRED_PROPS = {
  ...ToastContainer.defaultProps,
  in: true,
  closeToast: () => {},
  type: 'default',
  toastId: 'id',
  key: 'key'
} as ToastProps;

function getProgressBar(container: HTMLElement) {
  const progressBar = container.querySelector(
    cssClasses.progressBar
  ) as HTMLElement;
  return {
    isRunning: () =>
      expect(progressBar.style.animationPlayState).toBe('running'),
    isPaused: () => expect(progressBar.style.animationPlayState).toBe('paused'),
    isControlled: (progress: number) => {
      expect(
        container.querySelector(cssClasses.progressBarController)
      ).not.toBe(null);
      expect(progressBar.style.transform).toMatch(`scaleX(${progress})`);
    }
  };
}

const defaultEvents = [document.addEventListener, document.removeEventListener];

beforeEach(() => {
  const [add, remove] = defaultEvents;
  document.addEventListener = add;
  document.removeEventListener = remove;
});

describe('Toast Component', () => {
  it('Should merge container and body className', () => {
    const { container } = render(
      <Toast
        {...REQUIRED_PROPS}
        autoClose={false}
        className="container-class"
        bodyClassName="body-class"
      >
        FooBar
      </Toast>
    );
    expect(container.querySelector('.container-class')).not.toBe(null);
    expect(container.querySelector('.body-class')).not.toBe(null);
  });
  it('Should merge container and body className when functional', () => {
    const { container } = render(
      <Toast
        {...REQUIRED_PROPS}
        autoClose={false}
        className={() => 'container-class'}
        bodyClassName={() => 'body-class'}
      >
        FooBar
      </Toast>
    );
    expect(container.querySelector('.container-class')).not.toBe(null);
    expect(container.querySelector('.body-class')).not.toBe(null);
  });
  it('Should support Rtl display', () => {
    const { container } = render(
      <Toast {...REQUIRED_PROPS} autoClose={false} rtl>
        FooBar
      </Toast>
    );

    expect(container.querySelector(cssClasses.rtl)).not.toBeNull();
  });

  it('Should not render ProgressBar if autoClose prop is set to false', () => {
    const { container } = render(
      <Toast {...REQUIRED_PROPS} autoClose={false}>
        FooBar
      </Toast>
    );

    expect(container.querySelector(cssClasses.progressBar)).toBe(null);
  });

  it('Should not render closeButton if closeButton prop is set to false', () => {
    const { container } = render(
      <Toast {...REQUIRED_PROPS} closeButton={false}>
        FooBar
      </Toast>
    );

    expect(container.querySelector(cssClasses.closeButton)).toBe(null);
  });

  it('Can call onOpen callback when component mount', () => {
    const onOpen = jest.fn();
    render(
      <Toast {...REQUIRED_PROPS} onOpen={onOpen}>
        FooBar
      </Toast>
    );

    expect(onOpen).toHaveBeenCalled();
  });

  it('Can call onClose callback when component will unmount', () => {
    const onClose = jest.fn();
    const { unmount } = render(
      <Toast {...REQUIRED_PROPS} onClose={onClose}>
        FooBar
      </Toast>
    );
    unmount();
    expect(onClose).toHaveBeenCalled();
  });

  it('Can pause toast delay on mouse enter', () => {
    const { container, queryByRole } = render(
      <Toast {...REQUIRED_PROPS}>FooBar</Toast>
    );
    const progressBar = getProgressBar(container);

    progressBar.isRunning();
    fireEvent.mouseOver(queryByRole('alert') as HTMLElement);
    progressBar.isPaused();
  });

  it('Can keep runing on mouse enter', () => {
    const { container, queryByRole } = render(
      <Toast {...REQUIRED_PROPS} pauseOnHover={false}>
        FooBar
      </Toast>
    );
    const progressBar = getProgressBar(container);

    progressBar.isRunning();
    fireEvent.mouseEnter(queryByRole('alert') as HTMLElement);
    progressBar.isRunning();
  });

  it('Should resume toast delay on mouse leave', () => {
    const { container, queryByRole } = render(
      <Toast {...REQUIRED_PROPS}>FooBar</Toast>
    );
    const progressBar = getProgressBar(container);
    const notification = queryByRole('alert') as HTMLElement;

    progressBar.isRunning();
    fireEvent.mouseEnter(notification);
    progressBar.isPaused();
    fireEvent.mouseLeave(notification);
    progressBar.isRunning();
  });

  it('Should pause Toast on window blur and resume Toast on focus', () => {
    const { container } = render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
    const progressBar = getProgressBar(container);

    progressBar.isRunning();

    let ev = new Event('blur');
    act(() => {
      window.dispatchEvent(ev);
    });

    progressBar.isPaused();

    ev = new Event('focus');
    act(() => {
      window.dispatchEvent(ev);
    });

    progressBar.isRunning();
  });

  it('Should bind or unbind dom events when `pauseOnFocusLoss` and `draggable` props are updated', () => {
    const { rerender } = render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);

    document.removeEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    rerender(
      <Toast {...REQUIRED_PROPS} draggable={false} pauseOnFocusLoss={false}>
        FooBar
      </Toast>
    );

    expect(document.removeEventListener).toHaveBeenCalled();
    expect(window.removeEventListener).toHaveBeenCalled();

    document.addEventListener = jest.fn();
    window.addEventListener = jest.fn();

    rerender(
      <Toast {...REQUIRED_PROPS} draggable={true} pauseOnFocusLoss={true}>
        FooBar
      </Toast>
    );

    expect(document.addEventListener).toHaveBeenCalled();
    expect(window.addEventListener).toHaveBeenCalled();
  });

  it('Should render toast with controlled progress bar', () => {
    const { container } = render(
      <Toast {...REQUIRED_PROPS} progress={0.3}>
        FooBar
      </Toast>
    );
    const progressBar = getProgressBar(container);
    progressBar.isControlled(0.3);
  });

  it('Should render toast with controlled progress bar even if autoClose is false', () => {
    const { container } = render(
      <Toast {...REQUIRED_PROPS} progress={0.3} autoClose={false}>
        FooBar
      </Toast>
    );
    const progressBar = getProgressBar(container);
    progressBar.isControlled(0.3);
  });

  it('Should close the toast when progressBar animation end', () => {
    const closeToast = jest.fn();
    const { container } = render(
      <Toast {...REQUIRED_PROPS} closeToast={closeToast}>
        FooBar
      </Toast>
    );

    fireEvent.animationEnd(
      container.querySelector(cssClasses.progressBar) as HTMLElement
    );

    expect(closeToast).toHaveBeenCalled();
  });

  it('Should close the toast if progress value is >= 1 when the progress bar is controlled', () => {
    const closeToast = jest.fn();
    const { container } = render(
      <Toast {...REQUIRED_PROPS} closeToast={closeToast} progress={1}>
        FooBar
      </Toast>
    );
    const progressBar = getProgressBar(container);
    progressBar.isControlled(1);

    fireEvent.transitionEnd(
      container.querySelector(cssClasses.progressBar) as HTMLElement
    );

    expect(closeToast).toHaveBeenCalled();
  });

  it('Should add the role attribute to the toast body', () => {
    const { container } = render(
      <Toast {...REQUIRED_PROPS} role="status">
        FooBar
      </Toast>
    );
    expect(container.querySelector('[role="status"]')).not.toBe(null);
  });
});

describe('Drag event', () => {
  it('Should handle drag start on mousedown', () => {
    const mockClientRect = jest.fn();
    Element.prototype.getBoundingClientRect = mockClientRect;
    const { queryByRole } = render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
    expect(mockClientRect).not.toHaveBeenCalled();

    fireEvent.mouseDown(queryByRole('alert') as HTMLElement);
    expect(mockClientRect).toHaveBeenCalled();
  });

  it('Should handle drag start on touchstart', () => {
    const mockClientRect = jest.fn();
    Element.prototype.getBoundingClientRect = mockClientRect;
    const { queryByRole } = render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
    expect(mockClientRect).not.toHaveBeenCalled();
    fireEvent.touchStart(queryByRole('alert') as HTMLElement);
    expect(mockClientRect).toHaveBeenCalled();
  });

  it('Should pause toast duration on drag move', async () => {
    const { container, queryByRole } = render(
      <Toast {...REQUIRED_PROPS}>FooBar</Toast>
    );
    const progressBar = getProgressBar(container);
    const notification = queryByRole('alert') as HTMLElement;

    progressBar.isRunning();
    fireEvent.mouseDown(notification);
    fireEvent.mouseMove(notification);
    progressBar.isPaused();
  });

  it('Should prevent the timer from running on drag end if the mouse hover the toast', () => {
    const { container, queryByRole } = render(
      <Toast {...REQUIRED_PROPS}>FooBar</Toast>
    );
    const notification = queryByRole('alert') as HTMLElement;

    // BoundingClientRect for Position top right
    Element.prototype.getBoundingClientRect = () => {
      return {
        top: 20,
        right: 846,
        bottom: 84,
        left: 534
      } as DOMRect;
    };
    const progressBar = getProgressBar(container);

    progressBar.isRunning();

    fireEvent.mouseDown(notification);
    // Cursor inside the toast
    fireEvent.mouseMove(notification, {
      clientX: 600,
      clientY: 30
    });
    progressBar.isPaused();
    fireEvent.mouseUp(notification);
    progressBar.isPaused();
  });

  it('Should resume the timer on drag end if the mouse is not hovering the toast', () => {
    const { container, queryByRole } = render(
      <Toast {...REQUIRED_PROPS}>FooBar</Toast>
    );
    const notification = queryByRole('alert') as HTMLElement;
    // BoundingClientRect for Position top right
    Element.prototype.getBoundingClientRect = () => {
      return {
        top: 20,
        right: 846,
        bottom: 84,
        left: 534
      } as DOMRect;
    };
    const progressBar = getProgressBar(container);

    progressBar.isRunning();

    fireEvent.mouseDown(notification);
    // Cursor inside the toast
    fireEvent.mouseMove(notification, {
      clientX: 400,
      clientY: 30
    });
    progressBar.isPaused();
    fireEvent.mouseUp(notification);
    progressBar.isRunning();
  });

  it('Should support style attribute', () => {
    const style: React.CSSProperties = {
      background: 'purple'
    };
    const bodyStyle: React.CSSProperties = {
      fontWeight: 'bold'
    };
    const { queryByRole } = render(
      <Toast {...REQUIRED_PROPS} style={style} bodyStyle={bodyStyle}>
        FooBar
      </Toast>
    );

    const notification = queryByRole('alert') as HTMLElement;

    expect((notification.parentNode as HTMLElement).style.background).toBe(
      'purple'
    );
    expect(notification.style.fontWeight).toBe('bold');
  });

  it('Should use toastId as node id', () => {
    render(
      <Toast {...REQUIRED_PROPS} toastId="foo">
        FooBar
      </Toast>
    );
    expect(document.getElementById('foo')).not.toBe(null);
  });
});
