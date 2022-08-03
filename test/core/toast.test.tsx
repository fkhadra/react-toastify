import * as React from 'react';
import { render, act, screen } from '@testing-library/react';

import { triggerAnimationEnd } from '../helpers';
import { eventManager, toast, Event } from '../../src/core';
import { cssTransition } from '../../src/utils';
import { Id } from '../../src/types';
import { ToastContainer } from '../../src/components';

jest.useFakeTimers();

// Clear all previous event to avoid any clash between tests
beforeEach(() => {
  eventManager.off(Event.Show).off(Event.Clear).off(Event.Change);

  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    callback(1);
    return 1;
  });
});

afterEach(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
  jest.clearAllTimers();
});

describe('toastify', () => {
  it('Should not crash if no container is mounted', () => {
    act(() => {
      toast('hello');
    });
    expect(screen.queryByText(/hello/)).toBe(null);
  });

  it('Should return a new id each time we emit a notification', () => {
    let firstId, secondId;

    firstId = toast('Hello');
    secondId = toast('Hello');

    expect(firstId).not.toEqual(secondId);
  });

  it('Should use the provided toastId from options', () => {
    const toastId = 11;
    const id = toast('Hello', { toastId });

    expect(id).toEqual(toastId);
  });

  it('Should allow the provided toastId from options to be a string', () => {
    const toastId = 'xxxx';
    const id = toast('Hello', { toastId });

    expect(id).toEqual(toastId);
  });

  it('Should not use the provided invalid toastId from options', () => {
    const toastId = Symbol('myId') as unknown as Id;
    const id = toast('Hello', { toastId });

    expect(id).not.toEqual(toastId);
  });

  describe('onChange event', () => {
    it('Should be able to track when toast is added or removed', () => {
      render(<ToastContainer />);
      const fn = jest.fn();
      toast.onChange(fn);

      expect(fn).not.toHaveBeenCalled();

      act(() => {
        toast('hello');
        jest.runAllTimers();
      });

      expect(fn).toHaveBeenCalled();
    });

    it('Should be able to unsubscribe to onChange event', () => {
      render(<ToastContainer />);
      const fn = jest.fn();
      const off = toast.onChange(fn);

      expect(fn).not.toHaveBeenCalled();

      act(() => {
        toast('hello');
        jest.runAllTimers();
      });

      expect(fn).toHaveBeenCalled();

      off();

      act(() => {
        toast('hello');
        jest.runAllTimers();
      });

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('The callback should receive a toast item with the status `added`', done => {
      render(<ToastContainer />);
      const status = ['added', 'updated', 'removed'];

      toast.onChange(toast => {
        const currentStatus = status.shift();
        expect(toast.status).toBe(currentStatus);

        // all status testted
        if (!status.length) {
          done();
        }
      });

      const id = 'foo';
      act(() => {
        toast('hello', {
          toastId: id
        });
        jest.runAllTimers();
      });

      act(() => {
        toast.update(id);
        jest.runAllTimers();
      });

      act(() => {
        toast.dismiss(id);
        jest.runAllTimers();
      });

      triggerAnimationEnd(screen.getByText('hello'));
    });

    it('Should contains toast data', done => {
      render(<ToastContainer containerId="foo" />);
      toast.onChange(toast => {
        expect(toast.content).toBe('hello');
        done();
      });

      act(() => {
        toast('hello');
        jest.runAllTimers();
      });
    });
  });

  it('Should be able remove toast programmatically', () => {
    render(<ToastContainer />);
    let id: Id;
    act(() => {
      id = toast('hello');
      jest.runAllTimers();
    });

    expect(screen.getByText('hello')).not.toBe(null);

    act(() => {
      toast.dismiss(id);
      jest.runAllTimers();
    });

    triggerAnimationEnd(screen.getByText('hello'));

    expect(screen.queryByText('hello')).toBe(null);
  });

  it('Should be able remove toast programmatically without container', () => {
    let id: Id;
    act(() => {
      id = toast('hello');
      jest.runAllTimers();
      toast.dismiss(id);
      jest.runAllTimers();
    });
    render(<ToastContainer />);

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByText('hello')).toBe(null);
  });

  describe('update function', () => {
    it('Should be able to update an existing toast', () => {
      render(<ToastContainer />);
      let id: Id;

      act(() => {
        id = toast('hello');
        jest.runAllTimers();
      });

      expect(screen.getByText('hello')).not.toBe(null);

      act(() => {
        toast.update(id, {
          render: 'foobar'
        });
        jest.runAllTimers();
      });

      expect(screen.queryByText('hello')).toBe(null);
      expect(screen.getByText('foobar')).not.toBe(null);
    });

    it('Should be able to update the same toast many times', () => {
      render(<ToastContainer />);
      let id: Id;

      act(() => {
        id = toast('hello');
        jest.runAllTimers();
      });

      expect(screen.getByText('hello')).not.toBe(null);

      act(() => {
        toast.update(id, {
          render: 'foobar'
        });
        jest.runAllTimers();
      });

      expect(screen.getByText('foobar')).not.toBe(null);

      act(() => {
        toast.update(id, {
          render: 'peace'
        });
        jest.runAllTimers();
      });

      expect(screen.getByText('peace')).not.toBe(null);
    });

    it('Should be able to update a Toast and keep the same content', () => {
      render(<ToastContainer />);
      let id: Id;
      act(() => {
        id = toast('hello');
        jest.runAllTimers();
      });

      expect(screen.getByText('hello')).not.toBe(null);

      act(() => {
        toast.update(id, {
          className: 'foobar'
        });
        jest.runAllTimers();
      });
      expect(screen.getByText('hello')).not.toBe(null);

      act(() => {
        toast.update(id);
        jest.runAllTimers();
      });
      expect(screen.getByText('hello')).not.toBe(null);
    });

    it('Should update a toast only if it exist and if the container is mounted', () => {
      render(<ToastContainer />);

      act(() => {
        toast.update(0, {
          render: 'hello'
        });
        jest.runAllTimers();
      });

      expect(screen.queryByText('hello')).toBe(null);
    });

    it('Should be able to update the toastId', () => {
      render(<ToastContainer />);
      const toastId = 'bar';
      const updateId = 'foo';

      act(() => {
        toast('hello', {
          toastId
        });
        jest.runAllTimers();
      });

      expect(screen.getByText('hello')).not.toBe(null);
      expect(screen.queryByText('foo')).toBe(null);
      expect(toast.isActive(toastId)).toBe(true);
      expect(toast.isActive(updateId)).toBe(false);

      act(() => {
        toast.update(toastId, {
          toastId: updateId,
          render: 'foo'
        });
        jest.runAllTimers();
      });

      expect(screen.queryByText('hello')).toBe(null);

      expect(screen.getByText('foo')).not.toBe(null);
      expect(toast.isActive(toastId)).toBe(false);
      expect(toast.isActive(updateId)).toBe(true);
    });

    it('Should be able to update a toast even when using multi containers', () => {
      const { queryByText } = render(
        <>
          <ToastContainer containerId="first" enableMultiContainer />
          <ToastContainer containerId="second" enableMultiContainer />
        </>
      );
      let firstId: Id, secondId: Id;

      act(() => {
        firstId = toast('hello first', { containerId: 'first' });
        secondId = toast('hello second', { containerId: 'second' });
        jest.runAllTimers();
      });

      act(() => {
        toast.update(firstId, {
          render: 'updated first',
          containerId: 'first'
        });

        toast.update(secondId, {
          render: 'updated second',
          containerId: 'second'
        });

        jest.runAllTimers();
      });

      expect(queryByText('updated first')).not.toBe(null);
      expect(queryByText('updated second')).not.toBe(null);
    });
  });

  describe('isActive function', () => {
    it('toast.isActive should return false until the container is mounted', () => {
      expect(toast.isActive(1)).toBe(false);
    });

    it('Should be able to tell if a toast is active based on the id as soon as the container is mounted', () => {
      render(<ToastContainer />);
      let id;

      act(() => {
        id = toast('hello');
        jest.runAllTimers();
      });

      expect(toast.isActive(id)).toBe(true);
    });

    it('Should work with multi container', () => {
      render(
        <>
          <ToastContainer containerId="first" enableMultiContainer />
          <ToastContainer containerId="second" enableMultiContainer />
        </>
      );
      let firstId: string | number, secondId: string | number;
      act(() => {
        firstId = toast('hello first', { containerId: 'first' });
        secondId = toast('hello second', { containerId: 'second' });
        jest.runAllTimers();
      });

      expect(toast.isActive(firstId)).toBe(true);
      expect(toast.isActive(secondId)).toBe(true);
    });
  });

  it('Can append classNames', () => {
    render(<ToastContainer />);
    act(() => {
      toast('hello', {
        className: 'class1',
        bodyClassName: 'class2',
        progressClassName: 'class3'
      });
      jest.runAllTimers();
    });
    expect(document.querySelector('.class1')).not.toBe(null);
    expect(document.querySelector('.class2')).not.toBe(null);
    expect(document.querySelector('.class3')).not.toBe(null);
  });

  it('Should be able to use syntaxic sugar for different notification type', () => {
    const { queryByText } = render(<ToastContainer />);

    act(() => {
      toast('default');
      toast.success('success');
      toast.error('error');
      toast.warning('warning');
      toast.info('info');
      toast.warn('warn');
      toast.dark('dark');
      jest.runAllTimers();
    });
    expect(queryByText('default')).not.toBe(null);
    expect(queryByText('success')).not.toBe(null);
    expect(queryByText('error')).not.toBe(null);
    expect(queryByText('warning')).not.toBe(null);
    expect(queryByText('info')).not.toBe(null);
    expect(queryByText('dark')).not.toBe(null);
    expect(queryByText('warn')).not.toBe(null);
  });

  describe('Controlled progress bar', () => {
    it('Should be possible to use a controlled progress bar', () => {
      const { container } = render(<ToastContainer />);

      act(() => {
        toast('Hello', {
          progress: 0.5
        });
        jest.runAllTimers();
      });

      expect(container.innerHTML).toMatch(/transform:(\s)?scaleX\(0.5\)/);
    });

    it('When `toast.done` is called, it should set scaleX to 1', () => {
      const { container, queryByText } = render(<ToastContainer />);
      let id: Id;

      act(() => {
        id = toast('hello', {
          progress: 0.5
        });
        jest.runAllTimers();
      });

      expect(queryByText('hello')).not.toBe(null);
      act(() => {
        toast.done(id);
        jest.runAllTimers();
      });

      expect(container.innerHTML).toMatch(/transform:(\s)?scaleX\(1\)/);
    });
  });

  it('should remove toast even when not collapsing on exit', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar',
      collapse: false
    });

    render(<ToastContainer transition={Transition} />);
    let id: Id;
    act(() => {
      id = toast('hello');
      jest.runAllTimers();
    });

    expect(screen.getByText('hello')).not.toBe(null);

    act(() => {
      toast.dismiss(id);
      jest.runAllTimers();
    });

    triggerAnimationEnd(screen.getByText('hello'));

    expect(screen.queryByText('hello')).toBe(null);
  });
});
