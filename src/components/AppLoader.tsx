"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./AppLoader.module.css";
import BrandMark from "./BrandMark";

type Props = {
  hint?: string;                 // si lo pasás, pisa el hint inteligente
  leaving?: boolean;             // para fade-out controlado desde el Gate
  showProgress?: boolean;        // mostrar % (default true)
  appName?: string;              // para aria y label (default "SKN")
};

const STEPS = [
  { at: 0, text: "Preparando interfaz…" },
  { at: 650, text: "Cargando módulos…" },
  { at: 1400, text: "Ajustando detalles…" },
  { at: 2600, text: "Optimizando experiencia…" },
  { at: 4200, text: "Esto está tardando más de lo normal…" },
];

export default function AppLoader({
  hint,
  leaving = false,
  showProgress = true,
  appName = "SKN",
}: Props) {
  const [elapsed, setElapsed] = useState(0);

  // reloj liviano para hints/progreso
  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      setElapsed(performance.now() - start);
    }, 120);
    return () => window.clearInterval(id);
  }, []);

  // progreso "creíble": rápido a 70, lento a 92, y se queda
  const progress = useMemo(() => {
    const ms = elapsed;

    if (ms < 700) return Math.min(70, (ms / 700) * 70);
    if (ms < 2500) return 70 + Math.min(22, ((ms - 700) / 1800) * 22);
    return 92 + Math.min(7, ((ms - 2500) / 2500) * 7); // 92 → 99
  }, [elapsed]);

  const smartHint = useMemo(() => {
    if (hint) return hint;
    let current = STEPS[0].text;
    for (const s of STEPS) if (elapsed >= s.at) current = s.text;
    return current;
  }, [hint, elapsed]);

  const showHelpActions = elapsed > 4500; // umbral de “demora”
  const showHardReload = elapsed > 6500;  // si ya es sospechoso

  return (
    <div
      className={`${styles.backdrop} ${leaving ? styles.isLeaving : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Cargando aplicación ${appName}`}
    >
      <div className={styles.panel}>
        <div className={styles.brand}>
          <BrandMark size="lg" variant="trace" label={`Cargando ${appName}`} />
        </div>

        <p className={styles.hint}>{smartHint}</p>

        {/* Progreso percibido (mejora fuerte de UX) */}
        {showProgress && (
          <div className={styles.progressRow} aria-hidden="true">
            <span className={styles.progressLabel}>Cargando</span>
            <span className={styles.progressPct}>{Math.round(progress)}%</span>
          </div>
        )}

        {/* Track: indeterminado + “percibido” (se combinan) */}
        <div className={styles.track} aria-hidden="true">
          <span className={styles.fill} />
          {showProgress && (
            <span
              className={styles.meter}
              style={{ width: `${Math.min(99, Math.round(progress))}%` }}
            />
          )}
        </div>

        {/* Puntos de actividad */}
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        {/* Si tarda: opciones útiles (sin dramatizar) */}
        {showHelpActions && (
          <div className={styles.help}>
            <p className={styles.helpText}>
              Si esto tarda, podés recargar. A veces es caché o red lenta.
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.btn}
                onClick={() => window.location.reload()}
              >
                Recargar
              </button>

              {showHardReload && (
                <button
                  type="button"
                  className={styles.btnGhost}
                  onClick={() => {
                    // hard reload (cuando aplica)
                    window.location.href = window.location.href;
                  }}
                >
                  Recarga completa
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
