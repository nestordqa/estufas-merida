"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/catalog";

type LightboxProps = {
  photos: Photo[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function Lightbox({ photos, index, onChange }: LightboxProps) {
  const open = index !== null;
  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + photos.length) % photos.length);
    },
    [index, onChange, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onChange]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
        >
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-fire"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-3 z-10 hidden rounded-full bg-white/10 p-3 text-white transition hover:bg-fire sm:block"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-3 z-10 hidden rounded-full bg-white/10 p-3 text-white transition hover:bg-fire sm:block"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.figure
              key={photo.src}
              className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              drag={photos.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) go(1);
                if (info.offset.x > 80) go(-1);
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl shadow-black"
                draggable={false}
              />
              {photo.caption && (
                <figcaption className="mt-4 text-center">
                  <span className="font-script text-lg text-fire">{photo.caption}</span>
                </figcaption>
              )}
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
