import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const styleElementMap = new Map<Document, HTMLStyleElement>();

export const useStyleSheet = (css: string, nonce?: string, append = false): void => {
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
    // Prepend by default so the consumer's stylesheets come later in the cascade and can
    // override the :root variables without !important (same as the pre-11.1 shim).
    if (append) {
      doc.head.appendChild(style);
    } else {
      doc.head.prepend(style);
    }

    styleElementMap.set(doc, style);
  }, [nonce]);
};
