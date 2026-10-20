// Fuente única del contenido del sitio: para agregar o cambiar productos y
// fotos basta con editar este archivo (las imágenes van en public/images).

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type CategoryId = "estufas" | "fitness" | "industrial";

export type Category = {
  id: CategoryId;
  number: string;
  script: string;
  title: string;
  short: string;
  description: string;
  note?: string;
  items: string[];
  cover: Photo;
  photos: Photo[];
};

const img = (
  folder: string,
  file: string,
  width: number,
  height: number,
  alt: string,
  caption?: string,
): Photo => ({ src: `/images/${folder}/${file}`, width, height, alt, caption });

export const fundicion = {
  colada: img("fundicion", "fundicion-1.jpeg", 1980, 3520, "Hierro fundido saliendo del horno de fundición", "Sangrado del horno"),
  molde: img("fundicion", "fundicion-2.jpeg", 1980, 3520, "Fundidor vertiendo metal líquido en un molde de arena", "Colado en molde de arena"),
  cuchara: img("fundicion", "fundicion-3.jpeg", 2062, 3666, "Cuchara de colada vertiendo hierro al rojo vivo", "La cuchara de colada"),
  equipo: img("fundicion", "fundicion-4.jpeg", 2062, 3666, "Equipo de Estufas Mérida trabajando en el taller de fundición", "Nuestro equipo en el taller"),
  vertido: img("fundicion", "fundicion-5.jpeg", 2750, 3666, "Metal fundido vertido sobre cajas de moldeo", "Llenado de las cajas de moldeo"),
};

export const categories: Category[] = [
  {
    id: "estufas",
    number: "01",
    script: "Para el hogar",
    title: "Estufas a leña y partes fundidas",
    short: "Puertas, placas, parrillas, hornos y todas las piezas para armar tu estufa a leña.",
    description:
      "Fabricamos en hierro y aluminio todos los componentes de una estufa a leña tradicional: piezas resistentes al fuego directo, con el acabado y el relieve que distinguen a una estufa hecha en Mérida.",
    note:
      "Proveemos todas las piezas fundidas para que tu constructor arme la estufa en ladrillo: tú eliges el diseño y nosotros ponemos el metal.",
    items: [
      "Placas y planchas de hierro (lisas o con aros)",
      "Puertas de hogar, horno y cenicero en aluminio o hierro",
      "Parrillas de hierro fundido",
      "Hornos completos con puerta",
      "Salidas de humo y reguladores de tiro",
      "Puertas personalizadas con el nombre de tu casa o posada",
    ],
    cover: img("productos", "productos-1.jpeg", 828, 1472, "Juego completo de piezas fundidas para estufa a leña"),
    photos: [
      img("productos", "productos-1.jpeg", 828, 1472, "Juego completo de piezas fundidas para estufa a leña", ""),
      img("productos", "productos-4.jpeg", 770, 692, "Puerta de hogar en aluminio con relieve Estufas Mérida", ""),
      img("productos", "productos-6.jpeg", 1080, 973, "Puerta de horno en aluminio fundido", ""),
      img("productos", "productos-7.jpeg", 1080, 1004, "Horno metálico con puerta de aluminio fundido", ""),
      img("productos", "productos-3.jpeg", 1280, 960, "Puerta de cenicero en aluminio fundido", ""),
      img("productos", "productos-2.jpeg", 1024, 609, "Parrilla de hierro fundido para estufa", ""),
      img("productos", "productos-5.jpeg", 1007, 1080, "Plancha lisa de hierro fundido", ""),
      img("productos", "productos-10.jpeg", 1060, 795, "Plancha de hierro con aros para fogón", ""),
      img("productos", "productos-8.jpeg", 1080, 577, "Regulador de tiro en aluminio fundido", ""),
    ],
  },
  {
    id: "fitness",
    number: "02",
    script: "Línea fitness",
    title: "Discos, mancuernas y pesas",
    short: "Equipamiento de hierro fundido para gimnasios y entrenamiento en casa.",
    description:
      "Hierro fundido macizo para entrenar sin miedo: discos, mancuernas y pesas rusas con pesos exactos y un acabado pensado para el uso intensivo de un gimnasio.",
    items: [
      "Discos de peso en diferentes kilogramos",
      "Mancuernas hexagonales",
      "Pesas rusas (kettlebells)",
      "Juegos completos para gimnasios",
      "Accesorios pesados a pedido",
    ],
    cover: img("productos", "productos-12.jpeg", 852, 1280, "Juego de mancuernas hexagonales y pesa rusa de hierro fundido"),
    photos: [
      img("productos", "productos-13.jpeg", 846, 1080, "Discos de peso de hierro fundido de 2,5, 5 y 10 kg", ""),
      img("productos", "productos-11.jpeg", 950, 1080, "Mancuerna hexagonal de hierro fundido de 20 kg", ""),
      img("productos", "productos-12.jpeg", 852, 1280, "Juego de mancuernas hexagonales de varios pesos", ""),
      img("productos", "productos-9.jpeg", 679, 631, "Pesas rusas de hierro fundido de 8 a 20 kg", ""),
    ],
  },
  {
    id: "industrial",
    number: "03",
    script: "Industria y agro",
    title: "Piezas industriales y metalmecánica",
    short: "Masas para trapiches, piñones, engranajes y piezas especiales sobre molde.",
    description:
      "Atendemos trapiches, ingenios azucareros, talleres mecánicos y la agroindustria. Reproducimos la pieza que necesitas a partir de un plano, un diseño o la pieza original desgastada.",
    note:
      "¿Tienes una pieza rota o descontinuada? Tráenos la muestra: hacemos el modelo, preparamos el molde y la fundimos de nuevo.",
    items: [
      "Masas para trapiches",
      "Piñones y engranajes",
      "Repuestos para ingenios y talleres",
      "Piezas especiales sobre diseño, plano o muestra",
      "Fundición en hierro y en aluminio",
    ],
    cover: fundicion.cuchara,
    photos: [fundicion.molde, fundicion.vertido, fundicion.colada],
  },
];

export const projects: Photo[] = [
  img("proyectos", "proyecto-6.PNG", 1080, 1350, "Cocina a leña de ladrillo con puertas de aluminio Estufas Mérida", ""),
  img("proyectos", "proyecto-1.jpeg", 2466, 3288, "Estufa de ladrillo con puertas personalizadas San Cayetano", ""),
  img("proyectos", "proyecto-7.jpeg", 1280, 960, "Terraza con hornos de leña y chimeneas de ladrillo frente a la montaña", ""),
  img("proyectos", "proyecto-2.jpeg", 1980, 3520, "Horno de leña de ladrillo con puerta de hierro fundido", ""),
  img("proyectos", "proyecto-5.PNG", 1080, 1350, "Fogón de ladrillo con fuego encendido y puertas de aluminio", ""),
  img("proyectos", "proyecto-4.jpeg", 3120, 4160, "Chimeneas y hornos de ladrillo con vista a las montañas de Mérida", ""),
];

export const processSteps = [
  {
    title: "Modelo y molde",
    text: "Partimos de tu plano, diseño o pieza de muestra. Con ella preparamos el molde en arena dentro de las cajas de moldeo.",
    photo: fundicion.vertido,
  },
  {
    title: "Fusión",
    text: "El hierro y el aluminio se funden en nuestro horno hasta quedar completamente líquidos y listos para colar.",
    photo: fundicion.colada,
  },
  {
    title: "Colado",
    text: "Con la cuchara de colada vertemos el metal al rojo vivo dentro de cada molde. Aquí la experiencia del fundidor lo es todo.",
    photo: fundicion.cuchara,
  },
  {
    title: "Desmoldeo y acabado",
    text: "La pieza se enfría, se desmolda, se limpia y se le da el acabado final: lista para durar generaciones.",
    photo: fundicion.molde,
  },
];
