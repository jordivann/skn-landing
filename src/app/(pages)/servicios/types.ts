export type Category = {
  id: string;
  title: string;
  slug: string;
  description: string;
  services: string[];
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
  intro: string;
  includes: string[];
  problemsSolved: string[];
  process: string[];
  idealFor: string[];
  benefits: string[];
  results: string[];
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  heroDescription: string;
  highlights: string[];
  info: ServiceInfo;
  cards: Card[];
  relatedServices: string[];
  contact: Contact;
};

export type ServicesJson = {
  categories: Category[];
  services: Service[];
};