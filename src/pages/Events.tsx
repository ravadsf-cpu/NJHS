import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { events, type NjhsEvent } from "../data/events";

const statusStyle: Record<NjhsEvent["status"], { dot: string; label: string; text: string }> = {
  finished: { dot: "bg-emerald-400", label: "Finished", text: "text-emerald-300" },
  upcoming: { dot: "bg-rose-400", label: "Upcoming", text: "text-rose-300" },
  meeting: { dot: "bg-sky-400", label: "Chapter Meeting", text: "text-sky-300" },
};

export default function Events() {
  return (
    <>
      <PageHeader
        eyebrow="Important Events"
        title={
          <>
            Past &amp; future <em className="serif-italic text-white/60">events.</em>
          </>
        }
        intro={
          <>
            The Important Events page is the chapter calendar. Meetings, projects, induction,
            and the luncheon all live here. Use the legend to tell what’s finished, what’s
            coming up, and which dates are chapter meetings.
          </>
        }
      />

      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto liquid-glass rounded-3xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(statusStyle).map(([key, s]) => (
            <div key={key} className="flex items-center gap-3">
              <span className={"w-2.5 h-2.5 rounded-full " + s.dot} aria-hidden />
              <div>
                <p className="text-white text-sm">{s.label}</p>
                <p className="text-white/40 text-xs">
                  {key === "finished" && "Events already completed."}
                  {key === "upcoming" && "Coming up on the calendar."}
                  {key === "meeting" && "Monthly NJHS chapter meetings."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <ol className="relative">
            <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-white/10" aria-hidden />
            {events.map((e, i) => {
              const s = statusStyle[e.status];
              return (
                <motion.li
                  key={e.date + e.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4) }}
                  className="relative pl-12 sm:pl-16 py-5"
                >
                  <span
                    className={
                      "absolute left-2.5 sm:left-4 top-8 w-3.5 h-3.5 rounded-full ring-4 ring-black " +
                      s.dot
                    }
                    aria-hidden
                  />
                  <div className="liquid-glass rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className={"text-xs tracking-[0.25em] uppercase " + s.text}>
                        {e.date}
                      </p>
                      <h3 className="serif text-white text-2xl md:text-[26px] tracking-tight leading-tight mt-1">
                        {e.title}
                      </h3>
                      {e.detail && (
                        <p className="text-white/60 text-sm mt-2 leading-relaxed">
                          {e.detail}
                        </p>
                      )}
                    </div>
                    <span className="text-white/50 text-xs whitespace-nowrap">
                      {s.label}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
