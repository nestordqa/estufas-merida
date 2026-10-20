"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
};

export function Reveal({ children, className, delay = 0, y = 40, x = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Texto caligráfico que aparece como si se escribiera de izquierda a derecha. */
export function ScriptReveal({
  children,
  className,
  delay = 0,
  animateOnMount = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const base = `inline-block font-script whitespace-nowrap text-fire normal-case ${className ?? ""}`;

  // Al montar (hero) se anima con CSS para no esperar al JavaScript: es parte del LCP.
  if (animateOnMount) {
    return (
      <span className={`${base} animate-write`} style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={base}
      initial={{ clipPath: "inset(-20% 100% -30% -5%)", opacity: 0.6 }}
      whileInView={{ clipPath: "inset(-20% -5% -30% -5%)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 1.3, ease: [0.45, 0, 0.2, 1] }}
    >
      {children}
    </motion.span>
  );
}
