import { useState, useRef } from "react";
import { site } from "../data/site";

type Confetti = { id: number; x: number; y: number; dx: number; dy: number; color: string; rot: number };

const palette = ["#FFC966", "#FF7F66", "#B8F5EF", "#FFF5E4", "#2B2B2B"];

export default function ShirtVote() {
  const [picked, setPicked] = useState<string | null>(null);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const nextId = useRef(0);

  const fire = (x: number, y: number) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const pieces: Confetti[] = Array.from({ length: 14 }).map(() => ({
      id: nextId.current++,
      x,
      y,
      dx: (Math.random() - 0.5) * 160,
      dy: -40 - Math.random() * 120,
      color: palette[Math.floor(Math.random() * palette.length)],
      rot: Math.random() * 360,
    }));
    setConfetti((c) => [...c, ...pieces]);
    setTimeout(() => {
      setConfetti((c) => c.filter((p) => !pieces.find((pp) => pp.id === p.id)));
    }, 900);
  };

  const onPick = (id: string, e: React.MouseEvent) => {
    setPicked(id);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const parent = (e.currentTarget as HTMLElement).closest(".shirt-vote-wrap") as HTMLElement | null;
    if (parent) {
      const pRect = parent.getBoundingClientRect();
      fire(rect.left + rect.width / 2 - pRect.left, rect.top + rect.height / 2 - pRect.top);
    } else {
      fire(rect.width / 2, rect.height / 2);
    }
  };

  return (
    <div className="shirt-vote-wrap relative">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {site.shirts.options.map((opt) => {
          const selected = picked === opt.id;
          const isCombo = opt.id === "combo";
          const fillStyle = isCombo
            ? { background: opt.hex }
            : { background: opt.hex };
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              onClick={(e) => onPick(opt.id, e)}
              className={`press text-left bg-paper ink-line-thick rounded-xl p-3 doodle-shadow-sm ${selected ? "ring-4 ring-gold" : ""}`}
            >
              <div className="aspect-square rounded-lg border-[2.5px] border-ink flex items-center justify-center overflow-hidden">
                <TShirtSvg fillStyle={fillStyle} isWhite={opt.id === "white"} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-hand text-lg">{opt.name}</span>
                {selected && <span className="font-hand text-sm text-coral">picked!</span>}
              </div>
            </button>
          );
        })}
      </div>
      <p className="mt-3 font-hand text-ink/70 text-sm">
        Vote at the meeting! This is a preview only.
      </p>
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        {confetti.map((p) => (
          <span
            key={p.id}
            className="absolute w-2 h-3 rounded-sm border border-ink"
            style={{
              left: p.x,
              top: p.y,
              background: p.color,
              transform: `rotate(${p.rot}deg)`,
              animation: "confetti 0.8s ease-out forwards",
              // custom-prop injection for keyframe
              ["--dx" as any]: `${p.dx}px`,
              ["--dy" as any]: `${p.dy}px`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes confetti {
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx), calc(var(--dy) + 180px)) rotate(540deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function TShirtSvg({ fillStyle, isWhite }: { fillStyle: React.CSSProperties; isWhite?: boolean }) {
  return (
    <div
      aria-hidden
      className="w-[72%] h-[72%] relative"
      style={{ ...fillStyle, clipPath: "polygon(0% 20%, 15% 5%, 35% 0%, 65% 0%, 85% 5%, 100% 20%, 85% 32%, 85% 100%, 15% 100%, 15% 32%)" }}
    >
      {isWhite && (
        <div className="absolute inset-0 border-[2px] border-ink/40" />
      )}
    </div>
  );
}
