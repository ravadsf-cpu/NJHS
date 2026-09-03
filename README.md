# Lanier NJHS Website

The Lanier National Junior Honor Society information hub — Home, Important
Events, Meeting Minutes, 8th Grade Applications, Community Service, Photo
Gallery, and Officers.

## Stack

React · TypeScript · Vite · Tailwind CSS · framer-motion · lucide-react · React
Router.

## Running locally

```bash
npm install
npm run dev
```

Opens on http://localhost:5173.

## Build

```bash
npm run build      # emits ./dist
npm run preview    # preview the built site
```

The output in `dist/` is a static site. Deploy it to any static host (Netlify,
Vercel, Cloudflare Pages, GitHub Pages). If you deploy to a plain static host
without SPA rewrite, add a `_redirects` (Netlify) or equivalent so client-side
routes fall back to `index.html`.

---

## For the NJHS Webmaster — updating the site each year

Every piece of school-year content lives in `src/data/`. You do **not** need to
touch the components. Edit these files, commit, and redeploy.

| File | What it controls |
| --- | --- |
| `src/data/siteConfig.ts` | School year, dues amount, GPA requirement, application deadline, drop-off location, and every external link (SchoolPay, service log PDF, application PDF, recommendation form PDF, NJHS Information PDF, interest meeting slides). |
| `src/data/officers.ts` | The five officer positions — role, name, description, responsibilities, optional photo path. Add `photo: "/images/officers/first-last.jpg"` once you drop a photo into `public/images/officers/`. |
| `src/data/sponsors.ts` | Chapter sponsors and optional email addresses. |
| `src/data/events.ts` | The chapter calendar. Each entry has `status: "finished" \| "upcoming" \| "meeting"` — green / red / blue in the legend. |
| `src/data/meetings.ts` | Meeting minutes archive. Add a new object at the **top** of the array after each meeting; include a `slidesUrl` if you have the Google Slides link. |
| `src/data/photos.ts` | Photo albums for the gallery. Drop image files into `public/images/gallery/<album-slug>/` and add their paths to the `photos` array of the album. |
| `src/data/serviceOpportunities.ts` | The list of active volunteer opportunities on the Community Service page. |

**Adding photos**

1. Put the file in `public/images/gallery/<album-slug>/filename.jpg`.
2. Add the path in `src/data/photos.ts`, e.g.
   `"/images/gallery/food-bank/2026-01-food-bank-1.jpg"`.

**Adding a meeting**

1. Open `src/data/meetings.ts`.
2. Add a new object at the very top of the `meetings` array with the date,
   bullet-point `summary`, and optional `slidesUrl`.

**Updating the deadline / dues / school year**

1. Open `src/data/siteConfig.ts`. Change `schoolYear`, `applicationDeadline`,
   `duesAmountUSD`, and the URLs in `links`.
2. Every page that shows those values updates automatically.

**Replacing an officer**

1. Open `src/data/officers.ts`.
2. Change the `name` on the relevant role. If a photo is available, add
   `photo: "/images/officers/first-last.jpg"` (place the file in
   `public/images/officers/`).

## Content notes

- The Important Events page originally listed dates without an explicit school
  year. Verify the year before publishing to a live calendar.
- The personal statement requirement is preserved verbatim from the application:
  **100% original with no AI influence.**
- Eligibility is presented with the detailed 6th/7th-grade averages, conduct
  rules, and outside-Lanier service requirement — not reduced to just "3.7 GPA."
