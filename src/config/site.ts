const whatsappNumber = "584147140722";

export const siteConfig = {
  name: "Estufas Mérida",
  rif: "J-40681138-6",
  tagline: "Fundición de hierro y aluminio",
  description:
    "Fundición de metales en Mérida, Venezuela. Fabricamos piezas en hierro y aluminio de alta resistencia: estufas a leña y sus componentes, discos y mancuernas de hierro fundido, masas para trapiches, piñones y piezas industriales sobre medida.",
  // Versión corta (≤160 caracteres) para el snippet de Google.
  seoDescription:
    "Fundición en Mérida, Venezuela: piezas de hierro y aluminio para estufas a leña, discos y mancuernas, masas para trapiches y piñones a medida. ¡Cotiza ya!",
  // Dominio público: canonical, sitemap, Open Graph y datos estructurados salen de aquí.
  // Se puede sobrescribir con la variable SITE_URL (p. ej. en Netlify).
  url: (process.env.SITE_URL ?? "https://estufas-merida.com").replace(/\/$/, ""),
  // Fecha de la última actualización de contenido (para el sitemap).
  lastUpdated: "2026-10-20",

  whatsappNumber,
  whatsappDisplay: "+58 414-7140722",
  whatsappUrl: (message = "Hola, quisiera solicitar un presupuesto.") =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,

  // TODO: confirmar con el dueño los siguientes datos de contacto.
  email: "estufasmeridaca@gmail.com",
  instagram: {
    handle: "estufas_merida",
    url: "https://www.instagram.com/estufas_merida/",
  },
  address: {
    street: "Mérida, Estado Mérida",
    city: "Mérida",
    region: "Mérida",
    country: "VE",
    full: "Mérida, Estado Mérida, Venezuela",
  },
  hours: [
    { days: "Lunes a viernes", time: "8:00 a. m. – 6:00 p. m." },
    { days: "Sábados", time: "8:00 a. m. – 12:00 m." },
  ],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Estufas+M%C3%A9rida+Venezuela",
};

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];
