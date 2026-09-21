import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Award, Star, CreditCard } from "lucide-react";

const COMPANY_LINKS = [
  { name: "About Us", href: "/about-us" },
  { name: "Why 2.0 PRO®", href: "/why-2-pro" },
  { name: "Warranty", href: "/warranty" },
];

const SERVICE_LINKS = [
  { name: "All Services", href: "/services-hub" },
  { name: "2.0 PRO® Installation", href: "/service-detail" },
  { name: "Seamless Gutters", href: "/seamless-gutter" },
];

const COMPARE_LINKS = [
  { name: "vs. LeafGuard", href: "/2-pro-vs-leaf-guard" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Get an Estimate", href: "/booking" },
];

const CREDENTIALS = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "U.S. Patented Design" },
  { icon: Star, label: "4.9 Google Rated · 500+ Reviews" },
  { icon: CreditCard, label: "0% Financing Available" },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="mb-4 text-[13px] font-extrabold uppercase tracking-wide text-white">{title}</h4>
      <ul className="flex flex-col gap-[11px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className="text-[14px] text-white/75 transition hover:text-white">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-ink text-white/70">
      <div className="mx-auto max-w-[1280px] px-6 pb-12 pt-[72px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <img src="/assets/logo.png" alt="Gutter Guard Experts Logo" className="mb-4 h-[26px] w-auto" />
            <p className="max-w-[280px] text-sm leading-relaxed text-white/55">
              Family-owned since 2012. Patented 2.0 PRO® gutter protection, installed and warrantied for life.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-white/75">
                <Phone className="h-[15px] w-[15px] flex-shrink-0 text-orange" />
                (720) 709-1681
              </div>
              <div className="flex items-center gap-2.5 text-white/75">
                <Mail className="h-[15px] w-[15px] flex-shrink-0 text-orange" />
                info@gutterguardexperts.com
              </div>
              <div className="flex items-center gap-2.5 text-white/75">
                <MapPin className="h-[15px] w-[15px] flex-shrink-0 text-orange" />
                710 S. Pearl St. Suite D, Denver, CO 80209
              </div>
            </div>
          </div>

          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Services" links={SERVICE_LINKS} />
          <FooterColumn title="Compare & Areas" links={COMPARE_LINKS} />
        </div>

        <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 py-7">
          {CREDENTIALS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-3.5 py-2.5 text-[12.5px] font-bold text-white/75">
              <Icon className="h-[15px] w-[15px] flex-shrink-0 text-cyan" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-[22px] text-[13px] text-white/50">
        <span>© {year} Gutter Guard Experts®. All rights reserved.</span>
        <div className="flex gap-5">
          <Link to="/privacy-policy" className="text-white/60 hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="text-white/60 hover:text-white">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
