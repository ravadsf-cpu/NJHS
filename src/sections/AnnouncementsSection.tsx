import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Calendar, HandHeart, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

const items = [
  {
    icon: HandHeart,
    label: "Reminder",
    title: `${siteConfig.serviceHoursRequired} volunteer hours required`,
    detail:
      "Don’t forget — 20 hours are required, including the chapter project. Log yours in the service log.",
    linkLabel: "Service log",
    to: "/community-service",
  },
  {
    icon: Clock,
    label: "Dues",
    title: `${siteConfig.schoolYear} dues are $${siteConfig.duesAmountUSD}`,
    detail:
      "Current members: double-check you’ve paid via SchoolPay. Dues cover T-shirts, luncheon, and project supplies.",
    linkLabel: "Pay via SchoolPay",
    to: siteConfig.links.duesPay,
    external: true,
  },
  {
    icon: Calendar,
    label: "8th Graders",
    title: `Applications due ${siteConfig.applicationDeadline}`,
    detail: `Drop applications into ${siteConfig.applicationDropoffLocation}. Two teacher recommendations required.`,
    linkLabel: "Application details",
    to: "/applications",
  },
];

export default function AnnouncementsSection() {
  return (
    <section className="relative bg-black px-6 pt-20 md:pt-28 pb-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-white/40 text-xs tracking-[0.25em] uppercase mb-3"
            >
              Important Dates
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="serif text-white text-3xl sm:text-4xl md:text-5xl tracking-tight"
            >
              For current and incoming <em className="serif-italic text-white/60">members.</em>
            </motion.h2>
          </div>
          <Link
            to="/events"
            className="hidden md:inline-block text-white/60 hover:text-white text-sm transition-colors"
          >
            Full calendar →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            const Card = (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="liquid-glass rounded-3xl p-6 md:p-7 h-full flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="liquid-glass rounded-full p-2.5 text-white/85">
                      <Icon size={18} />
                    </span>
                    <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">
                      {it.label}
                    </span>
                  </div>
                  <h3 className="serif text-white text-2xl md:text-[26px] leading-[1.1] tracking-tight mb-3">
                    {it.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{it.detail}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-white/80 group-hover:text-white text-sm transition-colors">
                  {it.linkLabel}
                  <ArrowUpRight size={16} />
                </div>
              </motion.article>
            );
            return it.external ? (
              <a key={i} href={it.to} target="_blank" rel="noreferrer" className="block h-full">
                {Card}
              </a>
            ) : (
              <Link key={i} to={it.to} className="block h-full">
                {Card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
