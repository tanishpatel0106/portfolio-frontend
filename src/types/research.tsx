export type ResearchItem = {
  /** URL slug for detail pages */
  slug: string;
  title: string;
  /** Primary image used in detail pages */
  thumbnail: string;
  /** Additional images displayed in detail pages */
  images?: string[];
  category: string;
  role: string;
  summary: string;
  /** Detailed description displayed on the dedicated page */
  description: string;
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
};
