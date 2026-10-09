import { useId, useState, type ReactNode } from "react";
import DoodleWindow from "./DoodleWindow";
import { clsx } from "../lib/clsx";

type Variant = "cream" | "gold" | "coral" | "mint" | "white";

// Collapsed card with a doodle window chrome. One-line preview on the trigger.
// Starts collapsed on mobile. On desktop, if you pass `openOnDesktop` (default)
// it just renders expanded without the toggle.

export default function CollapseWindow({
  title,
  preview,
  variant = "cream",
  defaultOpen = false,
  openOnDesktop = true,
  addressText,
  children,
}: {
  title: string;
  preview?: string;
  variant?: Variant;
  defaultOpen?: boolean;
  openOnDesktop?: boolean;
  addressText?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  // Shared body for mobile+desktop so content is identical.
  const Body = <div className="mt-3">{children}</div>;

  return (
    <>
      {/* MOBILE: collapsible */}
      <div className="md:hidden">
        <DoodleWindow variant={variant} addressText={addressText || title.toLowerCase().replace(/\s+/g, "-")}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="press w-full flex items-center justify-between text-left gap-3"
          >
            <div className="min-w-0">
              <div className="font-display text-xl text-ink leading-tight">{title}</div>
              {preview && <div className="font-body text-sm text-ink/70 mt-0.5 truncate">{preview}</div>}
            </div>
            <span
              aria-hidden
              className={clsx("inline-flex items-center justify-center w-9 h-9 bg-paper ink-line rounded-full font-hand text-xl shrink-0 transition-transform", open && "rotate-180")}
            >
              ⌃
            </span>
          </button>
          <div id={panelId} hidden={!open}>
            {open && Body}
          </div>
        </DoodleWindow>
      </div>
      {/* DESKTOP: always open, no toggle. */}
      <div className="hidden md:block">
        <DoodleWindow variant={variant} addressText={addressText || title.toLowerCase().replace(/\s+/g, "-")}>
          {openOnDesktop ? (
            <>
              <div className="font-display text-2xl text-ink leading-tight">{title}</div>
              {Body}
            </>
          ) : (
            Body
          )}
        </DoodleWindow>
      </div>
    </>
  );
}
