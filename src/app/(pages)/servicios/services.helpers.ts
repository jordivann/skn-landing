import servicesData from "./Services.json";
import type { ServicesJson, Service, Category } from "./types";

const data = servicesData as ServicesJson;

export type HomeServicePillar = {
  id: string;
  num: string;
  title: string;
  desc: string;
  chips: string[];
  services: {
    title: string;
    slug: string;
  }[];
};

const categoryOrder: Record<string, string> = {
  support: "01",
  security: "02",
  consulting: "03",
  development: "04",
};

export function getAllServicesData() {
  return data;
}

export function getServicesByCategory(categoryId: string): Service[] {
  return data.services.filter((service) => service.category === categoryId);
}

export function getCategoryById(categoryId: string): Category | undefined {
  return data.categories.find((category) => category.id === categoryId);
}

export function getHomeServicePillars(): HomeServicePillar[] {
  return data.categories.map((category) => {
    const categoryServices = getServicesByCategory(category.id);

    return {
      id: category.id,
      num: categoryOrder[category.id] ?? "00",
      title: category.title,
      desc: category.description,
      chips: buildCategoryChips(categoryServices),
      services: categoryServices.slice(0, 4).map((service) => ({
        title: service.title,
        slug: service.slug,
      })),
    };
  });
}

function buildCategoryChips(services: Service[]): string[] {
  const highlights = services.flatMap((service) => service.highlights || []);
  return [...new Set(highlights)].slice(0, 3);
}




export function getNavServicesTree() {
  return data.categories.map((category) => ({
    id: category.id,
    title: category.title,
    slug: category.slug,
    description: category.description,
    href: `/servicios#${category.slug}`,
    services: data.services
      .filter((service) => service.category === category.id)
      .map((service) => ({
        id: service.id,
        title: service.title,
        slug: service.slug,
        href: `/servicios/${service.slug}`,
      })),
  }));
}