import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Projects />
        <Services />
        <Pricing />
        <Process />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
