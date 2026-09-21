import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  ArrowRight,
  Shield,
  ShieldCheck,
  Droplet,
  Wrench,
  Sparkles,
  Flame,
  Building2,
  MapPin,
  BarChart2,
  Info,
  ClipboardCheck,
} from "lucide-react";

const SERVICES = [
  { name: "2.0 PRO® Guard Installation", desc: "Patented Triple-Rib™ micro-mesh protection", href: "/service-detail", icon: Shield },
  { name: "Gutter Cleaning", desc: "The last cleaning you'll ever need", href: "/service-areas/denver-co/gutter-cleaning", icon: Droplet },
  { name: "Repair & Tune-Up", desc: "Hanger, pitch & sealant service", href: "/service-areas/denver-co/repair-tune-up", icon: Wrench },
  { name: "Seamless Gutters", desc: "Custom K-style, 30+ colors", href: "/seamless-gutter", icon: Sparkles },
  { name: "2.0 PRO HEAT™", desc: "Integrated ice-melt for winter", href: "/service-areas/denver-co/2-0-pro-heat", icon: Flame },
  { name: "Commercial Protection", desc: "Multi-unit & commercial roof lines", href: "/service-areas/denver-co/commercial", icon: Building2 },
];

const SERVICE_AREAS = [
  { name: "Denver, Colorado", href: "/service-areas/denver-co" },
  { name: "Sacramento, California", href: "/service-areas/sacramento-ca" },
  { name: "Aurora, Colorado", href: "/service-areas/aurora-co" },
];

const COMPARE = [
  { name: "2.0 PRO® vs. LeafFilter", href: "/2-pro-vs-leaf-filter", icon: BarChart2 },
  { name: "2.0 PRO® vs. LeafGuard", href: "/2-pro-vs-leaf-guard", icon: ShieldCheck },
];

const RESOURCES = [
  { name: "Warranty", href: "/warranty", icon: ShieldCheck },
  { name: "About", href: "/about-us", icon: Info },
  { name: "Register Warranty", href: "/warranty#register", icon: ClipboardCheck },
];

function DesktopDropdown({ label, href, viewAllHref, viewAllLabel, children }) {
  const triggerClassName =
    "flex items-center gap-1.5 whitespace-nowrap rounded-pill px-2.5 py-2 text-sm font-semibold text-ink transition hover:bg-ink/5";

  return (
    <div className="group relative">
      {href ? (
        <Link to={href} className={triggerClassName}>
          {label}
          <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
        </Link>
      ) : (
        <button type="button" className={triggerClassName}>
          {label}
          <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
        </button>
      )}
      {/*
        The wrapper stays flush against the trigger (top-full, no translate-y) and the
        transparent pt-3 inside it is the hover bridge: it's part of this element's
        hoverable box even though only the rounded card below it is visible, so moving
        the mouse straight down from the trigger into the panel never crosses a dead
        gap that would drop :hover and close the menu.
      */}
      <div className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3 opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
        <div className="rounded-[22px] border border-[#2D3748] bg-ink p-5 shadow-2xl">
          <div className="grid grid-cols-1 gap-1">
            {children}
            {viewAllHref && (
              <div className="mt-2 border-t border-[#2D3748] pt-3">
                <Link to={viewAllHref} className="flex items-center gap-1.5 text-[13.5px] font-bold text-orange">
                  {viewAllLabel} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ item }) {
  const Icon = item.icon || MapPin;
  return (
    <Link to={item.href} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-white/85 transition hover:bg-white/5 hover:text-white">
      <Icon className="h-[15px] w-[15px] flex-shrink-0 text-orange" />
      {item.name}
      {item.desc && <span className="ml-1 truncate text-[12.5px] font-normal text-white/50">{item.desc}</span>}
    </Link>
  );
}

function MobileAccordion({ title, items, open, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-2 py-3.5 text-[16px] font-bold text-ink"
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-ink/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 pb-4 pl-1 pr-2">
              {items.map((item) => (
                <Link key={item.href} to={item.href} className="rounded-lg px-2.5 py-2 text-[14.5px] font-semibold text-muted hover:bg-ink/5 hover:text-ink">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FloatingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  function toggleAccordion(key) {
    setOpenAccordion((current) => (current === key ? null : key));
  }

  function closeMobileMenu() {
    setMobileOpen(false);
    setOpenAccordion(null);
  }

  return (
    <header className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-[1280px] rounded-pill border border-pale-sage bg-white py-4 px-6 shadow-lg md:px-8 sm:left-2.5 sm:right-2.5 sm:top-2.5">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" aria-label="Gutter Guard Experts home" onClick={closeMobileMenu}>
          <img src="/assets/logo.png" alt="Gutter Guard Experts Logo" className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          <DesktopDropdown label="Services" href="/services-hub" viewAllHref="/services-hub" viewAllLabel="View all services">
            {SERVICES.map((item) => (
              <DropdownItem key={item.href} item={item} />
            ))}
          </DesktopDropdown>

          <DesktopDropdown label="Service Areas" href="/service-areas" viewAllHref="/service-areas" viewAllLabel="View all service areas">
            {SERVICE_AREAS.map((item) => (
              <DropdownItem key={item.href} item={{ ...item, icon: MapPin }} />
            ))}
          </DesktopDropdown>

          <Link to="/gallery" className="whitespace-nowrap rounded-pill px-2.5 py-2 text-sm font-semibold text-ink transition hover:bg-ink/5">
            Gallery
          </Link>

          <DesktopDropdown label="Compare">
            {COMPARE.map((item) => (
              <DropdownItem key={item.href} item={item} />
            ))}
          </DesktopDropdown>

          <DesktopDropdown label="Resources">
            {RESOURCES.map((item) => (
              <DropdownItem key={item.href} item={item} />
            ))}
          </DesktopDropdown>
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a href="tel:+17207091681" className="flex items-center gap-2 px-1.5 py-2 text-[14.5px] font-bold text-navy">
            <Phone className="h-4 w-4 text-orange" />
            (720) 709-1681
          </a>
          <Link
            to="/booking"
            className="rounded-pill bg-orange px-[22px] py-[11px] text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(242,101,34,0.32)] transition hover:-translate-y-0.5 hover:bg-orange-dark"
          >
            Get an Estimate
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-navy lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mt-3.5 flex flex-col gap-1.5 border-t border-border px-1 pt-4">
              <MobileAccordion title="Services" items={SERVICES} open={openAccordion === "services"} onToggle={() => toggleAccordion("services")} />
              <MobileAccordion title="Service Areas" items={SERVICE_AREAS} open={openAccordion === "areas"} onToggle={() => toggleAccordion("areas")} />
              <Link to="/gallery" onClick={closeMobileMenu} className="border-b border-border px-2 py-3.5 text-[16px] font-bold text-ink">
                Gallery
              </Link>
              <MobileAccordion title="Compare" items={COMPARE} open={openAccordion === "compare"} onToggle={() => toggleAccordion("compare")} />
              <MobileAccordion title="Resources" items={RESOURCES} open={openAccordion === "resources"} onToggle={() => toggleAccordion("resources")} />

              <a href="tel:+17207091681" className="flex items-center gap-2.5 px-2 py-4 text-[17px] font-extrabold text-ink">
                <Phone className="h-[18px] w-[18px] text-orange" />
                (720) 709-1681
              </a>
              <Link
                to="/booking"
                onClick={closeMobileMenu}
                className="mt-1 rounded-pill bg-orange px-6 py-3.5 text-center text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(242,101,34,0.32)]"
              >
                Get an Estimate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
