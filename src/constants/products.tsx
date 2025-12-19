export const products = [
  {
    href: "https://github.com/tanishpatel0106/IEOR4571-FX-Cross",
    title: "FX-Cross: Machine Learning–Driven Trading Signal Generation",
    description:
      "Probabilistic FX trading strategies using time series smoothing, machine learning, and deep learning models",
    thumbnail: "/images/fx2.png",
    images: [
      "/images/fx1.png",
      "/images/fx2.png",
      "/images/fx3.png",
      "/images/fx4.png",
    ],
    stack: [
    "Time Series Analysis",
    "Algorithmic Trading",
    "Machine Learning",
    "Deep Learning",
    "Quantitative Finance"
  ],
    slug: "fx-cross",
    content: (
    <div>
      <p>
        This project focuses on the development of a quantitative FX trading
        framework for major currency crosses, combining classical time series
        techniques with modern machine learning and deep learning models to
        generate probabilistic trading signals. The objective is to estimate the
        likelihood of favorable intraday price movements and construct
        rule-based trading decisions grounded in statistical and predictive
        rigor.
      </p>

      <p>
        The baseline strategy is built using Exponential Smoothing models,
        including optimized α–β formulations, to capture short-term momentum and
        trend dynamics in FX price series. These models serve both as standalone
        signal generators and as benchmarks against which more advanced learning
        approaches are evaluated. Parameter optimization is performed to balance
        responsiveness and noise reduction, ensuring robustness across varying
        market regimes.
      </p>

      <p>
        On top of the classical framework, multiple machine learning classifiers
        are implemented to estimate the probability that the High price exceeds
        a predefined profit-taking threshold relative to the Open price. These
        models include Random Forests, XGBoost, Long Short-Term Memory (LSTM)
        networks, and Temporal Convolutional Networks (TCN). Feature sets are
        constructed from lagged OHLC data, engineered technical indicators, and
        rolling statistical measures, allowing the models to learn nonlinear
        relationships and temporal dependencies inherent in FX markets.
      </p>

      <p>
        The trading rule is defined in probabilistic terms: a position is entered
        only when the predicted probability of achieving the target return
        exceeds a configurable confidence threshold. This formulation enables
        explicit control over risk–reward trade-offs and facilitates systematic
        evaluation of model performance beyond raw classification accuracy. The
        comparative analysis highlights that while traditional smoothing methods
        perform well in stable regimes, deep learning models such as LSTM and TCN
        demonstrate superior adaptability under complex and volatile market
        conditions.
      </p>

      <p>
        The entire system is deployed as an interactive Streamlit application,
        allowing users to select FX pairs, adjust model parameters, visualize
        signals, and compare strategy performance across models in real time.
        This deployment bridges research and practice, transforming experimental
        models into a usable decision-support tool for FX trading analysis.
      </p>

      <p>
        The project concludes that integrating probabilistic machine learning
        models with classical time series techniques provides a powerful and
        flexible framework for FX signal generation. Future extensions include
        the incorporation of macroeconomic exogenous variables, regime detection,
        transaction cost modeling, and portfolio-level optimization across
        multiple currency pairs.
      </p>
    </div>
    ),
  },
  {
    href: "https://www.paperchase.ac/",
    title: "Paperchase AI — End-to-End Financial Intelligence Platform",
    description:
      "A comprehensive financial intelligence platform",
    thumbnail: "/images/paperchaseai1.png",
    images: [
      "/images/paperchaseai1.png",
      "/images/paperchaseai2.png",
      // "/images/paperchaseai3.png"
    ],
    stack: ["Time Series Analysis", "Power BI", "Agentic Systems", "Deep Learning", "Machine Learning"],
    slug: "paperchaseai",
    content: (
      <div>
        <p><strong>Detailed Tech Stack:</strong>  
          AI & Forecasting: AutoTS, NeuralForecast, SARIMA, LSTM, N-BEATS  
          LLM & Agents: Azure OpenAI (GPT-4o-mini), Multi-Agent Workflow, RAG  
          Backend: Python, FastAPI, Azure Functions, Azure SQL Server  
          Dashboards: React, Power BI Embedded, Streamlit  
          Data & Pipelines: Azure Data Factory, SQL Server, Pandas, Async Jobs</p>
        <p>
        Paperchase AI is a comprehensive financial intelligence platform designed for 200+ restaurants and hospitality groups, built to unify forecasting, automated insights, executive dashboards, and drill-through financial analysis. As the Founding AI Engineer, I led the creation of the platform&apos;s intelligence layer—combining forecasting, multi-agent AI commentary, and granular P&L/Balance Sheet exploration into a single system used daily by CFOs and finance directors. The platform significantly improved reporting efficiency, decision-making speed, and the depth of financial visibility across all client businesses.
        </p>
        <p>
        The platform offers a unified financial view by combining rich visual analytics with intelligent narrative insights. I built the core KPI dashboard that displays Revenue, COGS, Gross Profit, Operating Expense, and EBITDA across accounting periods, complete with automated MoM, YoY, and forecast-vs-actual comparisons. This allowed executives to instantly understand trends, margin movements, and cost structure shifts without manual spreadsheet work.</p>

        <p>Beyond high-level KPIs, I engineered a detailed P&L and Balance Sheet explorer integrated with Power BI. Users can drill from summary accounts all the way down to individual GL transactions, with opening and closing balances tied directly to SQL-backed financial records. This eliminated the need for finance teams to manually trace anomalies and reduced deep-dive analysis time by more than half.</p>{" "}

        <p>A major component of the product is the AutoML forecasting engine, which trains, compares, and selects models such as SARIMA, LSTM, N-BEATS, and AutoTS ensembles. The system automatically produces 12-month financial forecasts, evaluates model performance, and updates projections as new data arrives. This automation alone saved clients 15-20 hours per month and established a standardized forecasting framework across all sites.</p>

        <p>On top of the financial and forecasting layers, I built a multi-agent AI commentary system that generates account-wise explanations, variance analysis, and actionable recommendations. This agentic workflow mirrors how senior finance analysts write reports—first quantifying changes, then interpreting them, and finally providing strategic reasoning. The commentary dynamically populates the AI Insight panel in the dashboard, giving decision-makers contextually rich interpretations that previously required a full finance team to produce.</p>

        <p>All of this intelligence is powered by an Azure-based microservices architecture that I designed using FastAPI, SQL Server, and Azure Functions. Heavy workloads—such as multi-model training or generating multi-page commentary—run through asynchronous execution pipelines, ensuring responsiveness at scale and reducing reporting latency by nearly 40%.</p>

        <p>The result is a fully integrated product that empowers CFOs and executives with real-time visibility, automated insights, and predictive analytics—making Paperchase AI one of the most advanced financial reporting platforms in the hospitality analytics space.</p>

        <p><strong>Confidentiality Note:</strong> Certain Power BI balance sheet views, AI-generated financial reports, and internal templates cannot be shown publicly due to client confidentiality, but the features described reflect the actual system delivered.</p>
      </div>
    ),
  },
  {
    href: "https://drive.google.com/file/d/1ifI7p4PkfIVfg2vRjPw-sKFXm30l4Q8t/view?usp=drive_link",
    title: "Predictive Maintenance in SCANIA Trucks",
    description:
      "Mitigating failures by using Federated Learning and Explainable AI",
    thumbnail: "/images/diagram_minor.png",
    images: [
      "/images/diagram_minor.png",
    ],
    stack: ["Machine Learning", "Explainable AI", "Federated Learning"],
    slug: "pmscania",
    content: (
      <div>
        <p>
        Predictive maintenance is a vital approach in modern industries, enabling reduced downtime, optimized resources, and enhanced operational efficiency. This study develops a federated survival analysis framework augmented with explainable AI (XAI) to predict the Remaining Useful Life (RUL) of components and assess failure risks while preserving data privacy.{" "}
        </p>
        <p>
        The framework leverages federated learning to aggregate insights from decentralized data across multiple clients. Three survival models—Random Survival Forest (RSF), Gradient Boosting Survival Analysis (GBSA), and Support Survival Vector Machines (SSVM)—were evaluated across 10 federated clients over 10 rounds. Model performance was assessed using the Concordance Index (C-index), where RSF outperformed the others with global training and testing C-index values of 0.7577 and 0.7376, respectively. GBSA followed closely, while SSVM exhibited comparatively lower accuracy, highlighting its limitations in federated environments.
        </p>
        <p>
        Explainability was achieved through SHAP (SHapley Additive exPlanations), providing insights into feature contributions to model predictions. Key features, including 666_0, 309_0, and 158_8, were identified as critical predictors of survival outcomes. SHAP dependence plots illustrated complex feature interactions, while instance-specific force plots highlighted individual component risks, empowering maintenance teams to target high-risk components proactively.
        </p>
        <p>
        The RSF survivability plot demonstrated declining survival probabilities over time, enabling predictive maintenance planning. By identifying components with steeper survival declines, planners can prioritize repairs or replacements, reducing costs and operational disruptions. The federated approach successfully handled client heterogeneity, synthesizing insights from diverse data distributions without compromising data privacy.
        </p>
      </div>
    ),
  },
  {
    href: "https://drive.google.com/file/d/1rSmbVlX8G1SdT0GGpVcnLCq5P-Z3NmVH/view?usp=sharing",
    title: "Advanced Time Series Forecasting",
    description:
      "Time Series Forecasting with Exogenous Variables for Restarurants Globally",
    thumbnail: "/images/PC-1.png",
    images: [
      "/images/PC-1.png",
      "/images/PC-2.png"
    ],
    stack: ["Time Series", "Machine Learning", "Applied AI"],
    slug: "atsforecast",
    content: (
      <div>
        <p>
        This project explores the application of various forecasting models to predict sales data in a real-world business environment, focusing on both traditional time series models and advanced machine learning techniques. The study aims to compare the performance of models such as SARIMA and Exponential Smoothing with cutting-edge machine learning models, including Long Short-Term Memory (LSTM), NBEATS, and NHITS. Additionally, the research investigates the utility of automated machine learning platforms like Azure AutoML and AutoTS in simplifying the forecasting process while maintaining accuracy.
        </p>
        <p>
        The comparative analysis reveals that while traditional models are effective for simpler time series data with strong seasonal components, they struggle with complex patterns and are less adaptable to changes in data trends. In contrast, machine learning models, particularly LSTM and NBEATS, demonstrate superior performance in capturing intricate patterns and long-term dependencies, offering more accurate forecasts. Automated machine learning platforms significantly reduce the time required for model selection and optimization, making them accessible for businesses with limited data science expertise.
        </p>
        <p>
        The models were deployed in a production environment, where AutoTS was used for daily sales forecasting and Azure AutoML for hourly predictions. The results showed that both models delivered accurate forecasts closely aligned with actual sales data, with Mean Absolute Percentage Errors (MAPE) of 7% for daily forecasts and 7.67% for hourly forecasts. These findings underscore the practical utility of advanced forecasting models in business operations, providing actionable insights for decision-making in areas such as inventory management and staffing.
        </p>
        <p>
        The project concludes that while traditional models have their place, the integration of machine learning and automated tools into forecasting practices offers substantial advantages in terms of accuracy, adaptability, and efficiency. Future research directions include the integration of external data sources, real-time model retraining, the development of hybrid models, and the exploration of these methodologies across different industries. This work lays a strong foundation for the continued enhancement of forecasting models, with the potential to significantly impact business decision-making processes.
        </p>
      </div>
    ),
  },
  {
    href: "https://www.linkedin.com/posts/tanishpatel01_codeforgood-codeforgood-activity-7209043833530048512-ujm9?utm_source=share&utm_medium=member_desktop",
    title: "Margshala",
    description:
      "AI Career Assistant for Rural people",
    thumbnail: "/images/WhatsApp Image 2024-06-16 at 06.54.51.jpeg",
    images: [
      "/images/WhatsApp Image 2024-06-16 at 06.54.51.jpeg",
      "/images/illustration.png",
    ],
    stack: ["React.js", "Flask", "OpenAI", "MySQL"],
    slug: "margshala",
    content: (
      <div>
        <p>
        Developed a cutting-edge speech-to-speech assistant designed to facilitate communication in rural areas where technology adoption is limited. The frontend of the system was built using React, providing a user-friendly interface, while Flask handled the backend services, ensuring seamless integration and efficient processing. Oracle MySQL was employed for database management, offering robust data storage and retrieval capabilities. This assistant supports interactions in multiple vernacular languages, making it accessible to a wide range of users. Leveraging the power of OpenAI&apos;s GPT-4o, fine-tuned for specific language processing needs, and Whisper for accurate speech recognition, the system enables users to converse effortlessly in their native languages, promoting inclusivity and ease of use.{" "}
        </p>
        <p>
        The assistant&apos;s architecture is meticulously crafted to address the unique challenges faced by rural populations, especially those with limited exposure to advanced technology. By combining state-of-the-art speech recognition and natural language processing technologies, the platform offers an intuitive and responsive communication experience. The backend, built with Flask, ensures the system&apos;s operations are smooth and reliable, while Oracle MySQL provides a sturdy foundation for managing user data. This integration of React, Flask, and Oracle MySQL results in a powerful, yet lightweight solution that not only meets the users&apos; needs but also enhances their ability to communicate effectively. The assistant&apos;s ability to support multiple languages and dialects underscores its versatility and commitment to breaking down communication barriers in underserved communities
        </p>{" "}
      </div>
    ),
  },
  {
    href: "https://doi.org/10.1109/ACCESS.2024.3425226",
    title: "Demystifying Defects",
    description:
      "Federated Learning and Explainable AI for Semiconductor Fault Detection",
    thumbnail: "/images/illust_1.jpg",
    images: [
      "/images/illust_1.jpg",
      "/images/illust_2.png",
    ],
    stack: ["Python", "Tensorflow", "OpenCV", "Plotly"],
    slug: "demystifyingdefects",
    content: (
      <div>
        <p>
        The paper titled &quot;Demystifying Defects: Federated Learning and Explainable AI for Semiconductor Fault Detection&quot; introduces a novel approach to address the challenges in fault detection within the semiconductor manufacturing industry. Semiconductor manufacturing is a cornerstone of modern technology, crucial for producing devices ranging from smartphones to medical instruments. Detecting faults early in the manufacturing process is essential for ensuring product quality and reducing costs. Traditional fault detection methods often require the centralization of sensitive data, which can be problematic due to privacy concerns. The paper proposes the use of Federated Learning (FL) combined with Explainable AI (XAI) to create a decentralized model that respects data privacy while maintaining high detection accuracy. Federated Learning allows models to be trained on data distributed across multiple nodes without centralizing it, thereby preserving the confidentiality of proprietary designs and processes. Explainable AI, on the other hand, ensures that the model&apos;s decision-making process remains transparent and understandable to stakeholders.{" "}
        </p>
        <p>
        In the proposed framework, each stakeholder, such as Original Equipment Manufacturers (OEMs) or Integrated Device Manufacturers (IDMs), retains control over their data and contributes to the training of a shared model. This collaborative approach leverages the strengths of diverse datasets and machine learning models across different nodes. The combination of FL and XAI not only enhances the predictive accuracy of the model but also provides insights into how the model identifies faults, which is critical for building trust in automated fault detection systems. Empirical results from testing the proposed model on a public dataset show a significant improvement in defect detection, achieving an impressive test accuracy of 98.78%. This underscores the potential of the proposed method to revolutionize fault detection in semiconductor manufacturing, making the production process more reliable and efficient while safeguarding sensitive data.
        </p>{" "}
      </div>
    ),
  },
  {
    href: "",
    title: "Prognosis Assistant and Appointment Scheduler",
    description:
      "A comprehensive web application to assist in pre-doctor visit health analyses and streamline in-app appointment scheduling.",
    thumbnail: "/images/image (1).png",
    images: [
      "/images/image (1).png",
      "/images/image.png",
      "/images/plot1.png",
      "/images/WhatsApp Image 2023-11-09 at 00.42.51_d3d6b530.jpg",
      "/images/WhatsApp Image 2023-11-09 at 00.44.40_07aa976d.jpg",
    ],
    stack: ["HTML/CSS", "Django", "Scikit-Learn", "Streamlit"],
    slug: "prognosisappointment",
    content: (
      <div>
        <p>
        In an innovative project aimed at revolutionizing hospital appointment systems, I engineered an AI-driven scheduling platform designed to optimize appointment allocations. Leveraging a custom Genetic Algorithm, this platform dynamically adjusts and refines scheduling to meet the complex demands of healthcare environments. By simulating the natural selection process, the algorithm intelligently prioritizes patient needs, availability, and resource constraints to minimize waiting times. This innovative solution has successfully reduced patient waiting times by an average of 35%, significantly enhancing the overall efficiency of hospital operations. The reduction in wait times not only alleviates patient frustration but also contributes to a smoother workflow for hospital staff, ultimately leading to improved satisfaction for both patients and healthcare providers. This project stands as a testament to the power of AI in streamlining processes and elevating the quality of healthcare services.{" "}
        </p>
        <p>
        In addition to the AI-driven scheduling platform, I developed a comprehensive web application aimed at streamlining pre-doctor visit processes and simplifying in-app appointment scheduling. This web application is designed to assist patients in conducting preliminary health analyses before their appointments, providing insights that support doctors in making initial assessments. The application integrates predictive AI algorithms to analyze patient data, offering a preliminary diagnosis that can expedite the consultation process. This project has proven to be highly effective, improving patient processing times by 20%. By reducing the time required for initial assessments, the application not only enhances the patient experience but also allows doctors to focus more on personalized patient care. The dual impact of facilitating faster processing and aiding in initial diagnoses underscores the transformative potential of AI in healthcare, making this project a critical tool for modern medical practices.
        </p>{" "}
      </div>
    ),
  },
  {
    href: "https://github.com/tanishpatel0106/Pythakon22-SitRight",
    title: "Posture Correction using Computer Vision",
    description:
      "DL and ML Approaches for Real Time Posture Detection and Correction",
    thumbnail: "/images/Setup.png",
    images: [
      "/images/Setup.png"
    ],
    stack: ["Python", "OpenCV", "Tensorflow"],
    slug: "posturecorrection",
    content: (
      <div>
        <p>
        I developed a cutting-edge real-time posture correction system that harnesses the power of advanced computer vision and deep learning techniques to analyze and improve user movements. This innovative system utilizes sophisticated algorithms to monitor and evaluate posture in real-time, providing instant feedback to users. In testing phases, it has demonstrated a remarkable 20% improvement in posture accuracy among test groups. This improvement highlights the significant impact that machine learning can have on health and ergonomics, offering a tangible solution to the pervasive issue of poor posture in modern lifestyles. The system&apos;s design reflects a deep integration of artificial intelligence with healthcare, emphasizing its potential to enhance everyday well-being and productivity through technology.{" "}
        </p>
        <p>
        Additionally, I have successfully patented this posture correction system, emphasizing its originality and potential market impact. The system employs mathematical modeling and is built on robust IoT platforms such as the Jetson Nano and Raspberry Pi 4. These platforms, known for their computational capabilities and versatility, are coupled with MediaPipe and other AI techniques to ensure accurate posture detection and correction. By leveraging these technologies, the system is capable of delivering high-performance posture analysis in a compact and cost-effective manner. This patent not only validates the uniqueness of the solution but also positions it as a valuable tool in the realm of smart health and ergonomic applications
        </p>{" "}
      </div>
    ),
  },
  {
    href: "https://link.springer.com/book/9789819767939",
    title: "FL for State of Charge Prediction",
    description:
      "Data-Driven SoC Forecasting in Electric Vehicles: A Federated Learning Perspective",
    thumbnail: "/images/SOC_1.png",
    images: [
      "/images/SOC_1.png",
      "/images/SOC_2.png",
    ],
    stack: ["Python", "Scikit-Learn", "Power BI"],
    slug: "flsocpred",
    content: (
      <div>
        <p>
        Electric Vehicles (EVs) are pivotal for sustainable transportation, but their widespread adoption is hindered by challenges in accurately estimating the State of Charge (SoC). Current SoC estimation methods often lack precision, leading to range anxiety among EV users. This study explores Federated Learning to enhance SoC estimation in EVs. This approach promises more accurate and privacy-conscious predictions, aiming to improve EV reliability and user confidence, and support sustainable mobility. This study is motivated by this transformative shift in India&apos;s mobility sector and seeks to contribute to this movement by enhancing SoC estimation in EVs, supporting the government&apos;s vision of a cleaner, more efficient, and technologically advanced transportation system.{" "}
        </p>
        <p>
          <b>Model Performance Consistency</b>: Across the rounds of federated learning, there was a consistent performance in SoC prediction accuracy. The R-squared (R2) values were predominantly high, suggesting that a significant portion of the variance in SoC was captured by the models. <br></br> <b>Error Metrics Trends</b>: The Mean Squared Error (MSE), Mean Absolute Error (MAE), and Root Mean Squared Error (RMSE) metrics fluctuated across rounds, indicating the models&apos; varying degrees of prediction precision in different rounds. The general trend for these error metrics decreased, suggesting that the model was adjusting well to the SoC prediction task over time. <br></br> <b>Optimization Over Rounds</b>: The optimization of models as evidenced by the error metrics and R2 value typically showed improvement as the number of rounds increased. This indicates that the federated learning process is effectively refining the model&apos;s predictive capabilities with each round.
        </p>{" "}
      </div>
    ),
  },
];
