import { ResearchItem } from "@/types/research";

export const research: ResearchItem[] = [
  {
    slug: "low-bp-prediction",
    thumbnail: "/images/SHAP_Summary.png",
    images: ["/images/SHAP_Summary.png", "/images/diagram_minor.png"],
    title: "Low-BP Prediction Using LSTMs in Pediatric ICUs",
    category: "Clinical ML",
    role: "Research Intern",
    summary:
      "We built a time-series prediction model for low BP episodes in children using EMR data.",
    description:
      "This work explores sequential EMR records to detect early signs of hypotension. We trained LSTM models on millions of patient hours and tuned them for high recall on rare events. The study discusses data preprocessing strategies and clinical considerations when deploying such tools in pediatric ICUs.",
    tags: ["LSTM", "Time Series", "Healthcare", "Python"],
    pdf: "/assets/papers/low_bp_prediction.pdf",
    bibtex: "@article{smith2024lowbp, ...}",
    authors: ["John Smith", "Columbia Pediatrics Lab"],
    methodology: [
      "Time-series modeling",
      "LSTM",
      "Data preprocessing with Pandas",
    ],
    results:
      "Achieved 87% recall on minority class with interpretable SHAP insights.",
    links: {
      arxiv: "https://arxiv.org/abs/xxxx.xxxx",
      github: "https://github.com/yourname/low-bp-prediction",
    },
  },
  {
    slug: "semiconductor-fl",
    thumbnail: "/images/PC-1.png",
    images: ["/images/PC-1.png", "/images/PC-2.png"],
    title: "Federated Learning for Semiconductor Fault Detection",
    category: "AI Research",
    role: "Lead Author",
    summary:
      "Combining federated learning and XAI to detect semiconductor defects while preserving privacy.",
    description:
      "Our approach allows fab partners to collaboratively train defect detection models without pooling data. We outline the federated pipeline and illustrate how SHAP explanations uncover failure modes in sensor streams. Extensive experiments highlight privacy benefits alongside production-level accuracy.",
    tags: ["Federated Learning", "Explainable AI", "Semiconductor"],
    pdf: "/assets/papers/semiconductor_fl.pdf",
    bibtex: "@article{patel2024semi, ...}",
    authors: ["Tanish Patel", "Industry Partners"],
    methodology: [
      "Federated training across partners",
      "Explainable AI with SHAP",
    ],
    results:
      "Reached 98% accuracy on public dataset without sharing raw data.",
    links: {
      arxiv: "https://arxiv.org/abs/yyyy.yyyy",
      github: "https://github.com/yourname/semi-fl",
    },
  },
  {
    slug: "soc-prediction-ev",
    thumbnail: "/images/SOC_1.png",
    images: ["/images/SOC_1.png", "/images/SOC_2.png"],
    title: "Data-Driven SoC Prediction in Electric Vehicles",
    category: "Applied ML",
    role: "Research Assistant",
    summary:
      "Enhanced SoC estimation accuracy using federated learning across fleets.",
    description:
      "The project leverages distributed vehicle data to improve state-of-charge predictions in diverse driving conditions. We evaluate several regression strategies and analyze communication costs for fleet-wide training. The resulting model reduces range anxiety and demonstrates scalability on real-world EV deployments.",
    tags: ["Federated Learning", "Electric Vehicles", "Regression"],
    pdf: "/assets/papers/soc_prediction.pdf",
    bibtex: "@article{patel2024soc, ...}",
    authors: ["Jane Doe", "EV Research Lab"],
    methodology: ["Federated regression", "Sklearn", "Power BI"],
    results: "Improved R2 scores across rounds while keeping data local.",
    links: {
      github: "https://github.com/yourname/soc-prediction",
    },
  },
];
