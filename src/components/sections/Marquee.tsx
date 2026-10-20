import { Flame } from "lucide-react";

const words = ["Hierro fundido", "Aluminio", "Estufas a leña", "Línea fitness", "Trapiches", "Piñones", "Piezas a medida"];

function Band({ reverse, className }: { reverse?: boolean; className?: string }) {
  const row = [...words, ...words];
  return (
    <div className={`flex overflow-hidden py-4 ${className ?? ""}`}>
      <div className={`flex shrink-0 items-center gap-8 pr-8 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[...row, ...row].map((word, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl font-black whitespace-nowrap uppercase sm:text-3xl">
            {word}
            <Flame className="h-6 w-6 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Dos bandas cruzadas en movimiento, como cinta de obra. */
export const Marquee = () => (
  <section className="relative z-10 -my-10 overflow-hidden py-16" aria-label="Lo que fundimos">
    <Band className="relative z-10 -rotate-2 bg-fire text-industrial-950 shadow-2xl shadow-fire/20" />
    <Band reverse className="-mt-12 rotate-2 border-y border-industrial-700 bg-industrial-900 text-industrial-500" />
  </section>
);
