import React from 'react';
import { render } from '@testing-library/react';

import { Toast, ToastContainer } from '../../src/components';
import { WithInjectedOptions } from 'types';

const REQUIRED_PROPS = {
  ...ToastContainer.defaultProps,
  closeToast: () => {},
  type: 'default',
  toastId: 'id',
  key: 'key'
} as WithInjectedOptions;

describe('Toast Component', () => {
  it('Should merge container and body className', () => {
    const { container } = render(
      <Toast
        {...REQUIRED_PROPS}
        autoClose={false}
        className="container-class"
        bodyClassName="body-class"
      >
        FooBar
      </Toast>
    );
    expect(container.querySelector('.container-class')).not.toBe(null);
    expect(container.querySelector('.body-class')).not.toBe(null);
  });
});
