"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-molten shadow-[0_0_12px_var(--color-fire)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
