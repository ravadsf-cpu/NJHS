import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/meeting-minutes", label: "Meeting Minutes" },
  { to: "/applications", label: "Applications" },
  { to: "/community-service", label: "Community Service" },
  { to: "/photo-gallery", label: "Photo Gallery" },
  { to: "/officers", label: "Officers" },
];

export default function Navbar({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={
        "w-full px-4 sm:px-6 py-4 sm:py-6 " +
        (variant === "overlay" ? "relative z-20" : "sticky top-0 z-30 bg-black/60 backdrop-blur")
      }
    >
      <nav className="liquid-glass rounded-full max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <span
              aria-hidden
              className="w-7 h-7 rounded-full liquid-glass flex items-center justify-center serif-italic text-white text-base"
            >
              L
            </span>
            <span className="text-white font-semibold text-sm sm:text-base tracking-tight truncate">
              {siteConfig.shortName}
            </span>
          </Link>
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 ml-2">
            {links.slice(1).map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    "text-sm font-medium transition-colors " +
                    (isActive ? "text-white" : "text-white/70 hover:text-white")
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.links.duesPay}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block text-white text-sm font-medium hover:text-white/80 transition-colors"
          >
            Pay Dues
          </a>
          <Link
            to="/applications"
            className="liquid-glass rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Apply
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden liquid-glass rounded-full p-2 text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm pt-24 px-6 overflow-y-auto">
          <ul className="max-w-md mx-auto flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    "block liquid-glass rounded-2xl px-5 py-4 text-lg tracking-tight " +
                    (isActive ? "text-white" : "text-white/80 hover:text-white")
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-4">
              <a
                href={siteConfig.links.duesPay}
                target="_blank"
                rel="noreferrer"
                className="block liquid-glass rounded-2xl px-5 py-4 text-lg text-white"
              >
                Pay Dues
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
