"use client";

import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import styles from "./About.module.css";
import LogoMark from "./LogoMark";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const read = () => {
      const t = document.documentElement.getAttribute("data-theme");
      setTheme(t === "dark" ? "dark" : "light");
    };
    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

export default function About() {
  const theme = useTheme();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Light → imagen oscura, Dark → imagen clara (como pediste)
  const bgImage =
    theme === "light" ? "/hero-alter-dark-2.jpg" : "/hero-alter-light-6.jpg";

  useEffect(() => {
    const handleScroll = () => {
      const el = parallaxRef.current;
      const section = sectionRef.current;
      if (!el || !section) return;

      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewH) return;

      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * 120; // ±60px
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className={styles.wrapper}>
      {/* Parallax background */}
      <div className={styles.parallaxOuter} aria-hidden="true">
        <div
          ref={parallaxRef}
          className={styles.parallaxInner}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Overlay direccional para contraste */}
        <div className={styles.parallaxOverlay} />
        {/* Viñeta perimetral */}
        <div className={styles.parallaxVignette} />
      </div>

      <Section
        id="about"
        title="Quiénes somos"
        subtitle="Experiencia real, ejecución prolija y foco en continuidad operativa."
        variant="invert"
        surfaceClassName={styles.aboutSurface}
      >
        <div className={styles.layout}>
          {/* Brand */}
          <aside className={styles.brandPane} aria-label="Marca SKN IT">
            <div className={styles.brandInner}>
              <span className={styles.brandRule} aria-hidden="true" />
              <LogoMark size="lg" opposite />
            </div>
          </aside>

          {/* Copy */}
          <div className={styles.copy}>
            <p className={styles.lead}>
              Somos una empresa con más de <strong>15 años</strong> en el rubro
              informático, dedicada a la provisión de productos y servicios de
              telecomunicaciones e infraestructura tecnológica.
            </p>

            <p className={styles.p}>
              Diseñamos, implementamos y mantenemos redes de todo tipo. Gracias
              a nuestro equipo de profesionales y experiencia, aseguramos{" "}
              <strong>alta calidad</strong> en instalaciones y mantenimientos.
            </p>

            <p className={styles.p}>
              Nuestra visión es ser el{" "}
              <strong>socio y asesor tecnológico</strong> que nuestros clientes
              desean, para garantizar un éxito duradero y mejora continua en
              cada organización.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}