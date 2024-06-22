import Image from "next/image";
import React from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";

export const TechStack = () => {
  const stack = [
    {
      title: "Python",
      src: "/images/logos/python.png",

      className: "h-10 w-14",
    },
    {
      title: "Numpy",
      src: "/images/logos/numpy.png",

      className: "h-10 w-10",
    },
    {
      title: "Pandas",
      src: "/images/logos/pandas.png",

      className: "h-10 w-8",
    },
    {
      title: "Pandas",
      src: "/images/logos/tensorflow.png",

      className: "h-10 w-8",
    },
    {
      title: "Microsoft Azure",
      src: "/images/logos/azure.png",

      className: "h-10 w-8",
    },
    {
      title: "C",
      src: "/images/logos/C.png",

      className: "h-10 w-8",
    },
    {
      title: "C++",
      src: "/images/logos/C++.png",

      className: "h-10 w-8",
    },
    {
      title: "Databricks",
      src: "/images/logos/databricks.png",

      className: "h-10 w-8",
    },
    {
      title: "Django",
      src: "/images/logos/django.png",

      className: "h-10 w-8",
    },
    {
      title: "Microsoft Fabric",
      src: "/images/logos/fabric.png",

      className: "h-10 w-8",
    },
    {
      title: "Flask",
      src: "/images/logos/flask.png",

      className: "h-10 w-8",
    },
    {
      title: "Matplotlib",
      src: "/images/logos/matplot.png",

      className: "h-10 w-8",
    },
    {
      title: "MySQL",
      src: "/images/logos/mysql.png",

      className: "h-10 w-8",
    },
    {
      title: "OpenAI",
      src: "/images/logos/openai.png",

      className: "h-10 w-8",
    },
    {
      title: "OpenCV",
      src: "/images/logos/opencv.png",

      className: "h-10 w-8",
    },
    {
      title: "Plotly",
      src: "/images/logos/plotly.png",

      className: "h-10 w-8",
    },
    {
      title: "Power BI",
      src: "/images/logos/powerbi.png",

      className: "h-10 w-8",
    },
    {
      title: "React",
      src: "/images/logos/react.png",

      className: "h-10 w-8",
    },
    {
      title: "Seaborn",
      src: "/images/logos/seaborn.png",

      className: "h-10 w-8",
    },
    {
      title: "Scikit-learn",
      src: "/images/logos/sklearn.png",

      className: "h-10 w-8",
    },
  ];
  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Tech Stack
      </Heading>
      <div className="flex flex-wrap">
        {stack.map((item) => (
          <Image
            src={item.src}
            key={item.src}
            width={`200`}
            height={`200`}
            alt={item.title}
            className={twMerge("object-contain mr-4 mb-4", item.className)}
          />
        ))}
      </div>
    </div>
  );
};
