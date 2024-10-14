import { useEffect, useRef, useState } from 'react';
import { registerToggle } from '../core/store';
export function useToast(props) {
  var _a = useState(false),
    isRunning = _a[0],
    setIsRunning = _a[1];
  var _b = useState(false),
    preventExitTransition = _b[0],
    setPreventExitTransition = _b[1];
  var toastRef = useRef(null);
  var drag = useRef({
    start: 0,
    delta: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    didMove: false
  }).current;
  var autoClose = props.autoClose,
    pauseOnHover = props.pauseOnHover,
    closeToast = props.closeToast,
    onClick = props.onClick,
    closeOnClick = props.closeOnClick;
  registerToggle({
    id: props.toastId,
    containerId: props.containerId,
    fn: setIsRunning
  });
  useEffect(
    function () {
      if (props.pauseOnFocusLoss) {
        bindFocusEvents();
        return function () {
          unbindFocusEvents();
        };
      }
    },
    [props.pauseOnFocusLoss]
  );
  function bindFocusEvents() {
    if (!document.hasFocus()) pauseToast();
    window.addEventListener('focus', playToast);
    window.addEventListener('blur', pauseToast);
  }
  function unbindFocusEvents() {
    window.removeEventListener('focus', playToast);
    window.removeEventListener('blur', pauseToast);
  }
  function onDragStart(e) {
    if (props.draggable === true || props.draggable === e.pointerType) {
      bindDragEvents();
      var toast = toastRef.current;
      drag.canCloseOnClick = true;
      drag.canDrag = true;
      toast.style.transition = 'none';
      if (props.draggableDirection === 'x' /* Direction.X */) {
        drag.start = e.clientX;
        drag.removalDistance =
          toast.offsetWidth * (props.draggablePercent / 100);
      } else {
        drag.start = e.clientY;
        drag.removalDistance =
          (toast.offsetHeight *
            (props.draggablePercent === 80 /* Default.DRAGGABLE_PERCENT */
              ? props.draggablePercent * 1.5
              : props.draggablePercent)) /
          100;
      }
    }
  }
  function onDragTransitionEnd(e) {
    var _a = toastRef.current.getBoundingClientRect(),
      top = _a.top,
      bottom = _a.bottom,
      left = _a.left,
      right = _a.right;
    if (
      e.nativeEvent.type !== 'touchend' &&
      props.pauseOnHover &&
      e.clientX >= left &&
      e.clientX <= right &&
      e.clientY >= top &&
      e.clientY <= bottom
    ) {
      pauseToast();
    } else {
      playToast();
    }
  }
  function playToast() {
    setIsRunning(true);
  }
  function pauseToast() {
    setIsRunning(false);
  }
  function bindDragEvents() {
    drag.didMove = false;
    document.addEventListener('pointermove', onDragMove);
    document.addEventListener('pointerup', onDragEnd);
  }
  function unbindDragEvents() {
    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', onDragEnd);
  }
  function onDragMove(e) {
    var toast = toastRef.current;
    if (drag.canDrag && toast) {
      drag.didMove = true;
      if (isRunning) pauseToast();
      if (props.draggableDirection === 'x' /* Direction.X */) {
        drag.delta = e.clientX - drag.start;
      } else {
        drag.delta = e.clientY - drag.start;
      }
      // prevent false positive during a toast click
      if (drag.start !== e.clientX) drag.canCloseOnClick = false;
      var translate =
        props.draggableDirection === 'x'
          ? ''.concat(drag.delta, 'px, var(--y)')
          : '0, calc('.concat(drag.delta, 'px + var(--y))');
      toast.style.transform = 'translate3d('.concat(translate, ',0)');
      toast.style.opacity = ''.concat(
        1 - Math.abs(drag.delta / drag.removalDistance)
      );
    }
  }
  function onDragEnd() {
    unbindDragEvents();
    var toast = toastRef.current;
    if (drag.canDrag && drag.didMove && toast) {
      drag.canDrag = false;
      if (Math.abs(drag.delta) > drag.removalDistance) {
        setPreventExitTransition(true);
        props.closeToast();
        props.collapseAll();
        return;
      }
      toast.style.transition = 'transform 0.2s, opacity 0.2s';
      toast.style.removeProperty('transform');
      toast.style.removeProperty('opacity');
    }
  }
  var eventHandlers = {
    onPointerDown: onDragStart,
    onPointerUp: onDragTransitionEnd
  };
  if (autoClose && pauseOnHover) {
    eventHandlers.onMouseEnter = pauseToast;
    // progress control is delegated to the container
    if (!props.stacked) eventHandlers.onMouseLeave = playToast;
  }
  // prevent toast from closing when user drags the toast
  if (closeOnClick) {
    eventHandlers.onClick = function (e) {
      onClick && onClick(e);
      drag.canCloseOnClick && closeToast();
    };
  }
  return {
    playToast: playToast,
    pauseToast: pauseToast,
    isRunning: isRunning,
    preventExitTransition: preventExitTransition,
    toastRef: toastRef,
    eventHandlers: eventHandlers
  };
}
//# sourceMappingURL=useToast.js.map
