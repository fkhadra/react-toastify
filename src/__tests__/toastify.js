/* eslint-env jest */

import React from 'react';
import { mount } from 'enzyme';

import ToastContainer from './../ToastContainer';
import toastify from './../toastify';
import EventManager from './../util/EventManager';
import config from './../config';

describe('toastify', () => {
  it("Should emit notification only if a container is mounted", () => {
    const spy = jest.fn();
    EventManager.on(config.ACTION.SHOW, spy);
    toastify('hello');
    expect(spy).not.toHaveBeenCalled();

    mount(<ToastContainer />);
    expect(spy).toHaveBeenCalled();
  });

  it("Should return a new id each time we emit a notification", () => {
    const firstId = toastify('Hello');
    const secondId = toastify('Hello');

    expect(firstId).not.toEqual(secondId);
  });

  it("Can remove toast programmatically", () => {
    const component = mount(<ToastContainer autoClose={false} />);
    const id = toastify('hello');

    expect(component.state('toast')[0]).toBe(id);
    toastify.dismiss(id);
    expect(component.state('toast').length).toBe(0);
  });
});
