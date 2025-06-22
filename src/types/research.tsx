export type ResearchItem = {
  /** URL slug for detail pages */
  slug: string;
  title: string;
  category: string;
  role: string;
  summary: string;
  tags: string[];
  pdf: string;
  bibtex: string;
  authors: string[];
  methodology: string[];
  results: string;
  links?: {
    arxiv?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  image?: string;
};
