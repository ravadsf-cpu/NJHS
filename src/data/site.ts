// Single source of truth. Edit here, pages update automatically.
// Anywhere you see "[[LIKE_THIS]]" it shows as a dashed placeholder box on the site.

export const site = {
  name: "Lanier NJHS",
  longName: "Lanier National Junior Honor Society",
  school: "Lanier Middle School",
  schoolYear: "2025-2026",
  url: "[[SITE_URL]]",

  tagline: "Service, events, and deadlines. All in one spot.",
  heroPhotoSlot: "[[HERO_PHOTO]]",

  // Chapter service hours goal + current progress (hook this up when you have a count)
  serviceHours: {
    goal: 2000,
    currentPlaceholder: "[[CURRENT_HOURS]]",
    current: 0, // numeric fallback for the bar until the real count is in
  },

  // Officers. Portrait photos (3:4). Fun fact slot goes on the back of the flip card.
  officers: [
    { name: "Andrew DelaGarza", role: "President",       photo: "[[PHOTO_ANDREW]]", funFact: "[[FUNFACT_ANDREW]]", color: "coral" as const },
    { name: "Elinam Dzakpasu",  role: "Vice President",  photo: "[[PHOTO_ELINAM]]", funFact: "[[FUNFACT_ELINAM]]", color: "gold"  as const },
    { name: "Audrey Chen",      role: "Secretary",       photo: "[[PHOTO_AUDREY]]", funFact: "[[FUNFACT_AUDREY]]", color: "mint"  as const },
    { name: "Lily Pham",        role: "Historian",       photo: "[[PHOTO_LILY]]",   funFact: "[[FUNFACT_LILY]]",   color: "cream" as const },
    { name: "Adi Sanghavi",     role: "Webmaster",       photo: "[[PHOTO_ADI]]",    funFact: "[[FUNFACT_ADI]]",    color: "coral" as const },
  ],

  goals: [
    { title: "Relationships", color: "coral" as const, body: "Make real friendships with kids at our school and around the community." },
    { title: "Change",        color: "mint"  as const, body: "Leave a lasting mark by showing what NJHS can be when everyone puts in the effort." },
    { title: "Service",       color: "gold"  as const, body: "Hit 2,000 service hours as a chapter." },
  ],

  // Events. Upcoming are listed as-is. Past events show up on the Past Events section automatically.
  events: [
    {
      id: "roberts-festival-2025",
      title: "Roberts International Festival",
      date: "2025-10-23",
      time: "4:00 to 6:30 PM",
      location: "Roberts Elementary",
      schedule: [
        "3:30 to 4:00 PM: Setup",
        "4:00 to 6:30 PM: Country booths",
        "6:30 to 7:30 PM: Cleanup",
      ],
      about: "A yearly community event celebrating cultures from around the world, with performances, activities, and booths about different countries and backgrounds.",
      signupLink: "[[SIGNUP_LINK_ROBERTS]]",
      photo: "[[PHOTO_ROBERTS_FESTIVAL]]",
    },
    {
      id: "event-2",
      title: "[[EVENT_2]]",
      date: "",
      time: "",
      location: "",
      schedule: [],
      about: "",
      signupLink: "",
      photo: "",
    },
    {
      id: "event-3",
      title: "[[EVENT_3]]",
      date: "",
      time: "",
      location: "",
      schedule: [],
      about: "",
      signupLink: "",
      photo: "",
    },
  ],

  pastEventPhotosSlot: "[[PAST_EVENT_PHOTOS]]",

  // The next big deadline (used by countdown on home). Pick the earliest "deadline"-type alert, or override here.
  nextDeadline: {
    title: "Dues due",
    date: "[[DUES_DEADLINE_DATE]]",
  },

  // Alerts for the News & Alerts page + banner. Order matters: urgent first.
  // type: "deadline" | "announcement" | "goodnews"
  // Add a new one by copying the commented template at the bottom of this array.
  alerts: [
    {
      id: "pay-dues",
      type: "deadline" as const,
      title: "Pay your dues",
      message: "Haven't turned in NJHS dues yet? Do it by Friday [[DUES_DEADLINE_DATE]] or you'll be put on probation.",
      posted: "2025-10-01",
      dueDate: "[[DUES_DEADLINE_DATE]]",
      urgent: true,
    },
    {
      id: "report-card",
      type: "deadline" as const,
      title: "Turn in your report card",
      message: "When you get your report card, drop it in Ms. Cantu's box in Office B. Need another copy? Ask the Attendance Office. Due by Friday [[REPORT_CARD_DEADLINE_DATE]] or you'll be put on probation.",
      posted: "2025-10-01",
      dueDate: "[[REPORT_CARD_DEADLINE_DATE]]",
      urgent: true,
    },
    {
      id: "contracts-overdue",
      type: "deadline" as const,
      title: "Contracts are overdue",
      message: "Contracts were due Wednesday, September 23. If you still haven't turned yours in, do it ASAP or you'll be put on probation. Make sure you actually read it first.",
      posted: "2025-09-24",
      dueDate: "2025-09-23",
      urgent: true,
    },
    {
      id: "library-pass",
      type: "announcement" as const,
      title: "Get your NJHS pass",
      message: "You need a pass to come to meetings in the library. No pass, no meeting. Lost yours? Go see Ms. Vaclavik in room 314.",
      posted: "2025-09-20",
      dueDate: "",
      urgent: false,
    },
    {
      id: "shirt-vote",
      type: "announcement" as const,
      title: "Vote on shirt colors",
      message: "We're picking NJHS shirt colors: blue, white, gold, or a combo. Check out the options on the Shirts page.",
      posted: "2025-10-05",
      dueDate: "",
      urgent: false,
    },
    {
      id: "new-site",
      type: "goodnews" as const,
      title: "We have a new website!",
      message: "You're on it. Bookmark it: [[SITE_URL]]",
      posted: "2025-10-09",
      dueDate: "",
      urgent: false,
    },
    {
      id: "oct-15-meeting",
      type: "announcement" as const,
      title: "Last meeting: October 15",
      message: "Missed it? Here's the recap: [[MEETING_SLIDES_LINK]]",
      posted: "2025-10-16",
      dueDate: "",
      urgent: false,
    },
    // Template. Uncomment and edit to add a new alert.
    // {
    //   id: "unique-id",
    //   type: "announcement", // or "deadline" or "goodnews"
    //   title: "Short title",
    //   message: "What members need to know.",
    //   posted: "YYYY-MM-DD",
    //   dueDate: "", // optional, triggers a countdown
    //   urgent: false,
    // },
  ],

  // T-shirt color options. Winner slot gets filled in after the vote.
  shirts: {
    options: [
      { id: "blue",  name: "Blue",   hex: "#2E86AB" },
      { id: "white", name: "White",  hex: "#FFFFFF" },
      { id: "gold",  name: "Gold",   hex: "#FFC966" },
      { id: "combo", name: "Combo",  hex: "linear-gradient(135deg,#2E86AB 0 33%,#FFFFFF 33% 66%,#FFC966 66% 100%)" },
    ],
    designImage: "[[SHIRT_DESIGN_IMAGE]]",
    winner: "[[SHIRT_VOTE_RESULT]]",
  },

  // Checklist shown on home. 4 items so the completion state is satisfying.
  checklist: [
    { id: "dues",       label: "Dues paid" },
    { id: "reportcard", label: "Report card turned in" },
    { id: "contract",   label: "Contract turned in" },
    { id: "pass",       label: "Library pass picked up" },
  ],

  // Contact. Do NOT list student emails (they contain student ID numbers).
  contact: {
    sponsorName: "[[SPONSOR_NAME]]",
    sponsorEmail: "[[SPONSOR_EMAIL]]",
    questionsFormLink: "[[QUESTIONS_FORM_LINK]]",
    note: "Questions? Ask any officer at a meeting or send us a message here.",
  },

  footer: {
    tagline: "Lanier NJHS. Made by students.",
  },
};

export type Officer = (typeof site.officers)[number];
export type AlertItem = (typeof site.alerts)[number];
export type SiteEvent = (typeof site.events)[number];
export type ShirtOption = (typeof site.shirts.options)[number];

export function isPlaceholder(v: string | undefined | null): boolean {
  if (!v) return false;
  return /^\[\[.+\]\]$/.test(v.trim());
}

// Returns null if date is a placeholder or empty, otherwise a Date.
export function parseDate(v: string | undefined | null): Date | null {
  if (!v) return null;
  if (isPlaceholder(v)) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

export function isPastEvent(dateStr: string, now = new Date()): boolean {
  const d = parseDate(dateStr);
  if (!d) return false;
  // Count the whole event day as not-past until midnight after.
  const endOfDay = new Date(d);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime() < now.getTime();
}

export function activeAlerts(dismissed: string[] = []): AlertItem[] {
  return site.alerts.filter(a => !dismissed.includes(a.id));
}

export function sortedAlerts(dismissed: string[] = []): AlertItem[] {
  const list = activeAlerts(dismissed).slice();
  list.sort((a, b) => {
    if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
    return (b.posted || "").localeCompare(a.posted || "");
  });
  return list;
}
