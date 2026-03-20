import { notFound } from "next/navigation";
import servicesData from "../Services.json";
import ServiceDetailPage from "../ServiceDetailPage";
import type { ServicesJson } from "../types";

const data = servicesData as ServicesJson;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return data.services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  const service = data.services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = data.services.filter((item) =>
    service.relatedServices.includes(item.id)
  );

  const category = data.categories.find((cat) => cat.id === service.category);

  return (
    <ServiceDetailPage
      service={service}
      relatedServices={relatedServices}
      category={category ?? null}
    />
  );
}