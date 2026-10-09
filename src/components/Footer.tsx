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
      <div className="mx-auto max-w-6xl px-4 py-6 grid gap-5 md:grid-cols-[1fr_auto]">
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
