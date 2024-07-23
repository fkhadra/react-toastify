import React from 'react';
import { Theme, ToastProps, TypeOptions } from '../types';
/**
 * Used when providing custom icon
 */
export interface IconProps {
    theme: Theme;
    type: TypeOptions;
    isLoading?: boolean;
}
export type BuiltInIconProps = React.SVGProps<SVGSVGElement> & IconProps;
declare function Warning(props: BuiltInIconProps): React.JSX.Element;
declare function Info(props: BuiltInIconProps): React.JSX.Element;
declare function Success(props: BuiltInIconProps): React.JSX.Element;
declare function Error(props: BuiltInIconProps): React.JSX.Element;
declare function Spinner(): React.JSX.Element;
export declare const Icons: {
    info: typeof Info;
    warning: typeof Warning;
    success: typeof Success;
    error: typeof Error;
    spinner: typeof Spinner;
};
export type IconParams = Pick<ToastProps, 'theme' | 'icon' | 'type' | 'isLoading'>;
export declare function getIcon({ theme, type, isLoading, icon }: IconParams): React.ReactNode;
export {};
