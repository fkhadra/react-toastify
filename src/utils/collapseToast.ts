import { Default, raf } from './constant';

/**
 * Used to collapse toast after exit animation
 */
export function collapseToast(
  node: HTMLElement,
  done: () => void,
  duration = Default.COLLAPSE_DURATION
) {
  const { scrollHeight, style } = node;

  raf(() => {
    style.minHeight = 'initial';
    style.height = scrollHeight + 'px';
    style.transition = `all ${duration}ms`;

    raf(() => {
      style.height = '0';
      style.padding = '0';
      style.margin = '0';
      setTimeout(done, duration as number);
    });
  });
}
