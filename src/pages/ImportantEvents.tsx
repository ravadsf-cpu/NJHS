import { site, parseDate, isPastEvent, type SiteEvent } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import Countdown from "../components/Countdown";
import EventSchedule from "../components/EventSchedule";
import SmartImage from "../components/SmartImage";
import EventPhotoFallback from "../components/EventPhotoFallback";

function formatDate(dateStr: string): string {
  const d = parseDate(dateStr);
  if (!d) return "";
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function EventCard({ e }: { e: SiteEvent }) {
  const past = isPastEvent(e.date);
  return (
    <DoodleWindow variant="coral" addressText={e.id}>
      <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
        <div className="aspect-[4/3] rounded-xl border-[2.5px] border-ink doodle-shadow-sm overflow-hidden bg-paper">
          <SmartImage src={e.photo} alt={e.title} fallback={<EventPhotoFallback title={e.title} />} />
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
          {e.signupNote && (
            <p className="font-hand text-ink mt-3">{e.signupNote}</p>
          )}
        </div>
      </div>
    </DoodleWindow>
  );
}

export default function ImportantEvents() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-8 pb-10">
      <h1 className="font-display text-ink">Important events</h1>
      <p className="font-hand text-ink/80 mt-1" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
        Chapter meetings and the big dates for {site.schoolYear.replace("-", " to ")}.
      </p>

      <div className="mt-5 md:mt-6">
        <EventSchedule />
      </div>

      <section className="mt-8 md:mt-10">
        <h2 className="font-display text-ink mb-3 md:mb-4">Featured event</h2>
        <div className="grid gap-5">
          {site.events.map((e) => <EventCard key={e.id} e={e} />)}
        </div>
      </section>
    </div>
  );
}
