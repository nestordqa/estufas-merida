import type { ReactNode } from "react";
import { BrushUnderline } from "./Brush";
import { ScriptReveal, Reveal } from "./Reveal";

type SectionHeadingProps = {
  script: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Caligrafía naranja + título grueso + brochazo, como en el post de Instagram. */
export function SectionHeading({ script, title, intro, align = "left", className }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className ?? ""}`}>
      <ScriptReveal className="relative z-10 -mb-3 -rotate-3 text-4xl sm:text-5xl md:text-6xl">{script}</ScriptReveal>
      <Reveal delay={0.15}>
        <h2 className="font-display text-4xl leading-[0.95] font-black tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      <BrushUnderline className={`mt-4 h-4 w-48 sm:w-64 ${centered ? "mx-auto" : ""}`} />
      {intro && (
        <Reveal delay={0.25}>
          <p className="mt-6 text-base leading-relaxed text-industrial-300 sm:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
