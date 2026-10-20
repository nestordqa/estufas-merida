"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/config/site";
import { fundicion } from "@/data/catalog";
import { BrushCorner } from "@/components/ui/Brush";
import { ScriptReveal, Reveal } from "@/components/ui/Reveal";
import { Embers } from "@/components/ui/Embers";
import { WhatsAppIcon } from "@/components/ui/Icons";

export const CtaBand = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 sm:py-40">
      <motion.div className="absolute inset-[-15%_0]" style={{ y }}>
        <Image src={fundicion.molde.src} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-industrial-950/80" />
      <div className="absolute inset-0 bg-linear-to-b from-industrial-950 via-transparent to-industrial-950" />
      <Embers className="absolute inset-0 h-full w-full" density={40} />
      <BrushCorner className="absolute -top-4 -left-4 w-36 sm:w-52" />
      <BrushCorner className="absolute -right-4 -bottom-4 w-36 rotate-180 sm:w-52" delay={0.8} />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <ScriptReveal className="relative z-10 -mb-4 -rotate-3 text-[11vw] sm:text-7xl">¿Tienes un proyecto?</ScriptReveal>
        <Reveal delay={0.15}>
          <h2 className="font-display text-5xl leading-[0.9] font-black text-white sm:text-7xl md:text-8xl">
            Cotiza tu pieza <span className="animate-molten text-molten">hoy</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-industrial-100">
            Envíanos una foto, un plano o la medida de lo que necesitas y te respondemos con precio y tiempo de entrega.
          </p>
        </Reveal>

        <Reveal delay={0.45} className="mt-12 flex justify-center">
          <a
            href={siteConfig.whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-12 py-6 transition-transform hover:scale-105"
          >
            {/* Banda de brocha en CSS (clip-path): el filtro SVG no se pinta en Safari/iOS */}
            <motion.span
              className="absolute inset-0 origin-left bg-white"
              style={{
                clipPath:
                  "polygon(0% 14%, 5% 6%, 13% 11%, 23% 3%, 36% 9%, 50% 2%, 63% 8%, 77% 1%, 90% 7%, 100% 3%, 98% 50%, 100% 93%, 89% 98%, 75% 92%, 61% 99%, 46% 93%, 31% 100%, 17% 93%, 6% 98%, 0% 89%, 2% 52%)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            />
            <WhatsAppIcon className="relative h-7 w-7 text-whatsapp" />
            <span className="relative font-display text-xl font-black tracking-wide text-industrial-950 sm:text-2xl">
              {siteConfig.whatsappDisplay}
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
