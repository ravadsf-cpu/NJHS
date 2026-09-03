// ─────────────────────────────────────────────────────────────
// OFFICERS — webmaster updates each year after elections.
// Add `photo: "/images/officers/first-last.jpg"` when available.
// ─────────────────────────────────────────────────────────────

export type Officer = {
  role: string;
  name: string;
  photo?: string;
  description: string;
  responsibilities: string[];
};

export const officers: Officer[] = [
  {
    role: "President",
    name: "Prince Albert Esteban",
    description:
      "Leads the organization, works with sponsors, leads meetings, and meets with other officers to organize community-service projects.",
    responsibilities: [
      "Leads the organization",
      "Works with sponsors",
      "Leads meetings",
      "Meets with other officers to organize community-service projects",
      "Organizes and presents at meetings",
      "Helps set dates",
      "Helps organize volunteering opportunities",
    ],
  },
  {
    role: "Vice President",
    name: "Mia Varughese",
    description:
      "Takes the lead in organizing and communicating with community-service organizations, and works with sponsors to communicate with service-organization liaisons.",
    responsibilities: [
      "Takes the lead in organizing and communicating with community-service organizations",
      "Works with sponsors to communicate with service-organization liaisons",
      "Reaches out to volunteering organizations",
      "Presents at meetings",
      "Helps create meeting slides",
    ],
  },
  {
    role: "Secretary",
    name: "Rayan Bhardwaj",
    description:
      "Helps sponsors with organization, takes attendance, and documents meeting discussions.",
    responsibilities: [
      "Helps sponsors with organization",
      "Takes attendance",
      "Documents meeting discussions",
      "Takes notes during general meetings",
      "Takes notes during officer meetings",
      "Tracks dates and important information",
    ],
  },
  {
    role: "Historian",
    name: "Talia Torrez",
    description:
      "Documents NJHS activities, works with the Webmaster to get photos onto the website, and creates an end-of-year album.",
    responsibilities: [
      "Documents NJHS activities",
      "Works with the Webmaster to get photos onto the website",
      "Creates an end-of-year album",
      "Takes pictures at NJHS meetings, volunteering events, and for group photos",
      "Helps display and showcase NJHS",
    ],
  },
  {
    role: "Webmaster",
    name: "Ava Laster",
    description:
      "Manages the NJHS website, handles “purple page” communication, works with the Historian, and helps make Lanier NJHS more visible on campus.",
    responsibilities: [
      "Helps sponsors manage the website",
      "Handles “purple page” communication",
      "Works with the Historian",
      "Helps make Lanier NJHS more visible on campus",
      "Updates information on the website and uploads photos alongside the Historian",
    ],
  },
];
