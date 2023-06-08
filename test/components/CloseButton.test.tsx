import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { CloseButton } from '../../src/components';

const closeToast = jest.fn();

describe('CloseButton', () => {
  it('Should call closeToast on click', () => {
    const { container } = render(
      <CloseButton closeToast={closeToast} type="default" theme="light" />
    );
    const element = container.firstChild;

    expect(element instanceof HTMLButtonElement).toBe(true);
    expect(closeToast).not.toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('close'));
    expect(closeToast).toHaveBeenCalled();
  });

  it('Should have aria-label set to close by default', () => {
    const { getByLabelText } = render(
      <CloseButton closeToast={closeToast} type="default" theme="dark" />
    );

    expect(getByLabelText('close')).not.toBe(null);
  });
});
