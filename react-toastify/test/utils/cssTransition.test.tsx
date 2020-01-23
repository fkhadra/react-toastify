import React from 'react';
import { shallow } from 'enzyme';

import { cssTransition } from '../../src/utils';

describe('cssTransition helper', () => {
  it('Should return a valid react component', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar'
    });
    const children = () => <div>Plop</div>;
    const component = shallow(<Transition>{children}</Transition>);
    expect(component).toHaveLength(1);
  });
});
