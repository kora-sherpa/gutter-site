import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const STATS = [
  { num: "2012", copy: "Founded — family-owned and operated from day one" },
  { num: "100%", copy: "Certified technicians on every job, no subcontractors" },
  { num: "3x", copy: "Lifetime warranties — materials, workmanship, and no-clog, all transferable" },
];

export default function AboutUs() {
  return (
    <main>
      <section className="bg-navy pb-16 pt-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[13.5px] text-white/55">
            <Link to="/" className="font-bold text-white/85">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-orange/35 bg-orange/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#ffb287]">
            Family-Owned Since 2012
          </div>
          <h1 className="max-w-2xl text-[34px] font-bold leading-tight text-white sm:text-[50px]">
            From Installer to <span className="text-orange">Innovator</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Gutter Guard Experts® is a family-owned gutter protection company built by tradespeople, not investors —
            and it started with one person on a ladder.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-5">
            <h2 className="mb-1 text-[28px] font-bold sm:text-[34px]">The 2.0 PRO® Story</h2>
            <p className="text-[16.5px] leading-relaxed text-[#2b2f36]">
              In fall 2005, our founder started installing gutter guards to help pay his way through college. Years
              spent installing other companies' products — climbing ladders, meeting homeowners, and watching those
              guards fail season after season — taught him exactly where the industry's off-the-shelf systems fell
              short: warped plastic frames, flat mesh that let debris pile up on top instead of shedding it, and
              installers who treated a warranty claim as an afterthought.
            </p>
            <p className="text-[16.5px] leading-relaxed text-[#2b2f36]">
              That firsthand experience became the starting point for 2.0 PRO®. Rather than license an existing
              design, he spent three years developing a system from scratch — working through seven prototypes and
              partnering with engineers from Colorado to Germany — until the frame, the mesh, and the angle of
              installation all worked together instead of fighting the weather.
            </p>
            <p className="text-[16.5px] leading-relaxed text-[#2b2f36]">
              Gutter Guard Experts® was founded in 2012, and we've been family-owned and operated ever since, serving
              homeowners with the same philosophy that started it all: no shortcuts on materials, no subcontracted
              installs, and no fine print in the warranty.
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl bg-surface" style={{ aspectRatio: "4 / 5" }}>
              <img
                src="/assets/37f592363d1f32953f39d47a78c1cbc8.png"
                alt="Certified Gutter Guard Experts technician installing a copper downspout, wearing a branded company shirt"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Every 2.0 PRO® install is performed by our own certified technicians — never a subcontractor.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.num} className="rounded-2xl border border-border bg-white p-8 text-center">
                <div className="mb-1.5 font-display text-4xl font-bold text-orange">{s.num}</div>
                <p className="text-[14.5px] text-muted">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.5fr]">
          <div className="overflow-hidden rounded-2xl bg-surface" style={{ aspectRatio: "3 / 4" }}>
            <img
              src="/assets/730c4e1e84772581919d981b0be78070.jpg"
              alt="A Gutter Guard Experts technician on a ladder installing gutter guard mesh"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="mb-6 text-[28px] font-bold sm:text-[34px]">Our Own Crews, Our Own Standards</h2>
            <p className="mb-5 text-[16.5px] leading-relaxed text-[#2b2f36]">
              We don't franchise our name and we don't hand your job to a subcontractor. Every technician who shows
              up at your home has completed our internal certification process — the same one that allows us to back
              every installation with a Triple-Lifetime Warranty.
            </p>
            <p className="mb-5 text-[16.5px] leading-relaxed text-[#2b2f36]">
              From the first free inspection to the final walkthrough, the person measuring your roofline is the same
              company installing your guards and standing behind the warranty. That's the accountability a
              family-owned business can offer that a national franchise can't.
            </p>
            <Link to="/booking" className="mt-1 inline-block rounded-pill bg-orange px-8 py-4 font-bold text-white">
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-br from-navy to-[#152230] px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl text-[28px] font-bold text-white sm:text-[38px]">Stop Cleaning Gutters Forever</h2>
          <p className="mx-auto mt-3.5 max-w-md text-white/85">
            Get your free, no-obligation quote from the family-owned team behind 2.0 PRO®.
          </p>
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
