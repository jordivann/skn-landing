import Section, { type SectionVariant } from "./Section";
import styles from "./Contact.module.css";
import { site } from "../lib/site";
import { getHomeContent } from "../app/home.helpers";

const { contact } = getHomeContent();

export default function Contact({
  variant = "invert",
}: {
  variant?: SectionVariant;
}) {
  const mapBadge = `${site.address.city}, ${site.address.country}`;

  return (
    <Section
      id="contacto"
      title=""
      subtitle=""
      variant={variant}
      surfaceClassName={styles.surface}
    >
      <div className={styles.layout}>
        <div className={styles.mapWrap} aria-label="Ubicación en mapa">
          <iframe
            className={styles.map}
            src={site.contact.mapsEmbedUrl}
            width="100%"
            height="100%"
            loading="lazy"
            title={`Ubicación ${site.name}`}
          />
          <div className={styles.mapFx} aria-hidden="true" />

          <div className={styles.mapBadge} aria-hidden="true">
            <span className={styles.mapBadgeDot} />
            {mapBadge}
          </div>
        </div>

        <div className={styles.info}>
          <p className={styles.kicker}>{contact.kicker}</p>
          <h3 className={styles.h3}>{contact.title}</h3>
          <p className={styles.p}>{contact.description}</p>

          <div className={styles.grid}>
            {[
              { label: "Dirección", value: site.address.street, href: undefined },
              {
                label: "Teléfono",
                value: site.contact.phoneDisplay ?? site.contact.phone,
                href: `tel:${site.contact.phone}`,
              },
              { label: "Horarios", value: site.contact.hours, href: undefined },
              {
                label: "E-mail",
                value: site.contact.email,
                href: `mailto:${site.contact.email}`,
              },
            ].map(({ label, value, href }) => (
              <div key={label} className={styles.block}>
                <p className={styles.label}>{label}</p>
                {href ? (
                  <a className={styles.valueLink} href={href}>
                    {value}
                  </a>
                ) : (
                  <p className={styles.value}>{value}</p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <a
              className={styles.ctaPrimary}
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.primaryCtaLabel}
            </a>

            <a className={styles.ctaGhost} href="/contacto">
              {contact.secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}