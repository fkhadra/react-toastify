import { Id, NotValidatedToastProps, OnChangeCallback, Toast, ToastContainerProps, ToastContent } from '../types';
type Notify = () => void;
export type ContainerObserver = ReturnType<typeof createContainerObserver>;
export declare function createContainerObserver(id: Id, containerProps: ToastContainerProps, dispatchChanges: OnChangeCallback): {
    id: Id;
    props: ToastContainerProps;
    observe: (notify: Notify) => () => boolean;
    toggle: (v: boolean, id?: Id) => void;
    removeToast: (id?: Id) => void;
    toasts: Map<Id, Toast>;
    clearQueue: () => void;
    buildToast: <TData = unknown>(content: ToastContent<TData>, options: NotValidatedToastProps) => void;
    setProps(p: ToastContainerProps): void;
    setToggle: (id: Id, fn: (v: boolean) => void) => void;
    isToastActive: (id: Id) => boolean;
    getSnapshot: () => Toast[];
};
export {};
