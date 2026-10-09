import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { sortedAlerts } from "../data/site";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/news", label: "News" },
  { to: "/events", label: "Events" },
  { to: "/officers", label: "Officers" },
  { to: "/shirts", label: "Shirts" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const alertCount = sortedAlerts().filter((a) => a.urgent).length;

  return (
    <header className="sticky top-0 z-40 bg-sky-doodle/90 backdrop-blur-sm border-b-[2.5px] border-ink">
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 press">
          <span className="inline-flex items-center justify-center w-9 h-9 bg-cream ink-line-thick rounded-lg doodle-shadow-sm font-display text-xl">
            N
          </span>
          <span className="font-display text-2xl text-ink leading-none">Lanier NJHS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `press px-3 py-1.5 rounded-lg font-hand text-lg ${
                  isActive ? "bg-cream ink-line doodle-shadow-sm" : "hover:bg-white/40"
                }`
              }
            >
              {l.label}
              {l.label === "News" && alertCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-[22px] h-5 px-1 rounded-full bg-coral text-ink ink-line text-xs font-hand">
                  {alertCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden press bg-cream ink-line rounded-lg px-2 py-1 doodle-shadow-sm font-hand"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t-[2.5px] border-ink bg-sky-doodle">
          <ul className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `press block px-3 py-2 rounded-lg font-hand text-lg ${
                      isActive ? "bg-cream ink-line doodle-shadow-sm" : "bg-white/60 ink-line"
                    }`
                  }
                >
                  {l.label}
                  {l.label === "News" && alertCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center min-w-[22px] h-5 px-1 rounded-full bg-coral text-ink ink-line text-xs font-hand">
                      {alertCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
