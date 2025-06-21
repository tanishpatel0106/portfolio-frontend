import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { ResearchSection } from "@/components/ResearchSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research | Tanish Patel",
  description: "Collection of research projects and papers.",
};

export default function ResearchPage() {
  return (
    <Container>
      <span className="text-4xl">📚</span>
      <Heading className="font-black mb-10">Explore My Research</Heading>
      <ResearchSection />
    </Container>
  );
}
