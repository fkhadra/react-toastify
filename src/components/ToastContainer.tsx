import cx from 'clsx';
import React, { useRef, useState } from 'react';

import { toast } from '../core';
import { useToastContainer } from '../hooks/useToastContainer';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { ToastContainerProps, ToastPosition } from '../types';
import { Default, Direction, isFn, parseClassName } from '../utils';
import { Toast } from './Toast';
import { Bounce } from './Transitions';

export const defaultProps: ToastContainerProps = {
  position: 'top-right',
  transition: Bounce,
  autoClose: 5000,
  closeButton: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: 'touch',
  draggablePercent: Default.DRAGGABLE_PERCENT as number,
  draggableDirection: Direction.X,
  role: 'alert',
  theme: 'light'
};

export function ToastContainer(props: ToastContainerProps) {
  let containerProps: ToastContainerProps = {
    ...defaultProps,
    ...props
  };
  const stacked = props.stacked;
  const [collapsed, setIsCollapsed] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { getToastToRender, isToastActive, count } =
    useToastContainer(containerProps);
  const { className, style, rtl, containerId } = containerProps;

  function getClassName(position: ToastPosition) {
    const defaultClassName = cx(
      `${Default.CSS_NAMESPACE}__toast-container`,
      `${Default.CSS_NAMESPACE}__toast-container--${position}`,
      { [`${Default.CSS_NAMESPACE}__toast-container--rtl`]: rtl }
    );
    return isFn(className)
      ? className({
          position,
          rtl,
          defaultClassName
        })
      : cx(defaultClassName, parseClassName(className));
  }

  function collapseAll() {
    if (stacked) {
      setIsCollapsed(true);
      toast.play();
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (stacked) {
      const nodes = containerRef.current!.querySelectorAll('[data-in="true"]');
      const gap = 12;
      const isTop = containerProps.position?.includes('top');
      let usedHeight = 0;
      let prevS = 0;

      Array.from(nodes)
        .reverse()
        .forEach((n, i) => {
          const node = n as HTMLElement;
          node.classList.add(`${Default.CSS_NAMESPACE}__toast--stacked`);

          if (i > 0) node.dataset.collapsed = `${collapsed}`;

          if (!node.dataset.pos) node.dataset.pos = isTop ? 'top' : 'bot';

          const y =
            usedHeight * (collapsed ? 0.2 : 1) + (collapsed ? 0 : gap * i);

          node.style.setProperty('--y', `${isTop ? y : y * -1}px`);
          node.style.setProperty('--g', `${gap}`);
          node.style.setProperty('--s', `${1 - (collapsed ? prevS : 0)}`);

          usedHeight += node.offsetHeight;
          prevS += 0.025;
        });
    }
  }, [collapsed, count, stacked]);

  return (
    <div
      ref={containerRef}
      className={Default.CSS_NAMESPACE as string}
      id={containerId as string}
      onMouseEnter={() => {
        if (stacked) {
          setIsCollapsed(false);
          toast.pause();
        }
      }}
      onMouseLeave={collapseAll}
    >
      {getToastToRender((position, toastList) => {
        const containerStyle: React.CSSProperties = !toastList.length
          ? { ...style, pointerEvents: 'none' }
          : { ...style };

        return (
          <div
            className={getClassName(position)}
            style={containerStyle}
            key={`container-${position}`}
          >
            {toastList.map(({ content, props: toastProps }) => {
              return (
                <Toast
                  {...toastProps}
                  stacked={stacked}
                  collapseAll={collapseAll}
                  isIn={isToastActive(
                    toastProps.toastId,
                    toastProps.containerId
                  )}
                  style={toastProps.style}
                  key={`toast-${toastProps.key}`}
                >
                  {content}
                </Toast>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
