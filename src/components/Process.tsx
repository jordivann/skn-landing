import Section, { type SectionVariant } from "./Section";
import styles from "./Process.module.css";

const steps = [
  { n: "01", t: "Diagnóstico", d: "Relevamos situación actual y definimos prioridades." },
  { n: "02", t: "Plan", d: "Propuesta concreta: alcance, tiempos, riesgos y medidas." },
  { n: "03", t: "Implementación", d: "Ejecución ordenada, sin cortar operación si se puede evitar." },
  { n: "04", t: "Seguimiento", d: "Documentación, mejoras y monitoreo según necesidad." },
];

export default function Process({ variant = "default" }: { variant?: SectionVariant }) {
  return (
    <Section
      id="process"
      title="Proceso"
      subtitle="Una forma de trabajar profesional, repetible y medible."
      variant={variant}
    >
      <div className={styles.grid}>
        {steps.map((s) => (
          <div key={s.n} className={`card ${styles.step}`}>
            <div className={styles.top}>
              <span className={styles.n}>{s.n}</span>
              <h3 className={styles.h3}>{s.t}</h3>
            </div>
            <p className={styles.p}>{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
