"use client";

import Link from "next/link";
import styles from "./ServicesPage.module.css";
import servicesData from "./Services.json";
import type { ServicesJson } from "./types";

const data = servicesData as ServicesJson;

export default function ServicesPage() {
  const { categories, services } = data;

  const getServicesByCategory = (categoryId: string) => {
    return services.filter((service) => service.category === categoryId);
  };

  return (
    <main className={styles.servicesPage}>
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
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>+{services.length}</span>
              <span className={styles.statLabel}>Servicios</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>{categories.length}</span>
              <span className={styles.statLabel}>Áreas</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          {categories.map((category, index) => {
            const categoryServices = getServicesByCategory(category.id);
            if (!categoryServices.length) return null;

            return (
              <div
                key={category.id}
                id={category.id}
                className={styles.categoryBlock}
              >
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIndex}>
                    0{index + 1}
                  </span>
                  <div className={styles.categoryInfo}>
                    <h2 className={styles.categoryTitle}>{category.title}</h2>
                    <p className={styles.categoryDescription}>
                      {category.description}
                    </p>
                  </div>
                  <span className={styles.categoryCount}>
                    {categoryServices.length}{" "}
                    {categoryServices.length === 1 ? "servicio" : "servicios"}
                  </span>
                </div>

                <div className={styles.grid}>
                  {categoryServices.map((service) => (
                    <article key={service.id} className={styles.card}>
                      <div className={styles.cardBody}>
                        <h3 className={styles.cardTitle}>{service.title}</h3>
                        <p className={styles.cardText}>
                          {service.shortDescription}
                        </p>
                        <div className={styles.tags}>
                          {service.highlights.slice(0, 3).map((item) => (
                            <span key={item} className={styles.tag}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.cardFooter}>
                        <Link
                          href={`/servicios/${service.slug}`}
                          className={styles.linkBtn}
                        >
                          Ver servicio{" "}
                          <span className={styles.linkArrow}>↗</span>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}