import React from 'react';
import { shallow } from 'enzyme';

import CloseButton from '../../src/components/CloseButton';

const closeToast = jest.fn();

describe('CloseButton', () => {
  it('Should call closeToast on click', () => {
    const component = shallow(
      <CloseButton closeToast={closeToast} type="default" />
    );

    expect(closeToast).not.toHaveBeenCalled();
    component.simulate('click', { stopPropagation: () => undefined });
    expect(closeToast).toHaveBeenCalled();
  });
});
