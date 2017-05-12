/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';

import ToastContainer from './../ToastContainer';
import Toast from './../Toast';
import toastify from './../toastify';

import config from './../config';
import EventManager from './../util/EventManager';

function hasProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

describe('ToastContainer', () => {
  it('Should merge className and style', () => {
    const component = shallow(<ToastContainer className="plop" style={{ background: 'red' }} />);
    const expectedClassName = 'plop';
    const expectedStyle = { background: 'red' };

    expect(component.props().className).toContain(expectedClassName);
    expect(component.props().style).toMatchObject(expectedStyle);
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
    const component = shallow(<ToastContainer />);
    expect(component.prop('style').pointerEvents).toEqual('none');
  });

  it(`Should always pass down to Toast the props: 
    -autoClose
    -closeButton
    -children
    -position
    -closeToast`, () => {
    const component = mount(<ToastContainer />);
    // Create a toast
    toastify('coucou');
    const props = component.children().find(Toast).props();
    [
      'autoClose',
      'closeButton',
      'children',
      'position',
      'closeToast'
    ].forEach(key => expect(hasProp(props, key)).toBeTruthy());
  });
});
