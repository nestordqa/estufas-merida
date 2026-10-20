"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? "border-b border-white/5 bg-industrial-950/80 backdrop-blur-lg" : "bg-transparent"
        }`}
        // Sin initial: el navbar se pinta con el HTML, sin esperar al JS (LCP en móvil).
        initial={false}
        animate={{ y: hidden && !open ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="group relative z-[70] flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/images/logos/logo-claro.png"
              alt="Logo de Estufas Mérida"
              width={3346}
              height={2587}
              sizes="64px"
              className="h-11 w-auto transition-transform duration-500 group-hover:scale-110"
              preload
            />
            <span className="leading-none">
              <span className="block font-display text-base font-black tracking-wider text-white sm:text-lg">
                ESTUFAS MÉRIDA
              </span>
              <span className="font-script text-lg text-fire">Fundición</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-display text-xs font-bold tracking-[0.2em] text-industrial-100 uppercase"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-fire transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Estufas Mérida"
              className="relative z-[70] hidden rounded-full p-2.5 text-white transition hover:bg-fire sm:block"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-fire px-5 py-2.5 font-display text-xs font-extrabold tracking-wider text-industrial-950 uppercase shadow-lg shadow-fire/30 transition hover:bg-fire-hover hover:shadow-fire/50 md:flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Cotizar
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative z-[70] rounded-full p-2.5 text-white transition hover:bg-white/10 lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col justify-center overflow-hidden bg-industrial-950 px-8 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-fire/20 blur-3xl" />
            <nav className="flex flex-col gap-2" aria-label="Menú móvil">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-5xl font-black text-white uppercase transition-colors hover:text-fire"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="mt-12 flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="font-script text-4xl text-fire">¿Hablamos?</span>
              <a
                href={siteConfig.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg font-semibold text-white"
              >
                <WhatsAppIcon className="h-6 w-6 text-whatsapp" /> {siteConfig.whatsappDisplay}
              </a>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg font-semibold text-white"
              >
                <InstagramIcon className="h-6 w-6 text-fire" /> @{siteConfig.instagram.handle}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
