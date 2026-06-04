import { useEffect } from "react";

/**
 * Binds keyboard handlers to a lightbox.
 * - Escape  -> onClose
 * - ArrowRight -> onNext
 * - ArrowLeft  -> onPrev
 * Active only when `enabled` is true.
 */
export default function useLightboxKeys({ enabled, onClose, onNext, onPrev }) {
  useEffect(() => {
    if (!enabled) return undefined;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enabled, onClose, onNext, onPrev]);
}
