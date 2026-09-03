import { motion } from "framer-motion";
import { Download, Users, HeartHandshake, Info } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { siteConfig } from "../data/siteConfig";
import { serviceOpportunities } from "../data/serviceOpportunities";

const rules = [
  {
    icon: HeartHandshake,
    title: "20 hours, including the chapter project",
    body:
      "Every NJHS member commits to 20 hours of community service. The required chapter project counts toward those hours.",
  },
  {
    icon: Users,
    title: "Under 15? Bring a parent",
    body:
      "Students younger than 15 should seek opportunities where their parents can attend with them. Always check the requirements of each volunteer opportunity.",
  },
  {
    icon: Info,
    title: "Start early — summer counts",
    body:
      "You may begin collecting hours the summer before 8th grade. Watch the Important Events page for upcoming volunteer opportunities.",
  },
];

export default function CommunityService() {
  return (
    <>
      <PageHeader
        eyebrow="Community Service"
        title={
          <>
            {siteConfig.serviceHoursRequired} hours.{" "}
            <em className="serif-italic text-white/60">One chapter, many hands.</em>
          </>
        }
        intro={
          <>
            Community service is part of the commitment made by every NJHS member. This page
            explains the requirement, the rules, current volunteer opportunities, and links
            to the downloadable {siteConfig.schoolYear} service log.
          </>
        }
      />

      <section className="px-6">
        <div className="max-w-5xl mx-auto liquid-glass rounded-3xl p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-2">
              {siteConfig.schoolYear} Service Log
            </p>
            <h2 className="serif text-white text-2xl md:text-4xl tracking-tight leading-tight">
              Track every hour on the official log.
            </h2>
            <p className="text-white/60 text-sm mt-3 leading-relaxed max-w-xl">
              The log records the date, description of activity, name and signature of the
              supervising adult, and hours for each service activity — with multiple spaces
              per page.
            </p>
          </div>
          <a
            href={siteConfig.links.serviceHoursLog}
            target="_blank"
            rel="noreferrer"
            className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors self-start md:self-auto"
          >
            <Download size={14} /> Download log (PDF)
          </a>
        </div>
      </section>

      <section className="px-6 pt-20 md:pt-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4">The rules</p>
          <h2 className="serif text-white text-3xl md:text-5xl tracking-tight mb-10">
            Before you sign up
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {rules.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="liquid-glass rounded-3xl p-6 md:p-7"
                >
                  <span className="liquid-glass rounded-full p-2.5 inline-flex text-white mb-5">
                    <Icon size={18} />
                  </span>
                  <h3 className="serif text-white text-xl md:text-2xl tracking-tight mb-3">
                    {r.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">{r.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pt-20 md:pt-28 pb-32">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4">
            Volunteer opportunities
          </p>
          <h2 className="serif text-white text-3xl md:text-5xl tracking-tight mb-10">
            Where to start
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {serviceOpportunities.map((o, i) => (
              <motion.div
                key={o.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="liquid-glass rounded-3xl p-6 md:p-7 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="serif text-white text-xl md:text-2xl tracking-tight">
                      {o.name}
                    </h3>
                    {o.cadence && (
                      <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase">
                        {o.cadence}
                      </span>
                    )}
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed">{o.description}</p>
                </div>
                {o.link && (
                  <a
                    href={o.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 self-start liquid-glass rounded-full px-5 py-2 text-white text-sm hover:bg-white/5 transition-colors"
                  >
                    Sign up →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
