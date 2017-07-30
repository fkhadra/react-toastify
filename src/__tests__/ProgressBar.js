/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from './../ProgressBar';

const REQUIRED_PROPS = {
  delay: 5000,
  isRunning: true,
  closeToast: jest.fn()
};

describe('ProgressBar', () => {
  it('Should merge className', () => {
    const component = shallow(
      <ProgressBar
        {...REQUIRED_PROPS}
        className="test"
      />
    );
    expect(component.find('.test')).toHaveLength(1);
  });

  it('Should call closeToast function when animation end', () => {
    const component = shallow(<ProgressBar {...REQUIRED_PROPS} />);

    expect(REQUIRED_PROPS.closeToast).not.toHaveBeenCalled();
    component.simulate('animationEnd');
    expect(REQUIRED_PROPS.closeToast).toHaveBeenCalled();
  });
});
