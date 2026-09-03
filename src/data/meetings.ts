// ─────────────────────────────────────────────────────────────
// MEETING MINUTES — most recent first.
// After each meeting, add a new object at the TOP of the list
// with the date, bulleted summary, and slidesUrl (Google Slides).
// ─────────────────────────────────────────────────────────────

export type Meeting = {
  date: string;         // "February 11, 2026"
  summary: string[];
  slidesUrl?: string;   // link to the meeting slides
  slidesLabel?: string; // e.g. "NJHS February Meeting Slides"
};

export const meetings: Meeting[] = [
  {
    date: "February 11, 2026",
    summary: [
      "Students were reminded to make sure they had paid their dues so NJHS could pay for T-shirts and other needs.",
      "Students were reminded to continue working on their 20 volunteer hours and to sign up for a session at the Food Bank.",
      "The group created many Valentine’s Day cards for children in the hospital.",
    ],
    slidesUrl: "#",
    slidesLabel: "NJHS February Meeting Slides",
  },
  {
    date: "January 21, 2026",
    summary: [
      "Students reviewed the expectations needed to avoid probation.",
      "Students decorated colorful paper stars with their New Year’s resolutions.",
      "The stars were placed in the hallway on the third floor.",
    ],
  },
  {
    date: "December 10, 2025",
    summary: [
      "Students brought supplies to assemble goodie bags for Lanier teachers and staff.",
      "The group worked together to complete the bags.",
      "Students also collected jackets for a jacket drive.",
    ],
  },
  {
    date: "November 10, 2025",
    summary: [
      "Students collected report cards.",
      "Students wrote what they were thankful for on paper leaves as part of a Thanksgiving activity.",
      "The leaves were placed on the third-floor bulletin board to spread gratitude throughout Lanier.",
    ],
  },
  {
    date: "October 8, 2025",
    summary: [
      "Students discussed report-card information.",
      "Students discussed volunteer opportunities.",
      "Students discussed information about the officers for the year.",
      "The meeting also included an updated link for students to vote on T-shirt colors through the slideshow.",
    ],
  },
  {
    date: "September 10, 2025",
    summary: [
      "This was the first NJHS meeting of the year.",
      "Students discussed NJHS membership requirements, officer positions, dues, T-shirts, and important upcoming dates.",
    ],
    slidesUrl: "#",
    slidesLabel: "NJHS Interest Meeting Slides",
  },
];
