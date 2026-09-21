# Gutter Guard Experts — static site

Each page from the Claude Design export lives in its own folder as
`index.html`, alongside its own `assets/`, `vendor/react*.js` runtime and
`support.js`. The homepage (originally `home/Main.dc.html`) has been moved
to the project root as `index.html`, with its `vendor/`, `assets/` and
`support.js` alongside it, so `/` serves the homepage the same way every
other folder serves its page.

## Pages

| URL              | Folder                  |
|-------------------|--------------------------|
| `/`                | `index.html` (root)     |
| `/about-us/`       | `about-us/`              |
| `/services-hub/`   | `services-hub/`          |
| `/service-detail/` | `service-detail/`        |
| `/seamless-gutter/`| `seamless-gutter/`       |
| `/service-areas/`  | `service-areas/`         |
| `/service-areas/:locationId/` | `service-areas/<slug>/` — generated, see below |
| `/service-areas/:locationId/:serviceId/` | `service-areas/<slug>/<slug>/` — generated, see below |
| `/gallery/`        | `gallery/`                |
| `/why-2-pro/`      | `why-2-pro/`              |
| `/warranty/`       | `warranty/`               |
| `/2-pro-vs-leaf-filter/` | `2-pro-vs-leaf-filter/` |
| `/2-pro-vs-leaf-guard/`  | `2-pro-vs-leaf-guard/`  |
| `/3-step-booking/` | `3-step-booking/`         |
| `/privacy-policy/` | `privacy-policy/`         |
| `/terms-and-conditions/` | `terms-and-conditions/` |

## Nav links

The exported markup was written against CMS-style dynamic routes (e.g.
`/services/2-0-pro-installation`, `/service-areas/denver-co`) that assumed a
router with many per-item pages. This export only contains one representative
page per template (`service-detail/` for a service, `dynamic-service-area/`
for a city), so nav links have been rewritten to point at the folders that
actually exist:

- `/services/2-0-pro-installation` → `/service-detail/`
- `/services/seamless-gutters` → `/seamless-gutter/`
- every other `/services/*` dropdown item → `/services-hub/` (no dedicated
  page was exported for gutter cleaning, repair & tune-up, 2.0 PRO heat, or
  commercial)
- `/service-areas/denver-co`, `/service-areas/sacramento-ca`, `/service-areas/aurora-co`
  → real generated pages, see **Location × service pages** below
- every other `/service-areas/*` city link → `/service-areas/` (no dedicated
  page exists for the other 39 cities in the directory)
- `/gutterguardvsleaffilter` → `/2-pro-vs-leaf-filter/`
- `/2-0-pro-vs-leafguard` → `/2-pro-vs-leaf-guard/`
- `/booking` → `/3-step-booking/`
- `/why-2-0-pro`, `/warranty`, `/about-us`, `/privacy-policy`,
  `/terms-and-conditions`, `/gallery`, `/services`, `/service-areas` → their
  matching folder

The `/careers` footer link has no corresponding exported page and is left
as-is.

## Shared navbar & footer

Every real page on the site (all 34 of them, including `3-step-booking/` —
the only page not covered is `dynamic-service-area/`, which is just a
redirect stub with no visible content) shares one navbar and one footer
instead of each carrying its own copy:

- `partials/navbar.html` / `partials/footer.html` — the markup, the single
  source of truth for both. The navbar's Service Areas dropdown (desktop and
  mobile) is intentionally limited to Denver, CO / Sacramento, CA / Aurora,
  CO. The footer's Resources → FAQs link points to `/#faq` (the homepage's
  FAQ section) since no other page has one.
- `scripts/site-include.js` — loaded from every page's `<head>` via a path
  relative to that page's own folder (e.g. `scripts/site-include.js` from the
  root, `../scripts/site-include.js` from a folder one level down, and so on
  — never a leading-slash absolute path). On page load it fetches both
  partials into that page's `<div id="navbar-root"></div>` and
  `<div id="footer-root"></div>`, wires up the mobile burger menu and
  accordions, and fills in the footer's copyright year. The desktop mega-menu
  dropdowns are pure CSS `:hover`, so no JS is needed for those.

`site-include.js` locates `partials/navbar.html` / `partials/footer.html` by
reading its own resolved `<script src>` (`document.currentScript.src`) and
fetching relative to that, instead of a hardcoded `/partials/...` path. Since
the browser has already resolved the script's own URL against the page it
loaded from, this stays correct no matter where the site is actually hosted
— a local dev server, a root domain, a custom domain, or a GitHub
Pages-style project subfolder (`https://user.github.io/repo-name/`) — as
long as each page's own `<script src="...scripts/site-include.js">` uses the
correct relative depth for its folder, which is how every page is wired.
Any `fetch` failure (wrong path, offline, 404) is logged to the console via
`console.error("Partial load failed:", err)` rather than failing silently.

To change the navbar or footer (links, cities, styling structure) for every
page at once, edit the partial file — never a page's own copy, since there
isn't one anymore. Because the include happens over `fetch`, this requires
serving the site over http(s) — it will not work by opening `index.html`
directly via `file://`.

On the 14 pages that still carry the original `<x-dc>` DC-runtime wrapper
(the hand-authored pages plus `3-step-booking/`), `#navbar-root` and
`#footer-root` live **outside** `<x-dc>...</x-dc>` — one right after
`<body>`, the other right after `</x-dc>`, before `</body>` — not inside it.
`support.js`'s `DCLogic` custom element owns everything inside `<x-dc>` and
re-renders it via React; anything placed inside that boundary gets clobbered
on re-render regardless of when `site-include.js` injects it. `mountPartial`
also sets `target.innerHTML` rather than `target.outerHTML`, so the
`#navbar-root`/`#footer-root` container itself is never replaced (only its
contents), which avoids a second, independent way the same clobbering could
happen if the container node were ever inside React-managed DOM again.
Because a partial can end up injected into a page at any folder depth, the
logo `<img src>` inside `partials/navbar.html`/`partials/footer.html` uses a
`__SITE_ROOT__` placeholder instead of a hardcoded path; `mountPartial`
replaces it with the same dynamically computed site root described above
before injecting the HTML.

## Location × service pages

`/service-areas/:locationId/` and `/service-areas/:locationId/:serviceId/`
are real static files, not a client-side dynamic route — there's no server
here to resolve a wildcard path, so each combination is pre-rendered to its
own `index.html` at build time:

- 3 locations (Denver CO, Sacramento CA, Aurora CO) × 6 services (2.0 PRO®
  Installation, Gutter Cleaning, Repair & Tune-Up, Seamless Gutters, 2.0 PRO
  HEAT™, Commercial Protection) = 18 combination pages, plus one hub page per
  location (all 6 services for that city) = 21 generated pages total.
- `tools/generate-location-pages.pl` is the generator. It holds the location
  data (climate/risk copy) and service data (benefits, process, FAQ) as Perl
  structures, and renders each page from `page_head()`/`hero_section()`/
  `benefits_section()`/`why_us_section()`/`process_section()`/`faq_section()`/
  `more_services_section()`/`cta_section()` helpers. It is a build-time tool,
  not served to browsers — re-run it (`perl tools/generate-location-pages.pl`
  from the repo root) whenever the location or service data changes, and
  commit the regenerated files under `service-areas/`.
- Generated pages don't use the `<x-dc>` design-tool runtime (`vendor/`,
  `support.js`) at all — they're plain HTML/CSS that load
  `/assets/css/site-base.css` (the shared design tokens, navbar, and footer
  styles extracted from the hand-authored pages) and
  `/assets/css/location-service.css` (hero, benefits, process, FAQ, and
  "more services" card styles), plus `/scripts/site-include.js`, which mounts
  the shared `partials/navbar.html` / `partials/footer.html` and wires up the
  FAQ accordions.
- The old `/dynamic-service-area/` route (a single hand-authored Denver
  mockup) is retired in favor of `/service-areas/denver-co/`.
  `dynamic-service-area/index.html` is now just a redirect stub so old links
  still resolve.
- Only Denver, Sacramento, and Aurora have real pages. The other 39 cities in
  the `/service-areas/` directory grid intentionally stay as dead links
  (`javascript:void(0)`, via `LIVE_AREA_SLUGS` in `service-areas/index.html`)
  since there's no content behind them yet — extend `LIVE_AREA_SLUGS` and the
  generator's `@LOCATIONS` list together if that changes.

## Viewing

Serve the project root (e.g. `python3 -m http.server`) and open `/`; some
browsers block the scripts over `file://`, and the shared navbar/footer and
location/service pages (see above) require an http(s) origin.
