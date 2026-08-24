export type Category = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

export type Card = {
  title: string;
  description: string;
};

export type Contact = {
  title: string;
  description: string;
};

export type ServiceInfo = {
  intro?: string;
  includes?: string[];
  problemsSolved?: string[];
  process?: string[];
  idealFor?: string[];
  benefits?: string[];
  results?: string[];
  brands?: string[];
  useCases?: string[];
};

export type Service = {
  // Campos mínimos para poder publicar un servicio.
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  heroDescription: string;
  contact: Contact;

  // Secciones opcionales: si faltan o están vacías, no se renderizan.
  highlights?: string[];
  info?: ServiceInfo;
  cards?: Card[];
  relatedServices?: string[];
};

export type ServicesInstructions = Record<string, unknown>;

export type ServicesJson = {
  _schemaVersion?: number;
  _instructions?: ServicesInstructions;
  categories: Category[];
  services: Service[];
};