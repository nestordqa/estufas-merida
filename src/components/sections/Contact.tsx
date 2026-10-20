"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

const inputClass =
  "w-full rounded-xl border border-industrial-700 bg-industrial-950 px-4 py-3.5 text-white placeholder:text-industrial-500 transition focus:border-fire focus:ring-2 focus:ring-fire/30 focus:outline-none";
const labelClass = "mb-2 block font-display text-[11px] font-extrabold tracking-[0.18em] text-industrial-300 uppercase";

const infoItems = [
  {
    icon: MapPin,
    title: "Taller",
    lines: [siteConfig.address.full],
    href: siteConfig.mapsUrl,
    cta: "Cómo llegar",
  },
  {
    icon: Clock,
    title: "Horario",
    lines: siteConfig.hours.map((h) => `${h.days}: ${h.time}`),
  },
  {
    icon: Mail,
    title: "Correo",
    lines: [siteConfig.email],
    href: `mailto:${siteConfig.email}`,
    cta: "Escribir correo",
  },
];

export const Contact = () => {
  const [sent, setSent] = useState(false);

  // No hay backend: el formulario arma el mensaje y lo abre en WhatsApp,
  // que es por donde el taller atiende las cotizaciones.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = [
      "Hola, Estufas Mérida. Quisiera solicitar una cotización.",
      "",
      `Nombre: ${data.get("name")}`,
      `Correo: ${data.get("email")}`,
      `Teléfono: ${data.get("phone")}`,
      `Me interesa: ${data.get("category")}`,
      "",
      `${data.get("message")}`,
    ].join("\n");
    window.open(siteConfig.whatsappUrl(message), "_blank", "noopener,noreferrer");
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-industrial-950 py-24 sm:py-32">
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-fire/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
        <div>
          <SectionHeading
            script="Hablemos"
            title={
              <>
                Contacto y <span className="text-fire">cotizaciones</span>
              </>
            }
            intro="Cuéntanos qué necesitas y te respondemos lo antes posible. La vía más rápida es WhatsApp."
          />

          <div className="mt-10 space-y-4">
            {infoItems.map(({ icon: Icon, title, lines, href, cta }, i) => (
              <Reveal key={title} delay={i * 0.08} x={-30} y={0}>
                <div className="flex gap-5 rounded-2xl border border-industrial-800 bg-industrial-900 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fire/15">
                    <Icon className="h-6 w-6 text-fire" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-black tracking-wider text-white uppercase">{title}</p>
                    {lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-industrial-300">
                        {line}
                      </p>
                    ))}
                    {href && (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm font-semibold text-fire hover:underline"
                      >
                        {cta} →
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href={siteConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl bg-whatsapp p-5 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-whatsapp/30"
            >
              <WhatsAppIcon className="h-9 w-9" />
              <span>
                <span className="block font-display text-xs font-black tracking-wider uppercase">WhatsApp</span>
                <span className="text-sm font-semibold">{siteConfig.whatsappDisplay}</span>
              </span>
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl bg-linear-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-5 text-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#fd1d1d]/30"
            >
              <InstagramIcon className="h-9 w-9" />
              <span>
                <span className="block font-display text-xs font-black tracking-wider uppercase">Instagram</span>
                <span className="text-sm font-semibold">@{siteConfig.instagram.handle}</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={60}>
          <div className="relative rounded-3xl border border-industrial-800 bg-industrial-900 p-6 shadow-2xl shadow-black/50 sm:p-10">
            <div className="absolute -top-px left-10 h-1 w-32 rounded-full bg-fire shadow-[0_0_20px_var(--color-fire)]" />
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                  >
                    <CheckCircle2 className="h-20 w-20 text-fire" />
                  </motion.div>
                  <p className="mt-6 font-script text-5xl text-fire">¡Gracias!</p>
                  <p className="mt-2 max-w-sm text-industrial-300">
                    Abrimos WhatsApp con tu mensaje listo. Solo tienes que pulsar enviar y te responderemos pronto.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-8 text-sm font-semibold text-white underline decoration-fire underline-offset-4"
                  >
                    Enviar otra consulta
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <p className="font-display text-2xl font-black text-white sm:col-span-2">Solicita tu cotización</p>
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className={labelClass}>
                      Nombre
                    </label>
                    <input id="name" name="name" required autoComplete="name" placeholder="Tu nombre" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Correo
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="tucorreo@ejemplo.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="58 414-7140722"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="category" className={labelClass}>
                      Categoría de interés
                    </label>
                    <select id="category" name="category" required className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="Otro">Otro / no estoy seguro</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Cuéntanos qué pieza necesitas, medidas, cantidad…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-fire px-8 py-4 font-display text-sm font-extrabold tracking-wider text-industrial-950 uppercase shadow-xl shadow-fire/30 transition hover:bg-fire-hover sm:col-span-2"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    Enviar por WhatsApp
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
