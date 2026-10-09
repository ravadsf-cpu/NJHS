import { site, isPlaceholder } from "../data/site";
import OfficerFlipCard from "../components/OfficerFlipCard";
import DoodleWindow from "../components/DoodleWindow";
import { EnvelopeDoodle } from "../components/Doodles";

export default function OfficerInfo() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Officer info</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">Tap a card to flip it.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.officers.map((o) => <OfficerFlipCard key={o.name} officer={o} />)}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-ink">Sponsors</h2>
        <p className="font-hand text-xl text-ink/80 mt-1">The teachers who run NJHS with us.</p>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {site.sponsors.map((s) => (
            <DoodleWindow key={s.name} variant="cream" addressText={s.name.toLowerCase().replace(/\s+/g, "-")}>
              <div className="flex items-start gap-3">
                <EnvelopeDoodle className="w-14 h-10 shrink-0" />
                <div>
                  <div className="font-display text-xl text-ink">{s.name}</div>
                  <div className="mt-1">
                    {isPlaceholder(s.email) ? (
                      <span className="inline-flex items-center gap-1 bg-paper border-[2px] border-dashed border-ink/60 rounded-md px-1.5 py-0.5 font-hand text-sm text-ink/80">
                        <span aria-hidden>✎</span>
                        <span>{s.email}</span>
                      </span>
                    ) : (
                      <a href={`mailto:${s.email}`} className="font-body text-ink underline decoration-dotted underline-offset-2">
                        {s.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </DoodleWindow>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <DoodleWindow variant="mint" addressText="contact">
          <h2 className="font-display text-2xl text-ink">Questions?</h2>
          <p className="font-body text-ink mt-1">
            Ask any officer at a meeting, or email one of the sponsors above.
          </p>
          <p className="font-body text-ink/70 text-xs mt-2">
            We don't post student emails on the public site. Those have student ID numbers in them.
          </p>
        </DoodleWindow>
      </section>
    </div>
  );
}
