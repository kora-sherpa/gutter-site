import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import FloatingNav from "./components/FloatingNav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ServicesHub from "./pages/ServicesHub.jsx";
import ServiceAreas from "./pages/ServiceAreas.jsx";
import LocationDetail from "./pages/LocationDetail.jsx";
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
  return (
    <>
      <ScrollToTop />
      <FloatingNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services-hub" element={<ServicesHub />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/service-areas/:locationId" element={<LocationDetail />} />
        <Route path="/service-areas/:locationId/:serviceId" element={<LocationDetail />} />
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
      <Footer />
    </>
  );
}
