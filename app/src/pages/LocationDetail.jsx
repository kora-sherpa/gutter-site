import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, BadgeCheck, ChevronDown } from "lucide-react";
import locations from "../data/locations.json";
import services from "../data/services.json";
import { expand, locVars } from "../data/templateUtils";

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15.5px] font-bold text-ink">{q}</span>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-orange transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="text-[14.5px] leading-relaxed text-muted">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function LocationDetail() {
  const { locationId, serviceId } = useParams();
  const location = locations.find((l) => l.slug === locationId);

  if (!location) {
    return (
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <h1 className="text-3xl font-bold">Service area not found</h1>
        <p className="mt-4 text-muted">
          We don't have a page for that location yet.{" "}
          <Link to="/service-areas" className="font-bold text-orange">
            View all service areas
          </Link>
          .
        </p>
      </main>
    );
  }

  const service = serviceId ? services.find((s) => s.slug === serviceId) : null;

  if (serviceId && !service) {
    return (
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <p className="mt-4 text-muted">
          <Link to={`/service-areas/${location.slug}`} className="font-bold text-orange">
            View all services in {location.city}
          </Link>
          .
        </p>
      </main>
    );
  }

  const vars = locVars(location, service?.name);

  // Combo page (location + service) mirrors render_combo_page() in generate-location-pages.pl
  if (service) {
    const header = expand(service.headerTemplate, vars);
    const intro = expand(service.introTemplate, vars);
    const benefits = service.benefits.map((b) => expand(b, vars));
    const process = service.process.map((p) => ({ title: p.title, desc: expand(p.desc, vars) }));
    const faq = [
      ...service.faqGeneric,
      { q: expand(service.faqCityQ, vars), a: expand(service.faqCityA, vars) },
    ];
    const whyUsText = expand(
      `Our ${location.city} crew works {NEIGHBORHOODS} and the rest of the metro every week. Every {SERVICE_NAME} job is backed by a fully transferable Triple-Lifetime Warranty, 50-year tri-polymer sealant, and a licensed, insured local team — never a subcontractor.`,
      vars
    );
    const otherServices = services.filter((s) => s.slug !== service.slug);

    return (
      <main>
        <section className="relative flex min-h-[440px] items-center overflow-hidden bg-navy pb-16 pt-40">
          <img src={`/assets/${location.heroImage}`} alt={location.heroAlt} className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/40" />
          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/service-areas">Service Areas</Link>
              <span>/</span>
              <Link to={`/service-areas/${location.slug}`}>{location.city}, {location.stateAbbr}</Link>
              <span>/</span>
              <span>{service.name}</span>
            </div>
            <div className="mb-5 inline-flex rounded-pill border border-white/25 bg-white/10 px-4 py-1.5 text-[13.5px] font-bold text-white">
              {location.city}, {location.stateAbbr} · {service.name}
            </div>
            <h1 className="max-w-3xl text-[32px] font-bold leading-tight text-white sm:text-[46px]">{header}</h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/85">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
                Get an Estimate <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+17207091681" className="inline-flex items-center gap-2 rounded-pill border border-white/28 px-8 py-4 text-base font-bold text-white">
                <Phone className="h-4 w-4" /> Call (720) 709-1681
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="mb-8 text-sm font-bold uppercase tracking-wide text-orange-dark">Key Benefits</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b} className="rounded-2xl border border-border bg-white p-6">
                <CheckCircle2 className="mb-3.5 h-[18px] w-[18px] text-orange" />
                <p className="text-[14.5px] leading-relaxed text-muted">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface py-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Why Us</div>
            <h2 className="max-w-2xl text-[30px] font-bold sm:text-[36px]">Local Expertise, Backed for Life</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{whyUsText}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2.5 text-[13px] font-bold text-navy">
                <ShieldCheck className="h-4 w-4 text-orange" /> Triple-Lifetime Warranty
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2.5 text-[13px] font-bold text-navy">
                <BadgeCheck className="h-4 w-4 text-orange" /> 50-Year Tri-Polymer Sealant
              </span>
              <span className="flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2.5 text-[13px] font-bold text-navy">
                <ShieldCheck className="h-4 w-4 text-orange" /> Licensed &amp; Insured in {location.stateAbbr}
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Process</div>
          <h2 className="mb-10 text-[30px] font-bold sm:text-[36px]">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-5 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-bold">{step.title}</h3>
                <p className="text-[14.5px] text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface py-16">
          <div className="mx-auto max-w-[820px] px-6">
            <div className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-orange-dark">FAQ</div>
            <h2 className="mb-10 text-center text-[30px] font-bold sm:text-[36px]">Common Questions</h2>
            <div className="flex flex-col gap-3">
              {faq.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">More Services</div>
          <h2 className="mb-10 text-[30px] font-bold sm:text-[36px]">Other Ways We Protect {location.city} Homes</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <Link key={s.slug} to={`/service-areas/${location.slug}/${s.slug}`} className="overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg">
                <img src={`/assets/${s.thumb}`} alt={s.thumbAlt} className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="font-bold">{s.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-[13.5px] font-bold text-orange-dark">
                    View service <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CtaSection location={location} />
      </main>
    );
  }

  // Hub page (location only, no service) mirrors render_hub_page()
  const intro = expand(
    `${location.city} homeowners deal with {RISK1}. {CLIMATE_SENTENCE} Gutter Guard Experts runs a local ${location.city} crew that installs, cleans, repairs, and maintains gutter systems built for this climate.`,
    vars
  );
  const benefits = [
    `Six services under one local crew — installation, cleaning, repair, seamless gutters, heat cable, and commercial — all serving ${location.city}.`,
    "Every install is sized for {CLIMATE_TAG_LOWER}, not a generic national spec.",
    "Free, no-obligation in-home estimates with same-week scheduling in most cases.",
    "A fully transferable Triple-Lifetime Warranty on every job, backed by a licensed, insured local team.",
  ].map((b) => expand(b, vars));
  const faq = [
    { q: `What areas of ${location.city} do you serve?`, a: `We serve ${location.city} and the surrounding metro, including ${location.neighborhoods}. If you're unsure whether your address is covered, a free estimate call will confirm it.` },
    { q: "Do you offer free estimates?", a: `Yes — every ${location.city} estimate is free and no-obligation, typically scheduled within the week.` },
    { q: expand("Why do {CITY} gutters need extra protection compared to other climates?", vars), a: "A generic, nationally-sized guard misses what this specific climate does to a roofline. We size every install for it instead." },
  ];

  return (
    <main>
      <section className="relative flex min-h-[440px] items-center overflow-hidden bg-navy pb-16 pt-40">
        <img src={`/assets/${location.heroImage}`} alt={location.heroAlt} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/40" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-6">
          <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/service-areas">Service Areas</Link>
            <span>/</span>
            <span>{location.city}, {location.stateAbbr}</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-white/25 bg-white/10 px-4 py-1.5 text-[13.5px] font-bold text-white">
            {location.climateTag}
          </div>
          <h1 className="max-w-3xl text-[32px] font-bold leading-tight text-white sm:text-[46px]">
            {location.city}, {location.stateAbbr} Gutter Guard &amp; Gutter Services
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/85">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link to="/booking" className="inline-flex items-center gap-2 rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
              Get an Estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+17207091681" className="inline-flex items-center gap-2 rounded-pill border border-white/28 px-8 py-4 text-base font-bold text-white">
              <Phone className="h-4 w-4" /> Call (720) 709-1681
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-8 text-sm font-bold uppercase tracking-wide text-orange-dark">Key Benefits</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b} className="rounded-2xl border border-border bg-white p-6">
              <CheckCircle2 className="mb-3.5 h-[18px] w-[18px] text-orange" />
              <p className="text-[14.5px] leading-relaxed text-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[820px] px-6">
          <div className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-orange-dark">FAQ</div>
          <h2 className="mb-10 text-center text-[30px] font-bold sm:text-[36px]">Common Questions</h2>
          <div className="flex flex-col gap-3">
            {faq.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Services in {location.city}</div>
        <h2 className="mb-10 text-[30px] font-bold sm:text-[36px]">Pick a Service</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to={`/service-areas/${location.slug}/${s.slug}`} className="overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg">
              <img src={`/assets/${s.thumb}`} alt={s.thumbAlt} className="h-40 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-bold">{s.name}</h3>
                <p className="mt-1 text-[13.5px] text-muted">{s.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection location={location} />
    </main>
  );
}

function CtaSection({ location }) {
  return (
    <section className="bg-gradient-to-br from-navy to-[#152230] py-16 text-center text-white">
      <div className="mx-auto max-w-[560px] px-6">
        <h2 className="text-[30px] font-bold sm:text-[36px]">
          Ready for Gutter Protection {location.city}, {location.stateAbbr} Homeowners Trust?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/85">Book your free, no-obligation estimate today.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3.5">
          <Link to="/booking" className="inline-flex items-center gap-2 rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
            Get an Estimate <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="tel:+17207091681" className="inline-flex items-center gap-2 rounded-pill border border-white/28 px-8 py-4 text-base font-bold text-white">
            <Phone className="h-4 w-4" /> Call (720) 709-1681
          </a>
        </div>
      </div>
    </section>
  );
}
