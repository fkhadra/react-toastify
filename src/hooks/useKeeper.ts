import { useRef, useEffect } from 'react';

/**
 * `useKeeper` is a helper around `useRef`.
 *
 * You don't need to access the `.current`property to get the value
 * If refresh is set to true. The ref will be updated every render
 */
export function useKeeper<T>(arg: T, refresh = false) {
  const ref = useRef<T>(arg);

  useEffect(() => {
    if (refresh) ref.current = arg;
  });

  return ref.current;
}
