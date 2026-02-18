import styles from "./LogoMark.module.css";

type Props = {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "trace" | "idle";
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
    <div className={`${styles.wrap} ${styles[size]} ${styles[variant]} ${className}`} role="img" aria-label={label}>
      <span className={styles.shine} aria-hidden="true" />
      <img className={styles.logoPng} src="/SKN-logo-blanco.png" alt="" />
    </div>
  );
}
