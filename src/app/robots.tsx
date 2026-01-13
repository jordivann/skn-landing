export const dynamic = "force-static";

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // 👇 Ajustá estas URLs a tus secciones reales si querés.
  const urls = [
    { loc: `${base}/`, priority: "1.0" },
    { loc: `${base}/#services`, priority: "0.8" },
    { loc: `${base}/#about`, priority: "0.7" },
    { loc: `${base}/#process`, priority: "0.7" },
    { loc: `${base}/#faq`, priority: "0.6" },
    { loc: `${base}/#contact`, priority: "0.9" },
  ];

  const now = new Date().toISOString();

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (u) =>
          `<url>` +
          `<loc>${escapeXml(u.loc)}</loc>` +
          `<lastmod>${now}</lastmod>` +
          `<changefreq>weekly</changefreq>` +
          `<priority>${u.priority}</priority>` +
          `</url>`
      )
      .join("") +
    `</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
