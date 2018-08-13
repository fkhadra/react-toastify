/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import ToastContainer from './../../components/ToastContainer';
import toast from './../../toast';

import { ACTION } from './../../utils/constant';
import eventManager from './../../utils/eventManager';

jest.useFakeTimers();

function hasProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// extract props from component instance
function getToastProps(component) {
  const collection = component.instance().collection;
  const toast = collection[Object.keys(collection)[0]];

  return toast.options;
}

describe('ToastContainer', () => {
  it('Should bind event when mounted and unbind them when unmounted', () => {
    const component = mount(<ToastContainer />);

    expect(eventManager.list.has(ACTION.SHOW)).toBeTruthy();
    expect(eventManager.list.has(ACTION.CLEAR)).toBeTruthy();

    component.unmount();
    expect(eventManager.list.has(ACTION.SHOW)).toBeFalsy();
    expect(eventManager.list.has(ACTION.CLEAR)).toBeFalsy();
  });

  it(`Should always pass down to Toast the props: 
    -autoClose
    -closeButton
    -position
    -pauseOnHover
    -transition
    -closeToast`, () => {
    const component = mount(<ToastContainer />);
    // Create a toast
    toast('coucou');
    jest.runAllTimers();

    const props = getToastProps(component);

    [
      'autoClose',
      'closeButton',
      'position',
      'closeToast',
      'transition',
      'pauseOnHover'
    ].forEach(key => expect(hasProp(props, key)).toBeTruthy());
  });

  it('Should clear all toast when clear is called without id', () => {
    const component = mount(<ToastContainer />);

    toast('coucou');
    toast('coucou');
    jest.runAllTimers();

    expect(component.state().toast).toHaveLength(2);

    toast.dismiss();
    jest.runAllTimers();

    expect(component.state().toast).toHaveLength(0);
  });

  it('Should be able to render a react element, a string, a number, a render props without crashing', () => {
    const component = mount(<ToastContainer />);
    toast('coucou');
    toast(123);
    toast(<div>plop</div>);
    toast(() => <div>plop</div>);
    jest.runAllTimers();

    expect(component.state().toast).toHaveLength(4);
  });

  it('Should be able to display new toast on top', () => {
    /*eslint no-extend-native: 0 */
    Array.prototype.reverse = jest.fn(Array.prototype.reverse);
    mount(<ToastContainer newestOnTop />);
    toast('hello');
    toast(123);
    jest.runAllTimers();

    expect(Array.prototype.reverse).toHaveBeenCalled();
  });

  it('Toast options should supersede ToastContainer props', () => {
    const component = mount(<ToastContainer />);
    const CloseBtn = () => <div>Close</div>;
    const fn = () => {};
    const desiredProps = {
      pauseOnHover: false,
      closeOnClick: false,
      onOpen: fn,
      onClose: fn,
      autoClose: false,
      hideProgressBar: true,
      position: 'top-left',
      closeButton: <CloseBtn />
    };

    toast('hello', desiredProps);
    jest.runAllTimers();
    const props = getToastProps(component);

    expect(props).toMatchObject(desiredProps);
  });

  it('Should pass closeToast function and type when using a custom CloseButton', () => {
    const component = mount(<ToastContainer />);
    const CloseBtn = () => <div>x</div>;
    const Msg = () => <div>Plop</div>;

    toast(<Msg />, {
      closeButton: CloseBtn
    });
    jest.runAllTimers();

    const props = getToastProps(component);
    expect(Object.keys(props.closeButton.props)).toMatchObject([
      'ariaLabel',
      'closeToast',
      'type'
    ]);
  });

  it('Should be able to disable the close button', () => {
    let component = mount(<ToastContainer />);
    toast('hello');
    jest.runAllTimers();
    // ensure that close button is present by default
    expect(component.html()).toMatch(/✖/);
    component.unmount();

    component = mount(<ToastContainer closeButton={false} />);
    toast('hello');
    jest.runAllTimers();

    expect(component.html()).not.toMatch(/toastify__close/);
  });

  it('Should merge className and style', () => {
    const component = mount(
      <ToastContainer className="foo" style={{ background: 'red' }} />
    );
    toast('hello');
    jest.runAllTimers();

    expect(component.html()).toMatch(/class=".+foo"/);
    expect(component.html()).toMatch(/style="background: red;"/);
  });

  // Most of css-in-js use toString to translate to className
  it('Should support css-in-js rules', () => {
    const className = {
      background: 'purple',
      toString() {
        return 'random-class-name';
      }
    };

    const component = mount(
      <ToastContainer className={className} style={{ background: 'red' }} />
    );

    toast('hello');
    jest.runAllTimers();

    expect(component.html()).toMatch(/class=".+random-class-name"/);
  });

  it('Should pass a closeToast function when displaying a react component', () => {
    const component = mount(<ToastContainer />);
    const Msg = () => <div>Plop</div>;

    toast(<Msg />);
    jest.runAllTimers();

    const props = getToastProps(component);

    expect(props).toHaveProperty('closeToast');
  });

  describe('closeToast function', () => {
    it('Should remove toast when closeToast is called', () => {
      const component = mount(<ToastContainer />);
      const Msg = () => <div>Plop</div>;

      toast(<Msg />);
      jest.runAllTimers();

      let props = getToastProps(component);

      //ensure that the toast is present
      expect(component.state().toast).toHaveLength(1);

      // close the toast with the function passed to the close button
      props.closeToast();
      jest.runAllTimers();

      expect(component.state().toast).toHaveLength(0);

      //do the same but with the closeButton this time
      toast(<Msg />);
      jest.runAllTimers();

      props = getToastProps(component);

      //ensure that the toast is present
      expect(component.state().toast).toHaveLength(1);

      // close the toast with the function passed to the close button
      props.closeButton.props.closeToast();
      jest.runAllTimers();

      expect(component.state().toast).toHaveLength(0);
    });
  });

  it('Should include only the style needed for a given position', () => {
    Object.keys(toast.POSITION).forEach(k => {
      const component = mount(<ToastContainer position={toast.POSITION[k]} />);
      const id = toast('test');
      jest.runAllTimers();
      expect(component.instance().collection[id].position).toBe(
        toast.POSITION[k]
      );
    });
  });

  it("Should throw an error if can't render a toast", () => {
    expect(() => {
      mount(<ToastContainer />);
      toast(false);
      jest.runAllTimers();
      jest.clearAllTimers();
    }).toThrow(/The element you provided cannot be rendered/);
  });

  it('Should be able run toast even when document is not visible', () => {
    document.addEventListener = jest.fn();
    mount(<ToastContainer pauseOnVisibilityChange={false} />);
    const ev = new Event('visibilitychange');
    document.dispatchEvent(ev);

    expect(document.addEventListener).not.toHaveBeenCalled();
  });
});
