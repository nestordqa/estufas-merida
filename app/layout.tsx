import type { Metadata, Viewport } from "next";
import { Montserrat, Mr_Dafoe, Open_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/catalog";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

// La caligrafía naranja del post de Instagram
const mrDafoe = Mr_Dafoe({
  variable: "--font-mr-dafoe",
  weight: "400",
  subsets: ["latin"],
});

const title = `${siteConfig.name} | Fundición de hierro y aluminio en Mérida, Venezuela`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "fundición Mérida",
    "fundición de metales Venezuela",
    "fundición de hierro",
    "fundición de aluminio",
    "estufas a leña Mérida",
    "puertas para estufa a leña",
    "planchas de hierro para fogón",
    "discos de hierro fundido",
    "mancuernas de hierro Venezuela",
    "masas para trapiche",
    "piñones y engranajes",
    "repuestos industriales Mérida",
    "Estufas Mérida",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#negocio`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logos/logo.PNG`,
  image: `${siteConfig.url}/images/fundicion/fundicion-5.jpeg`,
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
  areaServed: "VE",
  sameAs: [siteConfig.instagram.url],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Productos de fundición",
    itemListElement: categories.map((c) => ({
      "@type": "OfferCatalog",
      name: c.title,
      itemListElement: c.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name: item },
      })),
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable} ${mrDafoe.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
