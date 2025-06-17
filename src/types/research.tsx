export type Paper = {
  slug: string;
  title: string;
  description: string;
  href: string;
  thumbnail: string;
  images: string[];
  icon: React.ReactNode;
  stack?: string[];
  content?: React.ReactNode;
};
