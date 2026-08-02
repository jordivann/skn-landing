"use client";

import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import styles from "./About.module.css";
import LogoMark from "./LogoMark";
import homeContent from "../app/HomeContent.json";

type AboutContent = {
  title: string;
  text: string[];
  differentiators: string[];
};

type Stat = {
  label: string;
  value: string;
};

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

  const about = homeContent.about as AboutContent;
  const stats = homeContent.stats as Stat[];

  const bgImage =
    theme === "light" ? "/hero-alter-dark-2.jpg" : "/hero-alter-1.jpg";

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
        title="Quiénes somos"
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
                <p key={paragraph} className={styles.lead}>
                  {paragraph}
                </p>
              ) : (
                <p key={paragraph} className={styles.p}>
                  {paragraph}
                </p>
              )
            )}

            <div className={styles.statsGrid} aria-label="Indicadores de SKN IT">
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <ul className={styles.differentiators}>
              {about.differentiators.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}