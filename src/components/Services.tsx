"use client";

import Section from "./Section";
import styles from "./Services.module.css";

type Pillar = {
  id: string;
  title: string;
  desc: string;
  image: string;
  href: string; // ancla a sub-servicios
};

type Service = {
  id: string;
  pillar: "support" | "consulting" | "security" | "more";
  title: string;
  desc: string;
  bullets: string[];
};

const pillars: Pillar[] = [
  {
    id: "pillar-support",
    title: "Mantenimiento y soporte técnico",
    desc: "Mesa de ayuda, mantenimiento preventivo y continuidad operativa.",
    image: "/hero-3.jpg",
    href: "#support",
  },
  {
    id: "pillar-security",
    title: "Seguridad de información",
    desc: "Evaluaciones, hardening, accesos, backups y recuperación.",
    image: "/hero-2.webp",
    href: "#security",
  },
  {
    id: "pillar-consulting",
    title: "Consultoría e implementación",
    desc: "Redes, instalaciones, factibilidad y mejora de gestión IT.",
    image: "/hero-1.jpg", // si querés, reemplazala por otra foto más “real”
    href: "#consulting",
  },
];

const services: Service[] = [
  // SUPPORT
  {
    id: "support-1",
    pillar: "support",
    title: "Mesa de ayuda y mantenimiento",
    desc: "Incidencias, seguimiento y mantenimiento preventivo con trazabilidad.",
    bullets: ["Ticketing", "Preventivo", "Reportes"],
  },
  {
    id: "support-2",
    pillar: "support",
    title: "Relevamiento de hardware y software",
    desc: "Inventario de inversión IT y comunicaciones. Licencias, hardware y software.",
    bullets: ["Inventario", "Licencias", "Estado"],
  },

  // SECURITY
  {
    id: "security-1",
    pillar: "security",
    title: "Soluciones de backup",
    desc: "Backups con foco en recuperación real, retención y monitoreo.",
    bullets: ["3-2-1", "Restore", "Alertas"],
  },
  {
    id: "security-2",
    pillar: "security",
    title: "Hardening y control de accesos",
    desc: "Ajuste de configuraciones, permisos y políticas para reducir superficie de ataque.",
    bullets: ["Hardening", "Accesos", "Políticas"],
  },

  // CONSULTING
  {
    id: "consulting-1",
    pillar: "consulting",
    title: "Instalaciones",
    desc: "Diseño, instalación y certificación de cableado estructurado, fibra y Wi-Fi.",
    bullets: ["Cableado", "Fibra", "Wi-Fi"],
  },
  {
    id: "consulting-2",
    pillar: "consulting",
    title: "Estudios de factibilidad",
    desc: "Evaluamos alternativas para proyectos de telecomunicaciones e infraestructura.",
    bullets: ["Opciones", "Costos", "Roadmap"],
  },
  {
    id: "consulting-3",
    pillar: "consulting",
    title: "Diseño e implementación de redes",
    desc: "Estabilidad y performance. Segmentación, optimización y escalabilidad.",
    bullets: ["VLAN", "Performance", "Escalabilidad"],
  },
  {
    id: "consulting-4",
    pillar: "consulting",
    title: "Análisis de gestión IT",
    desc: "Orden de procesos y herramientas para operar con trazabilidad y mejora continua.",
    bullets: ["Procesos", "Documentación", "Métricas"],
  },
];

export default function Services() {
  const grouped = {
    support: services.filter((s) => s.pillar === "support"),
    security: services.filter((s) => s.pillar === "security"),
    consulting: services.filter((s) => s.pillar === "consulting"),
  };

  return (
    <Section
      id="services"
      title="Servicios"
      subtitle="Tres pilares claros. El detalle aparece cuando lo necesitás."
    >
      {/* PILARES */}
      <div className={styles.pillars} aria-label="Servicios troncales">
        {pillars.map((p) => (
          <a key={p.id} className={styles.pillar} href={p.href}>
            <img className={styles.pillarImg} src={p.image} alt="" aria-hidden="true" />
            <div className={styles.pillarFx} aria-hidden="true" />
            <div className={styles.pillarBody}>
              <p className={styles.pillarKicker}>Servicio troncal</p>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarDesc}>{p.desc}</p>
              <span className={styles.pillarLink}>Conocer más →</span>
            </div>
          </a>
        ))}
      </div>

      {/* DETALLE POR PILAR (sin repetir títulos enormes) */}
      <div className={styles.detail}>
        <h3 id="support" className={styles.detailTitle}>
          Soporte y mantenimiento
        </h3>
        <div className={styles.grid}>
          {grouped.support.map((s) => (
            <FlipCard key={s.id} service={s} />
          ))}
        </div>

        <h3 id="security" className={styles.detailTitle}>
          Seguridad
        </h3>
        <div className={styles.grid}>
          {grouped.security.map((s) => (
            <FlipCard key={s.id} service={s} />
          ))}
        </div>

        <h3 id="consulting" className={styles.detailTitle}>
          Consultoría e implementación
        </h3>
        <div className={styles.grid}>
          {grouped.consulting.map((s) => (
            <FlipCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function FlipCard({ service }: { service: Service }) {
  return (
    <article className={styles.card} role="listitem">
      <div className={styles.inner}>
        {/* FRONT */}
        <div className={styles.front}>
          <header className={styles.head}>
            <div className={styles.icon} aria-hidden="true" />
            <h4 className={styles.h4}>{service.title}</h4>
          </header>

          <ul className={styles.bullets} aria-label={`Puntos clave de ${service.title}`}>
            {service.bullets.map((b) => (
              <li key={b} className={styles.bullet}>
                {b}
              </li>
            ))}
          </ul>

          <p className={styles.hint} aria-hidden="true">
            Hover para ver detalle
          </p>
        </div>

        {/* BACK */}
        <div className={styles.back} aria-label={`Detalle de ${service.title}`}>
          <p className={styles.backTitle}>Detalle</p>
          <p className={styles.desc}>{service.desc}</p>
        </div>
      </div>
    </article>
  );
}
