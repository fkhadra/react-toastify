import {
  useState,
  useRef,
  useEffect,
  isValidElement,
  DOMAttributes
} from 'react';

import { isFn, Default, Direction, SyntheticEvent } from '../utils';
import { ToastProps } from '../types';

interface Draggable {
  start: number;
  x: number;
  y: number;
  delta: number;
  removalDistance: number;
  canCloseOnClick: boolean;
  canDrag: boolean;
  boundingRect: DOMRect | null;
  didMove: boolean;
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
  const [isRunning, setIsRunning] = useState(false);
  const [preventExitTransition, setPreventExitTransition] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Draggable>({
    start: 0,
    x: 0,
    y: 0,
    delta: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    boundingRect: null,
    didMove: false
  }).current;
  const syncProps = useRef(props);
  const { autoClose, pauseOnHover, closeToast, onClick, closeOnClick } = props;

  useEffect(() => {
    syncProps.current = props;
  });

  useEffect(() => {
    if (toastRef.current)
      toastRef.current.addEventListener(
        SyntheticEvent.ENTRANCE_ANIMATION_END,
        playToast,
        { once: true }
      );

    if (isFn(props.onOpen))
      props.onOpen(isValidElement(props.children) && props.children.props);

    return () => {
      const props = syncProps.current;
      if (isFn(props.onClose))
        props.onClose(isValidElement(props.children) && props.children.props);
    };
  }, []);

  useEffect(() => {
    props.pauseOnFocusLoss && bindFocusEvents();
    return () => {
      props.pauseOnFocusLoss && unbindFocusEvents();
    };
  }, [props.pauseOnFocusLoss]);

  function onDragStart(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent<HTMLElement>
  ) {
    if (props.draggable) {
      bindDragEvents();
      const toast = toastRef.current!;
      drag.canCloseOnClick = true;
      drag.canDrag = true;
      drag.boundingRect = toast.getBoundingClientRect();
      toast.style.transition = '';
      drag.x = getX(e.nativeEvent as DragEvent);
      drag.y = getY(e.nativeEvent as DragEvent);

      if (props.draggableDirection === Direction.X) {
        drag.start = drag.x;
        drag.removalDistance =
          toast.offsetWidth * (props.draggablePercent / 100);
      } else {
        drag.start = drag.y;
        drag.removalDistance =
          toast.offsetHeight *
          (props.draggablePercent === Default.DRAGGABLE_PERCENT
            ? props.draggablePercent * 1.5
            : props.draggablePercent / 100);
      }
    }
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
    if (!document.hasFocus()) pauseToast();

    window.addEventListener('focus', playToast);
    window.addEventListener('blur', pauseToast);
  }

  function unbindFocusEvents() {
    window.removeEventListener('focus', playToast);
    window.removeEventListener('blur', pauseToast);
  }

  function bindDragEvents() {
    drag.didMove = false;
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
    if (drag.canDrag && toast) {
      drag.didMove = true;
      if (isRunning) pauseToast();
      drag.x = getX(e as DragEvent);
      drag.y = getY(e as DragEvent);
      if (props.draggableDirection === Direction.X) {
        drag.delta = drag.x - drag.start;
      } else {
        drag.delta = drag.y - drag.start;
      }

      // prevent false positif during a toast click
      if (drag.start !== drag.x) drag.canCloseOnClick = false;
      toast.style.transform = `translate${props.draggableDirection}(${drag.delta}px)`;
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
        return;
      }
      toast.style.transition = 'transform 0.2s, opacity 0.2s';
      toast.style.transform = `translate${props.draggableDirection}(0)`;
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
