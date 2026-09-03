import { motion } from "framer-motion";
import { ArrowUpRight, Download, ShieldAlert, ClipboardList, GraduationCap } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { siteConfig } from "../data/siteConfig";
import { sponsors } from "../data/sponsors";

const eligibility = [
  {
    title: "Scholarship",
    body:
      "A 93 overall average for both 6th and 7th grade, including electives. Combined cycle averages must remain above 93.",
  },
  {
    title: "Conduct",
    body:
      "An E average in conduct for 6th and 7th grade. Nothing lower than 2 S’s in any subject at any time. Never a P or U on the report card.",
  },
  {
    title: "Service",
    body:
      "Evidence of participation in community-service projects outside of Lanier. Applications should document projects, hours, and impact.",
  },
  {
    title: "Standing",
    body:
      "Be in good standing with teachers and administrators. Two teacher recommendation forms are required: one from a core subject teacher and one from an elective teacher.",
  },
];

const timeline = [
  {
    label: "Complete the application",
    body:
      "8th-grade applicants complete every section in August of 8th grade. Attach copies of your 6th- and 7th-grade semester report cards (the actual report card, not a PowerSchool printout) and write the average on each.",
  },
  {
    label: "Two teacher recommendations",
    body:
      "Ask one core subject teacher and one elective teacher to complete the LMS NJHS Recommendation Form. Teachers place the form directly into Mrs. Cantu’s box — they do not return it to you.",
  },
  {
    label: "Personal statement",
    body:
      "Write a brief statement on a separate sheet of paper explaining how you have demonstrated one of the NJHS qualities — Scholarship, Citizenship, Willingness to serve others, Leadership, or Character — since entering middle school.",
  },
  {
    label: "Submit by the deadline",
    body: `Turn everything into ${siteConfig.applicationDropoffLocation} by ${siteConfig.applicationDeadline}. The NJHS committee reviews applications in the fall for 8th graders.`,
  },
];

const applicationSections = [
  {
    heading: "Student Information",
    items: ["Student Name", "Cluster", "PUPS Teacher", "Email"],
  },
  {
    heading: "Co-curricular Activities",
    items: [
      "All school activities since 6th grade — clubs, teams, musical groups, other school activities.",
      "For each entry: Activity · Grade · Accomplishments.",
    ],
  },
  {
    heading: "Leadership Positions",
    items: [
      "Only positions where you directly directed or motivated others.",
      "Examples: elected student-body officer, class officer, club officer, team captain, yearbook editor, community leader.",
    ],
  },
  {
    heading: "Service Activities",
    items: [
      "Group or individual, in-school or out-of-school.",
      "Activities performed on behalf of others, excluding immediate family, for which you received no compensation.",
    ],
  },
  {
    heading: "Other Community Activities",
    items: [
      "Non-school community activities since 6th grade, with major accomplishments.",
      "Do not repeat activities already listed in previous sections.",
    ],
  },
  {
    heading: "Work Experience, Recognition & Awards",
    items: [
      "Paid or volunteer work, plus honors and awards since 6th grade.",
      "Should support your case for NJHS membership.",
    ],
  },
];

const recommendationDims = [
  {
    title: "Leadership",
    body:
      "Resourceful, a good problem solver, promoter of school activities, idea contributor, dependable, and someone who demonstrates a positive attitude toward life. Leadership experiences can come from school or community activities while working with or for others.",
  },
  {
    title: "Character",
    body:
      "Upholds morality and ethics, cooperates with others, maintains high standards of honesty, is reliable, shows courtesy, concern for others, and respect for others.",
  },
  {
    title: "Citizenship",
    body:
      "Understands the importance of civic involvement and demonstrates mature participation and responsibility through activities such as community organizations and school clubs.",
  },
];

export default function Applications() {
  return (
    <>
      <PageHeader
        eyebrow="8th Grade Applications"
        title={
          <>
            Applying to <em className="serif-italic text-white/60">Lanier NJHS.</em>
          </>
        }
        intro={
          <>
            NJHS is open to 8th-grade students who meet the academic, conduct, and service
            requirements. Applications are reviewed by the NJHS committee in the fall.
            Completing the form <span className="text-white">does not guarantee selection.</span>
          </>
        }
      />

      <section id="deadline" className="px-6">
        <div className="max-w-5xl mx-auto liquid-glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="liquid-glass rounded-2xl p-4 self-start">
            <ShieldAlert size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-2">
              Deadline
            </p>
            <h2 className="serif text-white text-2xl md:text-3xl tracking-tight">
              {siteConfig.applicationDeadline}
            </h2>
            <p className="text-white/60 text-sm mt-3 leading-relaxed">
              Drop your completed application into {siteConfig.applicationDropoffLocation}.
              Teachers deliver recommendation forms directly to the same box — students should
              check back with their teachers to confirm the forms were completed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <a
              href={siteConfig.links.applicationPdf}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-full px-5 py-2.5 text-white text-sm flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <Download size={14} /> Application PDF
            </a>
            <a
              href={siteConfig.links.recommendationFormPdf}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-full px-5 py-2.5 text-white text-sm flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <Download size={14} /> Recommendation Form
            </a>
            <a
              href={siteConfig.links.njhsInformationPdf}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-full px-5 py-2.5 text-white text-sm flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <Download size={14} /> NJHS Information PDF
            </a>
          </div>
        </div>
      </section>

      <section id="requirements" className="px-6 pt-20 md:pt-28">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="liquid-glass rounded-full p-2 text-white">
              <GraduationCap size={16} />
            </span>
            <h2 className="serif text-white text-3xl md:text-5xl tracking-tight">
              Eligibility requirements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {eligibility.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="liquid-glass rounded-3xl p-6 md:p-7"
              >
                <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-3">
                  {e.title}
                </p>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {e.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pt-20 md:pt-28">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="liquid-glass rounded-full p-2 text-white">
              <ClipboardList size={16} />
            </span>
            <h2 className="serif text-white text-3xl md:text-5xl tracking-tight">
              How to apply
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {timeline.map((t, i) => (
              <motion.li
                key={t.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="liquid-glass rounded-3xl p-6 md:p-7"
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="serif-italic text-white/40 text-2xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="serif text-white text-xl md:text-2xl tracking-tight">
                    {t.label}
                  </h3>
                </div>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {t.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pt-20 md:pt-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4">
            Application contents
          </p>
          <h2 className="serif text-white text-3xl md:text-5xl tracking-tight mb-8 md:mb-10">
            What the form asks
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl mb-10">
            Complete every section. Don’t be modest — every piece of information will be
            used to assist the selection process. For every activity, list Activity ·
            Grade · Accomplishments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {applicationSections.map((s) => (
              <div key={s.heading} className="liquid-glass rounded-3xl p-6 md:p-7">
                <h3 className="serif text-white text-xl md:text-2xl tracking-tight mb-4">
                  {s.heading}
                </h3>
                <ul className="space-y-2">
                  {s.items.map((it, i) => (
                    <li key={i} className="flex gap-3 text-white/70 text-sm leading-relaxed">
                      <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-white/40" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pt-20 md:pt-28">
        <div className="max-w-5xl mx-auto liquid-glass rounded-3xl p-6 md:p-10">
          <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-3">
            Personal Statement
          </p>
          <h2 className="serif text-white text-3xl md:text-5xl tracking-tight leading-tight">
            Write it yourself.{" "}
            <em className="serif-italic text-white/60">100% original, no AI influence.</em>
          </h2>
          <p className="text-white/70 text-sm md:text-base leading-relaxed mt-5 max-w-3xl">
            On a separate sheet of paper, explain how you have demonstrated one of the NJHS
            qualities — Scholarship, Citizenship, Willingness to Serve Others, Leadership, or
            Character — since entering middle school. The application specifically clarifies
            that <span className="text-white">scholarship means more than simply getting good grades.</span>
          </p>
          <p className="text-white/50 text-xs mt-6 tracking-wide">
            Applicant and parent both sign and date the application to confirm the
            information is true, accurate, and complete.
          </p>
        </div>
      </section>

      <section className="px-6 pt-20 md:pt-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-4">
            Teacher Recommendation Form
          </p>
          <h2 className="serif text-white text-3xl md:text-5xl tracking-tight mb-8">
            How teachers evaluate candidates
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-3xl mb-10">
            Teachers rate each candidate using the scale: 1 – Poor · 2 – Below Average ·
            3 – Good · 4 – Outstanding · Don’t Know. They also provide additional comments
            explaining the reasoning behind each rating and sign a certification confirming
            the ratings are based on genuine interaction with the candidate. Completed forms
            go directly into {siteConfig.applicationDropoffLocation} by {siteConfig.applicationDeadline}.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendationDims.map((d) => (
              <div key={d.title} className="liquid-glass rounded-3xl p-6 md:p-7">
                <h3 className="serif text-white text-2xl tracking-tight mb-3">
                  {d.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pt-20 md:pt-28 pb-32">
        <div className="max-w-5xl mx-auto liquid-glass rounded-3xl p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-3">
              Questions?
            </p>
            <h3 className="serif text-white text-2xl md:text-4xl tracking-tight">
              Contact a chapter sponsor
            </h3>
            <p className="text-white/60 text-sm mt-3 max-w-md">
              For questions about eligibility, the application, or a recommendation form,
              reach out to any of our sponsors.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sponsors.map((s) => (
              <span
                key={s.name}
                className="liquid-glass rounded-full px-4 py-2 text-white text-sm"
              >
                {s.name}
              </span>
            ))}
          </div>
          <a
            href={siteConfig.links.applicationPdf}
            target="_blank"
            rel="noreferrer"
            className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors self-start md:self-auto"
          >
            Download application <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
