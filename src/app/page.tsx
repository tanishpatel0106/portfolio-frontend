import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { ResearchCarousel } from "@/components/ResearchCarousel";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black">Hello there! I&apos;m Tanish</Heading>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m a Data Scientist and Applied AI Engineer building{" "} 
        <Highlight>AI-powered systems</Highlight> for{" "} 
        <Highlight>finance, analytics, and real-world decision-making</Highlight>.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        My work focuses on{" "}
        <Highlight>financial data automation, forecasting, machine learning, explainable AI</Highlight>, 
        and scalable data products — helping transform complex data into{" "}
        <Highlight>actionable insights and intelligent workflows</Highlight>.
      </Paragraph>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        What I&apos;ve been working on
      </Heading>
      <Products />
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Explore My Research
      </Heading>
      <ResearchCarousel />
      <TechStack />
    </Container>
  );
}
