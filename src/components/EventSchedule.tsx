import { useState } from "react";
import { site, parseDate, type MeetingSlot } from "../data/site";
import DoodleWindow from "./DoodleWindow";

type Status = "done" | "upcoming" | "meeting" | "break";

function statusOf(slot: MeetingSlot, now: Date): Status {
  const d = parseDate(slot.date);
  if (!d) return slot.kind === "break" ? "break" : "upcoming";
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  if (slot.kind === "break") return "break";
  if (end.getTime() < now.getTime()) return "done";
  if (slot.kind === "meeting") return "meeting";
  return "upcoming";
}

const statusMeta: Record<Status, { color: string; label: string }> = {
  done:     { color: "bg-mint",  label: "Done" },
  upcoming: { color: "bg-coral", label: "Upcoming" },
  meeting:  { color: "bg-[#9ED4FF]", label: "Chapter meeting" },
  break:    { color: "bg-paper", label: "No meeting" },
};

export default function EventSchedule() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const now = new Date();
  const annotated = site.meetingSchedule.map((m) => ({ ...m, status: statusOf(m, now) }));

  return (
    <section>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {(["done", "upcoming", "meeting", "break"] as Status[]).map((s) => (
            <span key={s} className={`inline-flex items-center gap-1.5 font-hand text-sm text-ink/80`}>
              <span className={`inline-block w-3 h-3 rounded-full ink-line ${statusMeta[s].color}`} />
              {statusMeta[s].label}
            </span>
          ))}
        </div>
        <div className="inline-flex gap-1 bg-paper ink-line rounded-full doodle-shadow-sm p-1">
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={`press font-hand text-sm px-3 py-1 rounded-full ${view === "list" ? "bg-gold" : ""}`}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => setView("calendar")}
            aria-pressed={view === "calendar"}
            className={`press font-hand text-sm px-3 py-1 rounded-full ${view === "calendar" ? "bg-gold" : ""}`}
          >
            Calendar
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="grid gap-3">
          {annotated.map((m) => (
            <DoodleWindow key={m.date + m.title} variant="white" addressText={m.date}>
              <div className="flex items-start gap-3">
                <div className={`w-16 shrink-0 text-center ink-line rounded-lg px-2 py-1 ${statusMeta[m.status].color}`}>
                  <div className="font-hand text-ink/70 text-xs uppercase tracking-wide">
                    {friendlyMonth(m.date)}
                  </div>
                  <div className="font-display text-2xl text-ink leading-none">
                    {friendlyDay(m.date)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-xl text-ink leading-tight">{m.title}</div>
                  <div className="font-body text-ink/80 text-sm">
                    {"displayDate" in m && m.displayDate ? m.displayDate : friendlyFull(m.date)}
                  </div>
                  {m.bring && <div className="font-body text-ink/80 text-sm mt-1">Bring: {m.bring}</div>}
                </div>
              </div>
            </DoodleWindow>
          ))}
        </div>
      ) : (
        <CalendarGrid items={annotated} />
      )}
    </section>
  );
}

function CalendarGrid({ items }: { items: (MeetingSlot & { status: Status })[] }) {
  // Group by month, show them left to right.
  const byMonth = new Map<string, (MeetingSlot & { status: Status })[]>();
  for (const it of items) {
    const d = parseDate(it.date);
    if (!d) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const arr = byMonth.get(key) || [];
    arr.push(it);
    byMonth.set(key, arr);
  }
  const months = Array.from(byMonth.keys()).sort();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {months.map((key) => {
        const [y, m] = key.split("-").map(Number);
        const label = new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
        const monthItems = byMonth.get(key) || [];
        return (
          <DoodleWindow key={key} variant="cream" addressText={key}>
            <h4 className="font-display text-xl text-ink mb-2">{label}</h4>
            <ul className="space-y-1">
              {monthItems.map((it) => (
                <li key={it.date + it.title} className="flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full ink-line ${statusMeta[it.status].color} shrink-0`} />
                  <span className="font-body text-ink">
                    <span className="font-hand text-ink/80">
                      {"displayDate" in it && it.displayDate ? it.displayDate : `${friendlyShort(it.date)}:`}
                    </span>{" "}
                    {it.title}
                  </span>
                </li>
              ))}
            </ul>
          </DoodleWindow>
        );
      })}
    </div>
  );
}

function friendlyMonth(iso: string) {
  const d = parseDate(iso);
  if (!d) return "";
  return d.toLocaleDateString(undefined, { month: "short" }).toUpperCase();
}
function friendlyDay(iso: string) {
  const d = parseDate(iso);
  if (!d) return "";
  return String(d.getDate());
}
function friendlyFull(iso: string) {
  const d = parseDate(iso);
  if (!d) return "";
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}
function friendlyShort(iso: string) {
  const d = parseDate(iso);
  if (!d) return "";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
