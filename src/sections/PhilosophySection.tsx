import { motion } from "framer-motion";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const pillars = [
  {
    label: "The five NJHS qualities",
    body:
      "Scholarship, Citizenship, Willingness to Serve Others, Leadership, and Character — these are the qualities every NJHS member is expected to demonstrate and grow in throughout middle school.",
  },
  {
    label: "The membership expectation",
    body:
      "Once you are inducted, you attend monthly meetings, participate in the chapter service project, submit a report card every six weeks, and maintain a 93 average with no more than 2 S’s and never a P or U in conduct.",
  },
];

export default function PhilosophySection() {
  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="serif text-white text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02] mb-16 md:mb-24"
        >
          Scholarship <em className="serif-italic text-white/40">×</em> Service
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="rounded-3xl overflow-hidden aspect-[4/3] relative"
          >
            <video
              src={VIDEO_URL}
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col"
          >
            {pillars.map((p, i) => (
              <div key={p.label}>
                <div className="py-8 md:py-10">
                  <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4">
                    {p.label}
                  </p>
                  <p className="text-white/75 text-base md:text-lg leading-relaxed">
                    {p.body}
                  </p>
                </div>
                {i < pillars.length - 1 && (
                  <div className="w-full h-px bg-white/10" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
