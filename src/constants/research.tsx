import { Research } from "@/types/research";

export const researchData: Research[] = [
  {
    slug: "fl-healthcare",
    title: "Federated Learning for Healthcare",
    role: "Lead Researcher",
    summary: "Privacy-preserving hospital collaboration with FL.",
    abstract:
      "We developed a privacy-preserving federated learning model for hospital collaboration, enabling training across institutions without sharing sensitive data.",
    methods: ["CNN", "Differential Privacy"],
    tags: ["AI", "Healthcare", "Federated Learning"],
    pdf: "/papers/federated_learning.pdf",
    bibtex: "@article{patel2024federated, title={Federated Learning for Healthcare}, author={Patel, Tanish}, year={2024}}",
    collaborators: ["XYZ University", "ABC Hospital"],
    image: "/images/PC-1.png",
    featured: true,
  },
  {
    slug: "clinical-xai",
    title: "Explainable ML for Clinical Data",
    role: "Co-author",
    summary: "Using SHAP and LIME for transparent predictions.",
    abstract:
      "This work explores interpretable machine learning techniques for clinical decision support, demonstrating how SHAP values help clinicians trust model outputs.",
    methods: ["XGBoost", "SHAP", "LIME"],
    tags: ["Explainable AI", "Healthcare"],
    pdf: "/papers/clinical_xai.pdf",
    bibtex: "@inproceedings{patel2023clinical, title={Explainable ML for Clinical Data}, author={Patel, Tanish}, year={2023}}",
    collaborators: ["DEF Institute"],
    image: "/images/Setup.png",
    featured: true,
  },
  {
    slug: "gesture-xr",
    title: "Gesture Recognition for XR",
    role: "Research Intern",
    summary: "Real-time hand gesture recognition for AR/VR.",
    abstract:
      "We built a convolutional model to recognize hand gestures in real time, enabling intuitive interaction in extended reality environments.",
    methods: ["CNN", "OpenCV"],
    tags: ["Computer Vision", "AR/VR"],
    pdf: "/papers/gesture_xr.pdf",
    bibtex: "@article{patel2022gesture, title={Gesture Recognition for XR}, author={Patel, Tanish}, year={2022}}",
    collaborators: ["GHI Lab"],
    image: "/images/Blog%20Image%203.webp",
    featured: false,
  },
];
