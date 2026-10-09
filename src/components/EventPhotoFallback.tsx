// Shown when an event photo file isn't on disk yet.
// Soft cream card with the event title in handwritten font. No dashed box.

export default function EventPhotoFallback({ title }: { title: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-cream text-center p-4"
      aria-hidden
    >
      <svg width="48" height="40" viewBox="0 0 48 40" className="mb-2">
        <rect x="4" y="10" width="40" height="26" rx="4" fill="#FFF5E4" stroke="#2B2B2B" strokeWidth="2.5" />
        <rect x="16" y="4" width="16" height="8" rx="2" fill="#FFF5E4" stroke="#2B2B2B" strokeWidth="2.5" />
        <circle cx="24" cy="23" r="7" fill="#B8F5EF" stroke="#2B2B2B" strokeWidth="2.5" />
        <circle cx="36" cy="16" r="2" fill="#FF7F66" stroke="#2B2B2B" strokeWidth="1" />
      </svg>
      <span className="font-hand text-ink text-base leading-tight">{title}</span>
    </div>
  );
}
