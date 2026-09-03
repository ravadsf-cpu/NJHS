// ─────────────────────────────────────────────────────────────
// SPONSORS — update if sponsorship changes.
// Add email addresses if the school allows public listing.
// ─────────────────────────────────────────────────────────────

export type Sponsor = {
  name: string;
  email?: string;
};

export const sponsors: Sponsor[] = [
  { name: "Mrs. Cantu" },      // Elena Cantu — primary NJHS contact / applications drop-off
  { name: "Mr. Castillo" },    // Juan Castillo
  { name: "Mrs. Vaclavik" },
];
