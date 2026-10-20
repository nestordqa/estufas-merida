"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function WhatsAppFloat() {
  const [bubble, setBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setBubble(true), 4500);
    const hide = setTimeout(() => setBubble(false), 14000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div className="fixed right-4 bottom-4 z-[80] flex items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {bubble && !dismissed && (
          <motion.div
            className="relative mb-2 max-w-[13rem] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm text-industrial-950 shadow-2xl"
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="absolute -top-2 -left-2 rounded-full bg-industrial-800 p-1 text-white"
              aria-label="Cerrar mensaje"
            >
              <X className="h-3 w-3" />
            </button>
            <span className="block font-script text-lg leading-none text-fire-deep">¡Hola!</span>
            ¿Necesitas una pieza? Cotiza por WhatsApp.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={siteConfig.whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-black/40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
      >
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp" />
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp [animation-delay:1.3s]" />
        <WhatsAppIcon className="relative h-8 w-8" />
      </motion.a>
    </div>
  );
}
