import type { Meeting } from "../data/meetings";
import { isPlaceholder } from "../data/site";
import DoodleWindow from "./DoodleWindow";

const colorByIndex: Array<"cream" | "gold" | "mint" | "coral"> = ["cream", "gold", "mint", "coral"];

export default function MeetingCard({ m, index }: { m: Meeting; index: number }) {
  const variant = colorByIndex[index % colorByIndex.length];
  const slidesHref = m.slidesLocal || (m.slidesUrl && !isPlaceholder(m.slidesUrl) ? m.slidesUrl : "");
  const slidesIsPlaceholder = !!m.slidesUrl && isPlaceholder(m.slidesUrl);
  return (
    <DoodleWindow variant={variant} addressText={`meeting/${m.date}`}>
      <div className="flex items-start gap-3">
        <FileIcon />
        <div className="flex-1 min-w-0">
          <div className="font-hand text-ink/80 text-base">{m.display}</div>
          {isPlaceholder(m.recap) ? (
            <span className="inline-flex items-center gap-1 align-middle mx-0.5 bg-paper border-[2px] border-dashed border-ink/60 rounded-md px-1.5 py-0.5 font-hand text-sm text-ink/80">
              <span aria-hidden>✎</span>
              <span>{m.recap}</span>
            </span>
          ) : (
            <p className="font-body text-ink mt-1 leading-snug">{m.recap}</p>
          )}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {slidesHref ? (
              <a href={slidesHref} target={slidesHref.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="btn-doodle btn-gold press">
                View slides →
              </a>
            ) : slidesIsPlaceholder ? (
              <span className="inline-flex items-center gap-1 bg-paper border-[2px] border-dashed border-ink/60 rounded-md px-1.5 py-0.5 font-hand text-sm text-ink/80">
                <span aria-hidden>✎</span>
                <span>{m.slidesUrl}</span>
              </span>
            ) : (
              <span className="font-hand text-ink/60 text-sm">No slides for this one.</span>
            )}
          </div>
        </div>
      </div>
    </DoodleWindow>
  );
}

function FileIcon() {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" aria-hidden className="shrink-0">
      <path d="M4 4 L22 4 L32 14 L32 40 L4 40 Z" fill="#FFF5E4" stroke="#2B2B2B" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M22 4 L22 14 L32 14" fill="none" stroke="#2B2B2B" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M10 22 L26 22 M10 28 L26 28 M10 34 L22 34" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
