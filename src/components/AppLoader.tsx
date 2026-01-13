import styles from "./AppLoader.module.css";
import BrandMark from "./BrandMark";

export default function AppLoader({ hint = "Preparando interfaz…" }: { hint?: string }) {
  return (
    <div className={styles.backdrop} role="status" aria-live="polite">
      <div className={styles.panel}>
        <BrandMark size="lg" variant="trace" label="Cargando SKN" />
        <p className={styles.hint}>{hint}</p>

        <div className={styles.bar} aria-hidden="true">
          <span className={styles.barFill} />
        </div>
      </div>
    </div>
  );
}
