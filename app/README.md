# Gutter Guard Experts — Vite + React app (in progress)

This is the new Vite + React + Tailwind SPA that will eventually replace the static,
directory-based site at the repo root. It lives in its own `app/` folder so the
existing static site keeps working, unmodified, while this is built out — nothing
here touches `../partials/`, `../scripts/`, or any of the existing page folders.

## Setup

```
cd app
npm install
npm run dev
```

Not run yet in this environment (no Node/npm available here) — `npm install && npm run dev`
should be the first thing to verify once you're on a machine with Node.

## What's real vs. a stub

- **Data-driven, not a stub:** `src/data/locations.json` + `src/data/services.json` are a
  full port of `../tools/generate-location-pages.pl`'s `@LOCATIONS`/`@SERVICES` structures
  (including the `{CITY}`/`{RISK1}`/etc. template placeholders), interpolated at render time
  by `src/data/templateUtils.js` (a JS port of the Perl script's `expand()`/`loc_vars()`).
  `pages/LocationDetail.jsx` reimplements both `render_hub_page()` (no `:serviceId`) and
  `render_combo_page()` (with `:serviceId`) — all 3 locations × 6 services render for real,
  the same way the Perl script pre-rendered 21 static files, just at request time instead of
  build time.
- **Converted, not a stub:** `components/FloatingNav.jsx` (from `../partials/navbar.html`)
  and `components/Footer.jsx` (from `../partials/footer.html`) carry the real nav structure —
  5 top-level items, Services/Service Areas/Compare/Resources dropdowns, the mobile drawer
  (Framer Motion) — and `components/HeroCarousel.jsx` (from `../scripts/hero-carousel.js`)
  keeps the real 4s auto-rotate/progress-bar/dot logic. Slide copy for slides 2-4 is
  plausible placeholder text in the site's voice, not pulled from an existing source — the
  original `hero-carousel.js` only had slide 1's copy verified against the live homepage.
- **Intentional stubs:** `pages/Warranty.jsx`, `pages/Why2Pro.jsx`, and `pages/Booking.jsx`
  are minimal placeholders (headline + short intro), not full ports of the legacy
  `warranty/`, `why-2-pro/`, and `3-step-booking/` pages — those still have real content to
  migrate. `pages/Home.jsx` and `pages/ServicesHub.jsx` are working pages built from real
  data, but leaner than the legacy homepage's ~800-line version (no comparison table,
  warranty story, or warning-signs sections yet).
- **Not routed yet:** `/about-us`, `/gallery`, `/service-detail`, `/seamless-gutter`,
  `/2-pro-vs-leaf-filter`, `/2-pro-vs-leaf-guard`, `/privacy-policy`,
  `/terms-and-conditions`. `FloatingNav`/`Footer` link to these paths already so the nav is
  complete, but until routes + pages exist for them, those links hit the `NotFound` catch-all
  route instead of a 404 from the server.

## Route map

| Route | Component |
|---|---|
| `/` | `Home` |
| `/services-hub` | `ServicesHub` |
| `/service-areas` | `ServiceAreas` |
| `/service-areas/:locationId` | `LocationDetail` (hub mode) |
| `/service-areas/:locationId/:serviceId` | `LocationDetail` (combo mode) — added beyond the requested route list since it's required for the location+service data to actually be reachable |
| `/warranty` | `Warranty` |
| `/why-2-pro` | `Why2Pro` |
| `/booking` | `Booking` |
| `*` | `NotFound` |

## Assets

`public/assets/` has copies of the images the new components reference — the original
files from `../assets/` under both their original hashed names (for the JSON-driven
`locations.json`/`services.json` image paths) and friendlier names (`hero-1.jpg`,
`logo.png`, etc.) for the hand-written components. Nothing was moved or deleted from the
legacy `../assets/` folder.
