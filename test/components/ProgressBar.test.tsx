import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { ProgressBar } from '../../src/components';

const getProps = () => ({
  delay: 5000,
  isRunning: true,
  rtl: false,
  closeToast: jest.fn(),
  isIn: true
});

describe('ProgressBar', () => {
  it('Should merge className', () => {
    const { container } = render(
      <ProgressBar {...getProps()} className="test" />
    );

    expect((container.firstChild! as HTMLElement).className).toContain('test');
  });

  it('Should call closeToast function when animation end', () => {
    const closeToast = jest.fn();
    const { container } = render(
      <ProgressBar {...getProps()} closeToast={closeToast} />
    );

    expect(closeToast).not.toHaveBeenCalled();
    fireEvent.animationEnd(container.firstChild as HTMLElement);
    expect(closeToast).toHaveBeenCalled();
  });

  it('Should be able to hide the progress bar', () => {
    const { container } = render(<ProgressBar {...getProps()} hide />);
    expect((container.firstChild! as HTMLElement).style.opacity).toBe('0');
    expect(container).toMatchSnapshot();
  });

  it('Should be able to pause animation', () => {
    const { container } = render(
      <ProgressBar {...getProps()} isRunning={false} />
    );
    expect(
      (container.firstChild! as HTMLElement).style.animationPlayState
    ).toBe('paused');
    expect(container).toMatchSnapshot();
  });

  it('Should render controlled progress bar', () => {
    const { container } = render(
      <ProgressBar {...getProps()} controlledProgress progress={0.7} />
    );
    expect((container.firstChild! as HTMLElement).style.transform).toBe(
      'scaleX(0.7)'
    );
    expect(container).toMatchSnapshot();
  });
});
