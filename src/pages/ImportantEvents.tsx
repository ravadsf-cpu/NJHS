import { site, isPlaceholder, isPastEvent, parseDate, type SiteEvent } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import PlaceholderBox from "../components/PlaceholderBox";
import Countdown from "../components/Countdown";
import EventSchedule from "../components/EventSchedule";

function formatDate(dateStr: string): string {
  const d = parseDate(dateStr);
  if (!d) return "Date not set";
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function EventCard({ e }: { e: SiteEvent }) {
  const past = isPastEvent(e.date);
  return (
    <DoodleWindow variant="coral" addressText={e.id}>
      <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
        <div>
          {isPlaceholder(e.photo) || !e.photo ? (
            <PlaceholderBox label={isPlaceholder(e.photo) ? e.photo : "[[EVENT_PHOTO]]"} what="event photo, 4:3" aspect="4/3" />
          ) : (
            <img src={e.photo} alt={e.title} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-xl border-[2.5px] border-ink doodle-shadow-sm" />
          )}
        </div>
        <div>
          <h3 className="font-display text-2xl sm:text-3xl text-ink leading-tight">{e.title}</h3>
          <div className="font-hand text-ink/80 mt-1">{formatDate(e.date)} · {e.time}</div>
          <div className="font-body text-ink/80 text-sm">{e.location}</div>
          {!past && e.date && (
            <div className="mt-3"><Countdown date={e.date} label="Starts in" /></div>
          )}
          {e.schedule.length > 0 && (
            <ul className="mt-3 font-body text-ink text-sm space-y-0.5">
              {e.schedule.map((s, i) => <li key={i}>• {s}</li>)}
            </ul>
          )}
          {e.about && <p className="font-body text-ink mt-3">{e.about}</p>}
          {e.signupLink && (
            isPlaceholder(e.signupLink) ? (
              <div className="mt-3">
                <span className="inline-flex items-center gap-1 bg-paper border-[2px] border-dashed border-ink/60 rounded-md px-1.5 py-0.5 font-hand text-sm text-ink/80">
                  <span aria-hidden>✎</span>
                  <span>{e.signupLink}</span>
                </span>
              </div>
            ) : (
              <a href={e.signupLink} target="_blank" rel="noreferrer" className="btn-doodle btn-gold mt-3 press inline-flex">
                Sign up →
              </a>
            )
          )}
        </div>
      </div>
    </DoodleWindow>
  );
}

export default function ImportantEvents() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Important events</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">
        Chapter meetings and the big dates for {site.schoolYear.replace("-", " to ")}.
      </p>

      <div className="mt-6">
        <EventSchedule />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-ink mb-4">Featured event</h2>
        <div className="grid gap-5">
          {site.events.map((e) => <EventCard key={e.id} e={e} />)}
        </div>
      </section>
    </div>
  );
}
