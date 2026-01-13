import { site } from "../lib/site";

type FAQItem = { question: string; answer: string };

export default function SeoJsonLd({ faq }: { faq?: FAQItem[] }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    sameAs: [site.socials.instagram].filter(Boolean),
  };

  const faqSchema =
    faq && faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((x) => ({
            "@type": "Question",
            name: x.question,
            acceptedAnswer: { "@type": "Answer", text: x.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
