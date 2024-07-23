import { Id, NotValidatedToastProps, OnChangeCallback, ToastContainerProps, ToastContent, ToastOptions } from '../types';
interface ClearWaitingQueueParams {
    containerId?: Id;
}
interface RemoveParams {
    id?: Id;
    containerId: Id;
}
export declare const getToast: (id: Id, { containerId }: ToastOptions) => import("../types").Toast | undefined;
export declare function isToastActive(id: Id, containerId?: Id): boolean;
export declare function removeToast(params?: Id | RemoveParams): void;
export declare function clearWaitingQueue(p?: ClearWaitingQueueParams): void;
export declare function pushToast<TData>(content: ToastContent<TData>, options: NotValidatedToastProps): void;
interface ToggleToastParams {
    id?: Id;
    containerId?: Id;
}
type RegisterToggleOpts = {
    id: Id;
    containerId?: Id;
    fn: (v: boolean) => void;
};
export declare function registerToggle(opts: RegisterToggleOpts): void;
export declare function toggleToast(v: boolean, opt?: ToggleToastParams): void;
export declare function registerContainer(props: ToastContainerProps): {
    subscribe(notify: () => void): () => void;
    setProps(p: ToastContainerProps): void;
    getSnapshot(): import("../types").Toast[] | undefined;
};
export declare function onChange(cb: OnChangeCallback): () => void;
export {};
