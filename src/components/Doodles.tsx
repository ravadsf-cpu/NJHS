// Little hand-drawn SVG decorations. Pure JSX, no deps.

export function FolderDoodle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 50" fill="none" {...props}>
      <path d="M4 10 L24 10 L30 16 L60 16 L60 44 L4 44 Z" fill="#FFC966" stroke="#2B2B2B" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M4 20 L60 20" stroke="#2B2B2B" strokeWidth="2"/>
    </svg>
  );
}

export function EnvelopeDoodle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 44" fill="none" {...props}>
      <rect x="3" y="6" width="58" height="34" rx="3" fill="#FFF5E4" stroke="#2B2B2B" strokeWidth="3"/>
      <path d="M3 8 L32 28 L61 8" stroke="#2B2B2B" strokeWidth="3" fill="none"/>
    </svg>
  );
}

export function PointerDoodle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 46" fill="none" {...props}>
      <path d="M8 4 L8 28 L4 24 L2 28 L10 42 L28 42 L30 24 L26 24 L26 18 L22 18 L22 14 L18 14 L18 10 L14 10 L14 4 Z"
        fill="#FFF5E4" stroke="#2B2B2B" strokeWidth="3" strokeLinejoin="round"/>
    </svg>
  );
}

export function CursorSparkDoodle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 60" fill="none" {...props}>
      <path d="M12 10 L12 44 L22 36 L30 50 L36 46 L28 32 L42 32 Z" fill="#2B2B2B" stroke="#2B2B2B" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M44 10 L48 18 M52 14 L46 20 M50 22 L56 24" stroke="#FFC966" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function StarDoodle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <path d="M20 3 L24 15 L37 16 L27 25 L30 38 L20 31 L10 38 L13 25 L3 16 L16 15 Z"
        fill="#FFC966" stroke="#2B2B2B" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function HeartDoodle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 44 40" fill="none" {...props}>
      <path d="M22 36 C8 26 2 18 6 10 C10 2 20 6 22 12 C24 6 34 2 38 10 C42 18 36 26 22 36 Z"
        fill="#FF7F66" stroke="#2B2B2B" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  );
}
