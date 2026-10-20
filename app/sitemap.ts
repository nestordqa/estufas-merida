import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categories, fundicion, projects } from "@/data/catalog";

// Incluye las fotos para que aparezcan en Google Imágenes.
export default function sitemap(): MetadataRoute.Sitemap {
  const photos = [
    ...Object.values(fundicion),
    ...categories.flatMap((c) => c.photos),
    ...projects,
  ];
  const images = [...new Set(photos.map((p) => `${siteConfig.url}${p.src}`))];

  return [
    {
      url: siteConfig.url,
      lastModified: siteConfig.lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
      images,
    },
  ];
}
