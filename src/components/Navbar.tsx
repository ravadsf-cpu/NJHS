import { NavLink, Link } from "react-router-dom";
import { sortedAlerts } from "../data/site";
import NavDropdown from "./NavDropdown";
import SmartImage from "./SmartImage";
import { clsx } from "../lib/clsx";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/important-events", label: "Important events" },
  { to: "/meeting-minutes", label: "Meeting minutes" },
  { to: "/applications", label: "8th grade applications" },
  { to: "/community-service", label: "Community service" },
  { to: "/photo-gallery", label: "Photo gallery" },
  { to: "/officer-info", label: "Officer info" },
  { to: "/news", label: "News & alerts" },
];

function LogoMark({ size = "normal" }: { size?: "normal" | "small" }) {
  const dim = size === "small" ? "w-8 h-8" : "w-10 h-10";
  return (
    <span className={clsx("inline-flex items-center justify-center rounded-full bg-cream ink-line-thick doodle-shadow-sm overflow-hidden", dim)}>
      <SmartImage
        src="/logo/njhs-emblem.png"
        alt="NJHS emblem"
        fallback={<span className="font-display text-lg text-ink">N</span>}
      />
    </span>
  );
}

export default function Navbar() {
  const alertCount = sortedAlerts().filter((a) => a.urgent).length;

  return (
    <>
      {/* DESKTOP header. Unchanged from the previous revision. */}
      <header className="hidden md:block sticky top-0 z-40 bg-sky-doodle/90 backdrop-blur-sm border-b-[2.5px] border-ink">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 press">
            <LogoMark />
            <span className="font-display text-2xl text-ink leading-none">Lanier NJHS</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 ml-3 flex-wrap">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `press px-2.5 py-1.5 rounded-lg font-hand text-base ${
                    isActive ? "bg-cream ink-line doodle-shadow-sm" : "hover:bg-white/40"
                  }`
                }
              >
                {l.label}
                {l.label === "News & alerts" && alertCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-coral text-ink ink-line text-xs font-hand">
                    {alertCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex-1" />

          <div className="hidden lg:block">
            <NavDropdown />
          </div>
        </div>
      </header>

      {/* MOBILE slim top bar: emblem + name only, always visible. */}
      <header
        className={clsx(
          "md:hidden sticky top-0 z-40 bg-sky-doodle/90 backdrop-blur-sm border-b-[2px] border-ink"
        )}
      >
        <div className="px-4 py-1.5 flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 press">
            <LogoMark size="small" />
            <span className="font-display text-xl text-ink leading-none">Lanier NJHS</span>
          </Link>
        </div>
      </header>
    </>
  );
}
