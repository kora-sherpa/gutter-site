import { PlayCircle } from "lucide-react";

export default function VideoFeature({ eyebrow, title, subtitle, videoSrc, poster, reverse = false }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-[#152230] py-20">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-[380px] w-[380px] rounded-full bg-orange/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-cyan/20 blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div className={reverse ? "lg:order-2" : ""}>
          {eyebrow && (
            <div className="mb-4 inline-flex rounded-pill border border-orange/35 bg-orange/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#ffb287]">
              {eyebrow}
            </div>
          )}
          <h2 className="text-[28px] font-bold leading-tight text-white sm:text-[36px]">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">{subtitle}</p>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <div className="group relative rounded-3xl border border-white/15 bg-white/5 p-2 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-orange/50 hover:shadow-[0_0_60px_rgba(242,101,34,0.35)]">
            <div className="relative overflow-hidden rounded-[20px] bg-ink">
              <video
                controls
                playsInline
                preload="metadata"
                poster={poster}
                className="aspect-video w-full rounded-[20px] object-cover transition duration-300 group-hover:scale-[1.02]"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <PlayCircle className="h-14 w-14 text-white/90 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
