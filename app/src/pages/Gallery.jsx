import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import ImageLightbox from "../components/ImageLightbox.jsx";

const BEFORE_AFTER_IMAGES = [1, 2, 3, 4, 5, 6].map((n) => `/before-and-after/${n}.avif`);

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  function openAt(i) {
    setLightboxIndex(i);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function navigate(delta) {
    setLightboxIndex((current) => (current + delta + BEFORE_AFTER_IMAGES.length) % BEFORE_AFTER_IMAGES.length);
  }

  return (
    <main>
      <section className="bg-surface pb-10 pt-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-5 flex items-center gap-2 text-[13.5px] text-muted">
            <Link to="/" className="font-bold text-navy">Home</Link>
            <span>/</span>
            <span>Gallery</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            Real Installs
          </div>
          <h1 className="max-w-xl text-[32px] font-bold leading-tight sm:text-[46px]">
            See 2.0 PRO® <span className="text-orange">In Action</span>
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted">
            Browse completed installs across Colorado and California — from seamless gutters to full commercial
            protection.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            Real Results
          </div>
          <h2 className="text-[28px] font-bold sm:text-[36px]">Before &amp; After</h2>
          <p className="mt-3.5 text-lg text-muted">The same roofline, transformed by a single visit from our crew. Click any photo to browse the full set.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BEFORE_AFTER_IMAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => openAt(i)}
              aria-label={`Open before and after photo ${i + 1} of ${BEFORE_AFTER_IMAGES.length}`}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={src}
                  alt={`Before and after gutter guard installation, example ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <div className="rounded-[32px] bg-gradient-to-br from-navy to-[#152230] px-8 py-14 text-center">
          <h2 className="mx-auto max-w-xl text-[28px] font-bold text-white sm:text-[38px]">Want Results Like These at Your Home?</h2>
          <p className="mx-auto mt-3.5 max-w-md text-white/85">Every free estimate qualifies you for a $75 Visa gift card.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            <Link to="/booking" className="rounded-pill bg-orange px-8 py-4 text-base font-bold text-white">
              Get an Estimate
            </Link>
            <a href="tel:+17207091681" className="flex items-center gap-2 rounded-pill bg-navy px-8 py-4 text-base font-bold text-white">
              <Phone className="h-4 w-4" /> Call (720) 709-1681
            </a>
          </div>
        </div>
      </section>

      <ImageLightbox images={BEFORE_AFTER_IMAGES} index={lightboxIndex} onClose={closeLightbox} onNavigate={navigate} />
    </main>
  );
}
