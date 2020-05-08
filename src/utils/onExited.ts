import { canUseDom } from './propValidator';

const iLoveInternetExplorer =
  canUseDom && /(msie|trident)/i.test(navigator.userAgent);

export function onExited(node: HTMLElement, done: () => void) {
  if (iLoveInternetExplorer) {
    done();
    return;
  }
  const height = node.scrollHeight;
  const style = node.style;

  requestAnimationFrame(() => {
    style.minHeight = 'initial';
    style.height = height + 'px';
    style.transition = 'all 0.4s ';

    requestAnimationFrame(() => {
      style.height = '0';
      style.padding = '0';
      style.margin = '0';
    });
    setTimeout(() => {
      done();
    }, 500);
  });
}
