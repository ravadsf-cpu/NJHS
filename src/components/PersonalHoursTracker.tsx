import { useEffect, useState } from "react";

const KEY = "njhs.myhours.v1";
const GOAL = 20;

function load(): number {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return 0;
    const n = parseFloat(raw);
    return isNaN(n) ? 0 : Math.max(0, n);
  } catch { return 0; }
}

function save(n: number) {
  try { localStorage.setItem(KEY, String(n)); } catch { /* ignore */ }
}

export default function PersonalHoursTracker() {
  const [hours, setHours] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHours(load());
    setMounted(true);
  }, []);

  const pct = Math.min(100, Math.round((hours / GOAL) * 100));
  const done = hours >= GOAL;

  const update = (n: number) => {
    const clamped = Math.max(0, Math.min(999, n));
    setHours(clamped);
    save(clamped);
  };

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-x-3 gap-y-1 mb-2">
        <h3 className="font-display text-2xl sm:text-3xl text-ink leading-none">My hours</h3>
        <span className="font-hand text-ink/70">{mounted ? hours.toFixed(1) : "..."} / {GOAL}</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={GOAL}
        aria-valuenow={hours}
        aria-label="My service hours"
        className="relative h-6 w-full rounded-full ink-line-thick bg-paper overflow-hidden doodle-shadow-sm"
      >
        <div className="h-full bg-mint" style={{ width: `${pct}%`, transition: "width 0.3s ease-out" }} />
        <div className="absolute inset-0 flex items-center justify-center font-hand text-ink text-sm pointer-events-none">
          {pct}%
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <button type="button" onClick={() => update(hours + 0.5)} className="btn-doodle press">+0.5</button>
        <button type="button" onClick={() => update(hours + 1)} className="btn-doodle press">+1</button>
        <button type="button" onClick={() => update(hours - 1)} className="btn-doodle press">−1</button>
        <button type="button" onClick={() => update(0)} className="btn-doodle press">Reset</button>
      </div>
      <p className="font-body text-ink/70 text-xs mt-2">
        Saved on your device only. Nothing gets sent anywhere.
      </p>
      {done && (
        <div className="mt-3 bg-gold ink-line-thick rounded-xl p-3 font-hand text-ink text-center animate-pop">
          You hit 20! Fill in the log and hand it to Ms. Cantu.
        </div>
      )}
    </div>
  );
}
