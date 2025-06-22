import { Container } from "@/components/Container";
import { SingleResearch } from "@/components/SingleResearch";
import { research } from "@/constants/research";
import { ResearchItem } from "@/types/research";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = research.find((r: ResearchItem) => r.slug === params.slug);
  if (item) {
    return {
      title: item.title,
      description: item.summary,
    };
  }
  return {
    title: "Research | Tanish Patel",
    description: "Collection of research projects and papers.",
  };
}

export default function ResearchDetailPage({ params }: Props) {
  const item = research.find((r: ResearchItem) => r.slug === params.slug);
  if (!item) {
    redirect("/research");
  }
  return (
    <Container>
      {item && <SingleResearch item={item} />}
    </Container>
  );
}
