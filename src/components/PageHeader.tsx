import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
};

export default function PageHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: Props) {
  const centered = align === "center";
  return (
    <section className="relative overflow-hidden px-6 pt-28 sm:pt-36 md:pt-44 pb-14 md:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
      <div
        className={
          "relative max-w-5xl mx-auto " + (centered ? "text-center" : "")
        }
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/40 text-xs tracking-[0.25em] uppercase mb-5"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="serif text-white text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={
              "text-white/70 text-base sm:text-lg leading-relaxed mt-6 max-w-2xl " +
              (centered ? "mx-auto" : "")
            }
          >
            {intro}
          </motion.div>
        )}
      </div>
    </section>
  );
}
