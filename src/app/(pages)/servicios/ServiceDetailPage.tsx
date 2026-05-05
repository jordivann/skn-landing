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

// ── Íconos SVG inline ligeros ─────────────────────────────────────────────────

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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Sub-componentes ───────────────────────────────────────────────────────────

/** Puntos rápidos en el hero */
function HeroBullets({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className={styles.detailHeroBullets} aria-label="Puntos destacados">
      {items.slice(0, 3).map((item) => (
        <li key={item} className={styles.detailHeroBullet}>
          <IconCheck />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Tarjeta de "Qué incluye" con checklist */
function IncludesCard({ items }: { items: string[] }) {
  return (
    <div className={styles.detailIncludesCard}>
      <p className={styles.detailBlockLabel}>Qué incluye</p>
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

/** Tarjeta de problema */
function ProblemCard({ text }: { text: string }) {
  return (
    <div className={styles.detailProblemCard}>
      <span className={styles.detailProblemIcon} aria-hidden="true">×</span>
      <p className={styles.detailProblemText}>{text}</p>
    </div>
  );
}

/** Tarjeta de beneficio */
function BenefitCard({ text }: { text: string }) {
  return (
    <div className={styles.detailBenefitCard}>
      <span className={styles.detailBenefitIcon} aria-hidden="true">+</span>
      <p className={styles.detailBenefitText}>{text}</p>
    </div>
  );
}

/** Paso del proceso */
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
        {!isLast && (
          <span className={styles.detailProcessLine} aria-hidden="true" />
        )}
      </div>
      <p className={styles.detailProcessText}>{text}</p>
    </div>
  );
}

/** Chip "Ideal para" */
function IdealChip({ text }: { text: string }) {
  return <span className={styles.detailIdealChip}>{text}</span>;
}

// ── Fallback proceso ──────────────────────────────────────────────────────────

const DEFAULT_PROCESS = [
  "Relevamos tu situación actual y entendemos tus necesidades concretas.",
  "Diseñamos una propuesta adaptada a tu empresa y objetivos.",
  "Implementamos o ajustamos la solución de forma ordenada.",
  "Acompañamos con soporte continuo y seguimiento del resultado.",
];

// ── Página principal ──────────────────────────────────────────────────────────

export default function ServiceDetailPage({
  service,
  relatedServices,
  category,
}: Props) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const highlights   = service.highlights ?? [];
  const includes     = service.info?.includes ?? [];
  const problems     = service.info?.problemsSolved ?? [];
  const benefits     = service.info?.benefits ?? [];
  const process      = service.info?.process?.length ? service.info.process : DEFAULT_PROCESS;
  const idealFor     = service.info?.idealFor ?? [];
  const results      = service.info?.results ?? [];
  const limitedRelated = relatedServices.slice(0, 3);

  // Puntos rápidos del hero: beneficios > highlights
  const heroBullets = benefits.length > 0 ? benefits.slice(0, 3) : highlights.slice(0, 3);
  const hasKeyCards = (service.cards?.length ?? 0) > 0;

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

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className={styles.hero}>
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

            {/* Copy */}
            <div className={styles.detailHeroCopy}>
              <span className={styles.eyebrow}>
                {category?.title || "Servicio"}
              </span>

              <h1 className={styles.title}>{service.title}</h1>

              <p className={styles.subtitle}>{service.heroDescription}</p>

              <HeroBullets items={heroBullets} />

              <div className={styles.heroActions}>
                <Link href="#contacto" className={styles.heroPrimaryCta}>
                  Consultar este servicio
                  <IconArrow />
                </Link>
                <Link href="#que-incluye" className={styles.heroSecondaryCta}>
                  Ver qué incluye
                </Link>
              </div>

              {highlights.length > 0 && (
                <div className={styles.tags}>
                  {highlights.slice(0, 4).map((item) => (
                    <span key={item} className={styles.tag}>{item}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Visual card */}
            <aside
              className={styles.serviceHeroVisual}
              aria-label="Resumen del servicio"
            >
              <div className={styles.visualTop}>
                <span className={styles.visualStatus}>Servicio activo</span>
                <span className={styles.visualCode}>
                  {String(service.id).slice(0, 3).toUpperCase()}
                </span>
              </div>

              <div className={styles.visualCore}>
                <div className={styles.visualCoreText}>
                  <p className={styles.visualCoreCategory}>
                    {category?.title || "Solución IT"}
                  </p>
                  <strong>{service.title}</strong>
                  {service.heroDescription && (
                    <p className={styles.visualCoreDesc}>
                      {service.heroDescription}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.visualMetrics}>
                {includes.length > 0 && (
                  <div>
                    <span>{includes.length}</span>
                    <small>Incluye</small>
                  </div>
                )}
                {benefits.length > 0 && (
                  <div>
                    <span>{benefits.length}</span>
                    <small>Beneficios</small>
                  </div>
                )}
                <div>
                  <span>01</span>
                  <small>Consulta inicial</small>
                </div>
              </div>

              {results.length > 0 && (
                <div className={styles.visualList}>
                  {results.slice(0, 3).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <div className={styles.detailBody}>

        {/* Intro */}
        {service.info?.intro && (
          <section className={styles.detailSection}>
            <div className={styles.container}>
              <p className={styles.detailServiceIntro}>{service.info.intro}</p>
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════
            2. QUÉ INCLUYE
        ══════════════════════════════════════════ */}
        {includes.length > 0 && (
          <>
            <div className={styles.divider} />
            <section
              id="que-incluye"
              className={styles.detailSection}
              aria-labelledby="lbl-includes"
            >
              <div className={styles.container}>
                <div className={styles.detailSectionHeader}>
                  <p className={styles.sectionLabel} id="lbl-includes">
                    Qué incluye este servicio
                  </p>
                  <h2 className={styles.detailSectionTitle}>
                    Todo lo que obtenés al contratar
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    Cada servicio de SKN tiene un alcance definido para que
                    sepas exactamente en qué consiste lo que estás contratando.
                  </p>
                </div>

                <div className={styles.detailIncludesGrid}>
                  <IncludesCard items={includes} />

                  {results.length > 0 && (
                    <div className={styles.detailResultBox}>
                      <p className={styles.detailBlockLabel}>Resultado esperado</p>
                      <ul className={styles.detailCheckList}>
                        {results.map((item) => (
                          <li key={item} className={styles.detailCheckItem}>
                            <IconCheck />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ══════════════════════════════════════════
            3. PROBLEMAS QUE RESOLVEMOS
        ══════════════════════════════════════════ */}
        {problems.length > 0 && (
          <>
            <div className={styles.divider} />
            <section
              className={styles.detailSection}
              aria-labelledby="lbl-problems"
            >
              <div className={styles.container}>
                <div className={styles.detailSectionHeader}>
                  <p className={styles.sectionLabel} id="lbl-problems">
                    Problemas que resolvemos
                  </p>
                  <h2 className={styles.detailSectionTitle}>
                    ¿Tu empresa enfrenta alguno de estos problemas?
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    Este servicio fue diseñado para atacar situaciones concretas
                    que afectan la operación diaria.
                  </p>
                </div>
                <div className={styles.detailProblemsGrid}>
                  {problems.map((item) => (
                    <ProblemCard key={item} text={item} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ══════════════════════════════════════════
            4. BENEFICIOS
        ══════════════════════════════════════════ */}
        {benefits.length > 0 && (
          <>
            <div className={styles.divider} />
            <section
              className={styles.detailSection}
              aria-labelledby="lbl-benefits"
            >
              <div className={styles.container}>
                <div className={styles.detailSectionHeader}>
                  <p className={styles.sectionLabel} id="lbl-benefits">
                    Beneficios para tu empresa
                  </p>
                  <h2 className={styles.detailSectionTitle}>
                    Qué ganás al trabajar con SKN
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    Más allá de la tecnología, lo que importa es el impacto
                    real en tu operación y en tu equipo.
                  </p>
                </div>
                <div className={styles.detailBenefitsGrid}>
                  {benefits.map((item) => (
                    <BenefitCard key={item} text={item} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ══════════════════════════════════════════
            5. CÓMO TRABAJAMOS
        ══════════════════════════════════════════ */}
        <>
          <div className={styles.divider} />
          <section
            className={styles.detailSection}
            aria-labelledby="lbl-process"
          >
            <div className={styles.container}>
              <div className={styles.detailProcessLayout}>
                <div className={styles.detailProcessHeader}>
                  <p className={styles.sectionLabel} id="lbl-process">
                    Cómo trabajamos
                  </p>
                  <h2 className={styles.detailSectionTitle}>
                    El proceso después de que nos contactás
                  </h2>
                  <p className={styles.detailSectionDesc}>
                    Trabajamos con un enfoque claro para que siempre sepas en
                    qué etapa estás y qué viene después.
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
          </section>
        </>

        {/* ══════════════════════════════════════════
            6. IDEAL PARA
        ══════════════════════════════════════════ */}
        {idealFor.length > 0 && (
          <>
            <div className={styles.divider} />
            <section
              className={styles.detailSection}
              aria-labelledby="lbl-ideal"
            >
              <div className={styles.container}>
                <div className={styles.detailIdealLayout}>
                  <div>
                    <p className={styles.sectionLabel} id="lbl-ideal">
                      Ideal para
                    </p>
                    <h2 className={styles.detailSectionTitle}>
                      ¿Este servicio es para tu empresa?
                    </h2>
                    <p className={styles.detailSectionDesc}>
                      Trabajamos principalmente con empresas que reconocen
                      alguna de estas situaciones.
                    </p>
                  </div>
                  <div className={styles.detailIdealChips}>
                    {idealFor.map((item) => (
                      <IdealChip key={item} text={item} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ══════════════════════════════════════════
            7. ASPECTOS CLAVE (cards numeradas)
        ══════════════════════════════════════════ */}
        {hasKeyCards && (
          <>
            <div className={styles.divider} />
            <section className={styles.detailSection}>
              <div className={styles.container}>
                <p className={styles.sectionLabel}>Aspectos clave del servicio</p>
                <div className={styles.cardsGrid}>
                  {service.cards.map((card, i) => (
                    <article key={card.title} className={styles.keyCard}>
                      <span className={styles.keyCardNum} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className={styles.keyCardTitle}>{card.title}</h3>
                      <p className={styles.keyCardText}>{card.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ══════════════════════════════════════════
            8. SERVICIOS RELACIONADOS
        ══════════════════════════════════════════ */}
        {limitedRelated.length > 0 && (
          <>
            <div className={styles.divider} />
            <section className={styles.detailSection}>
              <div className={styles.container}>
                <p className={styles.sectionLabel}>
                  Servicios que complementan esta solución
                </p>
                <div className={styles.relatedGrid}>
                  {limitedRelated.map((item) => (
                    <article key={item.id} className={styles.relatedCard}>
                      <h3 className={styles.relatedTitle}>{item.title}</h3>
                      <p className={styles.relatedText}>{item.shortDescription}</p>
                      <Link
                        href={`/servicios/${item.slug}`}
                        className={styles.relatedLink}
                      >
                        Ver servicio <span aria-hidden="true">↗</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ══════════════════════════════════════════
            9. CIERRE + FORMULARIO
        ══════════════════════════════════════════ */}
        <div className={styles.divider} />
        <section id="contacto" className={styles.detailSection}>
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
        </section>

      </div>
    </main>
  );
}