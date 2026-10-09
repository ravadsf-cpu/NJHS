import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { sortedAlerts } from "../data/site";
import { clsx } from "../lib/clsx";

const tabs = [
  { to: "/", end: true, label: "Home", icon: HomeIcon },
  { to: "/important-events", label: "Events", icon: CalendarIcon },
  { to: "/earn-more", label: "Earn more", icon: SparkleIcon },
  { to: "/news", label: "News", icon: BellIcon, hasAlertCount: true },
];

const moreLinks = [
  { to: "/meeting-minutes", label: "Meeting minutes" },
  { to: "/applications", label: "8th grade applications" },
  { to: "/community-service", label: "Community service" },
  { to: "/photo-gallery", label: "Photo gallery" },
  { to: "/officer-info", label: "Officer info" },
];

export default function MobileTabBar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();
  const alertCount = sortedAlerts().filter((a) => a.urgent).length;
  const moreActive = moreLinks.some((l) => location.pathname === l.to);

  return (
    <>
      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t-[2.5px] border-ink bg-cream"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5 gap-1 px-2 pt-1.5 pb-1.5">
          {tabs.map((t) => (
            <li key={t.to}>
              <NavLink
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  clsx(
                    "press flex flex-col items-center gap-0.5 py-1 rounded-lg font-hand text-[11px] leading-tight relative",
                    isActive && "bg-gold ink-line doodle-shadow-sm active-tab"
                  )
                }
              >
                <t.icon />
                <span>{t.label}</span>
                {t.hasAlertCount && alertCount > 0 && (
                  <span className="absolute top-0 right-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-coral text-ink ink-line text-[10px] font-hand">
                    {alertCount}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={sheetOpen}
              className={clsx(
                "press w-full flex flex-col items-center gap-0.5 py-1 rounded-lg font-hand text-[11px] leading-tight",
                moreActive && "bg-gold ink-line doodle-shadow-sm"
              )}
            >
              <DotsIcon />
              <span>More</span>
            </button>
          </li>
        </ul>
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            .active-tab { animation: tabWiggle 0.35s ease-out; }
            @keyframes tabWiggle {
              0%,100% { transform: rotate(0deg); }
              40% { transform: rotate(-3deg); }
              70% { transform: rotate(3deg); }
            }
          }
        `}</style>
      </nav>

      {sheetOpen && (
        <div
          className="md:hidden fixed inset-0 z-[1200] flex items-end"
          role="dialog"
          aria-modal="true"
          aria-label="More menu"
          onClick={() => setSheetOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/55" />
          <div
            className="relative w-full bg-paper border-t-[2.5px] border-ink rounded-t-[22px] p-4 shadow-doodle"
            style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))", animation: "sheetUp 0.22s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bottom-sheet-handle" aria-hidden />
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-2xl text-ink">More</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close"
                className="press bg-cream ink-line rounded-full w-9 h-9 font-hand text-lg"
              >
                ✕
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {moreLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setSheetOpen(false)}
                    className="press block bg-cream ink-line rounded-xl p-3 font-hand text-ink text-base doodle-shadow-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 11 L12 3 L21 11 L21 21 L15 21 L15 14 L9 14 L9 21 L3 21 Z" stroke="#2B2B2B" strokeWidth="2" fill="#FFF5E4" strokeLinejoin="round"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="#2B2B2B" strokeWidth="2" fill="#B8F5EF"/>
      <path d="M3 10 L21 10" stroke="#2B2B2B" strokeWidth="2"/>
      <path d="M8 3 L8 7 M16 3 L16 7" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3 L14 10 L21 11 L15 15 L17 22 L12 18 L7 22 L9 15 L3 11 L10 10 Z" fill="#FFC966" stroke="#2B2B2B" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3 C8 3 6 6 6 10 L6 15 L4 18 L20 18 L18 15 L18 10 C18 6 16 3 12 3 Z" stroke="#2B2B2B" strokeWidth="2" fill="#FF7F66" strokeLinejoin="round"/>
      <path d="M10 20 C10 21.5 10.9 22 12 22 C13.1 22 14 21.5 14 20" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function DotsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="2" fill="#FF7F66" stroke="#2B2B2B" strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="2" fill="#FFC966" stroke="#2B2B2B" strokeWidth="1.6"/>
      <circle cx="18" cy="12" r="2" fill="#B8F5EF" stroke="#2B2B2B" strokeWidth="1.6"/>
    </svg>
  );
}
