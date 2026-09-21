import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Shield,
  Droplet,
  Wrench,
  Sparkles,
  Flame,
  Building2,
  CreditCard,
  PartyPopper,
} from "lucide-react";

const SERVICES = [
  { id: "install", name: "2.0 PRO® Installation", icon: Shield },
  { id: "cleaning", name: "Gutter Cleaning", icon: Droplet },
  { id: "repair", name: "Repair & Tune-Up", icon: Wrench },
  { id: "seamless", name: "Seamless Gutters", icon: Sparkles },
  { id: "heat", name: "2.0 PRO HEAT™", icon: Flame },
  { id: "commercial", name: "Commercial Protection", icon: Building2 },
];

const PROPERTY_TYPES = ["Single-Family", "Multi-Family", "Commercial", "Industrial"];

const STEPS = [
  { n: 1, label: "Service" },
  { n: 2, label: "Property" },
  { n: 3, label: "Contact" },
];

function ProgressBar({ step }) {
  return (
    <div className="mb-8 flex items-center">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex flex-1 items-center gap-2.5 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold transition-colors ${
                step > s.n
                  ? "bg-orange text-white"
                  : step === s.n
                  ? "bg-navy text-white"
                  : "bg-surface text-muted"
              }`}
            >
              {step > s.n ? <Check className="h-4 w-4" /> : s.n}
            </div>
            <span className={`text-[11.5px] font-bold uppercase tracking-wide ${step >= s.n ? "text-ink" : "text-muted"}`}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && <div className="h-[2px] flex-1 bg-border" />}
        </div>
      ))}
    </div>
  );
}

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

const inputClassName =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink transition focus:border-orange focus:outline-none";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [form, setForm] = useState({
    address: "",
    city: "",
    zip: "",
    state: "Colorado",
    urgency: "As soon as possible",
    name: "",
    phone: "",
    email: "",
    notes: "",
    consentContact: false,
    consentTerms: false,
  });

  function updateForm(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const canContinueStep1 = Boolean(service);
  const canSubmit = form.name && form.phone && form.email && form.consentContact && form.consentTerms;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  const direction = 1;
  const variants = {
    enter: { opacity: 0, x: 24 * direction },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 * direction },
  };

  return (
    <main className="mx-auto max-w-2xl px-6 pb-24 pt-40">
      {!submitted && <ProgressBar step={step} />}

      <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm sm:p-10">
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange/10 text-orange">
                <PartyPopper className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">You're All Set!</h2>
              <p className="mx-auto mt-3 max-w-sm text-[14.5px] text-muted">
                A local Gutter Guard Experts® specialist will call you shortly to confirm your free in-home estimate
                — and your $75 Visa gift card.
              </p>
              <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-pill bg-orange px-7 py-3.5 font-bold text-white">
                Back to Home
              </Link>
            </motion.div>
          ) : step === 1 ? (
            <motion.div key="step1" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
              <div className="mb-1 text-[13px] font-bold uppercase tracking-wide text-orange-dark">Step 1 of 3</div>
              <h2 className="text-2xl font-bold">What Do You Need?</h2>
              <p className="mt-1.5 text-[14.5px] text-muted">
                Select the service you're most interested in — you can always add more later.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SERVICES.map(({ id, name, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setService(id)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                      service === id
                        ? "border-orange bg-orange/5 text-orange-dark"
                        : "border-border text-navy hover:border-orange/40"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[13px] font-bold leading-tight">{name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/services-hub" className="flex-1 rounded-pill border border-border py-3.5 text-center text-[14px] font-bold text-navy">
                  Not Sure? See Services
                </Link>
                <button
                  type="button"
                  disabled={!canContinueStep1}
                  onClick={() => setStep(2)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-orange py-3.5 text-[14px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="step2" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
              <div className="mb-1 text-[13px] font-bold uppercase tracking-wide text-orange-dark">Step 2 of 3</div>
              <h2 className="text-2xl font-bold">Where's the Property?</h2>
              <p className="mt-1.5 text-[14.5px] text-muted">We'll match you with the closest available crew.</p>

              <div className="mt-6 flex flex-col gap-4">
                <Field label="Street Address" htmlFor="bk-address">
                  <input id="bk-address" type="text" placeholder="123 Main St" value={form.address} onChange={(e) => updateForm("address", e.target.value)} className={inputClassName} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" htmlFor="bk-city">
                    <input id="bk-city" type="text" placeholder="Denver" value={form.city} onChange={(e) => updateForm("city", e.target.value)} className={inputClassName} />
                  </Field>
                  <Field label="ZIP Code" htmlFor="bk-zip">
                    <input id="bk-zip" type="text" placeholder="80209" value={form.zip} onChange={(e) => updateForm("zip", e.target.value)} className={inputClassName} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="State" htmlFor="bk-state">
                    <select id="bk-state" value={form.state} onChange={(e) => updateForm("state", e.target.value)} className={inputClassName}>
                      <option>Colorado</option>
                      <option>California</option>
                    </select>
                  </Field>
                  <Field label="How Urgent?" htmlFor="bk-urgency">
                    <select id="bk-urgency" value={form.urgency} onChange={(e) => updateForm("urgency", e.target.value)} className={inputClassName}>
                      <option>As soon as possible</option>
                      <option>Within a week</option>
                      <option>Within a month</option>
                      <option>Just researching</option>
                    </select>
                  </Field>
                </div>
              </div>

              <div className="mt-7 flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="rounded-pill border border-border px-6 py-3.5 text-[14px] font-bold text-navy">
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-pill bg-orange py-3.5 text-[14px] font-bold text-white"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form key="step3" onSubmit={handleSubmit} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
              <div className="mb-1 text-[13px] font-bold uppercase tracking-wide text-orange-dark">Step 3 of 3</div>
              <h2 className="text-2xl font-bold">Almost Done</h2>
              <p className="mt-1.5 text-[14.5px] text-muted">Just your contact details and we'll lock in your free estimate.</p>

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-navy px-4 py-3.5 text-white">
                <CreditCard className="h-[18px] w-[18px] flex-shrink-0" />
                <div>
                  <strong className="block text-[14px]">$75 Visa Gift Card</strong>
                  <span className="text-[12px] text-white/80">Upon completion of your in-home consultation</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name" htmlFor="bk-name">
                    <input id="bk-name" type="text" required placeholder="Jane Homeowner" value={form.name} onChange={(e) => updateForm("name", e.target.value)} className={inputClassName} />
                  </Field>
                  <Field label="Phone Number" htmlFor="bk-phone">
                    <input id="bk-phone" type="tel" required placeholder="(555) 555-5555" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className={inputClassName} />
                  </Field>
                </div>
                <Field label="Email Address" htmlFor="bk-email">
                  <input id="bk-email" type="email" required placeholder="jane@email.com" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className={inputClassName} />
                </Field>

                <div>
                  <span className="mb-1.5 block text-[13.5px] font-bold text-navy">Property Type</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {PROPERTY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPropertyType(type)}
                        className={`rounded-xl border px-3 py-2.5 text-[13.5px] font-bold transition ${
                          propertyType === type ? "border-orange bg-orange/5 text-orange-dark" : "border-border text-navy hover:border-orange/40"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <Field label="Project Notes (optional)" htmlFor="bk-notes">
                  <textarea
                    id="bk-notes"
                    rows={3}
                    placeholder="Tell us about your gutters, roof type, or any specific concerns..."
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    className={inputClassName}
                  />
                </Field>

                <label className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-muted">
                  <input type="checkbox" checked={form.consentContact} onChange={(e) => updateForm("consentContact", e.target.checked)} className="mt-0.5" />
                  I agree to receive calls and/or SMS from Gutter Guard Experts® at the number provided, including by
                  autodialer, about my estimate. Consent is not a condition of purchase. Msg &amp; data rates may
                  apply. Reply STOP to opt out.
                </label>
                <label className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-muted">
                  <input type="checkbox" checked={form.consentTerms} onChange={(e) => updateForm("consentTerms", e.target.checked)} className="mt-0.5" />
                  I have read and agree to the{" "}
                  <Link to="/privacy-policy" className="font-bold text-orange-dark">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms-and-conditions" className="font-bold text-orange-dark">
                    Terms &amp; Conditions
                  </Link>
                  .
                </label>
              </div>

              <div className="mt-7 flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="rounded-pill border border-border px-6 py-3.5 text-[14px] font-bold text-navy">
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="flex-1 rounded-pill bg-orange py-3.5 text-[14px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Get My Free Estimate
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
