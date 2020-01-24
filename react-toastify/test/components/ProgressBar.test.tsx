import React from 'react';
import { render, fireEvent } from '@testing-library/react';
//import { shallow } from 'enzyme';

import { ProgressBar } from '../../src/components/ProgressBar';

const REQUIRED_PROPS = {
  delay: 5000,
  isRunning: true,
  rtl: false,
  closeToast: jest.fn()
};

describe('ProgressBar', () => {
  it('Should merge className', () => {
    const { container } = render(
      <ProgressBar {...REQUIRED_PROPS} className="test" />
    );

    expect((container.firstChild! as HTMLElement).className).toContain('test');
  });

  it('Should call closeToast function when animation end', () => {
    const { container } = render(<ProgressBar {...REQUIRED_PROPS} />);

    expect(REQUIRED_PROPS.closeToast).not.toHaveBeenCalled();
    fireEvent.animationEnd(container.firstChild as HTMLElement);
    expect(REQUIRED_PROPS.closeToast).toHaveBeenCalled();
  });

  it('Should be able to hide the progress bar', () => {
    const { container } = render(<ProgressBar {...REQUIRED_PROPS} hide />);
    expect((container.firstChild! as HTMLElement).style.opacity).toBe('0');
    expect(container).toMatchSnapshot();
  });

  it('Should be able to pause animation', () => {
    const { container } = render(
      <ProgressBar {...REQUIRED_PROPS} isRunning={false} />
    );
    expect(
      (container.firstChild! as HTMLElement).style.animationPlayState
    ).toBe('paused');
    expect(container).toMatchSnapshot();
  });

  it('Should render controlled progress bar', () => {
    const { container } = render(
      <ProgressBar {...REQUIRED_PROPS} controlledProgress progress={0.7} />
    );
    expect((container.firstChild! as HTMLElement).style.transform).toBe(
      'scaleX(0.7)'
    );
    expect(container).toMatchSnapshot();
  });
});
