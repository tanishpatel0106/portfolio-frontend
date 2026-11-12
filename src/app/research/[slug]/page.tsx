import { Container } from "@/components/Container";
import { SingleResearch } from "@/components/SingleResearch";
import { research } from "@/constants/research";
import { ResearchItem } from "@/types/research";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const findResearch = (slug: string): ResearchItem | undefined =>
  research.find((r: ResearchItem) => r.slug === slug);

export function generateStaticParams() {
  return research.map((r: ResearchItem) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = findResearch(slug);
  if (item) {
    return {
      title: item.title,
      description: item.summary,
    };
  }
  return {
    title: "Research",
    description: "Research papers and projects by Tanish Patel.",
  };
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = findResearch(slug);
  if (!item) {
    redirect("/research");
  }
  return (
    <Container>
      <SingleResearch item={item} />
    </Container>
  );
}
