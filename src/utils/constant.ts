export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export type TypeOptions =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'dark'
  | 'default';

export const POSITION: { [key: string]: ToastPosition } = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center'
};

export const TYPE: { [key: string]: TypeOptions } = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DEFAULT: 'default',
  DARK: 'dark'
};

export const enum DEFAULT {
  COLLAPSE_DURATION = 300,
  CSS_NAMESPACE = 'Toastify'
}
