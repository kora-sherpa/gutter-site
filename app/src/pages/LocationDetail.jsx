import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LocalBentoGrid from "../components/LocalBentoGrid.jsx";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  BadgeCheck,
  ChevronDown,
  Users,
  Snowflake,
  CloudRain,
  AlertTriangle,
  Bug,
  MapPin,
} from "lucide-react";
import locations from "../data/locations.json";
import services from "../data/services.json";
import {
  expand,
  locVars,
  buildWhyItMatters,
  buildWhyItMattersHub,
  buildLocalFaqs,
  getNearbyCities,
  CLIMATE_FACTORS,
} from "../data/templateUtils";

export const COMMON_ISSUES = [
  { icon: Snowflake, title: "Ice Dams", desc: "Trapped meltwater refreezing along the eaves overnight, forcing water back under the roofline." },
  { icon: CloudRain, title: "Gutter Overflow", desc: "Clogged channels sending storm water sheeting down the siding instead of into the downspout." },
  { icon: AlertTriangle, title: "Fascia Wood Rot", desc: "Standing water behind an overflowing gutter slowly breaking down the wood it's mounted to." },
  { icon: Bug, title: "Pest Nesting", desc: "Standing debris and stagnant water attracting mosquitoes, birds, and rodents to the roofline." },
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="rounded-2xl border border-border bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15.5px] font-bold text-ink">{q}</span>
        <ChevronDown className={`h-[18px] w-[18px] flex-shrink-0 text-orange transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
      <span className="flex items-center gap-2 text-[13.5px] font-bold text-white/90">
        <ShieldCheck className="h-4 w-4 text-orange" /> Licensed &amp; Insured
      </span>
      <span className="flex items-center gap-2 text-[13.5px] font-bold text-white/90">
        <Users className="h-4 w-4 text-orange" /> Local Technicians
      </span>
      <span className="flex items-center gap-2 text-[13.5px] font-bold text-white/90">
        <BadgeCheck className="h-4 w-4 text-orange" /> Triple-Lifetime Warranty
      </span>
    </div>
  );
}

function ClimateFactorsCard({ location, factors }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-7">
      <div className="mb-4 text-sm font-bold uppercase tracking-wide text-orange-dark">
        {location.city}'s Climate Factors
      </div>
      <ul className="flex flex-col gap-3.5">
        {factors.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-orange" />
            <span className="text-[14px] leading-relaxed text-[#2b2f36]">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessTimeline({ steps }) {
  return (
    <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div className="pointer-events-none absolute inset-x-[8%] top-[27px] hidden border-t-2 border-dashed border-border lg:block" />
      {steps.map((step, i) => (
        <div key={step.title} className="relative z-10 text-center">
          <div className="mx-auto mb-5 flex h-[56px] w-[56px] items-center justify-center rounded-full border-[5px] border-white bg-navy font-display text-base font-bold text-white shadow-[0_0_0_2px_#E2E8F0]">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mb-2 text-[15.5px] font-bold">{step.title}</h3>
          <p className="text-[13.5px] leading-relaxed text-muted">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}

function NearbyCities({ location }) {
  const nearby = getNearbyCities(location);
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16">
      <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Regional Service Area</div>
      <h2 className="mb-3 text-[26px] font-bold sm:text-[32px]">Also Serving Communities Near {location.city}</h2>
      <p className="mb-8 max-w-2xl text-muted">
        Our {location.city} crew regularly works throughout {location.neighborhoods} and the surrounding {location.state} footprint below.
      </p>
      <div className="flex flex-wrap gap-2.5">
        {nearby.map((c) =>
          c.live ? (
            <Link
              key={c.slug}
              to={`/service-areas/${c.slug}`}
              className="flex items-center gap-1.5 rounded-pill border border-border bg-white px-4 py-2 text-[13.5px] font-bold text-navy transition hover:border-orange hover:text-orange-dark"
            >
              <MapPin className="h-[13px] w-[13px] text-orange" /> {c.name}
            </Link>
          ) : (
            <span
              key={c.slug}
              className="flex items-center gap-1.5 rounded-pill border border-border bg-surface px-4 py-2 text-[13.5px] font-bold text-muted"
            >
              <MapPin className="h-[13px] w-[13px] text-muted" /> {c.name}
            </span>
          )
        )}
      </div>
    </section>
  );
}

export default function LocationDetail() {
  const { locationId, serviceId } = useParams();
  const location = locations.find((l) => l.slug === locationId);
  const [openFaq, setOpenFaq] = useState(0);

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

  // ---------------------------------------------------------------------
  // Combo page: location + service
  // ---------------------------------------------------------------------
  if (service) {
    const header = expand(service.headerTemplate, vars);
    const whyItMatters = buildWhyItMatters(location, service);
    const faqs = buildLocalFaqs(location, service);
    const otherServices = services.filter((s) => s.slug !== service.slug);

    return (
      <main>
        {/* Hero */}
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
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
                Get a Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+17207091681" className="inline-flex items-center gap-2 rounded-pill border border-white/28 px-8 py-4 text-base font-bold text-white">
                <Phone className="h-4 w-4" /> Call (720) 709-1681
              </a>
            </div>
            <TrustBadges />
          </div>
        </section>

        <LocalBentoGrid location={location} service={service} />

        {/* Section 1: Why it matters */}
        <section className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Local Relevance</div>
              <h2 className="mb-4 text-[26px] font-bold sm:text-[32px]">
                Why {service.name} Matters in {location.city}
              </h2>
              <p className="leading-relaxed text-muted">{whyItMatters}</p>
            </div>
            <ClimateFactorsCard location={location} factors={[location.risk1, location.risk2, location.risk3]} />
          </div>
        </section>

        {/* Section 2: benefits + common issues */}
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
                Benefits &amp; Common Issues
              </div>
              <h2 className="text-[26px] font-bold sm:text-[32px]">What You Get, What We Solve</h2>
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-bold">Lifetime Benefits</h3>
                <ul className="flex flex-col gap-3.5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 rounded-xl border border-border bg-white p-4">
                      <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-orange" />
                      <span className="text-[14px] leading-relaxed text-[#2b2f36]">{expand(b, vars)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold">Common {location.city} Headaches</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {COMMON_ISSUES.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="rounded-2xl border border-border bg-white p-5">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange/10 text-orange">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="mb-1.5 text-[14.5px] font-bold">{title}</h4>
                      <p className="text-[13px] leading-relaxed text-muted">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: process */}
        <section className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              How It Works
            </div>
            <h2 className="text-[26px] font-bold sm:text-[32px]">Our 4-Step {service.name} Process in {location.city}</h2>
          </div>
          <ProcessTimeline steps={service.process.map((p) => ({ title: p.title, desc: expand(p.desc, vars) }))} />
        </section>

        {/* Section 4: FAQ */}
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-[820px] px-6">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
                Questions, Answered
              </div>
              <h2 className="text-[26px] font-bold sm:text-[32px]">{location.city} FAQs</h2>
            </div>
            <div className="flex flex-col gap-3">
              {faqs.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq((cur) => (cur === i ? -1 : i))} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: other services */}
        <section className="mx-auto max-w-[1280px] px-6 py-16">
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">More Services</div>
          <h2 className="mb-10 text-[26px] font-bold sm:text-[32px]">Other Services Available in {location.city}</h2>
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

        {/* Section 6: nearby cities */}
        <NearbyCities location={location} />

        <CtaSection location={location} />
      </main>
    );
  }

  // ---------------------------------------------------------------------
  // Hub page: location only, all services
  // ---------------------------------------------------------------------
  const whyItMattersHub = buildWhyItMattersHub(location);
  const hubFaqs = [
    { q: `What areas of ${location.city} do you serve?`, a: `We serve ${location.city} and the surrounding metro, including ${location.neighborhoods}. If you're unsure whether your address is covered, a free estimate call will confirm it.` },
    { q: "Do you offer free estimates?", a: `Yes — every ${location.city} estimate is free and no-obligation, typically scheduled within the week.` },
    { q: expand("Why do {CITY} gutters need extra protection compared to other climates?", vars), a: "A generic, nationally-sized guard misses what this specific climate does to a roofline. We size every install for it instead." },
    { q: `Do you offer financing for ${location.city} homeowners?`, a: "Yes. Qualified homeowners can take advantage of 0% financing for up to 18 months, plus seasonal discounts of 30-40% off the full project." },
  ];

  return (
    <main>
      {/* Hero */}
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
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link to="/booking" className="inline-flex items-center gap-2 rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
              Get a Free Estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+17207091681" className="inline-flex items-center gap-2 rounded-pill border border-white/28 px-8 py-4 text-base font-bold text-white">
              <Phone className="h-4 w-4" /> Call (720) 709-1681
            </a>
          </div>
          <TrustBadges />
        </div>
      </section>

      <LocalBentoGrid location={location} />

      {/* Section 1: Why it matters */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Local Relevance</div>
            <h2 className="mb-4 text-[26px] font-bold sm:text-[32px]">Why Gutter Protection Matters in {location.city}</h2>
            <p className="leading-relaxed text-muted">{whyItMattersHub}</p>
          </div>
          <ClimateFactorsCard location={location} factors={CLIMATE_FACTORS[location.state] || []} />
        </div>
      </section>

      {/* Section 2: common issues (hub has no single service's benefit list, so lead with issues + credentials) */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              Common Issues We Solve
            </div>
            <h2 className="text-[26px] font-bold sm:text-[32px]">What {location.city} Gutters Run Into</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMMON_ISSUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-white p-6">
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <Icon className="h-[22px] w-[22px]" />
                </div>
                <h3 className="mb-2 text-[15px] font-bold">{title}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: process */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            How It Works
          </div>
          <h2 className="text-[26px] font-bold sm:text-[32px]">Our 4-Step Process in {location.city}</h2>
        </div>
        <ProcessTimeline
          steps={[
            { title: "Free Inspection", desc: `We walk your roofline in ${location.city} and confirm your free estimate on the spot.` },
            { title: "Clean & Tune-Up", desc: "Full gutter flush, hanger re-securing, and pitch correction before anything is installed." },
            { title: "Custom Fitting", desc: `Guards or gutters are cut and fastened to your exact roofline, sized for ${location.climateTagLower}.` },
            { title: "Final Quality Test", desc: "Every corner and end cap is sealed and tested with running water before we call the job done." },
          ]}
        />
      </section>

      {/* Section 4: FAQ */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[820px] px-6">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              Questions, Answered
            </div>
            <h2 className="text-[26px] font-bold sm:text-[32px]">{location.city} FAQs</h2>
          </div>
          <div className="flex flex-col gap-3">
            {hubFaqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq((cur) => (cur === i ? -1 : i))} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: services in this city */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Services in {location.city}</div>
        <h2 className="mb-10 text-[26px] font-bold sm:text-[32px]">Pick a Service</h2>
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

      {/* Section 6: nearby cities */}
      <NearbyCities location={location} />

      <CtaSection location={location} />
    </main>
  );
}

function CtaSection({ location }) {
  return (
    <section className="bg-gradient-to-br from-navy to-[#152230] py-16 text-center text-white">
      <div className="mx-auto max-w-[560px] px-6">
        <h2 className="text-[28px] font-bold sm:text-[34px]">
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
