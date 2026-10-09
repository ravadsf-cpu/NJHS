import { site, officerEmail } from "../data/site";
import OfficerFlipCard from "../components/OfficerFlipCard";
import DoodleWindow from "../components/DoodleWindow";
import OfficerEmail from "../components/OfficerEmail";
import SwipeRow from "../components/SwipeRow";
import PillTabs from "../components/PillTabs";

export default function OfficerInfo() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-8 pb-10">
      <h1 className="font-display text-ink">Officer info</h1>
      <p className="font-hand text-ink/80 mt-1" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
        Tap a card to flip it.
      </p>

      <PillTabs
        tabs={[
          { id: "officers", label: "Officers" },
          { id: "contact", label: "Contact" },
          { id: "sponsors", label: "Sponsors" },
        ]}
      />

      <section id="officers" aria-label="Officers" className="mt-5 md:mt-6">
        {/* MOBILE: swipe row */}
        <div className="md:hidden">
          <SwipeRow ariaLabel="Officer cards">
            {site.officers.map((o) => <OfficerFlipCard key={o.name} officer={o} />)}
          </SwipeRow>
        </div>
        {/* DESKTOP: grid (unchanged) */}
        <div className="hidden md:grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.officers.map((o) => <OfficerFlipCard key={o.name} officer={o} />)}
        </div>
      </section>

      <section id="contact" className="mt-8 md:mt-10">
        {/* MOBILE: compact rows */}
        <div className="md:hidden">
          <h2 className="font-display text-ink mb-2">Questions? Email any of us.</h2>
          <ul className="space-y-2">
            {site.officers.map((o) => (
              <li key={o.name} className="bg-paper ink-line rounded-xl p-3 doodle-shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-lg text-ink leading-none truncate">{o.name}</div>
                    <div className="font-body text-xs text-ink/70">{o.role}</div>
                  </div>
                  <a
                    href={`mailto:${officerEmail(o)}`}
                    aria-label={`Email ${o.name}`}
                    className="press shrink-0 btn-doodle btn-gold"
                  >
                    Email
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* DESKTOP (unchanged) */}
        <div className="hidden md:block">
          <DoodleWindow variant="cream" addressText="contact">
            <h2 className="font-display text-3xl text-ink">Questions? Email any of us.</h2>
            <p className="font-body text-ink/80 mt-1">
              Tap an email to open your mail app, or hit copy.
            </p>
            <ul className="mt-4 space-y-3">
              {site.officers.map((o) => (
                <li key={o.name} className="flex items-center gap-3 flex-wrap">
                  <div className="min-w-[180px]">
                    <div className="font-display text-xl text-ink leading-none">{o.name}</div>
                    <div className="font-body text-sm text-ink/70">{o.role}</div>
                  </div>
                  <OfficerEmail user={o.emailUser} domain={o.emailDomain} name={o.name} />
                </li>
              ))}
            </ul>
          </DoodleWindow>
        </div>
      </section>

      <section id="sponsors" className="mt-8 md:mt-10">
        <h2 className="font-display text-ink">Sponsors</h2>
        <p className="font-hand text-ink/80 mt-1" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
          The teachers who run NJHS with us.
        </p>
        {/* MOBILE: simple list */}
        <ul className="md:hidden mt-3 space-y-2">
          {site.sponsors.map((s) => (
            <li key={s.name} className="bg-mint ink-line rounded-xl p-3 doodle-shadow-sm">
              <div className="font-display text-lg text-ink">{s.name}</div>
            </li>
          ))}
        </ul>
        {/* DESKTOP (unchanged) */}
        <div className="hidden md:grid mt-4 gap-5 md:grid-cols-3">
          {site.sponsors.map((s) => (
            <DoodleWindow key={s.name} variant="mint" addressText={s.name.toLowerCase().replace(/\s+/g, "-")}>
              <div className="font-display text-2xl text-ink">{s.name}</div>
            </DoodleWindow>
          ))}
        </div>
      </section>
    </div>
  );
}
