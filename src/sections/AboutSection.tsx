import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative bg-black pt-24 md:pt-36 pb-8 md:pb-12 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="relative max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-[0.25em] uppercase"
        >
          About the Chapter
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="serif mt-8 md:mt-10 text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
        >
          Recognizing <em className="serif-italic text-white/60">scholarship</em> for
          <br className="hidden md:block" /> students who lead, serve, and
          <em className="serif-italic text-white/60"> show up.</em>
        </motion.h2>
      </div>
    </section>
  );
}
