import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { clsx } from "../lib/clsx";

// Horizontal scroll-snap row. Shows ~1.2 cards so the next one peeks out.
// Dots underneath track the active child.
//
// Mobile-only visually; on tablet+ the parent switches to a plain grid.

type Variant = "card" | "folder" | "chip";

export default function SwipeRow({
  children,
  variant = "card",
  className,
  dots = true,
  ariaLabel,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  dots?: boolean;
  ariaLabel?: string;
}) {
  const items = Children.toArray(children);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    if (slides.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best = { ratio: 0, index: active };
        entries.forEach((e) => {
          const idx = slides.indexOf(e.target as HTMLElement);
          if (idx >= 0 && e.intersectionRatio > best.ratio) best = { ratio: e.intersectionRatio, index: idx };
        });
        if (best.ratio > 0) setActive(best.index);
      },
      { root: el, threshold: [0.5, 0.75] }
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={className}>
      <div
        ref={scrollerRef}
        role="list"
        aria-label={ariaLabel}
        className={clsx(
          "swipe-row",
          variant === "folder" && "swipe-row-folder",
          variant === "chip" && "swipe-row-chip",
        )}
      >
        {items.map((child, i) => (
          <div role="listitem" key={i}>
            {child}
          </div>
        ))}
      </div>
      {dots && items.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2 md:hidden" aria-hidden>
          {items.map((_, i) => (
            <span
              key={i}
              className={clsx(
                "inline-block w-1.5 h-1.5 rounded-full border border-ink/80 transition-all",
                active === i ? "bg-ink w-3" : "bg-paper"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
