import { useRef } from 'react';

/**
 * `useKeeper` is a helper around `useRef`.
 *
 * You don't need to access the `.current`property to get the value
 */
export function useKeeper<T>(arg: T) {
  const ref = useRef<T>(arg);
  return ref.current;
}
