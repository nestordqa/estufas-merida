import { siteConfig } from "@/config/site";
import { categories, projects } from "@/data/catalog";
import { faqs } from "@/data/faq";

const url = siteConfig.url;
const ids = {
  business: `${url}/#negocio`,
  website: `${url}/#sitio`,
  webpage: `${url}/#pagina`,
  logo: `${url}/#logo`,
  faq: `${url}/#preguntas`,
};

const dayNames: Record<string, string[]> = {
  "Lunes a viernes": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  Sábados: ["Saturday"],
};

// "8:00 a. m." -> "08:00", "5:00 p. m." -> "17:00", "12:00 m." -> "12:00"
const to24h = (time: string) => {
  const [, h, m, suffix] = time.match(/(\d{1,2}):(\d{2})\s*(a|p)?/) ?? [];
  let hour = Number(h);
  if (suffix === "p" && hour < 12) hour += 12;
  return `${String(hour).padStart(2, "0")}:${m}`;
};

const openingHours = siteConfig.hours.flatMap(({ days, time }) => {
  const [opens, closes] = time.split("–").map((t) => to24h(t.trim()));
  const dayOfWeek = dayNames[days];
  return dayOfWeek ? [{ "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes }] : [];
});

/** Grafo schema.org de la página: negocio local, sitio, catálogo y preguntas frecuentes. */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Organization"],
      "@id": ids.business,
      name: siteConfig.name,
      alternateName: "Fundición Estufas Mérida",
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      url,
      logo: {
        "@type": "ImageObject",
        "@id": ids.logo,
        url: `${url}/images/logos/logo.PNG`,
        width: 3346,
        height: 2587,
        caption: siteConfig.name,
      },
      image: [
        `${url}/opengraph-image.jpg`,
        `${url}/images/fundicion/fundicion-5.jpeg`,
        `${url}/images/fundicion/fundicion-4.jpeg`,
        ...projects.slice(0, 3).map((p) => `${url}${p.src}`),
      ],
      telephone: `+${siteConfig.whatsappNumber}`,
      email: siteConfig.email,
      taxID: siteConfig.rif,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
      areaServed: [
        { "@type": "City", name: "Mérida" },
        { "@type": "State", name: "Mérida" },
        { "@type": "Country", name: "Venezuela" },
      ],
      openingHoursSpecification: openingHours,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${siteConfig.whatsappNumber}`,
        email: siteConfig.email,
        availableLanguage: ["es"],
        areaServed: "VE",
      },
      sameAs: [siteConfig.instagram.url],
      knowsAbout: [
        "Fundición de metales",
        "Fundición de hierro",
        "Fundición de aluminio",
        "Fundición en arena",
        "Estufas a leña",
        "Hierro fundido",
        "Masas para trapiche",
        "Piñones y engranajes",
        "Discos y mancuernas de hierro fundido",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Productos de fundición en hierro y aluminio",
        itemListElement: categories.map((c) => ({
          "@type": "OfferCatalog",
          name: c.title,
          description: c.description,
          itemListElement: c.items.map((item) => ({
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            areaServed: "VE",
            seller: { "@id": ids.business },
            itemOffered: {
              "@type": "Product",
              name: item,
              category: c.title,
              brand: { "@type": "Brand", name: siteConfig.name },
              manufacturer: { "@id": ids.business },
              material: c.id === "fitness" ? "Hierro fundido" : "Hierro y aluminio fundido",
            },
          })),
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": ids.website,
      url,
      name: siteConfig.name,
      description: siteConfig.seoDescription,
      inLanguage: "es-VE",
      publisher: { "@id": ids.business },
    },
    {
      "@type": "WebPage",
      "@id": ids.webpage,
      url,
      name: `${siteConfig.name} | Fundición de hierro y aluminio en Mérida, Venezuela`,
      description: siteConfig.seoDescription,
      inLanguage: "es-VE",
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.business },
      primaryImageOfPage: { "@type": "ImageObject", url: `${url}/opengraph-image.jpg`, width: 1200, height: 630 },
      dateModified: siteConfig.lastUpdated,
      hasPart: { "@id": ids.faq },
    },
    {
      "@type": "FAQPage",
      "@id": ids.faq,
      inLanguage: "es-VE",
      isPartOf: { "@id": ids.webpage },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};
