import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { QuickAccess } from "@/components/sections/QuickAccess";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Catalog } from "@/components/sections/Catalog";
import { Projects } from "@/components/sections/Projects";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <QuickAccess />
        <Catalog />
        <About />
        <Process />
        <Projects />
        <CtaBand />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
