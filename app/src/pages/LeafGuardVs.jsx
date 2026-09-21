import { Link } from "react-router-dom";
import { X, Check, Phone } from "lucide-react";

const PROBLEMS = [
  { title: "Large opening for debris", desc: "smaller leaves and grit can still get inside and clog the system." },
  { title: "Moss and algae growth", desc: "the dark, damp channel behind the curve is a breeding ground." },
  { title: "Water overshoot", desc: "in heavy downpours, water can simply overshoot the curve entirely." },
  { title: "Requires full gutter replacement", desc: "even when your current gutters are new." },
  { title: "Prone to freezing over", desc: "the curved design is known to build up ice in winter." },
];

const ADVANTAGES = [
  { title: "440-micron mesh", desc: "keeps out even the smallest debris particles, not just large leaves." },
  { title: "Triple-Rib™ design", desc: "slows water down as it glides over the screen, so it's captured instead of lost." },
  { title: "Installs on new or existing gutters", desc: "no forced replacement of gutters that are already sound." },
  { title: "2.0 PRO HEAT™ available", desc: "keeps gutters fully operational through the coldest months." },
  { title: "Triple-Lifetime Warranty", desc: "materials, workmanship, and no-clog, fully transferable." },
];

export default function LeafGuardVs() {
  return (
    <main>
      <section className="bg-navy pb-16 pt-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[13.5px] text-white/55">
            <Link to="/" className="font-bold text-white/85">Home</Link>
            <span>/</span>
            <span className="text-white">2.0 PRO® vs. LeafGuard</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-orange/35 bg-orange/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#ffb287]">
            Product Comparison
          </div>
          <h1 className="max-w-2xl text-[34px] font-bold leading-tight text-white sm:text-[50px]">
            2.0 PRO® <span className="text-orange">vs.</span> LeafGuard
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            A reverse-curve hood versus a patented micro-mesh system — here's how the open-hood design stacks up
            against 2.0 PRO®'s fully enclosed protection.
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
                <th className="w-1/3 px-5 py-4 text-left font-display text-[15px]">LeafGuard</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Frame Material", "T5 Aircraft-Grade Aluminum — 20,000+ PSI tensile strength", "One-piece aluminum hood — bulky profile, visible from the ground"],
                ["Filtration Mesh", "440-micron surgical steel — blocks pine needles & grit, won't corrode", "Open-hood, no mesh — lets in shingle grit & small debris"],
                ["Water Siphoning", "Triple-Rib™ design — captures 40%+ more water via capillary action", "Relies on surface tension — water overshoots in heavy rain"],
                ["Wind Debris Clearing", "Self-clears at 10–15 mph — angled pitch sheds debris naturally", "Curved hood — wet leaves stick to the surface"],
                ["Existing Gutter Compatibility", "New or existing gutters — any roof type, no tear-off required", "Full replacement required — even if current gutters are new"],
                ["Winter Heating Options", "2.0 PRO HEAT™ available — integrated ice-melt cable option", "No heating option — hood traps snow & ice"],
                ["Warranty Scope", "Triple-Lifetime Warranty — materials + workmanship + no-clog, transferable", "Limited lifetime warranty — typically non-transferable"],
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
            <h3 className="mb-1.5 text-lg font-bold">LeafGuard Problems</h3>
            <p className="text-sm text-muted">Common issues with the reverse-curve design.</p>
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
            <p className="text-sm text-muted">Nothing compares to 2.0 PRO®.</p>
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
            <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "1 / 1" }}>
              <img
                src="/assets/fdd07c6d10731dcb60fdbb966413ca0b.jpg"
                alt="A Gutter Guard Experts technician carefully checking the fit of a gutter guard installation by hand"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Attention to Detail</div>
              <h2 className="mb-4 text-[28px] font-bold sm:text-[34px]">We Fit Every Guard By Hand</h2>
              <p className="text-lg text-muted">
                A one-size reverse-curve system can't account for the quirks of your specific roofline. Our
                technicians check fit and pitch by hand on every job — the kind of attention to detail a
                mass-manufactured curve profile doesn't allow for.
              </p>
              <Link to="/booking" className="mt-6 inline-block rounded-pill bg-orange px-8 py-4 font-bold text-white">
                Get My Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="rounded-[32px] bg-gradient-to-br from-navy to-[#152230] px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl text-[28px] font-bold text-white sm:text-[38px]">Nothing Compares to the 2.0 PRO®</h2>
          <p className="mx-auto mt-3.5 max-w-md text-white/85">Stop cleaning gutters forever. Get your free quote today.</p>
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
