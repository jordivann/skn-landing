"use client";

import { useRef } from "react";
import Link from "next/link";
import Section from "./Section";
import styles from "./Services.module.css";
import { getHomeServicePillars } from "../app/(pages)/servicios/services.helpers";

const PILLARS = getHomeServicePillars();

export default function Services() {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector(`.${styles.card}`) as HTMLElement | null;
    const cardWidth = card?.offsetWidth ?? 320;
    const gap = 16;
    const amount = cardWidth + gap;

    rail.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <Section
      id="services"
      title="Servicios"
      subtitle="Soporte, seguridad, consultoría y soluciones digitales con alcance claro y enfoque práctico."
    >
      <div className={styles.carouselShell}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          aria-label="Ver servicios anteriores"
          onClick={() => scrollByAmount("left")}
        >
          ←
        </button>

        <div ref={railRef} className={styles.carouselWrap}>
          <div className={styles.grid}>
            {PILLARS.map((p) => (
              <article key={p.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.num}>{p.num}</span>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.desc}>{p.desc}</p>
                </div>

                <ul
                  className={styles.serviceList}
                  aria-label={`Servicios de ${p.title}`}
                >
                  {p.services.map((s) => (
                    <li key={s.slug} className={styles.serviceItem}>
                      <span className={styles.serviceIcon} aria-hidden="true" />
                      <Link
                        href={`/servicios/${s.slug}`}
                        className={styles.serviceLink}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className={styles.chips}>
                  {p.chips.map((c) => (
                    <span key={c} className={styles.chip}>
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          aria-label="Ver más servicios"
          onClick={() => scrollByAmount("right")}
        >
          →
        </button>
      </div>

      <div className={styles.cta}>
        <Link className={`btn btnPrimary ${styles.ctaBtn}`} href="/servicios">
          Ver todos los servicios →
        </Link>

        <a className={`btn ${styles.ctaGhost}`} href="#contacto">
          Pedir diagnóstico
        </a>
      </div>
    </Section>
  );
}