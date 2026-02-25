import styles from "./Header.module.css";
import { site } from "../lib/site";
// import BrandMark from "./BrandMark";
import Nav from "./Nav";
import LogoMark from "./LogoMark";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="/" aria-label={site.name}>
          <LogoMark size="xs"  label="SKN" />
        </a>

        <Nav />
      </div>
    </header>
  );
}
