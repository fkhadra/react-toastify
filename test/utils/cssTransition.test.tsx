import React from 'react';
import { render } from '@testing-library/react';

import '../__mocks__/react-transition-group';
import { cssTransition, POSITION } from '../../src/utils';
import { ToastTransitionProps } from "../../src/types";

const transitionProps: ToastTransitionProps = {
  appear: true,
  done: jest.fn(),
  in: true,
  preventExitTransition: false,
  position: POSITION.TOP_RIGHT,
  nodeRef: React.useRef(document.createElement('div'))
}

// TODO: write better tests 😜
describe('cssTransition helper', () => {
  it('Should return a valid react component', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar'
    });

    const Child = () => <div>Plop</div>;
    const { container, getByText } = render(
      <Transition {...transitionProps}>
        <Child />
      </Transition>
    );

    expect(getByText('Plop').textContent).toContain('Plop');
    expect(container).toMatchSnapshot();
  });

  it('Should be possible to specify different duration for enter and exit', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar',
      duration: [300, 500]
    });

    const Child = () => <div>Plop</div>;
    const { container, getByText } = render(
      <Transition {...transitionProps}>
        <Child />
      </Transition>
    );
    expect(getByText('Plop').textContent).toContain('Plop');
    expect(container).toMatchSnapshot();
  });

  it('Should be possible to prevent exit transition', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar',
      duration: [300, 500]
    });

    const Child = () => <div>Plop</div>;
    const { container, getByText } = render(
      <Transition {...transitionProps} preventExitTransition>
        <Child />
      </Transition>
    );
    expect(getByText('Plop').textContent).toContain('Plop');
    expect(container).toMatchSnapshot();
  });
});
