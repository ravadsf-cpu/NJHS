import { useState } from "react";
import type { Officer } from "../data/site";
import { isPlaceholder } from "../data/site";
import DoodleWindow from "./DoodleWindow";
import PlaceholderBox from "./PlaceholderBox";
import { clsx } from "../lib/clsx";

type Props = { officer: Officer };

const colorToVariant: Record<Officer["color"], "cream" | "gold" | "coral" | "mint"> = {
  cream: "cream",
  gold: "gold",
  coral: "coral",
  mint: "mint",
};

export default function OfficerFlipCard({ officer }: Props) {
  const [flipped, setFlipped] = useState(false);
  const variant = colorToVariant[officer.color];

  const toggle = () => setFlipped((f) => !f);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="w-full" style={{ perspective: "1200px" }}>
      <button
        type="button"
        onClick={toggle}
        onKeyDown={onKey}
        aria-pressed={flipped}
        aria-label={`${officer.name}, ${officer.role}. Tap to see what they do.`}
        className="relative w-full text-left press"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={clsx("relative transition-transform duration-500")}
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT */}
          <div style={{ backfaceVisibility: "hidden" }}>
            <DoodleWindow variant={variant} addressText={officer.name.toLowerCase().replace(/\s+/g, "")}>
              <div className="flex flex-col items-center">
                {isPlaceholder(officer.photo) ? (
                  <PlaceholderBox
                    label={officer.photo}
                    what="portrait photo, 3:4"
                    aspect="3/4"
                    className="w-full max-w-[220px]"
                  />
                ) : (
                  <img
                    src={officer.photo}
                    alt={`${officer.name}, ${officer.role}`}
                    loading="lazy"
                    className="w-full max-w-[220px] aspect-[3/4] object-cover rounded-xl border-[2.5px] border-ink doodle-shadow-sm"
                  />
                )}
                <div className="mt-3 text-center">
                  <div className="font-hand text-2xl text-ink leading-tight">{officer.name}</div>
                  <div className="font-body text-sm text-ink/70">{officer.role}</div>
                </div>
                <div className="mt-2 font-hand text-xs text-ink/60">Tap to see what they do</div>
              </div>
            </DoodleWindow>
          </div>
          {/* BACK */}
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <DoodleWindow variant={variant} addressText="role.txt">
              <div className="min-h-[320px] flex flex-col text-left">
                <div className="font-display text-2xl text-ink leading-tight">{officer.name}</div>
                <div className="font-hand text-ink/70 text-base">{officer.role}</div>
                <div className="mt-2 font-body text-ink text-sm leading-snug">{officer.duties}</div>
                <div className="mt-3">
                  <div className="font-hand text-ink/70 text-xs uppercase tracking-wide">Fun fact</div>
                  {isPlaceholder(officer.funFact) ? (
                    <div className="mt-1">
                      <PlaceholderBox label={officer.funFact} what="one fun fact, one sentence" aspect="auto" size="sm" />
                    </div>
                  ) : (
                    <p className="font-body text-ink text-sm mt-1">{officer.funFact}</p>
                  )}
                </div>
                <div className="mt-auto font-hand text-xs text-ink/60 pt-2">Tap to flip back</div>
              </div>
            </DoodleWindow>
          </div>
        </div>
      </button>
    </div>
  );
}
