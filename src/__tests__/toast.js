/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import ToastContainer from './../components/ToastContainer';
import toast from './../toast';
import { ACTION, TYPE, RT_NAMESPACE, eventManager } from './../utils';

jest.useFakeTimers();

const containerClass = `.${RT_NAMESPACE}__toast-container`;

// Clear all previous event to avoid any clash between tests
beforeEach(() => {
  eventManager
    .off(ACTION.SHOW)
    .off(ACTION.CLEAR)
    .off(ACTION.ON_CHANGE);
});

function ensureLazyContainerIsNotMounted() {
  expect(document.querySelector(containerClass)).toBe(null);
}

function unmountLazyContainer() {
  eventManager.emit(ACTION.WILL_UNMOUNT);
  jest.runAllTimers();
  expect(document.querySelector(containerClass)).toBe(null);
}

describe('toastify', () => {
  it('Should lazy mount a ToastContainer if it is not mounted, when opt-in', () => {
    ensureLazyContainerIsNotMounted();
    toast.configure();
    toast('hello');
    jest.runAllTimers();

    expect(document.querySelector(containerClass)).not.toBe(null);
    unmountLazyContainer();
  });

  it('Should mount only one ToastContainer when using lazy container', () => {
    ensureLazyContainerIsNotMounted();
    toast.configure();
    toast('hello');
    toast('hello');
    jest.runAllTimers();

    expect(document.querySelectorAll(containerClass)).toHaveLength(1);
    unmountLazyContainer();
  });

  it("Should be possible to configure the ToastContainer even when it's lazy mounted", () => {
    ensureLazyContainerIsNotMounted();
    toast.configure({
      rtl: true
    });

    toast('hello');
    jest.runAllTimers();

    expect(document.querySelector(containerClass)).not.toBe(null);
    expect(
      document.querySelector(`.${RT_NAMESPACE}__toast-container--rtl`)
    ).not.toBe(null);
    unmountLazyContainer();
  });

  it('Should return a new id each time we emit a notification', () => {
    const firstId = toast('Hello');
    const secondId = toast('Hello');

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
    const toastId = Symbol('myId');
    const id = toast('Hello', { toastId });

    expect(id).not.toEqual(toastId);
  });

  describe('onChange event', () => {
    it('Should be able to track when toast is added or removed', () => {
      mount(<ToastContainer />);
      const fn = jest.fn();
      toast.onChange(fn);

      expect(fn).not.toHaveBeenCalled();
      toast('hello');
      jest.runAllTimers();
      expect(fn).toHaveBeenCalled();
    });

    it('The callback should receive the number of toast displayed', done => {
      mount(<ToastContainer />);
      toast.onChange(count => {
        expect(count).toBe(1);
        done();
      });
      toast('hello');
      jest.runAllTimers();
    });

    it('Should pass containerId as second arg if set', done => {
      mount(<ToastContainer containerId="foo" />);
      toast.onChange((count, containerId) => {
        expect(containerId).toBe('foo');
        done();
      });
      toast('hello');
      jest.runAllTimers();
    });
  });

  it('Should be able remove toast programmatically', () => {
    const component = mount(<ToastContainer />);
    const id = toast('hello');
    jest.runAllTimers();
    expect(component.state('toast')[0]).toBe(id);

    toast.dismiss(id);
    jest.runAllTimers();
    expect(component.state('toast').length).toBe(0);
  });

  describe('update function', () => {
    it('Should be able to update an existing toast', () => {
      const component = mount(<ToastContainer />);
      const id = toast('hello');
      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);
      toast.update(id, {
        render: 'foobar'
      });
      jest.runAllTimers();
      expect(component.html()).not.toMatch(/hello/);
      expect(component.html()).toMatch(/foobar/);
    });

    it('Should be able to update the same toast many times', () => {
      const component = mount(<ToastContainer />);
      const id = toast('hello');

      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);

      toast.update(id, {
        render: 'foobar'
      });

      jest.runAllTimers();
      expect(component.html()).toMatch(/foobar/);

      toast.update(id, {
        render: 'plop'
      });

      jest.runAllTimers();
      expect(component.html()).toMatch(/plop/);
    });

    it('Should be able to update a Toast and keep the same content', () => {
      const component = mount(<ToastContainer />);
      const id = toast('hello');

      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);
      toast.update(id, {
        className: 'foobar'
      });
      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);
      toast.update(id);
      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);
    });

    it('Should update a toast only if it exist and if the container is mounted', () => {
      const component = mount(<ToastContainer />);

      toast.update(0, {
        render: 'hello'
      });

      jest.runAllTimers();
      expect(component.html()).not.toMatch(/hello/);
    });

    it('Should be able to update the toastId', () => {
      const component = mount(<ToastContainer />);
      const id = toast('hello');
      const updateId = 'foo';

      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);
      toast.update(id, {
        toastId: updateId
      });
      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);
      expect(toast.isActive(id)).toBe(false);
      expect(toast.isActive(updateId)).toBe(true);
    });

    it('Should be able to update a toast even when using multi containers', () => {
      const component = mount(
        <>
          <ToastContainer containerId="first" enableMultiContainer />
          <ToastContainer containerId="second" enableMultiContainer />
        </>
      );

      const firstId = toast('hello first', { containerId: 'first' });
      const secondId = toast('hello second', { containerId: 'second' });
      jest.runAllTimers();

      toast.update(firstId, {
        render: 'updated first',
        containerId: 'first'
      });

      toast.update(secondId, {
        render: 'updated second',
        containerId: 'second'
      });

      jest.runAllTimers();

      expect(component.first().html()).toMatch(/updated first/);
      expect(component.at(1).html()).toMatch(/updated second/);
    });
  });

  describe('isActive function', () => {
    it('toast.isActive should return false until the container is mounted', () => {
      const isActive = toast.isActive();
      expect(isActive).toBe(false);
    });

    it('Should be able to tell if a toast is active based on the id as soon as the container is mounted', () => {
      mount(<ToastContainer />);
      const id = toast('hello');
      jest.runAllTimers();
      expect(toast.isActive(id)).toBe(true);
    });

    it('Should work with multi container', () => {
      mount(
        <>
          <ToastContainer containerId="first" enableMultiContainer />
          <ToastContainer containerId="second" enableMultiContainer />
        </>
      );

      const firstId = toast('hello first', { containerId: 'first' });
      const secondId = toast('hello second', { containerId: 'second' });
      jest.runAllTimers();

      expect(toast.isActive(firstId)).toBe(true);
      expect(toast.isActive(secondId)).toBe(true);
    });
  });

  it('Can append classNames', () => {
    const component = mount(<ToastContainer />);
    toast('hello', {
      className: 'class1',
      bodyClassName: 'class2',
      progressClassName: 'class3'
    });

    jest.runAllTimers();
    expect(component.render().find('.class1')).toHaveLength(1);
    expect(component.render().find('.class2')).toHaveLength(1);
    expect(component.render().find('.class3')).toHaveLength(1);
  });

  it('Should be able to use syntaxic sugar for different notification type', () => {
    const component = mount(<ToastContainer />);

    toast('plop');
    toast.success('plop');
    toast.error('plop');
    toast.warning('plop');
    toast.info('plop');
    toast.warn('plop');
    jest.runAllTimers();

    const html = component.html();

    Object.keys(TYPE).forEach(k => {
      expect(html.includes(`--${TYPE[k]}`)).toBe(true);
    });
  });

  describe('Controlled progress bar', () => {
    it('Should be possible to use a controlled progress bar', () => {
      const component = mount(<ToastContainer />);
      toast('Hello', {
        progress: 0.5
      });
      jest.runAllTimers();
      expect(component.html()).toMatch(/transform:(\s)?scaleX\(0.5\)/);
    });

    it('When `toast.done` is called, it should set scaleX to 1', () => {
      const component = mount(<ToastContainer />);
      const id = toast('Hello', {
        progress: 0.5
      });
      jest.runAllTimers();
      expect(component.html()).toMatch(/Hello/);

      toast.done(id);
      jest.runAllTimers();

      expect(component.html()).toMatch(/transform:(\s)?scaleX\(1\)/);
    });
  });
});
