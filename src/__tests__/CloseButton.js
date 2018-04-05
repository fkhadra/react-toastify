/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import CloseButton from './../components/CloseButton';

const closeToast = jest.fn();

describe('CloseButton', () => {
  it('Should call closeToast on click', () => {
    const component = shallow(<CloseButton closeToast={closeToast} />);

    expect(closeToast).not.toHaveBeenCalled();
    component.simulate('click');
    expect(closeToast).toHaveBeenCalled();
  });
});
