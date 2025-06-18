import { ResearchPaper } from "@/types/research";

export const researchPapers: ResearchPaper[] = [
  {
    href: "https://drive.google.com/file/d/1ifI7p4PkfIVfg2vRjPw-sKFXm30l4Q8t/view?usp=drive_link",
    title: "Predictive Maintenance in SCANIA Trucks",
    description: "Mitigating failures by using Federated Learning and Explainable AI",
    thumbnail: "/images/diagram_minor.png",
    tags: ["Machine Learning", "Explainable AI"],
  },
  {
    href: "https://drive.google.com/file/d/1rSmbVlX8G1SdT0GGpVcnLCq5P-Z3NmVH/view?usp=sharing",
    title: "Advanced Time Series Forecasting",
    description: "Time Series Forecasting with Exogenous Variables for Restaurants Globally",
    thumbnail: "/images/PC-1.png",
    tags: ["Time Series", "Machine Learning"],
  },
  {
    href: "https://link.springer.com/book/9789819767939",
    title: "FL for State of Charge Prediction",
    description: "Data-Driven SoC Forecasting in Electric Vehicles: A Federated Learning Perspective",
    thumbnail: "/images/SOC_1.png",
    tags: ["Federated Learning", "EVs"],
  },
];
