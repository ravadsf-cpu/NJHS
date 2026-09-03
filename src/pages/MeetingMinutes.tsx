import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { meetings } from "../data/meetings";

export default function MeetingMinutes() {
  return (
    <>
      <PageHeader
        eyebrow="Meeting Minutes"
        title={
          <>
            What we did, <em className="serif-italic text-white/60">meeting by meeting.</em>
          </>
        }
        intro={
          <>
            This is information on what we did at our meetings. If you did not attend the
            meeting, check out what we discussed — most entries link to the actual meeting
            slides.
          </>
        }
      />

      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">
          {meetings.map((m, i) => (
            <motion.article
              key={m.date}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
              className="liquid-glass rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-2">
                    Meeting
                  </p>
                  <h3 className="serif text-white text-2xl md:text-3xl tracking-tight">
                    {m.date}
                  </h3>
                </div>
                {m.slidesUrl && (
                  <a
                    href={m.slidesUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-glass rounded-full pl-4 pr-3 py-2 text-white text-xs sm:text-sm flex items-center gap-2 hover:bg-white/5 transition-colors shrink-0"
                  >
                    <FileText size={14} />
                    <span className="hidden sm:inline">
                      {m.slidesLabel || "Slides"}
                    </span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
              <ul className="space-y-2.5 mt-4">
                {m.summary.map((line, idx) => (
                  <li key={idx} className="flex gap-3 text-white/75 text-sm md:text-base leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-2 shrink-0 w-1 h-1 rounded-full bg-white/40"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
