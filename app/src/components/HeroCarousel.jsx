import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ArrowRight, Phone, ShieldCheck, CheckCircle2, Clock, Zap } from "lucide-react";

const ROTATE_MS = 4000;

const SLIDES = [
  {
    eyebrow: "2.0 PRO® Installation",
    headlinePrefix: "The Last Gutter Guard You'll ",
    headlineHighlight: "Ever Need",
    sub: "Our patented 2.0 PRO® system blocks pine needles, roof grit and storm debris for good — engineered with an aircraft-grade aluminum frame and 440-micron stainless mesh.",
    image: "/assets/hero-1.jpg",
    alt: "A Gutter Guard Experts technician on a ladder installing gutter guard mesh",
  },
  {
    eyebrow: "2.0 PRO® Guard Installation",
    headlinePrefix: "Aircraft-Grade Protection, ",
    headlineHighlight: "Installed for Life",
    sub: "Every install is backed by a fully transferable Triple-Lifetime Warranty on materials, workmanship, and clog protection.",
    image: "/assets/hero-2.jpg",
    alt: "Close-up of a technician inspecting a gutter bracket and mounting hardware during installation",
  },
  {
    eyebrow: "Why 2.0 PRO®",
    headlinePrefix: "Premium Protection, ",
    headlineHighlight: "By Design",
    sub: "A patented Triple-Rib™ micro-mesh siphons water in while keeping pine needles, grit, and storm debris out for good.",
    image: "/assets/hero-3.jpg",
    alt: "Pine needles resting harmlessly on top of 2.0 PRO gutter guard mesh instead of clogging the gutter",
  },
  {
    eyebrow: "Seamless Gutters",
    headlinePrefix: "Custom-Fit Seamless Gutters, ",
    headlineHighlight: "Formed On-Site",
    sub: "Roll-formed to your exact roofline in a single continuous run, in a color matched to your trim or siding.",
    image: "/assets/hero-4.jpg",
    alt: "A man cleaning years of leaves and debris out of an unprotected roof gutter by hand",
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: CheckCircle2, label: "Free Estimates" },
  { icon: Clock, label: "Workmanship Guarantee" },
  { icon: Zap, label: "24/7 Emergency Service" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, index]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative flex min-h-[560px] items-center overflow-hidden bg-navy pb-24 pt-[168px] sm:min-h-[680px] sm:pt-[168px]"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />
        <div className="pointer-events-none absolute -left-24 top-[20%] h-[380px] w-[380px] rounded-full bg-orange/30 blur-[70px]" />
      </div>

      <div className="absolute inset-x-0 top-0 z-10 h-[3px] bg-white/15">
        <motion.div
          key={index}
          className="h-full bg-orange"
          initial={{ width: "0%" }}
          animate={{ width: paused ? undefined : "100%" }}
          transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6">
        <div className="max-w-[640px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy/70 px-4 py-1.5 text-xs font-bold text-white">
            <Star className="h-4 w-4 flex-shrink-0 fill-current text-[#FACC15]" />
            <strong>4.9 stars</strong>
            <span className="text-white/40">•</span>
            <span>{slide.eyebrow}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-[38px] font-extrabold leading-[1.08] text-white drop-shadow-md sm:text-[62px]">
                {slide.headlinePrefix}
                <span className="text-orange">{slide.headlineHighlight}</span>
              </h1>
              <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] md:text-lg">{slide.sub}</p>
            </motion.div>
          </AnimatePresence>

          <div className="my-9 flex flex-wrap gap-3.5">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-pill bg-orange px-8 py-4 text-base font-bold text-white shadow-[0_8px_20px_rgba(242,101,34,0.32)] transition hover:-translate-y-0.5 hover:bg-orange-dark"
            >
              Get an Estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+17207091681"
              className="inline-flex items-center gap-2 rounded-pill border border-white/28 px-8 py-4 text-base font-bold text-white transition hover:bg-white/8"
            >
              <Phone className="h-4 w-4" /> Call Us Now
            </a>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-4">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-slate-100">
                <Icon className="h-[18px] w-[18px] flex-shrink-0 text-orange" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-pill transition-all ${i === index ? "w-7 bg-orange" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
