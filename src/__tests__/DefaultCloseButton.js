/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import DefaultCloseButton from './../components/DefaultCloseButton';

const closeToast = jest.fn();

describe('DefaultCloseButton', () => {
  it('Should call closeToast on click', () => {
    const component = shallow(<DefaultCloseButton closeToast={closeToast} />);

    expect(closeToast).not.toHaveBeenCalled();
    component.simulate('click');
    expect(closeToast).toHaveBeenCalled();
  });
});
