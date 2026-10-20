"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";
import { categories, type Category } from "@/data/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const CATALOG_EVENT = "catalog:select";

function TiltCard({ category, index }: { category: Category; index: number }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgb(255 138 0 / 0.35), transparent 55%)`,
  );

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.a
        href="#productos"
        onClick={() => window.dispatchEvent(new CustomEvent(CATALOG_EVENT, { detail: category.id }))}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-industrial-800 bg-industrial-900"
      >
        <Image
          src={category.cover.src}
          alt={category.cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-industrial-950 via-industrial-950/50 to-industrial-950/10" />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />

        <span className="absolute top-5 left-6 font-display text-7xl font-black text-white/15 transition-colors duration-500 group-hover:text-fire/60">
          {category.number}
        </span>
        <span className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-fire group-hover:bg-fire">
          <ArrowUpRight className="h-5 w-5" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8" style={{ transform: "translateZ(40px)" }}>
          <span className="font-script text-3xl text-fire">{category.script}</span>
          <h3 className="mt-1 font-display text-2xl leading-tight font-black text-white">{category.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-industrial-300">{category.short}</p>
          <span className="mt-5 block h-1 w-12 bg-fire transition-all duration-500 group-hover:w-full" />
        </div>
      </motion.a>
    </motion.div>
  );
}

export const QuickAccess = () => (
  <section id="lineas" className="relative bg-industrial-950 py-24 sm:py-32">
    <div className="pointer-events-none absolute inset-0 bg-magma-gradient" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        script="Lo que fundimos"
        title={
          <>
            Tres líneas, <span className="text-fire">un mismo fuego</span>
          </>
        }
        intro="Del fogón de tu casa al gimnasio y a la industria: cada pieza sale de nuestro taller en hierro o aluminio, colada a mano y terminada con cuidado."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {categories.map((category, i) => (
          <TiltCard key={category.id} category={category} index={i} />
        ))}
      </div>
    </div>
  </section>
);
