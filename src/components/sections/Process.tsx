"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/data/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * "Del fuego a la pieza": a medida que se hace scroll, una línea de metal
 * fundido baja por los pasos y la foto fija de la izquierda va cambiando.
 */
export const Process = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const [active, setActive] = useState(0);

  useEffect(
    () =>
      scrollYProgress.on("change", (v) => {
        setActive(Math.min(processSteps.length - 1, Math.max(0, Math.floor(v * processSteps.length))));
      }),
    [scrollYProgress],
  );

  const step = processSteps[active];

  return (
    <section id="proceso" className="relative bg-industrial-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          script="Nuestro proceso"
          title={
            <>
              Del fuego <span className="text-fire">a la pieza</span>
            </>
          }
          intro="Así nace cada pieza en nuestro taller: un proceso de fundición en arena que combina oficio, fuerza y precisión."
        />

        <div ref={ref} className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="hidden lg:block">
            <div className="sticky top-24 h-[calc(100svh-8rem)] max-h-[760px] overflow-hidden rounded-2xl border border-industrial-800">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={step.photo.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={step.photo.src} alt={step.photo.alt} fill sizes="45vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-industrial-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="font-display text-8xl leading-none font-black text-white/90">0{active + 1}</span>
                <span className="block font-script text-3xl text-fire">{step.title}</span>
              </div>
            </div>
          </div>

          <ol className="relative">
            <div className="absolute top-2 bottom-2 left-6 w-1 rounded-full bg-industrial-800" aria-hidden="true" />
            <motion.div
              className="absolute top-2 bottom-2 left-6 w-1 origin-top rounded-full bg-linear-to-b from-fire-light via-fire to-fire-deep shadow-[0_0_18px_var(--color-fire)]"
              style={{ scaleY: fill }}
              aria-hidden="true"
            />

            {processSteps.map((s, i) => (
              <li key={s.title} className="relative pb-20 pl-20 last:pb-0 lg:min-h-[55vh]">
                <span
                  className={`absolute top-0 left-0 flex h-13 w-13 items-center justify-center rounded-full border-2 font-display text-lg font-black transition-all duration-500 ${
                    i <= active
                      ? "border-fire bg-fire text-white shadow-[0_0_30px_var(--color-fire)]"
                      : "border-industrial-700 bg-industrial-950 text-industrial-500"
                  }`}
                >
                  0{i + 1}
                </span>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="pt-2 font-display text-2xl font-black text-white sm:text-3xl">{s.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-industrial-300 sm:text-lg">{s.text}</p>
                  <div className="relative mt-6 aspect-video overflow-hidden rounded-xl lg:hidden">
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="90vw" className="object-cover" />
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
