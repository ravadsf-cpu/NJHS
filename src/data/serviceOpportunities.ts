// ─────────────────────────────────────────────────────────────
// SERVICE OPPORTUNITIES — updated by the VP / Sponsors.
// Add or remove entries as new opportunities open up.
// ─────────────────────────────────────────────────────────────

export type ServiceOpportunity = {
  name: string;
  description: string;
  link?: string;    // sign-up link, if any
  cadence?: string; // e.g. "Rolling", "One-time", "Monthly"
};

export const serviceOpportunities: ServiceOpportunity[] = [
  {
    name: "Food Bank",
    description:
      "Sign up for a session at the local Food Bank. NJHS runs recurring group volunteer slots throughout the year.",
    cadence: "Rolling",
  },
  {
    name: "Chapter Project — Teacher Goodie Bags",
    description:
      "Bring supplies to a designated chapter meeting and assemble goodie bags for Lanier teachers and staff.",
    cadence: "Annual",
  },
  {
    name: "Chapter Project — Valentine’s Day Cards",
    description:
      "Make Valentine’s Day cards for children in the hospital during the February chapter meeting.",
    cadence: "Annual",
  },
  {
    name: "Thanksgiving Supply Drive",
    description:
      "Bring Thanksgiving supplies to the November chapter meeting.",
    cadence: "Annual",
  },
  {
    name: "Jacket Drive",
    description:
      "Collect and donate jackets during the winter chapter meeting.",
    cadence: "Annual",
  },
  {
    name: "Oak Forest Foster Closet",
    description:
      "Support the Oak Forest Foster Closet through donations and volunteer time.",
    cadence: "Rolling",
  },
];
