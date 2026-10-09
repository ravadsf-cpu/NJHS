import { useState } from "react";
import { site, parseDate } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import EligibilityChecker from "../components/EligibilityChecker";
import CollapseWindow from "../components/CollapseWindow";

function fallDeadlinePassed(now = new Date()): boolean {
  const d = parseDate(site.applications.fall2026Deadline);
  if (!d) return false;
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  return end.getTime() < now.getTime();
}

function fallDeadlineDisplay(): string {
  const d = parseDate(site.applications.fall2026Deadline);
  if (!d) return site.applications.fall2026Deadline;
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

const fileEmojis = ["📄", "📝", "📘"];

export default function Applications() {
  const [enlarged, setEnlarged] = useState(false);
  const closed = fallDeadlinePassed();

  const StatusCard = (
    <DoodleWindow variant={closed ? "coral" : "mint"} addressText="status">
      {closed ? (
        <div className="font-hand text-ink">
          Closed. Fall 2026 applications are closed. 7th graders: spring applications open {site.applications.spring2027OpenDisplay}.
        </div>
      ) : (
        <div className="font-hand text-ink">
          Fall 2026: due {fallDeadlineDisplay()} at {site.applications.fall2026DeadlineTime} in {site.applications.dropoffLocation}.
        </div>
      )}
    </DoodleWindow>
  );

  const Downloads = (
    <DoodleWindow variant="coral" addressText="downloads">
      <h2 className="font-display text-ink mb-2">Downloads</h2>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {site.applications.downloads.map((d, i) => (
          <a
            key={d.file}
            href={d.file}
            className="press flex flex-col items-center text-center gap-1 bg-paper ink-line rounded-xl p-2 md:p-3 doodle-shadow-sm min-h-[88px]"
          >
            <span aria-hidden className="text-2xl md:text-3xl">{fileEmojis[i] || "📄"}</span>
            <span className="font-hand text-ink text-xs md:text-sm leading-tight">{d.name}</span>
          </a>
        ))}
      </div>
      <p className="font-body text-ink/70 text-xs mt-3">
        Questions? Ask {site.applications.questionsFor.join(", ")}.
      </p>
    </DoodleWindow>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 md:pt-8 pb-10">
      <h1 className="font-display text-ink">8th grade applications</h1>
      <p className="font-hand text-ink/80 mt-1" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
        What you need and how it works.
      </p>

      {/* MOBILE: status + eligibility first */}
      <div className="md:hidden mt-5 space-y-4">
        {StatusCard}
        <DoodleWindow variant="mint" addressText="eligibility">
          <EligibilityChecker />
        </DoodleWindow>
        {Downloads}
        <CollapseWindow title="Who can apply" preview="GPA, conduct, outside service" variant="cream">
          <ul className="font-body text-ink space-y-1.5">
            <li>• {site.applications.gpaRequirement}</li>
            <li>• {site.applications.conductRequirement}</li>
            <li>• {site.applications.outsideServiceRequirement}</li>
          </ul>
        </CollapseWindow>
        <CollapseWindow title="How it works" preview="Fall for 8th, spring for 7th" variant="gold">
          <p className="font-body text-ink">
            The NJHS committee reviews 8th grade applications in the fall and 7th grade applications in the spring.
          </p>
        </CollapseWindow>
        <CollapseWindow title="August flyer" preview="Tap to see the flyer" variant="white">
          <button
            type="button"
            onClick={() => setEnlarged(true)}
            className="press block mx-auto"
            aria-label="Enlarge the August NJHS flyer"
          >
            <img
              src={site.applications.flyerImage}
              alt="NJHS flyer from August"
              loading="lazy"
              className="max-w-full h-auto rounded-xl border-[2.5px] border-ink doodle-shadow-sm"
            />
            <div className="mt-1 font-hand text-ink/70 text-sm text-center">Tap to enlarge</div>
          </button>
        </CollapseWindow>
      </div>

      {/* DESKTOP: original layout */}
      <section className="hidden md:grid mt-6 gap-5 md:grid-cols-2">
        <DoodleWindow variant="cream" addressText="who-can-apply">
          <h2 className="font-display text-2xl text-ink">Who can apply</h2>
          <ul className="font-body text-ink mt-2 space-y-1">
            <li>• {site.applications.gpaRequirement}</li>
            <li>• {site.applications.conductRequirement}</li>
            <li>• {site.applications.outsideServiceRequirement}</li>
          </ul>
        </DoodleWindow>
        <DoodleWindow variant="gold" addressText="how-it-works">
          <h2 className="font-display text-2xl text-ink">How it works</h2>
          <p className="font-body text-ink mt-1">
            The NJHS committee reviews 8th grade applications in the fall and 7th grade applications in the spring.
          </p>
          <div className="mt-3">
            {closed ? (
              <div className="bg-coral ink-line rounded-xl p-3 font-hand text-ink">
                Closed. Fall 2026 applications are closed. 7th graders: spring applications open {site.applications.spring2027OpenDisplay}.
              </div>
            ) : (
              <div className="bg-mint ink-line rounded-xl p-3 font-hand text-ink">
                Fall 2026: applications are due {fallDeadlineDisplay()} at {site.applications.fall2026DeadlineTime} in {site.applications.dropoffLocation}.
              </div>
            )}
          </div>
        </DoodleWindow>
      </section>
      <section className="hidden md:grid mt-8 gap-5 md:grid-cols-[1.1fr_1fr]">
        <DoodleWindow variant="mint" addressText="eligibility">
          <EligibilityChecker />
        </DoodleWindow>
        {Downloads}
      </section>
      <section className="hidden md:block mt-8">
        <DoodleWindow variant="white" addressText="august-flyer">
          <h2 className="font-display text-2xl text-ink mb-3">August flyer</h2>
          <button
            type="button"
            onClick={() => setEnlarged(true)}
            className="press block mx-auto"
            aria-label="Enlarge the August NJHS flyer"
          >
            <img
              src={site.applications.flyerImage}
              alt="NJHS flyer from August, with info about applications and dues"
              loading="lazy"
              className="max-w-full h-auto rounded-xl border-[2.5px] border-ink doodle-shadow-sm"
            />
            <div className="mt-1 font-hand text-ink/70 text-sm text-center">Tap to enlarge</div>
          </button>
        </DoodleWindow>
      </section>

      {enlarged && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged August NJHS flyer"
          className="fixed inset-0 z-[1100] bg-ink/85 flex items-center justify-center p-4"
          onClick={() => setEnlarged(false)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={site.applications.flyerImage}
              alt="NJHS flyer from August"
              className="max-h-[85vh] w-auto mx-auto rounded-xl border-[3px] border-paper doodle-shadow-lg bg-paper"
            />
            <button
              type="button"
              onClick={() => setEnlarged(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 bg-paper ink-line-thick rounded-full w-10 h-10 font-hand text-xl press"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
