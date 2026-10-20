"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Expand } from "lucide-react";
import { projects } from "@/data/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";

export const Projects = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="proyectos" className="relative overflow-hidden bg-industrial-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            script="Obras que hablan"
            title={
              <>
                Proyectos <span className="text-fire">terminados</span>
              </>
            }
            intro="Cocinas, fogones y hornos de leña levantados en ladrillo por constructores de la región con nuestras piezas fundidas."
          />
          <Reveal delay={0.2} className="max-w-sm rounded-2xl border border-fire/40 bg-industrial-950 p-6">
            <span className="font-script text-lg text-fire">Hecho a tu nombre</span>
            <p className="mt-2 text-sm leading-relaxed text-industrial-300">
              Fundimos puertas personalizadas con el nombre de tu casa, finca o posada, como las de{" "}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {projects.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl text-left"
              initial={{ opacity: 0, y: 60, clipPath: "inset(15% 0 0 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`Ampliar foto: ${photo.caption || photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-industrial-950/90 via-industrial-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
                <span className="font-script text-lg text-fire">{photo.caption}</span>
              </div>
              <Expand className="absolute top-4 right-4 h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox photos={projects} index={lightbox} onChange={setLightbox} />
    </section>
  );
};
