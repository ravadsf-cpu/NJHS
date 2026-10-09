# Lanier NJHS Website

The Lanier NJHS site. Events, deadlines, officers, shirt vote, and news.

## Stack

React · TypeScript · Vite · Tailwind CSS · React Router.

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

The output in `dist/` is a static site. Deploy it to any static host (Vercel,
Netlify, Cloudflare Pages). If your host does not SPA-rewrite by default,
make sure unknown routes fall back to `index.html`.

## Updating content

Everything editable lives in `src/data/`:

- `site.ts`: officers, events, alerts, checklist, shirt options, service hours
- `meetings.ts`: meeting minutes
- `opportunities.ts`: Volunteer opportunities for the Earn more hours page
- `gallery.ts`: photo albums

### Adding an alert

Open `src/data/site.ts`, scroll to `alerts`, copy the commented template at
the bottom, and fill it in. Urgent alerts float to the top and show up in the
banner across every page.

### Adding a volunteer opportunity

Open `src/data/opportunities.ts` and copy the commented template. For dated
events, set `type: "event"` and add ISO dates in `dates: []`.

### Dropping in new photos

- Officer portraits go in `/public/photos/officers/` as `first-last.jpg`.
- Event photos go in `/public/photos/events/` with the same slug as the event id.
- Gallery albums live under `/public/photos/gallery/<album>/` and are registered in `src/data/gallery.ts`.
- Downloadable files go in `/public/downloads/`.
