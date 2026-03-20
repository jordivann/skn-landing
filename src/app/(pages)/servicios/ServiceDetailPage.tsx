"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ServicesPage.module.css";
import type { Category, Service } from "./types";

type Props = {
  service: Service;
  relatedServices: Service[];
  category: Category | null;
};

type FormStatus = "idle" | "loading" | "success" | "error";

function InfoList({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;

  return (
    <div className={styles.infoBox}>
      <h3 className={styles.infoTitle}>{title}</h3>
      <ul className={styles.infoList}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceDetailPage({
  service,
  relatedServices,
  category,
}: Props) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const infoItems = [
    { title: "Qué incluye", items: service.info.includes },
    { title: "Problemas que resuelve", items: service.info.problemsSolved },
    { title: "Cómo trabajamos", items: service.info.process },
    { title: "Ideal para", items: service.info.idealFor },
    { title: "Beneficios", items: service.info.benefits },
    { title: "Resultado esperado", items: service.info.results },
  ].filter((item) => item.items?.length > 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const formData = new FormData(e.currentTarget);
      const body = Object.fromEntries(formData.entries());

      // Replace with your actual endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error en el envío");

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  };

  // Limit related services to 3 max to avoid broken grid layouts
  const limitedRelated = relatedServices.slice(0, 3);

  return (
    <main className={styles.serviceDetailPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          {/* Full breadcrumb trail including current service */}
          <div className={styles.breadcrumbs}>
            <Link href="/servicios">Servicios</Link>
            <span>/</span>
            {category && (
              <Link href={`/servicios#${category.id}`}>{category.title}</Link>
            )}
            <span>/</span>
            <span>{service.title}</span>
          </div>

          <span className={styles.eyebrow}>{category?.title || "Servicio"}</span>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.subtitle}>{service.heroDescription}</p>

          <div className={styles.highlights}>
            {service.highlights.map((item) => (
              <span key={item} className={styles.badge}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {infoItems.length > 0 && (
        <section className={styles.infoSection}>
          <div className={styles.container}>
            <div className={styles.introBlock}>
              <h2 className={styles.sectionTitle}>Información del servicio</h2>
              <p className={styles.sectionText}>{service.info.intro}</p>
            </div>

            <div className={styles.infoGrid}>
              {infoItems.map(({ title, items }) => (
                <InfoList key={title} title={title} items={items} />
              ))}
            </div>
          </div>
        </section>
      )}

      {service.cards?.length > 0 && (
        <section className={styles.cardsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Puntos clave del servicio</h2>

            <div className={styles.grid}>
              {service.cards.map((card) => (
                <article key={card.title} className={styles.card}>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardText}>{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {limitedRelated.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>También te puede interesar</h2>

            <div className={styles.grid}>
              {limitedRelated.map((item) => (
                <article key={item.id} className={styles.card}>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.shortDescription}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <Link
                      href={`/servicios/${item.slug}`}
                      className={styles.linkBtn}
                    >
                      Ver servicio
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contacto" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactBox}>
            <div className={styles.contactContent}>
              <h2 className={styles.sectionTitle}>{service.contact.title}</h2>
              <p className={styles.sectionText}>{service.contact.description}</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input type="hidden" name="service" value={service.title} />

              <div className={styles.formRow}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className={styles.input}
                  required
                  aria-label="Nombre"
                  disabled={status === "loading"}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Empresa"
                  className={styles.input}
                  aria-label="Empresa"
                  disabled={status === "loading"}
                />
              </div>

              <div className={styles.formRow}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                  required
                  aria-label="Email"
                  disabled={status === "loading"}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  className={styles.input}
                  aria-label="Teléfono"
                  disabled={status === "loading"}
                />
              </div>

              <textarea
                name="message"
                placeholder={`Quiero consultar por el servicio de ${service.title}`}
                className={styles.textarea}
                rows={6}
                aria-label="Mensaje"
                disabled={status === "loading"}
              />

              {status === "success" && (
                <p style={{ color: "var(--primary2)", fontWeight: 600, margin: 0 }}>
                  ✓ Consulta enviada. Te respondemos a la brevedad.
                </p>
              )}

              {status === "error" && (
                <p style={{ color: "#e05c5c", fontWeight: 600, margin: 0 }}>
                  Hubo un error al enviar. Intentá de nuevo o escribinos directamente.
                </p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading" ? "Enviando..." : "Enviar consulta"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}