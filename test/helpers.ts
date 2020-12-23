import { fireEvent } from '@testing-library/react';
import { DEFAULT } from '../src/utils';

export const cssClasses = {
  rtl: `.${DEFAULT.CSS_NAMESPACE}__toast--rtl`,
  progressBar: `.${DEFAULT.CSS_NAMESPACE}__progress-bar`,
  progressBarController: `.${DEFAULT.CSS_NAMESPACE}__progress-bar--controlled`,
  closeButton: `.${DEFAULT.CSS_NAMESPACE}__close-button`,
  container: `.${DEFAULT.CSS_NAMESPACE}__toast-container`
};

export function triggerAnimationEnd(node: HTMLElement | HTMLElement[]) {
  if (Array.isArray(node)) {
    node.forEach(el => {
      fireEvent.animationEnd(el.parentNode!);
    });
  } else {
    fireEvent.animationEnd(node.parentNode!);
  }

  jest.runAllTimers();
}

export function waitForUseEffectCleanup(fn: () => void) {
  setTimeout(fn, 100);
}
