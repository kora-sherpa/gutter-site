import Reveal from "./Reveal.jsx";

const PROBLEMS = [
  { image: "/common-problems/clogged-gutter.avif", label: "Clogged Gutters", desc: "Leaves and debris packed in tight, blocking water from ever reaching the downspout." },
  { image: "/common-problems/foundation-problems.avif", label: "Foundation Damage", desc: "Overflow pooling at the base of the house instead of routing safely away." },
  { image: "/common-problems/wood-rot.avif", label: "Fascia Wood Rot", desc: "Standing water behind an overflowing gutter breaking down the wood it's mounted to." },
  { image: "/common-problems/pests-and-insects.avif", label: "Pests & Insects", desc: "Standing debris and trapped moisture attracting mosquitoes, birds, and rodents." },
  { image: "/common-problems/ladder-accidents.avif", label: "Ladder Accidents", desc: "The most common reason homeowners get hurt every fall — climbing up to clear clogs by hand." },
];

export default function CommonProblemsGrid() {
  return (
    <Reveal as="section" className="bg-surface py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            The Real Cost of Neglect
          </div>
          <h2 className="text-[28px] font-bold sm:text-[36px]">Common Problems We See — and Prevent</h2>
          <p className="mt-4 text-lg text-muted">Every one of these starts the same way: an open gutter left to fend for itself.</p>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.07}>
              <div className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="text-[13.5px] font-bold text-ink">{p.label}</h3>
                  <p className="mt-1 text-[12px] leading-snug text-muted">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
