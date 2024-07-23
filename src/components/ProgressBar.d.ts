import React from 'react';
import { TypeOptions, ToastClassName, Theme } from '../types';
export interface ProgressBarProps {
    /**
     * The animation delay which determine when to close the toast
     */
    delay: number;
    /**
     * Whether or not the animation is running or paused
     */
    isRunning: boolean;
    /**
     * Func to close the current toast
     */
    closeToast: () => void;
    /**
     * Optional type : info, success ...
     */
    type?: TypeOptions;
    /**
     * The theme that is currently used
     */
    theme: Theme;
    /**
     * Hide or not the progress bar
     */
    hide?: boolean;
    /**
     * Optional className
     */
    className?: ToastClassName;
    /**
     * Optional inline style
     */
    style?: React.CSSProperties;
    /**
     * Tell wether or not controlled progress bar is used
     */
    controlledProgress?: boolean;
    /**
     * Controlled progress value
     */
    progress?: number | string;
    /**
     * Support rtl content
     */
    rtl?: boolean;
    /**
     * Tell if the component is visible on screen or not
     */
    isIn?: boolean;
}
export declare function ProgressBar({ delay, isRunning, closeToast, type, hide, className, style: userStyle, controlledProgress, progress, rtl, isIn, theme }: ProgressBarProps): React.JSX.Element;
