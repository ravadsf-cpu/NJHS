import { Link } from "react-router-dom";
import { site, sortedAlerts, nextDeadline, parseDate } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import DraggableWindow from "../components/DraggableWindow";
import Countdown from "../components/Countdown";
import ServiceHoursBar from "../components/ServiceHoursBar";
import Checklist from "../components/Checklist";
import YouTubeWindow from "../components/YouTubeWindow";
import QRCode from "../components/QRCode";
import { FolderDoodle, StarDoodle, HeartDoodle, EnvelopeDoodle, CursorSparkDoodle } from "../components/Doodles";

const whereDoIFind = [
  { to: "/important-events", label: "Important events" },
  { to: "/meeting-minutes", label: "Meeting minutes" },
  { to: "/applications", label: "8th grade applications" },
  { to: "/community-service", label: "Community service" },
  { to: "/photo-gallery", label: "Photo gallery" },
  { to: "/officer-info", label: "Officer info" },
  { to: "/earn-more", label: "Earn more hours" },
  { to: "/news", label: "News & alerts" },
];

function friendlyDate(dateStr: string): string {
  const d = parseDate(dateStr);
  if (!d) return "Date not set";
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export default function Home() {
  const dl = nextDeadline();
  const alertCount = sortedAlerts().filter((a) => a.urgent).length;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      {/* HERO */}
      <section className="relative">
        <div className="relative min-h-[360px] sm:min-h-[420px]">
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

          <div className="relative z-10 mx-auto max-w-2xl">
            <DoodleWindow variant="cream" addressText="lanier-njhs.vercel.app" className="mt-2">
              <div className="text-center">
                <h1 className="font-display text-5xl sm:text-6xl text-ink leading-none">Lanier NJHS</h1>
                <p className="font-hand text-xl sm:text-2xl text-ink/80 mt-3">{site.tagline}</p>
                <div className="mt-4 mx-auto max-w-sm">
                  <img
                    src={site.groupPhoto}
                    alt="Lanier NJHS group photo"
                    loading="lazy"
                    className="w-full aspect-video object-cover rounded-xl border-[2.5px] border-ink doodle-shadow-sm"
                  />
                  <div className="font-hand text-ink/70 text-sm mt-1">{site.groupPhotoCaption}</div>
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
                  <Link to="/important-events" className="btn-doodle btn-gold press">Important events</Link>
                  <Link to="/officer-info" className="btn-doodle btn-mint press">Meet the officers</Link>
                </div>
              </div>
            </DoodleWindow>
          </div>
        </div>
      </section>

      {/* QUICK ROW */}
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <DoodleWindow variant="coral" addressText="next-deadline">
          <div className="font-hand text-lg text-ink/80 mb-1">Next deadline</div>
          {dl ? (
            <>
              <div className="font-display text-2xl text-ink leading-tight">{dl.title}</div>
              <div className="font-hand text-ink/80 mt-1">{friendlyDate(dl.date)}</div>
              <div className="mt-3"><Countdown date={dl.date} label="In" /></div>
            </>
          ) : (
            <div className="font-hand text-ink/70">You're caught up. No deadlines on the board.</div>
          )}
          <Link to="/news" className="btn-doodle mt-4 press">All deadlines →</Link>
        </DoodleWindow>

        <DoodleWindow variant="gold" addressText="hours.log">
          <ServiceHoursBar />
          <div className="mt-3">
            <a href={site.serviceHours.logDownload} className="btn-doodle press">Download the hours log</a>
          </div>
        </DoodleWindow>

        <DoodleWindow variant="mint" addressText="quick-facts">
          <div className="font-hand text-lg text-ink/80 mb-1">Quick facts</div>
          <ul className="font-body text-ink text-base space-y-1">
            <li>• {site.serviceHours.perMemberRequired} service hours per member. The chapter project counts.</li>
            <li>• 8th graders apply in the fall.</li>
            <li>• 7th graders apply in the spring.</li>
            <li>• GPA 93 or higher. E in conduct. Service outside Lanier.</li>
          </ul>
        </DoodleWindow>
      </section>

      {/* DUES / SCHOOLPAY */}
      <section className="mt-8">
        <DoodleWindow variant="cream" addressText="pay-dues">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] items-center">
            <div>
              <h2 className="font-display text-3xl text-ink">Pay your dues</h2>
              <p className="font-body text-ink mt-1">
                Dues go through SchoolPay. Scan the QR with your phone or tap the button on a laptop.
              </p>
              <p className="font-body text-ink/70 text-sm mt-1">
                Already paid? Double-check it went through.
              </p>
              <div className="mt-3">
                <a href={site.schoolPayUrl} target="_blank" rel="noreferrer" className="btn-doodle btn-coral press">
                  Pay on SchoolPay →
                </a>
              </div>
            </div>
            <div className="bg-paper ink-line-thick rounded-xl p-3 doodle-shadow-sm w-fit">
              <QRCode value={site.schoolPayUrl} size={160} title="SchoolPay dues QR code" />
              <div className="mt-1 text-center font-hand text-ink/70 text-xs">Scan to pay</div>
            </div>
          </div>
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

      {/* VIDEO */}
      <section className="mt-10 grid gap-5 md:grid-cols-[2fr_1fr]">
        <YouTubeWindow url={site.youtubeEmbedUrl} title="Lanier NJHS intro video" />
        <DoodleWindow variant="gold" addressText="slides">
          <h3 className="font-display text-2xl text-ink">New here?</h3>
          <p className="font-body text-ink mt-1">Flip through the interest meeting slides.</p>
          <a href={site.interestMeetingSlidesUrl} target="_blank" rel="noreferrer" className="btn-doodle mt-3 press">
            Open the slides →
          </a>
        </DoodleWindow>
      </section>

      {/* WHERE DO I FIND... */}
      <section className="mt-10">
        <h2 className="font-display text-3xl text-ink mb-4">Where do I find...</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whereDoIFind.map((item) => (
            <Link key={item.to} to={item.to} className="press">
              <DoodleWindow variant="white" addressText={item.to}>
                <div className="flex items-center gap-3">
                  <FolderDoodle className="w-14 h-10 shrink-0" />
                  <div>
                    <div className="font-display text-xl text-ink leading-tight">{item.label}</div>
                    <div className="font-hand text-ink/70 text-sm">Open →</div>
                  </div>
                </div>
              </DoodleWindow>
            </Link>
          ))}
        </div>
      </section>

      {/* CHECKLIST + CTA */}
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
                Dues, report cards, pass pickup, meeting recaps, and the shirt vote. All in one feed.
              </p>
              <Link to="/news" className="btn-doodle btn-coral mt-3 press">
                Open the feed
                {alertCount > 0 && <span className="ml-1 bg-paper ink-line rounded-full px-1 text-xs">{alertCount}</span>}
              </Link>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <CursorSparkDoodle className="w-10 h-10 shrink-0" />
            <div>
              <h3 className="font-display text-xl text-ink">Need volunteer hours?</h3>
              <p className="font-body text-ink/80 text-sm mt-0.5">The Earn more hours page has tons of sign-ups.</p>
              <Link to="/earn-more" className="btn-doodle btn-mint mt-2 press">Open Earn more hours</Link>
            </div>
          </div>
        </DoodleWindow>
      </section>
    </div>
  );
}
