import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ScrollProgressBar from "./components/ScrollProgressBar.jsx";
import FloatingNav from "./components/FloatingNav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ServicesHub from "./pages/ServicesHub.jsx";
import ServiceAreas from "./pages/ServiceAreas.jsx";
import LocationDetail from "./pages/LocationDetail.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import Warranty from "./pages/Warranty.jsx";
import Why2Pro from "./pages/Why2Pro.jsx";
import Booking from "./pages/Booking.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Gallery from "./pages/Gallery.jsx";
import SeamlessGutter from "./pages/SeamlessGutter.jsx";
import LeafFilterVs from "./pages/LeafFilterVs.jsx";
import LeafGuardVs from "./pages/LeafGuardVs.jsx";
import NotFound from "./pages/NotFound.jsx";

// Catches any known-shaped path requested with a legacy trailing slash
// (e.g. /about-us/, carried over from the old directory-based static site)
// and redirects to the slash-less route instead of falling through to
// NotFound. Anything else still lands on NotFound.
function TrailingSlashOrNotFound() {
  const location = useLocation();
  const hasTrailingSlash = location.pathname.length > 1 && location.pathname.endsWith("/");
  if (hasTrailingSlash) {
    return <Navigate to={location.pathname.slice(0, -1) + location.search} replace />;
  }
  return <NotFound />;
}

export default function App() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const page = (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/services-hub" element={<ServicesHub />} />
      <Route path="/service-areas" element={<ServiceAreas />} />
      <Route path="/service-areas/:locationId" element={<LocationDetail />} />
      <Route path="/service-areas/:locationId/:serviceId" element={<LocationDetail />} />
      <Route path="/services/:serviceId" element={<ServiceDetail />} />

      {/* Clean top-level pages for each service (distinct from the localized
          /service-areas/:locationId/:serviceId combo pages below, which stay
          in place — these are the generic, city-agnostic versions). */}
      <Route path="/2-pro-guard-installation" element={<ServiceDetail slug="2-0-pro-installation" />} />
      <Route path="/gutter-cleaning" element={<ServiceDetail slug="gutter-cleaning" />} />
      <Route path="/repair-tune-up" element={<ServiceDetail slug="repair-tune-up" />} />
      <Route path="/2-0-pro-heat" element={<ServiceDetail slug="2-0-pro-heat" />} />
      <Route path="/commercial-protection" element={<ServiceDetail slug="commercial" />} />
      <Route path="/warranty" element={<Warranty />} />
      <Route path="/why-2-pro" element={<Why2Pro />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/seamless-gutter" element={<SeamlessGutter />} />
      <Route path="/2-pro-vs-leaf-filter" element={<LeafFilterVs />} />
      <Route path="/2-pro-vs-leaf-guard" element={<LeafGuardVs />} />

      {/* Aliases for alternative/shorthand paths */}
      <Route path="/about" element={<Navigate to="/about-us" replace />} />
      <Route path="/services" element={<Navigate to="/services-hub" replace />} />
      <Route path="/vs-leaffilter" element={<Navigate to="/2-pro-vs-leaf-filter" replace />} />
      <Route path="/vs-leafguard" element={<Navigate to="/2-pro-vs-leaf-guard" replace />} />

      <Route path="*" element={<TrailingSlashOrNotFound />} />
    </Routes>
  );

  return (
    <>
      <ScrollToTop />
      <ScrollProgressBar />
      <FloatingNav />
      {shouldReduceMotion ? (
        page
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {page}
          </motion.div>
        </AnimatePresence>
      )}
      <Footer />
    </>
  );
}
