import { motion } from "framer-motion";
import { sponsors } from "../data/sponsors";
import { siteConfig } from "../data/siteConfig";

export default function SponsorsSection() {
  return (
    <section className="bg-black px-6 pt-4 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4"
        >
          Chapter Sponsors
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="serif text-white text-3xl md:text-5xl tracking-tight mb-10"
        >
          Questions? <em className="serif-italic text-white/60">Reach out.</em>
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {sponsors.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="liquid-glass rounded-3xl px-6 py-8"
            >
              <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-2">
                Sponsor
              </p>
              <p className="serif text-white text-2xl tracking-tight">{s.name}</p>
              {s.email && (
                <a
                  href={`mailto:${s.email}`}
                  className="mt-3 inline-block text-white/60 hover:text-white text-sm transition-colors"
                >
                  {s.email}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 liquid-glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-2">
              Interest Meeting
            </p>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Slides from this year’s NJHS interest meeting are available online.
            </p>
          </div>
          <a
            href={siteConfig.links.interestMeetingSlides}
            target="_blank"
            rel="noreferrer"
            className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors self-start md:self-auto"
          >
            View slides
          </a>
        </div>
      </div>
    </section>
  );
}
