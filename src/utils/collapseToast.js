/**
 * Used to collapse toast after exit animation
 */
export function collapseToast(node, done, duration) {
  if (duration === void 0) {
    duration = 300 /* Default.COLLAPSE_DURATION */;
  }
  var scrollHeight = node.scrollHeight,
    style = node.style;
  requestAnimationFrame(function () {
    style.minHeight = 'initial';
    style.height = scrollHeight + 'px';
    style.transition = 'all '.concat(duration, 'ms');
    requestAnimationFrame(function () {
      style.height = '0';
      style.padding = '0';
      style.margin = '0';
      setTimeout(done, duration);
    });
  });
}
//# sourceMappingURL=collapseToast.js.map
