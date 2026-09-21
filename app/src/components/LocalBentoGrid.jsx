import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Sun, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { CLIMATE_FACTORS } from "../data/templateUtils";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
  }),
};

function EyebrowPill({ children }) {
  return (
    <div className="mb-4 inline-flex items-center rounded-pill border border-orange/30 bg-orange/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-orange-dark">
      {children}
    </div>
  );
}

function buildCredentialsCopy(location, service) {
  const place = location ? `${location.city}, ${location.stateAbbr}` : "Colorado's Front Range and the greater Sacramento region";
  const svc = service ? service.name.toLowerCase() : "gutter protection";
  return `Gutter Guard Experts® has been family-owned and operated since 2012 — no investors, no franchise fees, just tradespeople who spent three years and seven prototypes earning a U.S. patent on the 2.0 PRO® system. In ${place}, that means every ${svc} job is handled by our own certified crew, never a subcontractor, from the first free inspection to the final walkthrough. It's the same accountability a national chain can't offer: the technician measuring your roofline is the one standing behind the warranty.`;
}

function buildClimateCopy(location) {
  const factors = location ? CLIMATE_FACTORS[location.state] || [] : [];
  if (location && factors.length) {
    const [f1, f2, f3] = factors;
    return `${location.city} roofs take a beating that generic, nationally-sized gutter guards were never built to handle. Between ${f1} and ${f2}${f3 ? `, plus ${f3}` : ""}, an unprotected system clogs or fails fast here. 2.0 PRO® is engineered specifically for this kind of stress — an aircraft-grade T5 aluminum frame that won't warp, and a 440-micron stainless mesh that keeps moving water through instead of sheeting over the edge, no matter what the season throws at your roofline.`;
  }
  return `Colorado's Front Range brings heavy snow loads, sharp freeze-thaw cycles, hail, and pine needle debris, while our Sacramento-area homes deal with atmospheric river storms, oak leaf litter, and dry-season dust. Two very different climates, one system built to handle both: an aircraft-grade T5 aluminum frame that won't warp, and a 440-micron stainless mesh fine enough to stop debris without ever letting water back up. Whichever market you're in, 2.0 PRO® is sized to what your roofline actually deals with, not a generic national spec.`;
}

function buildProcessCopy(location, service) {
  const place = location ? location.city : "every market we serve";
  const svc = service ? service.name : "gutter protection";
  return `Every job starts with a free, no-obligation in-home consultation — no pressure, just a straight assessment of what your roofline needs. From there it's three steps: a full clean and tune-up, a custom-fit install sized to ${place}'s climate, and a final quality check before we call it done. ${svc} booked through us is backed by a fully transferable Triple-Lifetime Warranty covering materials, workmanship, and a 100% no-clog guarantee — for as long as you own your home.`;
}

export default function LocalBentoGrid({ location, service }) {
  const credentialsEyebrow = location ? `${location.state.toUpperCase()} CRAFTSMANSHIP` : "LOCAL EXPERTISE";
  const cityLabel = location ? location.city : "Colorado & California";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto my-12 grid max-w-6xl grid-cols-1 gap-6 px-4 lg:grid-cols-12"
    >
      {/* Card 1: Company Overview & Local Credentials */}
      <motion.div
        custom={0}
        variants={cardVariants}
        className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.08)] lg:col-span-7"
      >
        <EyebrowPill>{credentialsEyebrow}</EyebrowPill>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10 text-navy">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-xl font-bold sm:text-2xl">Your Local Gutter &amp; Guard Experts in {cityLabel}</h3>
        <p className="text-[14.5px] leading-relaxed text-muted">{buildCredentialsCopy(location, service)}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-slate-100 pt-5">
          <span className="flex items-center gap-2 text-[13px] font-bold text-navy">
            <CheckCircle2 className="h-4 w-4 text-orange" /> Precision Installation
          </span>
          <span className="flex items-center gap-2 text-[13px] font-bold text-navy">
            <CheckCircle2 className="h-4 w-4 text-orange" /> Patented 2.0 PRO® Guard
          </span>
        </div>
      </motion.div>

      {/* Card 2: Environment & Climate Protection */}
      <motion.div
        custom={1}
        variants={cardVariants}
        className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.08)] lg:col-span-5"
      >
        <EyebrowPill>Extreme Weather Protection</EyebrowPill>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10 text-orange">
          <Sun className="h-6 w-6" />
        </div>
        <h3 className="mb-3 text-xl font-bold sm:text-2xl">Built for the {cityLabel} Climate</h3>
        <p className="text-[14.5px] leading-relaxed text-muted">{buildClimateCopy(location)}</p>
        <div className="mt-6 rounded-2xl border border-orange/20 bg-orange/5 p-4 text-xs font-semibold text-orange-dark">
          440-micron surgical-grade stainless mesh + aircraft-grade T5 aluminum frame — rated for year-round exposure.
        </div>
      </motion.div>

      {/* Card 3: Process, Warranty & CTA */}
      <motion.div
        custom={2}
        variants={cardVariants}
        className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-900 shadow-[0_12px_32px_rgba(15,23,42,0.08)] lg:col-span-12"
      >
        <EyebrowPill>Community Roots &amp; Guarantee</EyebrowPill>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10 text-navy lg:hidden">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold sm:text-2xl">Dedicated Service Across {cityLabel}</h3>
            <p className="text-[14.5px] leading-relaxed text-muted">{buildProcessCopy(location, service)}</p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-4">
            <div className="hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-navy/10 text-navy lg:flex">
              <Award className="h-6 w-6" />
            </div>
            <Link
              to="/booking"
              className="flex items-center gap-2 rounded-full bg-navy px-8 py-4 font-bold text-white shadow-lg transition hover:bg-slate-800"
            >
              Get a Free Estimate <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
