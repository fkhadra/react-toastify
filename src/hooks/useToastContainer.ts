import { useRef, useSyncExternalStore } from 'react';
import { isToastActive, registerContainer } from '../core/store';
import { Toast, ToastContainerProps, ToastPosition } from '../types';

export function useToastContainer(props: ToastContainerProps) {
  const { subscribe, getSnapshot, setProps } = useRef(registerContainer(props)).current;
  setProps(props);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)?.slice();

  function getToastToRender<T>(cb: (position: ToastPosition, toastList: Toast[]) => T) {
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
    isToastActive,
    // Changes whenever the rendered toasts change, even when their number does not
    // (e.g. a toast promoted from the limit queue replacing the one that closed)
    toastKeys: snapshot?.map(t => t.props.key).join()
  };
}
