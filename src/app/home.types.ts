export type HomeTone = "violet" | "cyan" | "green" | "neutral";

export type HomeCta = {
  label: string;
  href: string;
};

export type HomeHeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  theme?: string;
  tone?: HomeTone;
  cta: HomeCta;
  image: {
    dark: string;
    light: string;
    alt: string;
  };
};

export type HomeContent = {
  _schemaVersion?: number;
  _instructions?: Record<string, unknown>;

  hero: {
    trustPoints?: string[];
    secondaryCta: HomeCta;
    slides: HomeHeroSlide[];
  };

  services: {
    title: string;
    subtitle: string;
    primaryCta: HomeCta;
    secondaryCta: HomeCta;
  };

  about: {
    sectionTitle: string;
    title: string;
    text: string[];
    differentiators?: string[];
    stats?: { label: string; value: string }[];
    background: {
      light: string;
      dark: string;
    };
  };

  process: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      description: string;
    }[];
  };

  faq: {
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };

  contact: {
    kicker: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
};