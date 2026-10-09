import { site, isPlaceholder } from "../data/site";
import DoodleWindow from "../components/DoodleWindow";
import PersonalHoursTracker from "../components/PersonalHoursTracker";
import VolunteerFinder from "../components/VolunteerFinder";

export default function CommunityService() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-10">
      <h1 className="font-display text-4xl sm:text-5xl text-ink">Community service</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">
        How hours work, and where to go for them.
      </p>

      <section className="mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <DoodleWindow variant="cream" addressText="rules">
          <h2 className="font-display text-2xl text-ink">The rules</h2>
          <ul className="font-body text-ink mt-2 space-y-1">
            <li>• Every member needs {site.serviceHours.perMemberRequired} service hours. The chapter project counts.</li>
            <li>
              • Hours log due{" "}
              {isPlaceholder(site.serviceHours.logDueDate) ? (
                <span className="inline-flex items-center gap-1 align-middle bg-paper border-[2px] border-dashed border-ink/60 rounded-md px-1.5 py-0.5 font-hand text-xs text-ink/80">
                  <span aria-hidden>✎</span>
                  <span>{site.serviceHours.logDueDate}</span>
                </span>
              ) : (
                <span>{site.serviceHours.logDueDate}</span>
              )}
              .
            </li>
            <li>• You can start counting hours the summer before 8th grade.</li>
            <li>• Under 15? Lots of places need a parent with you. Check each place's rules.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={site.serviceHours.logDownload} className="btn-doodle btn-gold press">
              Download the 2026 to 2027 log
            </a>
            <a href={site.serviceHours.logDownloadArchive} className="btn-doodle press">
              Old log (2025 to 2026)
            </a>
          </div>
        </DoodleWindow>
        <DoodleWindow variant="mint" addressText="my-hours">
          <PersonalHoursTracker />
        </DoodleWindow>
      </section>

      <section className="mt-10">
        <VolunteerFinder />
      </section>
    </div>
  );
}
