export type Album = {
  slug: string;
  title: string;
  blurb?: string;
  color: "cream" | "gold" | "coral" | "mint";
  photos: { src: string; alt: string }[];
};

export const albums: Album[] = [
  {
    slug: "2026-first-meeting",
    title: "First chapter meeting of the year",
    blurb: "Our September 2026 kickoff meeting.",
    color: "coral",
    photos: [
      { src: "/photos/gallery/2026-first-meeting/img-9389.jpg", alt: "Members at the first chapter meeting of the year, listening to officers kick things off" },
      { src: "/photos/gallery/2026-first-meeting/img-9386.jpg", alt: "Members gathered in the library for the first chapter meeting" },
      { src: "/photos/gallery/2026-first-meeting/img-9387.jpg", alt: "Officers presenting at the first chapter meeting" },
    ],
  },
  {
    slug: "staff-goodie-bags",
    title: "Staff goodie bags",
    blurb: "Making goodie bags for Lanier teachers and staff.",
    color: "gold",
    photos: [
      { src: "/photos/gallery/staff-goodie-bags/img-3422.jpg", alt: "Members packing goodie bags for Lanier staff" },
      { src: "/photos/gallery/staff-goodie-bags/img-3426.jpg", alt: "Members writing notes to go in staff goodie bags" },
      { src: "/photos/gallery/staff-goodie-bags/img-3423.jpg", alt: "Rows of finished staff goodie bags ready to deliver" },
      { src: "/photos/gallery/staff-goodie-bags/img-3425.jpg", alt: "Members decorating the outside of staff goodie bags" },
      { src: "/photos/gallery/staff-goodie-bags/img-3424.jpg", alt: "Members assembling staff goodie bags around a long table" },
    ],
  },
  {
    slug: "food-bank",
    title: "Food bank volunteering",
    blurb: "Shifts at the Houston Food Bank.",
    color: "cream",
    photos: [
      { src: "/photos/gallery/food-bank/food-bank-1.jpg", alt: "NJHS members sorting food at a Houston Food Bank shift" },
      { src: "/photos/gallery/food-bank/food-bank-2.jpg", alt: "NJHS members packing boxes at the Houston Food Bank" },
    ],
  },
  {
    slug: "past-meetings",
    title: "Meetings from past years",
    blurb: "Pulled from the old site.",
    color: "coral",
    photos: [
      { src: "/photos/gallery/past-meetings/img-3215.jpg", alt: "NJHS members at an older chapter meeting" },
      { src: "/photos/gallery/past-meetings/img-3211.jpg", alt: "Officers presenting at a past NJHS meeting" },
      { src: "/photos/gallery/past-meetings/img-3212.jpg", alt: "Members talking at a past NJHS meeting" },
      { src: "/photos/gallery/past-meetings/img-3217.jpg", alt: "Group photo from a past NJHS meeting" },
      { src: "/photos/gallery/past-meetings/img-3213.jpg", alt: "Members doing an activity at a past NJHS meeting" },
    ],
  },
  {
    slug: "oak-forest-foster-closet",
    title: "Oak Forest Foster Closet",
    blurb: "Helping at the free store for foster and adoptive families.",
    color: "mint",
    photos: [
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-holiday-2.jpg", alt: "Members at the Oak Forest Foster Closet holiday event" },
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-holiday.jpg", alt: "Volunteers setting up holiday supplies at Oak Forest Foster Closet" },
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-4.jpg", alt: "Members organizing clothes at the Oak Forest Foster Closet" },
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-3.jpg", alt: "Members sorting donations at the Oak Forest Foster Closet" },
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-2.jpg", alt: "Volunteers folding clothes at the Oak Forest Foster Closet" },
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-1.jpg", alt: "Members unpacking boxes at the Oak Forest Foster Closet" },
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-5.jpg", alt: "Members stocking shelves at the Oak Forest Foster Closet" },
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-main.png", alt: "The Oak Forest Foster Closet storefront" },
      { src: "/photos/gallery/oak-forest-foster-closet/oak-forest-group.jpg", alt: "Group photo of NJHS members at the Oak Forest Foster Closet" },
    ],
  },
  {
    slug: "2022-23-meetings",
    title: "2022 to 2023 meetings",
    blurb: "Archive from the old site.",
    color: "gold",
    photos: [
      { src: "/photos/gallery/2022-23-meetings/image-00.jpeg", alt: "Members at a 2022 to 2023 NJHS meeting" },
      { src: "/photos/gallery/2022-23-meetings/image-01.jpeg", alt: "Officers running a 2022 to 2023 meeting" },
      { src: "/photos/gallery/2022-23-meetings/image-02.jpeg", alt: "Members chatting at a 2022 to 2023 meeting" },
      { src: "/photos/gallery/2022-23-meetings/image-03.jpeg", alt: "Members at a 2022 to 2023 NJHS activity" },
      { src: "/photos/gallery/2022-23-meetings/image-04.jpeg", alt: "Officers presenting during a 2022 to 2023 meeting" },
      { src: "/photos/gallery/2022-23-meetings/image-05.jpeg", alt: "Group of members at a 2022 to 2023 NJHS meeting" },
      { src: "/photos/gallery/2022-23-meetings/image-06.jpeg", alt: "Members working on a project at a 2022 to 2023 meeting" },
      { src: "/photos/gallery/2022-23-meetings/image-07.jpeg", alt: "Members listening at a 2022 to 2023 meeting" },
      { src: "/photos/gallery/2022-23-meetings/image-08.jpeg", alt: "A 2022 to 2023 NJHS meeting in session" },
      { src: "/photos/gallery/2022-23-meetings/image-09.jpeg", alt: "Members at a 2022 to 2023 NJHS gathering" },
      { src: "/photos/gallery/2022-23-meetings/image-10.jpeg", alt: "Members at a 2022 to 2023 meeting activity" },
    ],
  },
];
