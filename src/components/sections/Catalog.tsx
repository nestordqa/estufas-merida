"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Cog, Expand, Factory, Hammer, Info } from "lucide-react";
import { siteConfig } from "@/config/site";
import { categories, type CategoryId } from "@/data/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckItem } from "@/components/ui/CheckItem";
import { Lightbox } from "@/components/ui/Lightbox";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { CATALOG_EVENT } from "./QuickAccess";

const industrialHighlights = [
  { icon: Factory, title: "Masas para trapiches", text: "Para trapiches e ingenios azucareros." },
  { icon: Cog, title: "Piñones y engranajes", text: "Repuestos para maquinaria agrícola e industrial." },
  { icon: Hammer, title: "Piezas especiales", text: "Sobre diseño, plano o muestra, mediante moldes." },
];

export const Catalog = () => {
  const [activeId, setActiveId] = useState<CategoryId>("estufas");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const category = categories.find((c) => c.id === activeId)!;

  useEffect(() => {
    const onSelect = (e: Event) => setActiveId((e as CustomEvent<CategoryId>).detail);
    window.addEventListener(CATALOG_EVENT, onSelect);
    return () => window.removeEventListener(CATALOG_EVENT, onSelect);
  }, []);

  return (
    <section id="productos" className="relative bg-industrial-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          script="Catálogo"
          title={
            <>
              Nuestros <span className="text-fire">productos</span>
            </>
          }
          intro="Elige la línea que te interesa. ¿No ves la pieza que buscas? Escríbenos: si se puede moldear, la podemos fundir."
        />

        <div
          className="mt-12 grid grid-cols-3 gap-1 rounded-2xl border border-industrial-800 bg-industrial-900 p-1.5 sm:inline-flex sm:gap-2 sm:rounded-full"
          role="tablist"
          aria-label="Categorías del catálogo"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === activeId}
              onClick={() => setActiveId(c.id)}
              className={`relative rounded-xl px-2 py-3 font-display text-[10px] leading-tight font-extrabold tracking-wider uppercase transition-colors sm:rounded-full sm:px-7 sm:text-xs ${
                c.id === activeId ? "text-white" : "text-industrial-300 hover:text-white"
              }`}
            >
              {c.id === activeId && (
                <motion.span
                  layoutId="catalog-pill"
                  className="absolute inset-0 rounded-xl bg-fire shadow-lg shadow-fire/40 sm:rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative flex flex-col items-center gap-0.5 sm:flex-row sm:gap-1.5">
                <span className="opacity-70 sm:opacity-100">{c.number}</span>
                <span className="hidden sm:inline">·</span>
                <span>{c.script}</span>
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.6fr]"
            role="tabpanel"
          >
            <div>
              <h3 className="font-display text-3xl leading-tight font-black text-white sm:text-4xl">{category.title}</h3>
              <p className="mt-5 leading-relaxed text-industrial-300">{category.description}</p>
              <ul className="mt-8 space-y-4 text-industrial-100">
                {category.items.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
              {category.note && (
                <div className="mt-8 flex gap-4 rounded-2xl border border-fire/40 bg-fire/10 p-5">
                  <Info className="h-6 w-6 shrink-0 text-fire" />
                  <p className="text-sm leading-relaxed text-industrial-100">{category.note}</p>
                </div>
              )}
              <a
                href={siteConfig.whatsappUrl(`Hola, quisiera cotizar productos de la línea: ${category.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-fire px-7 py-4 font-display text-xs font-extrabold tracking-wider text-white uppercase shadow-xl shadow-fire/30 transition hover:bg-fire-hover"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Cotizar esta línea
              </a>
            </div>

            <div>
              {category.id === "industrial" && (
                <div className="mb-4 grid gap-4 sm:grid-cols-3">
                  {industrialHighlights.map(({ icon: Icon, title, text }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="rounded-2xl border border-industrial-800 bg-industrial-900 p-5"
                    >
                      <Icon className="h-8 w-8 text-fire" />
                      <p className="mt-3 font-display text-sm font-black text-white uppercase">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-industrial-300">{text}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                {category.photos.map((photo, i) => (
                  <motion.button
                    key={photo.src}
                    type="button"
                    onClick={() => setLightbox(i)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    className={`group relative overflow-hidden rounded-xl border border-industrial-800 bg-industrial-900 text-left ${
                      i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"
                    }`}
                    aria-label={`Ampliar foto: ${photo.caption ?? photo.alt}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={i === 0 ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 50vw, 20vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-industrial-950/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                    <Expand className="absolute top-3 right-3 h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                    {photo.caption && (
                      <span className="absolute inset-x-0 bottom-0 p-3 font-display text-[11px] leading-tight font-extrabold tracking-wide text-white uppercase sm:text-xs">
                        {photo.caption}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox photos={category.photos} index={lightbox} onChange={setLightbox} />
    </section>
  );
};
