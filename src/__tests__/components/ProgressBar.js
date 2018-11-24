/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from './../../components/ProgressBar';

const REQUIRED_PROPS = {
  delay: 5000,
  isRunning: true,
  rtl: false,
  closeToast: jest.fn()
};

describe('ProgressBar', () => {
  it('Should merge className', () => {
    const component = shallow(
      <ProgressBar {...REQUIRED_PROPS} className="test" />
    );
    expect(component.find('.test')).toHaveLength(1);
  });

  it('Should call closeToast function when animation end', () => {
    const component = shallow(<ProgressBar {...REQUIRED_PROPS} />);

    expect(REQUIRED_PROPS.closeToast).not.toHaveBeenCalled();
    component.simulate('animationEnd');
    expect(REQUIRED_PROPS.closeToast).toHaveBeenCalled();
  });

  it('Should be able to hide the progress bar', () => {
    const component = shallow(<ProgressBar {...REQUIRED_PROPS} hide />);
    expect(component).toMatchSnapshot();
  });

  it('Should be able to pause animation', () => {
    const component = shallow(
      <ProgressBar {...REQUIRED_PROPS} isRunning={false} />
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render controlled progress bar', () => {
    const component = shallow(
      <ProgressBar {...REQUIRED_PROPS} controlledProgress progress={0.7} />
    );
    expect(component).toMatchSnapshot();
  });
});
