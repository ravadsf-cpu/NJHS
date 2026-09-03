import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { officers } from "../data/officers";
import { siteConfig } from "../data/siteConfig";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

export default function Officers() {
  return (
    <>
      <PageHeader
        eyebrow={`Officer Info · ${siteConfig.schoolYear}`}
        title={
          <>
            The <em className="serif-italic text-white/60">five</em> officers leading Lanier NJHS.
          </>
        }
        intro={
          <>
            Officers organize meetings, run projects, communicate with sponsors, and keep the
            chapter running. Anyone within NJHS who is interested is eligible to apply for an
            officer position.
          </>
        }
      />

      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {officers.map((o, i) => (
            <motion.article
              key={o.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: Math.min(i * 0.06, 0.3) }}
              className="liquid-glass rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-6 md:p-8 flex items-start gap-5">
                {o.photo ? (
                  <img
                    src={o.photo}
                    alt={o.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl liquid-glass shrink-0 flex items-center justify-center serif-italic text-white/85 text-3xl">
                    {initials(o.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-2">
                    {o.role}
                  </p>
                  <h3 className="serif text-white text-2xl md:text-3xl tracking-tight leading-tight">
                    {o.name}
                  </h3>
                  <p className="text-white/65 text-sm mt-3 leading-relaxed">
                    {o.description}
                  </p>
                </div>
              </div>
              <div className="mx-6 md:mx-8 h-px bg-white/10" />
              <div className="p-6 md:p-8">
                <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-3">
                  Responsibilities
                </p>
                <ul className="space-y-2">
                  {o.responsibilities.map((r, idx) => (
                    <li key={idx} className="flex gap-3 text-white/75 text-sm leading-relaxed">
                      <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-white/40" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
