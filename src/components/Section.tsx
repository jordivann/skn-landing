// Section.tsx
import styles from "./Section.module.css";
import type { ReactNode } from "react";

export type SectionVariant = "default" | "soft" | "tight" | "invert";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  variant?: SectionVariant;
  children: ReactNode;
  surfaceClassName?: string; // ✅ nuevo
};

export default function Section({
  id,
  title,
  subtitle,
  variant = "default",
  children,
  surfaceClassName = "",
}: Props) {
  return (
    <section id={id} className={`${styles.section} ${styles[variant] || ""}`}>
      <div className="container">
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </header>

        <div className={`${styles.surface} ${surfaceClassName}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
