import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Process from "../components/Process";
import FAQ, { faqItems } from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import About from "@/components/About";

export default function HomeContent() {
  
  return (
    <>
      <Header />
      <main>
        <SeoJsonLd faq={faqItems.map((x) => ({ question: x.q, answer: x.a }))} />
        <Hero />
        <Services />
        
        <About />
        <Process variant="soft" />
        <FAQ variant="tight" />
        <Contact variant="soft" />
      </main>
      <Footer />
    </>
  );
} 
