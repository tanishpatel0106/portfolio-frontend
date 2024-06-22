"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";

export default function About() {
  const images = [
    '/images/Photo 1.jpeg',
    '/images/Photo 2.jpeg',
    '/images/Photo 3.jpeg',
    '/images/Photo 4.jpeg',
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
        Hey there! I&apos;m Tanish Patel, a passionate tech enthusiast and emerging researcher in the fascinating world of Computer Engineering. My expertise spans Machine Learning, Computer Vision, Robotics, and Cloud Computing. I&apos;m proficient in several programming languages and love diving deep into frameworks like TensorFlow and OpenCV. Whether it&apos;s crafting intricate algorithms or developing robust applications, I thrive on the challenge of solving complex problems through innovative tech solutions.
        </Paragraph>
        <Paragraph className=" mt-4">
        Throughout my academic and professional journey, I&apos;ve had the opportunity to work on some truly groundbreaking projects. From developing posture correction systems that help improve ergonomics to building explainable AI (xAI) models that make complex decisions more transparent and understandable, I&apos;ve always aimed to push the boundaries of what&apos;s possible. One of my most exciting projects involved leveraging Federated Learning to classify semiconductor defects, a task that required not just technical prowess but also a deep understanding of the manufacturing process. Additionally, I&apos;ve worked on predicting the State of Charge (SoC) for Electric Vehicles, ensuring that these green machines run efficiently and reliably. I&apos;ve also built AI assistants for the underprivileged and illiterate people because it is important to give back to community we are growing in!
        </Paragraph>

        <Paragraph className=" mt-4">
        Beyond the technical nitty-gritty, I&apos;m deeply involved in the tech community. You&apos;ll often find me at technical symposiums, soaking up the latest research and innovations, or hacking away at hackathons, where the fast-paced environment fuels my creativity and problem-solving skills. I also hold leadership positions in several student technical organizations, where I mentor peers, lead projects, and help foster a community of like-minded tech enthusiasts. For me, technology is not just about individual achievements but also about collective growth and innovation.
        </Paragraph>
        <Paragraph className=" mt-4">
        But let&apos;s not forget the creative side of me! I believe that my technical skills don&apos;t just make me a better professional—they make me a better person. In my free time, I love to immerse myself in creative hobbies such as reading, painting, and photography. Whether it&apos;s getting lost in a captivating novel, bringing a blank canvas to life with colors, or capturing the world through my camera lens, these activities keep me grounded. They offer me a fresh perspective on problem-solving and inspire innovative thinking.
        </Paragraph>
        <Paragraph className=" mt-4">
        I&apos;m committed to staying at the forefront of technological advancements. I constantly update myself with the latest trends, tools, and methodologies in the tech world. I believe that in this ever-evolving field, learning never stops, and I embrace every opportunity to expand my knowledge and skills. This commitment to continuous learning allows me to bring the most current and effective solutions to any project I undertake.
        </Paragraph>
        <Paragraph className=" mt-4">
        Welcome to my corner of the web—where tech brilliance meets creative flair, and together, they make magic happen! Here, you&apos;ll find a showcase of my projects, insights into my research, and a glimpse into my creative endeavors. Whether you&apos;re a fellow tech enthusiast, a potential collaborator, or just someone curious about what I do, I invite you to explore my world. Let&apos;s connect, innovate, and create solutions that not only solve problems but also make the world a better place.
        </Paragraph>
        <Paragraph className=" mt-4">
          Thank you for being here, and I can&apos;t wait to embark on this
          adventure with you.
        </Paragraph>
      </div>
    </div>
  );
}
