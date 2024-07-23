import React from 'react';
import { Theme, TypeOptions } from '../types';
export interface CloseButtonProps {
    closeToast: (e: React.MouseEvent<HTMLElement>) => void;
    type: TypeOptions;
    ariaLabel?: string;
    theme: Theme;
}
export declare function CloseButton({ closeToast, theme, ariaLabel }: CloseButtonProps): React.JSX.Element;
