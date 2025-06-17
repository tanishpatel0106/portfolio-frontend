import {
  IconArticle,
  IconBook,
  IconFlask,
  IconBrain,
} from "@tabler/icons-react";
import { Paper } from "@/types/research";

export const papers: Paper[] = [
  {
    slug: "pmscania",
    title: "Predictive Maintenance in SCANIA Trucks",
    description:
      "Mitigating failures by using Federated Learning and Explainable AI",
    href: "https://drive.google.com/file/d/1ifI7p4PkfIVfg2vRjPw-sKFXm30l4Q8t/view?usp=drive_link",
    thumbnail: "/images/diagram_minor.png",
    images: ["/images/diagram_minor.png"],
    icon: <IconFlask />,
    content: (
      <div>
        <p>
          Predictive maintenance is a vital approach in modern industries, enabling reduced downtime, optimized resources, and enhanced operational efficiency. This study develops a federated survival analysis framework augmented with explainable AI (XAI) to predict the Remaining Useful Life (RUL) of components and assess failure risks while preserving data privacy.
        </p>
        <p>
          The framework leverages federated learning to aggregate insights from decentralized data across multiple clients. Three survival models—Random Survival Forest (RSF), Gradient Boosting Survival Analysis (GBSA), and Support Survival Vector Machines (SSVM)—were evaluated across 10 federated clients over 10 rounds. Model performance was assessed using the Concordance Index (C-index), where RSF outperformed the others with global training and testing C-index values of 0.7577 and 0.7376, respectively.
        </p>
        <p>
          Explainability was achieved through SHAP, providing insights into feature contributions to model predictions. Key features were identified as critical predictors of survival outcomes. The RSF survivability plot demonstrated declining survival probabilities over time, enabling predictive maintenance planning.
        </p>
      </div>
    ),
  },
  {
    slug: "flsocpred",
    title: "FL for State of Charge Prediction",
    description:
      "Data-Driven SoC Forecasting in Electric Vehicles: A Federated Learning Perspective",
    href: "https://link.springer.com/book/9789819767939",
    thumbnail: "/images/SOC_1.png",
    images: ["/images/SOC_1.png", "/images/SOC_2.png"],
    icon: <IconBrain />,
    content: (
      <div>
        <p>
          Electric Vehicles (EVs) are pivotal for sustainable transportation, but their widespread adoption is hindered by challenges in accurately estimating the State of Charge (SoC). This study explores federated learning to enhance SoC estimation in EVs.
        </p>
        <p>
          Across multiple rounds of federated training, models showed consistent improvements in SoC prediction accuracy. Error metrics such as MSE and MAE decreased over time, demonstrating the effectiveness of the collaborative approach while maintaining data privacy.
        </p>
      </div>
    ),
  },
];
