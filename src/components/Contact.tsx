import Section, { type SectionVariant } from "./Section";
import styles from "./Contact.module.css";
import { site } from "../lib/site";

export default function Contact({
  variant = "invert",
}: {
  variant?: SectionVariant;
}) {
  return (
    <Section
      id="contact"
      title=""
      subtitle=""
      variant={variant}
      surfaceClassName={styles.surface}
    >
      <div className={styles.layout}>
        {/* MAPA */}
        <div className={styles.mapWrap} aria-label="Mapa">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27229.815807562714!2d-64.20300358916019!3d-31.4491825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a246ddaef005%3A0xeb247e51452379bf!2sSKN%20IT!5e0!3m2!1sen!2sar!4v1768334868628!5m2!1sen!2sar" width="100%" height="100%"  loading="lazy"></iframe>
          <div className={styles.mapFx} aria-hidden="true" />
        </div>

        {/* INFO */}
        <div className={styles.info}>
          <p className={styles.kicker}>CONTACTO</p>

          <h3 className={styles.h3}>Hablemos</h3>
          <p className={styles.p}>
            Respondemos rápido. Si nos contás 2–3 datos, te devolvemos un plan claro.
          </p>

          <div className={styles.grid}>
            <div className={styles.block}>
              <p className={styles.label}>Dirección</p>
              <p className={styles.value}>{site.contact.address}</p>
            </div>

            <div className={styles.block}>
              <p className={styles.label}>Teléfono</p>
              <a className={styles.valueLink} href={`tel:${site.contact.phone}`}>
                {site.contact.phoneDisplay ?? site.contact.phone}
              </a>
            </div>

            <div className={styles.block}>
              <p className={styles.label}>Horarios</p>
              <p className={styles.value}>{site.contact.hours}</p>
            </div>

            <div className={styles.block}>
              <p className={styles.label}>E-mail</p>
              <a className={styles.valueLink} href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </div>
          </div>

          {/* ✅ UX: 1 CTA principal + 1 secundario */}
          <div className={styles.actions}>
            <a className={styles.ctaPrimary} href={site.contact.whatsapp}>
              WhatsApp directo
            </a>
          </div>

          <p className={styles.note}>
            Si preferís, también podés escribirnos por email y respondemos dentro del horario laboral.
          </p>
        </div>
      </div>
    </Section>
  );
}
