import { useEffect, useLayoutEffect } from 'react';
export var useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
//# sourceMappingURL=useIsomorphicLayoutEffect.js.map
