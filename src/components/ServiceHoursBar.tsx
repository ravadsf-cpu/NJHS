import { useEffect, useRef, useState } from "react";
import { site, isPlaceholder } from "../data/site";

export default function ServiceHoursBar() {
  const goal = site.serviceHours.goal;
  const placeholder = site.serviceHours.currentPlaceholder;
  const hasPlaceholder = isPlaceholder(placeholder);
  const current = site.serviceHours.current;
  const pct = Math.max(0, Math.min(100, Math.round((current / goal) * 100)));
  const [animatedPct, setAnimatedPct] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shown) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setAnimatedPct(pct);
      return;
    }
    let start: number | null = null;
    const duration = 1200;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedPct(pct * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shown, pct]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end justify-between flex-wrap gap-x-3 gap-y-1 mb-2">
        <div className="font-hand text-xl sm:text-2xl text-ink">
          Chapter service hours
        </div>
        <div className="font-hand text-ink/80 text-base sm:text-lg">
          {hasPlaceholder ? (
            <span className="px-2 border-[2px] border-dashed border-ink/50 rounded-md bg-white/60 text-ink/70">
              {placeholder}
            </span>
          ) : (
            <span>{current.toLocaleString()}</span>
          )}
          <span className="text-ink/60"> / {goal.toLocaleString()}</span>
        </div>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={current}
        aria-label="Chapter service hours progress"
        className="relative h-7 w-full rounded-full ink-line-thick bg-paper overflow-hidden doodle-shadow-sm"
      >
        <div
          className="h-full bg-gold"
          style={{
            width: `${animatedPct}%`,
            transition: "width 60ms linear",
            borderRight: animatedPct > 0 && animatedPct < 100 ? "2.5px solid #2B2B2B" : "none",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-hand text-ink text-sm sm:text-base pointer-events-none">
          {pct}% to goal
        </div>
      </div>
    </div>
  );
}
