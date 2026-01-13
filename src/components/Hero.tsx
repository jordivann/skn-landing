"use client";

import { useMemo, useState } from "react";
import styles from "./Hero.module.css";
import HeroCarousel from "./HeroCarousel";
import BrandMark from "./BrandMark";
import { site } from "../lib/site";

export type SlideTone = "violet" | "cyan" | "green" | "neutral";

export type Slide = {
  id: "intro" | "security" | "services" | "why" | "contact";
  src: string;
  alt: string;
  kicker?: string;
  title: string;
  description: string;
  tone?: SlideTone;

  // CTA principal por slide
  cta: {
    label: string;
    href: string;
  };
};

export default function Hero() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "intro",
        src: "/hero-1.jpg",
        alt: "SKN IT - escritorio tecnológico",
        kicker: "",
        title: "Soluciones informáticas con estándares profesionales",
        description:
          "Soporte IT, redes y seguridad para que tu operación sea estable, rápida y ordenada. Diagnóstico claro, plan concreto y ejecución prolija.",
        tone: "neutral",
        cta: {
          label: "Solicitar diagnóstico",
          href: site.contact.whatsapp,
        },
      },
      {
        id: "security",
        src: "/hero-2.webp",
        alt: "Seguridad informática y protección de datos",
        kicker: "Seguridad",
        title: "Cuidamos la seguridad de tu empresa",
        description:
          "Hardening, accesos, backups y recuperación. Reducimos riesgos con prácticas reales y documentación.",
        tone: "cyan",
        cta: {
          label: "Evaluar seguridad",
          href: "#contact",
        },
      },
      {
        id: "services",
        src: "/hero-3.jpg",
        alt: "Consultoría e implementación IT",
        kicker: "Consultoría",
        title: "Software, hardware y redes sin improvisación",
        description:
          "Diseño e implementación de infraestructura, optimización y soporte. Menos caídas, mejor rendimiento, más control.",
        tone: "violet",
        cta: {
          label: "Ver servicios",
          href: "#services",
        },
      },
      {
        id: "why",
        src: "/hero-4.jpg",
        alt: "Equipo trabajando en tecnología",
        kicker: "Por qué SKN",
        title: "Orden, trazabilidad y respuesta rápida",
        description:
          "Metodología, checklist y comunicación clara. Resolver bien, documentar, y dejarte una base sólida para crecer.",
        tone: "green",
        cta: {
          label: "Conocer el proceso",
          href: "#process",
        },
      },
      {
        id: "contact",
        src: "/hero-5.jpg",
        alt: "Contacto y soporte",
        kicker: "Contacto",
        title: "Hablemos. Te respondemos con claridad",
        description:
          "Contanos tu situación y te decimos el camino más directo. Sin vueltas, sin humo.",
        tone: "neutral",
        cta: {
          label: "Contactar ahora",
          href: "#contact",
        },
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const active = slides[index];

  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-tone={active.tone ?? "neutral"}>
      {/* Imagen protagonista */}
      <div className={styles.mediaBg} aria-hidden="true">
        <img
          key={active.src}
          src={active.src}
          alt=""
          className={styles.bgImg}
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Overlays premium */}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.gridFx} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            {/* Intro: BrandMark visible */}
            {active.id === "intro" && (
              <div className={styles.brandRow} aria-hidden="true">
                <BrandMark size="md" variant="trace" />
              </div>
            )}

            {active.kicker && <p className={styles.kicker}>{active.kicker}</p>}

            <h1 id="hero-title" className={styles.h1}>
              {active.title}
            </h1>

            <p className={styles.lead}>{active.description}</p>

            {/* CTA: UNO (y distinto por slide) */}
            <div className={styles.ctaRow}>
              <a className={styles.ctaPrimary} href={active.cta.href}>
                {active.cta.label}
              </a>

              {/* Secondary discreto (no botón) para no ensuciar */}
              {active.id !== "services" && (
                <a className={styles.ctaLink} href="#services">
                  Ver servicios
                </a>
              )}
            </div>

            {/* Garantías: NO clickeables */}
            <ul className={styles.chips} aria-label="Garantías del servicio">
              <li className={styles.chip}>SLA y trazabilidad</li>
              <li className={styles.chip}>Seguridad por diseño</li>
              <li className={styles.chip}>Infraestructura escalable</li>
            </ul>

            {/* Controles del carrusel (minimal) */}
            <div className={styles.carouselDock}>
              <HeroCarousel
                slides={slides}
                index={index}
                onIndexChange={setIndex}
                autoplayMs={5200}
              />
            </div>
          </div>

          {/* Columna “vacía” intencional para dejar respirar la imagen (desktop) */}
          <div className={styles.spacer} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
