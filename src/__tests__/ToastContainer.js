/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import ToastContainer from './../ToastContainer';
import toaster from './../toaster';

import config from './../constant';
import EventManager from './../util/EventManager';

function hasProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

jest.useFakeTimers();

describe('ToastContainer', () => {
  it('Should bind event when mounted and unbind them when unmounted', () => {
    const component = mount(<ToastContainer />);

    expect(EventManager.eventList.has(config.ACTION.SHOW)).toBeTruthy();
    expect(EventManager.eventList.has(config.ACTION.CLEAR)).toBeTruthy();

    component.unmount();
    expect(EventManager.eventList.has(config.ACTION.SHOW)).toBeFalsy();
    expect(EventManager.eventList.has(config.ACTION.CLEAR)).toBeFalsy();
  });

  it(`Should always pass down to Toast the props: 
    -autoClose
    -closeButton
    -children
    -position
    -pauseOnHover
    -transition
    -closeToast`, () => {
    const component = mount(<ToastContainer />);
    // Create a toast
    toaster('coucou');
    jest.runAllTimers();
    // toast collection
    const collection = component.instance().collection;
    // retrieve collection first index
    const idx = Object.keys(collection)[0];
    const props = collection[idx].content.props;

    [
      'autoClose',
      'closeButton',
      'children',
      'position',
      'closeToast',
      'transition',
      'pauseOnHover'
    ].forEach(key => expect(hasProp(props, key)).toBeTruthy());
  });
});
