"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Hero.module.css";
import HeroCarousel from "./HeroCarousel";
import { site } from "../lib/site";
import LogoMark from "./LogoMark";
import { useTheme } from "../hooks/useTheme";

export type SlideTone = "violet" | "cyan" | "green" | "neutral";

type SlideBase = {
  id: "intro" | "security" | "services" | "why" | "contact";
  image: { light: string; dark: string };
  alt: string;
  kicker?: string;
  title: string;
  description: string;
  tone?: SlideTone;
  cta: { label: string; href: string };
};

export type Slide = {
  id: "intro" | "security" | "services" | "why" | "contact";
  src: string;
  alt: string;
  kicker?: string;
  title: string;
  description: string;
  tone?: SlideTone;
  cta: { label: string; href: string };
};

/* Duración del crossfade en ms — debe coincidir con imgFadeIn en CSS */
const CROSSFADE_MS = 650;

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const autoplayMs = 5200;

  /* Crossfade: guardamos la imagen anterior para que permanezca debajo */
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const crossfadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const slidesBase: SlideBase[] = useMemo(() => [
    {
      id: "intro",
      image: { dark: "/hero-alter-dark-1.jpg", light: "/hero-alter-1.jpg" },
      alt: "SKN IT",
      kicker: "Telecomunicaciones e informática",
      title: "Soluciones tecnológicas a tu alcance",
      description:
        "Soporte IT, redes y seguridad para que tu operación sea estable, rápida y ordenada. Diagnóstico claro, plan concreto y ejecución prolija.",
      tone: "neutral",
      cta: { label: "Contactanos", href: site.contact.whatsapp },
    },
    {
      id: "security",
      image: { dark: "/hero-alter-security-dark-1.jpg", light: "/hero-alter-security-2.jpg" },
      alt: "Seguridad informática y protección de datos",
      kicker: "Seguridad",
      title: "Cuidamos la seguridad de tu empresa",
      description:
        "Hardening, accesos, backups y recuperación. Reducimos riesgos con prácticas reales y documentación.",
      tone: "cyan",
      cta: { label: "Evaluar seguridad", href: "#contact" },
    },
    {
      id: "services",
      image: { dark: "/hero-alter-dark-2.jpg", light: "/hero-alter-light-hard1.jpg" },
      alt: "Consultoría e implementación IT",
      kicker: "Consultoría",
      title: "Software, hardware y redes sin improvisación",
      description:
        "Diseño e implementación de infraestructura, optimización y soporte. Menos caídas, mejor rendimiento, más control.",
      tone: "violet",
      cta: { label: "Ver servicios", href: "#services" },
    },
    {
      id: "why",
      image: { dark: "/hero-alter-dark-3.jpg", light: "/hero-alter-light-5.jpg" },
      alt: "Equipo trabajando en tecnología",
      kicker: "Por qué SKN",
      title: "Orden, trazabilidad y respuesta rápida",
      description:
        "Metodología, checklist y comunicación clara. Resolver bien, documentar y dejarte una base sólida para crecer.",
      tone: "green",
      cta: { label: "Conocer el proceso", href: "#process" },
    },
    {
      id: "contact",
      image: { dark: "/hero-2.jpg", light: "/hero-redes-1.jpg" },
      alt: "Contacto y soporte",
      kicker: "Contacto",
      title: "Hablemos. Te respondemos con claridad",
      description:
        "Contanos tu situación y te decimos el camino más directo. Sin vueltas, sin humo.",
      tone: "neutral",
      cta: { label: "Contactar ahora", href: "#contact" },
    },
  ], []);

  const resolvedTheme = mounted ? theme : "dark";

  const slides: Slide[] = useMemo(() => slidesBase.map((slide) => ({
    id: slide.id,
    src: resolvedTheme === "dark" ? slide.image.dark : slide.image.light,
    alt: slide.alt,
    kicker: slide.kicker,
    title: slide.title,
    description: slide.description,
    tone: slide.tone,
    cta: slide.cta,
  })), [slidesBase, resolvedTheme]);

  const safeIndex = index >= 0 && index < slides.length ? index : 0;
  const active = slides[safeIndex];

  /* Al cambiar de slide, guardamos el src actual como "imagen previa"
   * y la limpiamos después del crossfade para no acumularla en el DOM. */
  const handleIndexChange = (nextIndex: number) => {
    if (nextIndex === safeIndex) return;
    const currentSrc = slides[safeIndex]?.src ?? null;
    setPrevSrc(currentSrc);
    setIndex(nextIndex);

    if (crossfadeTimer.current) clearTimeout(crossfadeTimer.current);
    crossfadeTimer.current = setTimeout(() => {
      setPrevSrc(null);
    }, CROSSFADE_MS + 50);
  };

  useEffect(() => {
    return () => {
      if (crossfadeTimer.current) clearTimeout(crossfadeTimer.current);
    };
  }, []);

  return (
    <section
      className={`${styles.hero} ${styles.containerBrand}`}
      aria-labelledby="hero-title"
      data-tone={active.tone ?? "neutral"}
      data-theme={resolvedTheme}
      style={{ "--heroAutoplayMs": `${autoplayMs}ms` } as React.CSSProperties}
    >
      {/* ── Imagen protagonista con crossfade ── */}
      <div className={styles.mediaBg} aria-hidden="true">
        {/* Imagen previa: permanece visible (sin animación) mientras la nueva entra */}
        {prevSrc && (
          <img
            src={prevSrc}
            alt=""
            className={styles.bgImgPrev}
            width={1920}
            height={1080}
            decoding="async"
            aria-hidden="true"
          />
        )}
        {/* Imagen activa: entra con fade-in desde CSS */}
        <img
          key={`${resolvedTheme}-${active.id}-${active.src}`}
          src={active.src}
          alt=""
          className={styles.bgImg}
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Firma visual */}
      <div className={styles.brandRow} aria-hidden="true">
        <LogoMark size="md" variant="trace" />
      </div>

      {/* Capas visuales */}
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.gridFx} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      {/* Contenido */}
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            {active.kicker && (
              <p className={styles.kicker} aria-label={`Categoría: ${active.kicker}`}>
                {active.kicker}
              </p>
            )}

            <h1 id="hero-title" className={styles.h1}>
              {active.title}
            </h1>

            <p className={styles.lead}>{active.description}</p>

            <div className={styles.ctaRow}>
              <a className={styles.ctaPrimary} href={active.cta.href}>
                {active.cta.label}
              </a>

              {active.id !== "services" && (
                <a className={styles.ctaLink} href="#services">
                  Ver servicios
                </a>
              )}
            </div>

            <ul className={styles.chips} aria-label="Garantías del servicio">
              <li className={styles.chip}>SLA y trazabilidad</li>
              <li className={styles.chip}>Seguridad por diseño</li>
              <li className={styles.chip}>Infraestructura escalable</li>
            </ul>

            <div className={styles.carouselDock}>
              <HeroCarousel
                slides={slides}
                index={safeIndex}
                onIndexChange={handleIndexChange}
                autoplayMs={autoplayMs}
              />
            </div>
          </div>

          <div className={styles.spacer} aria-hidden="true" />
        </div>
      </div>

      {/* Barra de progreso global */}
      <div className={styles.heroProgress} aria-hidden="true">
        <span
          key={`${resolvedTheme}-${safeIndex}`}
          className={styles.heroProgressFill}
        />
      </div>
    </section>
  );
}