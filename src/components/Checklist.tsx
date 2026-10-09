import { useEffect, useState } from "react";
import { site } from "../data/site";

const KEY = "njhs.checklist.v1";

function loadChecks(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveChecks(v: Record<string, boolean>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(v));
  } catch {
    // ignore quota or private-mode errors
  }
}

export default function Checklist() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecks(loadChecks());
    setMounted(true);
  }, []);

  const toggle = (id: string) => {
    const next = { ...checks, [id]: !checks[id] };
    setChecks(next);
    saveChecks(next);
  };

  const total = site.checklist.length;
  const done = site.checklist.filter((i) => checks[i.id]).length;
  const allDone = mounted && done === total;

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-x-3 gap-y-1 mb-3">
        <h3 className="font-display text-2xl sm:text-3xl text-ink leading-none">Did I do everything?</h3>
        <span className="font-hand text-ink/70">{done}/{total}</span>
      </div>
      <ul className="space-y-2">
        {site.checklist.map((item) => {
          const on = !!checks[item.id];
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed={on}
                className="press w-full flex items-center gap-3 text-left bg-paper ink-line rounded-lg px-3 py-2 doodle-shadow-sm"
              >
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-md border-[2px] border-ink ${on ? "bg-mint" : "bg-white"}`}
                  aria-hidden
                >
                  {on && (
                    <svg width="16" height="16" viewBox="0 0 20 20">
                      <path d="M3 11 L8 16 L17 5" fill="none" stroke="#2B2B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span className={`font-body text-base ${on ? "line-through text-ink/60" : "text-ink"}`}>
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {allDone && (
        <div className="mt-3 bg-mint ink-line-thick rounded-xl p-3 font-hand text-ink text-center animate-pop">
          You did it! Nothing hanging over your head. Go eat a snack.
        </div>
      )}
    </div>
  );
}
