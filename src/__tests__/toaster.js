/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import ToastContainer from './../ToastContainer';
import toaster from './../toaster';
import EventManager from './../util/EventManager';
import { ACTION, TYPE } from './../constant';

jest.useFakeTimers();

describe('toastify', () => {
  it('Should emit notification only if a container is mounted', () => {
    const spy = jest.fn();

    EventManager.on(ACTION.SHOW, spy);
    toaster('hello');
    expect(spy).not.toHaveBeenCalled();

    mount(<ToastContainer />);
    jest.runAllTimers();

    expect(spy).toHaveBeenCalled();
  });

  it('Should return a new id each time we emit a notification', () => {
    const firstId = toaster('Hello');
    const secondId = toaster('Hello');

    expect(firstId).not.toEqual(secondId);
  });

  it('Should be able remove toast programmatically', () => {
    const component = mount(<ToastContainer />);
    const id = toaster('hello');

    jest.runAllTimers();
    expect(component.state('toast')[0]).toBe(id);

    toaster.dismiss(id);
    jest.runAllTimers();
    expect(component.state('toast').length).toBe(0);
  });

  describe('update function', () => {
    it('Should be able to update an existing toast', () => {
      const component = mount(<ToastContainer />);
      const id = toaster('hello');

      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);
      toaster.update(id, {
        render: 'foobar'
      });
      jest.runAllTimers();
      expect(component.html()).not.toMatch(/hello/);
      expect(component.html()).toMatch(/foobar/);
    });

    it('Should be able to update the same toast many times', () => {
      const component = mount(<ToastContainer />);
      const id = toaster('hello');

      jest.runAllTimers();
      expect(component.html()).toMatch(/hello/);

      toaster.update(id, {
        render: 'foobar'
      });

      jest.runAllTimers();
      expect(component.html()).toMatch(/foobar/);

      toaster.update(id, {
        render: 'plop'
      });

      jest.runAllTimers();
      expect(component.html()).toMatch(/plop/);
    });
    it('Should update a toast only if it exist and if the container is mounted', () => {
      const component = mount(<ToastContainer />);

      toaster.update(0, {
        render: 'hello'
      });

      jest.runAllTimers();
      expect(component.html()).not.toMatch(/hello/);
    });
  });

  describe('isActive function', () => {
    it('toast.isActive should return false until the container is mounted', () => {
      const isActive = toaster.isActive();
      expect(isActive).toBe(false);
    });

    it('Should be able to tell if a toast is active based on the id as soon as the container is mounted', () => {
      mount(<ToastContainer />);
      const id = toaster('hello');

      jest.runAllTimers();
      expect(toaster.isActive(id)).toBe(true);
    });
  });

  it('Can append classNames', () => {
    const component = mount(<ToastContainer />);
    toaster('hello', {
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

    toaster('plop');
    toaster.success('plop');
    toaster.error('plop');
    toaster.warning('plop');
    toaster.info('plop');
    toaster.warn('plop');
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
});
