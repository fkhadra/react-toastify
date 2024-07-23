import { DOMAttributes } from 'react';
import { ToastProps } from '../types';
export declare function useToast(props: ToastProps): {
    playToast: () => void;
    pauseToast: () => void;
    isRunning: boolean;
    preventExitTransition: boolean;
    toastRef: import("react").RefObject<HTMLDivElement>;
    eventHandlers: DOMAttributes<HTMLElement>;
};
