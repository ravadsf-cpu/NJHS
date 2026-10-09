import { useEffect, useRef } from "react";

export default function CursorSparkle() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const layer = layerRef.current;
    if (!layer) return;

    const colors = ["#FFC966", "#FF7F66", "#B8F5EF", "#2B2B2B"];

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("input, textarea, select")) return;
      for (let i = 0; i < 7; i++) {
        const s = document.createElement("span");
        s.textContent = "✦";
        s.style.position = "fixed";
        s.style.left = `${e.clientX}px`;
        s.style.top = `${e.clientY}px`;
        s.style.color = colors[Math.floor(Math.random() * colors.length)];
        s.style.fontSize = `${10 + Math.random() * 14}px`;
        s.style.pointerEvents = "none";
        s.style.transform = "translate(-50%, -50%)";
        s.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";
        layer.appendChild(s);
        const dx = (Math.random() - 0.5) * 60;
        const dy = -20 - Math.random() * 50;
        requestAnimationFrame(() => {
          s.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${Math.random() * 180}deg)`;
          s.style.opacity = "0";
        });
        setTimeout(() => s.remove(), 650);
      }
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return <div ref={layerRef} aria-hidden className="fixed inset-0 pointer-events-none z-[1000]" />;
}
