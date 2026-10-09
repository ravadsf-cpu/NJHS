import { useEffect, useRef, useState, type ReactNode } from "react";

// Slide-up modal with doodle styling. Backdrop click or swipe-down to close.
// Locks the page scroll while open. Keyboard: Escape closes.

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
  children: ReactNode;
};

export default function BottomSheet({ open, onClose, title, footer, children }: Props) {
  const touchStartY = useRef<number | null>(null);
  const touchDeltaY = useRef<number>(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (dy > 0) {
      touchDeltaY.current = dy;
      setDragY(dy);
    }
  };
  const onTouchEnd = () => {
    if (touchDeltaY.current > 120) {
      onClose();
    } else {
      setDragY(0);
    }
    touchStartY.current = null;
    touchDeltaY.current = 0;
  };

  return (
    <div className="bottom-sheet-root" role="dialog" aria-modal="true" aria-label={title}>
      <div className="bottom-sheet-backdrop" onClick={onClose} />
      <div
        ref={panelRef}
        className="bottom-sheet-panel"
        style={{ transform: `translateY(${dragY}px)` }}
      >
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="shrink-0 cursor-grab"
        >
          <div className="bottom-sheet-handle" aria-hidden />
          <div className="flex items-center justify-between px-4 pb-2">
            <h2 className="font-display text-2xl text-ink">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="press bg-paper ink-line rounded-full w-9 h-9 font-hand text-lg"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">{children}</div>
        {footer && <div className="shrink-0 border-t-[2px] border-ink/80 bg-cream px-4 py-3">{footer}</div>}
      </div>
    </div>
  );
}
