import { Id, IdOpts, ToastContent, ToastOptions, UpdateOptions } from '../types';
import { isToastActive } from './store';
declare function toast<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id;
declare namespace toast {
    var loading: <TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData> | undefined) => Id;
    var promise: typeof handlePromise;
    var success: <TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData> | undefined) => Id;
    var info: <TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData> | undefined) => Id;
    var error: <TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData> | undefined) => Id;
    var warning: <TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData> | undefined) => Id;
    var warn: <TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData> | undefined) => Id;
    var dark: (content: ToastContent, options?: ToastOptions<unknown> | undefined) => Id;
    var dismiss: {
        (params: RemoveParams): void;
        (params?: Id | undefined): void;
    };
    var clearWaitingQueue: typeof import("./store").clearWaitingQueue;
    var isActive: typeof isToastActive;
    var update: <TData = unknown>(toastId: Id, options?: UpdateOptions<TData>) => void;
    var done: (id: Id) => void;
    var onChange: typeof import("./store").onChange;
    var play: (opts?: IdOpts | undefined) => void;
    var pause: (opts?: IdOpts | undefined) => void;
}
export interface ToastPromiseParams<TData = unknown, TError = unknown, TPending = unknown> {
    pending?: string | UpdateOptions<TPending>;
    success?: string | UpdateOptions<TData>;
    error?: string | UpdateOptions<TError>;
}
declare function handlePromise<TData = unknown, TError = unknown, TPending = unknown>(promise: Promise<TData> | (() => Promise<TData>), { pending, error, success }: ToastPromiseParams<TData, TError, TPending>, options?: ToastOptions<TData>): Promise<TData>;
interface RemoveParams {
    id?: Id;
    containerId: Id;
}
export { toast };
