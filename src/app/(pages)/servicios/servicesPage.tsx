"use client";

import Link from "next/link";
import styles from "./ServicesPage.module.css";
import servicesData from "./Services.json";
import type { ServicesJson } from "./types";

const data = servicesData as ServicesJson;

// ── Ícono flecha inline ───────────────────────────────────────────────────────

function IconArrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6.5h9M7.5 3L11 6.5 7.5 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const { categories, services } = data;

  const getServicesByCategory = (categoryId: string) =>
    services.filter((service) => service.category === categoryId);

  const activeCategories = categories.filter(
    (cat) => getServicesByCategory(cat.id).length > 0
  );

  return (
    <main className={styles.servicesPage}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Servicios IT</span>

          <h1 className={styles.title}>
            Soluciones tecnológicas{" "}
            <em className={styles.titleItalic}>claras, prácticas</em>{" "}
            y escalables
          </h1>

          <p className={styles.subtitle}>
            Organizamos nuestros servicios en áreas pensadas para que cada
            empresa encuentre rápidamente lo que necesita: soporte, seguridad,
            consultoría y desarrollo.
          </p>

          {/* Stats + navegación rápida por categoría */}
          <div className={styles.spHeroBottom}>
            <div className={styles.stats} aria-label="Resumen de servicios">
              <div className={styles.stat}>
                <span className={styles.statNum}>+{services.length}</span>
                <span className={styles.statLabel}>Servicios</span>
              </div>
              <div className={styles.statDivider} aria-hidden="true" />
              <div className={styles.stat}>
                <span className={styles.statNum}>{categories.length}</span>
                <span className={styles.statLabel}>Áreas</span>
              </div>
            </div>

            {activeCategories.length > 1 && (
              <nav
                className={styles.spCategoryNav}
                aria-label="Ir a área de servicios"
              >
                {activeCategories.map((cat, i) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className={styles.spCategoryNavLink}
                  >
                    <span
                      className={styles.spCategoryNavNum}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {cat.title}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CATEGORÍAS + CARDS
      ══════════════════════════════════════════ */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          {activeCategories.map((category, index) => {
            const categoryServices = getServicesByCategory(category.id);

            return (
              <section
                key={category.id}
                id={category.id}
                className={styles.categoryBlock}
                aria-labelledby={`category-${category.id}`}
              >
                <div className={styles.categoryHeader}>
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

                    return (
                      <article key={service.id} className={styles.card}>
                        <div className={styles.cardTop}>
                          <span className={styles.cardCategory}>
                            {category.title}
                          </span>
                          <span
                            className={styles.cardMarker}
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </div>

                        <div className={styles.cardBody}>
                          <h3 className={styles.cardTitle}>{service.title}</h3>
                          <p className={styles.cardText}>
                            {service.shortDescription}
                          </p>

                          {highlights.length > 0 && (
                            <div
                              className={styles.cardTags}
                              aria-label="Puntos destacados"
                            >
                              {highlights.slice(0, 3).map((item) => (
                                <span key={item} className={styles.cardTag}>
                                  {item}
                                </span>
                              ))}
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
                            Ver servicio{" "}
                            <span
                              className={styles.linkArrow}
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CIERRE — CTA de contacto
      ══════════════════════════════════════════ */}
      <section className={styles.spClosingSection}>
        <div className={styles.container}>
          <div className={styles.spClosingBox}>
            <div className={styles.spClosingCopy}>
              <p className={styles.spClosingLabel}>
                ¿No encontraste lo que buscabas?
              </p>
              <h2 className={styles.spClosingTitle}>
                Contanos qué necesita tu empresa
              </h2>
              <p className={styles.spClosingDesc}>
                Si tu situación no encaja exactamente en ninguno de los
                servicios listados, podemos armar una propuesta a medida.
                Trabajamos con empresas de distintos tamaños y sectores.
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
      </section>

    </main>
  );
}