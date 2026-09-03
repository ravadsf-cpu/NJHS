// ─────────────────────────────────────────────────────────────
// SITE CONFIG — webmaster edits this once per school year.
// Change the schoolYear string and the links below, and every
// page that references them updates automatically.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  organization: "Lanier National Junior Honor Society",
  shortName: "Lanier NJHS",
  school: "Lanier Middle School",
  schoolYear: "2026–2027",

  // Reminders shown on the homepage
  serviceHoursRequired: 20,
  duesAmountUSD: 60,
  gpaRequirement: "3.7 GPA / 93 average",

  // Application deadline (used on Home + Applications pages)
  applicationDeadline: "August 26, 2026 at 4:00 PM",
  applicationDropoffLocation: "Mrs. Cantu’s box in Office B",

  // External links — replace with real URLs each year
  links: {
    duesPay: "https://www.schoolpay.com/",              // 2026–2027 SchoolPay dues link
    duesQrImage: "",                                     // optional /images/dues-qr.png
    serviceHoursLog: "#",                                // 2026–2027 Service Hours Log PDF
    applicationPdf: "#",                                 // 8th Grade NJHS Application PDF
    recommendationFormPdf: "#",                          // LMS NJHS Recommendation Form PDF
    njhsInformationPdf: "#",                             // 15-page NJHS Information PDF
    interestMeetingSlides: "#",                          // "slides from the interest meeting"
  },
} as const;
