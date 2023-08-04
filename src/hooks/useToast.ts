import { DOMAttributes, useEffect, useRef, useState } from 'react';

import { ToastProps } from '../types';
import { Default, Direction } from '../utils';
import { registerToggle } from '../core/store';

interface Draggable {
  start: number;
  delta: number;
  removalDistance: number;
  canCloseOnClick: boolean;
  canDrag: boolean;
  didMove: boolean;
}

export function useToast(props: ToastProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [preventExitTransition, setPreventExitTransition] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Draggable>({
    start: 0,
    delta: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    didMove: false
  }).current;
  const { autoClose, pauseOnHover, closeToast, onClick, closeOnClick } = props;

  registerToggle({
    id: props.toastId,
    containerId: props.containerId,
    fn: setIsRunning
  });

  useEffect(() => {
    if (props.pauseOnFocusLoss) {
      bindFocusEvents();

      return () => {
        unbindFocusEvents();
      };
    }
  }, [props.pauseOnFocusLoss]);

  function bindFocusEvents() {
    if (!document.hasFocus()) pauseToast();

    window.addEventListener('focus', playToast);
    window.addEventListener('blur', pauseToast);
  }

  function unbindFocusEvents() {
    window.removeEventListener('focus', playToast);
    window.removeEventListener('blur', pauseToast);
  }

  function onDragStart(e: React.PointerEvent<HTMLElement>) {
    if (props.draggable === true || props.draggable === e.pointerType) {
      bindDragEvents();
      const toast = toastRef.current!;
      drag.canCloseOnClick = true;
      drag.canDrag = true;
      toast.style.transition = 'none';

      if (props.draggableDirection === Direction.X) {
        drag.start = e.clientX;
        drag.removalDistance =
          toast.offsetWidth * (props.draggablePercent / 100);
      } else {
        drag.start = e.clientY;
        drag.removalDistance =
          (toast.offsetHeight *
            (props.draggablePercent === Default.DRAGGABLE_PERCENT
              ? props.draggablePercent * 1.5
              : props.draggablePercent)) /
          100;
      }
    }
  }

  function onDragTransitionEnd(e: React.PointerEvent<HTMLElement>) {
    const { top, bottom, left, right } =
      toastRef.current!.getBoundingClientRect();

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

  function onDragMove(e: PointerEvent) {
    const toast = toastRef.current!;
    if (drag.canDrag && toast) {
      drag.didMove = true;
      if (isRunning) pauseToast();
      if (props.draggableDirection === Direction.X) {
        drag.delta = e.clientX - drag.start;
      } else {
        drag.delta = e.clientY - drag.start;
      }

      // prevent false positive during a toast click
      if (drag.start !== e.clientX) drag.canCloseOnClick = false;
      const translate =
        props.draggableDirection === 'x'
          ? `${drag.delta}px, var(--y)`
          : `0, calc(${drag.delta}px + var(--y))`;
      toast.style.transform = `translate3d(${translate},0)`;
      toast.style.opacity = `${
        1 - Math.abs(drag.delta / drag.removalDistance)
      }`;
    }
  }

  function onDragEnd() {
    unbindDragEvents();
    const toast = toastRef.current!;
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

  const eventHandlers: DOMAttributes<HTMLElement> = {
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
    eventHandlers.onClick = (e: React.MouseEvent) => {
      onClick && onClick(e);
      drag.canCloseOnClick && closeToast();
    };
  }

  return {
    playToast,
    pauseToast,
    isRunning,
    preventExitTransition,
    toastRef,
    eventHandlers
  };
}
