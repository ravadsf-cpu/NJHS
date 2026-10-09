import { useEffect, useState } from "react";
import { isPlaceholder, parseDate } from "../data/site";

type Props = {
  date: string | undefined | null;
  label?: string;
  compact?: boolean;
};

function diffParts(target: Date, now: Date) {
  const ms = target.getTime() - now.getTime();
  const past = ms < 0;
  const absMs = Math.abs(ms);
  const days = Math.floor(absMs / 86_400_000);
  const hours = Math.floor((absMs / 3_600_000) % 24);
  const mins = Math.floor((absMs / 60_000) % 60);
  const secs = Math.floor((absMs / 1000) % 60);
  return { past, days, hours, mins, secs };
}

export default function Countdown({ date, label, compact }: Props) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!date || isPlaceholder(date)) {
    return (
      <div className="font-hand text-ink/70 text-base">
        {label && <span className="mr-1">{label}:</span>}
        <span className="italic">Date not set</span>
      </div>
    );
  }
  const target = parseDate(date);
  if (!target) {
    return (
      <div className="font-hand text-ink/70 text-base">
        {label && <span className="mr-1">{label}:</span>}
        <span className="italic">Date not set</span>
      </div>
    );
  }

  const { past, days, hours, mins, secs } = diffParts(target, now);

  if (compact) {
    return (
      <span className="font-hand text-ink text-base">
        {past ? "Passed " : ""}
        {days > 0 ? `${days}d ` : ""}
        {hours}h {mins}m {secs}s
        {past ? " ago" : ""}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 font-hand">
      {label && <span className="text-ink/80 text-base mr-1">{label}:</span>}
      <Unit n={days} u="days" />
      <Unit n={hours} u="hrs" />
      <Unit n={mins} u="min" />
      <Unit n={secs} u="sec" />
      {past && <span className="text-coral text-base">(passed)</span>}
    </div>
  );
}

function Unit({ n, u }: { n: number; u: string }) {
  return (
    <span className="inline-flex flex-col items-center bg-paper border-[2px] border-ink rounded-md px-2 py-0.5 min-w-[44px] doodle-shadow-sm">
      <span className="text-xl leading-none">{n}</span>
      <span className="text-[10px] uppercase tracking-wide text-ink/70">{u}</span>
    </span>
  );
}
