export const timeline = [
    {
      company: "Man Group × Columbia - Capstone Project",
      title: "Data Scientist – Quantitative Research (Part Time)",
      date: "August 2026 - Present",
      description: "LLM portfolio-construction research on WRDS data",
      responsibilities: [
        "Engineered a 3-stage LLM experimentation framework evaluating 12 OpenAI and Anthropic models on portfolio construction, automating inference, structured extraction, model evaluation, and cost monitoring.",
        "Developed WRDS-based factor models and crowding analytics to benchmark study findings, including Jaccard overlap declining from 0.69 to 0.38 and momentum exposure shifting from −0.38 to +0.43 with web-enabled inference.",
        "Designed a ticker resolver that maps model-written tickers to issuers through Capital IQ, Compustat and fuzzy name matching across 30 canonical exchange codes, collapsing share classes, ADRs and cross-listings.",
      ],
    },
    {
      company: "BMLL Technologies × Columbia - Capstone Project",
      title: "Data Scientist – Quantitative Development (Part Time)",
      date: "August 2026 - Present",
      description: "Institutional portfolio and execution simulation",
      responsibilities: [
        "Built a $10B institutional portfolio simulation using CRSP data, processing 8,452 synthetic orders across 1,010 NAV observations, with daily NAV reconciliation; achieved 107% cumulative pre-cost returns, 16% annualized volatility, and 19% maximum drawdown.",
        "Designed a multi-stage PM, Trader, Broker, Execution simulation framework for BMLL market microstructure research, incorporating synthetic child orders, venue routing, modeled fills, and transaction-cost analytics covering implementation shortfall, slippage, market impact, order-flow toxicity, and broker execution quality.",
        "Designed a 29-table Postgres schema and 56 FastAPI endpoints covering runs, orders, lineage, TCA, market data and studies, with a replay command that fails unless output hashes match.",
      ],
    },
    {
      company: "Wedmont Private Capital × Columbia - Capstone Project",
      title: "Data Scientist – Quantitative Research (Part Time)",
      date: "August 2026 - Present",
      description: "Lifetime-utility research platform for retirement portfolios",
      responsibilities: [
        "Built a Numba lifecycle simulator and a FastAPI service with 25 /v1 operations, addressing every result by a SHA-256 run ID and covering the engine with 27 backend tests.",
        "Implemented 5 scenario generators and 14 allocation policy types, up to a grid dynamic program on a 200-point cash-on-hand grid.",
        "Designed 91-cell sweeps (13 withdrawal rates by 7 horizons) at 2,000 simulated paths per cell to measure certainty-equivalent gains over 60/40.",
      ],
    },
    {
      company: "Jain Global, LLC",
      title: "Quantitative Developer Intern – Data Management",
      date: "June 2026 - August 2026",
      description: "Market-data analytics and LLM document intelligence",
      responsibilities: [
        "Engineered Bloomberg Data License usage analytics across 50K fields using anomaly detection, cost-impact scoring, and 4-month simulations to identify duplicate, stale, and over-frequent requests and generate field-level optimization recommendations.",
        "Developed a metadata-driven alternative-data discovery and vendor-risk framework evaluating schema coverage, point-in-time availability, entitlement constraints, and dataset usability to prioritize datasets and accelerate sourcing workflows.",
        "Built an LLM-based document intelligence pipeline using document routing, citation-backed extraction, and cross-model proposer–verifier checks, reducing contract extraction time by 70% while improving reliability of structured outputs.",
      ],
    },
    {
      company: "Data Science Institute, Columbia University",
      title: "Researcher",
      date: "January 2026 - May 2026",
      description: "Data valuation for ocean CO₂ prediction",
      responsibilities: [
        "Built a data-valuation framework across 13 heterogeneous data sources, training XGBoost models over 8,192 source coalitions and computing exact Shapley values to quantify each source’s marginal contribution to ocean CO₂ prediction accuracy.",
        "Developed interaction-aware attribution methods to identify complementary and redundant source combinations, quantifying incremental predictive value beyond standalone contributions and enabling principled data-selection decisions.",
      ],
    },
    {
      company: "Paperchase Accountancy Ltd.",
      title: "AI Engineer",
      date: "April 2024 - July 2025",
      description: "Predictive Analytics and Product Development for Hospitality Finance",
      responsibilities: [
        "Developed and validated forecasting pipelines using SARIMA, LSTM, N-BEATS, and AutoTS for revenue and demand planning, improving forecast accuracy by 20% MAPE and reducing manual forecast adjustments by 40%.",
        "Engineered anomaly-detection models across financial account clusters to identify mispostings, unusual accrual/prepayment behavior, expense spikes, and margin-impacting outliers, increasing detection coverage by 30%.",
        "Built client-risk models using engagement, usage, and financial-behavior features, achieving 87% precision and contributing to a 12–18% reduction in client churn.",
      ],
    },
    {
      company: "Dept. of CSE, PDEU",
      title: "Student Researcher",
      date: "January 2021 - May 2025",
      description: "Involving in cutting edge research pertaining to CS Research Domains.",
      responsibilities: [
        "Developed federated learning pipelines integrating CNN-based defect classification with LIME-driven interpretability, achieving publication-level performance improvements on wafer defect datasets.",
        "Implemented machine learning models for real-time cybersecurity in Internet of Vehicles (IoV), incorporating SHAP and LIME explainability to enhance model transparency and threat diagnosis.",
        "Designed and evaluated OcclusionNetPlusPlus, a multi-scale similarity network with adaptive occlusion detection for robust iris recognition under challenging visual conditions.",
        "Collaborated with faculty to author peer-reviewed research papers, conducted rigorous experimentation, and produced reproducible ML/XAI workflows supporting academic dissemination.",
      ],
    },
    {
      company: "National Forensic Sciences University",
      title: "Forensics Research Intern",
      date: "April 2024 - June 2024",
      description: "Enhancing AI in Forensics Sector",
      responsibilities: [
        "Developed and optimized forensic analysis models leveraging Deep Learning and Explainable AI (XAI) to enhance the precision of DeepFake detection and the categorization of dark web sites.",
        "Contributed significantly to pioneering research efforts, integrating AI technologies into forensic science to elevate the effectiveness of intricate forensic investigations.",
        "Designed and implemented advanced AI solutions, facilitating breakthroughs in the detection and analysis of digital forensics, and contributing to the resolution of complex cases.",
        "Collaborated with multidisciplinary teams to push the boundaries of AI application in forensics, leading to the creation of innovative tools that improved investigative accuracy and efficiency.",
      ],
    },
    {
      company: "Ridgeant Technologies",
      title: "AI and Cloud Intern",
      date: "May 2023 - August 2023",
      description: "Integrating the power of Cloud with AI",
      responsibilities: [
        "Assisted in AI and cloud computing projects on Microsoft Azure, contributing to the development and deployment of AI models and NLP solutions that streamlined data management and optimized model development workflows.",
        "Led research on emerging AI techniques and innovative cloud architectures, facilitating the adoption of advanced models that significantly enhanced overall system performance.",
        "Maintained comprehensive documentation of project developments, ensuring clarity and alignment among stakeholders while supporting continuous project progress.",
        "Effectively communicated complex technical updates and insights to stakeholders, fostering a collaborative environment and ensuring alignment with project goals.",
      ],
    },
];
