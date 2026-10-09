import { useState } from "react";
import { site, parseDate, type MeetingSlot } from "../data/site";
import DoodleWindow from "./DoodleWindow";
import { clsx } from "../lib/clsx";

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
  // Desktop defaults to list, mobile defaults to agenda (visually identical to list but with month headers).
  const [view, setView] = useState<"list" | "calendar">("list");
  const now = new Date();
  const annotated = site.meetingSchedule.map((m) => ({ ...m, status: statusOf(m, now) }));

  return (
    <section>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {(["done", "upcoming", "meeting", "break"] as Status[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 font-hand text-xs md:text-sm text-ink/80">
              <span className={clsx("inline-block w-3 h-3 rounded-full ink-line", statusMeta[s].color)} />
              {statusMeta[s].label}
            </span>
          ))}
        </div>
        <div className="hidden md:inline-flex gap-1 bg-paper ink-line rounded-full doodle-shadow-sm p-1">
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={clsx("press font-hand text-sm px-3 py-1 rounded-full", view === "list" && "bg-gold")}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => setView("calendar")}
            aria-pressed={view === "calendar"}
            className={clsx("press font-hand text-sm px-3 py-1 rounded-full", view === "calendar" && "bg-gold")}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* MOBILE: agenda grouped by month */}
      <div className="md:hidden">
        <Agenda items={annotated} />
      </div>

      {/* DESKTOP: whatever view is toggled */}
      <div className="hidden md:block">
        {view === "list" ? <ListView items={annotated} /> : <CalendarGrid items={annotated} />}
      </div>
    </section>
  );
}

function Agenda({ items }: { items: (MeetingSlot & { status: Status })[] }) {
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
    <div>
      {months.map((key) => {
        const [y, m] = key.split("-").map(Number);
        const monthLabel = new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
        const monthItems = byMonth.get(key) || [];
        return (
          <div key={key} className="mb-5">
            <div className="sticky top-[52px] z-20 -mx-4 px-4 py-2 bg-sky-doodle/95 backdrop-blur-sm border-b border-ink/20">
              <h3 className="font-display text-xl text-ink">{monthLabel}</h3>
            </div>
            <ul className="mt-3 space-y-2">
              {monthItems.map((m) => <AgendaRow key={m.date + m.title} m={m} />)}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function AgendaRow({ m }: { m: MeetingSlot & { status: Status } }) {
  const [open, setOpen] = useState(false);
  const d = parseDate(m.date);
  const day = d ? d.getDate() : "";
  const monthShort = d ? d.toLocaleDateString(undefined, { month: "short" }).toUpperCase() : "";
  const full = "displayDate" in m && m.displayDate ? m.displayDate :
    (d ? d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "");

  return (
    <li className="bg-paper ink-line rounded-xl doodle-shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="press w-full flex items-start gap-3 p-3 text-left"
      >
        <div className={clsx("w-14 shrink-0 text-center ink-line rounded-lg px-2 py-1", statusMeta[m.status].color)}>
          <div className="font-hand text-ink/70 text-[10px] uppercase tracking-wide">{monthShort}</div>
          <div className="font-display text-xl text-ink leading-none">{day}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-base text-ink leading-tight">{m.title}</div>
          <div className="font-body text-xs text-ink/70 truncate">{full}</div>
        </div>
        <span aria-hidden className={clsx("inline-flex items-center justify-center w-7 h-7 bg-paper ink-line rounded-full font-hand text-base transition-transform", open && "rotate-180")}>⌃</span>
      </button>
      {open && (
        <div className="px-3 pb-3">
          <div className="font-body text-ink text-sm">{full}</div>
          {m.bring && <div className="font-body text-ink text-sm mt-1">Bring: {m.bring}</div>}
          {d && m.kind !== "break" && (
            <div className="mt-2">
              <AddToCalendarButton title={m.title} date={m.date} />
            </div>
          )}
        </div>
      )}
    </li>
  );
}

function AddToCalendarButton({ title, date }: { title: string; date: string }) {
  const onClick = () => {
    const d = parseDate(date);
    if (!d) return;
    d.setHours(16, 0, 0, 0);
    const end = new Date(d);
    end.setHours(17, 0, 0, 0);
    const fmt = (x: Date) =>
      `${x.getUTCFullYear()}${String(x.getUTCMonth() + 1).padStart(2, "0")}${String(x.getUTCDate()).padStart(2, "0")}T${String(x.getUTCHours()).padStart(2, "0")}${String(x.getUTCMinutes()).padStart(2, "0")}00Z`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Lanier NJHS//Events//EN",
      "BEGIN:VEVENT",
      `UID:${date}-${title}@lanier-njhs`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(d)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${title}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${date}-${title.toLowerCase().replace(/\s+/g, "-")}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return <button type="button" onClick={onClick} className="btn-doodle press">Add to calendar</button>;
}

function ListView({ items }: { items: (MeetingSlot & { status: Status })[] }) {
  return (
    <div className="grid gap-3">
      {items.map((m) => {
        const d = parseDate(m.date);
        const monthShort = d ? d.toLocaleDateString(undefined, { month: "short" }).toUpperCase() : "";
        const day = d ? d.getDate() : "";
        const full = "displayDate" in m && m.displayDate ? m.displayDate :
          (d ? d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "");
        return (
          <DoodleWindow key={m.date + m.title} variant="white" addressText={m.date}>
            <div className="flex items-start gap-3">
              <div className={clsx("w-16 shrink-0 text-center ink-line rounded-lg px-2 py-1", statusMeta[m.status].color)}>
                <div className="font-hand text-ink/70 text-xs uppercase tracking-wide">{monthShort}</div>
                <div className="font-display text-2xl text-ink leading-none">{day}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl text-ink leading-tight">{m.title}</div>
                <div className="font-body text-ink/80 text-sm">{full}</div>
                {m.bring && <div className="font-body text-ink/80 text-sm mt-1">Bring: {m.bring}</div>}
              </div>
            </div>
          </DoodleWindow>
        );
      })}
    </div>
  );
}

function CalendarGrid({ items }: { items: (MeetingSlot & { status: Status })[] }) {
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
              {monthItems.map((it) => {
                const d = parseDate(it.date);
                const sh = d ? d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "";
                return (
                  <li key={it.date + it.title} className="flex items-center gap-2">
                    <span className={clsx("inline-block w-3 h-3 rounded-full ink-line shrink-0", statusMeta[it.status].color)} />
                    <span className="font-body text-ink">
                      <span className="font-hand text-ink/80">
                        {"displayDate" in it && it.displayDate ? it.displayDate : `${sh}:`}
                      </span>{" "}
                      {it.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </DoodleWindow>
        );
      })}
    </div>
  );
}
