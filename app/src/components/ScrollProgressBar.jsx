import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

// Thin fixed bar at the very top of the viewport that fills left-to-right as
// the user scrolls down the page.
export default function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-orange"
      aria-hidden="true"
    />
  );
}
