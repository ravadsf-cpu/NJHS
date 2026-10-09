import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Item = { to: string; label: string; icon?: React.ReactNode };

const items: Item[] = [
  {
    to: "/earn-more",
    label: "Earn more hours",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
        <path d="M10 2 L12 8 L18 9 L13.5 13 L15 19 L10 15.5 L5 19 L6.5 13 L2 9 L8 8 Z" fill="#FFC966" stroke="#2B2B2B" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

type Props = { onItemClick?: () => void; variant?: "nav" | "menu" };

export default function NavDropdown({ onItemClick, variant = "nav" }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleItemClick = () => {
    setOpen(false);
    onItemClick?.();
  };

  const isMenuVariant = variant === "menu";

  return (
    <div ref={wrapperRef} className={isMenuVariant ? "w-full" : "relative"}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More"
        className={
          isMenuVariant
            ? "press w-full flex items-center justify-between gap-2 bg-white/60 ink-line rounded-lg px-3 py-2 font-hand text-lg"
            : "press bg-cream ink-line rounded-lg px-2 py-1 doodle-shadow-sm font-hand text-xl leading-none"
        }
      >
        <span aria-hidden>•••</span>
        {isMenuVariant && <span className="text-sm text-ink/70 font-hand">{open ? "Close" : "Open"}</span>}
      </button>

      {open && (
        <div
          role="menu"
          className={
            isMenuVariant
              ? "mt-2"
              : "absolute right-0 top-full mt-2 w-[220px] z-50"
          }
        >
          <div className="bg-paper ink-line-thick rounded-[14px_18px_14px_20px/18px_14px_20px_14px] doodle-shadow overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 border-b-[2.5px] border-ink bg-cream">
              <span className="window-tab-dots inline-flex items-center">
                <span style={{ background: "#FF7F66" }} />
                <span style={{ background: "#FFC966" }} />
                <span style={{ background: "#B8F5EF" }} />
              </span>
              <span className="font-hand text-ink/70 text-sm">more</span>
            </div>
            <ul className="py-1">
              {items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    role="menuitem"
                    onClick={handleItemClick}
                    className="press flex items-center gap-2 px-3 py-2 font-hand text-ink text-lg hover:bg-cream"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
