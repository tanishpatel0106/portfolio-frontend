"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";

export default function About() {
  const images = [
    '/images/Photo1.jpeg',
    '/images/Photo2.jpeg',
    '/images/Photo3.jpeg',
    '/images/Photo4.jpeg',
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{
              opacity: 0,
              y: -50,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? 3 : -3,
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <Image
              src={image}
              width={200}
              height={400}
              alt="about"
              className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
            />
          </motion.div>
        ))}
        {/* 
        // <Image
        //   src="https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
        //   width={200}
        //   height={400}
        //   alt="about"
        //   className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
        // />
        // <Image
        //   src="https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
        //   width={200}
        //   height={400}
        //   alt="about"
        //   className="rounded-md object-cover transform -rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200"
        // />
        // <Image
        //   src="https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        //   width={200}
        //   height={400}
        //   alt="about"
        //   className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200"
        // />
        // <Image
        //   src="https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        //   width={200}
        //   height={400}
        //   alt="about"
        //   className="rounded-md object-cover transform -rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200"
        // /> */}
      </div>

      <div className="max-w-4xl">
        <Paragraph className=" mt-4">
        Hey there! I&apos;m Tanish Patel, a Data Science graduate student at Columbia University building at the intersection of AI/ML and quantitative finance. My work spans the full arc from research to production — whether that&apos;s applying cooperative game theory to value climate observation data, designing multi-agent LLM pipelines that generate financial commentary, or building stress testing engines that help finance leaders understand how their plans hold up under pressure. I&apos;m driven by problems where the math has to be right and the system has to actually work in someone&apos;s hands.
        </Paragraph>
        <Paragraph className=" mt-4">
        I&apos;ve spent a lot of time in the weeds of enterprise ML — forecasting systems, agentic workflows, Monte Carlo simulations, RAG applications, natural language-to-SQL engines — and that&apos;s given me a strong bias toward things that actually ship. Clean APIs, validated schemas, defensible outputs, and code that someone else can debug at 2 AM. I care just as much about how a system is built as what it does, and I bring that mindset to everything from algorithmic trading research to full-stack product development. Whether it&apos;s a Python module computing inverse normal PPFs from scratch or a Next.js app with a 4-stage AI pipeline, I want the internals to be as solid as the interface.
        </Paragraph>
        <Paragraph className=" mt-4">
        On the research side, I&apos;m currently working on data valuation for ocean fCO&#8322; prediction using Shapley-theoretic methods — exhaustively scoring thousands of data source coalitions to figure out which observations actually help a model and which ones quietly make it worse. It&apos;s the kind of problem that sits right at the edge of machine learning, cooperative game theory, and climate science, and it&apos;s taught me a lot about how to think carefully about data quality at scale. More broadly, I&apos;m drawn to applied ML problems in financial analytics and trading systems where the gap between a good model and a good system is the hardest part to close.
        </Paragraph>
        <Paragraph className=" mt-4">
        Beyond the technical work, I genuinely enjoy being part of the broader community around these ideas. I&apos;ve supported graduate courses in algorithmic trading, contributed to open-source projects, and spent more hours than I can count going back and forth on system design decisions with teammates and collaborators. Some of my best learning has come not from papers or lectures but from building something with someone and figuring out together why it broke.
        </Paragraph>
        <Paragraph className=" mt-4">
        Outside of work, I&apos;m usually running or cycling through the city, experimenting in the kitchen, or painting on canvas when I need to think about something that isn&apos;t a loss function. I follow F1, cricket, and soccer with probably too much enthusiasm, and I love capturing moments through photography — whether it&apos;s a street scene in New York or a mountain trail in Uttarakhand. A solo trek through the Himalayan foothills is still one of my favorite things I&apos;ve done, and I try to travel whenever I can because nothing resets perspective quite like being somewhere completely unfamiliar.
        </Paragraph>
        <Paragraph className=" mt-4">
        Welcome to my corner of the web. Here you&apos;ll find a showcase of my projects, a window into my research, and a bit of the personality behind the code. Whether you&apos;re a fellow builder, a potential collaborator, or just someone curious about what I&apos;m working on — I&apos;d love to connect. Let&apos;s build something interesting.
        </Paragraph>
      </div>
    </div>
  );
}
