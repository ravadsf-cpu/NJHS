import { useRef, useState, type ReactNode, type CSSProperties } from "react";

type Props = {
  initialX?: number;
  initialY?: number;
  rotate?: number;
  z?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  bounds?: "parent";
};

export default function DraggableWindow({
  initialX = 0,
  initialY = 0,
  rotate = 0,
  z = 1,
  className,
  style,
  children,
  bounds = "parent",
}: Props) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const start = useRef<{ px: number; py: number; sx: number; sy: number } | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    // On touch screens, don't drag. Just wiggle and let the user keep scrolling.
    if (e.pointerType === "touch") {
      setWiggle(true);
      setTimeout(() => setWiggle(false), 450);
      return;
    }
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, sx: pos.x, sy: pos.y };
    setDragging(true);
    setWiggle(true);
    setTimeout(() => setWiggle(false), 450);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    let nx = start.current.sx + (e.clientX - start.current.px);
    let ny = start.current.sy + (e.clientY - start.current.py);
    if (bounds === "parent" && ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        const pw = parent.clientWidth;
        const ph = parent.clientHeight;
        const w = ref.current.offsetWidth;
        const h = ref.current.offsetHeight;
        nx = Math.min(pw - w, Math.max(-w * 0.1, nx));
        ny = Math.min(ph - h * 0.3, Math.max(-h * 0.1, ny));
      }
    }
    setPos({ x: nx, y: ny });
  };

  const onPointerUp = () => {
    start.current = null;
    setDragging(false);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`absolute touch-none select-none ${className || ""}`}
      style={{
        left: 0,
        top: 0,
        transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rotate}deg)`,
        zIndex: z,
        cursor: dragging ? "grabbing" : "grab",
        transition: dragging ? "none" : "transform 0.25s ease-out",
        animation: wiggle && !dragging ? "wiggle 0.4s ease-in-out" : undefined,
        ...style,
      }}
    >
      {children}
      <style>{`@keyframes wiggle { 0%,100%{} 25%{transform: translate(${pos.x}px, ${pos.y}px) rotate(${rotate - 3}deg);} 75%{transform: translate(${pos.x}px, ${pos.y}px) rotate(${rotate + 3}deg);} }`}</style>
    </div>
  );
}
