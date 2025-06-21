import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { ResearchSection } from "@/components/research/ResearchSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research | Tanish Patel",
  description: "Research projects and papers by Tanish Patel",
};

export default function ResearchPage() {
  return (
    <Container>
      <span className="text-4xl">🔬</span>
      <Heading className="font-black mb-8">Explore My Research</Heading>
      <ResearchSection />
    </Container>
  );
}
