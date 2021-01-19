import * as React from 'react';
import { render } from '@testing-library/react';

import { cssTransition, POSITION } from '../../src/utils';
import { ToastTransitionProps } from '../../src/types';

const transitionProps: ToastTransitionProps = {
  done: jest.fn(),
  isIn: true,
  preventExitTransition: false,
  position: POSITION.TOP_RIGHT,
  nodeRef: {
    current: document.createElement('div')
  }
};

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

  it('Should be possible to prevent exit transition', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar'
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

  it('Should be possible to disable collapse animation', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar',
      collapse: false
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

  it('Should be possible to change  collapse duration', () => {
    const Transition = cssTransition({
      enter: 'foo',
      exit: 'bar',
      collapseDuration: 200
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
});
