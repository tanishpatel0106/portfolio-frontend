// "use client";
// import { timeline } from "@/constants/timeline";
// import React from "react";
// import { Paragraph } from "./Paragraph";
// import { Heading } from "./Heading";
// import {
//   IconCheck,
//   IconCheckbox,
//   IconCircleCheckFilled,
// } from "@tabler/icons-react";

// export const WorkHistory = () => {
//   return (
//     <div>
//       {timeline.map((item, index) => (
//         <div
//           className="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative"
//           key={`timeline-${index}`}
//         >
//           <Paragraph className="w-40">{item.date}</Paragraph>
//           <div>
//             <Heading
//               as="h5"
//               className="text-lg md:text-lg lg:text-lg text-emerald-500"
//             >
//               {item.company}
//             </Heading>
//             <Paragraph className="text-base md:text-base lg:text-base font-semibold">
//               {item.title}
//             </Paragraph>
//             <Paragraph className="text-sm md:text-sm lg:text-sm mb-4">
//               {item.description}
//             </Paragraph>

//             {item.responsibilities.map((responsibility, index) => (
//               <Step key={responsibility}>{responsibility}</Step>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Step = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="flex space-x-1 items-start my-2">
//       <IconCircleCheckFilled className="h-3 w-4 mt-1 text-neutral-300" />
//       <Paragraph className="text-sm md:text-sm lg:text-sm">
//         {children}
//       </Paragraph>
//     </div>
//   );
// };

// Updated WorkHistory.tsx using the new Timeline component

// Updated WorkHistory.tsx using the new Timeline component with light theme styles

"use client";
import React from "react";
import { timeline } from "@/constants/timeline";
import { Timeline } from "@/components/ui/timeline";

export const WorkHistory = () => {
  const data = timeline.map((item) => ({
    title: item.company,
    content: (
      <div>
        <p className="text-neutral-800 text-sm md:text-base font-semibold mb-2">
          {item.title}
        </p>
        <p className="text-neutral-600 text-xs md:text-sm mb-2">
          {item.date}
        </p>
        <p className="text-neutral-700 text-xs md:text-sm mb-4">
          {item.description}
        </p>
        <ul className="list-disc ml-6">
          {item.responsibilities.map((responsibility, index) => (
            <li key={index} className="text-neutral-800 text-xs md:text-sm mb-2">
              {responsibility}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
};

export default WorkHistory;