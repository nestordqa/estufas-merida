"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { BrushCorner, BrushUnderline, HandArrow } from "@/components/ui/Brush";
import { ScriptReveal } from "@/components/ui/Reveal";
import { Embers } from "@/components/ui/Embers";
import { CheckMark } from "@/components/ui/CheckItem";
import { WhatsAppIcon } from "@/components/ui/Icons";

const ease = [0.22, 1, 0.36, 1] as const;

function SplitWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
      {word.split("").map((char, i) => (
        <span
          key={i}
          className={`inline-block animate-rise ${className ?? ""}`}
          style={{ animationDelay: `${delay + i * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // El contenido sube un poco y se desvanece; si bajara, el overflow-hidden lo recortaría.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0]);

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-svh items-center overflow-hidden bg-industrial-950">
      {/* Foto de fondo con zoom lento y parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.25 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2.4, ease }}
        >
          <Image
            src="/images/fundicion/fundicion-5.jpeg"
            alt="Hierro fundido vertido en moldes en el taller de Estufas Mérida"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[60%_center]"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-r from-industrial-950 via-industrial-950/85 to-industrial-950/30" />
      <div className="absolute inset-0 bg-linear-to-t from-industrial-950 via-transparent to-industrial-950/60" />
      <div className="absolute right-[10%] bottom-[20%] h-[50vh] w-[50vh] animate-flicker rounded-full bg-fire/25 blur-[120px]" />
      <Embers className="absolute inset-0 h-full w-full" />

      <BrushCorner className="absolute top-24 -right-6 hidden w-48 -scale-x-100 sm:block" delay={1.4} />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-32 sm:px-6 lg:px-8"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          <h1 className="relative">
            <ScriptReveal
              animateOnMount
              delay={0.5}
              className="relative z-10 -mb-3 -rotate-6 text-[8.5vw] sm:-mb-5 sm:text-6xl md:text-7xl"
            >
              Fundición &amp; Metalurgia
            </ScriptReveal>
            {/* Las letras animadas van ocultas a lectores de pantalla; este texto es el que leen ellos y Google. */}
            <span className="sr-only"> {siteConfig.name}</span>
            <span className="block font-display text-[19vw] leading-[0.85] font-black tracking-tight text-white sm:text-8xl md:text-9xl">
              <SplitWord word="ESTUFAS" delay={0.1} />
              <SplitWord word="MÉRIDA" delay={0.3} className="animate-molten text-molten" />
            </span>
          </h1>

          <BrushUnderline className="mt-4 h-5 w-64 sm:w-96" delay={1.1} />

          {/* Entradas en CSS (no motion): este párrafo suele ser el LCP en móvil. */}
          <p
            className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-industrial-100 sm:text-xl"
            style={{ animationDelay: "0.35s" }}
          >
            Fundición de metales y fabricación de piezas en <strong className="text-fire">hierro y aluminio</strong> de
            alta resistencia, hechas en Mérida para durar generaciones.
          </p>

          <ul className="mt-8 grid gap-3 font-semibold text-white sm:grid-cols-3">
            {["Estufas a leña", "Línea fitness", "Piezas industriales"].map((item, i) => (
              <li
                key={item}
                className="flex animate-fade-up items-start gap-3"
                style={{ animationDelay: `${0.55 + i * 0.12}s` }}
              >
                <CheckMark />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex animate-fade-up flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.9s" }}>
            <a
              href={siteConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-fire px-8 py-4 font-display text-sm font-extrabold tracking-wider text-industrial-950 uppercase shadow-2xl shadow-fire/40 transition hover:shadow-fire/60"
            >
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <WhatsAppIcon className="h-5 w-5" />
              Cotizar por WhatsApp
            </a>
            <a
              href="#productos"
              className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-white/80 px-8 py-4 font-display text-sm font-extrabold tracking-wider text-white uppercase transition hover:border-fire hover:bg-fire hover:text-industrial-950"
            >
              Ver catálogo
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </motion.div>

      <a
        href="#lineas"
        className="absolute right-28 bottom-16 z-10 hidden flex-col items-center lg:flex"
      >
        <span className="font-script text-2xl text-white/80">Descubre más</span>
        <HandArrow className="h-14 w-10" delay={2} />
      </a>
    </section>
  );
};
