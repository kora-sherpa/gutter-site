import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, MapPin, ChevronDown } from "lucide-react";
import { CO_CITIES, CA_CITIES } from "../data/serviceAreaCities";

const FEATURED = [
  { slug: "denver-co", city: "Denver", state: "Colorado" },
  { slug: "sacramento-ca", city: "Sacramento", state: "California" },
  { slug: "aurora-co", city: "Aurora", state: "Colorado" },
];

const VISIBLE_COUNT = 10;

function CityItem({ city }) {
  const base = "inline-flex items-center gap-1.5 text-[14.5px] font-semibold transition-colors";
  if (city.live) {
    return (
      <Link to={`/service-areas/${city.slug}`} className={`${base} text-navy hover:text-orange-dark`}>
        {city.name}
      </Link>
    );
  }
  // Not a live location page yet — keep the same hover styling so the full
  // directory still reads as "active," but don't navigate anywhere.
  return (
    <span
      role="link"
      aria-disabled="true"
      title="Coming soon to this area"
      onClick={(e) => e.preventDefault()}
      className={`${base} cursor-default text-navy hover:text-orange-dark`}
    >
      {city.name}
    </span>
  );
}

function CityDirectory({ title, cities, query, iconClassName }) {
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cities;
    return cities.filter((c) => c.name.toLowerCase().includes(q));
  }, [cities, query]);

  const isSearching = query.trim().length > 0;
  const visible = isSearching || expanded ? filtered : filtered.slice(0, VISIBLE_COUNT);
  const hasMore = !isSearching && !expanded && filtered.length > VISIBLE_COUNT;
  const noResults = isSearching && filtered.length === 0;

  return (
    <div className="rounded-[20px] border border-border bg-white p-7 transition hover:-translate-y-1 hover:border-orange hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)]">
      <h3 className="mb-5 flex items-center gap-2.5 text-[19px] font-bold">
        <MapPin className={iconClassName} />
        {title}
      </h3>

      {noResults ? (
        <p className="py-1 text-sm text-muted">No {title} cities match "{query}".</p>
      ) : (
        <>
          <ul className="columns-2 gap-5">
            {visible.map((city) => (
              <li key={city.slug} className="mb-2.5 break-inside-avoid">
                <CityItem city={city} />
              </li>
            ))}
          </ul>

          <AnimatePresence initial={false}>
            {hasMore && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-orange-dark hover:text-orange"
                >
                  See more {title} cities
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default function ServiceAreas() {
  const [query, setQuery] = useState("");

  return (
    <main>
      <section className="bg-surface pb-16 pt-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-5 flex items-center gap-2 text-[13.5px] text-muted">
            <Link to="/" className="font-bold text-navy">Home</Link>
            <span>/</span>
            <span>Service Areas</span>
          </div>
          <div className="mb-5 inline-flex items-center rounded-pill border border-orange/30 bg-orange/10 px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            Where We Work
          </div>
          <h1 className="max-w-2xl text-[34px] font-bold leading-tight sm:text-[52px]">
            Serving Colorado's Front Range &amp; Greater <span className="text-orange">Sacramento</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Certified local technicians, patented 2.0 PRO® protection, and the same Triple-Lifetime Warranty —
            wherever you are in our footprint.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mx-auto max-w-[920px] rounded-[28px] bg-gradient-to-br from-navy to-[#152230] px-8 py-11 text-center sm:px-12">
          <div className="mb-4 inline-flex items-center rounded-pill border border-orange/35 bg-orange/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide text-[#ffb287]">
            Where We Work Most
          </div>
          <h2 className="text-[28px] font-bold text-white sm:text-[38px]">Featured Markets</h2>
          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {FEATURED.map((m) => (
              <Link
                key={m.slug}
                to={`/service-areas/${m.slug}`}
                className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/12 bg-white/6 px-4 py-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-orange/40 hover:bg-white/12"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/18 text-orange">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="text-base font-bold text-white">{m.city}</span>
                <span className="text-[12.5px] font-semibold uppercase tracking-wide text-white/50">{m.state}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              Full Directory
            </div>
            <h2 className="text-[28px] font-bold sm:text-[38px]">Every City We Serve</h2>
          </div>

          <div className="relative mx-auto mb-10 max-w-[440px]">
            <Search className="pointer-events-none absolute left-[17px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your city..."
              aria-label="Search service area cities"
              className="w-full rounded-pill border border-border bg-white py-3.5 pl-[46px] pr-11 text-[15px] text-ink transition focus:border-orange focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CityDirectory title="Colorado" cities={CO_CITIES} query={query} iconClassName="h-5 w-5 text-orange" />
            <CityDirectory title="California" cities={CA_CITIES} query={query} iconClassName="h-5 w-5 text-cyan" />
          </div>

          <p className="mt-7 border-t border-border pt-6 text-center text-[12.5px] text-muted">
            Don't see your city listed as a link? We're expanding every season — it's still in our footprint, a
            dedicated page just isn't live yet.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="rounded-[32px] bg-gradient-to-br from-navy to-[#152230] px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl text-[28px] font-bold text-white sm:text-[38px]">Don't See Your City Listed?</h2>
          <p className="mx-auto mt-3.5 max-w-md text-white/85">
            We're expanding our service footprint every season — call us to check availability in your area.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            <Link to="/booking" className="rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
              Get an Estimate
            </Link>
            <a href="tel:+17207091681" className="rounded-pill bg-navy px-8 py-4 text-base font-bold text-white">
              Call (720) 709-1681
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
