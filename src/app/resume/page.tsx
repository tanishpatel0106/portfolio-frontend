import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { EducationHistory } from "@/components/Education";
import { Products } from "@/components/Products";
import { WorkHistory } from "@/components/WorkHistory";
import { LeadershipHistory } from "@/components/Leadership";
import { CocurricularHistory } from "@/components/CoCurricular";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">💼</span>
      <Heading className="font-black">Work History</Heading>
      <Paragraph className="max-w-xl">
        I&apos;m an AI Engineer that loves{" "}
        <Highlight>building products</Highlight> and web apps that can impact
        millions of lives
      </Paragraph>
      <WorkHistory />
      <span className="text-4xl">🎓</span>
      <Heading className="font-black">Education</Heading>
      <Paragraph className="max-w-xl">
        Learning is a <Highlight>Continuous Journey</Highlight> and I am on my
        way to master it.
      </Paragraph>
      <EducationHistory />
      <span className="text-4xl">🏆</span>
      <Heading className="font-black">Leadership</Heading>
      <Paragraph className="max-w-xl">
        I&apos;ts always a{" "}
        <Highlight>Team Job</Highlight> because not everything is meant to be <Highlight>One-Man Job </Highlight>
      </Paragraph>
      <LeadershipHistory />
      <span className="text-4xl">🚩</span>
      <Heading className="font-black">Co-Curriculars</Heading>
      <Paragraph className="max-w-xl mt-4">
        All work and no{" "}
        <Highlight>Play</Highlight> makes Jack a <Highlight>Dull</Highlight> Boy.
      </Paragraph>
      <CocurricularHistory />
    </Container>
  );
}
