import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, Users, BadgeCheck, ChevronDown, MapPin } from "lucide-react";
import services from "../data/services.json";
import locations from "../data/locations.json";
import { expand, GENERIC_VARS } from "../data/templateUtils";
import { COMMON_ISSUES } from "./LocationDetail.jsx";
import LocalBentoGrid from "../components/LocalBentoGrid.jsx";

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

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.slug === serviceId);
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return (
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <p className="mt-4 text-muted">
          <Link to="/services-hub" className="font-bold text-orange">
            View all services
          </Link>
          .
        </p>
      </main>
    );
  }

  const vars = { ...GENERIC_VARS, "{SERVICE_NAME}": service.name };
  const header = expand(service.headerTemplate, vars);
  const intro = expand(service.introTemplate, vars);
  const benefits = service.benefits.map((b) => expand(b, vars));
  const process = service.process.map((p) => ({ title: p.title, desc: expand(p.desc, vars) }));
  const faqs = [
    ...service.faqGeneric,
    {
      q: `Do you offer ${service.name} in my area?`,
      a: "We install and service throughout Colorado's Front Range (Denver, Aurora, and the surrounding metro) and the greater Sacramento, California region. Pick your city below for pricing and scheduling specific to your local climate.",
    },
    {
      q: "Do you offer financing?",
      a: "Yes. Qualified homeowners can take advantage of 0% financing for up to 18 months, and we regularly run seasonal offers of up to 30–40% off the full project.",
    },
  ];
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden bg-navy pb-16 pt-40">
        <img src={`/assets/${service.thumb}`} alt={service.thumbAlt} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-6">
          <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services-hub">Services</Link>
            <span>/</span>
            <span>{service.name}</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-white/25 bg-white/10 px-4 py-1.5 text-[13.5px] font-bold text-white">
            {service.name}
          </div>
          <h1 className="max-w-3xl text-[32px] font-bold leading-tight text-white sm:text-[46px]">{header}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{service.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link to="/booking" className="inline-flex items-center gap-2 rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
              Get a Free Estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+17207091681" className="inline-flex items-center gap-2 rounded-pill border border-white/28 px-8 py-4 text-base font-bold text-white">
              <Phone className="h-4 w-4" /> Call (720) 709-1681
            </a>
          </div>
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
        </div>
      </section>

      <LocalBentoGrid service={service} />

      {/* Why this service matters */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Overview</div>
        <h2 className="mb-4 max-w-2xl text-[26px] font-bold sm:text-[32px]">Why {service.name} Matters</h2>
        <p className="max-w-3xl leading-relaxed text-muted">{intro}</p>
      </section>

      {/* Benefits + common issues */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-bold">Lifetime Benefits</h3>
              <ul className="flex flex-col gap-3.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 rounded-xl border border-border bg-white p-4">
                    <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-orange" />
                    <span className="text-[14px] leading-relaxed text-[#2b2f36]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Common Issues We Solve</h3>
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

      {/* Process */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            How It Works
          </div>
          <h2 className="text-[26px] font-bold sm:text-[32px]">Our 4-Step {service.name} Process</h2>
        </div>
        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute inset-x-[8%] top-[27px] hidden border-t-2 border-dashed border-border lg:block" />
          {process.map((step, i) => (
            <div key={step.title} className="relative z-10 text-center">
              <div className="mx-auto mb-5 flex h-[56px] w-[56px] items-center justify-center rounded-full border-[5px] border-white bg-navy font-display text-base font-bold text-white shadow-[0_0_0_2px_#E2E8F0]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2 text-[15.5px] font-bold">{step.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[820px] px-6">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              Questions, Answered
            </div>
            <h2 className="text-[26px] font-bold sm:text-[32px]">{service.name} FAQs</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq((cur) => (cur === i ? -1 : i))} />
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">More Services</div>
        <h2 className="mb-10 text-[26px] font-bold sm:text-[32px]">Other Ways We Protect Your Home</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg">
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

      {/* Available in these markets — the real internal-link payoff: routes into the localized combo pages */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Regional Service Area</div>
          <h2 className="mb-3 text-[26px] font-bold sm:text-[32px]">{service.name}, Localized to Your City</h2>
          <p className="mb-8 max-w-2xl text-muted">
            Every market has its own climate risks — pick your city for {service.name.toLowerCase()} pricing and copy
            written for exactly what your roofline deals with.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/service-areas/${loc.slug}/${service.slug}`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-1 hover:border-orange hover:shadow-lg"
              >
                <span className="flex items-center gap-2.5 font-bold text-navy">
                  <MapPin className="h-[18px] w-[18px] text-orange" />
                  {loc.city}, {loc.stateAbbr}
                </span>
                <ArrowRight className="h-4 w-4 text-orange-dark" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy to-[#152230] py-16 text-center text-white">
        <div className="mx-auto max-w-[560px] px-6">
          <h2 className="text-[28px] font-bold sm:text-[34px]">Ready to Get Started?</h2>
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
    </main>
  );
}
