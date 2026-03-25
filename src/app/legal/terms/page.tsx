import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos",
  description: "Términos y condiciones de uso de SKN IT.",
};

export default function TerminosPage() {
  return (
    <main style={styles.page}>
      <section style={styles.wrap}>
        <p style={styles.eyebrow}>Legal</p>
        <h1 style={styles.title}>Términos y condiciones</h1>
        <p style={styles.lead}>
          Estos términos regulan el acceso y uso del sitio web de SKN IT. Al
          navegar este sitio, el usuario acepta las condiciones aquí
          establecidas.
        </p>

        <div style={styles.card}>
          <section style={styles.block}>
            <h2 style={styles.h2}>1. Uso del sitio</h2>
            <p style={styles.p}>
              El usuario se compromete a utilizar este sitio de manera lícita,
              responsable y respetuosa, evitando cualquier acción que pueda
              afectar su funcionamiento, seguridad o contenido.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>2. Información publicada</h2>
            <p style={styles.p}>
              El contenido del sitio tiene carácter informativo y puede ser
              actualizado, modificado o eliminado sin previo aviso. SKN IT no
              garantiza que toda la información publicada sea exhaustiva o esté
              permanentemente actualizada.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>3. Propiedad intelectual</h2>
            <p style={styles.p}>
              Los textos, diseños, marcas, logotipos, imágenes y demás
              materiales incluidos en este sitio pertenecen a SKN IT o se
              utilizan con autorización. No está permitido reproducir,
              distribuir o utilizar estos contenidos sin autorización previa.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>4. Enlaces y servicios de terceros</h2>
            <p style={styles.p}>
              Este sitio puede contener enlaces a plataformas o servicios de
              terceros. SKN IT no se responsabiliza por el contenido, políticas
              o funcionamiento de dichos sitios externos.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>5. Limitación de responsabilidad</h2>
            <p style={styles.p}>
              SKN IT no será responsable por daños directos o indirectos
              derivados del uso o imposibilidad de uso del sitio, ni por errores
              técnicos, interrupciones o fallas ajenas a su control razonable.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>6. Contacto comercial y contratación</h2>
            <p style={styles.p}>
              La información publicada en este sitio no constituye por sí misma
              una oferta contractual definitiva. Cualquier servicio brindado por
              SKN IT quedará sujeto a evaluación, alcance, presupuesto y
              aceptación expresa entre las partes.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>7. Modificaciones</h2>
            <p style={styles.p}>
              SKN IT podrá modificar estos términos en cualquier momento. La
              versión publicada en el sitio será la válida y vigente.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>8. Legislación aplicable</h2>
            <p style={styles.p}>
              Estos términos se interpretan conforme a la normativa aplicable en
              la jurisdicción correspondiente, salvo disposición legal en
              contrario.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--fg)",
    padding: "120px 20px 72px",
  },
  wrap: {
    width: "min(920px, 100%)",
    margin: "0 auto",
  },
  eyebrow: {
    margin: 0,
    marginBottom: 12,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--primary2)",
  },
  title: {
    margin: 0,
    marginBottom: 16,
    fontSize: "clamp(2rem, 4vw, 3.4rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
  },
  lead: {
    margin: 0,
    marginBottom: 28,
    maxWidth: 760,
    fontSize: 17,
    lineHeight: 1.65,
    color: "var(--muted)",
  },
  card: {
    border: "1px solid var(--border)",
    borderRadius: 24,
    background: "color-mix(in srgb, var(--card) 86%, transparent)",
    padding: "28px 22px",
    boxShadow: "var(--shadow-soft, var(--shadow))",
  },
  block: {
    marginBottom: 24,
  },
  h2: {
    margin: "0 0 10px 0",
    fontSize: 20,
    lineHeight: 1.2,
  },
  p: {
    margin: 0,
    fontSize: 15.5,
    lineHeight: 1.75,
    color: "var(--muted)",
  },
};