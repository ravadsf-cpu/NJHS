import { useRef, useState } from "react";

type Answer = "yes" | "no" | null;

const questions = [
  { id: "gpa",     label: "GPA 93 or higher?" },
  { id: "conduct", label: "E in conduct?" },
  { id: "service", label: "Service outside Lanier?" },
] as const;

const palette = ["#FFC966", "#FF7F66", "#B8F5EF", "#FFF5E4"];

export default function EligibilityChecker() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({ gpa: null, conduct: null, service: null });
  const confettiHostRef = useRef<HTMLDivElement | null>(null);

  const set = (id: string, v: Answer, e: React.MouseEvent) => {
    const next = { ...answers, [id]: v };
    setAnswers(next);
    const allYes = Object.values(next).every((a) => a === "yes");
    if (allYes) fire(e.currentTarget as HTMLElement);
  };

  const result = (() => {
    const vals = Object.values(answers);
    if (vals.some((a) => a === null)) return null;
    if (vals.every((a) => a === "yes")) {
      return { ok: true, text: "You can apply! Grab the application below." };
    }
    const miss: string[] = [];
    if (answers.gpa === "no") miss.push("GPA just under 93? Keep an eye on it; the committee may ask.");
    if (answers.conduct === "no") miss.push("Conduct not at E yet? That can change this semester.");
    if (answers.service === "no") miss.push("No service outside Lanier yet? Try one from the Volunteer Finder.");
    return { ok: false, text: miss.join(" ") };
  })();

  const fire = (anchor: HTMLElement) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const host = confettiHostRef.current;
    if (!host) return;
    const hostRect = host.getBoundingClientRect();
    const r = anchor.getBoundingClientRect();
    const x = r.left + r.width / 2 - hostRect.left;
    const y = r.top + r.height / 2 - hostRect.top;
    for (let i = 0; i < 18; i++) {
      const s = document.createElement("span");
      s.className = "absolute w-2 h-3 rounded-sm border border-ink";
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;
      s.style.background = palette[Math.floor(Math.random() * palette.length)];
      s.style.transform = `rotate(${Math.random() * 360}deg)`;
      s.style.animation = "confetti2 0.9s ease-out forwards";
      s.style.setProperty("--dx", `${(Math.random() - 0.5) * 220}px`);
      s.style.setProperty("--dy", `${-60 - Math.random() * 100}px`);
      host.appendChild(s);
      setTimeout(() => s.remove(), 950);
    }
  };

  return (
    <div className="relative" ref={confettiHostRef}>
      <h3 className="font-display text-2xl text-ink mb-3">Eligibility checker</h3>
      <p className="font-body text-ink/80 text-sm mb-3">
        Tap through all three. The NJHS committee makes the final call.
      </p>
      <ul className="space-y-3">
        {questions.map((q) => (
          <li key={q.id} className="bg-paper ink-line rounded-xl p-3 doodle-shadow-sm">
            <div className="font-hand text-lg text-ink mb-2">{q.label}</div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => set(q.id, "yes", e)}
                aria-pressed={answers[q.id] === "yes"}
                className={`btn-doodle press ${answers[q.id] === "yes" ? "btn-mint ring-4 ring-ink/20" : ""}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={(e) => set(q.id, "no", e)}
                aria-pressed={answers[q.id] === "no"}
                className={`btn-doodle press ${answers[q.id] === "no" ? "btn-coral ring-4 ring-ink/20" : ""}`}
              >
                No
              </button>
            </div>
          </li>
        ))}
      </ul>
      {result && (
        <div className={`mt-4 ink-line-thick rounded-xl p-3 font-hand text-ink ${result.ok ? "bg-mint" : "bg-cream"} animate-pop`}>
          {result.text}
        </div>
      )}
      <style>{`
        @keyframes confetti2 {
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx), calc(var(--dy) + 200px)) rotate(540deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
