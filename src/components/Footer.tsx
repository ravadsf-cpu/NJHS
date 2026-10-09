import { Link } from "react-router-dom";
import { site } from "../data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/important-events", label: "Important events" },
  { to: "/meeting-minutes", label: "Meeting minutes" },
  { to: "/applications", label: "8th grade applications" },
  { to: "/community-service", label: "Community service" },
  { to: "/photo-gallery", label: "Photo gallery" },
  { to: "/officer-info", label: "Officer info" },
  { to: "/earn-more", label: "Earn more hours" },
  { to: "/news", label: "News & alerts" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t-[2.5px] border-ink bg-cream">
      {/* MOBILE: ultra-short footer. The bottom tab bar handles nav. */}
      <div className="md:hidden px-4 py-5 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-paper ink-line-thick mb-2 overflow-hidden">
          <img src="/logo/njhs-emblem.png" alt="NJHS emblem" className="w-full h-full object-cover" />
        </div>
        <div className="font-hand text-ink">{site.footer.tagline}</div>
        <div className="mt-1 font-body text-ink/80 text-sm">
          Questions?{" "}
          <Link to="/officer-info#contact" className="underline decoration-dotted underline-offset-2">
            Email an officer
          </Link>
          .
        </div>
      </div>

      {/* DESKTOP: full footer (unchanged). */}
      <div className="hidden md:grid mx-auto max-w-6xl px-4 py-6 gap-5 md:grid-cols-[1fr_auto]">
        <div>
          <div className="font-hand text-ink text-lg">{site.footer.tagline}</div>
          <div className="mt-2 font-body text-ink/80 text-sm">
            Questions? Ask any officer at a meeting, or{" "}
            <Link to="/officer-info#contact" className="underline decoration-dotted underline-offset-2">
              email one of us
            </Link>
            .
          </div>
          <div className="mt-2 font-body text-ink/80 text-sm">
            Sponsors: {site.sponsors.map((s) => s.name).join(", ")}.
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
