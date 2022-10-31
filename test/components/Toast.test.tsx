import * as React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';

import { cssClasses, waitForUseEffectCleanup } from '../helpers';
import { Toast, ToastContainer } from '../../src/components';
import { ToastProps } from '../../src/types';

const REQUIRED_PROPS = {
  ...ToastContainer.defaultProps,
  isIn: true,
  closeToast: () => {},
  type: 'default',
  toastId: 'id',
  key: 'key'
} as ToastProps;

function getProgressBar() {
  const progressBar = screen.getByRole('progressbar');
  return {
    isRunning: () =>
      expect(progressBar.style.animationPlayState).toBe('running'),
    isPaused: () => expect(progressBar.style.animationPlayState).toBe('paused'),
    isControlled: (progress: number) => {
      expect(document.querySelector(cssClasses.progressBarController)).not.toBe(
        null
      );
      expect(progressBar.style.transform).toMatch(`scaleX(${progress})`);
    }
  };
}

function endEnterTransition(toastText: string) {
  fireEvent.animationEnd(screen.getByText(toastText)!.parentNode!.parentNode!);
}

const documentHasFocus = jest
  .spyOn(document, 'hasFocus')
  .mockImplementation(() => true);

const defaultEvents = [document.addEventListener, document.removeEventListener];

beforeEach(() => {
  const [add, remove] = defaultEvents;
  document.addEventListener = add;
  document.removeEventListener = remove;
});

afterAll(() => {
  documentHasFocus.mockRestore();
});

describe('Toast Component', () => {
  it('Should merge container and body className', () => {
    render(
      <Toast
        {...REQUIRED_PROPS}
        autoClose={false}
        className="container-class"
        bodyClassName="body-class"
      >
        FooBar
      </Toast>
    );
    expect(document.querySelector('.container-class')).not.toBe(null);
    expect(document.querySelector('.body-class')).not.toBe(null);
  });
  it('Should merge container and body className when functional', () => {
    render(
      <Toast
        {...REQUIRED_PROPS}
        autoClose={false}
        className={() => 'container-class'}
        bodyClassName={() => 'body-class'}
      >
        FooBar
      </Toast>
    );
    expect(document.querySelector('.container-class')).not.toBe(null);
    expect(document.querySelector('.body-class')).not.toBe(null);
  });
  it('Should support Rtl display', () => {
    render(
      <Toast {...REQUIRED_PROPS} autoClose={false} rtl>
        FooBar
      </Toast>
    );

    expect(document.querySelector(cssClasses.rtl)).not.toBeNull();
  });

  describe('Should support closeOnClick display', () => {
    it('Should set relevant class when closeOnClick is set to true', () => {
      render(
        <Toast {...REQUIRED_PROPS} closeOnClick>
          FooBar
        </Toast>
      );

      expect(document.querySelector(cssClasses.closeOnClick)).not.toBeNull();
    });
    it('Should not set relevant class when closeOnClick is set to false', () => {
      render(
        <Toast {...REQUIRED_PROPS}
          closeOnClick={false}>
          FooBar
        </Toast>
      );

      expect(document.querySelector(cssClasses.closeOnClick)).toBeNull();
    });
  });

  it('Should not render ProgressBar if autoClose prop is set to false', () => {
    render(
      <Toast {...REQUIRED_PROPS} autoClose={false}>
        FooBar
      </Toast>
    );

    expect(screen.queryByRole('progressbar')).toBe(null);
  });

  it('Should not render closeButton if closeButton prop is set to false', () => {
    render(
      <Toast {...REQUIRED_PROPS} closeButton={false}>
        FooBar
      </Toast>
    );

    expect(screen.queryByLabelText('close')).toBe(null);
  });

  it('Can call onOpen callback when toast is displayed', () => {
    const onOpen = jest.fn();
    render(
      <Toast {...REQUIRED_PROPS} onOpen={onOpen}>
        FooBar
      </Toast>
    );

    expect(onOpen).toHaveBeenCalled();
  });

  it('Can call onClose callback when toast is removed', async done => {
    const onClose = jest.fn();
    const { unmount } = render(
      <Toast {...REQUIRED_PROPS} onClose={onClose}>
        FooBar
      </Toast>
    );

    unmount();
    waitForUseEffectCleanup(() => {
      expect(onClose).toHaveBeenCalled();
      done();
    });
  });

  it('Can pause toast delay on mouse enter', async () => {
    render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
    const progressBar = getProgressBar();
    endEnterTransition('FooBar');
    progressBar.isRunning();
    fireEvent.mouseOver(screen.getByRole('alert') as HTMLElement);
    progressBar.isPaused();
  });

  it('Can keep runing on mouse enter', () => {
    render(
      <Toast {...REQUIRED_PROPS} pauseOnHover={false}>
        FooBar
      </Toast>
    );
    endEnterTransition('FooBar');
    const progressBar = getProgressBar();

    progressBar.isRunning();
    fireEvent.mouseEnter(screen.getByRole('alert'));
    progressBar.isRunning();
  });

  it('Should resume toast delay on mouse leave', () => {
    render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
    const progressBar = getProgressBar();
    endEnterTransition('FooBar');
    const notification = screen.getByRole('alert');

    progressBar.isRunning();
    fireEvent.mouseEnter(notification);
    progressBar.isPaused();
    fireEvent.mouseLeave(notification);
    progressBar.isRunning();
  });

  it('Should pause Toast on window blur and resume Toast on focus', () => {
    render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
    const progressBar = getProgressBar();
    endEnterTransition('FooBar');
    progressBar.isRunning();

    act(() => {
      window.dispatchEvent(new Event('blur'));
    });

    progressBar.isPaused();

    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    progressBar.isRunning();
  });

  it('Should bind or unbind dom events when `pauseOnFocusLoss` props are updated', () => {
    const { rerender } = render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);

    window.removeEventListener = jest.fn();

    rerender(
      <Toast {...REQUIRED_PROPS} pauseOnFocusLoss={false}>
        FooBar
      </Toast>
    );

    expect(window.removeEventListener).toHaveBeenCalled();

    document.addEventListener = jest.fn();
    window.addEventListener = jest.fn();

    rerender(
      <Toast {...REQUIRED_PROPS} pauseOnFocusLoss={true}>
        FooBar
      </Toast>
    );

    expect(window.addEventListener).toHaveBeenCalled();
  });

  it('Should render toast with controlled progress bar', () => {
    render(
      <Toast {...REQUIRED_PROPS} progress={0.3}>
        FooBar
      </Toast>
    );
    const progressBar = getProgressBar();
    progressBar.isControlled(0.3);
  });

  it('Should render toast with controlled progress bar even if autoClose is false', () => {
    render(
      <Toast {...REQUIRED_PROPS} progress={0.3} autoClose={false}>
        FooBar
      </Toast>
    );
    const progressBar = getProgressBar();
    progressBar.isControlled(0.3);
  });

  it('Should close the toast when progressBar animation end', () => {
    const closeToast = jest.fn();
    render(
      <Toast {...REQUIRED_PROPS} closeToast={closeToast}>
        FooBar
      </Toast>
    );

    fireEvent.animationEnd(screen.getByRole('progressbar'));

    expect(closeToast).toHaveBeenCalled();
  });

  it('Should close the toast if progress value is >= 1 when the progress bar is controlled', () => {
    const closeToast = jest.fn();
    render(
      <Toast {...REQUIRED_PROPS} closeToast={closeToast} progress={1}>
        FooBar
      </Toast>
    );
    const progressBar = getProgressBar();
    progressBar.isControlled(1);

    fireEvent.transitionEnd(screen.getByRole('progressbar'));

    expect(closeToast).toHaveBeenCalled();
  });

  it('Should add the role attribute to the toast body', () => {
    render(
      <Toast {...REQUIRED_PROPS} role="status">
        FooBar
      </Toast>
    );
    expect(screen.queryByRole('status')).not.toBe(null);
  });

  it('Should use toastId as node id', () => {
    render(
      <Toast {...REQUIRED_PROPS} toastId="foo">
        FooBar
      </Toast>
    );
    expect(document.getElementById('foo')).not.toBe(null);
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

  describe('Drag event', () => {
    // target parent node due to text selection disabling drag event
    it('Should handle drag start on mousedown', () => {
      const mockClientRect = jest.fn();
      Element.prototype.getBoundingClientRect = mockClientRect;

      render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);

      expect(mockClientRect).not.toHaveBeenCalled();

      fireEvent.mouseDown(screen.getByRole('alert').parentNode!);
      expect(mockClientRect).toHaveBeenCalled();
    });

    it('Should handle drag start on touchstart', () => {
      const mockClientRect = jest.fn();
      Element.prototype.getBoundingClientRect = mockClientRect;

      render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);

      expect(mockClientRect).not.toHaveBeenCalled();

      fireEvent.touchStart(screen.getByRole('alert').parentNode!);
      expect(mockClientRect).toHaveBeenCalled();
    });

    it('Should pause toast duration on drag move', async () => {
      render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
      const progressBar = getProgressBar();
      const notification = screen.getByRole('alert').parentNode!;
      endEnterTransition('FooBar');
      progressBar.isRunning();
      fireEvent.mouseDown(notification);
      fireEvent.mouseMove(notification);
      progressBar.isPaused();
    });

    it('Should prevent the timer from running on drag end if the mouse hover the toast', () => {
      render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
      const notification = screen.getByRole('alert').parentNode!;

      // BoundingClientRect for Position top right
      Element.prototype.getBoundingClientRect = () => {
        return {
          top: 20,
          right: 846,
          bottom: 84,
          left: 534
        } as DOMRect;
      };
      const progressBar = getProgressBar();
      endEnterTransition('FooBar');
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
      render(<Toast {...REQUIRED_PROPS}>FooBar</Toast>);
      const notification = screen.getByRole('alert').parentNode!;
      // BoundingClientRect for Position top right
      Element.prototype.getBoundingClientRect = () => {
        return {
          top: 20,
          right: 846,
          bottom: 84,
          left: 534
        } as DOMRect;
      };
      const progressBar = getProgressBar();
      endEnterTransition('FooBar');
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
  });
});
