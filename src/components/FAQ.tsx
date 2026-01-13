import Section, { type SectionVariant } from "./Section";
import styles from "./FAQ.module.css";

export const faqItems = [
  { q: "¿Trabajan con empresas pequeñas?", a: "Sí. Ajustamos alcance y presupuesto sin perder prolijidad." },
  { q: "¿Cómo es la respuesta ante urgencias?", a: "Definimos SLA según acuerdo. También atendemos urgencias puntuales." },
  { q: "¿Ofrecen mantenimiento mensual?", a: "Sí. Planes con monitoreo, preventivo y soporte." },
];

export default function FAQ({ variant = "default" }: { variant?: SectionVariant }) {
  return (
    <Section
      id="faq"
      title="Preguntas frecuentes"
      subtitle="Respuestas claras. Cero vueltas."
      variant={variant}
    >
      <div className={styles.list}>
        {faqItems.map((x) => (
          <details key={x.q} className={`card ${styles.item}`}>
            <summary className={styles.summary}>{x.q}</summary>
            <p className={styles.p}>{x.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
