import { Link } from "react-router-dom";
import { site } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import PersonalHoursTracker from "../components/PersonalHoursTracker";
import CollapseWindow from "../components/CollapseWindow";

export default function CommunityService() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 md:pt-8 pb-10">
      <h1 className="font-display text-ink">Community service</h1>
      <p className="font-hand text-ink/80 mt-1" style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>
        How hours work, and where to go for them.
      </p>

      {/* MOBILE: my hours + CTA first */}
      <div className="md:hidden mt-5 space-y-4">
        <DoodleWindow variant="mint" addressText="my-hours">
          <PersonalHoursTracker />
        </DoodleWindow>
        <Link to="/earn-more" className="press block">
          <DoodleWindow variant="gold" addressText="earn-more-hours">
            <div className="flex items-center gap-3">
              <SparkleDoodle />
              <div className="flex-1">
                <h2 className="font-display text-xl text-ink leading-tight">
                  Need more hours? Find volunteer spots near you →
                </h2>
                <p className="font-body text-ink/80 text-sm mt-1">
                  Filter by what sounds fun.
                </p>
              </div>
            </div>
          </DoodleWindow>
        </Link>
        <CollapseWindow title="The rules" preview="20 hours. Chapter project counts." variant="cream">
          <ul className="font-body text-ink space-y-1.5">
            <li>• Every member needs {site.serviceHours.perMemberRequired} service hours. The chapter project counts.</li>
            <li>• Hours log {site.serviceHours.logDueDisplay.toLowerCase()}.</li>
            <li>• You can start counting hours the summer before 8th grade.</li>
            <li>• Under 15? Lots of places need a parent with you. Check each place's rules.</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={site.serviceHours.logDownload} className="btn-doodle btn-gold press">
              Download the 2026 to 2027 log
            </a>
            <a href={site.serviceHours.logDownloadArchive} className="btn-doodle press">
              Old log, 2025 to 2026
            </a>
          </div>
        </CollapseWindow>
      </div>

      {/* DESKTOP (unchanged) */}
      <section className="hidden md:grid mt-6 gap-5 md:grid-cols-[1.3fr_1fr]">
        <DoodleWindow variant="cream" addressText="rules">
          <h2 className="font-display text-2xl text-ink">The rules</h2>
          <ul className="font-body text-ink mt-2 space-y-1">
            <li>• Every member needs {site.serviceHours.perMemberRequired} service hours. The chapter project counts toward that.</li>
            <li>• Hours log {site.serviceHours.logDueDisplay.toLowerCase()}.</li>
            <li>• You can start counting hours the summer before 8th grade.</li>
            <li>• Under 15? Lots of places need a parent with you. Check each place's rules.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={site.serviceHours.logDownload} className="btn-doodle btn-gold press">
              Download the 2026 to 2027 log
            </a>
            <a href={site.serviceHours.logDownloadArchive} className="btn-doodle press">
              Old log, 2025 to 2026
            </a>
          </div>
        </DoodleWindow>
        <DoodleWindow variant="mint" addressText="my-hours">
          <PersonalHoursTracker />
        </DoodleWindow>
      </section>
      <section className="hidden md:block mt-8">
        <Link to="/earn-more" className="press block">
          <DoodleWindow variant="gold" addressText="earn-more-hours">
            <div className="flex items-center gap-4 flex-wrap">
              <SparkleDoodle />
              <div className="flex-1 min-w-[220px]">
                <h2 className="font-display text-3xl text-ink leading-tight">
                  Need more hours? Find volunteer spots near you →
                </h2>
                <p className="font-body text-ink/80 mt-1">
                  Filter by what sounds fun. We'll show you where to sign up.
                </p>
              </div>
            </div>
          </DoodleWindow>
        </Link>
      </section>
    </div>
  );
}

function SparkleDoodle() {
  return (
    <svg width="56" height="56" viewBox="0 0 40 40" aria-hidden>
      <path d="M20 3 L24 15 L37 16 L27 25 L30 38 L20 31 L10 38 L13 25 L3 16 L16 15 Z"
        fill="#FFC966" stroke="#2B2B2B" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  );
}
