import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "../ServiceDetailPage";
import {
  getAllServices,
  getCategoryById,
  getRelatedServices,
  getServiceBySlug,
} from "../services.helpers";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Sólo existen URLs de servicios declaradas en Services.json.
export const dynamicParams = false;

// Cada servicio agregado al JSON genera automáticamente su página al hacer build.
export function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }));
}

// SEO derivado del mismo JSON: no hay que mantener metadata en otro archivo.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const category = getCategoryById(service.category) ?? null;
  const relatedServices = getRelatedServices(service);

  return (
    <ServiceDetailPage
      service={service}
      category={category}
      relatedServices={relatedServices}
    />
  );
}
