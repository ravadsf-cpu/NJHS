import { clsx } from "../lib/clsx";

type Props = {
  label: string;           // the [[PLACEHOLDER]] text
  what?: string;           // human-readable "what goes here"
  aspect?: "3/4" | "16/9" | "1/1" | "4/3" | "auto";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
  "auto": "",
};

export default function PlaceholderBox({
  label,
  what,
  aspect = "auto",
  size = "md",
  className,
}: Props) {
  const padding = size === "sm" ? "p-3" : size === "lg" ? "p-8" : "p-5";
  return (
    <div
      role="img"
      aria-label={`Placeholder for ${label}`}
      className={clsx(
        "w-full relative flex flex-col items-center justify-center text-center text-ink/70 bg-white/60",
        "border-[2.5px] border-dashed border-ink/60 rounded-xl",
        aspectClass[aspect],
        padding,
        className
      )}
    >
      <svg width="36" height="30" viewBox="0 0 36 30" aria-hidden className="mb-2">
        <rect x="2" y="7" width="32" height="20" rx="3" fill="#FFF5E4" stroke="#2B2B2B" strokeWidth="2"/>
        <rect x="12" y="3" width="12" height="6" rx="1.5" fill="#FFF5E4" stroke="#2B2B2B" strokeWidth="2"/>
        <circle cx="18" cy="17" r="5" fill="#B8F5EF" stroke="#2B2B2B" strokeWidth="2"/>
        <circle cx="28" cy="12" r="1.5" fill="#FF7F66" stroke="#2B2B2B" strokeWidth="1"/>
      </svg>
      <div className="font-hand text-base leading-tight">{label}</div>
      {what && <div className="font-body text-xs mt-1 text-ink/60 leading-tight">{what}</div>}
    </div>
  );
}
