import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { albums } from "../data/photos";

export default function PhotoGallery() {
  return (
    <>
      <PageHeader
        eyebrow="Photo Gallery"
        title={
          <>
            Chapter meetings and{" "}
            <em className="serif-italic text-white/60">volunteer service projects.</em>
          </>
        }
        intro={
          <>
            Photos are grouped by project and by year. The Historian and the Webmaster keep
            this gallery up to date throughout the school year.
          </>
        }
      />

      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {albums.map((album, i) => (
            <motion.div
              key={album.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: Math.min(i * 0.04, 0.2) }}
            >
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-2">
                    Album
                  </p>
                  <h2 className="serif text-white text-3xl md:text-4xl tracking-tight">
                    {album.title}
                  </h2>
                  <p className="text-white/55 text-sm mt-2 max-w-lg">{album.description}</p>
                </div>
                <span className="text-white/40 text-xs">
                  {album.photos.length} photo{album.photos.length === 1 ? "" : "s"}
                </span>
              </div>

              {album.photos.length === 0 ? (
                <div className="liquid-glass rounded-3xl p-10 md:p-14 flex flex-col items-center justify-center text-center">
                  <span className="liquid-glass rounded-full p-3 text-white/70 mb-4">
                    <Camera size={20} />
                  </span>
                  <p className="text-white/70 text-base">Photos coming soon.</p>
                  <p className="text-white/40 text-xs mt-2 max-w-md">
                    The Historian is uploading photos for this album. Check back after the
                    next chapter meeting or service event.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {album.photos.map((src) => (
                    <div
                      key={src}
                      className="liquid-glass rounded-2xl overflow-hidden aspect-[4/5]"
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
