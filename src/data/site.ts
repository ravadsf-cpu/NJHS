// Single source of truth. Edit here, pages update automatically.

export const site = {
  name: "Lanier NJHS",
  longName: "Lanier National Junior Honor Society",
  school: "Lanier Middle School",
  schoolYear: "2026-2027",
  url: "njhs.vercel.app",

  tagline: "Service, events, and deadlines. All in one spot.",

  // Group photo on the home page.
  groupPhoto: "/photos/site/group-2025-26.png",
  groupPhotoCaption: "Our NJHS crew",

  // Pay dues on SchoolPay.
  schoolPayUrl:
    "https://www.schoolpay.com/pay/for/LANIER--NATIONAL-JUNIOR-HONOR-SOCIETY--2/SED0NW",

  // Interest meeting slides.
  interestMeetingSlidesUrl:
    "https://docs.google.com/presentation/d/1yogMbLvUHxl98fsNqlZnmspI24CMOUv3dd4rJmVuVv8/edit?usp=sharing",

  // Short intro video from the old site.
  youtubeEmbedUrl: "https://www.youtube.com/embed/hxhBQSKaIC4",

  // October 2026 meeting slides.
  octoberSlidesUrl: "/downloads/slides/2026-10-meeting.pdf",

  // Chapter service hours progress.
  serviceHours: {
    goal: 2000,
    perMemberRequired: 20,
    current: 0,                                 // update as hours come in
    logDueDisplay: "Due in January 2027",
    logDownload: "/downloads/service-hours-log-2026-27.pdf",
    logDownloadArchive: "/downloads/service-hours-log-2025-26.pdf",
  },

  // Officers. School emails are stored split (ID + domain) so bots that scrape
  // the raw HTML don't get a complete address. The UI stitches them together
  // in the browser only when a card renders.
  officers: [
    {
      name: "Andrew DelaGarza",
      first: "Andrew",
      role: "President",
      photo: "/photos/officers/andrew-delagarza.jpg",
      color: "coral" as const,
      duties:
        "Runs the club with the sponsors, leads meetings, and plans service projects with the other officers.",
      emailUser: "S2008874",
      emailDomain: "online.houstonisd.org",
    },
    {
      name: "Elinam Dzakpasu",
      first: "Elinam",
      role: "Vice President",
      photo: "/photos/officers/elinam-dzakpasu.jpg",
      color: "gold" as const,
      duties:
        "Talks to the organizations we volunteer with and works with the sponsors to set things up.",
      emailUser: "S1974511",
      emailDomain: "online.houstonisd.org",
    },
    {
      name: "Audrey Chen",
      first: "Audrey",
      role: "Secretary",
      photo: "/photos/officers/audrey-chen.jpg",
      color: "mint" as const,
      duties:
        "Helps the sponsors stay organized, takes attendance, and writes down what happens at meetings.",
      emailUser: "S1973908",
      emailDomain: "online.houstonisd.org",
    },
    {
      name: "Lily Pham",
      first: "Lily",
      role: "Historian",
      photo: "/photos/officers/lily-pham.jpg",
      color: "cream" as const,
      duties:
        "Takes photos of everything we do, works with the Webmaster to post them here, and makes the end-of-year album.",
      emailUser: "S2262208",
      emailDomain: "online.houstonisd.org",
    },
    {
      name: "Adi Sanghavi",
      first: "Adi",
      role: "Webmaster",
      photo: "/photos/officers/adi-sanghavi.jpg",
      color: "coral" as const,
      duties:
        "Runs this website and our purple page posts, and works with the Historian to spread the word around school.",
      emailUser: "S2019399",
      emailDomain: "online.houstonisd.org",
    },
  ],

  sponsors: [
    { name: "Ms. Elena Cantu" },
    { name: "Mr. Juan Castillo" },
    { name: "Ms. Vaclavik" },
  ],

  goals: [
    {
      title: "Relationships",
      color: "coral" as const,
      body: "Make real friendships with kids at our school and around the community.",
    },
    {
      title: "Change",
      color: "mint" as const,
      body: "Leave a lasting mark by showing what NJHS can be when everyone puts in the effort.",
    },
    {
      title: "Service",
      color: "gold" as const,
      body: "Hit 2,000 service hours as a chapter.",
    },
  ],

  // Meeting schedule for the year. Status derived from today's date.
  meetingSchedule: [
    { date: "2026-09-09", kind: "meeting" as const, title: "Chapter meeting #1", bring: "" },
    { date: "2026-10-15", kind: "meeting" as const, title: "Chapter meeting #2", bring: "" },
    { date: "2026-10-23", kind: "event"   as const, title: "Roberts International Festival", bring: "" },
    { date: "2026-11-11", kind: "meeting" as const, title: "Chapter meeting #3", bring: "Thanksgiving supplies" },
    { date: "2026-12-09", kind: "meeting" as const, title: "Chapter meeting #4", bring: "Teacher goodie bag supplies" },
    { date: "2027-01-06", kind: "meeting" as const, title: "Chapter meeting #5", bring: "" },
    { date: "2027-02-10", kind: "meeting" as const, title: "Chapter meeting #6", bring: "Valentine's card supplies" },
    { date: "2027-03-01", kind: "break"   as const, title: "No meeting in March", bring: "" },
    { date: "2027-04-14", kind: "meeting" as const, title: "Chapter meeting #7", bring: "" },
    { date: "2027-05-01", kind: "event"   as const, title: "Induction and luncheon", bring: "", displayDate: "May 2027" },
  ],

  // Events page detail: Roberts Festival.
  events: [
    {
      id: "roberts-festival-2026",
      title: "Roberts International Festival",
      date: "2026-10-23",
      time: "4:00 to 6:30 PM",
      location: "Roberts Elementary",
      schedule: [
        "3:30 to 4:00 PM: Setup",
        "4:00 to 6:30 PM: Country booths",
        "6:30 to 7:30 PM: Cleanup",
      ],
      about:
        "A yearly community event celebrating cultures from around the world, with performances, activities, and booths about different countries and backgrounds.",
      signupNote: "Sign-up link is in Ms. Cantu's email.",
      photo: "/photos/events/roberts-international-festival.jpg",
    },
  ],

  applications: {
    gpaRequirement: "3.7 GPA or 93 average or higher",
    conductRequirement: "An E in conduct",
    outsideServiceRequirement: "Community service outside of Lanier",
    fall2026Deadline: "2026-08-26",
    fall2026DeadlineTime: "4:00 PM",
    dropoffLocation: "Mrs. Cantu's box in Office B",
    spring2027OpenDisplay: "Spring 2027",
    questionsFor: ["Mrs. Cantu", "Mr. Castillo", "Mrs. Vaclavik"],
    downloads: [
      { name: "8th grade application", file: "/downloads/8th-grade-application.pdf" },
      { name: "Teacher recommendation form", file: "/downloads/teacher-recommendation-form.pdf" },
      { name: "NJHS info packet", file: "/downloads/njhs-information.pdf" },
    ],
    flyerImage: "/photos/site/aug-njhs-flyer.jpg",
  },

  // Alerts for the News & alerts page + top banner.
  alerts: [
    {
      id: "pay-dues",
      type: "deadline" as const,
      title: "Pay your dues",
      message:
        "Haven't turned in NJHS dues yet? Do it by Friday, October 16, 2026 or you'll be put on probation.",
      posted: "2026-10-01",
      dueDate: "2026-10-16",
      urgent: true,
      actions: [{ label: "Pay on SchoolPay", kind: "external" as const, href: "@schoolpay" }],
    },
    {
      id: "report-card",
      type: "deadline" as const,
      title: "Turn in your report card",
      message:
        "When you get your report card, drop it in Ms. Cantu's box in Office B. Need another copy? Ask the Attendance Office. Due by Friday, October 16, 2026 or you'll be put on probation.",
      posted: "2026-10-01",
      dueDate: "2026-10-16",
      urgent: true,
      actions: [],
    },
    {
      id: "contracts-overdue",
      type: "deadline" as const,
      title: "Contracts are overdue",
      message:
        "Contracts were due Wednesday, September 23. If you still haven't turned yours in, do it ASAP or you'll be put on probation. Make sure you actually read it first.",
      posted: "2026-09-24",
      dueDate: "2026-09-23",
      urgent: true,
      actions: [],
    },
    {
      id: "hours-log",
      type: "announcement" as const,
      title: "Hours log due",
      message:
        "The service hours log is due in January 2027. You need 20 hours total. Download the log, fill it in, and hand it to Ms. Cantu.",
      posted: "2026-10-05",
      dueDate: "",
      urgent: false,
      actions: [{ label: "Download the log", kind: "internal" as const, href: "/downloads/service-hours-log-2026-27.pdf" }],
    },
    {
      id: "earn-more-hours",
      type: "announcement" as const,
      title: "Need more hours?",
      message:
        "Our new Earn more hours page has tons of volunteer spots around Houston. Filter by what sounds fun and you'll get sign-ups.",
      posted: "2026-10-09",
      dueDate: "",
      urgent: false,
      actions: [{ label: "Open Earn more hours", kind: "route" as const, href: "/earn-more" }],
    },
    {
      id: "roberts-festival",
      type: "announcement" as const,
      title: "Roberts Festival sign-ups",
      message:
        "Shifts for the Roberts International Festival are open. Pick a time slot that works. The sign-up link is in Ms. Cantu's email.",
      posted: "2026-10-05",
      dueDate: "2026-10-23",
      urgent: false,
      actions: [{ label: "See the event", kind: "route" as const, href: "/important-events" }],
    },
    {
      id: "library-pass",
      type: "announcement" as const,
      title: "Get your NJHS pass",
      message:
        "You need a pass to come to meetings in the library. No pass, no meeting. Lost yours? Go see Ms. Vaclavik in room 314.",
      posted: "2026-09-20",
      dueDate: "",
      urgent: false,
      actions: [],
    },
    {
      id: "new-site",
      type: "goodnews" as const,
      title: "We have a new website!",
      message: "You're on it. Bookmark it: njhs.vercel.app",
      posted: "2026-10-09",
      dueDate: "",
      urgent: false,
      actions: [],
    },
    {
      id: "oct-15-meeting",
      type: "announcement" as const,
      title: "Last meeting: October 15",
      message: "Missed it? Here's the recap.",
      posted: "2026-10-16",
      dueDate: "",
      urgent: false,
      actions: [{ label: "View slides", kind: "internal" as const, href: "/downloads/slides/2026-10-meeting.pdf" }],
    },
    // Template. Uncomment and edit to add a new alert.
    // {
    //   id: "unique-id",
    //   type: "announcement",
    //   title: "Short title",
    //   message: "What members need to know.",
    //   posted: "YYYY-MM-DD",
    //   dueDate: "",
    //   urgent: false,
    //   actions: [],
    // },
  ],

  // Shirt color vote. Lives on News & alerts as a pinned top card.
  shirts: {
    options: [
      { id: "blue",  name: "Blue",  hex: "#2E86AB" },
      { id: "white", name: "White", hex: "#FFFFFF" },
      { id: "gold",  name: "Gold",  hex: "#FFC966" },
      { id: "combo", name: "Combo", hex: "linear-gradient(135deg,#2E86AB 0 33%,#FFFFFF 33% 66%,#FFC966 66% 100%)" },
    ],
  },

  checklist: [
    { id: "dues",       label: "Dues paid" },
    { id: "reportcard", label: "Report card turned in" },
    { id: "contract",   label: "Contract turned in" },
    { id: "pass",       label: "Library pass picked up" },
  ],

  footer: {
    tagline: "Lanier NJHS. Made by students.",
  },
};

export type Officer = (typeof site.officers)[number];
export type AlertItem = (typeof site.alerts)[number];
export type SiteEvent = (typeof site.events)[number];
export type ShirtOption = (typeof site.shirts.options)[number];
export type MeetingSlot = (typeof site.meetingSchedule)[number];

export function parseDate(v: string | undefined | null): Date | null {
  if (!v) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v.trim());
  if (m) {
    const [, y, mo, da] = m;
    const d = new Date(Number(y), Number(mo) - 1, Number(da));
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

export function isPastEvent(dateStr: string, now = new Date()): boolean {
  const d = parseDate(dateStr);
  if (!d) return false;
  const endOfDay = new Date(d);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime() < now.getTime();
}

export function activeAlerts(dismissed: string[] = []): AlertItem[] {
  return site.alerts.filter((a) => !dismissed.includes(a.id));
}

export function sortedAlerts(dismissed: string[] = []): AlertItem[] {
  const list = activeAlerts(dismissed).slice();
  list.sort((a, b) => {
    if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
    return (b.posted || "").localeCompare(a.posted || "");
  });
  return list;
}

export function nextDeadline(): { title: string; date: string } | null {
  const now = new Date();
  const candidates = site.alerts
    .filter((a) => a.dueDate)
    .map((a) => ({ title: a.title, date: a.dueDate, d: parseDate(a.dueDate) }))
    .filter((x): x is { title: string; date: string; d: Date } => x.d !== null && x.d.getTime() >= now.getTime())
    .sort((a, b) => a.d.getTime() - b.d.getTime());
  if (candidates.length === 0) return null;
  return { title: candidates[0].title, date: candidates[0].date };
}

export function resolveActionHref(href: string): string {
  if (href === "@schoolpay") return site.schoolPayUrl;
  return href;
}

// Browser-only email assembly, so the raw HTML never contains the full address.
export function officerEmail(o: Officer): string {
  return `${o.emailUser}@${o.emailDomain}`;
}
