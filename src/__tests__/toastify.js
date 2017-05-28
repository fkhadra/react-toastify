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
});
