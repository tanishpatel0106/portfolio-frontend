import { Container } from "@/components/Container";
import { SingleProduct } from "@/components/Product";
import { papers } from "@/constants/research";
import { Paper } from "@/types/research";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paper = papers.find((p) => p.slug === params.slug);
  if (paper) {
    return {
      title: paper.title,
      description: paper.description,
    };
  }
  return {
    title: "Research | Tanish Patel",
    description: "Research papers authored by Tanish Patel.",
  };
}

export default function ResearchPage({ params }: { params: { slug: string } }) {
  const paper = papers.find((p) => p.slug === params.slug);
  if (!paper) {
    redirect("/research");
  }
  return (
    <Container>
      {paper && <SingleProduct product={paper as any} />}
    </Container>
  );
}
