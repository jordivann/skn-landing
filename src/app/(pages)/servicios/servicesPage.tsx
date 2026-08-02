"use client";

import Link from "next/link";
import MotionSection from "@/components/MotionSection";
import styles from "./ServicesPage.module.css";
import servicesData from "./Services.json";
import type { Category, Service, ServicesJson } from "./types";

const data = servicesData as ServicesJson;

function IconArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7.2 6 9.2 10.2 4.8"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.5 1.4 8.8 5.7l4.3 1.8-4.3 1.7-1.3 4.4-1.3-4.4-4.3-1.7 4.3-1.8 1.3-4.3Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesPage() {
  const { categories, services } = data;

  const servicesById = new Map<string, Service>(
    services.map((service) => [service.id, service])
  );

  const getServicesByCategory = (category: Category) =>
    category.services
      .map((serviceId) => servicesById.get(serviceId))
      .filter((service): service is Service => Boolean(service));

  const activeCategories = categories.filter(
    (category) => getServicesByCategory(category).length > 0
  );

  return (
    <main className={styles.servicesPage}>
      <MotionSection variant="softReveal" className={styles.hero}>
  <div className={styles.container}>
    <div className={styles.heroGrid}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>
          <IconSpark />
          Servicios IT
        </span>

        <h1 className={styles.title}>
          Tecnología clara para resolver problemas{" "}
          <em className={styles.titleItalic}>reales</em>
        </h1>

        <p className={styles.subtitle}>
          Soporte, seguridad, infraestructura, consultoría y desarrollo para
          empresas que necesitan ordenar, mejorar y escalar su operación
          tecnológica.
        </p>

        <div className={styles.heroActions}>
          <a href="#catalogo" className={styles.heroPrimaryCta}>
            Explorar servicios
            <IconArrow />
          </a>

          <Link href="/contacto" className={styles.heroSecondaryCta}>
            Solicitar diagnóstico
          </Link>
        </div>

        <div className={styles.heroProof} aria-label="Resumen de enfoque">
          <span>Diagnóstico</span>
          <span>Plan técnico</span>
          <span>Ejecución</span>
          <span>Soporte</span>
        </div>
      </div>

      <aside className={styles.heroVisual} aria-label="Resumen visual de servicios">
        <div className={styles.visualHeader}>
          <span className={styles.visualStatus}>Operación IT</span>
          <span className={styles.visualCode}>SKN / CORE</span>
        </div>

        <div className={styles.visualMain}>
          <p className={styles.visualLabel}>Catálogo activo</p>

          <div className={styles.visualMetric}>
            <strong>+{services.length}</strong>
            <span>servicios disponibles</span>
          </div>

          <div className={styles.visualLine} aria-hidden="true" />

          <p className={styles.visualText}>
            Organizados en {activeCategories.length} áreas para identificar
            rápido la solución adecuada.
          </p>
        </div>

        <nav className={styles.visualAreas} aria-label="Áreas de servicios">
          {activeCategories.map((category, index) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={styles.visualArea}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {category.title}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  </div>
</MotionSection>

      <MotionSection
        id="catalogo"
        variant="fadeUp"
        className={styles.catalogIntro}
      >
        <div className={styles.container}>
          <div className={styles.catalogIntroBox}>
            <div>
              <p className={styles.sectionKicker}>Catálogo de soluciones</p>
              <h2 className={styles.sectionTitle}>
                Elegí el área que mejor representa tu necesidad actual
              </h2>
            </div>

            <p className={styles.sectionText}>
              Cada bloque agrupa servicios relacionados para que puedas comparar
              opciones, entender el alcance y pasar al detalle correspondiente.
            </p>
          </div>
        </div>
      </MotionSection>

      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.categoriesLayout}>
            <aside className={styles.catalogAside} aria-label="Índice de áreas">
              <p className={styles.catalogAsideLabel}>Áreas</p>

              <nav className={styles.catalogNav}>
                {activeCategories.map((cat, i) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className={styles.catalogNavLink}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {cat.title}
                  </a>
                ))}
              </nav>
            </aside>

            <div className={styles.categoryStack}>
              {activeCategories.map((category, index) => {
                const categoryServices = getServicesByCategory(category);

                return (
                  <MotionSection
                    key={category.id}
                    id={category.id}
                    className={styles.categoryBlock}
                    aria-labelledby={`category-${category.id}`}
                    variant={index % 2 === 0 ? "fadeUp" : "softReveal"}
                    delay={Math.min(index * 0.04, 0.16)}
                  >
                    <div className={styles.categoryHeader}>
                      <div className={styles.categoryTitleGroup}>
                        <span className={styles.categoryIndex} aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className={styles.categoryInfo}>
                          <h2
                            id={`category-${category.id}`}
                            className={styles.categoryTitle}
                          >
                            {category.title}
                          </h2>

                          <p className={styles.categoryDescription}>
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <span
                        className={styles.categoryCount}
                        aria-label={`${categoryServices.length} servicios en esta categoría`}
                      >
                        {categoryServices.length}{" "}
                        {categoryServices.length === 1 ? "servicio" : "servicios"}
                      </span>
                    </div>

                    <div className={styles.grid}>
                      {categoryServices.map((service) => {
                        const highlights = service.highlights ?? [];
                        const firstHighlight = highlights[0];

                        return (
                          <article key={service.id} className={styles.card}>
                            <div className={styles.cardTop}>
                              <span className={styles.cardCategory}>
                                {category.title}
                              </span>

                              <Link
                                href={`/servicios/${service.slug}`}
                                className={styles.cardMarker}
                                aria-label={`Ver detalle de ${service.title}`}
                              >
                                ↗
                              </Link>
                            </div>

                            <div className={styles.cardBody}>
                              <h3 className={styles.cardTitle}>
                                {service.title}
                              </h3>

                              <p className={styles.cardText}>
                                {service.shortDescription}
                              </p>

                              {firstHighlight && (
                                <div className={styles.cardHighlight}>
                                  <IconCheck />
                                  <span>{firstHighlight}</span>
                                </div>
                              )}
                            </div>

                            <div className={styles.cardFooter}>
                              <span className={styles.cardMeta}>
                                {highlights.length > 0
                                  ? `${highlights.length} puntos clave`
                                  : "Servicio especializado"}
                              </span>

                              <Link
                                href={`/servicios/${service.slug}`}
                                className={styles.linkBtn}
                                aria-label={`Ver detalle del servicio ${service.title}`}
                              >
                                Ver detalle
                                <span className={styles.linkArrow} aria-hidden="true">
                                  →
                                </span>
                              </Link>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </MotionSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <MotionSection
        variant="scale"
        once={false}
        className={styles.spClosingSection}
      >
        <div className={styles.container}>
          <div className={styles.spClosingBox}>
            <div className={styles.spClosingCopy}>
              <p className={styles.spClosingLabel}>
                ¿No encontraste lo que buscabas?
              </p>

              <h2 className={styles.spClosingTitle}>
                Armemos una solución a medida
              </h2>

              <p className={styles.spClosingDesc}>
                Contanos qué problema querés resolver. Podemos ayudarte a
                ordenar prioridades, definir alcance técnico y ejecutar una
                solución concreta para tu empresa.
              </p>
            </div>

            <div className={styles.spClosingActions}>
              <Link href="/contacto" className={styles.heroPrimaryCta}>
                Consultar ahora
                <IconArrow />
              </Link>

              <Link href="/nosotros" className={styles.heroSecondaryCta}>
                Conocer SKN
              </Link>
            </div>
          </div>
        </div>
      </MotionSection>
    </main>
  );
}