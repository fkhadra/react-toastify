import React, { useRef } from 'react';
import styles from '../style.css?raw';
import { useStyleSheet } from '../hooks/useStyleSheet';
import { ToastContainer as BaseToastContainer } from './ToastContainer';
import type { ToastContainerProps } from '../types';

export function StyledToastContainer(props: ToastContainerProps) {
  const containerRef = useRef<HTMLElement>(null);
  useStyleSheet(styles, containerRef, props.nonce, props.appendStyleSheet);
  return <BaseToastContainer {...props} ref={containerRef} />;
}
