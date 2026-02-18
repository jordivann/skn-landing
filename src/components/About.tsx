import Section from "./Section";
import styles from "./About.module.css";
import LogoMark from "./LogoMark";

export default function About() {
  return (
    <Section
      id="about"
      title="Quiénes somos"
      subtitle="Experiencia real, ejecución prolija y foco en continuidad operativa."
      variant="invert"
      surfaceClassName={styles.aboutSurface}
    >
      <div className={styles.layout}>
        {/* Brand / bloque limpio */}
        <aside className={styles.brandPane} aria-label="Marca SKN IT">
          <div className={styles.brandInner}>
            <span className={styles.brandRule} aria-hidden="true" />
            <LogoMark
              // variant="idle"
              size="lg"
              opposite
            />
          </div>
        </aside>

        {/* Copy */}
        <div className={styles.copy}>
          <p className={styles.lead}>
            Somos una empresa con más de <strong>15 años</strong> en el rubro informático,
            dedicada a la provisión de productos y servicios de telecomunicaciones e infraestructura tecnológica.
          </p>

          <p className={styles.p}>
            Diseñamos, implementamos y mantenemos redes de todo tipo. Gracias a nuestro equipo de profesionales y
            experiencia, aseguramos <strong>alta calidad</strong> en instalaciones y mantenimientos.
          </p>

          <p className={styles.p}>
            Nuestra visión es ser el <strong>socio y asesor tecnológico</strong> que nuestros clientes desean,
            para garantizar un éxito duradero y mejora continua en cada organización.
          </p>
        </div>
      </div>
    </Section>
  );
}
