import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { CloseButton } from '../../src/components';

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

  it('Should have default aria-label set to close', () => {
    const { getByLabelText } = render(
      <CloseButton closeToast={closeToast} type="default" />
    );

    expect(getByLabelText('close')).not.toBe(null);
  });
});
