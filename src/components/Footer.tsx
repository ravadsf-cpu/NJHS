import { Link } from "react-router-dom";
import { site, isPlaceholder } from "../data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/important-events", label: "Important events" },
  { to: "/meeting-minutes", label: "Meeting minutes" },
  { to: "/applications", label: "8th grade applications" },
  { to: "/community-service", label: "Community service" },
  { to: "/photo-gallery", label: "Photo gallery" },
  { to: "/officer-info", label: "Officer info" },
  { to: "/news", label: "News & alerts" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t-[2.5px] border-ink bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-6 grid gap-5 md:grid-cols-[1fr_auto]">
        <div>
          <div className="font-hand text-ink text-lg">{site.footer.tagline}</div>
          <div className="mt-2 font-body text-ink/80 text-sm">
            Questions? Ask an officer at a meeting, or email a sponsor:
          </div>
          <ul className="mt-1 font-body text-ink/80 text-sm space-y-0.5">
            {site.sponsors.map((s) => (
              <li key={s.name}>
                <span className="font-hand">{s.name}</span>
                {isPlaceholder(s.email) ? (
                  <>
                    {" "}·{" "}
                    <span className="inline-flex items-center gap-1 bg-paper border-[2px] border-dashed border-ink/60 rounded-md px-1.5 py-0.5 font-hand text-xs text-ink/80">
                      <span aria-hidden>✎</span>
                      <span>{s.email}</span>
                    </span>
                  </>
                ) : (
                  <>
                    {" "}·{" "}
                    <a className="underline decoration-dotted underline-offset-2" href={`mailto:${s.email}`}>{s.email}</a>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="font-body text-ink/60 text-xs mt-2">
            We don't post student emails here. Those have student ID numbers in them.
          </div>
        </div>
        <nav className="md:text-right">
          <ul className="flex flex-wrap md:justify-end gap-x-3 gap-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="press font-hand text-ink/80 hover:text-ink text-base underline decoration-dotted underline-offset-2"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
