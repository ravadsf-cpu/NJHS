// Shown when an officer photo file isn't on disk yet.
// Looks like a cream polaroid with the person's first-name initial.
// No "coming soon" text, no dashed box. Just a clean neutral face card.

const colors = ["#FFF5E4", "#FFC966", "#B8F5EF", "#FF7F66"];

export default function PortraitFallback({ name }: { name: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || "N";
  const seed = (name.charCodeAt(0) + name.charCodeAt(name.length - 1)) % colors.length;
  const bg = colors[seed];
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-paper"
      aria-hidden
    >
      <div
        className="w-[70%] aspect-square rounded-full border-[2.5px] border-ink grid place-items-center"
        style={{ background: bg }}
      >
        <span className="font-display text-[64px] leading-none text-ink">{letter}</span>
      </div>
    </div>
  );
}
