import React from 'react';
import { render } from '@testing-library/react';

import '../__mocks__/react-transition-group';
import { cssTransition } from '../../src/utils';

describe('cssTransition helper', () => {
  it('Should return a valid react component', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar'
    });

    const Child = () => <div>Plop</div>;
    const { container, getByText } = render(
      <Transition>
        <Child />
      </Transition>
    );

    expect(getByText('Plop').textContent).toContain('Plop');
    expect(container).toMatchSnapshot();
  });
});
