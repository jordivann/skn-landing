import styles from "./LogoMark.module.css";

type Props = {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "trace" | "idle";
  label?: string;
  className?: string;
  opposite?: boolean;
};

export default function LogoMark({
  size = "md",
  variant = "trace",
  label = "Marca SKN",
  className = "",
  opposite = false,
}: Props) {
  return (
    <div
      className={`${styles.wrap} ${styles[size]} ${styles[variant]} ${
        opposite ? styles.opposite : ""
      } ${className}`}
      role="img"
      aria-label={label}
    >
      {/* <span className={styles.shine} aria-hidden="true" /> */}

      {/* Logo normal (para tema claro) */}
      <img className={`${styles.logoPng} ${styles.logoLight}`} src="/SKN-logo.png" alt="" aria-hidden="true" />

      {/* Logo blanco (para tema oscuro) */}
      <img className={`${styles.logoPng} ${styles.logoDark}`} src="/SKN-logo-blanco.png" alt="" aria-hidden="true" />
    </div>
  );
}
