export type Research = {
  slug: string;
  title: string;
  role: string;
  summary: string;
  abstract: string;
  methods: string[];
  tags: string[];
  pdf: string;
  bibtex: string;
  collaborators: string[];
  image: string;
  featured?: boolean;
};
