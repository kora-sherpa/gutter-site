import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Sparkles, Flame, Building2, Phone, ImageOff } from "lucide-react";

const TABS = [
  { id: "all", label: "All" },
  { id: "pro", label: "2.0 PRO®" },
  { id: "seamless", label: "Seamless Gutters" },
  { id: "heated", label: "Heated Systems" },
  { id: "commercial", label: "Commercial" },
];

const CATEGORY_ICON = { pro: Shield, seamless: Sparkles, heated: Flame, commercial: Building2 };

const ITEMS = [
  { cat: "pro", tag: "2.0 PRO®", h: 260, caption: "Fresh 2.0 PRO® install — Denver, CO" },
  { cat: "seamless", tag: "Seamless", h: 200, caption: "Weathered Copper seamless run — Boulder, CO" },
  { cat: "pro", tag: "2.0 PRO®", h: 320, caption: "Close-up of 440-micron mesh — Fort Collins, CO" },
  { cat: "commercial", tag: "Commercial", h: 230, caption: "Multi-unit commercial roof line — Aurora, CO" },
  { cat: "heated", tag: "Heated", h: 280, caption: "2.0 PRO HEAT™ cable install — Lakewood, CO" },
  { cat: "pro", tag: "2.0 PRO®", h: 210, caption: "Before & after — Sacramento, CA" },
  { cat: "seamless", tag: "Seamless", h: 300, caption: "Storm Gray K-style install — Roseville, CA" },
  { cat: "commercial", tag: "Commercial", h: 190, caption: "Food-processing facility guard install — Denver, CO" },
  { cat: "pro", tag: "2.0 PRO®", h: 250, caption: "Certified technician on-site — Arvada, CO" },
  { cat: "heated", tag: "Heated", h: 230, caption: "Ice-dam prevention in action — Fort Collins, CO" },
  { cat: "seamless", tag: "Seamless", h: 270, caption: "Custom fabrication on-site — Folsom, CA" },
  { cat: "commercial", tag: "Commercial", h: 220, caption: "Agricultural facility protection — Greeley, CO" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? ITEMS : ITEMS.filter((i) => i.cat === filter);

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
        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`rounded-pill border px-4 py-2 text-[13.5px] font-bold transition ${
                filter === tab.id ? "border-orange bg-orange text-white" : "border-border text-navy hover:border-orange/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((item, i) => {
            const Icon = CATEGORY_ICON[item.cat] || ImageOff;
            return (
              <div key={`${item.cat}-${i}`} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-white">
                <div className="relative flex items-center justify-center gap-2 bg-surface text-muted" style={{ height: item.h }}>
                  <span className="absolute left-3 top-3 rounded-pill bg-ink/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {item.tag}
                  </span>
                  <Icon className="h-8 w-8 opacity-50" />
                  <span className="text-xs font-bold uppercase tracking-wide opacity-60">Photo</span>
                </div>
                <p className="p-4 text-[13.5px] font-semibold text-navy">{item.caption}</p>
              </div>
            );
          })}
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
    </main>
  );
}
