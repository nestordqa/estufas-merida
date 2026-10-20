import Image from "next/image";
import { navLinks, siteConfig } from "@/config/site";
import { categories } from "@/data/catalog";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-industrial-800 bg-industrial-950 pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logos/logo-claro.png"
              alt="Logo de Estufas Mérida"
              width={3346}
              height={2587}
              sizes="96px"
              className="h-16 w-auto"
            />
            <div>
              <p className="font-display text-xl font-black tracking-wider text-white">ESTUFAS MÉRIDA</p>
              <p className="font-script text-sm text-fire">{siteConfig.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-industrial-300">
            Fundición de metales en Mérida, Venezuela. Piezas en hierro y aluminio de alta resistencia para el hogar, el
            gimnasio y la industria.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-industrial-800 p-3 text-white transition hover:border-fire hover:bg-fire"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-industrial-800 p-3 text-white transition hover:border-whatsapp hover:bg-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-extrabold tracking-[0.2em] text-fire">Navegación</h3>
          <ul className="mt-5 space-y-3 text-sm text-industrial-300">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-extrabold tracking-[0.2em] text-fire">Productos</h3>
          <ul className="mt-5 space-y-3 text-sm text-industrial-300">
            {categories.map((c) => (
              <li key={c.id}>
                <a href="#productos" className="transition hover:text-white">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-industrial-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-industrial-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © <CurrentYear /> {siteConfig.name} · RIF {siteConfig.rif}
          </p>
          <p>Hecho con fuego en Mérida, Venezuela</p>
        </div>
      </div>
    </footer>
  );
};
