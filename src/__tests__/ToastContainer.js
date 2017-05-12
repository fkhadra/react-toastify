import React from 'react';
import { shallow } from 'enzyme';

import ToastContainer from './../ToastContainer';

function hasProp(component, prop) {
  return {}.hasOwnProperty.call(component, prop);
}

describe('ToastContainer', ()=> {
  it('Should merge className and style', () => {
    const component = shallow(<ToastContainer className="plop" style={{background: 'red'}}/>);
    const expectedClassName = 'plop';
    const expectedStyle = {background: 'red'};

    expect(component.props().className).toContain(expectedClassName);
    expect(component.props().style).toMatchObject(expectedStyle);
  });

  it('autoClose can be false or > 0', () => {

  });

  it('closeButton can be false or a valid react element', ()=> {

  });

  it('Should bind event when mounted', () => {

  });

  it('Should unbind event when unmounted', () => {

  });

  it('Should allow only position defined in config', ()=> {

  });

  it(`Should always pass down: 
  -autoClose
  -closeButton
  -children
  -position
  -closeToast`, () => {

  });

  it('Should render only toast inside `toastToRender` variable', ()=> {

  });

  it('Should remove toast when not rendered', () => {

  });

  it('Should set style pointer events to none when there is no toast to render', ()=> {

  });
});