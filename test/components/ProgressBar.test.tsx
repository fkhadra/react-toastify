import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { ProgressBar } from '../../src/components';
import { Theme } from '../../src/types';

const getProps = () => ({
  delay: 5000,
  isRunning: true,
  rtl: false,
  closeToast: jest.fn(),
  isIn: true,
  theme: ['colored', 'light', 'dark'][Math.floor(Math.random() * 3)] as Theme
});

describe('ProgressBar', () => {
  it('Should merge className', () => {
    render(<ProgressBar {...getProps()} className="test" />);

    expect(document.querySelector('.test')?.classList.contains('test')).toBe(
      true
    );
  });
  it('Should merge className in function form', () => {
    render(<ProgressBar {...getProps()} className={() => 'testClassName'} />);

    expect(
      document
        .querySelector('.testClassName')
        ?.classList.contains('testClassName')
    ).toBe(true);
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
  });

  it('Should be able to pause animation', () => {
    const { container } = render(
      <ProgressBar {...getProps()} isRunning={false} />
    );
    expect(
      (container.firstChild! as HTMLElement).style.animationPlayState
    ).toBe('paused');
  });

  it('Should render controlled progress bar', () => {
    const { container } = render(
      <ProgressBar {...getProps()} controlledProgress progress={0.7} />
    );
    expect((container.firstChild! as HTMLElement).style.transform).toBe(
      'scaleX(0.7)'
    );
  });
});
