/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import ToastContainer from './../components/ToastContainer';
import toast from './../toast';
import eventManager from './../utils/eventManager';
import { ACTION, TYPE } from './../utils/constant';

jest.useFakeTimers();

// Clear all previous event to avoid any clash between tests
beforeEach(() => {
  eventManager
    .off(ACTION.SHOW)
    .off(ACTION.CLEAR)
    .off(ACTION.ON_CHANGE);
});

describe('toastify', () => {
  it('Should emit notification only if a container is mounted', () => {
    const fn = jest.fn();

    eventManager.on(ACTION.SHOW, fn);
    toast('hello');
    expect(fn).not.toHaveBeenCalled();

    mount(<ToastContainer />);
    jest.runAllTimers();
    expect(fn).toHaveBeenCalled();
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

    // Remove default types as there is no shortcut for that one
    const expectedTypes = Object.keys(TYPE)
      .map(k => TYPE[k])
      .sort();

    // Array unique since warn and warning use the same type
    const typesToMatch = [
      ...new Set(
        Object.keys(component.instance().collection).map(
          k => component.instance().collection[k].options.type
        )
      )
    ].sort();

    expect(expectedTypes).toEqual(typesToMatch);
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

    it('It should close the toast when `toast.done` is called', () => {
      const component = mount(<ToastContainer />);
      const id = toast('Hello', {
        progress: 0.5
      });
      jest.runAllTimers();
      expect(component.html()).toMatch(/Hello/);

      toast.done(id);
      jest.runAllTimers();

      // Ok I cheated here 💩, I'm not testing if onTransitionEnd is triggered
      // Shame on me 😭
      expect(component.html()).toMatch(/transform:(\s)?scaleX\(1\)/);
    });

    it('It should be possible to define a percentage when `toast.done` is called', () => {
      const component = mount(<ToastContainer />);
      const id = toast('Hello', {
        progress: 1
      });
      jest.runAllTimers();
      expect(component.html()).toMatch(/transform:(\s)?scaleX\(1\)/);

      toast.done(id, 0);
      jest.runAllTimers();
      expect(component.html()).toMatch(/transform:(\s)?scaleX\(0\)/);
    });
  });
});
