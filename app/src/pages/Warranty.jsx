import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeftRight } from "lucide-react";

const COVERAGES = [
  {
    title: "Lifetime Materials Warranty",
    desc: "The 2.0 PRO® frame and mesh are covered against manufacturing defects — including rust, corrosion, and UV breakdown — for as long as you own your home.",
  },
  {
    title: "Lifetime Workmanship Warranty",
    desc: "Every installation performed by our certified technicians is covered against defects in the work itself — no fine print, no exceptions for normal use.",
  },
  {
    title: "100% Clog-Free Guarantee",
    desc: "If your gutters ever clog with 2.0 PRO® installed, we send a technician to clear and correct it at no extra cost to you — for life.",
  },
];

const inputClassName =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink transition focus:border-orange focus:outline-none";

function Field({ label, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[13.5px] font-bold text-navy">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Warranty() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", date: "", type: "Materials Defect", desc: "" });

  function updateForm(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;
    setSubmitted(true);
  }

  return (
    <main>
      <section className="bg-navy pb-16 pt-40">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-[13.5px] text-white/55">
            <Link to="/" className="font-bold text-white/85">Home</Link>
            <span>/</span>
            <span className="text-white">Warranty</span>
          </div>
          <div className="mb-5 inline-flex rounded-pill border border-orange/35 bg-orange/15 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-[#ffb287]">
            Backed For Life
          </div>
          <h1 className="max-w-2xl text-[34px] font-bold leading-tight text-white sm:text-[50px]">
            The Triple-Lifetime <span className="text-orange">Warranty</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Three separate lifetime guarantees — on materials, on workmanship, and on clogs — all fully transferable
            if you sell your home.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {COVERAGES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-white p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{c.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3.5 rounded-2xl border border-border bg-surface p-6">
          <ArrowLeftRight className="mt-0.5 h-7 w-7 flex-shrink-0 text-navy" />
          <div>
            <strong className="block text-[15px] text-navy">Fully Transferable</strong>
            <span className="text-[14px] text-muted">
              All three warranties transfer to the next homeowner at no charge if you sell — a genuine selling point
              at listing time. This warranty does not void your existing roof manufacturer's warranty.
            </span>
          </div>
        </div>
        <p className="mt-5 text-[12.5px] text-muted">
          This page summarizes warranty coverage. See your official Triple-Lifetime Warranty certificate for complete
          terms, conditions, exclusions and limitations.
        </p>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
              Results That Back the Warranty
            </div>
            <h2 className="text-[28px] font-bold sm:text-[34px]">Every Install Held to the Same Standard</h2>
            <p className="mt-3.5 text-lg text-muted">
              Our Triple-Lifetime Warranty is only as good as the installation behind it — here's what that standard
              looks like on real homes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/assets/ec00d0196c5012ef9df3f0dd977b19b2.png"
                alt="Before and after comparison of a roof valley gutter area, showing debris-fouled surface replaced with a clean guard-protected surface"
                className="w-full"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/assets/060d486abeda8490c98fbe08a78940fd.png"
                alt="Before and after comparison of a street-facing roofline, old worn gutter guard replaced with a clean new installation"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex rounded-pill border border-orange/30 bg-orange/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wide text-orange-dark">
            Need to File a Claim?
          </div>
          <h2 className="text-[28px] font-bold sm:text-[34px]">Submit a Warranty Claim</h2>
          <p className="mt-3.5 text-lg text-muted">Fill out the form below and a warranty specialist will follow up within 1–2 business days.</p>
        </div>

        <div className="rounded-[28px] border border-border bg-white p-7 sm:p-9">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 text-orange">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">Claim Submitted</h3>
              <p className="mx-auto mt-3 max-w-sm text-[14.5px] text-muted">
                A warranty specialist will reach out within 1–2 business days to follow up on your claim.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" htmlFor="w-name">
                  <input id="w-name" type="text" required placeholder="Jane Homeowner" value={form.name} onChange={(e) => updateForm("name", e.target.value)} className={inputClassName} />
                </Field>
                <Field label="Phone Number" htmlFor="w-phone">
                  <input id="w-phone" type="tel" required placeholder="(555) 555-5555" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className={inputClassName} />
                </Field>
              </div>
              <Field label="Email Address" htmlFor="w-email">
                <input id="w-email" type="email" required placeholder="jane@email.com" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className={inputClassName} />
              </Field>
              <Field label="Property Address" htmlFor="w-address">
                <input id="w-address" type="text" placeholder="123 Main St, Denver, CO 80209" value={form.address} onChange={(e) => updateForm("address", e.target.value)} className={inputClassName} />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Original Install Date" htmlFor="w-date">
                  <input id="w-date" type="text" placeholder="MM/DD/YYYY" value={form.date} onChange={(e) => updateForm("date", e.target.value)} className={inputClassName} />
                </Field>
                <Field label="Claim Type" htmlFor="w-type">
                  <select id="w-type" value={form.type} onChange={(e) => updateForm("type", e.target.value)} className={inputClassName}>
                    <option>Materials Defect</option>
                    <option>Workmanship Issue</option>
                    <option>Clogged Gutter</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>
              <Field label="Describe the Issue" htmlFor="w-desc">
                <textarea
                  id="w-desc"
                  rows={4}
                  placeholder="Tell us what's happening and when you first noticed it..."
                  value={form.desc}
                  onChange={(e) => updateForm("desc", e.target.value)}
                  className={inputClassName}
                />
              </Field>
              <button type="submit" className="mt-2 w-full rounded-pill bg-orange py-3.5 text-[15px] font-bold text-white">
                Submit Warranty Claim
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
