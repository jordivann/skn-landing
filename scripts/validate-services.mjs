import fs from "node:fs";
import path from "node:path";

const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const candidates = [
  process.env.SERVICES_JSON_PATH,
  path.resolve(process.cwd(), "src/app/(pages)/servicios/Services.json"),
  path.resolve(process.cwd(), "app/pages/servicios/Services.json"),
  path.resolve(process.cwd(), "src/app/pages/services/Services.json"),
  path.resolve(process.cwd(), "app/pages/services/Services.json"),
].filter(Boolean);

const jsonPath = candidates.find((candidate) => fs.existsSync(candidate));

if (!jsonPath) {
  console.error("❌ No encontré Services.json.");
  console.error("Definí SERVICES_JSON_PATH o revisá la ubicación del archivo.");
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
} catch (error) {
  console.error(`❌ ${path.relative(process.cwd(), jsonPath)} no es JSON válido.`);
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const errors = [];
const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const isText = (v) => typeof v === "string" && v.trim().length > 0;

function requireText(obj, key, at) {
  if (!isText(obj?.[key])) errors.push(`${at}.${key}: debe existir y contener texto.`);
}

function textArray(value, at) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    errors.push(`${at}: debe ser un array.`);
    return;
  }
  value.forEach((item, i) => {
    if (!isText(item)) errors.push(`${at}[${i}]: debe ser texto no vacío.`);
  });
}

if (!isObject(data)) errors.push("raíz: debe ser un objeto JSON.");
if (!Array.isArray(data?.categories)) errors.push("categories: debe ser un array.");
if (!Array.isArray(data?.services)) errors.push("services: debe ser un array.");

const categoryIds = new Set();
const categorySlugs = new Set();

if (Array.isArray(data?.categories)) {
  data.categories.forEach((category, i) => {
    const at = `categories[${i}]`;
    if (!isObject(category)) {
      errors.push(`${at}: debe ser un objeto.`);
      return;
    }

    ["id", "title", "slug", "description"].forEach((key) => requireText(category, key, at));

    if (isText(category.id)) {
      if (!SAFE_SLUG.test(category.id)) errors.push(`${at}.id: "${category.id}" tiene formato inválido.`);
      if (categoryIds.has(category.id)) errors.push(`${at}.id: "${category.id}" está duplicado.`);
      categoryIds.add(category.id);
    }

    if (isText(category.slug)) {
      if (!SAFE_SLUG.test(category.slug)) errors.push(`${at}.slug: "${category.slug}" tiene formato inválido.`);
      if (categorySlugs.has(category.slug)) errors.push(`${at}.slug: "${category.slug}" está duplicado.`);
      categorySlugs.add(category.slug);
    }

    if (Object.hasOwn(category, "services")) {
      errors.push(`${at}.services: eliminar esta propiedad; ahora se usa service.category automáticamente.`);
    }
  });
}

const serviceIds = new Set();
const serviceSlugs = new Set();

if (Array.isArray(data?.services)) {
  data.services.forEach((service, i) => {
    const at = `services[${i}]`;
    if (!isObject(service)) {
      errors.push(`${at}: debe ser un objeto.`);
      return;
    }

    ["id", "title", "slug", "category", "shortDescription", "heroDescription"].forEach((key) =>
      requireText(service, key, at)
    );

    if (isText(service.id)) {
      if (!SAFE_SLUG.test(service.id)) errors.push(`${at}.id: "${service.id}" tiene formato inválido.`);
      if (serviceIds.has(service.id)) errors.push(`${at}.id: "${service.id}" está duplicado.`);
      serviceIds.add(service.id);
    }

    if (isText(service.slug)) {
      if (!SAFE_SLUG.test(service.slug)) errors.push(`${at}.slug: "${service.slug}" tiene formato inválido.`);
      if (serviceSlugs.has(service.slug)) errors.push(`${at}.slug: "${service.slug}" está duplicado.`);
      serviceSlugs.add(service.slug);
    }

    if (isText(service.category) && !categoryIds.has(service.category)) {
      errors.push(`${at}.category: "${service.category}" no existe en categories[].id.`);
    }

    textArray(service.highlights, `${at}.highlights`);
    textArray(service.relatedServices, `${at}.relatedServices`);

    if (service.info !== undefined) {
      if (!isObject(service.info)) {
        errors.push(`${at}.info: debe ser un objeto.`);
      } else {
        if (service.info.intro !== undefined && !isText(service.info.intro)) {
          errors.push(`${at}.info.intro: debe ser texto no vacío si se incluye.`);
        }
        ["includes", "problemsSolved", "process", "idealFor", "benefits", "results", "brands", "useCases"].forEach((key) =>
          textArray(service.info[key], `${at}.info.${key}`)
        );
      }
    }

    if (service.cards !== undefined) {
      if (!Array.isArray(service.cards)) {
        errors.push(`${at}.cards: debe ser un array.`);
      } else {
        service.cards.forEach((card, ci) => {
          const cat = `${at}.cards[${ci}]`;
          if (!isObject(card)) {
            errors.push(`${cat}: debe ser un objeto.`);
            return;
          }
          requireText(card, "title", cat);
          requireText(card, "description", cat);
        });
      }
    }

    if (!isObject(service.contact)) {
      errors.push(`${at}.contact: es obligatorio y debe ser un objeto.`);
    } else {
      requireText(service.contact, "title", `${at}.contact`);
      requireText(service.contact, "description", `${at}.contact`);
    }
  });

  // Segunda pasada: validar relaciones cuando ya conocemos todos los IDs.
  data.services.forEach((service, i) => {
    if (!isObject(service) || !Array.isArray(service.relatedServices)) return;
    const at = `services[${i}].relatedServices`;
    const seen = new Set();

    service.relatedServices.forEach((relatedId, ri) => {
      if (!isText(relatedId)) return;
      if (!serviceIds.has(relatedId)) errors.push(`${at}[${ri}]: "${relatedId}" no existe.`);
      if (relatedId === service.id) errors.push(`${at}[${ri}]: un servicio no puede relacionarse consigo mismo.`);
      if (seen.has(relatedId)) errors.push(`${at}[${ri}]: "${relatedId}" está repetido.`);
      seen.add(relatedId);
    });
  });
}

if (errors.length) {
  console.error(`\n❌ Services.json contiene ${errors.length} error(es):\n`);
  errors.forEach((error, i) => console.error(`${i + 1}. ${error}`));
  console.error("\nCorregí estos puntos antes de publicar.\n");
  process.exit(1);
}

console.log(`✅ Services.json válido: ${data.categories.length} categorías, ${data.services.length} servicios.`);
