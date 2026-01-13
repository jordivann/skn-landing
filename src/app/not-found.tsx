export default function NotFound() {
  return (
    <main className="container" style={{ padding: "80px 0" }}>
      <h1>Página no encontrada</h1>
      <p style={{ color: "var(--muted)" }}>La URL no existe o fue movida.</p>
      <a className="btn" href="/">Volver al inicio</a>
    </main>
  );
}
