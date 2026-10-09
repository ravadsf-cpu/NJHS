import type { ReactNode, CSSProperties } from "react";
import { clsx } from "../lib/clsx";

type Variant = "cream" | "gold" | "coral" | "mint" | "white";

const variantBg: Record<Variant, string> = {
  cream: "bg-cream",
  gold: "bg-gold",
  coral: "bg-coral",
  mint: "bg-mint",
  white: "bg-paper",
};

type Props = {
  title?: string;
  variant?: Variant;
  showAddress?: boolean;
  addressText?: string;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
  rotate?: number;
  as?: "div" | "article" | "section";
  style?: CSSProperties;
};

export default function DoodleWindow({
  title,
  variant = "cream",
  showAddress = true,
  addressText,
  children,
  className,
  bodyClassName,
  rotate,
  as = "div",
  style,
}: Props) {
  const Tag = as;
  const transform = rotate !== undefined ? `rotate(${rotate}deg)` : undefined;
  return (
    <Tag
      className={clsx(
        "relative ink-line-thick doodle-shadow rounded-[22px_26px_22px_28px/26px_22px_28px_22px] overflow-hidden",
        variantBg[variant],
        className
      )}
      style={{ transform, ...style }}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b-[2.5px] border-ink bg-white/60">
        <span className="window-tab-dots inline-flex items-center">
          <span style={{ background: "#FF7F66" }} />
          <span style={{ background: "#FFC966" }} />
          <span style={{ background: "#B8F5EF" }} />
        </span>
        {showAddress && (
          <div className="flex-1 flex items-center gap-1 min-w-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-ink/70 text-sm">
              <span aria-hidden>←</span>
              <span aria-hidden>→</span>
            </span>
            <div className="flex-1 min-w-0 bg-paper border-[2px] border-ink rounded-full px-3 py-0.5 font-hand text-ink/80 text-sm truncate">
              {addressText || title || ""}
            </div>
          </div>
        )}
        {!showAddress && title && (
          <div className="flex-1 font-hand text-ink text-lg truncate">{title}</div>
        )}
      </div>
      <div className={clsx("p-5 sm:p-6", bodyClassName)}>{children}</div>
    </Tag>
  );
}
