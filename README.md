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

Everything editable lives in `src/data/site.ts`:

- Officers (name, role, photo, fun fact)
- Events (upcoming + past, with schedule, signup, photo)
- News & Alerts feed
- Shirt options and vote winner
- Checklist items
- Contact info (sponsor name, sponsor email, Google Form link)
- Service hours goal and current count

Anywhere you see `[[LIKE_THIS]]`, that is a visible placeholder on the live site.
Replace it with real content and it stops showing the dashed box.

### Adding an alert

Open `src/data/site.ts`, scroll to `alerts`, copy the commented template at
the bottom, and fill it in. Urgent alerts float to the top and show up in the
banner across every page.
