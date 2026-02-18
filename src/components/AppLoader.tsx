import styles from "./AppLoader.module.css";
import BrandMark from "./BrandMark";

export default function AppLoader({ hint = "Preparando interfaz…" }: { hint?: string }) {
  return (
    <div className={styles.backdrop} role="status" aria-live="polite" aria-label="Cargando aplicación">
      <div className={styles.panel}>

        <div className={styles.brand}>
          <BrandMark size="lg" variant="trace" label="Cargando SKN" />
        </div>

        <p className={styles.hint}>{hint}</p>

        {/* Barra de progreso indeterminada */}
        <div className={styles.track} aria-hidden="true">
          <span className={styles.fill} />
        </div>

        {/* Puntos de actividad */}
        <div className={styles.dots} aria-hidden="true">
          <span /><span /><span />
        </div>

      </div>
    </div>
  );
}