import React, { cloneElement, isValidElement } from 'react';

import { Theme, ToastProps, TypeOptions } from '../types';
import { Default, isFn, isNum, isStr } from '../utils';

/**
 * Used when providing custom icon
 */
export interface IconProps {
  theme: Theme;
  type: TypeOptions;
}

export type BuiltInIconProps = React.SVGProps<SVGSVGElement> & IconProps;

const Svg: React.FC<BuiltInIconProps> = ({ theme, type, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill={
      theme === 'colored'
        ? 'currentColor'
        : `var(--toastify-icon-color-${type})`
    }
    {...rest}
  />
);

function Warning(props: BuiltInIconProps) {
  return (
    <Svg {...props}>
      <path d="M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z" />
    </Svg>
  );
}

function Info(props: BuiltInIconProps) {
  return (
    <Svg {...props}>
      <path d="M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z" />
    </Svg>
  );
}

function Success(props: BuiltInIconProps) {
  return (
    <Svg {...props}>
      <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z" />
    </Svg>
  );
}

function Error(props: BuiltInIconProps) {
  return (
    <Svg {...props}>
      <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" />
    </Svg>
  );
}

function Spinner() {
  return <div className={`${Default.CSS_NAMESPACE}__spinner`} />;
}

export const Icons = {
  info: Info,
  warning: Warning,
  success: Success,
  error: Error,
  spinner: Spinner
};

const maybeIcon = (type: string): type is keyof typeof Icons => type in Icons;

export function getIcon({ theme, type, isLoading, icon }: ToastProps) {
  let Icon: React.ReactNode = null;
  const iconProps = { theme, type };

  if (icon === false) {
    // hide
  } else if (isFn(icon)) {
    Icon = icon(iconProps);
  } else if (isValidElement(icon)) {
    Icon = cloneElement(icon, iconProps);
  } else if (isStr(icon) || isNum(icon)) {
    Icon = icon;
  } else if (isLoading) {
    Icon = Icons.spinner();
  } else if (maybeIcon(type)) {
    Icon = Icons[type](iconProps);
  }

  return Icon;
}
