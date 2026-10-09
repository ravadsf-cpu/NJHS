import { useEffect, useState } from "react";
import { clsx } from "../lib/clsx";

// Sticky horizontal pill tabs. Each tab anchors to an id in the page.
// Highlights the tab whose section is currently on screen.

type Tab = { id: string; label: string };

export default function PillTabs({ tabs, className }: { tabs: Tab[]; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id || "");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0% -60% 0%", threshold: 0 }
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [tabs]);

  const onClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  };

  return (
    <div
      className={clsx(
        "md:hidden sticky top-[52px] z-30 -mx-4 px-4 py-2 bg-sky-doodle/95 backdrop-blur-sm border-b border-ink/20",
        className
      )}
    >
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            onClick={(e) => onClick(e, t.id)}
            aria-current={active === t.id}
            className={clsx(
              "press shrink-0 font-hand text-base px-3 py-1 ink-line rounded-full doodle-shadow-sm whitespace-nowrap",
              active === t.id ? "bg-gold" : "bg-paper"
            )}
          >
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}
