import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Política de privacidad de SKN IT.",
};

export default function PrivacidadPage() {
  return (
    <main style={styles.page}>
      <section style={styles.wrap}>
        <p style={styles.eyebrow}>Legal</p>
        <h1 style={styles.title}>Política de privacidad</h1>
        <p style={styles.lead}>
          En SKN IT valoramos la privacidad de quienes visitan nuestro sitio y
          se contactan con nosotros. Esta política explica qué datos podemos
          recibir, cómo los usamos y qué medidas tomamos para protegerlos.
        </p>

        <div style={styles.card}>
          <section style={styles.block}>
            <h2 style={styles.h2}>1. Información que podemos recopilar</h2>
            <p style={styles.p}>
              Podemos recibir datos que el usuario proporciona de forma
              voluntaria al completar formularios de contacto, solicitar
              información o comunicarse con nosotros. Estos datos pueden incluir
              nombre, correo electrónico, teléfono, empresa y cualquier otra
              información que el usuario decida compartir.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>2. Uso de la información</h2>
            <p style={styles.p}>
              La información recopilada se utiliza exclusivamente para responder
              consultas, brindar información sobre nuestros servicios, mejorar la
              atención y mantener una comunicación comercial o técnica cuando
              corresponda.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>3. Conservación y protección</h2>
            <p style={styles.p}>
              Adoptamos medidas razonables para proteger la información contra
              accesos no autorizados, pérdida, alteración o divulgación
              indebida. Aun así, ninguna transmisión por internet es
              completamente infalible, por lo que no podemos garantizar una
              seguridad absoluta.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>4. Compartición de datos</h2>
            <p style={styles.p}>
              No vendemos ni cedemos información personal a terceros, salvo que
              exista obligación legal o que sea estrictamente necesario para
              prestar un servicio solicitado por el usuario.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>5. Cookies y métricas</h2>
            <p style={styles.p}>
              Este sitio puede utilizar cookies u otras tecnologías similares
              para mejorar la experiencia de navegación, analizar tráfico y
              optimizar el funcionamiento general de la página.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>6. Derechos del usuario</h2>
            <p style={styles.p}>
              El usuario puede solicitar la actualización, corrección o
              eliminación de sus datos personales, en la medida en que resulte
              aplicable según la normativa vigente.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>7. Cambios en esta política</h2>
            <p style={styles.p}>
              Podemos actualizar esta política para reflejar cambios legales,
              técnicos o comerciales. La versión publicada en este sitio será la
              vigente en cada momento.
            </p>
          </section>

          <section style={styles.block}>
            <h2 style={styles.h2}>8. Contacto</h2>
            <p style={styles.p}>
              Para cualquier consulta relacionada con privacidad o tratamiento de
              datos, podés comunicarte con SKN IT a través de los canales de
              contacto publicados en este sitio.
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