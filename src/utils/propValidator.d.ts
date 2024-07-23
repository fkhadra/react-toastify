import { Id } from '../types';
export declare const isNum: (v: any) => v is Number;
export declare const isStr: (v: any) => v is String;
export declare const isFn: (v: any) => v is Function;
export declare const isId: (v: unknown) => v is Id;
export declare const parseClassName: (v: any) => any;
export declare const getAutoCloseDelay: (toastAutoClose?: false | number, containerAutoClose?: false | number) => number | false | undefined;
export declare const canBeRendered: <T>(content: T) => boolean;
