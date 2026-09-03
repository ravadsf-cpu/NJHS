// ─────────────────────────────────────────────────────────────
// PHOTO GALLERY — grouped by album.
//
// To add photos:
//   1. Drop image files in public/images/gallery/<album-slug>/
//   2. Add their filenames to the `photos` array of the album,
//      e.g. "/images/gallery/food-bank/2026-01-food-bank-1.jpg"
//
// The Historian + Webmaster maintain this together.
// ─────────────────────────────────────────────────────────────

export type Album = {
  slug: string;
  title: string;
  description: string;
  photos: string[]; // public/-relative image paths
};

export const albums: Album[] = [
  {
    slug: "food-bank",
    title: "Food Bank",
    description: "Photos from NJHS Food Bank volunteering.",
    photos: [],
  },
  {
    slug: "first-chapter-meeting",
    title: "This Year’s First Chapter Meeting",
    description: "Photos from the first chapter meeting of the year.",
    photos: [],
  },
  {
    slug: "staff-goodie-bags",
    title: "Staff Goodie Bags",
    description: "Photos documenting the staff goodie-bag project.",
    photos: [],
  },
  {
    slug: "food-bank-last-year",
    title: "Last Year’s Food Bank Volunteering",
    description: "Previous Food Bank volunteering.",
    photos: [],
  },
  {
    slug: "njhs-meeting-last-year",
    title: "Last Year’s NJHS Meeting",
    description: "Photos from a previous NJHS meeting.",
    photos: [],
  },
  {
    slug: "njhs-2022-2023",
    title: "2022–2023 NJHS Meeting",
    description: "Retained photos from the 2022–2023 NJHS meeting.",
    photos: [],
  },
  {
    slug: "oak-forest-foster-closet",
    title: "Oak Forest Foster Closet",
    description: "Pictures from the Oak Forest Foster Closet project.",
    photos: [],
  },
];
