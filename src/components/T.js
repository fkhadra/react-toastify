import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import ProgressBar from "./ProgressBar";
import {
  POSITION,
  TYPE,
  NOOP,
  RT_NAMESPACE,
  falseOrDelay,
  objectValues,
  canUseDom
} from "./../utils";

function getX(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientX
    : e.clientX;
}

function getY(e) {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
}

const iLoveInternetExplorer =
  canUseDom && /(msie|trident)/i.test(navigator.userAgent);


function reducer(action)

function useDraggable({ draggablePercent }) {
  const domRef = useRef();
  const dragRef = useRef({
    start: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    boundingRect: null
  });

  function onDragStart(e) {
    const drag = dragRef.current;
    const domNode = domRef.current;

    drag.canCloseOnClick = true;
    drag.canDrag = true;
    drag.boundingRect = domNode.getBoundingClientRect();

    domNode.style.transition = "";

    drag.start = drag.x = getX(e.nativeEvent);
    drag.removalDistance =
    domNode.offsetWidth * (draggablePercent / 100);
  }

  function onDragMove(e) {
    const drag = dragRef.current;
    const domNode = domRef.current;

    if (drag.canDrag) {
      if (state.isRunning) {
        pauseToast();
      }

      drag.x = getX(e);
      drag.deltaX = drag.x - drag.start;
      drag.y = getY(e);

      // prevent false positif during a toast click
      drag.start !== drag.x && (drag.canCloseOnClick = false);

      domNode.style.transform = `translateX(${drag.deltaX}px)`;
      domNode.style.opacity =
        1 - Math.abs(drag.deltaX / drag.removalDistance);
    }
  }

  function onDragEnd(e) {
    if (flag.canDrag) {
      flag.canDrag = false;

      if (Math.abs(drag.deltaX) > drag.removalDistance) {
        setState(
          {
            preventExitTransition: true
          },
          props.closeToast
        );
        return;
      }

      ref.style.transition = "transform 0.2s, opacity 0.2s";
      ref.style.transform = "translateX(0)";
      ref.style.opacity = 1;
    }
  }

  function onDragTransitionEnd() {
    if (boundingRect) {
      const { top, bottom, left, right } = boundingRect;

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
}

function Toast(props) {
  const [isRunning, setToastState] = useState(true);
  const toastRef = useRef();
  const prevPropsRef = useRef({
    draggable: null,
    pauseOnFocusLoss: null
  });

  const dragRef = useRef({
    start: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    removalDistance: 0
  });

  useEffect(() => {
    props.onOpen(props.children.props);
    if (props.draggable) bindDragEvents();
    if (props.pauseOnFocusLoss) bindFocusEvents();

    return () => {
      props.onClose(props.children.props);
      if (props.draggable) unbindDragEvents();
      if (props.pauseOnFocusLoss) unbindFocusEvents();
    };
  }, []);

  useEffect(() => {
    const { draggable, pauseOnFocusLoss } = prevPropsRef.current;

    if (draggable !== props.draggable && props.draggable) {
      bindDragEvents();
    } else {
      unbindDragEvents();
    }

    if (pauseOnFocusLoss !== props.pauseOnFocusLoss && props.pauseOnFocusLoss) {
      bindFocusEvents();
    } else {
      unbindFocusEvents();
    }
  }, [props]);

  function pauseToast() {
    if (props.autoClose) setToastState(false);
  }

  function pauseToast() {
    if (props.autoClose) setToastState(true);
  }

  // Maybe let the end user tweak it later on
  // hmmm no comment about ie. I hope this browser die one day
  // don't want to fix the issue on this browser, my head is hurting too much
  function onExitTransitionEnd() {
    const ref = toastRef.current;

    if (iLoveInternetExplorer) {
      props.onExited();
      return;
    }
    const height = ref.scrollHeight;
    const style = ref.style;

    requestAnimationFrame(() => {
      style.minHeight = "initial";
      style.height = height + "px";
      style.transition = "all 0.4s ";

      requestAnimationFrame(() => {
        style.height = 0;
        style.padding = 0;
        style.margin = 0;
      });
      setTimeout(() => props.onExited(), 400);
    });
  }

  function bindFocusEvents() {
    prevProps.current.pauseOnFocusLoss = true;
    window.addEventListener("focus", playToast);
    window.addEventListener("blur", pauseToast);
  }

  function unbindFocusEvents() {
    prevProps.current.pauseOnFocusLoss = false;
    window.removeEventListener("focus", playToast);
    window.removeEventListener("blur", pauseToast);
  }

  function bindDragEvents() {
    prevProps.current.draggable = true;
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);

    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragEnd);
  }

  function unbindDragEvents() {
    prevProps.current.draggable = false;
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);

    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);
  }
}
