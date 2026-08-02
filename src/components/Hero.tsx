"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Hero.module.css";
import HeroCarousel from "./HeroCarousel";
import LogoMark from "./LogoMark";
import { useTheme } from "../hooks/useTheme";
import homeContent from "../app/HomeContent.json";

export type SlideTone = "violet" | "cyan" | "green" | "neutral";

type HeroJsonSlide = {
  id: string;
  title: string;
  subtitle: string;
  theme?: string;
  tone?: SlideTone;
  cta: {
    label: string;
    href: string;
  };
  image: {
    dark: string;
    light: string;
    alt: string;
    suggestion?: string;
    searchTerms?: string[];
    preferredSource?: string;
    brandsToShow?: string[];
  };
};

export type Slide = {
  id: string;
  src: string;
  alt: string;
  kicker?: string;
  title: string;
  description: string;
  tone?: SlideTone;
  cta: {
    label: string;
    href: string;
  };
};

const CROSSFADE_MS = 650;

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const autoplayMs = 5200;

  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const crossfadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = mounted ? theme : "dark";

  const slidesBase = homeContent.heroSlides as HeroJsonSlide[];

  const slides: Slide[] = useMemo(
    () =>
      slidesBase.map((slide) => ({
        id: slide.id,
        src: resolvedTheme === "dark" ? slide.image.dark : slide.image.light,
        alt: slide.image.alt,
        kicker: slide.theme,
        title: slide.title,
        description: slide.subtitle,
        tone: slide.tone ?? "neutral",
        cta: slide.cta,
      })),
    [slidesBase, resolvedTheme]
  );

  const safeIndex = index >= 0 && index < slides.length ? index : 0;
  const active = slides[safeIndex];

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

  if (!active) return null;

  return (
    <section
      className={`${styles.hero} ${styles.containerBrand}`}
      aria-labelledby="hero-title"
      data-tone={active.tone ?? "neutral"}
      data-theme={resolvedTheme}
      style={{ "--heroAutoplayMs": `${autoplayMs}ms` } as React.CSSProperties}
    >
      <div className={styles.mediaBg} aria-hidden="true">
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

      <div className={styles.brandRow} aria-hidden="true">
        <LogoMark size="md" variant="trace" />
      </div>

      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.gridFx} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

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

              {active.cta.href !== "/servicios" && (
                <a className={styles.ctaLink} href="/servicios">
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

      <div className={styles.heroProgress} aria-hidden="true">
        <span
          key={`${resolvedTheme}-${safeIndex}`}
          className={styles.heroProgressFill}
        />
      </div>
    </section>
  );
}