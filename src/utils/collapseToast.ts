import { DEFAULT } from './constant';

/**
 * Used to collapse toast after exit animation
 */
export function collapseToast(
  node: HTMLElement,
  done: () => void,
  duration = DEFAULT.COLLAPSE_DURATION
) {
  const height = node.scrollHeight;
  const style = node.style;

  function onCollapseEnd() {
    node.removeEventListener('transitionend', onCollapseEnd);
    done();
  }

  requestAnimationFrame(() => {
    style.minHeight = 'initial';
    style.height = height + 'px';
    style.transition = `all ${duration}ms`;

    requestAnimationFrame(() => {
      style.height = '0';
      style.padding = '0';
      style.margin = '0';
    });
    node.addEventListener('transitionend', onCollapseEnd);
  });
}
