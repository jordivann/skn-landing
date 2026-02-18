"use client";

import { useMemo, useState, useEffect } from "react";
import styles from "./ServicesPage.module.css";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type PillarKey = "support" | "security" | "consulting";

interface Pillar {
  key: PillarKey;
  num: string;
  title: string;
  desc: string;
  chips: string[];
  color: string;
}

interface Service {
  id: string;
  pillar: PillarKey;
  title: string;
  short: string;
  includes: string[];
  outputs: string[];
  steps: string[];
  tags: string[];
  idealFor?: string[];
  slaHint?: string;
}

interface FaqEntry {
  q: string;
  a: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PILLARS: Pillar[] = [
  {
    key: "support",
    num: "01",
    title: "Soporte y\nmantenimiento",
    desc: "Continuidad operativa con seguimiento, prevención y trazabilidad completa.",
    chips: ["Mesa de ayuda", "Preventivo", "Reportes"],
    color: "#E8A44A",
  },
  {
    key: "security",
    num: "02",
    title: "Seguridad de la\ninformación",
    desc: "Reducimos riesgo real: accesos, hardening, backups y recuperación verificada.",
    chips: ["Backups 3-2-1", "Hardening", "Accesos"],
    color: "#5B8CF5",
  },
  {
    key: "consulting",
    num: "03",
    title: "Consultoría e\nimplementación",
    desc: "Infraestructura y redes con diseño, implementación y documentación entregable.",
    chips: ["Cableado / Wi-Fi", "Redes & VLAN", "Gestión IT"],
    color: "#62C07A",
  },
];

const SERVICES: Service[] = [
  {
    id: "s1",
    pillar: "support",
    title: "Mesa de ayuda y mantenimiento",
    short: "Resolución de incidencias + mantenimiento preventivo con trazabilidad.",
    includes: [
      "Canal de soporte (tickets + prioridades)",
      "Resolución remota y coordinación onsite",
      "Mantenimiento preventivo calendarizado",
      "Seguimiento por estado y tiempos",
    ],
    outputs: ["Reporte mensual", "Historial de tickets", "Checklist de preventivo"],
    steps: ["Relevamiento inicial", "Implementación de mesa + reglas", "Operación y mejora continua"],
    tags: ["Ticketing", "Preventivo", "Reportes"],
    idealFor: ["PyMEs", "Sucursales", "Equipos sin IT interno"],
    slaHint: "Tiempos de respuesta según criticidad",
  },
  {
    id: "s2",
    pillar: "support",
    title: "Relevamiento de hardware y software",
    short: "Inventario y estado del parque IT para decidir con datos reales.",
    includes: [
      "Inventario de hardware (PCs, impresoras, red)",
      "Inventario de software y licencias",
      "Detección de obsolescencia y riesgos",
      "Mapa de responsables y dependencias",
    ],
    outputs: ["Inventario exportable", "Matriz de riesgos", "Recomendaciones priorizadas"],
    steps: ["Levantamiento", "Normalización de datos", "Plan de mejoras"],
    tags: ["Inventario", "Licencias", "Estado"],
    idealFor: ["Empresas en crecimiento", "Migraciones", "Ordenar costos IT"],
  },
  {
    id: "s3",
    pillar: "security",
    title: "Soluciones de backup",
    short: 'Backups pensados para recuperar, no para "tener copia".',
    includes: [
      "Estrategia 3-2-1 (según criticidad)",
      "Retención y versiones",
      "Pruebas de restore programadas",
      "Monitoreo + alertas",
    ],
    outputs: ["Política de backup", "Registro de restores", "Tablero de estado"],
    steps: ["Diagnóstico", "Implementación", "Pruebas y monitoreo"],
    tags: ["3-2-1", "Restore", "Alertas"],
    idealFor: ["Datos críticos", "Servidores/ERP", "Riesgo ransomware"],
  },
  {
    id: "s4",
    pillar: "security",
    title: "Hardening y control de accesos",
    short: "Reducimos superficie de ataque con políticas y permisos bien aplicados.",
    includes: [
      "Revisión de roles/permisos y cuentas",
      "MFA donde aplique",
      "Políticas de contraseñas y bloqueo",
      "Ajustes de configuración (endpoint/servidor)",
    ],
    outputs: ["Checklist de hardening", "Matriz de accesos", "Cambios documentados"],
    steps: ["Evaluación", "Aplicación controlada", "Validación y evidencias"],
    tags: ["Hardening", "Accesos", "Políticas"],
    idealFor: ["Empresas con rotación", "Accesos compartidos", "Auditorías"],
  },
  {
    id: "s5",
    pillar: "consulting",
    title: "Instalaciones",
    short: "Diseño e instalación de cableado estructurado, fibra óptica y Wi-Fi.",
    includes: [
      "Diseño de infraestructura (según plano/visita)",
      "Instalación y ordenado",
      "Certificación (si corresponde)",
      "Documentación de la instalación",
    ],
    outputs: ["Plano / as-built", "Etiquetado", "Informe técnico"],
    steps: ["Relevamiento", "Implementación", "Entrega y documentación"],
    tags: ["Cableado", "Fibra", "Wi-Fi"],
  },
  {
    id: "s6",
    pillar: "consulting",
    title: "Estudios de factibilidad",
    short: "Evaluamos alternativas, costos y roadmap antes de ejecutar.",
    includes: [
      "Opciones técnicas comparadas",
      "Estimación de costos y tiempos",
      "Riesgos y dependencias",
      "Roadmap por etapas",
    ],
    outputs: ["Documento de factibilidad", "Roadmap", "Decisión recomendada"],
    steps: ["Recolección de requerimientos", "Análisis", "Presentación ejecutiva"],
    tags: ["Opciones", "Costos", "Roadmap"],
  },
  {
    id: "s7",
    pillar: "consulting",
    title: "Diseño e implementación de redes",
    short: "Red estable y escalable: segmentación, performance y orden real.",
    includes: [
      "Diseño lógico (VLAN, subredes, políticas)",
      "Configuración de equipos (según stack)",
      "Optimización de Wi-Fi (si aplica)",
      "Pruebas y validación",
    ],
    outputs: ["Diagrama de red", "Configuración documentada", "Checklist de pruebas"],
    steps: ["Diseño", "Implementación", "Pruebas + handover"],
    tags: ["VLAN", "Performance", "Escalabilidad"],
  },
  {
    id: "s8",
    pillar: "consulting",
    title: "Análisis de gestión IT",
    short: "Ordenamos procesos y herramientas para operar con métricas.",
    includes: [
      "Revisión de procesos (incidencias, cambios, activos)",
      "Definición de flujo y responsables",
      "Métricas (SLA, tiempos, backlog)",
      "Documentación operativa base",
    ],
    outputs: ["Mapa de procesos", "KPIs sugeridos", "Plantillas/documentación"],
    steps: ["Diagnóstico", "Diseño de operación", "Implementación gradual"],
    tags: ["Procesos", "Documentación", "Métricas"],
  },
];

const FAQ: FaqEntry[] = [
  {
    q: "¿Trabajan por abono mensual o por proyecto?",
    a: "Ambas modalidades. Soporte suele ir por abono (operación continua). Redes, instalaciones y factibilidad suelen ser por proyecto con alcance y entregables definidos.",
  },
  {
    q: "¿Qué información necesitan para cotizar?",
    a: "Cantidad de usuarios y equipos, sucursales, criticidad del servicio, ventanas de mantenimiento disponibles y si existe infraestructura previa (red, servidores, backups).",
  },
  {
    q: "¿Documentan lo que hacen?",
    a: "Sí. Entregamos evidencias y reportes según el servicio: inventarios, diagramas, checklists, políticas, historial de tickets, registros de restore, etc.",
  },
  {
    q: "¿Hacen trabajo remoto y presencial?",
    a: "Ambos. El soporte cotidiano suele ser remoto para agilizar tiempos. Las instalaciones, relevamientos y algunos diagnósticos requieren presencia física.",
  },
];

const PILLAR_LABEL: Record<PillarKey, string> = {
  support: "Soporte",
  security: "Seguridad",
  consulting: "Consultoría",
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Tag({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <span
      className={styles.tag}
      style={
        accent
          ? {
              borderColor: `${accent}50`,
              background: `${accent}18`,
              color: accent,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}

function ServiceCard({ s, index }: { s: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const pillar = PILLARS.find((p) => p.key === s.pillar)!;
  const accent = pillar.color;

  return (
    <article
      className={`${styles.serviceCard} ${open ? styles.serviceCardOpen : ""}`}
      style={
        {
          "--accent": accent,
          animationDelay: `${index * 60}ms`,
        } as React.CSSProperties
      }
      id={s.id}
    >
      {/* Header */}
      <div className={styles.cardHead}>
        <div className={styles.cardMeta}>
          <Tag accent={accent}>{PILLAR_LABEL[s.pillar]}</Tag>
          {s.slaHint && <span className={styles.slaHint}>{s.slaHint}</span>}
        </div>

        <h3 className={styles.cardTitle}>{s.title}</h3>
        <p className={styles.cardShort}>{s.short}</p>

        <div className={styles.tagRow}>
          {s.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>

      {/* Two-col summary */}
      <div className={styles.cardCols}>
        {(
          [
            ["Qué incluye", s.includes],
            ["Qué entregamos", s.outputs],
          ] as [string, string[]][]
        ).map(([label, items]) => (
          <div key={label} className={styles.cardCol}>
            <p className={styles.colKicker} style={{ color: accent }}>
              {label}
            </p>
            <ul className={styles.colList}>
              {items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Expand toggle */}
      <button
        className={styles.expandBtn}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{open ? "Ocultar detalles" : "Ver proceso y para quién es"}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} aria-hidden="true" />
      </button>

      {/* Expanded content */}
      <div
        className={styles.expandBody}
        style={{ maxHeight: open ? 400 : 0 }}
        aria-hidden={!open}
      >
        <div className={styles.expandInner}>
          <div className={styles.expandGrid}>
            <div>
              <p className={styles.colKicker} style={{ color: accent }}>
                Cómo trabajamos
              </p>
              <ol className={styles.stepsList}>
                {s.steps.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </div>

            {s.idealFor && (
              <div>
                <p className={styles.colKicker}>Ideal para</p>
                <ul className={styles.colList}>
                  {s.idealFor.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.cardCtaRow}>
            <a
              className={styles.btnPrimary}
              href="/contacto"
              style={{ background: accent, color: "#0D0D0F" }}
            >
              Pedir diagnóstico →
            </a>
            <a className={styles.btnGhost} href="#faq">
              Ver FAQ
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function FaqItem({ q, a, index }: FaqEntry & { index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <button
        className={styles.faqBtn}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={styles.faqQuestion}>{q}</span>
        <span className={`${styles.faqIcon} ${open ? styles.faqIconOpen : ""}`} aria-hidden="true">
          +
        </span>
      </button>

      <div
        className={styles.faqAnswer}
        style={{ maxHeight: open ? 200 : 0 }}
        aria-hidden={!open}
      >
        <p>{a}</p>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [activePillar, setActivePillar] = useState<PillarKey | "all">("all");
  const [activeSection, setActiveSection] = useState<string>("support");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const okPillar = activePillar === "all" || s.pillar === activePillar;
      const hay = (txt: string) => txt.toLowerCase().includes(q);
      const okQuery =
        !q ||
        hay(s.title) ||
        hay(s.short) ||
        s.tags.some(hay) ||
        s.includes.some(hay);
      return okPillar && okQuery;
    });
  }, [query, activePillar]);

  const counts = useMemo(() => {
    const b = { support: 0, security: 0, consulting: 0 };
    filtered.forEach((s) => b[s.pillar]++);
    return b;
  }, [filtered]);

  // Scroll spy
  useEffect(() => {
    const ids = ["support", "security", "consulting"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "support", label: "Soporte", color: "#E8A44A" },
    { id: "security", label: "Seguridad", color: "#5B8CF5" },
    { id: "consulting", label: "Consultoría", color: "#62C07A" },
    { id: "faq", label: "FAQ", color: "rgba(255,255,255,0.4)" },
  ];

  const filterConfig = [
    { key: "all" as const, label: "Todos", count: filtered.length, color: "#fff" },
    { key: "support" as const, label: "Soporte", count: counts.support, color: "#E8A44A" },
    { key: "security" as const, label: "Seguridad", count: counts.security, color: "#5B8CF5" },
    { key: "consulting" as const, label: "Consultoría", count: counts.consulting, color: "#62C07A" },
  ];

  return (
    <main className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.inner}>

          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Servicios IT</span>
          </div>

          <div className={styles.heroGrid}>
            <div>
              <h1 className={styles.h1}>
                Servicios IT<br />
                <span className={styles.h1Muted}>con entregables</span><br />
                <span className={styles.h1Accent}>claros.</span>
              </h1>
              <p className={styles.heroSub}>
                Soporte, seguridad e infraestructura. Enfoque práctico: resolver, documentar y sostener en el tiempo.
              </p>
              <div className={styles.heroCtas}>
                <a className={styles.btnAmber} href="#catalogo">
                  Ver servicios →
                </a>
                <a className={styles.btnGhost} href="/contacto">
                  Pedir diagnóstico
                </a>
              </div>
            </div>

            <div className={styles.heroStats}>
              {[
                { n: "3", label: "Áreas" },
                { n: "8", label: "Servicios" },
                { n: "∞", label: "Entregables" },
              ].map(({ n, label }) => (
                <div key={n} className={styles.statBox}>
                  <span className={styles.statNum}>{n}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar tiles */}
          <div className={styles.pillarGrid}>
            {PILLARS.map((p) => (
              <a
                key={p.key}
                href={`#${p.key}`}
                className={styles.pillarTile}
                style={{ "--pillar-color": p.color } as React.CSSProperties}
              >
                <span className={styles.pillarNum}>{p.num}</span>
                <h3 className={styles.pillarTitle}>{p.title.replace("\\n", "\n")}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
                <div className={styles.pillarChips}>
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className={styles.pillarChip}
                      style={{
                        borderColor: `${p.color}30`,
                        background: `${p.color}12`,
                        color: p.color,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <span className={styles.pillarArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalogo" className={styles.catalog}>
        <div className={styles.inner}>

          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon} aria-hidden="true">⌕</span>
              <input
                className={styles.search}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar: backup, redes, Wi-Fi, hardening…"
                aria-label="Buscar servicios"
              />
            </div>
            <div className={styles.filters} role="tablist" aria-label="Filtrar por pilar">
              {filterConfig.map((f) => (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={activePillar === f.key}
                  className={`${styles.filterBtn} ${activePillar === f.key ? styles.filterActive : ""}`}
                  style={
                    activePillar === f.key
                      ? ({
                          "--filter-color": f.color,
                        } as React.CSSProperties)
                      : undefined
                  }
                  onClick={() => setActivePillar(f.key)}
                  type="button"
                >
                  {f.label}
                  <span className={styles.filterCount}>{f.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Two-col layout */}
          <div className={styles.layout}>

            {/* Sticky sidebar */}
            <aside className={styles.side}>
              <nav className={styles.sideNav} aria-label="Navegación por sección">
                <p className={styles.sideNavTitle}>Ir a</p>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`${styles.sideNavLink} ${activeSection === item.id ? styles.sideNavLinkActive : ""}`}
                    style={
                      activeSection === item.id
                        ? ({
                            "--nav-color": item.color,
                          } as React.CSSProperties)
                        : undefined
                    }
                  >
                    <span
                      className={styles.sideNavDot}
                      style={
                        activeSection === item.id
                          ? { background: item.color }
                          : undefined
                      }
                    />
                    {item.label}
                  </a>
                ))}

                <div className={styles.sideCta}>
                  <a className={styles.btnAmber} href="/contacto">
                    Pedir diagnóstico
                  </a>
                  <p className={styles.sideCtaHint}>
                    Propuesta concreta con entregables.
                  </p>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className={styles.content}>
              {PILLARS.map((p) => {
                const group = filtered.filter((s) => s.pillar === p.key);
                return (
                  <section
                    key={p.key}
                    id={p.key}
                    className={styles.group}
                    aria-label={p.title.replace("\n", " ")}
                  >
                    <div className={styles.groupHeader}>
                      <span className={styles.groupNum}>{p.num}</span>
                      <div>
                        <h2 className={styles.h2}>
                          {p.title.replace("\\n", " ")}
                        </h2>
                        <p className={styles.groupDesc}>{p.desc}</p>
                      </div>
                      <span
                        className={styles.groupCount}
                        style={{
                          borderColor: `${p.color}30`,
                          background: `${p.color}12`,
                          color: p.color,
                        }}
                      >
                        {group.length} {group.length === 1 ? "servicio" : "servicios"}
                      </span>
                    </div>

                    {group.length > 0 ? (
                      <div className={styles.serviceGrid}>
                        {group.map((s, i) => (
                          <ServiceCard key={s.id} s={s} index={i} />
                        ))}
                      </div>
                    ) : (
                      <div className={styles.emptyState}>
                        No hay servicios que coincidan con tu búsqueda.
                      </div>
                    )}
                  </section>
                );
              })}

              {/* How we work */}
              <section className={styles.howSection} aria-label="Cómo trabajamos">
                <p className={styles.sectionEyebrow}>Proceso</p>
                <h2 className={styles.h2}>Cómo trabajamos</h2>
                <div className={styles.howGrid}>
                  {[
                    {
                      n: "01",
                      title: "Diagnóstico",
                      body: "Relevamos el contexto y priorizamos lo crítico para evitar interrupciones desde el inicio.",
                    },
                    {
                      n: "02",
                      title: "Propuesta",
                      body: "Alcance, entregables, tiempos y responsabilidades documentados. Sin ambigüedades.",
                    },
                    {
                      n: "03",
                      title: "Implementación",
                      body: "Ejecutamos y documentamos todo. Queda medible, mantenible y transferible.",
                    },
                  ].map((step) => (
                    <div key={step.n} className={styles.howStep}>
                      <span className={styles.howStepNum}>{step.n}</span>
                      <h3 className={styles.howStepTitle}>{step.title}</h3>
                      <p className={styles.howStepBody}>{step.body}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.howCtas}>
                  <a className={styles.btnAmber} href="/contacto">
                    Pedir diagnóstico →
                  </a>
                  <a className={styles.btnGhost} href="#catalogo">
                    Volver al catálogo
                  </a>
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className={styles.faqSection} aria-label="Preguntas frecuentes">
                <p className={styles.sectionEyebrow}>FAQ</p>
                <h2 className={styles.h2}>Preguntas frecuentes</h2>
                <div className={styles.faqList}>
                  {FAQ.map((item, i) => (
                    <FaqItem key={i} {...item} index={i} />
                  ))}
                </div>
              </section>

              {/* Final CTA */}
              <section className={styles.finalCta} aria-label="Contacto" id="contact">
                <p className={styles.sectionEyebrow}>Siguiente paso</p>
                <h2 className={styles.finalH2}>¿Lo vemos juntos?</h2>
                <p className={styles.finalBody}>
                  Contanos qué querés resolver y te devolvemos un diagnóstico con alcance y entregables concretos.
                </p>
                <div className={styles.finalCtaBtns}>
                  <a className={styles.btnAmberLg} href="/contacto">
                    Ir a contacto →
                  </a>
                  <a className={styles.btnGhostLg} href="#catalogo">
                    Revisar servicios
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}