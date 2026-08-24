"use client";

import Link from "next/link";
import { useState } from "react";
import MotionSection from "@/components/MotionSection";
import styles from "./ServiceDetail.module.css";
import type { Category, Service } from "./types";

type Props = {
  service: Service;
  relatedServices: Service[];
  category: Category | null;
};

type FormStatus = "idle" | "loading" | "success" | "error";

function IconCheck() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={styles.detailIcon}
    >
      <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeOpacity=".22" />
      <path
        d="M4.5 7l1.75 1.75L9.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroBullets({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <ul className={styles.detailHeroBullets} aria-label="Puntos destacados">
      {items.map((item) => (
        <li key={item} className={styles.detailHeroBullet}>
          <IconCheck />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CheckListCard({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <div className={styles.detailResultBox}>
      <p className={styles.detailBlockLabel}>{title}</p>
      <ul className={styles.detailCheckList}>
        {items.map((item) => (
          <li key={item} className={styles.detailCheckItem}>
            <IconCheck />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProblemCard({ text }: { text: string }) {
  return (
    <div className={styles.detailProblemCard}>
      <span className={styles.detailProblemIcon} aria-hidden="true">
        ×
      </span>
      <p className={styles.detailProblemText}>{text}</p>
    </div>
  );
}

function BenefitCard({ text }: { text: string }) {
  return (
    <div className={styles.detailBenefitCard}>
      <span className={styles.detailBenefitIcon} aria-hidden="true">
        +
      </span>
      <p className={styles.detailBenefitText}>{text}</p>
    </div>
  );
}

function ProcessStep({
  num,
  text,
  isLast,
}: {
  num: number;
  text: string;
  isLast: boolean;
}) {
  return (
    <div className={styles.detailProcessStep}>
      <div className={styles.detailProcessLeft}>
        <span className={styles.detailProcessNum}>
          {String(num).padStart(2, "0")}
        </span>
        {!isLast && <span className={styles.detailProcessLine} aria-hidden="true" />}
      </div>
      <p className={styles.detailProcessText}>{text}</p>
    </div>
  );
}

function IdealChip({ text }: { text: string }) {
  return <span className={styles.detailIdealChip}>{text}</span>;
}

export default function ServiceDetailPage({
  service,
  relatedServices,
  category,
}: Props) {
  const [status, setStatus] = useState<FormStatus>("idle");

  // Todo el contenido específico del servicio sale del JSON.
  // No hay contenido comercial/técnico de fallback en este componente.
  const highlights = service.highlights ?? [];
  const intro = service.info?.intro ?? "";
  const includes = service.info?.includes ?? [];
  const problems = service.info?.problemsSolved ?? [];
  const benefits = service.info?.benefits ?? [];
  const results = service.info?.results ?? [];
  const process = service.info?.process ?? [];
  const idealFor = service.info?.idealFor ?? [];
  const brands = service.info?.brands ?? [];
  const useCases = service.info?.useCases ?? [];
  const cards = service.cards ?? [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const form = e.currentTarget;
      const body = Object.fromEntries(new FormData(form).entries());

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error en el envío");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className={styles.serviceDetailPage}>
      <MotionSection variant="fadeDown" className={styles.hero}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="Ruta de navegación">
            <Link href="/servicios">Servicios</Link>
            <span aria-hidden="true">/</span>
            {category && (
              <>
                <Link href={`/servicios#${category.id}`}>{category.title}</Link>
                <span aria-hidden="true">/</span>
              </>
            )}
            <span aria-current="page">{service.title}</span>
          </nav>

          <div className={styles.detailHeroGrid}>
            <div className={styles.detailHeroCopy}>
              {category && <span className={styles.eyebrow}>{category.title}</span>}

              <h1 className={styles.title}>{service.title}</h1>
              <p className={styles.subtitle}>{service.heroDescription}</p>

              <HeroBullets items={highlights} />

              <div className={styles.heroActions}>
                <Link href="#contacto" className={styles.heroPrimaryCta}>
                  Consultar este servicio
                  <IconArrow />
                </Link>
                {includes.length > 0 && (
                  <Link href="#que-incluye" className={styles.heroSecondaryCta}>
                    Ver qué incluye
                  </Link>
                )}
              </div>
            </div>

            <aside className={styles.serviceHeroVisual} aria-label="Resumen del servicio">
              <div className={styles.visualTop}>
                <span className={styles.visualStatus}>Servicio activo</span>
                <span className={styles.visualCode}>
                  {String(service.id).slice(0, 3).toUpperCase()}
                </span>
              </div>

              <div className={styles.visualCore}>
                <div className={styles.visualCoreText}>
                  {category && (
                    <p className={styles.visualCoreCategory}>{category.title}</p>
                  )}
                  <strong>{service.title}</strong>
                  <p className={styles.visualCoreDesc}>{service.shortDescription}</p>
                </div>
              </div>

              <div className={styles.visualMetrics}>
                {includes.length > 0 && (
                  <div className={styles.visualMetricItem}>
                    <span>{String(includes.length).padStart(2, "0")}</span>
                    <small>Alcances definidos</small>
                  </div>
                )}
                {benefits.length > 0 && (
                  <div className={styles.visualMetricItem}>
                    <span>{String(benefits.length).padStart(2, "0")}</span>
                    <small>Beneficios clave</small>
                  </div>
                )}
                {process.length > 0 && (
                  <div className={styles.visualMetricItem}>
                    <span>{String(process.length).padStart(2, "0")}</span>
                    <small>Etapas de trabajo</small>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </MotionSection>

      <div className={styles.detailBody}>
        {intro && (
          <MotionSection variant="softReveal" className={styles.detailSection}>
            <div className={styles.container}>
              <p className={styles.detailServiceIntro}>{intro}</p>
            </div>
          </MotionSection>
        )}

        {includes.length > 0 && (
          <>
            <div className={styles.divider} />
            <MotionSection
              id="que-incluye"
              className={styles.detailSection}
              aria-labelledby="lbl-includes"
              variant="fadeUp"
            >
              <div className={styles.container}>
                <div className={styles.detailSectionHeader}>
                  <p className={styles.sectionLabel} id="lbl-includes">
                    Qué incluye este servicio
                  </p>
                  <h2 className={styles.detailSectionTitle}>
                    Alcance concreto de la solución
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    Estos son los componentes y tareas contemplados dentro del servicio.
                  </p>
                </div>

                <div className={styles.detailIncludesGrid}>
                  <CheckListCard title="Incluye" items={includes} />
                </div>
              </div>
            </MotionSection>
          </>
        )}

        {problems.length > 0 && (
          <>
            <div className={styles.divider} />
            <MotionSection
              className={styles.detailSection}
              aria-labelledby="lbl-problems"
              variant="slideRight"
            >
              <div className={styles.container}>
                <div className={styles.detailSectionHeader}>
                  <p className={styles.sectionLabel} id="lbl-problems">
                    Problemas que resolvemos
                  </p>
                  <h2 className={styles.detailSectionTitle}>
                    Situaciones que este servicio ayuda a corregir
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    El servicio está orientado a resolver problemas concretos de operación, control o infraestructura.
                  </p>
                </div>

                <div className={styles.detailProblemsGrid}>
                  {problems.map((item) => (
                    <ProblemCard key={item} text={item} />
                  ))}
                </div>
              </div>
            </MotionSection>
          </>
        )}

        {benefits.length > 0 && (
          <>
            <div className={styles.divider} />
            <MotionSection
              className={styles.detailSection}
              aria-labelledby="lbl-benefits"
              variant="slideLeft"
            >
              <div className={styles.container}>
                <div className={styles.detailSectionHeader}>
                  <p className={styles.sectionLabel} id="lbl-benefits">
                    Beneficios para tu empresa
                  </p>
                  <h2 className={styles.detailSectionTitle}>
                    Impacto esperado sobre la operación
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    El valor del servicio se mide por la mejora concreta que aporta al funcionamiento de la empresa.
                  </p>
                </div>

                <div className={styles.detailBenefitsGrid}>
                  {benefits.map((item) => (
                    <BenefitCard key={item} text={item} />
                  ))}
                </div>
              </div>
            </MotionSection>
          </>
        )}

        {results.length > 0 && (
          <>
            <div className={styles.divider} />
            <MotionSection
              className={styles.detailSection}
              aria-labelledby="lbl-results"
              variant="fadeUp"
            >
              <div className={styles.container}>
                <div className={styles.detailSectionHeader}>
                  <p className={styles.sectionLabel} id="lbl-results">
                    Resultados esperados
                  </p>
                  <h2 className={styles.detailSectionTitle}>
                    Qué debería quedar mejor después de la implementación
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    Resultados concretos definidos para evaluar el aporte de este servicio.
                  </p>
                </div>

                <div className={styles.detailIncludesGrid}>
                  <CheckListCard title="Resultados" items={results} />
                </div>
              </div>
            </MotionSection>
          </>
        )}

        {process.length > 0 && (
          <>
            <div className={styles.divider} />
            <MotionSection
              className={styles.detailSection}
              aria-labelledby="lbl-process"
              variant="softReveal"
            >
              <div className={styles.container}>
                <div className={styles.detailProcessLayout}>
                  <div className={styles.detailProcessHeader}>
                    <p className={styles.sectionLabel} id="lbl-process">
                      Cómo trabajamos
                    </p>
                    <h2 className={styles.detailSectionTitle}>
                      El proceso de trabajo
                    </h2>
                    <p className={styles.detailSectionDesc}>
                      Cada etapa se define de forma clara para ordenar la implementación y el seguimiento.
                    </p>
                    <Link href="#contacto" className={styles.detailProcessCta}>
                      Iniciar el proceso
                      <IconArrow />
                    </Link>
                  </div>

                  <div className={styles.detailProcessSteps}>
                    {process.map((step, i) => (
                      <ProcessStep
                        key={step}
                        num={i + 1}
                        text={step}
                        isLast={i === process.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </MotionSection>
          </>
        )}

        {idealFor.length > 0 && (
          <>
            <div className={styles.divider} />
            <MotionSection
              className={styles.detailSection}
              aria-labelledby="lbl-ideal"
              variant="fadeUp"
            >
              <div className={styles.container}>
                <div className={styles.detailIdealLayout}>
                  <div>
                    <p className={styles.sectionLabel} id="lbl-ideal">
                      Ideal para
                    </p>
                    <h2 className={styles.detailSectionTitle}>
                      ¿En qué tipo de empresa encaja mejor?
                    </h2>
                    <p className={styles.detailSectionDesc}>
                      Perfiles y situaciones donde este servicio suele generar mayor valor.
                    </p>
                  </div>

                  <div className={styles.detailIdealChips}>
                    {idealFor.map((item) => (
                      <IdealChip key={item} text={item} />
                    ))}
                  </div>
                </div>
              </div>
            </MotionSection>
          </>
        )}

        {(brands.length > 0 || useCases.length > 0) && (
          <>
            <div className={styles.divider} />
            <MotionSection variant="fadeUp" className={styles.detailSection}>
              <div className={styles.container}>
                <div className={styles.detailSectionHeader}>
                  <p className={styles.sectionLabel}>Información específica</p>
                  <h2 className={styles.detailSectionTitle}>
                    Datos adicionales del servicio
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    Tecnologías, marcas o casos de uso definidos específicamente para esta solución.
                  </p>
                </div>

                <div className={styles.detailIncludesGrid}>
                  <CheckListCard title="Marcas y tecnologías" items={brands} />
                  <CheckListCard title="Casos de uso típicos" items={useCases} />
                </div>
              </div>
            </MotionSection>
          </>
        )}

        {cards.length > 0 && (
          <>
            <div className={styles.divider} />
            <MotionSection variant="softReveal" className={styles.detailSection}>
              <div className={styles.container}>
                <p className={styles.sectionLabel}>Aspectos clave del servicio</p>
                <div className={styles.cardsGrid}>
                  {cards.map((card, i) => (
                    <article key={`${card.title}-${i}`} className={styles.keyCard}>
                      <span className={styles.keyCardNum} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className={styles.keyCardTitle}>{card.title}</h3>
                      <p className={styles.keyCardText}>{card.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </MotionSection>
          </>
        )}

        {relatedServices.length > 0 && (
          <>
            <div className={styles.divider} />
            <MotionSection variant="fadeUp" className={styles.detailSection}>
              <div className={styles.container}>
                <p className={styles.sectionLabel}>
                  Servicios que complementan esta solución
                </p>
                <div className={styles.relatedGrid}>
                  {relatedServices.map((item) => (
                    <article key={item.id} className={styles.relatedCard}>
                      <h3 className={styles.relatedTitle}>{item.title}</h3>
                      <p className={styles.relatedText}>{item.shortDescription}</p>
                      <Link href={`/servicios/${item.slug}`} className={styles.relatedLink}>
                        Ver servicio <span aria-hidden="true">↗</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </MotionSection>
          </>
        )}

        <div className={styles.divider} />
        <MotionSection
          id="contacto"
          className={styles.detailSection}
          variant="scale"
          once={false}
        >
          <div className={styles.container}>
            <div className={styles.contactBox}>
              <div className={styles.contactTop}>
                <h2 className={styles.contactTitle}>{service.contact.title}</h2>
                <p className={styles.contactDesc}>{service.contact.description}</p>
              </div>

              <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
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
                  rows={5}
                  aria-label="Mensaje"
                  disabled={status === "loading"}
                />

                {status === "success" && (
                  <p className={styles.formSuccess} role="status">
                    Consulta enviada. Te respondemos a la brevedad.
                  </p>
                )}
                {status === "error" && (
                  <p className={styles.formError} role="alert">
                    Hubo un error al enviar. Intentá de nuevo o escribinos directamente.
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "loading" || status === "success"}
                >
                  {status === "loading" ? "Enviando…" : "Enviar consulta"}
                </button>
              </form>
            </div>
          </div>
        </MotionSection>
      </div>
    </main>
  );
}