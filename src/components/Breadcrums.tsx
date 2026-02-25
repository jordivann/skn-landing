"use client";

import Link from "next/link";
import styles from "./Breadcrums.module.css";

export type Crumb = {
  label: string;
  href?: string;     // si no hay href, es el item actual
  icon?: React.ReactNode;
};

type Props = {
  items: Crumb[];
  className?: string;
  variant?: "soft" | "solid";
};

export default function Breadcrumbs({ items, className = "", variant = "soft" }: Props) {
  // JSON-LD (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.label,
      ...(c.href ? { item: c.href } : {}),
    })),
  };

  return (
    <>
      <nav
        className={`${styles.wrap} ${styles[variant]} ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className={styles.list}>
          {items.map((c, i) => {
            const isLast = i === items.length - 1;

            return (
              <li key={`${c.label}-${i}`} className={styles.item}>
                {i !== 0 && <span className={styles.sep} aria-hidden="true">/</span>}

                {c.href && !isLast ? (
                  <Link className={styles.link} href={c.href}>
                    {c.icon ? <span className={styles.icon}>{c.icon}</span> : null}
                    <span>{c.label}</span>
                  </Link>
                ) : (
                  <span className={styles.current} aria-current="page">
                    {c.icon ? <span className={styles.icon}>{c.icon}</span> : null}
                    <span>{c.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* JSON-LD (ideal para SEO). Si no querés, lo sacás. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
