import { useRef } from 'react';

/**
 * Helper around useRef. Tired to access .current
 * Also this help differentiate dom ref vs instance variable
 */
export function useKeeper<T>(arg: T) {
  const ref = useRef<T>(arg);
  return ref.current;
}
