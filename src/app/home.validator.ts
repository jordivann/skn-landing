import type { HomeContent, HomeTone } from "./home.types";

const VALID_TONES = new Set<HomeTone>(["neutral", "violet", "cyan", "green"]);
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const nonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validHref = (value: unknown): value is string =>
  nonEmptyString(value) &&
  (value.startsWith("/") || value.startsWith("#") || value.startsWith("https://"));

const validImage = (value: unknown): value is string =>
  nonEmptyString(value) &&
  (value.startsWith("/") || value.startsWith("https://"));

function validateStringArray(
  value: unknown,
  path: string,
  errors: string[],
  required = false
) {
  if (value === undefined && !required) return;

  if (!Array.isArray(value)) {
    errors.push(`${path}: debe ser un array.`);
    return;
  }

  value.forEach((item, index) => {
    if (!nonEmptyString(item)) {
      errors.push(`${path}[${index}]: debe ser un texto no vacío.`);
    }
  });
}

function validateCta(value: unknown, path: string, errors: string[]) {
  if (!isObject(value)) {
    errors.push(`${path}: debe ser un objeto con label y href.`);
    return;
  }

  if (!nonEmptyString(value.label)) {
    errors.push(`${path}.label: es obligatorio.`);
  }

  if (!validHref(value.href)) {
    errors.push(`${path}.href: debe comenzar con /, # o https://.`);
  }
}

export function validateHomeContent(input: unknown): HomeContent {
  const errors: string[] = [];

  if (!isObject(input)) {
    throw new Error("HomeContent.json debe contener un objeto JSON.");
  }

  [
    "heroSlides",
    "stats",
    "faqs",
    "partners",
    "clients",
    "imageCarouselGuide",
    "imageSources",
    "generalImageRecommendation",
  ].forEach((key) => {
    if (key in input) {
      errors.push(`${key}: pertenece a la estructura anterior. Usá HomeContent v2.`);
    }
  });

  if (!isObject(input.hero)) {
    errors.push("hero: es obligatorio.");
  } else {
    validateStringArray(input.hero.trustPoints, "hero.trustPoints", errors);
    validateCta(input.hero.secondaryCta, "hero.secondaryCta", errors);

    if (!Array.isArray(input.hero.slides) || input.hero.slides.length === 0) {
      errors.push("hero.slides: debe contener al menos un slide.");
    } else {
      const ids = new Set<string>();

      input.hero.slides.forEach((slide, index) => {
        const path = `hero.slides[${index}]`;

        if (!isObject(slide)) {
          errors.push(`${path}: debe ser un objeto.`);
          return;
        }

        if (!nonEmptyString(slide.id) || !ID_RE.test(slide.id)) {
          errors.push(`${path}.id: usar minúsculas, números y guiones.`);
        } else if (ids.has(slide.id)) {
          errors.push(`${path}.id: "${slide.id}" está duplicado.`);
        } else {
          ids.add(slide.id);
        }

        if (!nonEmptyString(slide.title)) errors.push(`${path}.title: es obligatorio.`);
        if (!nonEmptyString(slide.subtitle)) errors.push(`${path}.subtitle: es obligatorio.`);

        if (
          slide.tone !== undefined &&
          (!nonEmptyString(slide.tone) || !VALID_TONES.has(slide.tone as HomeTone))
        ) {
          errors.push(`${path}.tone: debe ser neutral, violet, cyan o green.`);
        }

        validateCta(slide.cta, `${path}.cta`, errors);

        if (!isObject(slide.image)) {
          errors.push(`${path}.image: es obligatorio.`);
        } else {
          if (!validImage(slide.image.dark)) errors.push(`${path}.image.dark: ruta inválida.`);
          if (!validImage(slide.image.light)) errors.push(`${path}.image.light: ruta inválida.`);
          if (!nonEmptyString(slide.image.alt)) errors.push(`${path}.image.alt: es obligatorio.`);
        }
      });
    }
  }

  if (!isObject(input.services)) {
    errors.push("services: es obligatorio.");
  } else {
    if (!nonEmptyString(input.services.title)) errors.push("services.title: es obligatorio.");
    if (!nonEmptyString(input.services.subtitle)) errors.push("services.subtitle: es obligatorio.");
    validateCta(input.services.primaryCta, "services.primaryCta", errors);
    validateCta(input.services.secondaryCta, "services.secondaryCta", errors);
  }

  if (!isObject(input.about)) {
    errors.push("about: es obligatorio.");
  } else {
    if (!nonEmptyString(input.about.sectionTitle)) errors.push("about.sectionTitle: es obligatorio.");
    if (!nonEmptyString(input.about.title)) errors.push("about.title: es obligatorio.");
    validateStringArray(input.about.text, "about.text", errors, true);
    validateStringArray(input.about.differentiators, "about.differentiators", errors);

    if (input.about.stats !== undefined) {
      if (!Array.isArray(input.about.stats)) {
        errors.push("about.stats: debe ser un array.");
      } else {
        input.about.stats.forEach((stat, index) => {
          const path = `about.stats[${index}]`;
          if (!isObject(stat)) {
            errors.push(`${path}: debe ser un objeto.`);
            return;
          }
          if (!nonEmptyString(stat.label)) errors.push(`${path}.label: es obligatorio.`);
          if (!nonEmptyString(stat.value)) errors.push(`${path}.value: es obligatorio.`);
        });
      }
    }

    if (!isObject(input.about.background)) {
      errors.push("about.background: es obligatorio.");
    } else {
      if (!validImage(input.about.background.light)) errors.push("about.background.light: ruta inválida.");
      if (!validImage(input.about.background.dark)) errors.push("about.background.dark: ruta inválida.");
    }
  }

  if (!isObject(input.process)) {
    errors.push("process: es obligatorio.");
  } else {
    if (!nonEmptyString(input.process.title)) errors.push("process.title: es obligatorio.");
    if (!nonEmptyString(input.process.subtitle)) errors.push("process.subtitle: es obligatorio.");

    if (!Array.isArray(input.process.steps) || input.process.steps.length === 0) {
      errors.push("process.steps: debe contener al menos un paso.");
    } else {
      input.process.steps.forEach((step, index) => {
        const path = `process.steps[${index}]`;
        if (!isObject(step)) {
          errors.push(`${path}: debe ser un objeto.`);
          return;
        }
        if (!nonEmptyString(step.title)) errors.push(`${path}.title: es obligatorio.`);
        if (!nonEmptyString(step.description)) errors.push(`${path}.description: es obligatorio.`);
      });
    }
  }

  if (!isObject(input.faq)) {
    errors.push("faq: es obligatorio.");
  } else {
    if (!nonEmptyString(input.faq.title)) errors.push("faq.title: es obligatorio.");
    if (!nonEmptyString(input.faq.subtitle)) errors.push("faq.subtitle: es obligatorio.");

    if (!Array.isArray(input.faq.items)) {
      errors.push("faq.items: debe ser un array.");
    } else {
      const questions = new Set<string>();

      input.faq.items.forEach((item, index) => {
        const path = `faq.items[${index}]`;

        if (!isObject(item)) {
          errors.push(`${path}: debe ser un objeto.`);
          return;
        }

        if (!nonEmptyString(item.question)) errors.push(`${path}.question: es obligatorio.`);
        if (!nonEmptyString(item.answer)) errors.push(`${path}.answer: es obligatorio.`);

        if (nonEmptyString(item.question)) {
          const normalized = item.question.trim().toLowerCase();
          if (questions.has(normalized)) {
            errors.push(`${path}.question: pregunta duplicada.`);
          }
          questions.add(normalized);
        }
      });
    }
  }

  if (!isObject(input.contact)) {
    errors.push("contact: es obligatorio.");
  } else {
    const contact = input.contact as Record<string, unknown>;
    ["kicker", "title", "description", "primaryCtaLabel", "secondaryCtaLabel"].forEach((key) => {
      if (!nonEmptyString(contact[key])) {
        errors.push(`contact.${key}: es obligatorio.`);
      }
    });
  }

  if (errors.length > 0) {
    throw new Error(
      `HomeContent.json contiene ${errors.length} error(es):\n\n` +
        errors.map((error, index) => `${index + 1}. ${error}`).join("\n")
    );
  }

  return input as HomeContent;
}