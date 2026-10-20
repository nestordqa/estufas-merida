import type { Metadata, Viewport } from "next";
import { Bree_Serif, Montserrat, Open_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { structuredData } from "@/lib/structured-data";
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

// Fuente de acento naranja
const breeSerif = Bree_Serif({
  variable: "--font-bree-serif",
  weight: "400",
  subsets: ["latin"],
});

// ≤60 caracteres para que Google no lo corte en los resultados
const title = "Fundición de Hierro y Aluminio en Mérida | Estufas Mérida";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Manufactura y metalurgia",
  keywords: [
    "fundición Mérida",
    "fundición en Venezuela",
    "fundición de hierro",
    "fundición de aluminio",
    "hierro fundido",
    "estufas a leña Mérida",
    "piezas para estufa a leña",
    "puertas de aluminio para estufa",
    "planchas de hierro para fogón",
    "discos de hierro fundido",
    "mancuernas de hierro Venezuela",
    "pesas rusas hierro fundido",
    "masas para trapiche",
    "piñones y engranajes",
    "repuestos industriales Mérida",
    "Estufas Mérida",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.seoDescription,
    // La imagen sale de app/opengraph-image.jpg (+ .alt.txt), convención de archivos de Next.
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Código de verificación de Google Search Console: se define en Netlify como
  // variable de entorno GOOGLE_SITE_VERIFICATION (no hace falta tocar el código).
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "geo.region": "VE-L",
    "geo.placename": "Mérida, Venezuela",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-VE" className={`${montserrat.variable} ${openSans.variable} ${breeSerif.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
