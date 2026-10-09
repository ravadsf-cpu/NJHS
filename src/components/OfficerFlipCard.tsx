import { useState } from "react";
import type { Officer } from "../data/site";
import DoodleWindow from "./DoodleWindow";
import SmartImage from "./SmartImage";
import PortraitFallback from "./PortraitFallback";
import OfficerEmail from "./OfficerEmail";
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

  const slug = officer.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full" style={{ perspective: "1200px" }}>
      <div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.5s",
        }}
      >
        {/* FRONT */}
        <div style={{ backfaceVisibility: "hidden" }}>
          <button
            type="button"
            onClick={toggle}
            onKeyDown={onKey}
            aria-pressed={flipped}
            aria-label={`${officer.name}, ${officer.role}. Tap to see what they do.`}
            className="relative w-full text-left press"
          >
            <DoodleWindow variant={variant} addressText={slug}>
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[220px] aspect-[3/4] rounded-xl border-[2.5px] border-ink doodle-shadow-sm overflow-hidden bg-paper">
                  <SmartImage
                    src={officer.photo}
                    alt={`${officer.name}, ${officer.role}`}
                    objectPosition="center top"
                    fallback={<PortraitFallback name={officer.first} />}
                  />
                </div>
                <div className="mt-3 text-center">
                  <div className="font-hand text-2xl text-ink leading-tight">{officer.name}</div>
                  <div className="font-body text-sm text-ink/70">{officer.role}</div>
                </div>
                <div className="mt-2 font-hand text-xs text-ink/60">Tap to see what they do</div>
              </div>
            </DoodleWindow>
          </button>
        </div>
        {/* BACK */}
        <div
          className={clsx(flipped ? "absolute inset-0" : "hidden")}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <DoodleWindow variant={variant} addressText="role.txt">
            <div className="flex flex-col text-left">
              <div className="font-display text-2xl text-ink leading-tight">{officer.name}</div>
              <div className="font-hand text-ink/70 text-base">{officer.role}</div>
              <p className="mt-2 font-body text-ink text-sm leading-snug">{officer.duties}</p>
              <div className="mt-3">
                <div className="font-hand text-ink/70 text-xs uppercase tracking-wide">Email</div>
                <div className="mt-1">
                  <OfficerEmail user={officer.emailUser} domain={officer.emailDomain} name={officer.name} />
                </div>
              </div>
              <button type="button" onClick={toggle} className="mt-4 self-start btn-doodle press">
                Flip back
              </button>
            </div>
          </DoodleWindow>
        </div>
      </div>
    </div>
  );
}
