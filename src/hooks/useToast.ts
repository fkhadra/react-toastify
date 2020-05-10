import {
  useState,
  useRef,
  useEffect,
  isValidElement,
  DOMAttributes
} from 'react';

import { isFn } from '../utils';
import { ToastProps } from '../types';
import { useKeeper } from './useKeeper';

interface Draggable {
  start: number;
  x: number;
  y: number;
  deltaX: number;
  removalDistance: number;
  canCloseOnClick: boolean;
  canDrag: boolean;
  boundingRect: DOMRect | null;
}

type DragEvent = MouseEvent & TouchEvent;

function getX(e: DragEvent) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientX
    : e.clientX;
}

function getY(e: DragEvent) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
}

export function useToast(props: ToastProps) {
  const [isRunning, setIsRunning] = useState(true);
  const [preventExitTransition, setPreventExitTransition] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const drag = useKeeper<Draggable>({
    start: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    boundingRect: null
  });
  const syncProps = useKeeper(props, true);
  const { autoClose, pauseOnHover, closeToast, onClick, closeOnClick } = props;

  useEffect(() => {
    if (isFn(props.onOpen))
      props.onOpen(isValidElement(props.children) && props.children.props);

    return () => {
      if (isFn(syncProps.onClose))
        syncProps.onClose(
          isValidElement(syncProps.children) && syncProps.children.props
        );
    };
  }, []);

  useEffect(() => {
    props.draggable && bindDragEvents();
    return () => {
      props.draggable && unbindDragEvents();
    };
  }, [props.draggable]);

  useEffect(() => {
    props.pauseOnFocusLoss && bindFocusEvents();
    return () => {
      props.pauseOnFocusLoss && unbindFocusEvents();
    };
  }, [props.pauseOnFocusLoss]);

  function onDragStart(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent<HTMLElement>
  ) {
    const toast = toastRef.current!;
    drag.canCloseOnClick = true;
    drag.canDrag = true;
    drag.boundingRect = toast.getBoundingClientRect();
    toast.style.transition = '';
    drag.start = drag.x = getX(e.nativeEvent as DragEvent);
    drag.removalDistance = toast.offsetWidth * (props.draggablePercent / 100);
  }

  function onDragTransitionEnd() {
    if (drag.boundingRect) {
      const { top, bottom, left, right } = drag.boundingRect;

      if (
        props.pauseOnHover &&
        drag.x >= left &&
        drag.x <= right &&
        drag.y >= top &&
        drag.y <= bottom
      ) {
        pauseToast();
      } else {
        playToast();
      }
    }
  }

  function playToast() {
    setIsRunning(true);
  }

  function pauseToast() {
    setIsRunning(false);
  }

  function bindFocusEvents() {
    window.addEventListener('focus', playToast);
    window.addEventListener('blur', pauseToast);
  }

  function unbindFocusEvents() {
    window.removeEventListener('focus', playToast);
    window.removeEventListener('blur', pauseToast);
  }

  function bindDragEvents() {
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);

    document.addEventListener('touchmove', onDragMove);
    document.addEventListener('touchend', onDragEnd);
  }

  function unbindDragEvents() {
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);

    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);
  }

  function onDragMove(e: MouseEvent | TouchEvent) {
    const toast = toastRef.current!;

    if (drag.canDrag) {
      if (isRunning) pauseToast();

      drag.x = getX(e as DragEvent);
      drag.deltaX = drag.x - drag.start;
      drag.y = getY(e as DragEvent);

      // prevent false positif during a toast click
      if (drag.start !== drag.x) drag.canCloseOnClick = false;

      toast.style.transform = `translateX(${drag.deltaX}px)`;
      toast.style.opacity = `${1 -
        Math.abs(drag.deltaX / drag.removalDistance)}`;
    }
  }

  function onDragEnd() {
    const toast = toastRef.current!;
    if (drag.canDrag) {
      drag.canDrag = false;

      if (Math.abs(drag.deltaX) > drag.removalDistance) {
        setPreventExitTransition(true);
        props.closeToast();
        return;
      }

      toast.style.transition = 'transform 0.2s, opacity 0.2s';
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }
  }

  const eventHandlers: DOMAttributes<HTMLElement> = {
    onMouseDown: onDragStart,
    onTouchStart: onDragStart,
    onMouseUp: onDragTransitionEnd,
    onTouchEnd: onDragTransitionEnd
  };

  if (autoClose && pauseOnHover) {
    eventHandlers.onMouseEnter = pauseToast;
    eventHandlers.onMouseLeave = playToast;
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
