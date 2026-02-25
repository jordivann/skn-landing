import Section, { type SectionVariant } from "./Section";
import styles from "./Contact.module.css";
import { site } from "../lib/site";

export default function Contact({ variant = "invert" }: { variant?: SectionVariant }) {
  return (
    <Section
      id="contacto"
      title=""
      subtitle=""
      variant={variant}
      surfaceClassName={styles.surface}
    >
      <div className={styles.layout}>

        {/* ── MAPA ── */}
        <div className={styles.mapWrap} aria-label="Ubicación en mapa">
          <iframe
            className={styles.map}
            src={site.contact.mapsEmbedUrl}
            width="100%"
            height="100%"
            loading="lazy"
            title="Ubicación SKN IT"
          />
          <div className={styles.mapFx} aria-hidden="true" />

          {/* Badge sobre el mapa */}
          <div className={styles.mapBadge} aria-hidden="true">
            <span className={styles.mapBadgeDot} />
            Córdoba, Argentina
          </div>
        </div>

        {/* ── INFO ── */}
        <div className={styles.info}>
          <p className={styles.kicker}>Contacto</p>
          <h3 className={styles.h3}>Hablemos</h3>
          <p className={styles.p}>
            Contanos qué necesitás y te devolvemos un diagnóstico con alcance claro.
          </p>

          {/* Datos de contacto */}
          <div className={styles.grid}>
            {[
              { label: "Dirección",  value: site.address.street,                    href: undefined },
              { label: "Teléfono",   value: site.contact.phoneDisplay ?? site.contact.phone, href: `tel:${site.contact.phone}` },
              { label: "Horarios",   value: site.contact.hours,                       href: undefined },
              { label: "E-mail",     value: site.contact.email,                       href: `mailto:${site.contact.email}` },
            ].map(({ label, value, href }) => (
              <div key={label} className={styles.block}>
                <p className={styles.label}>{label}</p>
                {href ? (
                  <a className={styles.valueLink} href={href}>{value}</a>
                ) : (
                  <p className={styles.value}>{value}</p>
                )}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className={styles.actions}>
            <a className={styles.ctaPrimary} href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp directo
            </a>
            <a className={styles.ctaGhost} href="/contacto">
              Ver más formas de contacto →
            </a>
          </div>
        </div>

      </div>
    </Section>
  );
}