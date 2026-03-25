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
      <p className={styles.infoBoxTitle}>{title}</p>
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

  const limitedRelated = relatedServices.slice(0, 3);

  return (
    <main className={styles.serviceDetailPage}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/servicios">Servicios</Link>
            <span>/</span>
            {category && (
              <>
                <Link href={`/servicios#${category.id}`}>
                  {category.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span>{service.title}</span>
          </div>

          <span className={styles.eyebrow}>
            {category?.title || "Servicio"}
          </span>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.subtitle}>{service.heroDescription}</p>

          <div className={styles.tags}>
            {service.highlights.map((item) => (
              <span key={item} className={styles.tag}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.detailBody}>
        {/* INFO */}
        {infoItems.length > 0 && (
          <section className={styles.detailSection}>
            <div className={styles.container}>
              <p className={styles.sectionLabel}>Información del servicio</p>
              {service.info.intro && (
                <p className={styles.sectionIntro}>{service.info.intro}</p>
              )}
              <div className={styles.infoGrid}>
                {infoItems.map(({ title, items }) => (
                  <InfoList key={title} title={title} items={items} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DIVIDER */}
        {infoItems.length > 0 && service.cards?.length > 0 && (
          <div className={styles.divider} />
        )}

        {/* CARDS */}
        {service.cards?.length > 0 && (
          <section className={styles.detailSection}>
            <div className={styles.container}>
              <p className={styles.sectionLabel}>Puntos clave</p>
              <div className={styles.cardsGrid}>
                {service.cards.map((card, i) => (
                  <article key={card.title} className={styles.keyCard}>
                    <span className={styles.keyCardNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={styles.keyCardTitle}>{card.title}</h3>
                    <p className={styles.keyCardText}>{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RELATED */}
        {limitedRelated.length > 0 && (
          <>
            <div className={styles.divider} />
            <section className={styles.detailSection}>
              <div className={styles.container}>
                <p className={styles.sectionLabel}>También te puede interesar</p>
                <div className={styles.relatedGrid}>
                  {limitedRelated.map((item) => (
                    <article key={item.id} className={styles.relatedCard}>
                      <h3 className={styles.relatedTitle}>{item.title}</h3>
                      <p className={styles.relatedText}>
                        {item.shortDescription}
                      </p>
                      <Link
                        href={`/servicios/${item.slug}`}
                        className={styles.relatedLink}
                      >
                        Ver servicio <span>↗</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* CONTACT */}
        <div className={styles.divider} />
        <section id="contacto" className={styles.detailSection}>
          <div className={styles.container}>
            <div className={styles.contactBox}>
              <div className={styles.contactTop}>
                <h2 className={styles.contactTitle}>
                  {service.contact.title}
                </h2>
                <p className={styles.contactDesc}>
                  {service.contact.description}
                </p>
              </div>

              <form
                className={styles.contactForm}
                onSubmit={handleSubmit}
                noValidate
              >
                <input
                  type="hidden"
                  name="service"
                  value={service.title}
                />
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
                  rows={5}
                  aria-label="Mensaje"
                  disabled={status === "loading"}
                />

                {status === "success" && (
                  <p className={styles.formSuccess}>
                    ✓ Consulta enviada. Te respondemos a la brevedad.
                  </p>
                )}
                {status === "error" && (
                  <p className={styles.formError}>
                    Hubo un error al enviar. Intentá de nuevo o escribinos
                    directamente.
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
      </div>
    </main>
  );
}