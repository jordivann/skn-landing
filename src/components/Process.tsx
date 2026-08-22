import Section, { type SectionVariant } from "./Section";
import styles from "./Process.module.css";
import { getHomeContent } from "../app/home.helpers";

const { process } = getHomeContent();

export default function Process({
  variant = "default",
}: {
  variant?: SectionVariant;
}) {
  return (
    <Section
      id="process"
      title={process.title}
      subtitle={process.subtitle}
      variant={variant}
    >
      <div className={styles.grid}>
        {process.steps.map((step, index) => (
          <div key={`${index}-${step.title}`} className={`card ${styles.step}`}>
            <div className={styles.top}>
              <span className={styles.n}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.h3}>{step.title}</h3>
            </div>
            <p className={styles.p}>{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}