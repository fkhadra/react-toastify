import { act, fireEvent } from '@testing-library/react';
import { Default } from '../src/utils';

export const cssClasses = {
  rtl: `.${Default.CSS_NAMESPACE}__toast--rtl`,
  closeOnClick: `.${Default.CSS_NAMESPACE}__toast--close-on-click`,
  progressBar: `.${Default.CSS_NAMESPACE}__progress-bar`,
  progressBarController: `.${Default.CSS_NAMESPACE}__progress-bar--controlled`,
  closeButton: `.${Default.CSS_NAMESPACE}__close-button`,
  container: `.${Default.CSS_NAMESPACE}__toast-container`
};

export function triggerAnimationEnd(node: HTMLElement | HTMLElement[]) {
  act(() => {
    if (Array.isArray(node)) {
      node.forEach(el => {
        fireEvent.animationEnd(el.parentNode!);
      });
    } else {
      fireEvent.animationEnd(node.parentNode!);
    }

    jest.runAllTimers();
  });
}

export function waitForUseEffectCleanup(fn: () => void) {
  setTimeout(fn, 100);
}
