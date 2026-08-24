import fs from "node:fs";
import path from "node:path";

const filePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve("src/app/HomeContent.json");

const VALID_TONES = new Set([
  "neutral",
  "violet",
  "cyan",
  "green",
]);

const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const errors = [];

const isObject = (value) =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value);

const nonEmptyString = (value) =>
  typeof value === "string" &&
  value.trim().length > 0;

const validHref = (value) =>
  nonEmptyString(value) &&
  (
    value.startsWith("/") ||
    value.startsWith("#") ||
    value.startsWith("https://")
  );

const validImage = (value) =>
  nonEmptyString(value) &&
  (
    value.startsWith("/") ||
    value.startsWith("https://")
  );

function validateStringArray(
  value,
  field,
  required = false
) {
  if (value === undefined && !required) return;

  if (!Array.isArray(value)) {
    errors.push(`${field}: debe ser un array.`);
    return;
  }

  value.forEach((item, index) => {
    if (!nonEmptyString(item)) {
      errors.push(
        `${field}[${index}]: debe ser un texto no vacío.`
      );
    }
  });
}

function validateCta(value, field) {
  if (!isObject(value)) {
    errors.push(
      `${field}: debe ser un objeto con label y href.`
    );
    return;
  }

  if (!nonEmptyString(value.label)) {
    errors.push(`${field}.label: es obligatorio.`);
  }

  if (!validHref(value.href)) {
    errors.push(
      `${field}.href: debe comenzar con /, # o https://.`
    );
  }
}

let data;

try {
  data = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );
} catch (error) {
  console.error(
    `❌ No se pudo leer ${filePath}`
  );

  console.error(
    error instanceof Error
      ? error.message
      : error
  );

  process.exit(1);
}

if (!isObject(data)) {
  console.error(
    "❌ HomeContent.json debe contener un objeto JSON."
  );

  process.exit(1);
}

/* ======================================================
   ESTRUCTURA ANTIGUA
====================================================== */

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
  if (key in data) {
    errors.push(
      `${key}: pertenece a la estructura anterior. Usá HomeContent v2.`
    );
  }
});

/* ======================================================
   HERO
====================================================== */

if (!isObject(data.hero)) {
  errors.push(
    "hero: es obligatorio."
  );
} else {
  validateStringArray(
    data.hero.trustPoints,
    "hero.trustPoints"
  );

  validateCta(
    data.hero.secondaryCta,
    "hero.secondaryCta"
  );

  if (
    !Array.isArray(data.hero.slides) ||
    data.hero.slides.length === 0
  ) {
    errors.push(
      "hero.slides: debe contener al menos un slide."
    );
  } else {
    const ids = new Set();

    data.hero.slides.forEach(
      (slide, index) => {
        const path = `hero.slides[${index}]`;

        if (!isObject(slide)) {
          errors.push(
            `${path}: debe ser un objeto.`
          );

          return;
        }

        /* ID */

        if (
          !nonEmptyString(slide.id) ||
          !ID_RE.test(slide.id)
        ) {
          errors.push(
            `${path}.id: usar minúsculas, números y guiones.`
          );
        } else if (ids.has(slide.id)) {
          errors.push(
            `${path}.id: "${slide.id}" está duplicado.`
          );
        } else {
          ids.add(slide.id);
        }

        /* TEXTOS */

        if (!nonEmptyString(slide.title)) {
          errors.push(
            `${path}.title: es obligatorio.`
          );
        }

        if (!nonEmptyString(slide.subtitle)) {
          errors.push(
            `${path}.subtitle: es obligatorio.`
          );
        }

        /* TONE */

        if (
          slide.tone !== undefined &&
          !VALID_TONES.has(slide.tone)
        ) {
          errors.push(
            `${path}.tone: debe ser neutral, violet, cyan o green.`
          );
        }

        /* CTA */

        validateCta(
          slide.cta,
          `${path}.cta`
        );

        /* IMAGE */

        if (!isObject(slide.image)) {
          errors.push(
            `${path}.image: es obligatorio.`
          );
        } else {
          if (
            !validImage(slide.image.dark)
          ) {
            errors.push(
              `${path}.image.dark: ruta inválida.`
            );
          }

          if (
            !validImage(slide.image.light)
          ) {
            errors.push(
              `${path}.image.light: ruta inválida.`
            );
          }

          if (
            !nonEmptyString(slide.image.alt)
          ) {
            errors.push(
              `${path}.image.alt: es obligatorio.`
            );
          }
        }
      }
    );
  }
}

/* ======================================================
   SERVICES HOME
====================================================== */

if (!isObject(data.services)) {
  errors.push(
    "services: es obligatorio."
  );
} else {
  if (
    !nonEmptyString(data.services.title)
  ) {
    errors.push(
      "services.title: es obligatorio."
    );
  }

  if (
    !nonEmptyString(data.services.subtitle)
  ) {
    errors.push(
      "services.subtitle: es obligatorio."
    );
  }

  validateCta(
    data.services.primaryCta,
    "services.primaryCta"
  );

  validateCta(
    data.services.secondaryCta,
    "services.secondaryCta"
  );
}

/* ======================================================
   ABOUT
====================================================== */

if (!isObject(data.about)) {
  errors.push(
    "about: es obligatorio."
  );
} else {
  if (
    !nonEmptyString(
      data.about.sectionTitle
    )
  ) {
    errors.push(
      "about.sectionTitle: es obligatorio."
    );
  }

  if (
    !nonEmptyString(data.about.title)
  ) {
    errors.push(
      "about.title: es obligatorio."
    );
  }

  validateStringArray(
    data.about.text,
    "about.text",
    true
  );

  validateStringArray(
    data.about.differentiators,
    "about.differentiators"
  );

  /* STATS */

  if (
    data.about.stats !== undefined
  ) {
    if (
      !Array.isArray(data.about.stats)
    ) {
      errors.push(
        "about.stats: debe ser un array."
      );
    } else {
      data.about.stats.forEach(
        (stat, index) => {
          const path =
            `about.stats[${index}]`;

          if (!isObject(stat)) {
            errors.push(
              `${path}: debe ser un objeto.`
            );

            return;
          }

          if (
            !nonEmptyString(stat.label)
          ) {
            errors.push(
              `${path}.label: es obligatorio.`
            );
          }

          if (
            !nonEmptyString(stat.value)
          ) {
            errors.push(
              `${path}.value: es obligatorio.`
            );
          }
        }
      );
    }
  }

  /* BACKGROUND */

  if (
    !isObject(data.about.background)
  ) {
    errors.push(
      "about.background: es obligatorio."
    );
  } else {
    if (
      !validImage(
        data.about.background.light
      )
    ) {
      errors.push(
        "about.background.light: ruta inválida."
      );
    }

    if (
      !validImage(
        data.about.background.dark
      )
    ) {
      errors.push(
        "about.background.dark: ruta inválida."
      );
    }
  }
}

/* ======================================================
   PROCESS
====================================================== */

if (!isObject(data.process)) {
  errors.push(
    "process: es obligatorio."
  );
} else {
  if (
    !nonEmptyString(data.process.title)
  ) {
    errors.push(
      "process.title: es obligatorio."
    );
  }

  if (
    !nonEmptyString(
      data.process.subtitle
    )
  ) {
    errors.push(
      "process.subtitle: es obligatorio."
    );
  }

  if (
    !Array.isArray(
      data.process.steps
    ) ||
    data.process.steps.length === 0
  ) {
    errors.push(
      "process.steps: debe contener al menos un paso."
    );
  } else {
    data.process.steps.forEach(
      (step, index) => {
        const path =
          `process.steps[${index}]`;

        if (!isObject(step)) {
          errors.push(
            `${path}: debe ser un objeto.`
          );

          return;
        }

        if (
          !nonEmptyString(step.title)
        ) {
          errors.push(
            `${path}.title: es obligatorio.`
          );
        }

        if (
          !nonEmptyString(
            step.description
          )
        ) {
          errors.push(
            `${path}.description: es obligatorio.`
          );
        }
      }
    );
  }
}

/* ======================================================
   FAQ
====================================================== */

if (!isObject(data.faq)) {
  errors.push(
    "faq: es obligatorio."
  );
} else {
  if (
    !nonEmptyString(data.faq.title)
  ) {
    errors.push(
      "faq.title: es obligatorio."
    );
  }

  if (
    !nonEmptyString(data.faq.subtitle)
  ) {
    errors.push(
      "faq.subtitle: es obligatorio."
    );
  }

  if (
    !Array.isArray(data.faq.items)
  ) {
    errors.push(
      "faq.items: debe ser un array."
    );
  } else {
    const questions = new Set();

    data.faq.items.forEach(
      (item, index) => {
        const path =
          `faq.items[${index}]`;

        if (!isObject(item)) {
          errors.push(
            `${path}: debe ser un objeto.`
          );

          return;
        }

        if (
          !nonEmptyString(
            item.question
          )
        ) {
          errors.push(
            `${path}.question: es obligatorio.`
          );
        }

        if (
          !nonEmptyString(item.answer)
        ) {
          errors.push(
            `${path}.answer: es obligatorio.`
          );
        }

        if (
          nonEmptyString(
            item.question
          )
        ) {
          const normalized =
            item.question
              .trim()
              .toLowerCase();

          if (
            questions.has(normalized)
          ) {
            errors.push(
              `${path}.question: pregunta duplicada.`
            );
          }

          questions.add(normalized);
        }
      }
    );
  }
}

/* ======================================================
   CONTACT
====================================================== */

if (!isObject(data.contact)) {
  errors.push(
    "contact: es obligatorio."
  );
} else {
  [
    "kicker",
    "title",
    "description",
    "primaryCtaLabel",
    "secondaryCtaLabel",
  ].forEach((key) => {
    if (
      !nonEmptyString(
        data.contact[key]
      )
    ) {
      errors.push(
        `contact.${key}: es obligatorio.`
      );
    }
  });
}

/* ======================================================
   RESULTADO
====================================================== */

if (errors.length > 0) {
  console.error(
    `❌ HomeContent.json contiene ${errors.length} error(es):\n`
  );

  errors.forEach(
    (error, index) => {
      console.error(
        `${index + 1}. ${error}`
      );
    }
  );

  console.error(
    "\nCorregí estos puntos antes de publicar."
  );

  process.exit(1);
}

console.log(
  `✅ HomeContent.json válido: ` +
  `${data.hero.slides.length} slides, ` +
  `${data.process.steps.length} pasos y ` +
  `${data.faq.items.length} preguntas frecuentes.`
);