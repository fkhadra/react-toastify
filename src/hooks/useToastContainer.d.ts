import { isToastActive } from '../core/store';
import { Toast, ToastContainerProps, ToastPosition } from '../types';
export declare function useToastContainer(props: ToastContainerProps): {
    getToastToRender: <T>(cb: (position: ToastPosition, toastList: Toast[]) => T) => T[];
    isToastActive: typeof isToastActive;
    count: number | undefined;
};
