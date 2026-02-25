"use client";

import Section from "./Section";
import styles from "./Services.module.css";

const PILLARS = [
  {
    id: "support",
    num: "01",
    title: "Soporte y mantenimiento",
    desc: "Mesa de ayuda, mantenimiento preventivo y trazabilidad operativa.",
    chips: ["Ticketing", "Preventivo", "Reportes"],
    services: ["Mesa de ayuda", "Relevamiento IT"],
  },
  {
    id: "security",
    num: "02",
    title: "Seguridad de la información",
    desc: "Backups reales, hardening y control de accesos para reducir riesgo.",
    chips: ["Backups 3-2-1", "Hardening", "Accesos"],
    services: ["Soluciones de backup", "Hardening y accesos"],
  },
  {
    id: "consulting",
    num: "03",
    title: "Consultoría e implementación",
    desc: "Redes, instalaciones y gestión IT con documentación entregable.",
    chips: ["Redes & VLAN", "Cableado / Wi-Fi", "Gestión IT"],
    services: ["Instalaciones", "Diseño de redes", "Factibilidad", "Gestión IT"],
  },
];

export default function Services() {
  return (
    <Section
      id="services"
      title="Servicios"
      subtitle="Soporte, seguridad e infraestructura. Alcance y entregables definidos desde el inicio."
    >
      <div className={styles.grid}>
        {PILLARS.map((p) => (
          <article key={p.id} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.num}>{p.num}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>
            </div>

            <ul className={styles.serviceList} aria-label={`Servicios de ${p.title}`}>
              {p.services.map((s) => (
                <li key={s} className={styles.serviceItem}>
                  <span className={styles.serviceIcon} aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            <div className={styles.chips}>
              {p.chips.map((c) => (
                <span key={c} className={styles.chip}>{c}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.cta}>
        <a className={`btn btnPrimary ${styles.ctaBtn}`} href="/servicios">
          Ver todos los servicios →
        </a>
        <a className={`btn ${styles.ctaGhost}`} href="#contacto">
          Pedir diagnóstico
        </a>
      </div>
    </Section>
  );
}