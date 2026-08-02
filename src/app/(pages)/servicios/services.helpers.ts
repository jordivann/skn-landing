import servicesData from "./Services.json";
import type { ServicesJson, Service, Category } from "./types";

const data = servicesData as ServicesJson;

export type HomeServicePillar = {
  id: string;
  num: string;
  title: string;
  desc: string;
  slug: string;
  href: string;
  chips: string[];
  services: {
    id: string;
    title: string;
    slug: string;
    href: string;
  }[];
};

export type NavServiceTreeItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  href: string;
  services: {
    id: string;
    title: string;
    slug: string;
    href: string;
  }[];
};

export function getAllServicesData(): ServicesJson {
  return data;
}

export function getAllCategories(): Category[] {
  return data.categories;
}

export function getAllServices(): Service[] {
  return data.services;
}

export function getCategoryById(categoryId: string): Category | undefined {
  return data.categories.find((category) => category.id === categoryId);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((category) => category.slug === slug);
}

export function getServiceById(serviceId: string): Service | undefined {
  return data.services.find((service) => service.id === serviceId);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return data.services.find((service) => service.slug === slug);
}

export function getServicesByCategory(categoryId: string): Service[] {
  const category = getCategoryById(categoryId);

  if (!category) {
    return data.services.filter((service) => service.category === categoryId);
  }

  return category.services
    .map((serviceId) => getServiceById(serviceId))
    .filter((service): service is Service => Boolean(service));
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedServices
    .map((serviceId) => getServiceById(serviceId))
    .filter((relatedService): relatedService is Service => Boolean(relatedService));
}

export function getHomeServicePillars(): HomeServicePillar[] {
  return data.categories
    .map((category, index) => {
      const categoryServices = getServicesByCategory(category.id);

      return {
        id: category.id,
        num: String(index + 1).padStart(2, "0"),
        title: category.title,
        desc: category.description,
        slug: category.slug,
        href: `/servicios#${category.id}`,
        chips: buildCategoryChips(categoryServices),
        services: categoryServices.slice(0, 4).map((service) => ({
          id: service.id,
          title: service.title,
          slug: service.slug,
          href: `/servicios/${service.slug}`,
        })),
      };
    })
    .filter((pillar) => pillar.services.length > 0);
}

export function getNavServicesTree(): NavServiceTreeItem[] {
  return data.categories
    .map((category) => {
      const categoryServices = getServicesByCategory(category.id);

      return {
        id: category.id,
        title: category.title,
        slug: category.slug,
        description: category.description,
        href: `/servicios#${category.id}`,
        services: categoryServices.map((service) => ({
          id: service.id,
          title: service.title,
          slug: service.slug,
          href: `/servicios/${service.slug}`,
        })),
      };
    })
    .filter((item) => item.services.length > 0);
}

function buildCategoryChips(services: Service[]): string[] {
  const highlights = services.flatMap((service) => service.highlights ?? []);

  return [...new Set(highlights)].slice(0, 3);
}