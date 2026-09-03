import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

type Card = {
  tag: string;
  title: string;
  description: string;
  video: string;
  to: string;
};

const cards: Card[] = [
  {
    tag: "Members",
    title: "Meeting Minutes & Chapter Projects",
    description:
      "Missed a meeting? Every meeting is documented with a summary and a link to the slides. Catch up in minutes.",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
    to: "/meeting-minutes",
  },
  {
    tag: "8th Graders",
    title: "Applications & Recommendations",
    description:
      "Requirements, deadlines, the application PDF, and the teacher recommendation form — everything you need to apply.",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
    to: "/applications",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <h2 className="serif text-white text-3xl md:text-5xl tracking-tight">
            What you’ll find here
          </h2>
          <p className="hidden md:block text-white/40 text-sm">Our resources</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.15 }}
              className="liquid-glass rounded-3xl overflow-hidden group"
            >
              <Link to={c.to} className="block">
                <div className="relative aspect-video overflow-hidden">
                  <video
                    src={c.video}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-white/40 text-xs tracking-[0.25em] uppercase">
                      {c.tag}
                    </span>
                    <span className="liquid-glass rounded-full p-2 text-white/85 transition-transform group-hover:-translate-y-0.5">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <h3 className="serif text-white text-xl md:text-2xl mb-3 tracking-tight leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
