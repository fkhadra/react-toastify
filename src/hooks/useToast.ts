import { useState } from 'react';

import { WithInjectedOptions } from '../types';

export function useToast(props: WithInjectedOptions) {
  const [isRunning, setIsRunning] = useState(true);

  function playToast() {
    props.autoClose && setIsRunning(true);
  }

  function pauseToast() {
    props.autoClose && setIsRunning(false);
  }

  return {
    playToast,
    pauseToast,
    isRunning
  };
}
