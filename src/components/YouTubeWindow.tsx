import { useState } from "react";
import DoodleWindow from "./DoodleWindow";

type Props = { url: string; title: string };

function thumbFromEmbed(url: string): string | null {
  // https://www.youtube.com/embed/<id>
  const m = /youtube\.com\/embed\/([A-Za-z0-9_-]+)/.exec(url);
  if (!m) return null;
  return `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`;
}

export default function YouTubeWindow({ url, title }: Props) {
  const [play, setPlay] = useState(false);
  const thumb = thumbFromEmbed(url);

  return (
    <DoodleWindow variant="white" addressText="video.player">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border-[2.5px] border-ink doodle-shadow-sm bg-ink">
        {play ? (
          <iframe
            src={`${url}?autoplay=1`}
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
            className="absolute inset-0 w-full h-full press"
            aria-label={`Play ${title}`}
          >
            {thumb && (
              <img
                src={thumb}
                alt=""
                aria-hidden
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 bg-ink/85 text-paper font-hand text-lg px-3 py-2 rounded-full border-[2.5px] border-paper">
                <span aria-hidden className="inline-flex w-7 h-7 rounded-full bg-coral text-ink items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden><path d="M5 3 L17 10 L5 17 Z" fill="currentColor"/></svg>
                </span>
                Play the video
              </span>
            </span>
          </button>
        )}
      </div>
    </DoodleWindow>
  );
}
