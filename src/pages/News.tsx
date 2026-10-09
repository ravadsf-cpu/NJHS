import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sortedAlerts, resolveActionHref, type AlertItem } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import Countdown from "../components/Countdown";
import ShirtVote from "../components/ShirtVote";

const KEY = "njhs.alerts-dismissed.v1";

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

const typeMeta: Record<AlertItem["type"], { icon: string; variant: "coral" | "gold" | "mint"; label: string }> = {
  deadline:     { icon: "🚨", variant: "coral", label: "Deadline" },
  announcement: { icon: "📣", variant: "gold",  label: "Announcement" },
  goodnews:     { icon: "🎉", variant: "mint",  label: "Good news" },
};

export default function News() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDismissed(loadDismissed());
    setMounted(true);
  }, []);

  const list = sortedAlerts(dismissed);

  const dismiss = (id: string) => {
    const next = [...dismissed, id];
    setDismissed(next);
    saveDismissed(next);
  };

  const resetAll = () => {
    setDismissed([]);
    saveDismissed([]);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 pb-10">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl text-ink">News & alerts</h1>
          <p className="font-hand text-xl text-ink/80 mt-1">Most urgent at the top.</p>
        </div>
        {mounted && dismissed.length > 0 && (
          <button type="button" onClick={resetAll} className="btn-doodle press">
            Show hidden alerts
          </button>
        )}
      </div>

      <section id="shirts" className="mt-6">
        <DoodleWindow variant="cream" addressText="pinned/shirt-vote">
          <div className="flex items-start gap-2 flex-wrap">
            <span className="font-hand text-xs uppercase tracking-wider bg-paper ink-line rounded-md px-2 py-0.5">
              Pinned
            </span>
            <h2 className="font-display text-2xl text-ink">Vote on shirt colors!</h2>
          </div>
          <p className="font-body text-ink/80 mt-1">
            Tap your favorite. We settle it at the meeting.
          </p>
          <div className="mt-3">
            <ShirtVote />
          </div>
        </DoodleWindow>
      </section>

      <div className="mt-6 space-y-5">
        {list.length === 0 && (
          <DoodleWindow variant="cream">
            <p className="font-hand text-ink/70">You're caught up. No alerts right now.</p>
          </DoodleWindow>
        )}
        {list.map((a) => {
          const meta = typeMeta[a.type];
          return (
            <DoodleWindow key={a.id} variant={meta.variant} addressText={`alerts/${a.id}`}>
              <div className="flex items-start gap-3">
                <div aria-hidden className="text-2xl leading-none mt-1">{meta.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-hand text-xs uppercase tracking-wider bg-paper ink-line rounded-md px-2 py-0.5">
                      {meta.label}
                    </span>
                    {a.urgent && (
                      <span className="font-hand text-xs uppercase tracking-wider bg-coral ink-line rounded-md px-2 py-0.5 animate-wobble inline-block">
                        Urgent
                      </span>
                    )}
                    <span className="font-body text-xs text-ink/70 ml-auto">
                      Posted {a.posted}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl text-ink mt-2 leading-tight">{a.title}</h2>
                  <p className="font-body text-ink mt-1 leading-snug">{a.message}</p>
                  {a.dueDate && (
                    <div className="mt-2">
                      <Countdown date={a.dueDate} label="Due in" />
                    </div>
                  )}
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {a.actions && a.actions.map((act) => <ActionLink key={act.href} action={act} />)}
                    <button
                      type="button"
                      onClick={() => dismiss(a.id)}
                      className="btn-doodle press"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            </DoodleWindow>
          );
        })}
      </div>
    </div>
  );
}

type Action = { label: string; kind: "internal" | "external" | "route"; href: string };

function ActionLink({ action }: { action: Action }) {
  const href = resolveActionHref(action.href);
  if (action.kind === "route") {
    return <Link to={href} className="btn-doodle btn-mint press">{action.label}</Link>;
  }
  if (action.kind === "internal") {
    return <a href={href} className="btn-doodle btn-gold press">{action.label}</a>;
  }
  return <a href={href} target="_blank" rel="noreferrer" className="btn-doodle btn-coral press">{action.label} →</a>;
}
