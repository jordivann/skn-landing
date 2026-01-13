import styles from "./BrandMark.module.css";

export type BrandMarkVariant = "trace" | "idle";
export type BrandMarkSize = "xs" | "sm" | "md" | "lg";

type Props = {
  size?: BrandMarkSize;
  variant?: BrandMarkVariant;
  label?: string;
  className?: string;
};

export default function BrandMark({
  size = "md",
  variant = "trace",
  label = "Marca SKN",
  className = "",
}: Props) {
  return (
    <div
      className={`${styles.wrap} ${styles[size]} ${styles[variant]} ${className}`}
      role="img"
      aria-label={label}
    >
      {/* Logo monoline tech: trazo animado */}
      <svg
        className={styles.svg}
        viewBox="0 0 220 56"
        width="220"
        height="56"
        aria-hidden="true"
      >
        {/* Glow (capa suave) */}
        <g className={styles.glow}>
          <path d="M20 16H62M20 16v12c0 6 6 8 12 8h18c6 0 12 2 12 8v12H20" />
          <path d="M88 12v32M88 28l26-16M88 28l30 28" />
          <path d="M136 44V12l44 32V12" />
        </g>

        {/* Trazo principal */}
        <g className={styles.stroke}>
          {/* S */}
          <path d="M20 16H62M20 16v12c0 6 6 8 12 8h18c6 0 12 2 12 8v12H20" />
          {/* K */}
          <path d="M88 12v32M88 28l26-16M88 28l30 28" />
          {/* N */}
          <path d="M136 44V12l44 32V12" />
        </g>
      </svg>

      {/* Tagline opcional (solo para loader grande) */}
      {/* <span className={styles.tag} aria-hidden="true">
        LOADING
      </span> */}
    </div>
  );
}
