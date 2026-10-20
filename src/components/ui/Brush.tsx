"use client";

import { useId } from "react";
import { motion } from "motion/react";

// Trazos de brocha al estilo del post de Instagram: un path grueso con un
// filtro de turbulencia que le rompe los bordes, y que se "pinta" al aparecer.

type StrokeProps = {
  d: string;
  viewBox: string;
  strokeWidth: number;
  color?: string;
  className?: string;
  delay?: number;
  duration?: number;
  roughness?: number;
  preserveAspectRatio?: string;
  linecap?: "round" | "butt";
};

export function BrushStroke({
  d,
  viewBox,
  strokeWidth,
  color = "var(--color-fire)",
  className,
  delay = 0,
  duration = 0.9,
  roughness = 7,
  preserveAspectRatio = "none",
  linecap = "round",
}: StrokeProps) {
  const filterId = `brush-${useId().replace(/:/g, "")}`;
  // La región del filtro va en unidades del viewBox: si se calcula sobre el
  // bbox del path (que ignora el grosor del trazo) recorta los trazos gruesos.
  const [vx, vy, vw, vh] = viewBox.split(" ").map(Number);
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      aria-hidden="true"
      overflow="visible"
    >
      <defs>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          x={vx - vw * 0.25}
          y={vy - vh * 0.5}
          width={vw * 1.5}
          height={vh * 2}
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.9" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={roughness} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap={linecap}
        filter={`url(#${filterId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] },
          opacity: { delay, duration: 0.01 },
        }}
      />
    </svg>
  );
}

/** Subrayado naranja bajo los títulos. */
export const BrushUnderline = ({ className, delay = 0.3 }: { className?: string; delay?: number }) => (
  <BrushStroke
    viewBox="0 0 600 40"
    d="M8 26 C 120 14, 260 12, 380 18 S 540 24, 592 14"
    strokeWidth={9}
    className={className}
    delay={delay}
  />
);

/** Banda blanca de brocha detrás de un texto (como el "REALLYGREATSITE.COM" del post). */
export const BrushBanner = ({
  className,
  color = "#fff",
  delay = 0.2,
}: {
  className?: string;
  color?: string;
  delay?: number;
}) => (
  <BrushStroke
    viewBox="0 0 600 80"
    d="M10 42 C 160 34, 420 48, 590 38"
    strokeWidth={62}
    linecap="butt"
    roughness={14}
    color={color}
    className={className}
    delay={delay}
    duration={0.8}
  />
);

/** Garabatos de brocha para las esquinas. */
export const BrushCorner = ({ className, delay = 0.6 }: { className?: string; delay?: number }) => (
  <BrushStroke
    viewBox="0 0 200 200"
    d="M-10 70 C 40 40, 90 20, 150 -10 M -10 120 C 50 80, 120 40, 190 -10 M 20 150 C 70 110, 130 60, 210 20"
    strokeWidth={12}
    roughness={10}
    className={className}
    delay={delay}
    duration={1.2}
    preserveAspectRatio="xMidYMid meet"
  />
);

/** Flecha dibujada a mano. */
export function HandArrow({ className, delay = 1 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 80 120" className={className} aria-hidden="true" fill="none">
      <motion.path
        d="M60 6 C 20 20, 8 60, 38 104"
        stroke="var(--color-fire)"
        strokeWidth={3.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.9, ease: "easeInOut" }}
      />
      <motion.path
        d="M22 92 L 38 106 L 50 86"
        stroke="var(--color-fire)"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.85, duration: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}
