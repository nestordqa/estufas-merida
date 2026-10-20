"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Flame, Ruler, ShieldCheck, Truck } from "lucide-react";
import { fundicion } from "@/data/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckItem } from "@/components/ui/CheckItem";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  { icon: Flame, title: "Hierro fundido", text: "Resiste el fuego directo, el peso y el desgaste del uso diario." },
  { icon: ShieldCheck, title: "Aluminio", text: "Liviano y sin óxido: ideal para puertas y piezas a la vista." },
  { icon: Ruler, title: "A la medida", text: "Reproducimos piezas desde un plano, un diseño o una muestra." },
  { icon: Truck, title: "Distribución", text: "Despachamos desde Mérida hacia otras regiones según el pedido." },
];

/** Sello giratorio con texto en círculo y el logo en el centro. */
function SpinningSeal() {
  return (
    <div className="relative h-36 w-36 sm:h-44 sm:w-44">
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M100 100 m -78 0 a 78 78 0 1 1 156 0 a 78 78 0 1 1 -156 0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--color-industrial-950)" />
        {/* textLength reparte el texto exactamente en la circunferencia (2πr ≈ 490) para que no se encime */}
        <text className="fill-white font-display text-[15px] font-extrabold uppercase">
          <textPath href="#seal-circle" textLength="486" lengthAdjust="spacing">
            Fundición • Hierro • Aluminio • Mérida •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[30%] flex items-center justify-center rounded-full bg-fire">
        <Flame className="h-8 w-8 text-white" />
      </div>
    </div>
  );
}

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section id="nosotros" className="relative overflow-hidden bg-industrial-900 py-24 sm:py-32">
      {/* Marca de agua decorativa en SVG para que no cuente como texto de bajo contraste */}
      <svg
        viewBox="0 0 1000 220"
        className="pointer-events-none absolute top-4 right-0 w-[110vw] max-w-none select-none sm:top-0 sm:w-[95vw]"
        aria-hidden="true"
      >
        <text x="1000" y="190" textAnchor="end" className="fill-white/[0.03] font-display text-[220px] font-black">
          FUEGO
        </text>
      </svg>

      <div ref={ref} className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            style={{ y: yMain }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <Image
              src={fundicion.equipo.src}
              alt={fundicion.equipo.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-industrial-950/70 to-transparent" />
          </motion.div>

          <motion.div
            style={{ y: ySmall }}
            className="absolute -right-4 -bottom-10 aspect-square w-[45%] overflow-hidden rounded-2xl border-4 border-fire shadow-2xl shadow-black sm:-right-10"
          >
            <Image src={fundicion.cuchara.src} alt={fundicion.cuchara.alt} fill sizes="25vw" className="object-cover" />
          </motion.div>

          <div className="absolute -top-10 -left-4 sm:-left-10">
            <SpinningSeal />
          </div>
        </div>

        <div>
          <SectionHeading
            script="Quiénes somos"
            title={
              <>
                Un oficio familiar <span className="text-fire">forjado en fuego</span>
              </>
            }
          />
          <Reveal delay={0.2} className="mt-8 space-y-5 text-base leading-relaxed text-industrial-300 sm:text-lg">
            <p>
              <strong className="text-white">Estufas Mérida</strong> es una empresa familiar merideña dedicada a la
              fundición de metales. En nuestro taller transformamos hierro y aluminio en piezas de alta durabilidad: desde
              la puerta de una estufa a leña hasta la masa de un trapiche.
            </p>
            <p>
              Unimos el oficio artesanal de la fundición en arena con procesos industriales para entregar piezas
              resistentes, bien terminadas y hechas para durar generaciones.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-8 grid gap-4 font-semibold text-white sm:grid-cols-2">
              <CheckItem>Control del metal en cada colada</CheckItem>
              <CheckItem>Acabados limpios y medidas exactas</CheckItem>
              <CheckItem>Trato directo con el taller</CheckItem>
              <CheckItem>Fabricación sobre diseño o muestra</CheckItem>
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto mt-28 grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {pillars.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-industrial-800 bg-industrial-950 p-7 transition-colors duration-500 hover:border-fire/60">
              <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-fire/0 blur-2xl transition-colors duration-500 group-hover:bg-fire/30" />
              <Icon className="h-10 w-10 text-fire transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
              <h3 className="mt-5 font-display text-lg font-black text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-industrial-300">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
