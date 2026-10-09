export type Meeting = {
  date: string;        // ISO
  display: string;     // human-friendly date to show
  year: string;        // "2026-27", "2025-26"
  recap: string;       // short, student voice
  slidesUrl?: string;  // optional
  slidesLocal?: string;// optional, local PDF
};

// Newest first in each school year.
export const meetings: Meeting[] = [
  // 2026 to 2027
  {
    date: "2026-10-15",
    display: "Oct 15, 2026",
    year: "2026-27",
    recap:
      "Met the new officers and went over our goals (relationships, change, 2,000 hours). Roberts Festival is Oct 23. Dues and report cards due Friday or you go on probation. Contracts were due Sept 23. Get your library pass. Talked shirt colors and showed off the new website.",
    slidesLocal: "/downloads/slides/2026-10-meeting.pdf",
  },
  {
    date: "2026-09-09",
    display: "Sept 9, 2026",
    year: "2026-27",
    recap: "[[SEPT_2026_RECAP]]",
    slidesUrl: "[[SEPT_2026_SLIDES_LINK]]",
  },

  // 2025 to 2026 archive
  {
    date: "2026-02-11",
    display: "Feb 11, 2026",
    year: "2025-26",
    recap:
      "Dues for T-shirts, finish 20 hours, sign up for a food bank shift. Made Valentine's cards for kids in the hospital.",
    slidesUrl:
      "https://www.canva.com/design/DAHAYgCt_bo/iT6TXBhK6TYCZLucCkdWnA/edit",
  },
  {
    date: "2026-01-21",
    display: "Jan 21, 2026",
    year: "2025-26",
    recap:
      "How to stay off probation. Decorated New Year's resolution stars for the 3rd floor hallway.",
    slidesUrl:
      "https://www.canva.com/design/DAG9qV5V_C8/m3K1xv1lt1HaEIzsbtu9Mw/edit",
  },
  {
    date: "2025-12-10",
    display: "Dec 10, 2025",
    year: "2025-26",
    recap: "Goodie bags for Lanier teachers and staff. Jacket drive.",
    slidesUrl:
      "https://www.canva.com/design/DAG6dRPi3_g/108cYxZ1PWlupv1umhxrNw/edit",
  },
  {
    date: "2025-11-10",
    display: "Nov 10, 2025",
    year: "2025-26",
    recap:
      "Turned in report cards. Made thankful leaves for the 3rd floor bulletin board.",
    slidesUrl:
      "https://www.canva.com/design/DAG31oZcngc/QPHuJUcoFXJQVLaqouoJQA/edit",
  },
  {
    date: "2025-10-08",
    display: "Oct 8, 2025",
    year: "2025-26",
    recap:
      "Report cards, volunteer opportunities, met the officers, T-shirt vote.",
  },
  {
    date: "2025-09-10",
    display: "Sept 10, 2025",
    year: "2025-26",
    recap:
      "First meeting of the year. Covered requirements, officer roles, dues, T-shirts, and the big dates.",
    slidesUrl:
      "https://www.canva.com/design/DAG0jaUrtKA/ecK3PGiH4D4Yvz4KGp09JQ/edit",
  },
  {
    date: "2025-08-01",
    display: "2025 interest meeting",
    year: "2025-26",
    recap: "The slides we used at the interest meeting at the start of the year.",
    slidesUrl:
      "https://docs.google.com/presentation/d/1PEsDQYxrkVL-gaNh1O6Dcb-bTpErfUzV/edit",
  },
];
