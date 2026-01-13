import { site } from "../lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/legal/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/legal/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
