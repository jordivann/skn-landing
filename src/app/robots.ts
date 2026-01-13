import type { MetadataRoute } from "next";
import { site } from "../lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = site.url; // asegurate que sea un string válido (ver nota abajo)

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
