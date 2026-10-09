import { useEffect, useState } from "react";
import { sortedAlerts } from "../data/site";

const KEY = "njhs.banner-dismissed.v1";

function loadDismissed(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function saveDismissed(list: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* ignore */ }
}

export default function AlertBanner() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDismissed(loadDismissed());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const list = sortedAlerts(dismissed);
  const top = list.find((a) => a.urgent) || list[0];
  if (!top) return null;

  const dismiss = () => {
    const next = [...dismissed, top.id];
    setDismissed(next);
    saveDismissed(next);
  };

  const bg = top.type === "deadline" ? "bg-coral" : top.type === "goodnews" ? "bg-mint" : "bg-gold";
  const icon = top.type === "deadline" ? "🚨" : top.type === "goodnews" ? "🎉" : "📣";

  return (
    <div className={`${bg} border-b-[2.5px] border-ink`}>
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3">
        <span aria-hidden className="text-xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <span className="font-hand text-lg text-ink">{top.title}.</span>{" "}
          <span className="font-body text-sm text-ink/80">{top.message}</span>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss banner"
          className="press shrink-0 bg-paper ink-line rounded-md px-2 py-1 font-hand text-sm doodle-shadow-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
