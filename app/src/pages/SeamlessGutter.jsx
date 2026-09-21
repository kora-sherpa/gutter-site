import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const COLORS = [
  { name: "Low Gloss White", hex: "#ffffff", border: true },
  { name: "Almond", hex: "#f2ede0" },
  { name: "Classic Cream", hex: "#f2e2c4" },
  { name: "Adobe Tan", hex: "#c9a876" },
  { name: "Buckskin Brown", hex: "#8a5a3b" },
  { name: "Royal Brown", hex: "#5c3a2e" },
  { name: "Colonial Red", hex: "#b23b2e" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Storm Gray", hex: "#6e7780" },
  { name: "Forest Green", hex: "#3a5a40" },
  { name: "Weathered Copper", hex: "#b87333" },
  { name: "Tahoe Blue", hex: "#4a6d8c" },
];

export default function SeamlessGutter() {
  return (
    <main>
      <section className="bg-navy pb-16 pt-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[13.5px] text-white/55">
            <Link to="/" className="font-bold text-white/85">Home</Link>
            <span>/</span>
            <Link to="/services-hub" className="font-bold text-white/85">Services</Link>
            <span>/</span>
            <span className="text-white">Seamless Gutters</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-orange/35 bg-orange/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#ffb287]">
            Seamless Gutters
          </div>
          <h1 className="max-w-2xl text-[34px] font-bold leading-tight text-white sm:text-[50px]">
            Custom-Fit Seamless Gutters, <span className="text-orange">Formed On-Site</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            One continuous run, cut to the exact length of your home — no seams, no joints, no leaks. Pair it with
            2.0 PRO® and never clean it again.
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <Link to="/booking" className="rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
              Get an Estimate
            </Link>
            <a href="tel:+17207091681" className="flex items-center gap-2 rounded-pill border border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white">
              <Phone className="h-4 w-4" /> Call (720) 709-1681
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-5">
            <h2 className="mb-1 text-[28px] font-bold sm:text-[34px]">A Bigger Job Than Most Homeowners Realize</h2>
            <p className="text-[16.5px] leading-relaxed text-[#2b2f36]">
              Your gutters do more than keep rain off the sidewalk. By channeling water through your downspouts, they
              keep moisture away from your roofline, siding, and foundation — protecting your home against water
              damage, mold and mildew, and pest infestations.
            </p>
            <p className="text-[16.5px] leading-relaxed text-[#2b2f36]">
              Seamless gutters aren't a "one size fits all" project. If you're planning to replace yours, it matters
              that the installer forming and hanging them is knowledgeable, honest, and dedicated to quality work —
              because a poorly pitched or poorly sealed run can undo the benefit before it starts.
            </p>
            <p className="text-[16.5px] leading-relaxed text-[#2b2f36]">
              Our crews form each run of K-style seamless gutter on-site with a portable roll-forming machine, cut to
              your home's exact roofline in one continuous piece. That means no seams to leak and no joints to fail —
              the two most common points of failure in sectional gutters.
            </p>
          </div>
          <div>
            <div className="overflow-hidden rounded-2xl bg-surface" style={{ aspectRatio: "1 / 1" }}>
              <img
                src="/assets/ae395ef07fa5fe74ebb6b7c028460d8a.png"
                alt="Technician measuring a section of seamless gutter with a tape measure before installation"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Every run is measured and formed to your home's exact roofline — no seams, no leaks.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              Seamless Gutter Colors
            </div>
            <h2 className="text-[28px] font-bold sm:text-[34px]">30+ Factory Finishes</h2>
            <p className="mt-3.5 text-lg text-muted">Matched to your trim, roofline, or siding — including specialty metals.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {COLORS.map((c) => (
              <span key={c.name} className="flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2.5 text-[13px] font-bold text-navy">
                <span
                  className={`h-4 w-4 rounded-full ${c.border ? "border border-border" : ""}`}
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="overflow-hidden rounded-2xl bg-surface" style={{ aspectRatio: "1 / 1" }}>
            <img
              src="/assets/b6ac7988de6850f6b598a932816b390b.jpg"
              alt="A man cleaning years of leaves and debris out of an unprotected roof gutter by hand"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-dark">Why It Matters</div>
            <h2 className="mb-4 text-[28px] font-bold sm:text-[34px]">Old Gutters Are More Than an Eyesore</h2>
            <p className="text-lg text-muted">
              Sagging seams and years of trapped leaves are a direct path to fascia rot, foundation damage, and pest
              problems. Pairing new seamless gutters with 2.0 PRO® guards means you'll never have to climb up and do
              this again.
            </p>
            <Link to="/booking" className="mt-6 inline-block rounded-pill bg-orange px-8 py-4 font-bold text-white">
              Get My Free Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-br from-navy to-[#152230] px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl text-[28px] font-bold text-white sm:text-[38px]">Stop Cleaning Gutters Forever</h2>
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
