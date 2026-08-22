import type { ServicesJson } from "./types";

const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateStringArray(
  value: unknown,
  path: string,
  errors: string[],
  required = false
) {
  if (value === undefined) {
    if (required) errors.push(`${path}: falta la propiedad.`);
    return;
  }

  if (!Array.isArray(value)) {
    errors.push(`${path}: debe ser un array.`);
    return;
  }

  value.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      errors.push(`${path}[${index}]: debe ser un texto no vacío.`);
    }
  });
}

function requireString(obj: UnknownRecord, key: string, path: string, errors: string[]) {
  if (!isNonEmptyString(obj[key])) {
    errors.push(`${path}.${key}: debe existir y contener texto.`);
  }
}

export function validateServicesData(input: unknown): ServicesJson {
  const errors: string[] = [];

  if (!isRecord(input)) {
    throw new Error("Services.json: el contenido raíz debe ser un objeto JSON.");
  }

  const categories = input.categories;
  const services = input.services;

  if (!Array.isArray(categories)) {
    errors.push("categories: debe ser un array.");
  }

  if (!Array.isArray(services)) {
    errors.push("services: debe ser un array.");
  }

  if (errors.length) throwValidationError(errors);

  const categoryIds = new Set<string>();
  const categorySlugs = new Set<string>();

  (categories as unknown[]).forEach((rawCategory, index) => {
    const path = `categories[${index}]`;

    if (!isRecord(rawCategory)) {
      errors.push(`${path}: debe ser un objeto.`);
      return;
    }

    requireString(rawCategory, "id", path, errors);
    requireString(rawCategory, "title", path, errors);
    requireString(rawCategory, "slug", path, errors);
    requireString(rawCategory, "description", path, errors);

    const id = rawCategory.id;
    const slug = rawCategory.slug;

    if (isNonEmptyString(id)) {
      if (!SAFE_SLUG.test(id)) {
        errors.push(`${path}.id: "${id}" debe usar sólo minúsculas, números y guiones.`);
      }
      if (categoryIds.has(id)) errors.push(`${path}.id: "${id}" está duplicado.`);
      categoryIds.add(id);
    }

    if (isNonEmptyString(slug)) {
      if (!SAFE_SLUG.test(slug)) {
        errors.push(`${path}.slug: "${slug}" debe usar sólo minúsculas, números y guiones.`);
      }
      if (categorySlugs.has(slug)) errors.push(`${path}.slug: "${slug}" está duplicado.`);
      categorySlugs.add(slug);
    }

    if ("services" in rawCategory) {
      errors.push(
        `${path}.services: esta propiedad ya no debe existir. Los servicios se agrupan automáticamente mediante service.category.`
      );
    }
  });

  const serviceIds = new Set<string>();
  const serviceSlugs = new Set<string>();
  const serviceRecords: Array<{ value: UnknownRecord; path: string }> = [];

  (services as unknown[]).forEach((rawService, index) => {
    const path = `services[${index}]`;

    if (!isRecord(rawService)) {
      errors.push(`${path}: debe ser un objeto.`);
      return;
    }

    serviceRecords.push({ value: rawService, path });

    requireString(rawService, "id", path, errors);
    requireString(rawService, "title", path, errors);
    requireString(rawService, "slug", path, errors);
    requireString(rawService, "category", path, errors);
    requireString(rawService, "shortDescription", path, errors);
    requireString(rawService, "heroDescription", path, errors);

    const id = rawService.id;
    const slug = rawService.slug;
    const category = rawService.category;

    if (isNonEmptyString(id)) {
      if (!SAFE_SLUG.test(id)) {
        errors.push(`${path}.id: "${id}" debe usar sólo minúsculas, números y guiones.`);
      }
      if (serviceIds.has(id)) errors.push(`${path}.id: "${id}" está duplicado.`);
      serviceIds.add(id);
    }

    if (isNonEmptyString(slug)) {
      if (!SAFE_SLUG.test(slug)) {
        errors.push(`${path}.slug: "${slug}" debe usar sólo minúsculas, números y guiones.`);
      }
      if (serviceSlugs.has(slug)) errors.push(`${path}.slug: "${slug}" está duplicado.`);
      serviceSlugs.add(slug);
    }

    if (isNonEmptyString(category) && !categoryIds.has(category)) {
      errors.push(`${path}.category: la categoría "${category}" no existe en categories[].id.`);
    }

    validateStringArray(rawService.highlights, `${path}.highlights`, errors);
    validateStringArray(rawService.relatedServices, `${path}.relatedServices`, errors);

    if (rawService.info !== undefined) {
      if (!isRecord(rawService.info)) {
        errors.push(`${path}.info: debe ser un objeto.`);
      } else {
        const info = rawService.info;
        if (info.intro !== undefined && !isNonEmptyString(info.intro)) {
          errors.push(`${path}.info.intro: debe ser texto no vacío si se incluye.`);
        }
        validateStringArray(info.includes, `${path}.info.includes`, errors);
        validateStringArray(info.problemsSolved, `${path}.info.problemsSolved`, errors);
        validateStringArray(info.process, `${path}.info.process`, errors);
        validateStringArray(info.idealFor, `${path}.info.idealFor`, errors);
        validateStringArray(info.benefits, `${path}.info.benefits`, errors);
        validateStringArray(info.results, `${path}.info.results`, errors);
        validateStringArray(info.brands, `${path}.info.brands`, errors);
        validateStringArray(info.useCases, `${path}.info.useCases`, errors);
      }
    }

    if (rawService.cards !== undefined) {
      if (!Array.isArray(rawService.cards)) {
        errors.push(`${path}.cards: debe ser un array.`);
      } else {
        rawService.cards.forEach((card, cardIndex) => {
          const cardPath = `${path}.cards[${cardIndex}]`;
          if (!isRecord(card)) {
            errors.push(`${cardPath}: debe ser un objeto.`);
            return;
          }
          requireString(card, "title", cardPath, errors);
          requireString(card, "description", cardPath, errors);
        });
      }
    }

    if (!isRecord(rawService.contact)) {
      errors.push(`${path}.contact: es obligatorio y debe ser un objeto.`);
    } else {
      requireString(rawService.contact, "title", `${path}.contact`, errors);
      requireString(rawService.contact, "description", `${path}.contact`, errors);
    }
  });

  // Validamos relaciones después de conocer todos los IDs.
  serviceRecords.forEach(({ value, path }) => {
    if (!Array.isArray(value.relatedServices)) return;

    const ownId = isNonEmptyString(value.id) ? value.id : "";
    const seen = new Set<string>();

    value.relatedServices.forEach((relatedId, index) => {
      if (!isNonEmptyString(relatedId)) return;
      const relPath = `${path}.relatedServices[${index}]`;

      if (!serviceIds.has(relatedId)) {
        errors.push(`${relPath}: el servicio "${relatedId}" no existe.`);
      }
      if (relatedId === ownId) {
        errors.push(`${relPath}: un servicio no puede relacionarse consigo mismo.`);
      }
      if (seen.has(relatedId)) {
        errors.push(`${relPath}: "${relatedId}" está repetido dentro de relatedServices.`);
      }
      seen.add(relatedId);
    });
  });

  if (errors.length) throwValidationError(errors);
  return input as ServicesJson;
}

function throwValidationError(errors: string[]): never {
  const message = [
    "Services.json contiene errores:",
    "",
    ...errors.map((error, index) => `${index + 1}. ${error}`),
    "",
    "Corregí estos puntos antes de publicar.",
  ].join("\n");

  throw new Error(message);
}