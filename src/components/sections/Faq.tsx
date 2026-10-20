"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="preguntas" className="relative bg-industrial-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:px-8">
        <SectionHeading
          script="Dudas comunes"
          title={
            <>
              Preguntas <span className="text-fire">frecuentes</span>
            </>
          }
          intro="Lo que más nos preguntan sobre fundición, estufas a leña, piezas a medida y envíos."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05} y={20}>
                <div
                  className={`rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-fire/60 bg-industrial-950" : "border-industrial-800 bg-industrial-950/60"
                  }`}
                >
                  <h3 className="normal-case">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-base font-bold text-white sm:p-6 sm:text-lg"
                    >
                      {faq.q}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          isOpen ? "bg-fire text-white" : "bg-industrial-800 text-fire"
                        }`}
                      >
                        <Plus className="h-5 w-5" />
                      </motion.span>
                    </button>
                  </h3>
                  {/* La respuesta siempre está en el HTML (para buscadores); solo se anima su altura. */}
                  <motion.div
                    id={`faq-${i}`}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 leading-relaxed text-industrial-300 sm:px-6">{faq.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
