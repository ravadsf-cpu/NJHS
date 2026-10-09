// Volunteer opportunities for the Volunteer Finder on /community-service.
// Rules checked: October 2026.
//
// To add a new opportunity, copy the commented template at the bottom.

export const CATEGORIES = [
  { id: "food",        label: "Food & hunger" },
  { id: "kids",        label: "Helping kids & families" },
  { id: "environment", label: "Environment & outdoors" },
  { id: "events",      label: "School & community events" },
  { id: "home",        label: "Do it from home" },
] as const;

export const DAYS = [
  { id: "weekday", label: "Weekday after school" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
  { id: "any", label: "Any time" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
export type DayId = (typeof DAYS)[number]["id"];

export type Opportunity = {
  id: string;
  name: string;              // "Houston Food Bank"
  org: string;               // short label used as badge
  description: string;       // what you'd actually do
  location: string;          // address or neighborhood
  categories: CategoryId[];
  minAge: number;            // minimum age allowed
  parentRequiredUnder: number; // age below which a parent/guardian must come
  days: DayId[];
  groupFriendly: boolean;    // can go with a group of 5+
  fromHome: boolean;         // can be done from home
  signupUrl: string;         // public sign-up URL
  signupExtra?: { label: string; url: string }[]; // extra forms, waivers, etc.
  endsOn?: string;           // ISO. If past, the card is hidden.
  countsForHours: boolean;   // for the "Counts toward NJHS hours" badge
  lastVerified: string;      // ISO date
  notes?: string;            // short note like "Groups of 5+ register separately"
};

export const opportunities: Opportunity[] = [
  {
    id: "roberts-festival-2026",
    name: "Roberts International Festival",
    org: "NJHS event",
    description:
      "Help with setup, run a country booth, or clean up at the yearly festival at Roberts Elementary.",
    location: "Roberts Elementary, Houston",
    categories: ["events", "kids"],
    minAge: 11,
    parentRequiredUnder: 0,
    days: ["weekday"],
    groupFriendly: true,
    fromHome: false,
    signupUrl: "[[SIGNUP_LINK_ROBERTS]]",
    endsOn: "2026-10-23",
    countsForHours: true,
    lastVerified: "2026-10-01",
    notes: "Shifts: setup 3:30 to 4:00, booths 4:00 to 6:30, cleanup 6:30 to 7:30.",
  },
  {
    id: "houston-food-bank",
    name: "Houston Food Bank",
    org: "Houston Food Bank",
    description:
      "Sort and pack food at the warehouse that supplies pantries across the Houston area.",
    location: "535 Portwall St, Houston",
    categories: ["food"],
    minAge: 6,
    parentRequiredUnder: 16,
    days: ["saturday", "sunday", "weekday"],
    groupFriendly: true,
    fromHome: false,
    signupUrl: "https://www.houstonfoodbank.org/volunteernow",
    signupExtra: [
      {
        label: "Minor liability waiver (under 18)",
        url: "https://www.houstonfoodbank.org/wp-content/uploads/2025/02/Minor-Liability-Waiver-Form-2025.pdf",
      },
    ],
    countsForHours: true,
    lastVerified: "2026-10-01",
    notes: "Under 16 must come with a parent or legal guardian.",
  },
  {
    id: "kids-meals",
    name: "Kids' Meals",
    org: "Kids' Meals Inc.",
    description:
      "Make sandwiches, pack lunches, sort produce, or decorate lunch bags for kids in Houston.",
    location: "1035 Milby St, Houston",
    categories: ["food", "kids", "home"],
    minAge: 8,
    parentRequiredUnder: 18,
    days: ["saturday", "weekday"],
    groupFriendly: true,
    fromHome: true,
    signupUrl: "https://kidsmealsinc.volunteerhub.com/vv2/",
    signupExtra: [
      {
        label: "Groups of 5+",
        url: "https://kidsmealsinc.org/take-action/volunteer/#five-plus-form",
      },
    ],
    countsForHours: true,
    lastVerified: "2026-10-01",
    notes:
      "Ages 12+ can work in the kitchen. Under 18 brings an adult, and each person registers on their own.",
  },
  {
    id: "trees-for-houston",
    name: "Trees For Houston",
    org: "Trees For Houston",
    description:
      "Tree plantings and giveaways around Houston. Dates come by email after you sign up.",
    location: "Houston (various sites)",
    categories: ["environment"],
    minAge: 11,
    parentRequiredUnder: 18,
    days: ["saturday"],
    groupFriendly: true,
    fromHome: false,
    signupUrl: "https://www.treesforhouston.org/volunteer",
    countsForHours: true,
    lastVerified: "2026-10-01",
    notes: "Fill out the form and they'll email you upcoming events. Usually Saturdays.",
  },
  {
    id: "oak-forest-foster-closet",
    name: "Oak Forest Foster Closet",
    org: "Oak Forest Foster Closet",
    description:
      "Free store for foster and adoptive families. Help with setup, cleanup, and seasonal events.",
    location: "1216 Bethlehem St, Houston",
    categories: ["kids", "events"],
    minAge: 11,
    parentRequiredUnder: 0,
    days: ["saturday", "weekday"],
    groupFriendly: true,
    fromHome: false,
    signupUrl: "[[OAK_FOREST_FACEBOOK_LINK]]",
    countsForHours: true,
    lastVerified: "2026-10-01",
    notes: "Sign-ups are posted on their Facebook page. We've worked with them before.",
  },
  {
    id: "chapter-meeting-projects",
    name: "Chapter meeting projects",
    org: "NJHS",
    description:
      "Thanksgiving leaves, teacher goodie bags, Valentine's cards. We make them during meetings, no extra sign-up.",
    location: "Lanier Middle School library",
    categories: ["events", "kids"],
    minAge: 11,
    parentRequiredUnder: 0,
    days: ["weekday"],
    groupFriendly: true,
    fromHome: false,
    signupUrl: "",
    countsForHours: true,
    lastVerified: "2026-10-01",
    notes: "No sign-up, just show up to meetings.",
  },

  // Template. Copy and uncomment to add a new one.
  // {
  //   id: "unique-id",
  //   name: "Organization name",
  //   org: "Short badge label",
  //   description: "One or two sentences on what you'd do.",
  //   location: "Address or neighborhood",
  //   categories: ["food"],
  //   minAge: 11,
  //   parentRequiredUnder: 0,
  //   days: ["saturday"],
  //   groupFriendly: true,
  //   fromHome: false,
  //   signupUrl: "https://example.com/signup",
  //   signupExtra: [],
  //   countsForHours: true,
  //   lastVerified: "YYYY-MM-DD",
  //   notes: "",
  // },
];
