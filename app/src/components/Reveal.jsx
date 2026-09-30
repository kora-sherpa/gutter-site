import { motion, useReducedMotion } from "framer-motion";

const DIRECTIONS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
};

// Generic scroll-entrance wrapper: fades + slides (and optionally scales/blurs)
// an element in once it enters the viewport. Wrap any section/card with
// <Reveal>...</Reveal> instead of hand-writing the same whileInView boilerplate
// everywhere. direction="zoom" scales up from 92% instead of sliding; blur
// adds a focus-pull (blur -> sharp) often paired with a fade.
export default function Reveal({
  children,
  as = "div",
  direction = "up",
  blur = false,
  delay = 0,
  duration = 0.45,
  className,
  once = true,
  amount = 0.2,
}) {
  const shouldReduceMotion = useReducedMotion();
  const isZoom = direction === "zoom";
  const offset = DIRECTIONS[direction] || DIRECTIONS.up;
  const MotionTag = motion[as] || motion.div;

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const initial = { opacity: 0, x: offset.x, y: offset.y };
  const animate = { opacity: 1, x: 0, y: 0 };
  if (isZoom) {
    initial.scale = 0.92;
    animate.scale = 1;
  }
  if (blur) {
    initial.filter = "blur(10px)";
    animate.filter = "blur(0px)";
  }

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      // 300-500ms is the sweet spot for entrance motion: fast enough to
      // feel responsive, slow enough to actually register as movement.
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
