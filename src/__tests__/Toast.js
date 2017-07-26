/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';

import Toast from './../Toast';
import DefaultCloseButton from './../DefaultCloseButton';
import ProgressBar from './../ProgressBar';
import config from './../config';

const REQUIRED_PROPS = {
  closeButton: <DefaultCloseButton />,
  autoClose: 5000,
  closeToast: () => {},
  position: config.POSITION.TOP_RIGHT,
  pauseOnHover: true,
  closeOnClick: true
};

describe('Toast', () => {
  it('Should merge container and body className', () => {
    const component = shallow(
      <Toast
        {...REQUIRED_PROPS}
        autoClose={false}
        className="container-class"
        bodyClassName="body-class"
      >
        FooBar
      </Toast>
    );

    expect(component.find('.container-class')).toHaveLength(1);
    expect(component.find('.body-class')).toHaveLength(1);
  });

  it('Should not render ProgressBar if autoClose prop is set to false', () => {
    const component = shallow(
      <Toast
        {...REQUIRED_PROPS}
        autoClose={false}
      >
        FooBar
      </Toast>
    );

    expect(component.children().find(ProgressBar).length).toBe(0);
  });

  it('Should not render closeButton if closeButton prop is set to false',
    () => {
      const component = shallow(
        <Toast
          {...REQUIRED_PROPS}
          closeButton={false}
        >
          FooBar
        </Toast>
      );

      expect(component.children().find(DefaultCloseButton).length).toBe(0);
    });

  it('Can call onOpen callback when component mount', () => {
    const onOpen = jest.fn();
    mount(
      <Toast
        {...REQUIRED_PROPS}
        onOpen={onOpen}
      >
        FooBar
      </Toast>
    );

    expect(onOpen).toHaveBeenCalled();
  });

  it('Can call onClose callback when component will unmount', () => {
    const onClose = jest.fn();
    const component = mount(
      <Toast
        {...REQUIRED_PROPS}
        onClose={onClose}
      >
        FooBar
      </Toast>
    );

    component.unmount();
    expect(onClose).toHaveBeenCalled();
  });

  it('Can pause toast delay on mouse enter', () => {
    const component = shallow(
      <Toast
        {...REQUIRED_PROPS}
      >
        FooBar
      </Toast>
    );

    expect(component.state('isRunning')).toBeTruthy();
    component.simulate('mouseEnter');
    expect(component.state('isRunning')).toBeFalsy();
  });


  it('Can keep runing on mouse enter', () => {
    const component = shallow(
      <Toast
        {...REQUIRED_PROPS}
        pauseOnHover={false}
      >
        FooBar
      </Toast>
    );

    expect(component.state('isRunning')).toBeTruthy();
    component.simulate('mouseEnter');
    expect(component.state('isRunning')).toBeTruthy();
  });

  it('Should play toast delay on mouse leave', () => {
    const component = shallow(
      <Toast
        {...REQUIRED_PROPS}
      >
        FooBar
      </Toast>
    );

    expect(component.state('isRunning')).toBeTruthy();
    component.simulate('mouseEnter');
    expect(component.state('isRunning')).toBeFalsy();
    component.simulate('mouseLeave');
    expect(component.state('isRunning')).toBeTruthy();
  });

  it('Should not call setState if autoClose prop is false', () => {
    const component = shallow(
      <Toast
        {...REQUIRED_PROPS}
        autoClose={false}
      >
        FooBar
      </Toast>
    );

    expect(component.state('isRunning')).toBeTruthy();
    component.simulate('mouseEnter');
    expect(component.state('isRunning')).toBeTruthy();
  });
});
