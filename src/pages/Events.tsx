import { site, isPastEvent, isPlaceholder, parseDate, type SiteEvent } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import PlaceholderBox from "../components/PlaceholderBox";
import Countdown from "../components/Countdown";

function formatDate(dateStr: string): string {
  const d = parseDate(dateStr);
  if (!d) return "Date not set";
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function EventCard({ e, variant, past }: { e: SiteEvent; variant: "cream" | "gold" | "coral" | "mint"; past?: boolean }) {
  const titleIsPlaceholder = isPlaceholder(e.title);
  return (
    <DoodleWindow variant={variant} addressText={e.id}>
      <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
        <div>
          {isPlaceholder(e.photo) || !e.photo ? (
            <PlaceholderBox
              label={isPlaceholder(e.photo) ? e.photo : "[[EVENT_PHOTO]]"}
              what="event photo, 4:3"
              aspect="4/3"
            />
          ) : (
            <img src={e.photo} alt={`${e.title}`} className="w-full aspect-[4/3] object-cover rounded-xl border-[2.5px] border-ink doodle-shadow-sm" />
          )}
        </div>
        <div>
          {titleIsPlaceholder ? (
            <PlaceholderBox
              label={e.title}
              what="event title, date, time, location, schedule"
              aspect="auto"
              className="min-h-[160px]"
            />
          ) : (
            <>
              <h3 className="font-display text-2xl sm:text-3xl text-ink leading-tight">{e.title}</h3>
              <div className="font-hand text-ink/80 mt-1">
                {formatDate(e.date)} · {e.time}
              </div>
              <div className="font-body text-ink/80 text-sm">{e.location}</div>
              {!past && e.date && (
                <div className="mt-3">
                  <Countdown date={e.date} label="Starts in" />
                </div>
              )}
              {e.schedule.length > 0 && (
                <ul className="mt-3 font-body text-ink text-sm space-y-0.5">
                  {e.schedule.map((s, i) => <li key={i}>• {s}</li>)}
                </ul>
              )}
              {e.about && <p className="font-body text-ink mt-3">{e.about}</p>}
              {e.signupLink && (
                isPlaceholder(e.signupLink) ? (
                  <div className="mt-3 inline-block">
                    <PlaceholderBox label={e.signupLink} what="SignUpGenius URL from Ms. Cantu's email" />
                  </div>
                ) : (
                  <a href={e.signupLink} target="_blank" rel="noreferrer" className="btn-doodle btn-gold mt-3 press inline-flex">
                    Sign up →
                  </a>
                )
              )}
            </>
          )}
        </div>
      </div>
    </DoodleWindow>
  );
}

const variants = ["cream", "gold", "coral", "mint"] as const;

export default function Events() {
  const upcoming = site.events.filter((e) => !isPastEvent(e.date));
  const past = site.events.filter((e) => isPastEvent(e.date));

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Events</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">What's coming up. What already happened.</p>

      <section className="mt-6">
        <h2 className="font-display text-2xl text-ink mb-3">Coming up</h2>
        <div className="grid gap-5">
          {upcoming.length === 0 && (
            <DoodleWindow variant="cream">
              <p className="font-hand text-ink/70">Nothing on the calendar yet. Check back soon.</p>
            </DoodleWindow>
          )}
          {upcoming.map((e, i) => (
            <EventCard key={e.id} e={e} variant={variants[i % variants.length]} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-ink mb-3">Past events</h2>
        {past.length === 0 ? (
          <DoodleWindow variant="white">
            <p className="font-hand text-ink/70">
              Nothing's moved to past yet. When an event date passes, it shows up here.
            </p>
          </DoodleWindow>
        ) : (
          <div className="grid gap-5">
            {past.map((e, i) => (
              <EventCard key={e.id} e={e} variant={variants[i % variants.length]} past />
            ))}
          </div>
        )}
        <div className="mt-5">
          <DoodleWindow variant="mint" addressText="past-photos/">
            <h3 className="font-display text-xl text-ink mb-2">Photo gallery</h3>
            <PlaceholderBox label={site.pastEventPhotosSlot} what="grid of event photos" aspect="16/9" />
          </DoodleWindow>
        </div>
      </section>
    </div>
  );
}
