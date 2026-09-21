import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Droplets,
  Filter,
  Layers,
  Wind,
  Shield,
  Droplet,
  Wrench,
  Sparkles,
  Flame,
  Building2,
  CheckCircle2,
  ArrowLeftRight,
  AlertTriangle,
  CreditCard,
  Phone,
  MapPin,
  ChevronDown,
  Snowflake,
} from "lucide-react";
import HeroCarousel from "../components/HeroCarousel.jsx";

const TECH_FEATURES = [
  {
    icon: Droplets,
    title: "Patented Triple-Rib™ Water Siphoning",
    desc: "Three stepped ribs slow rainfall on contact and create capillary action that pulls water down into the gutter — capturing over 40% more water than a flat-mesh guard, even in downpours.",
  },
  {
    icon: Filter,
    title: "Surgical 440-Micron Stainless Mesh",
    desc: "A woven micro-filter fine enough to stop pine needles, roof grit and wind-blown sand — yet open enough to keep water moving. It won't clog, rust, corrode or break down under UV.",
  },
  {
    icon: Layers,
    title: "Aircraft-Grade T5 Aluminum Frame",
    desc: "Extruded and tempered to a T5 finish with a tensile strength over 20,000 PSI — up to 10x stronger than the thin stamped aluminum in most gutter guards. It won't warp, bow or separate.",
  },
  {
    icon: Wind,
    title: "Angled Self-Cleaning Pitch",
    desc: "Installed at nearly the same pitch as your roofline, so leaves and debris slide off in as little as 10–15 mph of wind. Greatly reduced — often eliminated — maintenance.",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Frame Material",
    pro: ["T5 Aircraft-Grade Aluminum", "20,000+ PSI tensile strength"],
    leafFilter: { win: false, text: ["Painted aluminum frame", "Reports of warping with heat/cold swings"] },
    leafGuard: { win: false, text: ["One-piece aluminum hood", "Bulky profile, visible from the ground"] },
  },
  {
    feature: "Filtration Mesh",
    pro: ["440-micron surgical steel", "Blocks pine needles & grit, won't corrode"],
    leafFilter: { win: false, text: ["Micro-mesh screen", "Frame/mesh separation reported over time"] },
    leafGuard: { win: false, text: ["Open-hood, no mesh", "Lets in shingle grit & small debris"] },
  },
  {
    feature: "Water Siphoning",
    pro: ["Triple-Rib™ design", "Captures 40%+ more water via capillary action"],
    leafFilter: { win: false, text: ["Flat mesh surface", "Rain can sheet over the edge in storms"] },
    leafGuard: { win: false, text: ["Relies on surface tension", "Water overshoots in heavy rain"] },
  },
  {
    feature: "Wind Debris Clearing",
    pro: ["Self-clears at 10–15 mph", "Angled pitch sheds debris naturally"],
    leafFilter: { win: false, text: ["Sits flat in the gutter", "Acts like a shelf, debris compacts"] },
    leafGuard: { win: false, text: ["Curved hood", "Wet leaves stick to the surface"] },
  },
  {
    feature: "Existing Gutter Compatibility",
    pro: ["New or existing gutters", "Any roof type, no tear-off required"],
    leafFilter: { win: true, text: ["Most existing gutters", "Generally compatible"] },
    leafGuard: { win: false, text: ["Full replacement required", "Even if current gutters are new"] },
  },
  {
    feature: "Winter Heating Options",
    pro: ["2.0 PRO HEAT™ available", "Integrated ice-melt cable option"],
    leafFilter: { win: false, text: ["No heating option", "Prone to ice dams"] },
    leafGuard: { win: false, text: ["No heating option", "Hood traps snow & ice"] },
  },
  {
    feature: "Warranty Scope",
    pro: ["Triple-Lifetime Warranty", "Materials + workmanship + no-clog, transferable"],
    leafFilter: { win: false, text: ["No-clog warranty only", "No lifetime materials/workmanship coverage"] },
    leafGuard: { win: false, text: ["Limited lifetime warranty", "Typically non-transferable"] },
  },
];

const SERVICES = [
  { slug: "2-0-pro-installation", name: "2.0 PRO® Guard Installation", desc: "Patented Triple-Rib™ micro-mesh protection installed on new or existing gutters.", icon: Shield },
  { slug: "gutter-cleaning", name: "Gutter Cleaning", desc: "A full gutter and downspout flush — the last cleaning you'll ever need once guards go on.", icon: Droplet },
  { slug: "repair-tune-up", name: "Repair & Tune-Up", desc: "Hanger re-securing, pitch correction and corners sealed with 50-year tri-polymer sealant.", icon: Wrench },
  { slug: "seamless-gutters", name: "Seamless Gutters", desc: "Custom-fabricated K-style gutters, on-site, in more than 30 colors.", icon: Sparkles },
  { slug: "2-0-pro-heat", name: "2.0 PRO HEAT™", desc: "A discreet, integrated ice-melt system that keeps meltwater moving all winter long.", icon: Flame },
  { slug: "commercial", name: "Commercial Protection", desc: "Guard systems engineered and installed for multi-unit and commercial roof lines.", icon: Building2 },
];

const WARRANTY_ITEMS = [
  { title: "Lifetime Materials Warranty", desc: "The guards themselves are covered against defects for as long as you own your home." },
  { title: "Lifetime Workmanship Warranty", desc: "Every installation is covered against defects in the work itself." },
  { title: "Lifetime No-Clog Guarantee", desc: "If your gutters ever clog with 2.0 PRO® installed, we fix it at no extra cost — period." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Clean", desc: "Every job starts with a full gutter and downspout flush — the last cleaning you'll ever need once 2.0 PRO® is installed." },
  { num: "02", title: "Tune-Up", desc: "We re-secure loose hangers, correct pitch for proper flow, and seal every corner and end cap with a 50-year tri-polymer sealant." },
  { num: "03", title: "Protect", desc: "Certified technicians install the 2.0 PRO® Gutter Guard system — built, and warrantied, to last a lifetime." },
];

const WARNING_SIGNS = [
  { title: "Rain overflowing during storms", desc: "Water spilling over the edge instead of into the downspout." },
  { title: "Sagging or pulling-away gutters", desc: "Trapped debris weight is stressing your hangers and fascia." },
  { title: "Foundation cracks or erosion", desc: "Overflow pooling near the foundation instead of routing away." },
  { title: "Icicles and ice dams", desc: "Trapped meltwater refreezing along the roofline in winter." },
  { title: "Wood rot on the fascia", desc: "Standing water breaking down the wood behind your gutters." },
  { title: "Pests and insect nests", desc: "Standing debris attracts mosquitoes, birds and rodents." },
  { title: "Stained or streaked siding", desc: "Water marks beneath the gutter line signal it's overflowing regularly." },
];

const FAQS = [
  { q: "Will 2.0 PRO® gutter guards void my roof warranty?", a: "No. The 2.0 PRO® system attaches to your existing gutters, not your roofline or shingles, so your roof manufacturer's warranty stays fully intact. In most cases, keeping water and ice off your roof edge actually helps your roof last longer." },
  { q: "How does 2.0 PRO® perform in snow and freezing temperatures?", a: "The stainless-steel mesh resists ice buildup and the angled pitch sheds snow load naturally. In heavy freeze-thaw climates, we also offer the 2.0 PRO HEAT™ system — a discreet heat-cable add-on that keeps meltwater moving through the guard and gutter instead of forming ice dams." },
  { q: "Am I really eligible for the $75 Visa gift card?", a: "Yes. Any homeowner who completes a free, no-obligation in-home estimate qualifies for a $75 Visa gift card, whether or not you move forward with the project. Limit one per household." },
  { q: "Do you offer financing?", a: "Yes. Qualified homeowners can take advantage of 0% financing for up to 18 months, and we regularly run seasonal offers of up to 30–40% off the full project, plus an extra 10% off for military members and homeowners 55 and up." },
  { q: "Will the guards work with my existing gutters?", a: "In almost every case, yes. 2.0 PRO® is engineered to install directly onto new or existing gutters and is compatible with virtually any roof type — asphalt shingle, metal, tile or wood shake." },
  { q: "What exactly does the Triple-Lifetime Warranty cover?", a: "Three separate lifetime guarantees: materials (the guards won't rust, corrode or break down), workmanship (your installation is covered against defects), and a 100% no-clog guarantee — if your gutters ever clog with our guards installed, we fix it at no extra cost." },
  { q: "How long does a typical installation take?", a: "Most homes are completed in a single day. Every job starts with a full gutter and downspout cleaning and a tune-up — re-securing hangers, correcting pitch and sealing corners and end caps — before the 2.0 PRO® guards go on." },
  { q: "Do the guards actually stop pine needles and roof grit?", a: "Yes. The 440-micron surgical-grade stainless-steel mesh is fine enough to block pine needles, shingle grit and wind-blown sand, while the patented Triple-Rib™ design keeps water moving through instead of sheeting over the edge." },
  { q: "Is the warranty transferable if I sell my home?", a: "Yes — all three parts of the Triple-Lifetime Warranty transfer to the next homeowner at no cost, which is a genuine selling point when you list your home." },
  { q: "What areas do you service?", a: "We install and service 2.0 PRO® across Colorado's Front Range — including Denver, Aurora, Lakewood, Arvada, Boulder and Fort Collins — as well as the greater Sacramento region in California, including Roseville, Folsom and Elk Grove." },
];

const AREA_BUTTONS = [
  { name: "Denver", href: "/service-areas/denver-co" },
  { name: "Sacramento", href: "/service-areas/sacramento-ca" },
  { name: "Aurora", href: "/service-areas/aurora-co" },
  { name: "Roseville", href: "/service-areas" },
  { name: "Folsom", href: "/service-areas" },
  { name: "Lakewood", href: "/service-areas" },
  { name: "Arvada", href: "/service-areas" },
  { name: "Boulder", href: "/service-areas" },
  { name: "Fort Collins", href: "/service-areas" },
  { name: "Elk Grove", href: "/service-areas" },
];

function CompareCell({ win, lines }) {
  const Icon = win ? Check : X;
  return (
    <td className="px-5 py-4 align-top text-[13.5px] text-[#2b2f36]">
      <div className="flex items-start gap-2">
        <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${win ? "text-green-600" : "text-red-500"}`} />
        <div>
          <strong className="block text-ink">{lines[0]}</strong>
          <span className="text-muted">{lines[1]}</span>
        </div>
      </div>
    </td>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className="rounded-2xl border border-border bg-white">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="text-[15.5px] font-bold text-ink">{q}</span>
        <ChevronDown className={`h-[18px] w-[18px] flex-shrink-0 text-ink/60 transition-transform ${open ? "rotate-180" : ""}`} />
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main>
      <HeroCarousel />

      {/* ============ 1. WHY 2.0 PRO TECHNOLOGY WINS ============ */}
      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            The Engineering
          </div>
          <h2 className="text-[28px] font-bold sm:text-[36px]">Why 2.0 PRO® Technology Wins</h2>
          <p className="mt-4 text-lg text-muted">
            Three years of prototyping, seven design iterations, and one U.S. patent went into a gutter guard built
            to actually outperform — not just look the part.
          </p>
        </div>
        <div className="mb-10 overflow-hidden rounded-2xl" style={{ maxHeight: 420 }}>
          <img
            src="/assets/tech-closeup.jpg"
            alt="Close-up of 2.0 PRO gutter guard mesh cleanly installed under the shingle edge on a real home"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                <Icon className="h-[22px] w-[22px]" />
              </div>
              <h3 className="mb-2 text-[17px] font-bold">{title}</h3>
              <p className="text-[14px] leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 2. COMPARISON MATRIX ============ */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              Head-to-Head
            </div>
            <h2 className="text-[28px] font-bold sm:text-[36px]">2.0 PRO® vs. LeafFilter vs. LeafGuard</h2>
            <p className="mt-4 text-lg text-muted">
              A side-by-side look at how our patented system stacks up against the two most-searched competitors.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[760px] border-collapse bg-white">
              <thead>
                <tr>
                  <th className="w-[22%] bg-surface px-5 py-4 text-left font-display text-[15px] text-navy">Feature</th>
                  <th className="w-[26%] bg-navy px-5 py-4 text-left font-display text-[15px] text-white">
                    <span className="mb-1 inline-block rounded-pill bg-orange px-2.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-white">Recommended</span>
                    <br />2.0 PRO®
                  </th>
                  <th className="px-5 py-4 text-left font-display text-[15px]">LeafFilter</th>
                  <th className="px-5 py-4 text-left font-display text-[15px]">LeafGuard</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="border-t border-border hover:bg-surface/60">
                    <td className="px-5 py-4 align-top text-[14.5px] font-bold text-navy">{row.feature}</td>
                    <td className="bg-[#fff7f2] px-5 py-4 align-top text-[13.5px] text-[#2b2f36]">
                      <div className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        <div>
                          <strong className="block text-ink">{row.pro[0]}</strong>
                          <span className="text-muted">{row.pro[1]}</span>
                        </div>
                      </div>
                    </td>
                    <CompareCell win={row.leafFilter.win} lines={row.leafFilter.text} />
                    <CompareCell win={row.leafGuard.win} lines={row.leafGuard.text} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ 3. SERVICE DIVISION GRID ============ */}
      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            What We Do
          </div>
          <h2 className="text-[28px] font-bold sm:text-[36px]">Every Gutter Service, Under One Roof</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ slug, name, desc, icon: Icon }) => (
            <Link
              key={slug}
              to={`/service-areas/denver-co/${slug}`}
              className="rounded-2xl border border-border bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/7 text-navy">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{name}</h3>
              <p className="text-[14.5px] leading-relaxed text-muted">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-orange-dark">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 4. WARRANTY STORY ============ */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 5" }}>
              <img
                src="/assets/eebfe3ea32d811c69e6187528eb5905a.jpg"
                alt="A family enjoying dinner in their backyard at dusk, protected gutters visible along the roofline"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Backed for Life</div>
              <h2 className="mb-4 text-[28px] font-bold sm:text-[36px]">The Triple-Lifetime Warranty Story</h2>
              <p className="text-lg text-muted">
                Founded in 2012 as a family-owned company, Gutter Guard Experts® spent three years, seven prototypes,
                and countless hours working with engineers from Colorado to Germany to earn a U.S. patent on the 2.0
                PRO® design. That obsession with getting it right is why we back every install with three lifetime
                guarantees.
              </p>
              <div className="mt-7 flex flex-col gap-4">
                {WARRANTY_ITEMS.map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                    <div>
                      <strong className="block text-[15.5px] text-ink">{item.title}</strong>
                      <span className="text-[14px] text-muted">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-white p-5">
                <ArrowLeftRight className="mt-0.5 h-6 w-6 flex-shrink-0 text-navy" />
                <p className="text-[14px] text-muted">
                  All three warranties are <strong className="text-navy">fully transferable</strong> to the next
                  homeowner if you sell — and none of it voids your existing roof warranty.
                </p>
              </div>
              <Link to="/warranty" className="mt-7 inline-flex items-center gap-2 rounded-pill bg-navy px-8 py-4 font-bold text-white">
                View Full Warranty Terms <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. 3-STEP PROCESS ============ */}
      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            How It Works
          </div>
          <h2 className="text-[28px] font-bold sm:text-[36px]">Clean. Tune-Up. Protect.</h2>
          <p className="mt-4 text-lg text-muted">One visit, three steps, and you're done cleaning gutters for good.</p>
        </div>
        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-[12%] top-[27px] hidden border-t-2 border-dashed border-border sm:block" />
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} className="relative z-10 px-3 text-center">
              <div className={`mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border-[5px] border-white font-display text-lg font-bold text-white shadow-[0_0_0_2px_#E2E8F0] ${i === 2 ? "bg-orange" : "bg-navy"}`}>
                {step.num}
              </div>
              <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
              <p className="text-[14.5px] text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 6. WARNING SIGNS + CONVERSION BOX ============ */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Don't Ignore These</div>
              <h2 className="mb-6 text-[28px] font-bold sm:text-[36px]">7 Warning Signs Your Gutters Need Attention</h2>
              <div className="flex flex-col">
                {WARNING_SIGNS.map((w) => (
                  <div key={w.title} className="flex items-start gap-3.5 border-b border-border py-4 last:border-b-0">
                    <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] bg-orange/10 text-orange-dark">
                      <AlertTriangle className="h-[18px] w-[18px]" />
                    </div>
                    <div>
                      <strong className="block text-[15.5px] text-ink">{w.title}</strong>
                      <span className="text-[14px] text-muted">{w.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky top-[150px] rounded-[24px] bg-navy p-9 text-white">
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-orange/35 bg-orange/18 px-4 py-3">
                <CreditCard className="h-5 w-5 flex-shrink-0 text-white" />
                <div>
                  <strong className="block text-[15px]">$75 Visa Gift Card</strong>
                  <span className="text-[12.5px] text-white/85">With your free in-home estimate</span>
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold">Don't Wait for the Next Storm</h3>
              <p className="mb-7 text-white/85">
                Every warning sign above gets more expensive the longer it sits. Get a free, no-obligation estimate
                today and see exactly what it'll take to make gutter problems a thing of the past.
              </p>
              <Link to="/booking" className="mb-3 block rounded-pill bg-orange py-3.5 text-center font-bold text-white">
                Get My Free Estimate
              </Link>
              <a href="tel:+17207091681" className="flex items-center justify-center gap-2 rounded-pill border border-white/28 py-3.5 font-bold text-white">
                <Phone className="h-4 w-4" /> Call (720) 709-1681
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. FAQ ============ */}
      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            Questions, Answered
          </div>
          <h2 className="text-[28px] font-bold sm:text-[36px]">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto flex max-w-[840px] flex-col gap-3">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq((cur) => (cur === i ? -1 : i))} />
          ))}
        </div>
      </section>

      {/* ============ 8. REGIONAL SERVICE AREAS ============ */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              Where We Work
            </div>
            <h2 className="text-[28px] font-bold sm:text-[36px]">Proudly Protecting Homes Across Colorado &amp; California</h2>
          </div>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {AREA_BUTTONS.map((a) => (
              <Link
                key={a.name}
                to={a.href}
                className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-3 py-4 text-center text-[14.5px] font-bold text-navy transition hover:-translate-y-1 hover:border-orange hover:bg-[#fff7f2] hover:text-orange-dark"
              >
                <MapPin className="h-[15px] w-[15px] flex-shrink-0 text-orange" />
                {a.name}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/service-areas" className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-orange-dark">
              View all service areas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 9. CTA BANNER ============ */}
      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="rounded-[32px] bg-gradient-to-br from-navy to-[#152230] p-10 sm:p-14">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="max-w-[560px]">
              <div className="mb-5 flex flex-wrap gap-2.5">
                <span className="flex items-center gap-2 rounded-xl border border-cyan/30 bg-cyan/10 px-3.5 py-2 text-[13px] font-bold text-[#dff0fb]">
                  <Snowflake className="h-4 w-4 text-cyan" /> 2.0 PRO HEAT™ Ready
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-cyan/30 bg-cyan/10 px-3.5 py-2 text-[13px] font-bold text-[#dff0fb]">
                  <Shield className="h-4 w-4 text-cyan" /> Winter-Proof Guarantee
                </span>
              </div>
              <h2 className="text-[28px] font-bold text-white sm:text-[36px]">Get a Free Estimate Before the Next Storm Hits</h2>
              <p className="mt-3.5 text-white/85">
                Join 10,000+ homeowners who stopped cleaning their gutters for good. Estimates are free, and every
                visit qualifies you for a $75 Visa gift card.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3.5">
              <Link to="/booking" className="rounded-pill bg-orange px-8 py-4 font-bold text-white">
                Get an Estimate
              </Link>
              <a href="tel:+17207091681" className="flex items-center gap-3 font-display text-[26px] font-bold text-white">
                <Phone className="h-6 w-6 text-orange" />
                (720) 709-1681
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
