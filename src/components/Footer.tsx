import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";
import { sponsors } from "../data/sponsors";

const navGroups = [
  {
    heading: "Members",
    links: [
      { to: "/events", label: "Important Events" },
      { to: "/meeting-minutes", label: "Meeting Minutes" },
      { to: "/community-service", label: "Community Service" },
      { to: "/photo-gallery", label: "Photo Gallery" },
    ],
  },
  {
    heading: "Applicants",
    links: [
      { to: "/applications", label: "8th Grade Applications" },
      { to: "/applications#requirements", label: "Eligibility Requirements" },
      { to: "/applications#deadline", label: "Deadline & Drop-off" },
    ],
  },
  {
    heading: "About",
    links: [
      { to: "/officers", label: "Officers" },
      { to: "/", label: "Home" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">
            {siteConfig.school}
          </p>
          <h2 className="serif text-3xl sm:text-4xl leading-[1.1] text-white tracking-tight">
            {siteConfig.organization}
          </h2>
          <p className="text-white/50 text-sm mt-5 max-w-sm leading-relaxed">
            The information hub for current and prospective NJHS members. For questions,
            contact any of our chapter sponsors below.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {sponsors.map((s) => (
              <span
                key={s.name}
                className="liquid-glass rounded-full px-3 py-1.5 text-white/80 text-xs"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {navGroups.map((g) => (
          <div key={g.heading} className="md:col-span-2">
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">
              {g.heading}
            </p>
            <ul className="space-y-2.5">
              {g.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-3">
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">
            {siteConfig.schoolYear}
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={siteConfig.links.duesPay}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Pay Dues (SchoolPay)
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.serviceHoursLog}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Service Hours Log (PDF)
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.applicationPdf}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                8th Grade Application (PDF)
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.recommendationFormPdf}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Teacher Recommendation Form (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} {siteConfig.organization}. A chapter of the National
            Junior Honor Society at {siteConfig.school}.
          </p>
          <p className="text-white/30 text-xs">
            Site maintained by the NJHS Webmaster & Historian.
          </p>
        </div>
      </div>
    </footer>
  );
}
