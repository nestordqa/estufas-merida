const whatsappNumber = "584147140722";

export const siteConfig = {
  name: "Estufas Mérida",
  rif: "J-40681138-6",
  tagline: "Fundición de hierro y aluminio",
  description:
    "Fundición de metales en Mérida, Venezuela. Fabricamos piezas en hierro y aluminio de alta resistencia: estufas a leña y sus componentes, discos y mancuernas de hierro fundido, masas para trapiches, piñones y piezas industriales sobre medida.",
  // TODO: confirmar el dominio definitivo (se usa para SEO, sitemap y Open Graph).
  url: "https://estufasmerida.com",

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
    { days: "Lunes a viernes", time: "8:00 a. m. – 5:00 p. m." },
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
