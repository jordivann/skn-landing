import Section, { type SectionVariant } from "./Section";
import styles from "./FAQ.module.css";
import homeContent from "../app/HomeContent.json";

export type FAQItem = {
  q: string;
  a: string;
};

type JsonFAQItem = {
  question: string;
  answer: string;
};

export const faqItems: FAQItem[] = (homeContent.faqs as JsonFAQItem[]).map(
  (item) => ({
    q: item.question,
    a: item.answer,
  })
);

type FAQProps = {
  variant?: SectionVariant;
  items?: FAQItem[];
};

export default function FAQ({ variant = "default", items = faqItems }: FAQProps) {
  return (
    <Section
      id="faq"
      title="Preguntas frecuentes"
      subtitle="Respuestas claras. Cero vueltas."
      variant={variant}
    >
      <div className={styles.list}>
        {items.map((item) => (
          <details key={item.q} className={`card ${styles.item}`}>
            <summary className={styles.summary}>{item.q}</summary>
            <p className={styles.p}>{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}