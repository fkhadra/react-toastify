import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const styleElementMap = new Map<Document, HTMLStyleElement>();

export const useStyleSheet = (css: string, nonce?: string): void => {
  useIsomorphicLayoutEffect(() => {
    if (!css || typeof document === 'undefined') return;

    const doc = document;
    const existing = styleElementMap.get(doc);
    if (existing) {
      if (nonce) existing.setAttribute('nonce', nonce);
      return;
    }

    const style = doc.createElement('style');
    style.textContent = css;
    if (nonce) style.setAttribute('nonce', nonce);
    doc.head.appendChild(style);
    styleElementMap.set(doc, style);
  }, [nonce]);
};
