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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27229.815807562714!2d-64.20300358916019!3d-31.4491825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a246ddaef005%3A0xeb247e51452379bf!2sSKN%20IT!5e0!3m2!1sen!2sar!4v1768334868628!5m2!1sen!2sar"
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
              { label: "Dirección",  value: site.contact.address,                    href: undefined },
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