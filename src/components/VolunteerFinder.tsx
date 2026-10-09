import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES, DAYS, opportunities, type CategoryId, type DayId, type Opportunity } from "../data/opportunities";
import { isPlaceholder } from "../data/site";
import DoodleWindow from "./DoodleWindow";

type Filters = {
  ageBand: "11-12" | "13" | "14" | "15+" | "";
  parentCanCome: "yes" | "no" | "";
  categories: CategoryId[];
  day: DayId | "";
  going: "solo" | "group" | "";
};

const defaultFilters: Filters = {
  ageBand: "",
  parentCanCome: "",
  categories: [],
  day: "",
  going: "",
};

const AGE_BANDS = [
  { id: "11-12" as const, label: "11 to 12", minAge: 11, maxAge: 12 },
  { id: "13"    as const, label: "13",       minAge: 13, maxAge: 13 },
  { id: "14"    as const, label: "14",       minAge: 14, maxAge: 14 },
  { id: "15+"   as const, label: "15+",      minAge: 15, maxAge: 99 },
];

function matches(o: Opportunity, f: Filters, now: Date): boolean {
  if (o.endsOn) {
    const end = new Date(o.endsOn);
    end.setHours(23, 59, 59, 999);
    if (end.getTime() < now.getTime()) return false;
  }
  if (f.ageBand) {
    const band = AGE_BANDS.find((b) => b.id === f.ageBand);
    if (band && band.minAge < o.minAge) return false;
  }
  if (f.ageBand && f.parentCanCome) {
    const band = AGE_BANDS.find((b) => b.id === f.ageBand);
    if (band && f.parentCanCome === "no" && band.minAge < o.parentRequiredUnder) return false;
  }
  if (f.categories.length > 0) {
    const anyMatch = f.categories.some((c) => o.categories.includes(c));
    if (!anyMatch) return false;
  }
  if (f.day && f.day !== "any") {
    if (!o.days.includes(f.day)) return false;
  }
  if (f.going === "group" && !o.groupFriendly) return false;
  return true;
}

function score(o: Opportunity, f: Filters): number {
  // Soft score for the "closest options" when nothing matches.
  let s = 0;
  if (f.categories.length) {
    s += f.categories.filter((c) => o.categories.includes(c)).length * 2;
  }
  if (f.day && f.day !== "any" && o.days.includes(f.day)) s += 1;
  if (f.going === "group" && o.groupFriendly) s += 1;
  if (f.ageBand) {
    const band = AGE_BANDS.find((b) => b.id === f.ageBand);
    if (band && band.minAge >= o.minAge) s += 1;
  }
  return s;
}

function readFromUrl(sp: URLSearchParams): Filters {
  const ab = sp.get("age") || "";
  const pc = sp.get("parent") || "";
  const cats = (sp.get("cats") || "").split(",").filter(Boolean) as CategoryId[];
  const day = (sp.get("day") || "") as DayId | "";
  const going = sp.get("with") || "";
  return {
    ageBand: (["11-12", "13", "14", "15+"].includes(ab) ? ab : "") as Filters["ageBand"],
    parentCanCome: (["yes", "no"].includes(pc) ? pc : "") as Filters["parentCanCome"],
    categories: cats.filter((c) => CATEGORIES.some((cc) => cc.id === c)),
    day: (DAYS.some((d) => d.id === day) ? day : "") as Filters["day"],
    going: (["solo", "group"].includes(going) ? going : "") as Filters["going"],
  };
}

function writeToUrl(f: Filters): string {
  const sp = new URLSearchParams();
  if (f.ageBand) sp.set("age", f.ageBand);
  if (f.parentCanCome) sp.set("parent", f.parentCanCome);
  if (f.categories.length) sp.set("cats", f.categories.join(","));
  if (f.day) sp.set("day", f.day);
  if (f.going) sp.set("with", f.going);
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default function VolunteerFinder() {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = useMemo(() => readFromUrl(new URLSearchParams(location.search)), [location.search]);
  const [filters, setFilters] = useState<Filters>(initial);
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    const search = writeToUrl(filters);
    const target = `${location.pathname}${search}${location.hash}`;
    if (`${location.pathname}${location.search}${location.hash}` !== target) {
      navigate(target, { replace: true });
    }
  }, [filters, location.pathname, location.search, location.hash, navigate]);

  const matched = useMemo(() => opportunities.filter((o) => matches(o, filters, now)), [filters, now]);
  const nearMisses = useMemo(() => {
    if (matched.length > 0) return [];
    const alive = opportunities.filter((o) => !o.endsOn || new Date(o.endsOn).getTime() >= now.getTime() - 86_400_000);
    return alive.map((o) => ({ o, s: score(o, filters) })).sort((a, b) => b.s - a.s).slice(0, 2).map((x) => x.o);
  }, [matched.length, filters, now]);

  const reset = () => setFilters(defaultFilters);

  return (
    <div id="finder">
      <DoodleWindow variant="cream" addressText="volunteer-finder">
        <h2 className="font-display text-2xl sm:text-3xl text-ink">Volunteer finder</h2>
        <p className="font-body text-ink/80 text-sm mt-1">
          Pick what fits and we'll show the sign-ups.
        </p>

        <div className="mt-4 grid gap-4">
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
          <Row label="What sounds fun? (pick any)">
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
          <div>
            <button type="button" onClick={reset} className="btn-doodle press">Clear filters</button>
          </div>
        </div>
      </DoodleWindow>

      <div className="mt-5 flex items-end justify-between gap-3">
        <h3 className="font-display text-2xl text-ink">
          {matched.length === 0 ? "No matches yet" : `${matched.length} match${matched.length === 1 ? "" : "es"}`}
        </h3>
      </div>

      <div className="mt-3 grid gap-4">
        {matched.length === 0 && (
          <DoodleWindow variant="mint" addressText="empty">
            <p className="font-hand text-ink text-lg">
              Nothing matches. Try a different filter, or ask Ms. Cantu!
            </p>
            {nearMisses.length > 0 && (
              <>
                <p className="font-hand text-ink/80 text-base mt-3">Closest options:</p>
                <div className="mt-2 grid gap-3">
                  {nearMisses.map((o) => <OpportunityCard key={o.id} o={o} dim />)}
                </div>
              </>
            )}
          </DoodleWindow>
        )}
        {matched.map((o) => <OpportunityCard key={o.id} o={o} />)}
      </div>

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

function OpportunityCard({ o, dim = false }: { o: Opportunity; dim?: boolean }) {
  const variant: "cream" | "gold" | "coral" | "mint" = o.categories.includes("food")
    ? "coral"
    : o.categories.includes("environment")
    ? "mint"
    : o.categories.includes("kids")
    ? "gold"
    : "cream";
  return (
    <div className={dim ? "opacity-80" : ""}>
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
            </div>
            <h4 className="font-display text-2xl text-ink leading-tight">{o.name}</h4>
            <p className="font-body text-ink mt-1">{o.description}</p>
            <div className="font-body text-ink/80 text-sm mt-2">
              📍 {o.location}
            </div>
            <div className="font-body text-ink/80 text-sm mt-1">
              👤 Ages {o.minAge}+{o.parentRequiredUnder > 0 ? `, under ${o.parentRequiredUnder} needs a parent or guardian` : ""}
            </div>
            {o.notes && (
              <div className="font-body text-ink/80 text-sm mt-1">📝 {o.notes}</div>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {o.signupUrl ? (
                isPlaceholder(o.signupUrl) ? (
                  <span className="inline-flex items-center gap-1 bg-paper border-[2px] border-dashed border-ink/60 rounded-md px-1.5 py-0.5 font-hand text-sm text-ink/80">
                    <span aria-hidden>✎</span>
                    <span>{o.signupUrl}</span>
                  </span>
                ) : (
                  <a href={o.signupUrl} target="_blank" rel="noreferrer" className="btn-doodle btn-gold press">Sign up →</a>
                )
              ) : (
                <span className="font-hand text-ink/70 text-sm">No sign-up needed. Just show up to meetings.</span>
              )}
              {o.signupExtra?.map((x) => (
                <a key={x.url} href={x.url} target="_blank" rel="noreferrer" className="btn-doodle press">{x.label} →</a>
              ))}
            </div>
          </div>
        </div>
      </DoodleWindow>
    </div>
  );
}
