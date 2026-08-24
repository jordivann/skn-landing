import Section, { type SectionVariant } from "./Section";
import styles from "./FAQ.module.css";
import { getHomeContent } from "../app/home.helpers";

export type FAQItem = {
  q: string;
  a: string;
};

const { faq } = getHomeContent();

export const faqItems: FAQItem[] = faq.items.map((item) => ({
  q: item.question,
  a: item.answer,
}));

type FAQProps = {
  variant?: SectionVariant;
  items?: FAQItem[];
};

export default function FAQ({
  variant = "default",
  items = faqItems,
}: FAQProps) {
  return (
    <Section
      id="faq"
      title={faq.title}
      subtitle={faq.subtitle}
      variant={variant}
    >
      <div className={styles.list}>
        {items.map((item, index) => (
          <details key={`${index}-${item.q}`} className={`card ${styles.item}`}>
            <summary className={styles.summary}>{item.q}</summary>
            <p className={styles.p}>{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}