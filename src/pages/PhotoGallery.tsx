import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { albums } from "../data/gallery";
import DoodleWindow from "../components/DoodleWindow";
import PlaceholderBox from "../components/PlaceholderBox";
import Lightbox from "../components/Lightbox";
import { FolderDoodle } from "../components/Doodles";

export default function PhotoGallery() {
  const { albumSlug } = useParams<{ albumSlug?: string }>();
  if (albumSlug) {
    const album = albums.find((a) => a.slug === albumSlug);
    if (!album) return <AlbumNotFound />;
    return <AlbumView album={album} />;
  }
  return <AlbumsIndex />;
}

function AlbumsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <div className="rounded-xl overflow-hidden border-[2.5px] border-ink doodle-shadow-sm">
        <img
          src="/photos/site/gallery-banner.jpg"
          alt="NJHS members together at a chapter meeting"
          loading="lazy"
          className="w-full aspect-[16/5] object-cover"
        />
      </div>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mt-5">Photo gallery</h1>
      <p className="font-hand text-xl text-ink/80 mt-1">
        Photos from our meetings and service projects!
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((a) => (
          <Link key={a.slug} to={`/photo-gallery/${a.slug}`} className="press">
            <DoodleWindow variant={a.color} addressText={`albums/${a.slug}`}>
              <div className="flex items-start gap-3">
                <FolderDoodle className="w-14 h-10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-ink leading-tight">{a.title}</h3>
                  {a.blurb && <p className="font-body text-ink/80 text-sm mt-0.5">{a.blurb}</p>}
                  <div className="font-hand text-ink/70 text-sm mt-1">
                    {a.photos.length > 0 ? `${a.photos.length} photos` : "Empty for now"}
                  </div>
                </div>
              </div>
              {a.photos.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-1">
                  {a.photos.slice(0, 3).map((p) => (
                    <img
                      key={p.src}
                      src={p.src}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="w-full aspect-square object-cover rounded-md border-[2px] border-ink"
                    />
                  ))}
                </div>
              )}
            </DoodleWindow>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AlbumView({ album }: { album: (typeof albums)[number] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
      <Link to="/photo-gallery" className="btn-doodle press">← Back to albums</Link>
      <h1 className="font-display text-4xl sm:text-5xl text-ink mt-3">{album.title}</h1>
      {album.blurb && <p className="font-hand text-xl text-ink/80 mt-1">{album.blurb}</p>}

      <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {album.photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="press block ink-line-thick rounded-xl overflow-hidden doodle-shadow-sm bg-paper"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="w-full aspect-square object-cover"
            />
          </button>
        ))}
        {album.placeholders?.map((label) => (
          <PlaceholderBox key={label} label={label} what="album photos" aspect="1/1" />
        ))}
      </div>

      {album.photos.length === 0 && !album.placeholders?.length && (
        <DoodleWindow variant="cream" className="mt-5">
          <p className="font-hand text-ink/70">No photos in this album yet. Check back after a meeting.</p>
        </DoodleWindow>
      )}

      {open !== null && (
        <Lightbox
          photos={album.photos}
          index={open}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((i) => (i === null ? null : (i + album.photos.length - 1) % album.photos.length))}
          onNext={() => setOpen((i) => (i === null ? null : (i + 1) % album.photos.length))}
        />
      )}
    </div>
  );
}

function AlbumNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-16 pb-10">
      <DoodleWindow variant="coral" addressText="album-not-found">
        <h1 className="font-display text-3xl text-ink">Album not found</h1>
        <p className="font-hand text-xl text-ink/80 mt-2">That album doesn't exist. Maybe it moved.</p>
        <Link to="/photo-gallery" className="btn-doodle mt-4 press inline-flex">Back to albums</Link>
      </DoodleWindow>
    </div>
  );
}
