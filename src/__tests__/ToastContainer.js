import React from 'react';
import { shallow, mount, unmount } from 'enzyme';

import ToastContainer from './../ToastContainer';

import config from './../config';
import EventManager from './../util/EventManager';

describe('ToastContainer', () => {
  it('Should merge className and style', () => {
    const component = shallow(<ToastContainer className="plop" style={{ background: 'red' }}/>);
    const expectedClassName = 'plop';
    const expectedStyle = { background: 'red' };

    expect(component.props().className).toContain(expectedClassName);
    expect(component.props().style).toMatchObject(expectedStyle);
  });

  it('Should bind event when mounted and unbind them when unmounted', () => {
    const component = mount(<ToastContainer/>);

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

  it(`Should always pass down: 
    -autoClose
    -closeButton
    -children
    -position
    -closeToast`, () => {

  });

  it('Should render only toast inside `toastToRender` variable', () => {

  });

  it('Should remove toast when not rendered', () => {

  });
});