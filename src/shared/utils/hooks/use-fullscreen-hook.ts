import { useEffect, useState } from 'react';

/**
 * Hook to track whether the document is in fullscreen
 * and which element is fullscreen (if any).
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenElement, setFullscreenElement] = useState<Element | null>(null);

  useEffect(() => {
    const handler = () => {
      const el = document.fullscreenElement;
      setFullscreenElement(el);
      setIsFullscreen(!!el);
    };

    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return { isFullscreen, fullscreenElement };
}
