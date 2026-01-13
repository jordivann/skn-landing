import styles from "./Footer.module.css";
import { site } from "../lib/site";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <strong>{site.name}</strong>
          <p className={styles.p}>
            {site.address.city}, {site.address.region} — {site.address.country}
          </p>
        </div>

        <div className={styles.links}>
          <a href="/legal/privacy">Privacidad</a>
          <a href="/legal/terms">Términos</a>
        </div>

        <small className={styles.small}>
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
}
