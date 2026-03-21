import type { Metadata } from "next";
import "./globals.css";
import { site } from "../lib/site";
import { ThemeProvider } from "../context/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.titleDefault, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: site.titleDefault,
    description: site.description,
    siteName: site.name,
    locale: site.locale,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.titleDefault,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem("skn_theme");
    const theme = stored === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}