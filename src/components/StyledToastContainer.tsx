import React from 'react';
import styles from '../style.css?raw';
import { useStyleSheet } from '../hooks/useStyleSheet';
import { ToastContainer as BaseToastContainer } from './ToastContainer';
import type { ToastContainerProps } from '../types';

export function StyledToastContainer(props: ToastContainerProps) {
  useStyleSheet(styles, props.nonce);
  return <BaseToastContainer {...props} />;
}
