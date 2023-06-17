import { useMemo, useRef, useSyncExternalStore } from 'react';

import { Toast, ToastContainerProps, ToastPosition } from '../types';

import { store } from '../core';

export function useToastContainer(props: ToastContainerProps) {
  const containerRef = useRef(null);
  const { subscribe, getSnapshot } = useMemo(
    () => store.registerContainer(props),
    [props]
  );
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  // TODO: extract when idea are clear
  function getToastToRender<T>(
    cb: (position: ToastPosition, toastList: Toast[]) => T
  ) {
    if (!snapshot) return [];

    const toRender = new Map<ToastPosition, Toast[]>();

    if (props.newestOnTop) snapshot.reverse();

    snapshot.forEach(toast => {
      const { position } = toast.props;
      toRender.has(position) || toRender.set(position, []);
      toRender.get(position)!.push(toast);
    });

    return Array.from(toRender, p => cb(p[0], p[1]));
  }

  return {
    getToastToRender,
    containerRef,
    isToastActive: store.isToastActive
  };
}
