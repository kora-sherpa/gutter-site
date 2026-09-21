import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Check, ChevronDown, Phone } from "lucide-react";

const PROBLEMS = [
  { title: "Warping plastic frame", desc: "expands and contracts with hot and cold temperature swings." },
  { title: "Flat design collects debris", desc: "sits relatively flat in the gutter and acts like a shelf." },
  { title: "Screen separation", desc: "the plastic frame and stainless mesh expand at different rates and can pull apart." },
  { title: "Water overshoots in heavy rain", desc: "mesh size and construction let rain slide over the edge." },
  { title: "Snow and ice buildup", desc: "no integrated solution for winter climates." },
  { title: "No lifetime warranty", desc: "on materials or workmanship." },
];

const ADVANTAGES = [
  { title: "Aircraft-grade aluminum frame", desc: "holds its shape through every season, no warping." },
  { title: "Angled installation", desc: "prevents leaves, pine needles, and debris from building up on top." },
  { title: "One fused system", desc: "frame and mesh engineered together, so there's no separation to worry about." },
  { title: "Triple-Rib™ design", desc: "slows water as it hits the screen, capturing over 40% more in heavy storms." },
  { title: "2.0 PRO HEAT™ available", desc: "optional ice-melt add-on engineered for winter climates." },
  { title: "Triple-Lifetime Warranty", desc: "materials, workmanship, and no-clog, fully transferable." },
];

const FAQS = [
  {
    q: "Can you install gutter guards on existing gutters?",
    a: "Yes — 2.0 PRO® is designed to install on new or existing gutters after a full cleaning and tune-up, in most cases without any gutter replacement.",
  },
  {
    q: "Can these professional gutter guards withstand heavy rain?",
    a: "Yes. The patented Triple-Rib™ design slows water as it hits the screen, capturing over 40% more water than a flat-mesh competitor during heavy storms.",
  },
  {
    q: "Will the gutter guards be able to handle snow and ice?",
    a: "Yes, with the optional 2.0 PRO HEAT™ add-on, which integrates ice-melt cable to keep gutters flowing and help prevent ice damming through winter.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-white">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="text-[15.5px] font-bold text-ink">{q}</span>
        <ChevronDown className={`h-[18px] w-[18px] flex-shrink-0 text-ink/60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="text-[14.5px] leading-relaxed text-muted">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function LeafFilterVs() {
  return (
    <main>
      <section className="bg-navy pb-16 pt-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[13.5px] text-white/55">
            <Link to="/" className="font-bold text-white/85">Home</Link>
            <span>/</span>
            <span className="text-white">2.0 PRO® vs. LeafFilter</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-orange/35 bg-orange/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#ffb287]">
            Product Comparison
          </div>
          <h1 className="max-w-2xl text-[34px] font-bold leading-tight text-white sm:text-[50px]">
            2.0 PRO® <span className="text-orange">vs.</span> LeafFilter
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Two gutter guard systems, two very different approaches. Here's how our patented aluminum-and-steel
            system compares to LeafFilter's plastic-framed design.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pt-20">
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] border-collapse bg-white">
            <thead>
              <tr>
                <th className="w-1/3 bg-surface px-5 py-4 text-left font-display text-[15px] text-navy">Feature</th>
                <th className="w-1/3 bg-navy px-5 py-4 text-left font-display text-[15px] text-white">
                  <span className="mb-1 inline-block rounded-pill bg-orange px-2.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-white">Recommended</span>
                  <br />2.0 PRO®
                </th>
                <th className="w-1/3 px-5 py-4 text-left font-display text-[15px]">LeafFilter</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Frame Material", "T5 Aircraft-Grade Aluminum — 20,000+ PSI tensile strength", "Painted aluminum frame — reports of warping with heat/cold swings"],
                ["Filtration Mesh", "440-micron surgical steel — blocks pine needles & grit, won't corrode", "Micro-mesh screen — frame/mesh separation reported over time"],
                ["Water Siphoning", "Triple-Rib™ design — captures 40%+ more water via capillary action", "Flat mesh surface — rain can sheet over the edge in storms"],
                ["Wind Debris Clearing", "Self-clears at 10–15 mph — angled pitch sheds debris naturally", "Sits flat in the gutter — acts like a shelf, debris compacts"],
                ["Existing Gutter Compatibility", "New or existing gutters — any roof type, no tear-off required", "Most existing gutters — generally compatible"],
                ["Winter Heating Options", "2.0 PRO HEAT™ available — integrated ice-melt cable option", "No heating option — prone to ice dams"],
                ["Warranty Scope", "Triple-Lifetime Warranty — materials + workmanship + no-clog, transferable", "No-clog warranty only — no lifetime materials/workmanship coverage"],
              ].map(([feature, pro, competitor]) => (
                <tr key={feature} className="border-t border-border">
                  <td className="px-5 py-4 align-top text-[14.5px] font-bold text-navy">{feature}</td>
                  <td className="bg-[#fff7f2] px-5 py-4 align-top text-[13.5px] text-[#2b2f36]">
                    <Check className="mb-1 inline-block h-4 w-4 text-green-600" /> {pro}
                  </td>
                  <td className="px-5 py-4 align-top text-[13.5px] text-[#2b2f36]">
                    <X className="mb-1 inline-block h-4 w-4 text-red-500" /> {competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div className="rounded-[22px] border border-red-200 bg-red-50/40 p-7">
            <h3 className="mb-1.5 text-lg font-bold">Common LeafFilter Problems</h3>
            <p className="text-sm text-muted">Based on the plastic-and-mesh construction used across the industry.</p>
            <ul className="mt-6 flex flex-col gap-4">
              {PROBLEMS.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <X className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-red-500" />
                  <span className="text-[14.5px] leading-relaxed text-[#2b2f36]">
                    <strong>{p.title}</strong> — {p.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] border border-green-200 bg-green-50/40 p-7">
            <h3 className="mb-1.5 text-lg font-bold">2.0 PRO®'s Advantages</h3>
            <p className="text-sm text-muted">A single patented system, engineered as one unit.</p>
            <ul className="mt-6 flex flex-col gap-4">
              {ADVANTAGES.map((a) => (
                <li key={a.title} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-green-600" />
                  <span className="text-[14.5px] leading-relaxed text-[#2b2f36]">
                    <strong>{a.title}</strong> — {a.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 3" }}>
              <img src="/assets/bd74e570f2deb06b2709d97dd8c67e13.png" alt="Close-up of a clean 2.0 PRO gutter guard installation on a white house" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">The GGE Difference</div>
              <h2 className="mb-4 text-[28px] font-bold sm:text-[34px]">Built as One System, Not Assembled from Parts</h2>
              <p className="text-lg text-muted">
                Because the 2.0 PRO® frame and mesh are engineered together from the start, there's no plastic-to-steel
                seam for temperature swings to pull apart — the finish you see on day one is the finish you get for
                life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Every Install Verified</div>
            <h2 className="mb-4 text-[28px] font-bold sm:text-[34px]">We Check Level and Pitch, Not Just the Guard</h2>
            <p className="text-lg text-muted">
              Performance depends on more than the guard itself. Our certified technicians verify level and pitch on
              every run before we call the job done — the kind of quality check a franchise installer working off a
              fixed-price ticket doesn't always have time for.
            </p>
            <Link to="/booking" className="mt-6 inline-block rounded-pill bg-orange px-8 py-4 font-bold text-white">
              Get My Free Estimate
            </Link>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "3 / 2" }}>
              <img src="/assets/75725120d777a01fae160497be7de91b.jpg" alt="A Gutter Guard Experts technician checking gutter level with a measuring tool" className="h-full w-full object-cover" />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Every installation is checked for level and pitch before we call the job done.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[820px] px-6">
          <div className="mb-10 text-center">
            <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Questions</div>
            <h2 className="text-[28px] font-bold sm:text-[34px]">Comparison FAQ</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="rounded-[32px] bg-gradient-to-br from-navy to-[#152230] px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl text-[28px] font-bold text-white sm:text-[38px]">Choose 2.0 PRO® for a Lifetime of Peace</h2>
          <p className="mx-auto mt-3.5 max-w-md text-white/85">See the difference for yourself with a free, no-obligation estimate.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            <Link to="/booking" className="rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
              Get My Free Quote
            </Link>
            <a href="tel:+17207091681" className="flex items-center gap-2 rounded-pill bg-navy px-8 py-4 text-base font-bold text-white">
              <Phone className="h-4 w-4" /> Call (720) 709-1681
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
