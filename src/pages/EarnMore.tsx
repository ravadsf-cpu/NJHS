import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AREAS,
  CATEGORIES,
  DAYS,
  databases,
  opportunities,
  type AreaId,
  type CategoryId,
  type DayId,
  type Opportunity,
} from "../data/opportunities";
import DoodleWindow from "../components/DoodleWindow";
import Countdown from "../components/Countdown";

type Type = "ongoing" | "event" | "both";

type Filters = {
  ageBand: "11-12" | "13" | "14" | "15+" | "";
  parentCanCome: "yes" | "no" | "";
  categories: CategoryId[];
  day: DayId | "";
  going: "solo" | "group" | "";
  type: Type;
  area: AreaId | "";
  q: string;
};

const defaultFilters: Filters = {
  ageBand: "",
  parentCanCome: "",
  categories: [],
  day: "",
  going: "",
  type: "both",
  area: "",
  q: "",
};

const AGE_BANDS = [
  { id: "11-12" as const, label: "11 to 12", minAge: 11 },
  { id: "13"    as const, label: "13",       minAge: 13 },
  { id: "14"    as const, label: "14",       minAge: 14 },
  { id: "15+"   as const, label: "15 and up", minAge: 15 },
];

function stillOpen(o: Opportunity, now: Date): boolean {
  if (o.type !== "event") return true;
  if (!o.dates || o.dates.length === 0) return true;
  return o.dates.some((d) => {
    const date = new Date(d);
    date.setHours(23, 59, 59, 999);
    return date.getTime() >= now.getTime();
  });
}

function matches(o: Opportunity, f: Filters, now: Date): boolean {
  if (!stillOpen(o, now)) return false;

  if (f.type !== "both" && o.type !== f.type) return false;
  if (f.area && o.area !== f.area) return false;

  if (f.ageBand) {
    const band = AGE_BANDS.find((b) => b.id === f.ageBand);
    if (band && band.minAge < o.minAge) return false;
    if (band && f.parentCanCome === "no" && band.minAge < o.parentRequiredUnder) return false;
  }
  if (f.categories.length > 0) {
    const anyMatch = f.categories.some((c) => o.categories.includes(c));
    if (!anyMatch) return false;
  }
  if (f.day && f.day !== "any") {
    if (!o.days.includes(f.day) && !o.days.includes("any")) return false;
  }
  if (f.going === "group" && !o.groupFriendly) return false;

  if (f.q.trim()) {
    const q = f.q.trim().toLowerCase();
    const haystack = `${o.name} ${o.org} ${o.description} ${o.location}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function readFromUrl(sp: URLSearchParams): Filters {
  const ab = sp.get("age") || "";
  const pc = sp.get("parent") || "";
  const cats = (sp.get("cats") || "").split(",").filter(Boolean) as CategoryId[];
  const day = (sp.get("day") || "") as DayId | "";
  const going = sp.get("with") || "";
  const type = (sp.get("type") || "both") as Type;
  const area = (sp.get("area") || "") as AreaId | "";
  const q = sp.get("q") || "";
  return {
    ageBand: (["11-12", "13", "14", "15+"].includes(ab) ? ab : "") as Filters["ageBand"],
    parentCanCome: (["yes", "no"].includes(pc) ? pc : "") as Filters["parentCanCome"],
    categories: cats.filter((c) => CATEGORIES.some((cc) => cc.id === c)),
    day: (DAYS.some((d) => d.id === day) ? day : "") as Filters["day"],
    going: (["solo", "group"].includes(going) ? going : "") as Filters["going"],
    type: (["ongoing", "event", "both"].includes(type) ? type : "both") as Type,
    area: (AREAS.some((a) => a.id === area) ? area : "") as Filters["area"],
    q,
  };
}

function writeToUrl(f: Filters): string {
  const sp = new URLSearchParams();
  if (f.ageBand) sp.set("age", f.ageBand);
  if (f.parentCanCome) sp.set("parent", f.parentCanCome);
  if (f.categories.length) sp.set("cats", f.categories.join(","));
  if (f.day) sp.set("day", f.day);
  if (f.going) sp.set("with", f.going);
  if (f.type !== "both") sp.set("type", f.type);
  if (f.area) sp.set("area", f.area);
  if (f.q.trim()) sp.set("q", f.q.trim());
  const s = sp.toString();
  return s ? `?${s}` : "";
}

type View = "cards" | "calendar" | "area";

export default function EarnMore() {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = useMemo(() => readFromUrl(new URLSearchParams(location.search)), [location.search]);
  const [filters, setFilters] = useState<Filters>(initial);
  const [view, setView] = useState<View>("cards");
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    const search = writeToUrl(filters);
    const target = `${location.pathname}${search}${location.hash}`;
    if (`${location.pathname}${location.search}${location.hash}` !== target) {
      navigate(target, { replace: true });
    }
  }, [filters, location.pathname, location.search, location.hash, navigate]);

  const matched = useMemo(() => opportunities.filter((o) => matches(o, filters, now)), [filters, now]);
  const reset = () => setFilters(defaultFilters);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Earn more hours</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">
        Tons of places around Houston take middle schoolers. Pick what you like, and we'll show you where to sign up.
      </p>

      <section className="mt-6">
        <DoodleWindow variant="cream" addressText="filters">
          <h2 className="font-display text-2xl text-ink">Filters</h2>

          <div className="mt-3 grid gap-4">
            <Row label="Search">
              <input
                type="search"
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                placeholder="Try an org name or keyword"
                aria-label="Search opportunities"
                className="w-full bg-paper ink-line rounded-lg px-3 py-2 font-body text-ink text-base doodle-shadow-sm focus:outline-none focus:ring-4 focus:ring-gold/40"
              />
            </Row>
            <Row label="Your age">
              <ChipGroup
                options={AGE_BANDS.map((b) => ({ id: b.id, label: b.label }))}
                value={filters.ageBand}
                onChange={(v) => setFilters({ ...filters, ageBand: v as Filters["ageBand"] })}
              />
            </Row>
            <Row label="Can a parent or guardian come?">
              <ChipGroup
                options={[{ id: "yes", label: "Yes" }, { id: "no", label: "No" }]}
                value={filters.parentCanCome}
                onChange={(v) => setFilters({ ...filters, parentCanCome: v as Filters["parentCanCome"] })}
              />
            </Row>
            <Row label="Interests. Pick any.">
              <ChipGroupMulti
                options={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
                values={filters.categories}
                onChange={(v) => setFilters({ ...filters, categories: v as CategoryId[] })}
              />
            </Row>
            <Row label="When can you go?">
              <ChipGroup
                options={DAYS.map((d) => ({ id: d.id, label: d.label }))}
                value={filters.day}
                onChange={(v) => setFilters({ ...filters, day: v as Filters["day"] })}
              />
            </Row>
            <Row label="Going with">
              <ChipGroup
                options={[{ id: "solo", label: "Just me" }, { id: "group", label: "A group of 5+" }]}
                value={filters.going}
                onChange={(v) => setFilters({ ...filters, going: v as Filters["going"] })}
              />
            </Row>
            <Row label="Type">
              <ChipGroup
                options={[
                  { id: "ongoing", label: "Ongoing. Go any time." },
                  { id: "event", label: "Dated events" },
                  { id: "both", label: "Both" },
                ]}
                value={filters.type}
                onChange={(v) => setFilters({ ...filters, type: v as Type })}
              />
            </Row>
            <Row label="Area of Houston">
              <ChipGroup
                options={AREAS.map((a) => ({ id: a.id, label: a.label }))}
                value={filters.area}
                onChange={(v) => setFilters({ ...filters, area: v as Filters["area"] })}
              />
            </Row>
            <div>
              <button type="button" onClick={reset} className="btn-doodle press">Clear filters</button>
            </div>
          </div>
        </DoodleWindow>
      </section>

      <section className="mt-6 flex items-end justify-between gap-3 flex-wrap">
        <h3 className="font-display text-2xl text-ink">
          {matched.length === 0 ? "No matches yet" : `${matched.length} match${matched.length === 1 ? "" : "es"}`}
        </h3>
        <div className="inline-flex gap-1 bg-paper ink-line rounded-full doodle-shadow-sm p-1">
          <TabButton active={view === "cards"} onClick={() => setView("cards")}>Cards</TabButton>
          <TabButton active={view === "calendar"} onClick={() => setView("calendar")}>Calendar</TabButton>
          <TabButton active={view === "area"} onClick={() => setView("area")}>By area</TabButton>
        </div>
      </section>

      <section className="mt-4">
        {view === "cards" && <CardsView results={matched} />}
        {view === "calendar" && <CalendarView results={matched} />}
        {view === "area" && <AreaView results={matched} />}
      </section>

      <section className="mt-10">
        <DoodleWindow variant="mint" addressText="want-even-more">
          <h2 className="font-display text-3xl text-ink">Want even more?</h2>
          <p className="font-body text-ink/80 mt-1">
            These sites list everything in Houston. Double-check the age rules before you sign up.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {databases.map((d) => (
              <li key={d.url}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="press block bg-paper ink-line-thick rounded-xl p-3 doodle-shadow-sm hover:bg-cream"
                >
                  <div className="font-display text-xl text-ink leading-tight">{d.name} →</div>
                  <div className="font-body text-ink/80 text-sm mt-0.5">{d.blurb}</div>
                </a>
              </li>
            ))}
          </ul>
        </DoodleWindow>
      </section>

      <p className="font-body text-ink/70 text-xs mt-4">
        Not sure something counts? Ask an officer or Ms. Cantu.
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-hand text-ink/80 text-base mb-1">{label}</div>
      {children}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`press font-hand text-sm px-3 py-1 rounded-full ${active ? "bg-gold" : ""}`}
    >
      {children}
    </button>
  );
}

function ChipGroup({ options, value, onChange }: { options: { id: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(value === o.id ? "" : o.id)}
          aria-pressed={value === o.id}
          className={`press font-hand text-sm px-2.5 py-1 ink-line rounded-full doodle-shadow-sm ${value === o.id ? "bg-gold" : "bg-paper"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ChipGroupMulti({ options, values, onChange }: { options: { id: string; label: string }[]; values: string[]; onChange: (v: string[]) => void }) {
  const toggle = (id: string) => {
    if (values.includes(id)) onChange(values.filter((v) => v !== id));
    else onChange([...values, id]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = values.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => toggle(o.id)}
            aria-pressed={on}
            className={`press font-hand text-sm px-2.5 py-1 ink-line rounded-full doodle-shadow-sm ${on ? "bg-mint" : "bg-paper"}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function CardsView({ results }: { results: Opportunity[] }) {
  if (results.length === 0) return <EmptyState />;
  return (
    <div className="grid gap-4">
      {results.map((o) => <OpportunityCard key={o.id} o={o} />)}
    </div>
  );
}

function AreaView({ results }: { results: Opportunity[] }) {
  if (results.length === 0) return <EmptyState />;
  const byArea = new Map<AreaId, Opportunity[]>();
  for (const o of results) {
    const list = byArea.get(o.area) || [];
    list.push(o);
    byArea.set(o.area, list);
  }
  return (
    <div className="grid gap-5">
      {AREAS.filter((a) => byArea.has(a.id)).map((a) => (
        <div key={a.id}>
          <h4 className="font-display text-2xl text-ink mb-2">{a.label}</h4>
          <div className="grid gap-4">
            {(byArea.get(a.id) || []).map((o) => <OpportunityCard key={o.id} o={o} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function CalendarView({ results }: { results: Opportunity[] }) {
  const events = results.filter((o) => o.type === "event" && o.dates && o.dates.length);
  if (events.length === 0) {
    return (
      <DoodleWindow variant="cream">
        <p className="font-hand text-ink text-lg">
          No dated events match these filters. Try the Cards view, or change the Type filter.
        </p>
      </DoodleWindow>
    );
  }
  // Group by month.
  const byMonth = new Map<string, Array<{ date: string; o: Opportunity }>>();
  for (const o of events) {
    for (const d of o.dates!) {
      const dt = new Date(d);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
      const arr = byMonth.get(key) || [];
      arr.push({ date: d, o });
      byMonth.set(key, arr);
    }
  }
  const months = Array.from(byMonth.keys()).sort();

  return (
    <div className="grid gap-5">
      {months.map((key) => {
        const [y, m] = key.split("-").map(Number);
        const label = new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
        const items = (byMonth.get(key) || []).sort((a, b) => a.date.localeCompare(b.date));
        return (
          <DoodleWindow key={key} variant="gold" addressText={key}>
            <h4 className="font-display text-2xl text-ink mb-3">{label}</h4>
            <ul className="space-y-3">
              {items.map((it) => {
                const dateObj = new Date(it.date);
                const display = dateObj.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
                return (
                  <li key={`${it.o.id}-${it.date}`} className="bg-paper ink-line rounded-xl p-3">
                    <div className="font-hand text-ink/80 text-sm">{display}</div>
                    <div className="font-display text-xl text-ink leading-tight">{it.o.name}</div>
                    <div className="font-body text-ink/80 text-sm mt-1">{it.o.description}</div>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      {it.o.signupUrl && it.o.signupUrl.startsWith("http") && (
                        <a href={it.o.signupUrl} target="_blank" rel="noreferrer" className="btn-doodle btn-gold press">Sign up →</a>
                      )}
                      <AddToCalendar o={it.o} date={it.date} />
                      <Countdown date={it.date} label="In" compact />
                    </div>
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

function EmptyState() {
  return (
    <DoodleWindow variant="mint" addressText="empty">
      <p className="font-hand text-ink text-lg">
        Nothing matches. Try a different filter, or ask Ms. Cantu!
      </p>
    </DoodleWindow>
  );
}

function OpportunityCard({ o }: { o: Opportunity }) {
  const variant: "cream" | "gold" | "coral" | "mint" = o.categories.includes("food")
    ? "coral"
    : o.categories.includes("environment") || o.categories.includes("animals")
    ? "mint"
    : o.categories.includes("kids") || o.categories.includes("seniors") || o.categories.includes("health")
    ? "gold"
    : "cream";

  const sign = o.signupUrl;
  const signIsHttp = sign.startsWith("http");
  const signIsMail = sign.startsWith("mailto:");

  const upcoming = (o.dates || []).filter((d) => {
    const dt = new Date(d);
    dt.setHours(23, 59, 59, 999);
    return dt.getTime() >= Date.now();
  });

  return (
    <DoodleWindow variant={variant} addressText={o.id}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-hand text-xs uppercase tracking-wider bg-paper ink-line rounded-md px-2 py-0.5">{o.org}</span>
            {o.countsForHours && (
              <span className="font-hand text-xs uppercase tracking-wider bg-mint ink-line rounded-md px-2 py-0.5">
                Counts toward NJHS hours
              </span>
            )}
            {o.type === "event" && (
              <span className="font-hand text-xs uppercase tracking-wider bg-gold ink-line rounded-md px-2 py-0.5">
                Dated event
              </span>
            )}
          </div>
          <h4 className="font-display text-2xl text-ink leading-tight">{o.name}</h4>
          <p className="font-body text-ink mt-1">{o.description}</p>
          <div className="font-body text-ink/80 text-sm mt-2">📍 {o.location}</div>
          <div className="font-body text-ink/80 text-sm mt-1">
            👤 Ages {o.minAge} and up. {o.ageNote}
          </div>
          {upcoming.length > 0 && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {upcoming.map((d) => {
                const dt = new Date(d);
                return (
                  <span key={d} className="inline-flex items-center gap-2 bg-paper ink-line rounded-md px-2 py-0.5 font-hand text-sm">
                    <span>{dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
                    <Countdown date={d} compact />
                  </span>
                );
              })}
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {sign ? (
              signIsHttp ? (
                <a href={sign} target="_blank" rel="noreferrer" className="btn-doodle btn-gold press">Sign up →</a>
              ) : signIsMail ? (
                <a href={sign} className="btn-doodle btn-gold press">Email to sign up →</a>
              ) : (
                <span className="font-hand text-ink text-sm">{sign}</span>
              )
            ) : (
              <span className="font-hand text-ink/70 text-sm">No sign-up needed. Just show up.</span>
            )}
            {o.signupExtra?.map((x) => (
              <a key={x.url} href={x.url} target="_blank" rel="noreferrer" className="btn-doodle press">{x.label} →</a>
            ))}
            {o.type === "event" && upcoming[0] && <AddToCalendar o={o} date={upcoming[0]} />}
          </div>
          <p className="font-body text-ink/70 text-xs mt-2">
            Check their page for the latest times before you go.
          </p>
        </div>
      </div>
    </DoodleWindow>
  );
}

function AddToCalendar({ o, date }: { o: Opportunity; date: string }) {
  const onClick = () => {
    const start = new Date(date);
    start.setHours(9, 0, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 2);
    const fmt = (d: Date) =>
      `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}T${String(d.getUTCHours()).padStart(2, "0")}${String(d.getUTCMinutes()).padStart(2, "0")}00Z`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Lanier NJHS//Earn More//EN",
      "BEGIN:VEVENT",
      `UID:${o.id}-${date}@lanier-njhs`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${o.name}`,
      `LOCATION:${o.location}`,
      `DESCRIPTION:${o.description.replace(/\n/g, " ")}${o.signupUrl ? ` Sign up: ${o.signupUrl}` : ""}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${o.id}-${date}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <button type="button" onClick={onClick} className="btn-doodle press">
      Add to calendar
    </button>
  );
}
