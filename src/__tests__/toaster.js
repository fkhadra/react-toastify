/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import ToastContainer from './../ToastContainer';
import toaster from './../toaster';
import EventManager from './../util/EventManager';
import { ACTION } from './../constant';

jest.useFakeTimers();

describe('toastify', () => {
  it("Should emit notification only if a container is mounted", () => {
    const spy = jest.fn();

    EventManager.on(ACTION.SHOW, spy);
    toaster('hello');
    expect(spy).not.toHaveBeenCalled();

    mount(<ToastContainer />);
    jest.runAllTimers();

    expect(spy).toHaveBeenCalled();
  });

  it("Should return a new id each time we emit a notification", () => {
    const firstId = toaster('Hello');
    const secondId = toaster('Hello');

    expect(firstId).not.toEqual(secondId);
  });

  it("Can remove toast programmatically", () => {
    const component = mount(<ToastContainer autoClose={false} />);
    const id = toaster('hello');

    jest.runAllTimers();
    expect(component.state('toast')[0]).toBe(id);

    toaster.dismiss(id);
    jest.runAllTimers();
    expect(component.state('toast').length).toBe(0);
  });

  it("Can tell if a toast is active based on the id", () => {
    mount(<ToastContainer autoClose={false} />);
    const id = toaster('hello');

    jest.runAllTimers();
    expect(toaster.isActive(id)).toBe(true);
  });

  it("Can append classNames", () => {
    const component = mount(<ToastContainer />);
    toaster('hello', {
      className: 'class1',
      bodyClassName: 'class2',
      progressClassName: 'class3'
    });

    jest.runAllTimers();
    expect(component.render().find('.toastify-content').hasClass('class1')).toBe(true);
    expect(component.render().find('.toastify__body').hasClass('class2')).toBe(true);
    expect(component.render().find('.toastify__progress').hasClass('class3')).toBe(true);
  });
});
