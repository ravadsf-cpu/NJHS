import { useEffect, useRef } from "react";

type Photo = { src: string; alt: string };

type Props = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ photos, index, onClose, onPrev, onNext }: Props) {
  const touchStart = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  const photo = photos[index];
  if (!photo) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStart.current === null || touchEndX.current === null) return;
    const dx = touchEndX.current - touchStart.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) onNext();
      else onPrev();
    }
    touchStart.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[1100] bg-ink/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex items-center justify-center">
          <img
            src={photo.src}
            alt={photo.alt}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="max-h-[80vh] w-auto rounded-xl border-[3px] border-paper doodle-shadow-lg bg-paper"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <button type="button" onClick={onPrev} className="btn-doodle press">← Prev</button>
          <div className="font-hand text-paper text-base">{index + 1} / {photos.length}</div>
          <button type="button" onClick={onNext} className="btn-doodle press">Next →</button>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 bg-paper ink-line-thick rounded-full w-10 h-10 font-hand text-xl press"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
