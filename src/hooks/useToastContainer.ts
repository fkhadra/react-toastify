import { useRef, useSyncExternalStore } from 'react';
import { isToastActive, registerContainer } from '../core/store';
import { Toast, ToastContainerProps, ToastPosition } from '../types';

export function useToastContainer(props: ToastContainerProps) {
  const { subscribe, getSnapshot, setProps } = useRef(
    registerContainer(props)
  ).current;
  setProps(props);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

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
