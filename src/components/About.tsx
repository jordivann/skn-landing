"use client";

import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import styles from "./About.module.css";
import LogoMark from "./LogoMark";
import { getHomeContent } from "../app/home.helpers";

const homeContent = getHomeContent();

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const read = () => {
      const value = document.documentElement.getAttribute("data-theme");
      setTheme(value === "dark" ? "dark" : "light");
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
  const { about } = homeContent;

  const bgImage =
    theme === "light" ? about.background.light : about.background.dark;

  useEffect(() => {
    const handleScroll = () => {
      const el = parallaxRef.current;
      const section = sectionRef.current;

      if (!el || !section) return;

      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewH) return;

      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * 120;

      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className={styles.wrapper}>
      <div className={styles.parallaxOuter} aria-hidden="true">
        <div
          ref={parallaxRef}
          className={styles.parallaxInner}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className={styles.parallaxOverlay} />
        <div className={styles.parallaxVignette} />
      </div>

      <Section
        id="about"
        title={about.sectionTitle}
        subtitle={about.title}
        variant="invert"
        surfaceClassName={styles.aboutSurface}
      >
        <div className={styles.layout}>
          <aside className={styles.brandPane} aria-label="Marca SKN IT">
            <div className={styles.brandInner}>
              <span className={styles.brandRule} aria-hidden="true" />
              <LogoMark size="lg" opposite />
            </div>
          </aside>

          <div className={styles.copy}>
            {about.text.map((paragraph, index) =>
              index === 0 ? (
                <p key={`${index}-${paragraph}`} className={styles.lead}>
                  {paragraph}
                </p>
              ) : (
                <p key={`${index}-${paragraph}`} className={styles.p}>
                  {paragraph}
                </p>
              )
            )}

            {(about.stats?.length ?? 0) > 0 && (
              <div className={styles.statsGrid} aria-label="Indicadores de SKN IT">
                {about.stats?.map((stat, index) => (
                  <div key={`${index}-${stat.label}`} className={styles.statCard}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            {(about.differentiators?.length ?? 0) > 0 && (
              <ul className={styles.differentiators}>
                {about.differentiators?.map((item, index) => (
                  <li key={`${index}-${item}`}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}