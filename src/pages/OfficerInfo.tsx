import { site } from "../data/site";
import OfficerFlipCard from "../components/OfficerFlipCard";
import DoodleWindow from "../components/DoodleWindow";
import OfficerEmail from "../components/OfficerEmail";

export default function OfficerInfo() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Officer info</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">Tap a card to flip it.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {site.officers.map((o) => <OfficerFlipCard key={o.name} officer={o} />)}
      </div>

      <section id="contact" className="mt-10">
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
      </section>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-ink">Sponsors</h2>
        <p className="font-hand text-xl text-ink/80 mt-1">The teachers who run NJHS with us.</p>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
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
