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
    const gap = 14;
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
      subtitle="Soluciones IT organizadas por áreas, con alcance claro y enfoque práctico."
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

        <div
          ref={railRef}
          className={styles.carouselWrap}
          aria-label="Servicios — desplazá horizontalmente para ver más"
        >
          <div className={styles.grid}>
            {PILLARS.map((pillar) => (
              <article key={pillar.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.num}>{pillar.num}</span>

                  <h3 className={styles.title}>
                    {pillar.title}
                  </h3>

                  <p className={styles.desc}>
                    {pillar.desc}
                  </p>
                </div>

                <ul
                  className={styles.serviceList}
                  aria-label={`Servicios de ${pillar.title}`}
                >
                  {pillar.services.map((service) => (
                    <li
                      key={service.id}
                      className={styles.serviceItem}
                    >
                      <span
                        className={styles.serviceIcon}
                        aria-hidden="true"
                      />

                      <Link
                        href={service.href}
                        className={styles.serviceLink}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                {pillar.chips.length > 0 && (
                  <div className={styles.chips}>
                    {pillar.chips.map((chip) => (
                      <span
                        key={chip}
                        className={styles.chip}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
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
        <Link
          className={styles.ctaBtn}
          href="/servicios"
        >
          Ver todos los servicios →
        </Link>

        <a
          className={styles.ctaGhost}
          href="#contacto"
        >
          Pedir diagnóstico
        </a>
      </div>
    </Section>
  );
}