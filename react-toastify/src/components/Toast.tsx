import React, { useState, useEffect, useRef, isValidElement, cloneElement } from 'react';
import cx from 'classnames';

import { ProgressBar } from './ProgressBar';
import { WithInjectedOptions } from '../types';
import { NOOP, canUseDom, RT_NAMESPACE, isFn } from '../utils';
import { TransitionProps } from 'react-transition-group/Transition';

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

const iLoveInternetExplorer =
  canUseDom && /(msie|trident)/i.test(navigator.userAgent);

interface DragRef {
  start: number;
  x: number;
  y: number;
  deltaX: number;
  removalDistance: number;
  canCloseOnClick: boolean;
  canDrag: boolean;
  boundingRect: DOMRect | null;
}

export const Toast: React.FC<WithInjectedOptions> = props => {
  const [isRunning, setIsRunning] = useState(true);
  const [preventExitTransition, setPreventExitTransition] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const prevPropsRef = useRef({
    draggable: props.draggable,
    pauseOnFocusLoss: props.pauseOnFocusLoss
  });
  const dragRef = useRef<DragRef>({
    start: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    boundingRect: null
  });

  useEffect(() => {
    // props.onOpen(props.children!.props);
    if (props.draggable) bindDragEvents();
    if (props.pauseOnFocusLoss) bindFocusEvents();

    return () => {
      // props.onClose(props.children.props);
      if (props.draggable) unbindDragEvents();
      if (props.pauseOnFocusLoss) unbindFocusEvents();
    };
  }, []);

  useEffect(() => {
    if (prevPropsRef.current.draggable !== props.draggable) {
      props.draggable ? bindDragEvents() : unbindDragEvents();
    }

    if (prevPropsRef.current.pauseOnFocusLoss !== props.pauseOnFocusLoss) {
      props.pauseOnFocusLoss ? bindFocusEvents() : unbindFocusEvents();
    }

    prevPropsRef.current = {
      draggable: props.draggable,
      pauseOnFocusLoss: props.pauseOnFocusLoss
    };
  }, [props]);

  function playToast() {
    props.autoClose && setIsRunning(true);
  }

  function pauseToast() {
    props.autoClose && setIsRunning(false);
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

  function onDragStart(
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent<HTMLElement>
  ) {
    const drag = dragRef.current;
    const toast = toastRef.current!;
    drag.canCloseOnClick = true;
    drag.canDrag = true;
    drag.boundingRect = toast.getBoundingClientRect();
    toast.style.transition = '';
    drag.start = drag.x = getX(e.nativeEvent as DragEvent);
    drag.removalDistance = toast.offsetWidth * (props.draggablePercent / 100);
  }

  function onDragMove(e: MouseEvent | TouchEvent) {
    const drag = dragRef.current;
    const toast = toastRef.current!;
    
    if (drag.canDrag) {
      if (isRunning) pauseToast();

      drag.x = getX(e as DragEvent);
      drag.deltaX = drag.x - drag.start;
      drag.y = getY(e as DragEvent);

      // prevent false positif during a toast click
      drag.start !== drag.x && (drag.canCloseOnClick = false);

      toast.style.transform = `translateX(${drag.deltaX}px)`;
      toast.style.opacity = `${1 -
        Math.abs(drag.deltaX / drag.removalDistance)}`;
    }
  }

  function onDragEnd() {
    const drag = dragRef.current;
    const toast = toastRef.current!;
    if (drag.canDrag) {
      drag.canDrag = false;

      if (Math.abs(drag.deltaX) > drag.removalDistance) {
        setPreventExitTransition(false);
        props.closeToast();
        return;
      }

      toast.style.transition = 'transform 0.2s, opacity 0.2s';
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }
  }

  function onDragTransitionEnd() {
    const drag = dragRef.current;
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

  // Maybe let the end user tweak it later on
  // hmmm no comment about ie. I hope this browser die one day
  // don't want to fix the issue on this browser, my head is hurting too much
  function onExitTransitionEnd() {
    if (iLoveInternetExplorer) {
      //props.onExited();
      return;
    }
    const toast = toastRef.current!;
    const height = toast.scrollHeight;
    const style = toast.style;

    requestAnimationFrame(() => {
      style.minHeight = 'initial';
      style.height = height + 'px';
      style.transition = 'all 0.4s ';

      requestAnimationFrame(() => {
        style.height = '0';
        style.padding = '0';
        style.margin = '0';
      });
      //setTimeout(() => this.props.onExited(), 400);
    });
  }

  const {
    closeButton,
    children,
    autoClose,
    pauseOnHover,
    onClick,
    closeOnClick,
    type,
    hideProgressBar,
    closeToast,
    transition: Foo,
    position,
    className,
    bodyClassName,
    progressClassName,
    progressStyle,
    updateId,
    role,
    progress,
    rtl
  } = props as Required<WithInjectedOptions>;
  

  const toastProps: Record<string, string | Function> = {
    className: cx(
      `${RT_NAMESPACE}__toast`,
      `${RT_NAMESPACE}__toast--${type}`,
      {
        [`${RT_NAMESPACE}__toast--rtl`]: rtl
      },
      className
    )
  };

  if (autoClose && pauseOnHover) {
    toastProps.onMouseEnter = pauseToast;
    toastProps.onMouseLeave = playToast;
  }

  // prevent toast from closing when user drags the toast
  if (closeOnClick) {
    toastProps.onClick = (e: React.MouseEvent) => {
      onClick && onClick(e);
      dragRef.current.canCloseOnClick && closeToast();
    };
  }

  const controlledProgress = !!progress;
  const T = Foo as React.FC<Partial<TransitionProps>>;

  function renderCloseButton(closeButton: any) {
    if (!closeButton) return null;

    const props = { closeToast, type };
    if (isFn(closeButton)) return closeButton(props);
    if (isValidElement(closeButton)) return cloneElement(closeButton,props);
  }

  return (
    <T
      in={props.in}
      appear
      onExited={onExitTransitionEnd}
      position={position}
      preventExitTransition={preventExitTransition}
    >
      <div
        onClick={onClick}
        {...toastProps}
        ref={toastRef}
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
        onMouseUp={onDragTransitionEnd}
        onTouchEnd={onDragTransitionEnd}
      >
        <div
          {...(props.in && { role: role })}
          className={cx(`${RT_NAMESPACE}__toast-body`, bodyClassName)}
        >
          {children}
        </div>
        {renderCloseButton(closeButton)}
        {(autoClose || controlledProgress) && (
          <ProgressBar
            {...(updateId && !controlledProgress
              ? { key: `pb-${updateId}` }
              : {})}
            rtl={rtl}
            delay={autoClose as number}
            isRunning={isRunning}
            closeToast={closeToast}
            hide={hideProgressBar}
            type={type}
            style={progressStyle}
            className={progressClassName}
            controlledProgress={controlledProgress}
            progress={progress}
          />
        )}
      </div>
    </T>
  );
};

Toast.defaultProps = {
  onOpen: NOOP
};
