import { Link } from "react-router-dom";
import { site, isPlaceholder, isPastEvent, sortedAlerts, parseDate } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import DraggableWindow from "../components/DraggableWindow";
import PlaceholderBox from "../components/PlaceholderBox";
import Countdown from "../components/Countdown";
import ServiceHoursBar from "../components/ServiceHoursBar";
import Checklist from "../components/Checklist";
import { FolderDoodle, StarDoodle, HeartDoodle, EnvelopeDoodle, CursorSparkDoodle } from "../components/Doodles";

function pickNextEvent() {
  const upcoming = site.events
    .filter((e) => !isPastEvent(e.date) && !isPlaceholder(e.title))
    .sort((a, b) => (parseDate(a.date)?.getTime() ?? Infinity) - (parseDate(b.date)?.getTime() ?? Infinity));
  return upcoming[0];
}

export default function Home() {
  const nextEvent = pickNextEvent();
  const alertCount = sortedAlerts().filter((a) => a.urgent).length;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      {/* HERO */}
      <section className="relative">
        <div className="relative min-h-[360px] sm:min-h-[420px]">
          {/* decorative draggable doodle windows (desktop only, kept behind on mobile) */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <div className="pointer-events-auto absolute inset-0">
              <DraggableWindow initialX={-20} initialY={30} rotate={-4} z={1} className="w-[170px]">
                <DoodleWindow variant="mint" addressText="todo.txt">
                  <ul className="font-hand text-ink text-base space-y-1">
                    <li>☐ Pay dues</li>
                    <li>☐ Report card</li>
                    <li>☐ Pick up pass</li>
                  </ul>
                </DoodleWindow>
              </DraggableWindow>

              <DraggableWindow initialX={-40} initialY={260} rotate={4} z={1} className="w-[110px]">
                <HeartDoodle className="w-20 h-20 mx-auto" />
              </DraggableWindow>
            </div>
            <div className="pointer-events-auto absolute right-0 top-0 h-full w-0 hidden lg:block">
              <div className="absolute right-0 top-0 w-[320px] h-full">
                <DraggableWindow initialX={120} initialY={10} rotate={5} z={1} className="w-[180px]">
                  <DoodleWindow variant="coral" addressText="hello.njhs">
                    <div className="font-hand text-ink">
                      <div className="text-xl">Hey!</div>
                      <div className="text-sm mt-1 text-ink/80">Drag me around.</div>
                    </div>
                  </DoodleWindow>
                </DraggableWindow>
                <DraggableWindow initialX={180} initialY={230} rotate={-6} z={1} className="w-[130px]">
                  <StarDoodle className="w-24 h-24 mx-auto" />
                </DraggableWindow>
              </div>
            </div>
          </div>

          {/* main hero card */}
          <div className="relative z-10 mx-auto max-w-2xl">
            <DoodleWindow variant="cream" addressText="lanier-njhs.vercel.app" className="mt-2">
              <div className="text-center">
                <h1 className="font-display text-5xl sm:text-6xl text-ink leading-none">Lanier NJHS</h1>
                <p className="font-hand text-xl sm:text-2xl text-ink/80 mt-3">
                  {site.tagline}
                </p>
                <div className="mt-4 mx-auto max-w-sm">
                  {isPlaceholder(site.heroPhotoSlot) ? (
                    <PlaceholderBox
                      label={site.heroPhotoSlot}
                      what="group photo of chapter"
                      aspect="16/9"
                    />
                  ) : (
                    <img src={site.heroPhotoSlot} alt="Lanier NJHS members" className="w-full aspect-video object-cover rounded-xl border-[2.5px] border-ink doodle-shadow-sm" />
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  <Link to="/news" className="btn-doodle btn-coral press">
                    News & alerts
                    {alertCount > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center min-w-[22px] h-5 px-1 rounded-full bg-paper ink-line text-xs font-hand">
                        {alertCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/events" className="btn-doodle btn-gold press">Events</Link>
                  <Link to="/officers" className="btn-doodle btn-mint press">Meet the officers</Link>
                </div>
              </div>
            </DoodleWindow>
          </div>
        </div>
      </section>

      {/* QUICK ROW */}
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <DoodleWindow variant="mint" addressText="next-event">
          <div className="font-hand text-lg text-ink/80 mb-1">Next event</div>
          {nextEvent ? (
            <>
              <div className="font-display text-2xl text-ink leading-tight">{nextEvent.title}</div>
              <div className="font-hand text-ink/80 mt-1">
                {!isPlaceholder(nextEvent.date) ? friendlyDate(nextEvent.date) : "Date not set"} · {nextEvent.time || "TBD"}
              </div>
              <div className="mt-3">
                <Countdown date={nextEvent.date} label="In" />
              </div>
              <Link to="/events" className="btn-doodle mt-4 press">See details →</Link>
            </>
          ) : (
            <div className="font-hand text-ink/70">Nothing on the calendar yet. Check back soon.</div>
          )}
        </DoodleWindow>

        <DoodleWindow variant="coral" addressText="next-deadline">
          <div className="font-hand text-lg text-ink/80 mb-1">Next deadline</div>
          <div className="font-display text-2xl text-ink leading-tight">{site.nextDeadline.title}</div>
          <div className="mt-3">
            <Countdown date={site.nextDeadline.date} label="In" />
          </div>
          <Link to="/news" className="btn-doodle mt-4 press">All deadlines →</Link>
        </DoodleWindow>

        <DoodleWindow variant="gold" addressText="hours.log">
          <ServiceHoursBar />
        </DoodleWindow>
      </section>

      {/* GOALS */}
      <section className="mt-10">
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">Our goals this year</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {site.goals.map((g) => (
            <DoodleWindow key={g.title} variant={g.color} addressText={`goals/${g.title.toLowerCase()}`}>
              <h3 className="font-display text-2xl text-ink">{g.title}</h3>
              <p className="font-body text-ink mt-1">{g.body}</p>
            </DoodleWindow>
          ))}
        </div>
      </section>

      {/* CHECKLIST + NEWS CTA */}
      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <DoodleWindow variant="cream" addressText="checklist">
          <Checklist />
        </DoodleWindow>
        <DoodleWindow variant="white" addressText="/news">
          <div className="flex items-start gap-3">
            <EnvelopeDoodle className="w-16 h-12 shrink-0" />
            <div>
              <h3 className="font-display text-2xl text-ink">News & alerts</h3>
              <p className="font-body text-ink/80 mt-1">
                Dues, report cards, pass pickup, shirt vote, meeting recaps. All in one feed.
              </p>
              <Link to="/news" className="btn-doodle btn-coral mt-3 press">
                Open the feed
                {alertCount > 0 && <span className="ml-1 bg-paper ink-line rounded-full px-1 text-xs">{alertCount}</span>}
              </Link>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <FolderDoodle className="w-14 h-10 shrink-0" />
            <div>
              <h3 className="font-display text-xl text-ink">Shirt vote is up</h3>
              <p className="font-body text-ink/80 text-sm mt-0.5">Pick your favorite color.</p>
              <Link to="/shirts" className="btn-doodle btn-gold mt-2 press">Shirts</Link>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <CursorSparkDoodle className="w-10 h-10 shrink-0" />
            <div>
              <h3 className="font-display text-xl text-ink">Got a question?</h3>
              <p className="font-body text-ink/80 text-sm mt-0.5">Ask any officer or send us a note.</p>
              <Link to="/contact" className="btn-doodle btn-mint mt-2 press">Contact</Link>
            </div>
          </div>
        </DoodleWindow>
      </section>
    </div>
  );
}

function friendlyDate(dateStr: string): string {
  const d = parseDate(dateStr);
  if (!d) return "Date not set";
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
