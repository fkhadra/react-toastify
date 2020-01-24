import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { CloseButton } from '../../src/components/CloseButton';

const closeToast = jest.fn();

describe('CloseButton', () => {
  it('Should call closeToast on click', () => {
    const { container } = render(
      <CloseButton closeToast={closeToast} type="default" />
    );

    expect(closeToast).not.toHaveBeenCalled();
    fireEvent.click(container.firstChild as HTMLElement);
    expect(closeToast).toHaveBeenCalled();
  });
});
