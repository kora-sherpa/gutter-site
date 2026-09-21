import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import services from "../data/services.json";

// Cards route into the Denver combo pages as the default/primary market,
// same convention the legacy static navbar used for generic service links.
const DEFAULT_LOCATION_SLUG = "denver-co";

export default function ServicesHub() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-40">
      <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">What We Do</div>
      <h1 className="max-w-2xl text-[36px] font-bold sm:text-[46px]">Every Gutter Service, Under One Roof</h1>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            to={`/service-areas/${DEFAULT_LOCATION_SLUG}/${s.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img src={`/assets/${s.thumb}`} alt={s.thumbAlt} className="h-44 w-full object-cover" loading="lazy" />
            <div className="p-6">
              <h3 className="mb-2 text-lg font-bold">{s.name}</h3>
              <p className="text-[14.5px] text-muted">{s.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-bold text-orange-dark group-hover:gap-2">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition-all" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
