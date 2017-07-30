/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import ToastContainer from './../ToastContainer';
import Toast from './../Toast';
import toaster from './../toaster';

import config from './../config';
import EventManager from './../util/EventManager';

function hasProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

jest.useFakeTimers();

describe('ToastContainer', () => {
  it('Should merge className and style', () => {
    const component = mount(<ToastContainer className="plop" style={{ background: 'red' }} />);
    const expectedStyle = { background: 'red' };

    toaster('coucou');
    jest.runAllTimers();

    expect(component.find('.toastify').hasClass('plop')).toBe(true);
    expect(component.find('.toastify').prop('style')).toMatchObject(expectedStyle);
  });

  it('Should bind event when mounted and unbind them when unmounted', () => {
    const component = mount(<ToastContainer />);

    expect(EventManager.eventList.has(config.ACTION.SHOW)).toBeTruthy();
    expect(EventManager.eventList.has(config.ACTION.CLEAR)).toBeTruthy();

    component.unmount();
    expect(EventManager.eventList.has(config.ACTION.SHOW)).toBeFalsy();
    expect(EventManager.eventList.has(config.ACTION.CLEAR)).toBeFalsy();
  });

  it('Should set style pointer events to none when there is no toast to render', () => {
    const component = mount(<ToastContainer />);

    toaster('coucou');
    jest.runAllTimers();
    toaster.dismiss();
    jest.runAllTimers();

    expect(component.find('.toastify').prop('style').pointerEvents).toEqual('none');
  });

  it(`Should always pass down to Toast the props: 
    -autoClose
    -closeButton
    -children
    -position
    -pauseOnHover
    -closeToast`, () => {
    const component = mount(<ToastContainer />);
    // Create a toast
    toaster('coucou');
    jest.runAllTimers();

    const props = component.children().find(Toast).props();

    [
      'autoClose',
      'closeButton',
      'children',
      'position',
      'closeToast',
      'pauseOnHover'
    ].forEach(key => expect(hasProp(props, key)).toBeTruthy());
  });
});
