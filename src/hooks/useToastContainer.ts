import { useMemo, useSyncExternalStore } from 'react';

import { isToastActive, registerContainer } from '../core/store';
import { Toast, ToastContainerProps, ToastPosition } from '../types';

export function useToastContainer(props: ToastContainerProps) {
  const { subscribe, getSnapshot } = useMemo(
    () => registerContainer(props),
    [props]
  );
  const snapshot = useSyncExternalStore(subscribe, getSnapshot);

  // TODO: extract when idea are clear
  function getToastToRender<T>(
    cb: (position: ToastPosition, toastList: Toast[]) => T
  ) {
    if (!snapshot) return [];

    const toRender = new Map<ToastPosition, Toast[]>();

    snapshot.forEach(toast => {
      const { position } = toast.props;
      toRender.has(position) || toRender.set(position, []);
      toRender.get(position)!.push(toast);
    });

    return Array.from(toRender, p => cb(p[0], p[1]));
  }

  return {
    getToastToRender,
    isToastActive,
    count: snapshot?.length
  };
}
