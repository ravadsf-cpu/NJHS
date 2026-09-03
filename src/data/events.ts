// ─────────────────────────────────────────────────────────────
// EVENTS — the chapter calendar. Webmaster updates each year.
//
// status:
//   "finished" — GREEN in the legend
//   "upcoming" — RED in the legend
//   "meeting"  — BLUE in the legend (NJHS chapter meetings)
//
// The Important Events page originally listed the dates below
// without an explicit school year. Verify the year before
// publishing to a live calendar.
// ─────────────────────────────────────────────────────────────

export type NjhsEvent = {
  date: string;        // human-readable, e.g. "September 9"
  isoDate?: string;    // optional ISO for sorting once school year is confirmed
  title: string;
  detail?: string;
  status: "finished" | "upcoming" | "meeting";
};

export const events: NjhsEvent[] = [
  { date: "September 9",  title: "NJHS Chapter Meeting #1", status: "meeting" },
  { date: "October 7",    title: "NJHS Chapter Meeting #2", status: "meeting" },
  {
    date: "November 11",
    title: "NJHS Chapter Meeting #3",
    detail: "Bring Thanksgiving supplies.",
    status: "meeting",
  },
  {
    date: "December 9",
    title: "NJHS Chapter Meeting #4",
    detail: "Bring teacher goodie-bag supplies.",
    status: "meeting",
  },
  { date: "January 6",   title: "NJHS Chapter Meeting #5", status: "meeting" },
  {
    date: "February 10",
    title: "NJHS Chapter Meeting #6",
    detail: "Bring Valentine’s Day card supplies.",
    status: "meeting",
  },
  { date: "March",      title: "No March meeting",       status: "upcoming" },
  { date: "April 14",   title: "NJHS Chapter Meeting #7", status: "meeting" },
  { date: "May",        title: "NJHS Induction",         status: "upcoming" },
  { date: "May",        title: "NJHS Luncheon",          status: "upcoming" },
];
