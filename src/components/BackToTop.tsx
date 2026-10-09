import { useEffect, useState } from "react";

// Mobile-only floating "jump to top" button. Appears after 2 screens of scroll.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={go}
      aria-label="Back to top"
      className="press md:hidden fixed right-4 w-12 h-12 bg-cream ink-line-thick rounded-full doodle-shadow font-display text-2xl text-ink z-40 flex items-center justify-center"
      style={{ bottom: "calc(80px + env(safe-area-inset-bottom))" }}
    >
      ↑
    </button>
  );
}
