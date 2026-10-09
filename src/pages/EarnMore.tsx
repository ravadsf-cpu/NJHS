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
import BottomSheet from "../components/BottomSheet";

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

function activeCount(f: Filters): number {
  let n = 0;
  if (f.ageBand) n++;
  if (f.parentCanCome) n++;
  if (f.categories.length) n += f.categories.length;
  if (f.day) n++;
  if (f.going) n++;
  if (f.type !== "both") n++;
  if (f.area) n++;
  if (f.q.trim()) n++;
  return n;
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
const MOBILE_INITIAL = 6;

export default function EarnMore() {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = useMemo(() => readFromUrl(new URLSearchParams(location.search)), [location.search]);
  const [filters, setFilters] = useState<Filters>(initial);
  const [view, setView] = useState<View>("cards");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [shown, setShown] = useState(MOBILE_INITIAL);
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    const search = writeToUrl(filters);
    const target = `${location.pathname}${search}${location.hash}`;
    if (`${location.pathname}${location.search}${location.hash}` !== target) {
      navigate(target, { replace: true });
    }
    setShown(MOBILE_INITIAL); // reset pagination when filters change
  }, [filters, location.pathname, location.search, location.hash, navigate]);

  const matched = useMemo(() => opportunities.filter((o) => matches(o, filters, now)), [filters, now]);
  const nActive = activeCount(filters);
  const reset = () => setFilters(defaultFilters);

  const activeChips = buildActiveChips(filters, (next) => setFilters(next));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-8 pb-10">
      <h1 className="font-display text-ink">Earn more hours</h1>
      <p className="font-hand text-ink/80 mt-1" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
        Tons of places around Houston take middle schoolers. Pick what you like, and we'll show you where to sign up.
      </p>

      {/* MOBILE: sticky search + filter button */}
      <div className="md:hidden sticky top-[52px] z-30 -mx-4 px-4 py-2 bg-sky-doodle/95 backdrop-blur-sm border-b border-ink/20 mt-4">
        <div className="flex items-center gap-2">
          <input
            type="search"
            inputMode="search"
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            placeholder="Search"
            aria-label="Search opportunities"
            className="flex-1 min-w-0 bg-paper ink-line rounded-full px-3 py-2 font-body text-ink text-base doodle-shadow-sm focus:outline-none focus:ring-4 focus:ring-gold/40"
          />
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="press shrink-0 btn-doodle btn-gold"
            aria-label="Filters"
          >
            Filters{nActive > 0 && ` · ${nActive}`}
          </button>
        </div>
        {activeChips.length > 0 && (
          <div className="swipe-row swipe-row-chip mt-2 -mx-4">
            {activeChips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={c.remove}
                className="press shrink-0 font-hand text-sm px-2.5 py-1 ink-line rounded-full doodle-shadow-sm bg-gold flex items-center gap-1"
              >
                <span>{c.label}</span>
                <span aria-hidden>✕</span>
              </button>
            ))}
          </div>
        )}
        <div className="mt-2 inline-flex gap-1 bg-paper ink-line rounded-full doodle-shadow-sm p-1">
          <TabButton active={view === "cards"} onClick={() => setView("cards")}>Cards</TabButton>
          <TabButton active={view === "calendar"} onClick={() => setView("calendar")}>Calendar</TabButton>
          <TabButton active={view === "area"} onClick={() => setView("area")}>By area</TabButton>
        </div>
      </div>

      {/* DESKTOP filter card (unchanged) */}
      <section className="hidden md:block mt-6">
        <DoodleWindow variant="cream" addressText="filters">
          <h2 className="font-display text-2xl text-ink">Filters</h2>
          <div className="mt-3 grid gap-4">
            <FilterRows filters={filters} setFilters={setFilters} />
            <div>
              <button type="button" onClick={reset} className="btn-doodle press">Clear filters</button>
            </div>
          </div>
        </DoodleWindow>
      </section>

      {/* DESKTOP: count row + segmented control (unchanged) */}
      <section className="hidden md:flex mt-6 items-end justify-between gap-3 flex-wrap">
        <h3 className="font-display text-2xl text-ink">
          {matched.length === 0 ? "No matches yet" : `${matched.length} match${matched.length === 1 ? "" : "es"}`}
        </h3>
        <div className="inline-flex gap-1 bg-paper ink-line rounded-full doodle-shadow-sm p-1">
          <TabButton active={view === "cards"} onClick={() => setView("cards")}>Cards</TabButton>
          <TabButton active={view === "calendar"} onClick={() => setView("calendar")}>Calendar</TabButton>
          <TabButton active={view === "area"} onClick={() => setView("area")}>By area</TabButton>
        </div>
      </section>

      {/* MOBILE match count line */}
      <div className="md:hidden mt-3 font-hand text-ink/80">
        {matched.length === 0 ? "No matches yet" : `${matched.length} match${matched.length === 1 ? "" : "es"}`}
      </div>

      <section className="mt-4">
        {view === "cards" && <CardsView results={matched} shown={shown} onShowMore={() => setShown((s) => s + MOBILE_INITIAL)} />}
        {view === "calendar" && <CalendarAgenda results={matched} shown={shown} onShowMore={() => setShown((s) => s + MOBILE_INITIAL)} />}
        {view === "area" && <AreaView results={matched} shown={shown} onShowMore={() => setShown((s) => s + MOBILE_INITIAL)} />}
      </section>

      <section className="mt-8 md:mt-10">
        <DoodleWindow variant="mint" addressText="want-even-more">
          <h2 className="font-display text-ink">Want even more?</h2>
          <p className="font-body text-ink/80 mt-1 text-sm md:text-base">
            These sites list everything in Houston. Double-check the age rules before you sign up.
          </p>
          <ul className="mt-4 grid gap-2 grid-cols-2 md:gap-3">
            {databases.map((d) => (
              <li key={d.url}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="press block bg-paper ink-line-thick rounded-xl p-3 doodle-shadow-sm hover:bg-cream h-full"
                >
                  <div className="font-display text-base md:text-xl text-ink leading-tight">{d.name} →</div>
                  <div className="hidden md:block font-body text-ink/80 text-sm mt-0.5">{d.blurb}</div>
                </a>
              </li>
            ))}
          </ul>
        </DoodleWindow>
      </section>

      <p className="font-body text-ink/70 text-xs mt-4">
        Not sure something counts? Ask an officer or Ms. Cantu.
      </p>

      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Filters"
        footer={
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={reset} className="press font-hand text-ink/80 underline decoration-dotted underline-offset-2">
              Clear all
            </button>
            <button type="button" onClick={() => setSheetOpen(false)} className="btn-doodle btn-gold press">
              Show {matched.length} result{matched.length === 1 ? "" : "s"}
            </button>
          </div>
        }
      >
        <div className="grid gap-4 pb-4">
          <FilterRows filters={filters} setFilters={setFilters} />
        </div>
      </BottomSheet>
    </div>
  );
}

function buildActiveChips(f: Filters, apply: (next: Filters) => void) {
  const chips: { key: string; label: string; remove: () => void }[] = [];
  if (f.ageBand) {
    const band = AGE_BANDS.find((b) => b.id === f.ageBand);
    chips.push({ key: "age", label: `Age ${band?.label}`, remove: () => apply({ ...f, ageBand: "" }) });
  }
  if (f.parentCanCome) {
    chips.push({ key: "parent", label: f.parentCanCome === "yes" ? "Parent can come" : "Just me" , remove: () => apply({ ...f, parentCanCome: "" }) });
  }
  if (f.categories.length) {
    f.categories.forEach((c) => {
      const cat = CATEGORIES.find((cc) => cc.id === c);
      if (cat) chips.push({ key: `cat-${c}`, label: cat.label, remove: () => apply({ ...f, categories: f.categories.filter((x) => x !== c) }) });
    });
  }
  if (f.day) {
    const day = DAYS.find((d) => d.id === f.day);
    if (day) chips.push({ key: "day", label: day.label, remove: () => apply({ ...f, day: "" }) });
  }
  if (f.going) {
    chips.push({ key: "going", label: f.going === "group" ? "Group of 5+" : "Just me", remove: () => apply({ ...f, going: "" }) });
  }
  if (f.type !== "both") {
    chips.push({ key: "type", label: f.type === "ongoing" ? "Ongoing" : "Dated events", remove: () => apply({ ...f, type: "both" }) });
  }
  if (f.area) {
    const a = AREAS.find((aa) => aa.id === f.area);
    if (a) chips.push({ key: "area", label: a.label, remove: () => apply({ ...f, area: "" }) });
  }
  return chips;
}

function FilterRows({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  return (
    <>
      <Row label="Search">
        <input
          type="search"
          inputMode="search"
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
    </>
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

function CardsView({ results, shown, onShowMore }: { results: Opportunity[]; shown: number; onShowMore: () => void }) {
  if (results.length === 0) return <EmptyState />;
  const slice = results.slice(0, shown);
  const hasMore = results.length > shown;
  return (
    <div className="grid gap-4">
      {slice.map((o) => <OpportunityCard key={o.id} o={o} />)}
      {hasMore && (
        <button type="button" onClick={onShowMore} className="btn-doodle self-center mt-1 press">
          Show more ({results.length - shown})
        </button>
      )}
    </div>
  );
}

function AreaView({ results, shown, onShowMore }: { results: Opportunity[]; shown: number; onShowMore: () => void }) {
  if (results.length === 0) return <EmptyState />;
  const slice = results.slice(0, shown);
  const hasMore = results.length > shown;
  const byArea = new Map<AreaId, Opportunity[]>();
  for (const o of slice) {
    const list = byArea.get(o.area) || [];
    list.push(o);
    byArea.set(o.area, list);
  }
  return (
    <div className="grid gap-5">
      {AREAS.filter((a) => byArea.has(a.id)).map((a) => (
        <div key={a.id}>
          <h4 className="font-display text-ink mb-2">{a.label}</h4>
          <div className="grid gap-4">
            {(byArea.get(a.id) || []).map((o) => <OpportunityCard key={o.id} o={o} />)}
          </div>
        </div>
      ))}
      {hasMore && (
        <button type="button" onClick={onShowMore} className="btn-doodle self-center mt-1 press">
          Show more ({results.length - shown})
        </button>
      )}
    </div>
  );
}

function CalendarAgenda({ results, shown, onShowMore }: { results: Opportunity[]; shown: number; onShowMore: () => void }) {
  const events = results.filter((o) => o.type === "event" && o.dates && o.dates.length);
  if (events.length === 0) {
    return (
      <DoodleWindow variant="cream">
        <p className="font-hand text-ink text-base md:text-lg">
          No dated events match these filters. Try the Cards view, or change the Type filter.
        </p>
      </DoodleWindow>
    );
  }

  // Flatten to one row per (date, event).
  const flat: Array<{ date: string; o: Opportunity }> = [];
  for (const o of events) {
    for (const d of o.dates!) flat.push({ date: d, o });
  }
  flat.sort((a, b) => a.date.localeCompare(b.date));
  const slice = flat.slice(0, shown);
  const hasMore = flat.length > shown;

  const byMonth = new Map<string, typeof flat>();
  for (const it of slice) {
    const dt = new Date(it.date);
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
    const arr = byMonth.get(key) || [];
    arr.push(it);
    byMonth.set(key, arr);
  }
  const months = Array.from(byMonth.keys()).sort();

  return (
    <div className="grid gap-5">
      {months.map((key) => {
        const [y, m] = key.split("-").map(Number);
        const label = new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
        const items = byMonth.get(key) || [];
        return (
          <div key={key}>
            <div className="sticky top-[200px] md:static z-10 -mx-4 px-4 py-2 bg-sky-doodle/95 backdrop-blur-sm border-b border-ink/20 md:border-none md:py-0 md:px-0 md:bg-transparent md:backdrop-blur-none">
              <h4 className="font-display text-xl text-ink">{label}</h4>
            </div>
            <ul className="mt-3 space-y-3">
              {items.map((it) => {
                const dateObj = new Date(it.date);
                const display = dateObj.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
                return (
                  <li key={`${it.o.id}-${it.date}`} className="bg-paper ink-line rounded-xl p-3 doodle-shadow-sm">
                    <div className="font-hand text-ink/80 text-sm">{display}</div>
                    <div className="font-display text-base md:text-xl text-ink leading-tight">{it.o.name}</div>
                    <div className="font-body text-ink/80 text-xs md:text-sm mt-1">{it.o.description}</div>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      {it.o.signupUrl && it.o.signupUrl.startsWith("http") && (
                        <a href={it.o.signupUrl} target="_blank" rel="noreferrer" className="btn-doodle btn-gold press">Sign up →</a>
                      )}
                      <Countdown date={it.date} label="In" compact />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      {hasMore && (
        <button type="button" onClick={onShowMore} className="btn-doodle self-center mt-1 press">
          Show more ({flat.length - shown})
        </button>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <DoodleWindow variant="mint" addressText="empty">
      <p className="font-hand text-ink text-base md:text-lg">
        Nothing matches. Try a different filter, or ask Ms. Cantu!
      </p>
    </DoodleWindow>
  );
}

function OpportunityCard({ o }: { o: Opportunity }) {
  const [open, setOpen] = useState(false);
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

  const areaLabel = AREAS.find((a) => a.id === o.area)?.label || o.area;

  return (
    <DoodleWindow variant={variant} addressText={o.id}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* Header: org badge + hour badge */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-hand text-xs uppercase tracking-wider bg-paper ink-line rounded-md px-2 py-0.5">{o.org}</span>
            {o.countsForHours && (
              <span className="font-hand text-xs uppercase tracking-wider bg-mint ink-line rounded-md px-2 py-0.5">
                Counts
              </span>
            )}
            {o.type === "event" && (
              <span className="font-hand text-xs uppercase tracking-wider bg-gold ink-line rounded-md px-2 py-0.5">
                Dated
              </span>
            )}
          </div>
          <h4 className="font-display text-ink leading-tight" style={{ fontSize: "clamp(16px, 4.5vw, 24px)" }}>{o.name}</h4>
          <p className="font-body text-ink mt-1 text-sm md:text-base">{o.description}</p>

          {/* Compact tag row */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="font-hand text-xs bg-paper ink-line rounded-md px-2 py-0.5">📍 {areaLabel}</span>
            <span className="font-hand text-xs bg-paper ink-line rounded-md px-2 py-0.5">Ages {o.minAge}+</span>
            {o.parentRequiredUnder > 0 && (
              <span className="font-hand text-xs bg-paper ink-line rounded-md px-2 py-0.5">Parent under {o.parentRequiredUnder}</span>
            )}
          </div>

          {upcoming.length > 0 && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {upcoming.slice(0, 2).map((d) => {
                const dt = new Date(d);
                return (
                  <span key={d} className="inline-flex items-center gap-2 bg-paper ink-line rounded-md px-2 py-0.5 font-hand text-xs">
                    <span>{dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
                    <Countdown date={d} compact />
                  </span>
                );
              })}
            </div>
          )}

          {/* More info (mobile) */}
          <div className="md:hidden mt-2">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="press font-hand text-sm text-ink underline decoration-dotted underline-offset-2"
            >
              {open ? "Less info" : "More info"}
            </button>
            {open && (
              <div className="mt-2 bg-paper ink-line rounded-lg p-2 text-sm">
                <div className="font-body text-ink/80">📝 {o.ageNote}</div>
                <div className="font-body text-ink/80 mt-1">🗓 {o.location}</div>
              </div>
            )}
          </div>

          {/* Desktop: show full ageNote inline */}
          <div className="hidden md:block mt-2 font-body text-ink/80 text-sm">📝 {o.ageNote}</div>

          {/* Sign up: full width on mobile */}
          <div className="mt-3 flex flex-col md:flex-row md:flex-wrap md:items-center gap-2">
            {sign ? (
              signIsHttp ? (
                <a href={sign} target="_blank" rel="noreferrer" className="btn-doodle btn-gold press w-full md:w-auto justify-center">Sign up →</a>
              ) : signIsMail ? (
                <a href={sign} className="btn-doodle btn-gold press w-full md:w-auto justify-center">Email to sign up →</a>
              ) : (
                <span className="font-hand text-ink text-sm">{sign}</span>
              )
            ) : (
              <span className="font-hand text-ink/70 text-sm">No sign-up needed. Just show up.</span>
            )}
            {o.signupExtra?.map((x) => (
              <a key={x.url} href={x.url} target="_blank" rel="noreferrer" className="btn-doodle press w-full md:w-auto justify-center">{x.label} →</a>
            ))}
          </div>
          <p className="font-body text-ink/70 text-xs mt-2">
            Check their page for the latest times before you go.
          </p>
        </div>
      </div>
    </DoodleWindow>
  );
}
