import { Link } from "react-router-dom";
import { Shield, CircleDot, AlignJustify, Wind, ShieldCheck, Flame, CreditCard, ArrowLeftRight, Phone } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Aircraft-Quality Aluminum",
    desc: "Up to 10x stronger than traditional gutter guards, with a tensile strength of over 20,000 PSI — it won't warp or bow with the seasons.",
  },
  {
    icon: CircleDot,
    title: "Stainless-Steel Micromesh",
    desc: "A 440-micron mesh keeps out even the smallest debris — pine needles, shingle grit, insects — without clogging, rusting, or breaking down under UV.",
  },
  {
    icon: AlignJustify,
    title: "Patented Triple-Rib™ Design",
    desc: "Captures over 40% more water than a flat-mesh competitor by slowing rain down instead of letting it sheet off the edge.",
  },
  {
    icon: Wind,
    title: "Smart Angled Installation",
    desc: "Installed close to your roof's own pitch, so wind as light as 10–15 mph keeps the surface clear — effectively self-cleaning for life.",
  },
  {
    icon: ShieldCheck,
    title: "Installs On New or Existing Gutters",
    desc: "Skip the cost of full gutter replacement in most cases — 2.0 PRO® fits directly onto the gutters you already have.",
  },
  {
    icon: Flame,
    title: "2.0 PRO HEAT™ Winter Protection",
    desc: "An optional integrated ice-melt add-on that keeps gutters flowing and helps prevent ice damming through the coldest months.",
  },
];

export default function Why2Pro() {
  return (
    <main>
      <section className="bg-navy pb-16 pt-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[13.5px] text-white/55">
            <Link to="/" className="font-bold text-white/85">Home</Link>
            <span>/</span>
            <span className="text-white">Why 2.0 PRO®</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-orange/35 bg-orange/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#ffb287]">
            Why 2.0 PRO®
          </div>
          <h1 className="max-w-2xl text-[34px] font-bold leading-tight text-white sm:text-[50px]">
            Premium Protection, <span className="text-orange">By Design</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Made of aircraft-grade aluminum and medical-grade stainless steel, 2.0 PRO® is the only gutter guard we
            install — because it's the only one engineered to never fail.
          </p>
          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 text-white">
            <CreditCard className="h-[18px] w-[18px] flex-shrink-0" />
            <div>
              <strong className="block text-[14px]">Save Up to 40% Off</strong>
              <span className="text-[12px] text-white/80">0% financing available for qualified homeowners</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            Why It Wins
          </div>
          <h2 className="text-[28px] font-bold sm:text-[34px]">Why Our Customers Love 2.0 PRO®</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-white p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{title}</h3>
              <p className="text-[14.5px] leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">See It In Action</div>
              <h2 className="mb-4 text-[28px] font-bold sm:text-[34px]">Nothing But Water Gets Into Your Gutter</h2>
              <p className="mb-6 text-lg text-muted">
                Pine needles, grit, and other debris rest harmlessly on top of the mesh instead of building up inside
                your gutters — no more climbing a ladder every fall.
              </p>
              <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-white p-5">
                <ArrowLeftRight className="mt-0.5 h-7 w-7 flex-shrink-0 text-navy" />
                <div>
                  <strong className="block text-[15px] text-navy">Triple-Lifetime, Transferable Warranty</strong>
                  <span className="text-[14px] text-muted">
                    Materials, workmanship, and a 100% no-clog guarantee — all fully transferable if you sell your
                    home.
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "1 / 1" }}>
                <img
                  src="/assets/c5447f9286fa25d88c4567b4382d4a5a.jpg"
                  alt="Pine needles resting harmlessly on top of 2.0 PRO gutter guard mesh instead of clogging the gutter"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Debris stays on top of the mesh — it never reaches the gutter below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "4 / 3" }}>
            <img
              src="/assets/deab8fb6c43298e8f20e744b7b7ef427.png"
              alt="Close-up of 2.0 PRO gutter guard mesh cleanly installed under the shingle edge"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Premium Build</div>
            <h2 className="mb-4 text-[28px] font-bold sm:text-[34px]">A System, Not Just a Screen</h2>
            <p className="text-lg text-muted">
              The frame, the mesh, and the angle are engineered together as one patented system — not a generic
              screen dropped onto a generic frame. That's why 2.0 PRO® is manufactured direct, with no middlemen and
              no markups passed on to you.
            </p>
            <Link to="/booking" className="mt-6 inline-block rounded-pill bg-orange px-8 py-4 font-bold text-white">
              Get My Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-br from-navy to-[#152230] px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl text-[28px] font-bold text-white sm:text-[38px]">See Why Homeowners Choose 2.0 PRO®</h2>
          <p className="mx-auto mt-3.5 max-w-md text-white/85">Save up to 40% off, with 0% financing available for qualified homeowners.</p>
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
