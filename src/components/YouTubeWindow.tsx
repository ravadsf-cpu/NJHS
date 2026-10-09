import { useEffect, useRef, useState } from "react";
import DoodleWindow from "./DoodleWindow";

type Props = { url: string; title: string };

export default function YouTubeWindow({ url, title }: Props) {
  const [play, setPlay] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Lazy-load the iframe when the window scrolls into view, so the YouTube
  // player doesn't ship kilobytes before anyone cares.
  useEffect(() => {
    if (!ref.current || play) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPlay(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [play]);

  return (
    <DoodleWindow variant="white" addressText="video.player">
      <div ref={ref} className="relative w-full aspect-video rounded-xl overflow-hidden border-[2.5px] border-ink doodle-shadow-sm bg-ink">
        {play ? (
          <iframe
            src={url}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-ink text-paper font-hand text-xl press"
            aria-label={`Play ${title}`}
          >
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="inline-block w-10 h-10 rounded-full border-[2.5px] border-paper bg-coral text-ink grid place-items-center">
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden><path d="M5 3 L17 10 L5 17 Z" fill="currentColor"/></svg>
              </span>
              Play the video
            </span>
          </button>
        )}
      </div>
    </DoodleWindow>
  );
}
