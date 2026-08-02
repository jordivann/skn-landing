import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Process from "../components/Process";
import FAQ, { faqItems } from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import About from "@/components/About";
import MotionSection from "@/components/MotionSection";

export default function HomeContent() {
  return (
    <>
      <Header />

      <main>
        <SeoJsonLd faq={faqItems.map((x) => ({ question: x.q, answer: x.a }))} />

        <Hero />

        <MotionSection variant="fadeUp" once={false}>
          <Services />
        </MotionSection>

        <MotionSection variant="slideRight" delay={0.08} once={false}>
          <About />
        </MotionSection>

        <MotionSection variant="slideLeft" delay={0.08}>
          <Process variant="soft" />
        </MotionSection>

        <MotionSection variant="softReveal" delay={0.06}>
          <FAQ variant="tight" />
        </MotionSection>

        <MotionSection variant="scale" delay={0.08} once={false}>
          <Contact variant="soft" />
        </MotionSection>
      </main>

      <Footer />
    </>
  );
}