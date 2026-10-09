import { useState } from "react";
import { site, isPlaceholder, parseDate } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import EligibilityChecker from "../components/EligibilityChecker";

function fallDeadlinePassed(now = new Date()): boolean {
  const d = parseDate(site.applications.fall2026Deadline);
  if (!d) return false;
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  return end.getTime() < now.getTime();
}

export default function Applications() {
  const [enlarged, setEnlarged] = useState(false);
  const closed = fallDeadlinePassed();

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">8th grade applications</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">What you need and how it works.</p>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
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
                Closed. Fall 2026 applications are closed. 7th graders: spring applications open{" "}
                {isPlaceholder(site.applications.spring2027OpenDate) ? (
                  <span className="inline-flex items-center gap-1 align-middle bg-paper border-[2px] border-dashed border-ink/60 rounded-md px-1.5 py-0.5 font-hand text-xs text-ink/80">
                    <span aria-hidden>✎</span>
                    <span>{site.applications.spring2027OpenDate}</span>
                  </span>
                ) : (
                  <span>{site.applications.spring2027OpenDate}</span>
                )}
                .
              </div>
            ) : (
              <div className="bg-mint ink-line rounded-xl p-3 font-hand text-ink">
                Fall 2026: applications are due {site.applications.fall2026Deadline} at {site.applications.fall2026DeadlineTime} in {site.applications.dropoffLocation}.
              </div>
            )}
          </div>
        </DoodleWindow>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-[1.1fr_1fr]">
        <DoodleWindow variant="mint" addressText="eligibility">
          <EligibilityChecker />
        </DoodleWindow>
        <DoodleWindow variant="coral" addressText="downloads">
          <h2 className="font-display text-2xl text-ink">Downloads</h2>
          <ul className="mt-3 space-y-2">
            {site.applications.downloads.map((d) => (
              <li key={d.file}>
                <a href={d.file} className="press flex items-center gap-3 bg-paper ink-line rounded-xl p-3 doodle-shadow-sm">
                  <FileIcon />
                  <span className="font-hand text-lg text-ink">{d.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="font-body text-ink/70 text-xs mt-3">
            Questions? Ask {site.applications.questionsFor.join(", ")}.
          </p>
        </DoodleWindow>
      </section>

      <section className="mt-8">
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
              alt="NJHS flyer from August, with info about applications and dues"
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

function FileIcon() {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" aria-hidden className="shrink-0">
      <path d="M4 4 L22 4 L32 14 L32 40 L4 40 Z" fill="#FFF5E4" stroke="#2B2B2B" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M22 4 L22 14 L32 14" fill="none" stroke="#2B2B2B" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M10 22 L26 22 M10 28 L26 28 M10 34 L22 34" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
