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
import { Direction } from '../utils/constant';

interface Draggable {
  start: number;
  x: number;
  y: number;
  delta: number;
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
    delta: 0,
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
    if (props.draggable) {
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
          toast.offsetHeight * (props.draggablePercent / 100);
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
    if (drag.canDrag) {
      e.preventDefault();

      const toast = toastRef.current!;
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
      toast.style.opacity = `${1 -
        Math.abs(drag.delta / drag.removalDistance)}`;
    }
  }

  function onDragEnd() {
    const toast = toastRef.current!;
    if (drag.canDrag) {
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
