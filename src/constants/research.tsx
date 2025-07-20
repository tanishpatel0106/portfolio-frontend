import { ResearchItem } from "@/types/research";

export const research: ResearchItem[] = [
  {
    slug: "demystifying-defects-fl-xai",
    thumbnail: "/images/first-image.png",
    images: ["/images/first-image.png", "/images/illust_1.jpg", "/images/illust_2.png"],
    title: "Demystifying Defects: Federated Learning and Explainable AI for Semiconductor Fault Detection",
    category: "Industrial Research",
    role: "Lead Author",
    summary:
      "A novel semiconductor fault detection framework that combines Federated Learning and Explainable AI to enable high-accuracy, privacy-preserving, and interpretable defect classification across decentralized datasets",
    description: null,
    descriptionHtml: `
    <section>
      <h3>Abstract</h3>
      <p>
      Semiconductor manufacturing, a critical driver of modern technology, involves intricate processes for fabricating integrated circuits on materials like silicon. This industry&apos;s pivotal role spans various applications, from smartphones to computers, emphasizing the importance of fault detection to ensure the reliability and cost-efficiency of electronic devices. Fault detection within this sector entails collaboration among multiple stakeholders, including Original Equipment Manufacturers (OEMs), Integrated Device Manufacturers (IDMs), wafer foundries, and software providers. A common challenge is the reluctance to share sensitive design data centrally, which is essential for building traditional machine learning models. To overcome these challenges, this paper introduces an innovative fault detection model that leverages Federated Learning (FL) and Explainable AI (XAI). FL&apos;s decentralized approach enhances model learning across multiple nodes without requiring the pooling of sensitive data, thus preserving data privacy. Concurrently, XAI ensures that the developed models maintain transparency and trustworthiness, even when trained on distributed datasets. This FL-based fault detection model permits stakeholders to train ML models on node-specific data without centralizing sensitive information. It accommodates heterogeneous and asynchronously-stored data, diverse machine learning models, and nodes with varying capacities and data volumes. By addressing the opacity of deep learning models, FL and XAI unveil their predictive behaviors in identifying semiconductor faults. Empirical results, obtained using a public dataset, demonstrate a significant improvement in defect identification precision, achieving an exceptional test accuracy of 98.78%. These findings underscore the potential of the proposed approach to transform fault detection in semiconductor manufacturing, thereby enhancing the reliability and efficiency of the production process.
      </p>
    </section>
    <section>
      <h3>Overview of the Work</h3>
      <p>
      The problems of defect classification are a persistent problem for the semiconductor sector, which is the backbone of contemporary technology. Defect identification and categorization are extremely difficult tasks due to the complex and integrated structure of semiconductor manufacture processes. Numerous flaws can affect semiconductor wafers, such as lithographic mistakes, etch anomalies, and material contaminants. The performance and dependability of the finished product can be greatly impacted by these flaws, so it is critical to accurately detect and classify them in order to uphold strict quality and yield standards. The sheer volume and variety of faults in semiconductors presents one of the main categorization challenges. Conventional detection methods are insufficient for semiconductor wafer defects since they might vary widely in size, shape, and kind. Additionally, as a result of the semiconductor industry&apos;s rapid growth, feature sizes are getting smaller and smaller. This makes defect detection more difficult because previously trivial faults are now crucial failure points.
      </p>
      <p>
      The enormous volume of data produced throughout the semiconductor manufacturing process is another major obstacle. Modern semiconductor fabrication plants are outfitted with a multitude of sensors that produce vast amounts of data. This data must be efficiently evaluated in order to discover defects. Conventional defect classification techniques are labor-intensive and prone to mistakes and inconsistencies since they frequently rely on manual inspection or basic computational approaches.Defect classification is further complicated by the dynamic nature of semiconductor processes, which involve constant adjustments to production conditions and process recipes in order to maximize performance. This dynamic environment necessitates the use of adaptive classification methods that may change as process conditions do. FL represents a transformative approach in the realm of semiconductor defect classification, addressing some of the most significant challenges faced by the industry. By enabling data to remain on local devices while aggregating model updates centrally, FL offers a solution to the privacy and security concerns associated with transferring large volumes of sensitive manufacturing data over networks. This decentralized learning paradigm allows for the collection and analysis of a diverse and comprehensive dataset from various points in the semiconductor manufacturing process without compromising on data confidentiality. Furthermore, FL facilitates the creation of more robust and generalized models by leveraging data from a multitude of sources, each with potentially unique defect characteristics and manufacturing environments. This approach not only enhances the accuracy of defect classification models but also adapts to the dynamic nature of semiconductor processes by continuously learning from new data. Incorporating FL into semiconductor defect analysis empowers the industry to harness the full potential of AI while addressing data privacy, security, and model generalization challenges head-on, paving the way for more resilient and efficient manufacturing processes.
      </p>
      <p>
      These difficulties highlight the necessity for sophisticated techniques in semiconductor defect classification that can manage enormous datasets, accommodate a wide range of dynamic defect forms, and yield accurate and consistent classification results. Herein lies the potential benefit of combining XAI techniques with deep learning models. Deep learning models are useful for identifying and categorizing a variety of semiconductor flaws because of their capacity to analyze massive amounts of data and discover intricate patterns. However, the often &apos;black box&apos; nature of these models raises concerns about interpretability and trustworthiness, which is where XAI methods come into play. By providing insights into the decision-making process of deep learning models, XAI methods enhance transparency and reliability, making them indispensable tools in the quest for efficient and accurate semiconductor defect classification.
      </p>
    </section>
    <section>
      <h3> XAI and its significance </h3>
      <p>
      XAI addresses the interpretability issue in deep learning models. Despite their effectiveness in many sectors, deep learning models are frequently called “black boxes,” having no visibility into how they make judgements. In sensitive fields like healthcare, finance, and autonomous systems, trust, diagnosticity, and compliance are crucial. XAI aims to make model outputs understandable to human specialists. Not enough can be said about XAI in deep learning. XAI ensures that AI models are unbiased and fair, simplifies model debugging and enhancement, and helps comply with regulations by explaining model judgements. XAI is both technological and legal because the EU&apos;s General Data Protection Regulation (GDPR) requires automated systems to explain their judgements.
      </p>
      <p>
      XAI approaches include various explainability aspects. Gradient-based approaches, such Gradient-weighted Class Activation Mapping (Grad-CAM), highlight prediction-critical input image regions and provide heatmaps to illustrate CNN results. Others, like Local Interpretable Model-agnostic Explanations, seek model-agnostic explanations. LIME perturbs input data and observes output to approximate the model locally. Approaches like SHAP (Shapley Additive Explanations) although being an excellent tool for generating explainable insight, it fails to provide high visual interpretability in terms of overlapping the explanations received from the same. Whereas, Grad-CAM and LIME align more to the fundamental aspect of the study, which being the need to visually interpret which parts of the images contribute to model decisions. The use of XAI techniques in the field of semiconductor defect categorization may enhance the dependability and credibility of automated inspection systems. Engineers can improve the production process and quality control procedures to lower the frequency of faults by knowing the reasoning behind specific classifications.
      </p>
    </section>
    <section>
      <h3>Proposed Setup</h3>
        <p>In this work, we present a FL setup with a distributed dataset of about 38,000 images across 38 classes, specifically designed for the purpose of semiconductor defect classification. We present the Explainable AI (XAI) techniques that are used to analyze the results, together with an overview of the FL framework and the model training procedure.</p>

        <p>Ten clients make up our federated system, and each one has a portion of the complete dataset. These clients are specific manufacturing facilities or inspection stations that include hardware for taking pictures that can capture images of semiconductors. In order to preserve data security and privacy, a FL strategy is suitable given the sensitive nature of the data and the proprietary processes it represents.</p>

        <p><strong>Initialization:</strong> The global model is initialized by a central server. A Convolutional Neural Network (CNN) is a suitable option for image classification because of its ability to handle picture data. To maintain uniformity, the model architecture and hyperparameters are predefined and shared throughout customers.</p>

        <p><strong>Local Training:</strong> Using the FedAvg algorithm, each client trains the model independently on its own dataset. The clients calculate changes to the model weights after completing multiple training epochs on their individual datasets.</p>

        <p><strong>Communication:</strong> Each client (typically a manufacturing unit or inspection station equipped with sensors and imaging tools) sends updates to the central server after conducting local training on its model weights. These updates pertain solely to the parameters of the model, rather than the raw data gathered from the wafer inspection processes. To enhance the security of this sensitive information during transmission, the model weight updates can be encrypted. This ensures that proprietary or confidential information about the semiconductor manufacturing process is protected against potential interception or unauthorized access while maintaining the privacy of the data.</p>

        <p><strong>Aggregation and Differential Privacy:</strong> These updates are combined into a new global model by the central server. Differential privacy is maintained during this aggregation process by introducing Gaussian noise into the updates, guaranteeing that the contributions from distinct clients cannot be identified.</p>

        <p><strong>Global Model Update:</strong> The server uses the aggregated, differentially private changes to update the global model. It then returns the updated global model to the clients for the subsequent training cycle.</p>

        <p><strong>Iteration:</strong> Until the model&apos;s performance converges or reaches a predetermined accuracy criterion, this process is repeated multiple times.</p>

        <p><strong>Final Model Weights:</strong> The final model weights are exported as an H5 file, which is a common file format used to store neural network weights, after training is finished.</p>

        <p>We use XAI approaches to interpret the federated model&apos;s decision-making process once it has been trained. Ensuring that the model&apos;s predictions are transparent and comprehensible to human specialists is the aim. The subsequent actions are performed:</p>

        <p><strong>Model Interpretation:</strong> To provide mathematical and visual justifications for the model&apos;s predictions, we utilize a range of XAI techniques, including Grad-CAM, LIME, and Meaningful Perturbations. By emphasizing the areas of the pictures that have the most influence on the categorization choice, these techniques can shed light on the behavior of the model.</p>

        <p><strong>Using XAI on Test Data:</strong> A series of test photos are subjected to the interpretability techniques, and the outcomes are examined in order to assess the model&apos;s effectiveness. We can check if the model is concentrating on the right patterns and features related to semiconductor faults using methods like heatmaps and feature significance scores.</p>

        <p><strong>Assessment and Feedback Loop:</strong> The interpretations support a qualitative assessment of the model. A feedback loop is created where the knowledge collected can be used to improve the model or data collecting procedure if the XAI approaches show that the model is making judgments based on extraneous features or artifacts.</p>

        <p><strong>Results:</strong> The results of the XAI techniques are recorded in thorough reports that give stakeholders intelligible explanations of the model&apos;s decision-making procedure. This can help in fine-tuning the model even further and informing choices about using it in real-world settings.</p>

        <p>Designed to align with current industry standards, the fault detection model is capable of handling diverse semiconductor wafer data. This allows for the training and deployment of a robust global model. Industries can incorporate an MLOps Continuous Integration and Continuous Delivery (CI/CD) pipeline for real-time integration. This will enable the model to continuously train on new data and provide real-time predictions. The model&apos;s ability to generalize effectively is supported by a wide range of data sources and ongoing learning through Federated Learning. The deep learning architectures excel at capturing intricate patterns, while Explainable AI ensures transparency in the model&apos;s decision-making process.</p>

        <p>The fault detection model proposed in this study is currently tailored for the semiconductor wafer field, as it relies on and is trained with semiconductor wafer images. Nevertheless, the fundamental structure stated, which combines Federated Learning (FL), deep learning, and Explainable AI (XAI), exhibits notable flexibility and may be customized for different fault detection systems in the manufacturing industry and beyond. Industries that prioritize identifying faults or anomalies in their operations can derive significant advantages from the robust capabilities of this model. While the model was originally designed for semiconductors, its fundamental ideas can be applied to several domains, providing answers to sectors facing comparable issues of data privacy and the requirement for sophisticated pattern recognition.</p>

        <p>The FL and XAI-based fault detection model is adaptable to evolving semiconductor processes, including nm-scale manufacturing, by leveraging continuous learning and robust deep learning capabilities. Successfully addressing challenges like increased data complexity and new defect types ensures the model&apos;s effectiveness in advanced technological environments.</p>

        <p>The goal is to develop a reliable, private-preserving, and comprehensible model for semiconductor defect classification by combining FL with XAI. This method makes sure that the predictive potential of deep learning may be used while upholding strict guidelines for openness and result credibility.</p>

    </section>
    <section>
      <h3> Conclusion and Future Scope </h3>
      <p>The integration of FL and XAI into semiconductor failure detection is a manufacturing technology frontier with challenges and potential. Due to the high costs of model training and updates across geographically scattered nodes, FL systems require optimised communication methods. Communication efficiency affects the system&apos;s ability to recognise manufacturing faults and intervene quickly.</p>

      <p>The development of algorithms that can navigate data heterogeneity between these nodes is also crucial. Such advances would ensure that model predictive performance is unaffected by data distribution, amount, and quality. These systems&apos; capacity to scale large datasets from semiconductor manufacturing processes without compromising detection accuracy or computational efficiency is a promising research field.</p>

      <p>Integration of these powerful AI technologies into semiconductor manufacturing infrastructure is difficult and requires novel solutions to assure interoperability and minimal operational impact. Quantum computing could improve data processing in these systems, enabling fault detection with remarkable precision and speed. FL and XAI in manufacturing require robust ethical and legal frameworks. These guidelines would promote ethical use and industry-wide adoption of these technologies.</p>

      <p>Ultimately, interdisciplinary collaboration using semiconductor physics, materials science, and AI could accelerate defect detection system development. These systems would be more accurate, efficient, and able to provide deeper insights into the manufacturing process, leading the semiconductor industry to a future where defects are detected and preemptively addressed by AI.</p>

      <p>This paper has demonstrated that the integration of Federated Learning (FL) and Explainable AI (XAI) can achieve not only a high accuracy rate in fault detection within complex multi-stakeholder settings, such as those found in the semiconductor industry, but also ensure decision transparency and privacy protection. The application of XAI techniques has significantly improved the understanding of fault detection models developed through FL.</p>

      <p>By employing methods such as Grad-CAM heatmaps and LIME, we have gained deeper insights into how these models process data and make decisions. This has confirmed the models&apos; ability to identify critical fault characteristics pertinent to semiconductor production and has ensured that, despite the distributed nature of the data and the learning process, the operations of the models remain transparent and intelligible.</p>

      <p>The synergy between FL and XAI techniques has proven crucial for maintaining trust in the models&apos; predictions, especially in an industry where central sharing of sensitive design data is a significant concern. By achieving an exceptional level of accuracy in fault detection, as evidenced by the remarkable test accuracy of 98.78%, the proposed model sets the stage for significant enhancements in quality control measures.</p>

      <p>This could lead to a notable reduction in production faults and associated costs, marking a significant advancement towards more reliable and efficient semiconductor manufacturing processes. Additionally, the incorporation of XAI not only enhances the precision of these models but also adds a layer of transparency and accountability essential in sectors where the clarity and defensibility of decision-making processes are critical.</p>
    </section>
    `,
    tags: ["Federated Learning", "Explaianable AI", "Fault Detection", "Edge Intelligence"],
    pdf: "/assets/papers/demystifying-defects.pdf",
    bibtex: "@ARTICLE{10589388,  author={Patel, Tanish and Murugan, Ramalingam and Yenduri, Gokul and Jhaveri, Rutvij H. and Snoussi, Hichem and Gaber, Tarek},  journal={IEEE Access},   title={Demystifying Defects: Federated Learning and Explainable AI for Semiconductor Fault Detection},   year={2024},  volume={12},  number={},  pages={116987-117007},  keywords={Fault detection;Semiconductor device modeling;Semiconductor device manufacture;Explainable AI;Semiconductor process modeling;Neural networks;Fault diagnosis;Classification algorithms;Data privacy;Deep learning;Trusted computing;Artificial intelligence;Classification algorithms;data privacy;deep learning;explainable artificial intelligence;trusted AI;semiconductor materials},  doi={10.1109/ACCESS.2024.3425226}}",
    authors: ["Tanish Patel", "Ramalingam Murugan", "Gokul Yenduri", "Rutvij H Jhaveri", "Hichem Snoussi", "Tarek Gaber"],
    methodology: [
      "Federated Model Training Across Distributed Nodes",
      "Deep Neural Network-Based Wafer Defect Classification",
      "Explainability via Gradient and Local Surrogate Methods",
      "Differentially Private Aggregation of Model Updates"
    ],
    results:
      "The proposed ResNet152-based federated learning model achieved a test accuracy of 98.78%, significantly outperforming baseline models and demonstrating strong generalization and interpretability through Grad-CAM and LIME visualizations.",
    links: {
      DOI: "https://ieeexplore.ieee.org/document/10589388",
    },

  },
  {
    slug: "burnout-dtss-xai",
    thumbnail: "/images/THESIS_F.png",
    images: ["/images/THESIS_F.png", "/images/THESIS_1.png", "/images/THESIS_2.png"],
    title: "Impact of Digital Transformation on Mental Health of IT Professionals",
    category: "Undergraduate Thesis",
    role: "Principal Investigator",
    summary:
      "An explainable machine learning framework that predicts technostress and burnout in IT professionals using hybrid survey-synthetic data and SHAP-based insights to support proactive mental health interventions.",
    description: null,
    descriptionHtml: `
    <section>
      <h3>Abstract</h3>
      <p>Digital transformation stress (DTSS) and burnout among IT professionals were predicted using advanced data-driven approaches. Reflecting newly developing practice in health analytics, we expanded the dataset by combining responses from actual occupational surveys with synthetic generated data. Trained to predict individual DTSS and burnout scores were four supervised models: Random Forest, Decision Tree, XGBoost, and Support Vector Regression. (DTSS here represents employees' stress resulting from fast ICT-driven change; burnout is handled per WHO as chronic occupational stress syndrome.) Held-out data allowed RMSE and <i>R<sup>2</sup></i> to evaluate model performance. The XGBoost regressor achieved the best accuracy (RMSE = 0.0216, <i>R<sup>2</sup></i> = 0.9835) for DTSS prediction; Random Forest was best for burnout prediction (RMSE = 0.0701, <i>R<sup>2</sup></i> = 0.9945). These strong <i>R<sup>2</sup></i> values show that the models captured the majority of the variance in stress results.</p>
      <p>We utilized SHapley Additive exPlanations (SHAP) to the trained models to guarantee interpretability. The top predictors of both DTSS and burnout, according to SHAP, were high workload, upskilling pressure, and emotional self-regulation challenges. Especially, DTSS has been proposed to result from elements like time pressure and high workload during organizational transformation. Workers who reported high task loads, ongoing expectations to pick up new skills, and poor emotional coping had the highest expected stress.</p>
      <p>All told, our XAI-powered method reveals their causes and provides accurate stress projections. We show that machine learning can routinely identify psychosocial risk factors by aggregating real-world and synthetic survey data and using tree-based models. The SHAP-based explanations make the forecasts actionable: companies can track these indicators (workload, upskilling stress, etc.) in real time and respond early to protect employee mental health. This paper shows how explainable machine learning models could guide early interventions to avert severe burnout or DTSS and promote continuous mental-health surveillance in IT companies.</p>
    </section>
    <section>
      <h3>Overview of the Work</h3>
      <p>This thesis uses machine learning combined with actual survey data to forecast technostress and burnout among IT professionals. Starting with a well-crafted survey grounded in studies on occupational health psychology and technology acceptance, data collection began. Over forty topics spanning several spheres—including demographics, work conditions (remote, hybrid, on-site), emotional responses (frustration, tiredness, pride), exposure to digital transformation, reactions to artificial intelligence systems, and effects on work-life balance—were surveyed. The survey's small response rate, a typical difficulty in mental health research notwithstanding its comprehensiveness, reflects this.</p>
      <p>Using a fine-tuned LLaMA-based large language model (LLM), a dual-dataset approach was used to generate synthetic answers, thereby overcoming data constraints. Having been trained on OSMI survey data and psychological literature, the LLM generated realistic responses by modeling several participant profiles. This expanded the dataset, preserving contextual credibility and boosting variance. Real and synthetic replies were combined to provide a richer dataset with the understanding that synthetic data complements, rather than replaces, real data.</p>
      <p>Derived from the dimensions of the Maslach Burnout Inventory (Emotional Exhaustion, Depersonalization, and Reduced Personal Accomplishment), Burnout Score (B) and Digital Transformation Stress Score (DTSS)—a composite metric capturing stress from techno-overload, automation anxiety, job insecurity, and upskilling pressure—were the two primary quantitative targets developed. For modeling purposes, both scores were normalized between 0 and 1.</p>
      <p>Given its mix of accuracy and interpretability, a Random Forest model was selected for prediction. With appropriate preprocessing—including label encoding, missing value imputation, and feature scaling—the model was trained on the combined dataset. Classification and regression tools were used to evaluate model performance.</p>
      <p>SHapley Additive exPlanations (SHAP) were used to expose how predictions were influenced by input features (e.g., AI anxiety, work hours, tech overwhelm), thereby ensuring explainability. This interpretability phase turned model outputs into actionable insights by highlighting important stress drivers such as automation fear and work-life imbalance, enabling organizations to take focused action.</p>
      <p>To evaluate and comprehend technostress and burnout, this approach combines dual-sourced data, predictive analytics, and explainable artificial intelligence—offering both measurable outcomes and practical organizational insight.</p>
    </section>
    <section>
      <h3>Methodology</h3>
      <p>The design that this study uses a convergent parallel architecture in spirit; the synthetic data and the quantitative survey data are gathered (or produced) in tandem and subsequently combined for analysis. Our strategy combines empirical and simulated quantitative data unlike a traditional mixed-method design that could call for qualitative interviews and quantitative surveys. Two reasons support this hybrid design. First, real-world data from IT experts captures real experiences of burnout and stress in the workforce, therefore offering ground truth and external validity. Second, addressing edge instances and combinations of elements either unusual or absent in the survey sample, the synthetic data add breadth and scenario diversity. Combining various datasets guarantees a more strong modeling activity than depending just on one collection. Especially, the synthetic cases are produced depending on theoretical and empirical knowledge and thereafter utilized as extra data points for model training, functioning rather as augmented observations. This design decision solves typical problems such class imbalance and small sample size. Increasing real datasets with LLM-generated samples has been shown in recent studies to enhance model generalization and cover niche circumstances not well-represented in actual data. In our setting, integrating synthetic respondents (e.g., a nervous mid-career manager, a beginner developer burdened by continuous upskill needs, etc.), guarantees the model interacts with a broad spectrum of profiles.</p>
      <p>A key basis for turning raw survey responses into quantitative objectives fit for machine learning prediction is the establishment of consistent, theory-grounded scoring measures. Two main outcome variables—the Digital Transformation Stress Score (DTSS) and the MBI-based Burnout Score—are constructed in this part. Based on accepted psychological theories and customised to the particular survey form intended for this research, both measures are mathematically formalised.</p>
      <p>Burnout, as defined by the MBI framework, is a multidimensional syndrome marked by emotional depletion, depersonalization, and diminished personal accomplishment. These elements capture several but connected facets of how workers deal with ongoing stress in their jobs.</p>
      <p>Three dimensions—exposure and demands, emotional and cognitive reactions, and organizational pressure—allow DTSS to capture psychological strain from digital change. Digital Transformation Expositional Requirements (DTEE / D<sub>1</sub>) dimension evaluates exposure to demands for digital transformation and adaptation:</p>
      <p><strong>D<sub>1</sub></strong> = (Exposure + Upskill Pressure + Overwhelm + Mental Health Impact) × 1/4</p>
      <p>Emotional & Cognitive Reactions (ECR / D<sub>2</sub>) is captured via the following adaptation:</p>
      <p><strong>D<sub>2</sub></strong> = (Tech Overwhelm + Tool Anxiety + Career Stability Worry) × 1/3</p>
      <p>Similarly, Organizational Pressure & Structural Concerns (OPS / D<sub>3</sub>) is captured via the following adaptation:</p>
      <p><strong>D<sub>3</sub></strong> = (Unrealistic Expectations + Error Likelihood Concern + Workflow Disconnection) × 1/3</p>
      <p>Working professionals' real-world data was gathered by means of a structured online questionnaire sent via Google Forms. Participation was voluntary and anonymous; informed permission was requested at the outset. For quantitative data, the survey had closed-ended questions using Likert-type or frequency scales; for qualitative insights, it included open-ended questions. It was broken down into various pieces covering personal issues as well as workplace events connected to burnout and technostress.</p>
      <p>Formulated as a supervised regression problem, the modeling challenge is to predict normalized burnout and DTSS scores using structured data obtained from employee replies. Demographic information (e.g., role, experience), behavioral indicators (e.g., emotional awareness), technical stress markers (e.g., AI-related anxiety, digital transformation worries), and work setting factors (e.g., team size, work mode) are among these elements.</p>
      <p>Although predicted accuracy is a necessary standard for assessing machine learning models, accuracy by itself is inadequate in applying artificial intelligence to delicate, human-centric fields as workplace mental health. Understanding why a model gets at its predictions is equally, if not more, crucial in settings where predictions affect well-being interventions, corporate policies, or employee support initiatives than the prediction itself. Without openness, even top-notch models run the danger of being discounted by practitioners, under attack by impacted parties, or worse—used without responsibility.</p>
      <p>The Explainable AI (XAI) framework applied in this work to interpret and validate the predictions of burnout and digital transformation stress (DTSS) is presented in this part. The work guarantees that every prediction can be broken down into feature-level contributions by using SHAP (SHapley Additive exPlanations), a mathematically rigorous, model-agnostic explanation method grounded in cooperative game theory. Building corporate trust, spotting any biases, and allowing human-in---the-loop decision-making—particularly in relation to employee wellness—all depend on this degree of interpretability.</p>
      <p>Starting with a thorough theoretical background of SHAP including formal mathematical formulas and fairness guarantees, the section It then describes the computational techniques utilized for tree-based models and support vector regression, therefore outlining how SHAP was applied over all model kinds employed in this research. At last, it emphasizes why explainability is not only a theoretical need but also a pragmatic need for companies trying to morally use AI-driven mental health monitoring technologies. By means of this explainability layer, the research closes the gap between computational predictions and organizational actionability, so converting model outputs into insights enabling effective, accountable, open, and transparent workplace interventions.</p>
    </section>
    <section>
      <h3>Results</h3>
      <p>The two jobs clearly differed. Linked closely to digital transformation experiences, DTSS was modeled with more accuracy than burnout, implying the survey more directly caught DTSS drivers. Burnout prediction reflected its complexity by suffering more scattered signals and reduced R². On both challenges, model-wise ensembles (Random Forest, XGBoost) routinely beat simpler learners most likely because bagging and boosting can capture nonlinearities and feature interactions missed by single trees.</p>
      <p>According to SVR's intermediate results, kernel approaches may underperform when many interdependent features exist even if they manage some nonlinearity. By themselves, decision trees displayed the most variation and instability.</p>
      <p>From an interpretability perspective, SHAP's offered complimentary insights. Features of both DTSS and burnout models matched domain knowledge (e.g., job strain for burnout, technological load for DTSS). This correlation strengthens trust: HR or mental health experts might observe that the model "thinks" in the same words they do. The consistency aspect of SHAP allows one to compare similar feature effects amongst models, hence supporting generalizability. Still, significant variation in feature ranking amongst models emphasizes how important explainability is alongside performance.</p>
      <p>Practically speaking, our results imply that, when combined with SHAP, sophisticated models such as XGBoost can effectively capture patterns of occupational stress without compromising interpretability. This is important for organizational use: decision-makers—such as HR managers—need open justification for any assessment motivated by artificial intelligence. SHAP enables the conversion of numerical models into useful insights by indicating which elements most affect forecasts.</p>
      <p>All things considered, ensemble models perform better on these psychological measures and SHAP explanations fit real-world ideas of digital stress and burnout, hence producing accurate and interpretable AI results for use in mental health contexts.</p>
    </section>
    <section>
      <h3>Future Scope</h3>
      <p>Using more comprehensive data and stronger machine learning models will help advance the predictive framework. Deep learning methods, for instance, may capture complex, multi-scale temporal patterns in workloads. Recent studies on physician burnout prediction have shown how a hierarchical deep sequence encoder can combine low-level activity logs into daily metrics and then into monthly summaries, preserving long-term dynamics without overwhelming model complexity. Similarly, hybrid systems such as coupled LSTM–Transformer networks have achieved state-of-the-art accuracy on challenging time-series tasks. Ensemble techniques can also build resilience. For example, stacking several neural networks—including specialist and differentiator classifiers—has improved burnout and stress classification performance.</p>
      <p>These developments suggest that deeper models or transformer-based encoders should be integrated into future pipelines. To capture stress evolution over time, modeling longitudinal or sequential data—such as using LSTM or attention mechanisms over temporal survey and digital trace data—should also be prioritized. Importantly, these advanced models must retain interpretability by continuing to use SHAP or similar explainability techniques. This ensures that rising predictive power does not come at the cost of clinical transparency.</p>
      <p>Future research should move beyond surveys to incorporate multimodal data streams that provide a more objective view of stress and burnout. Passive digital trace data may include calendar usage, email and text activity, smartphone or computer logs, and more—each offering subtle indicators of cognitive and emotional load. Studies on college students have demonstrated how stress levels can be inferred from smartphone app usage patterns, such as excessive messaging or sleep disturbance proxies. Individualized models revealed that digital stress markers vary by user.</p>
      <p>Physiological sensors offer another layer of insight. Measures such as heart rate variability (HRV), galvanic skin response, movement tracking, and keyboard dynamics have all been investigated. Wearables like smartwatches or electrocardiogram patches have been proposed for screening burnout in high-stress roles. Machine learning models that combine behavioral data with physiological signals have achieved high accuracy, particularly using deep neural networks trained on HRV or EMG data. A multimodal approach—combining surveys with passive sensor data—may significantly enhance sensitivity to early technostress and burnout. Environmental sensors, smartphone-based monitoring, and digital biomarkers like keystroke dynamics and mouse usage all fall within this scope.</p>
      <p>At the organizational level, these technologies could be embedded into HR and wellness systems to enable real-time monitoring and intervention. Dashboards based on modeled risk scores could flag teams or individuals facing escalating stress levels, guiding timely support. AI-powered systems could continuously collect survey results, usage logs, and wearable signals to detect early signs of burnout or technostress, enabling wellness teams to act proactively. Sentiment analysis and workload trends could trigger confidential coaching prompts when risk levels rise.</p>
      <p>However, real-world deployment requires ethical safeguards. Data privacy and regulatory compliance (such as HIPAA and GDPR) are essential. Participation should be voluntary, data anonymized where possible, and usage clearly explained. Importantly, AI should augment—not replace—human oversight. Mental health professionals should be part of the loop, with interfaces that allow for review and override of model suggestions. All actions, such as outreach, must be carried out with human empathy. Organizations that prioritize transparency and human-centered design can leverage machine learning while respecting individual dignity.</p>
      <p>Generalizability must also be a focus. Stressors and norms differ widely across sectors and geographies, so models should be retrained and adapted for various organizational contexts. For example, digital work habits in healthcare differ greatly from those in finance. Longitudinal studies that track stress over time will allow for the adaptation of models in response to temporal drift. Transfer learning or cohort-wise modeling can help scale findings while maintaining robustness across different populations.</p>
      <p>This trajectory underscores the need for multidisciplinary collaboration between social sciences and computer science. Improved models will raise deeper questions about organizational culture and employee experience. Insights from psychology can guide feature selection and intervention design, while machine learning can validate and scale evidence-based strategies. The goal is not only better algorithms, but algorithms embedded within real theories of workplace well-being—bridging human understanding and digital intelligence to foster healthier work environments.</p>
    </section>
    <section>
      <h3>Conclusion</h3>
      <p>The psychosocial environment of the workplace is undergoing a considerable transition in our era, which is characterized by the unrelenting pace of technical advancement. The way in which professionals engage with their work surroundings has been rethought as a result of the widespread adoption of artificial intelligence, automation, and remote work infrastructures, as well as the digitalization of organizational activities. The most notable of these new psychological burdens are digital transformation stress (DTSS) and occupational burnout. These innovations promise to bring about unparalleled levels of efficiency and agility; nevertheless, they also bring about new psychological difficulties.</p>
      <p>In order to forecast, comprehend, and maybe minimize the hidden costs of digital transformation on employee mental health, the purpose of this thesis was to computationally analyze these interconnected phenomena. This was accomplished by utilizing machine learning (ML) and explainable artificial intelligence (XAI). This work produced a robust dataset that reflected the multifaceted experiences of IT professionals managing digital disruption. The structure of this dataset was based on a mixed-method data strategy that blended real-world survey data with synthetically generated instances utilizing large language models.</p>
      <p>The development and application of predictive models that are able to estimate two crucial psychological outcomes—namely, burnout and digital transformation stress (DTSS)—were the primary focuses of this research. Not only did the thesis achieve great predictive performance in both tasks, but it also provided accessible explanations for how these predictions were generated. This was accomplished through a methodical pipeline that included data cleansing, feature engineering, model training, and SHAP-based interpretability analysis. In order to present a comparative picture of algorithmic behaviors, the use of four machine learning models—Random Forest, Decision Tree, XGBoost, and Support Vector Regression (SVR)—was utilized. This allowed for the identification of important strengths and weaknesses across both prediction goals.</p>
      <p>Ensemble models, such as XGBoost and Random Forest, have repeatedly demonstrated superior performance in comparison to simpler algorithms when it comes to DTSS prediction. These models were able to successfully capture the non-linear interactions between technological overwhelm, pressure to upskill, and anxiety about collaboration, resulting in low prediction errors and strong explanatory power. The SHAP study shed light on the psychological factors that contribute to digital stress, thereby validating theoretical constructs such as technostress producers, which include techno-overload, techno-insecurity, and techno-complexity, as actual predictors inside the learned representations of the model.</p>
      <p>On the other hand, predicting burnout proved more difficult, which reflects the multi-faceted and intensely personal nature of professional tiredness. Despite the fact that Random Forest emerged as the most consistent performer, the overall model accuracy was lower than that of DTSS. This suggests that burnout may be driven by elements that are more subtle and heterogeneous, which go beyond the boundaries of structured survey data. In spite of this, the interpretability of SHAP showed that workload intensity (e.g., number of hours worked), perceived work-life balance, and emotional regulation capacity were consistently among the most influential factors driving burnout predictions. These findings offer practical pathways for enterprises to mitigate exhaustion through workload management, emotional resilience training, and supportive remote work policies.</p>
      <p>Particularly noteworthy is the fact that this thesis revealed that explainable artificial intelligence is not merely a technological add-on but a fundamental prerequisite for deploying machine learning in human-centered domains such as mental health risk assessment. SHAP explanations enabled stakeholders to move beyond black-box forecasts by delivering trustworthy, transparent, and contextually grounded interpretations of model behavior. Organizational decision-makers could diagnose systemic flaws, validate model fairness, and design targeted interventions based on feature-level rationale.</p>
      <p>Furthermore, this research highlighted the practicality of integrating predictive mental health analytics into organizational practice, as well as the ethical responsibility required to do so. The thesis presented a responsible AI deployment framework that balances innovation with employee autonomy and dignity, covering issues such as data governance, privacy, and human-in-the-loop oversight. Proposed applications included HR analytics dashboards, wellness monitoring systems, and proactive intervention tools as a blueprint for responsible, data-driven organizational health management.</p>
      <p>The study also acknowledged limitations and highlighted future opportunities. While surveys offer rich subjective insights, they may fall short of fully capturing the complex, multimodal nature of stress. Future work could explore behavioral trace data, biometric signals, and longitudinal tracking to construct multi-dimensional digital phenotypes of stress. Advanced deep learning architectures—such as transformer-based temporal models—offer promising pathways to capture time-sensitive dynamics in burnout and stress risk. Validations across sectors and cultures are essential for ensuring generalizability and fairness in diverse organizational ecosystems.</p>
      <p>To summarize, this thesis marks a pioneering step in enabling computationally informed mental health stewardship in the digital workplace. It offers a scalable, transparent, and ethically grounded paradigm for forecasting and mitigating the psychological consequences of digital transformation. By combining the rigor of machine learning with the interpretive clarity of explainable AI, this work equips organizations to design evidence-based interventions, support employee well-being, and shape the future of responsible, human-centered artificial intelligence in modern work environments.</p>
    </section>

    `,
    tags: ["Explainable AI", "Stress Detection", "Digital Transformation", "Mental Health"],
    pdf: "/assets/papers/MP_Report_BTech.pdf",
    bibtex: "@btechthesis{patel2025impact, author={Tanish Patel}, title={Impact of Digital Transformation on the Mental Health of IT Professionals}, school={Pandit Deendayal Energy University}, type={B.Tech. Thesis}, year={2025}, address={Gandhinagar, India}, month={May}, note={Supervised by Dr. Rutvij H. Jhaveri}, keywords={Digital Transformation, Mental Health, IT Professionals, Machine Learning, Explainable AI, Technostress, Burnout}}",
    authors: ["Tanish Patel", "Rutvij H Jhaveri"],
    methodology: [
      "Survey-Driven and LLM-Augmented Dataset Creation",
      "Burnout and DTSS Prediction via Tree-Based ML Models",
      "Model Interpretability using SHAP Explainable AI Techniques",
      "Comparative Evaluation using RMSE and R² Metrics"
    ],
    results:
      "The XGBoost model achieved 98.35% R² for DTSS prediction and Random Forest reached 99.45% R² for burnout prediction, with SHAP-based explainability revealing workload, upskilling pressure, and emotional regulation as key stress drivers.",
    // links: {
    //   DOI: "https://ieeexplore.ieee.org/document/10589388",
    // },
    
  },
  {
    slug: "fed-soc-ev",
    thumbnail: "/images/SOC_PHOTO_1.png",
    images: ["/images/SOC_PHOTO_1.png", "/images/SOC_2.png"],
    title: "Data-Driven SoC Forecasting in Electric Vehicles: A Federated Learning Perspective",
    category: "Smart Grid and Electric Vehicles",
    role: "Co-Author",
    summary:
      "A data-driven State of Charge forecasting framework for Electric Vehicles that leverages Federated Learning and ensemble machine learning to deliver privacy-preserving, accurate, and scalable battery state estimation across decentralized sources",
    description: null,
    descriptionHtml: `
    <section>
      <h3>Abstract</h3>
      <p>
      Electric vehicle (EV) adoption stands as a pivotal step in curbing carbon emissions and combating climate change. However, the persistent specter of range anxiety continues to impede widespread acceptance. Traditional State of Charge (SoC) estimation methods, coupled with basic machine learning models, grapple with accuracy and adaptability limitations. Yet, the advent of Federated Learning heralds a transformative era in the EV landscape, placing a premium on data security and privacy. This approach involves training models across a network of distributed sources, such as individual EVs, harnessing the wealth of diverse data streams. It continually refines models, ensuring SoC calculations maintain precision as the EV fleet evolves. Notably, it fortifies against cyberattacks by obviating centralized data storage. Embracing Federated Learning within the EV industry not only alleviates range anxiety but also fosters sustainable transportation, underscoring the role of EVs in shaping an ecologically conscious future. This paper concentrates on SoC estimation through the prism of Federated Learning. Techniques including Federated Averaging, Differential Privacy Techniques, and Ensemble Learning will be employed. To facilitate this research, a comprehensive vehicle model, encompassing the powertrain and heating circuit, was validated through real driving trips with a BMW i3 (60 Ah), yielding the requisite dataset. This dataset underwent meticulous extraction, cleansing, and exploratory data analysis involving numerous parameters. These preparatory steps lay the groundwork for the subsequent application of Federated Averaging, Differential Privacy Techniques, and Ensemble Learning to the dataset, aiming for precise SoC estimation.
      </p>
    </section>
    <section>
      <h3>Overview of the Work</h3>
      <p>The evolution of electric vehicles (EVs) has brought forth a myriad of technological advancements and challenges. Among the most crucial aspects of EVs is the "State of Charge" (SoC), which refers to the current battery capacity as a percentage of its maximum capacity. Understanding the SoC is pivotal, not only for users who need to know when to recharge their vehicles but also for manufacturers and service providers aiming to optimize battery lifespan and vehicle performance.</p>
      <p>However, the estimation of SoC is not a straightforward task. Traditional methods rely heavily on historical data and simplistic models, often leading to inaccuracies. Moreover, the dynamic nature of EV usage patterns adds another layer of complexity to SoC estimation. However, the mere recognition of SoC's importance isn't sufficient. The precision in its estimation is equally, if not more, crucial. Accurate estimation of the State of Charge ensures the safe operation of EVs, providing real-time data that can be pivotal for decisions related to charging, discharging, and overall vehicle operation. </p>
      <p> In the quest for more accurate and efficient methods of data processing and analysis, the concept of Federated Learning emerges as a promising approach. Federated Learning is a machine learning technique where the model is trained across multiple decentralized devices or servers holding local data samples, without exchanging the data itself. This method stands in stark contrast to traditional centralized learning and offers significant advantages, especially in terms of data privacy and efficiency. </p>
      <p>With the increasing integration of EVs into our daily lives, the datasets associated with them have become more comprehensive and valuable. This upsurge in data brings to light the indispensable need for robust cybersecurity measures. Any compromise in the EV dataset could lead to severe consequences, ranging from financial losses to potential threats to passenger safety.</p>
      <p>This is where the beauty of Federated Learning truly shines. By allowing data to remain on local devices and only updating the model's parameters, Federated Learning inherently provides an added layer of cybersecurity. Not only does this approach enhance the protection of sensitive data, but it also paves the way for more collaborative and large-scale machine learning endeavors without the associated risks of data breaches.</p>
    </section>
  <section>
      <h3>Methodology</h3>
      <p>
        The methodology of this research is structured around the principles of Federated Learning, which allows for decentralized model training while preserving data privacy. The process begins with the collection of real-world drive cycle data from a BMW i3, focusing on the first 10 Category A files due to processing constraints. This dataset undergoes rigorous preprocessing, including cleaning missing values, removing outliers, and standardizing features.
      </p>
      <p>
        Exploratory data analysis is performed to identify the most relevant parameters for SoC prediction, leading to the selection of 13 key features. The dataset, comprising over 2 million datapoints, is then utilized in a Federated Learning framework where local models are trained on individual EV nodes. These local models are subsequently aggregated at a central server using Federated Averaging, ensuring that raw data remains on the local devices.
      </p>
      <p>
        Various regression algorithms are applied, including Lasso, Ridge, ElasticNet, Support Vector Regression (SVR), Random Forest, and Gradient Boosting. Each algorithm employs different regularization techniques to balance model complexity and accuracy. The performance of these models is evaluated based on metrics such as Root Mean Square Error (RMSE) and R².
      </p>
  <p>
    The dataset used in this research was sourced from an open-access repository and includes real-world drive cycles from a BMW i3, with only the first 10 Category A files selected due to processing constraints. Data preprocessing involved cleaning missing values, removing outliers, and standardizing features, followed by exploratory analysis using correlation heatmaps to identify the 13 most relevant parameters for SoC prediction.
  </p>
  <p>
    With over 2 million datapoints extracted, Federated Learning (FL) was employed to preserve data privacy by allowing distributed local training and global model aggregation without raw data sharing. The study incorporated various regression algorithms including Lasso, Ridge, and ElasticNet, each leveraging different regularization techniques to balance model simplicity and accuracy in a federated setup. Advanced regressors like Support Vector Regression (SVR), Random Forest, and Gradient Boosting were integrated for their superior handling of non-linear patterns and robustness across high-dimensional datasets.
  </p>
  <p>
    The FL pipeline involved client-level local training followed by weighted aggregation at a central server, repeated over multiple rounds to iteratively improve the global model’s generalization performance. This methodology demonstrated that Random Forest achieved the highest accuracy (RMSE: 0.232, R²: 0.9996), validating the effectiveness of federated ensemble learning for accurate and private SoC estimation in EVs.
  </p>
    </section>
    <section>
    <h3>Results</h3>
    <p>
      The global shift toward electric vehicles (EVs) has intensified the need for advanced battery management systems, with particular emphasis on the accurate prediction of State of Charge (SoC), which not only mitigates range anxiety for users but also supports grid-level energy optimization as EV batteries increasingly act as distributed energy storage units. Traditional SoC estimation techniques, while valuable, often struggle with non-linear battery behaviors and external influences, necessitating more sophisticated approaches such as machine learning (ML). This study systematically evaluates six ML models—Lasso Regression, Ridge Regression, ElasticNet, Support Vector Regression (SVR), Random Forest Regressor, and Gradient Boosting Machine (GBM)—within a federated learning (FL) framework, which preserves privacy by training locally on distributed datasets without centralizing raw data. To assess model performance, several statistical metrics were employed: Mean Squared Error (MSE), which emphasizes large errors and is sensitive to outliers; Mean Absolute Error (MAE), a more uniform measure of average prediction accuracy; Root Mean Squared Error (RMSE), providing interpretable error magnitude in original units; and the Coefficient of Determination (R²), which quantifies the proportion of variance explained by the model. The federated training process utilized weighted global aggregation across ten rounds using distinct CSV files, accommodating non-uniform datasets by adjusting client contributions accordingly. Each model underwent careful hyperparameter tuning, with ElasticNet combining L1 and L2 penalties, Ridge minimizing multicollinearity effects through L2 regularization, and Lasso promoting feature sparsity. SVR leveraged an RBF kernel to capture non-linearities, while Random Forest and GBM applied ensemble learning to sequentially or independently aggregate decision trees for higher accuracy. Visualization plots were generated to illustrate model behavior across rounds. Final performance results show Random Forest Regressor achieving the highest accuracy with an RMSE of 0.232 and R² of 0.9996, followed by GBM with comparable performance, indicating their suitability for high-dimensional, non-linear SoC prediction tasks in privacy-sensitive contexts. Hyperparameter configurations and training plots affirm the robustness and scalability of this federated learning pipeline. These findings underline the transformative potential of ensemble-based federated ML models for real-world EV deployments, where accurate, resilient, and interpretable battery state estimation is vital for optimizing user experience and sustainable energy ecosystems.
    </p>
    </section>
    `,
    tags: ["Federated Learning", "Electric Vehicles (EVs)", "State of Charge Estimation", "Privacy-Preserving ML"],
    pdf: "/assets/papers/data-soc-ev.pdf",
    bibtex: "@inproceedings{patel2023data, title={Data-Driven SoC Forecasting in Electric Vehicles: A Federated Learning Perspective}, author={Patel, Tanish and Gaikwad, Harshvardhan}, booktitle={International Conference on Computational Modeling and Sustainable Energy}, pages={667--686}, year={2023}, organization={Springer} }",
    authors: ["Tanish Patel", "Harshvardhan Gaikwad"],
    methodology: [
      "Federated Model Training Across Electric Vehicle Nodes using Federated Averaging",
      "Exploratory Data Analysis and Preprocessing on Real-World BMW i3 Drive Cycle Data",
      "Application of Supervised ML Models including Lasso, Ridge, ElasticNet, SVR, Random Forest, and Gradient Boosting",
      "Weighted Aggregation of Locally Trained Models Preserving Data Privacy"
    ],
    results:
      "The Random Forest-based federated learning framework achieved the best performance with an RMSE of 0.232 and R² of 0.9996, surpassing traditional regression baselines and validating the feasibility of privacy-preserving, high-accuracy SoC estimation across distributed EV datasets.",
    links: {
      DOI: "https://doi.org/10.1007/978-981-97-6794-6_42",
    },

  },
    {
    slug: "cybersec-iov",
    thumbnail: "/images/IOV_1.png",
    images: ["/images/IOV_1.png", "/images/IOV_2.png"],
    title: "Enhancing Cybersecurity in Internet of Vehicles: A Machine Learning Approach with Explainable AI for Real-Time Threat Detection",
    category: "Cybersecurity and Smart Infrastructure",
    role: "Lead Author",
    summary:
      "A machine learning and Explainable AI-based cybersecurity framework for the Internet of Vehicles that enables real-time, interpretable, and high-accuracy threat detection while ensuring model transparency and operational reliability in connected vehicular networks.",
    description: null,
    descriptionHtml: `
    <section>
      <h3>Abstract</h3>
      <p>
        The proliferation of IoV technologies has revolutionized the use of transport systems to a great level of improvement in safety and efficiency, and convenience to users. On the other hand, increased connectivity has also brought new vulnerabilities, making IoV networks susceptible to a wide range of cyber-attacks. The contribution of this paper is the in-depth study of the development and evaluation of advanced machine learning (ML) models that detect and classify network anomalies in IoV ecosystems. Several classification models have been studied in our research to achieve high accuracy for discriminating between benign and malicious traffic. This work further harnesses Explainable AI (XAI) methodologies through the LIME framework for enhanced interpretability of models' decision-making processes. Experimental results strongly advocate the strength of Random Forest and XGBoost, proving to be better on the binary and multi-class classification tasks, respectively. Due to resilience, preciseness, and scalability these models are a practical choice in real-world IoV security frameworks. Explainability integrated not only strengthens model reliability but also closes the gap between performance and interoperability in vehicular networks. 
      </p>
    </section>
    <section>
      <h3>Overview of the Work</h3>
      <p>The emerging paradigm of technology, the Internet of Vehicles (IoV), enables two-way communication between vehicles, infrastructure, and external networks, driving advancements in safety, efficiency, and user convenience in transportation. Increased interconnectivity stemming from IoV induces several cybersecurity problems in its systems — principally vulnerability to DoS, spoofing, and intrusion attacks. Such threats would degrade the integrity of vehicle operations and safety for the passengers, and hence, security must become an integral part of IoV development. In this dynamic environment where traditional security mechanisms face a challenge in scaling up real-time adaptability for IoV to recognize and neutralize these threats, this scenario needs IoT-based, edge-controlled, real-time security.</p>
      <p>The innovation of machine learning (ML) models happens to be one of the most powerful methods of identifying and classifying potential cyber threats within an IoV system processing a huge volume of real-time data. At the same time, a model must be able to explain why it has arrived at a certain decision. This need further strengthens the importance of Explainable Artificial Intelligence (XAI), providing insights into complex models' processes of decision-making and improving trustworthiness. XAI contributes to the improvement of interpretability of ML models and can be leveraged in IoV applications for real-time detection of threats, forming a major step toward establishing trust in automated systems. XAI-based systems are particularly essential for real-time prediction and threat mitigation in the IoV context.</p>
      <p>This paper proposes the development and testing of ML models against binary and multi-class classifications to solve the aforementioned cybersecurity challenges arising within IoV systems. Understanding not only how but also why a model reaches a conclusion is important for building trust and ensuring system safety in IoV. The key contributions of this work are:</p>
      <ul>
        <li>This study compares different ML models, such as the Support Vector Classifier, Decision Tree, and Logistic Regression against Random Forest and XGBoost, while establishing the latter to be better in IoV security contexts.</li>
        <li>The models Random Forest and XGBoost show very high accuracies of up to 99% in binary as well as multi-class classifications for benign and malicious traffic.</li>
        <li>The LIME method gives complete insight into what affects the made predictions, and as a result, the system becomes more interpretable and can be trusted.</li>
      </ul>
      <p>Critical developments in IoV cybersecurity on the application of ML and XAI in real-time threat detection are discussed in the literature review. The section on the applied methodologies covers how data collection was done, pre-processing techniques, and finally, the ML models used for network traffic classification, including applied explainability techniques like LIME. Finally, the Results section discusses in detail the models for performance evaluation of binary and multi-class classifications, in which the respective accuracy, precision, recall, and the principal F1 score are compared. In conclusion, the paper emphasizes the importance of the proposed method and outlines directions for further research, including how federated learning with blockchain technologies can work together to enhance IoV security.</p>
    </section>
    <section>
      <h3>Methodology</h3>
      <p>The great strides in IoV-related technologies have significantly enhanced transportation safety, operational efficiency, and user convenience. Advanced sensors are linked via complex networks, and today's vehicles pride themselves on an unparalleled level of interconnectivity. However, this also opens the door for new vulnerabilities, making IoV systems prone to cyber-attacks that could compromise operational safety and system integrity.</p>

    <p>To address these threats, this study develops and evaluates machine learning (ML) models for traffic classification in IoV. The goal is not only to detect harmful activities with high accuracy but also to understand which features most influence classification results. This understanding is crucial for interpreting and trusting decisions in critical security applications.</p>

    <p>The study applies both binary and multi-class classification approaches to detect various types of cyberattacks such as DoS and spoofing (Gas, RPM, Speed, Steering Wheel). Vehicles are instrumented with sensors to record parameters such as speed, gas level, and RPM. This data is sent to a central system, preprocessed, and then used to train various ML models including Random Forest, XGBoost, and Support Vector Classifier. The best-performing models are further analyzed using LIME to improve their interpretability.</p>

    <h4>Data Collection &amp; Preprocessing</h4>

    <h5>Data Collection from IoV Systems</h5>
    <p>The IoV system collects real-time sensor data including:</p>
    <ul>
      <li><strong>Vehicle Speed:</strong> Fluctuations may indicate control system failures.</li>
      <li><strong>RPM:</strong> Monitors operational behavior.</li>
      <li><strong>Gas Level:</strong> Sudden changes may suggest spoofing attempts.</li>
      <li><strong>Steering Wheel Position:</strong> Tracks unauthorized use or changes in direction.</li>
    </ul>
    <p>All sensors transmit data to a master node which aggregates it into a large dataset describing the vehicle’s current operational state. This raw data is then cleaned and prepared for ML model training.</p>

    <h5>Data Preprocessing</h5>
    <ul>
      <li><strong>Data Cleaning:</strong> Missing values are filled using median imputation to preserve integrity.</li>
      <li><strong>Feature Encoding:</strong> One-hot encoding is used for categorical data like sensor status and attack labels.</li>
      <li><strong>Normalization:</strong> All features (e.g., speed, RPM) are scaled to [0, 1] using min-max scaling:
        <br />
        <code>x_norm = (x - x_min) / (x_max - x_min)</code>
      </li>
      <li><strong>Class Imbalance:</strong> SMOTE is applied to oversample minority classes for improved learning.</li>
      <li><strong>Dimensionality Reduction:</strong> PCA is used to reduce feature space and remove redundancy.</li>
    </ul>

    <h4>ML Models</h4>
    <p>The following ML models were trained and evaluated:</p>

    <h5>Random Forest</h5>
    <p>An ensemble model that combines multiple decision trees to improve accuracy and reduce variance. Each tree is trained on a random subset of data. Predictions are combined using weighted voting.</p>

    <h5>Decision Trees</h5>
    <p>A transparent model that splits data using feature thresholds based on metrics like Gini index or Information Gain. Simple but interpretable.</p>

    <h5>Support Vector Classifier (SVC)</h5>
    <p>Finds the hyperplane that maximizes class separation. Suitable for handling non-linear separable data. Solves the optimization problem:
    <code>min (1/2) ||w||² subject to yᵢ(w·xᵢ + b) ≥ 1</code></p>

    <h5>Extreme Gradient Boosting (XGBoost)</h5>
    <p>Boosting method that builds trees sequentially to correct previous errors. The objective function balances classification loss and model complexity:
    <code>L(θ) = Σ l(yᵢ, ŷᵢ) + Σ Ω(fₖ)</code></p>

    <h5>Logistic Regression (Baseline)</h5>
    <p>A classic model for binary classification, using the sigmoid function to estimate class probabilities. Used here for benchmarking more advanced models.</p>

    <h4>Generating Explainability from LIME</h4>
    <p>LIME (Local Interpretable Model-Agnostic Explanations) is applied to the best-performing model to explain individual predictions. It perturbs input features and fits a local, interpretable model (e.g., linear regression) to approximate the original black-box model’s decision boundary.</p>

    <h5>Algorithm Workflow</h5>
    <ol>
      <li><strong>Data Collection:</strong> Collect sensor data and transmit to central system.</li>
      <li><strong>Preprocessing:</strong> Perform cleaning, encoding, scaling, SMOTE, and PCA.</li>
      <li><strong>Model Training:</strong> Train and tune ML models using cross-validation and evaluate using accuracy, precision, recall, and F1 score.</li>
      <li><strong>Model Selection:</strong> Choose the top-performing model based on metrics.</li>
      <li><strong>LIME Integration:</strong> Generate local explanations by perturbing inputs and fitting simple models to highlight important features.</li>
      <li><strong>Deployment:</strong> Deploy the model into IoV systems and establish a feedback loop for continuous improvement.</li>
    </ol>

    <p>LIME works by minimizing the following objective:
    <code>min₍g∈G₎ Σ πₓ(xᵢ') · L(f(xᵢ'), g(xᵢ')) + Ω(g)</code><br />
    Here, <code>πₓ(xᵢ')</code> weights local instances, <code>L</code> measures loss, and <code>Ω(g)</code> penalizes complexity.</p>

    <p>This technique identifies the most impactful features (e.g., RPM, steering angle) behind model decisions and improves transparency in classifying traffic as benign or malicious. It enables the system to identify patterns characteristic of various attacks like DoS or spoofing.</p>

    <p>In summary, the methodology combines robust machine learning with explainable AI to offer both accurate and interpretable threat detection for IoV networks. The proposed system is designed to adapt dynamically to evolving threats while preserving stakeholder trust in the decision-making process.</p>
    </section>
    <section>
    <h3>Results and Discussion</h3>

    <p>An evaluation was conducted to assess the effectiveness of different ML models in the context of IoV security. This includes both multi-class and binary classification tasks for which the models applied were XGBoost (XGB), Random Forest Classifier (RFC), Support Vector Classifier (SVC), Decision Tree (DT), and Logistic Regression. Accuracy, Precision, Recall, and F1 Score were used as evaluation metrics.</p>

    <h4>Binary Classification Results</h4>
    <ul>
      <li><strong>XGB:</strong> Achieved 0.98 accuracy, 0.99 precision, 0.9802 recall, and 0.9801 F1 score. Demonstrated effective separation of benign and malicious data.</li>
      <li><strong>RFC:</strong> Outperformed all with 0.99 accuracy and F1 score of 0.9851. Excellent for real-time binary classification in IoV systems.</li>
      <li><strong>SVC:</strong> Scored 0.95 accuracy, but lower recall at 0.8692 indicated occasional missed attacks.</li>
      <li><strong>DT:</strong> 0.96 accuracy and 0.88 F1 score, but reduced recall suggested susceptibility to missing edge-case attacks.</li>
      <li><strong>Logistic Regression:</strong> Lowest performance, with 0.90 accuracy and 0.84 F1 score, highlighting its limitations in complex threat contexts.</li>
    </ul>

    <h4>Multi-Class Classification Results</h4>
    <ul>
      <li><strong>XGB:</strong> Maintained high performance with 0.98 accuracy and 0.9801 F1 score across all attack types.</li>
      <li><strong>RFC:</strong> Matched or exceeded XGB in performance, scoring 0.99 on most metrics—highly suitable for real-world deployment.</li>
      <li><strong>SVC:</strong> Achieved 0.94 accuracy, with reduced F1 at 0.8749, indicating difficulty with nuanced attack classification.</li>
      <li><strong>DT:</strong> Performed steadily with 0.95 accuracy and 0.8887 F1 score, though slightly weaker than RFC and XGB.</li>
      <li><strong>Logistic Regression:</strong> Performed worst with 0.80 accuracy and 0.72 F1 score, unsuitable for fine-grained multi-class scenarios.</li>
    </ul>

    <h4>Model Comparisons and Observations</h4>
    <p>RFC and XGB consistently outperformed other models in both binary and multi-class contexts, offering robust classification with high recall and precision. Logistic Regression's simplicity made it a poor fit for the complexity of IoV traffic. SVC and DT showed acceptable performance but lacked the robustness of ensemble methods.</p>

    <h4>LIME-Based Explainability Insights</h4>
    <p>Applying LIME to high-performing models like RFC and XGB provided interpretability crucial for trust in security systems. In binary classification, LIME highlighted <code>DATA_3</code>, <code>DATA_7</code>, <code>DATA_0</code>, <code>DATA_1</code>, and <code>DATA_2</code> as influential features. The model confidently predicted 'Attack' with probability 1.00, showing strong feature discrimination.</p>

    <p>In multi-class scenarios, for instance, RPM spoofing, <code>DATA_0</code> had the highest contribution (value: 2.00), followed by <code>DATA_1</code>, <code>DATA_2</code>, and <code>DATA_5</code>. Predictions were accurate with probability 1.00 for the correct class, and 0.00 for others, demonstrating LIME’s value in local interpretability.</p>

    <p>This interpretability enhances user confidence, ensures transparency in real-time decisions, and is essential for securing critical IoV applications.</p>

    <h4>Summary Table of Results</h4>
    <table border="1" style="width:100%; text-align:center; border-collapse:collapse;">
      <thead>
        <tr>
          <th>Model</th>
          <th>Classification Type</th>
          <th>Accuracy</th>
          <th>Precision</th>
          <th>Recall</th>
          <th>F1 Score</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>XGBoost</td><td>Binary</td><td>0.98</td><td>0.99</td><td>0.98</td><td>0.98</td></tr>
        <tr><td>Random Forest</td><td>Binary</td><td>0.99</td><td>0.99</td><td>0.98</td><td>0.99</td></tr>
        <tr><td>SVC</td><td>Binary</td><td>0.95</td><td>0.93</td><td>0.87</td><td>0.91</td></tr>
        <tr><td>Decision Tree</td><td>Binary</td><td>0.96</td><td>0.90</td><td>0.82</td><td>0.88</td></tr>
        <tr><td>Logistic Regression</td><td>Binary</td><td>0.90</td><td>0.88</td><td>0.79</td><td>0.84</td></tr>
        <tr><td>XGBoost</td><td>Multi-Class</td><td>0.98</td><td>0.99</td><td>0.98</td><td>0.98</td></tr>
        <tr><td>Random Forest</td><td>Multi-Class</td><td>0.99</td><td>0.99</td><td>0.98</td><td>0.99</td></tr>
        <tr><td>SVC</td><td>Multi-Class</td><td>0.94</td><td>0.90</td><td>0.82</td><td>0.87</td></tr>
        <tr><td>Decision Tree</td><td>Multi-Class</td><td>0.95</td><td>0.91</td><td>0.83</td><td>0.89</td></tr>
        <tr><td>Logistic Regression</td><td>Multi-Class</td><td>0.80</td><td>0.79</td><td>0.65</td><td>0.72</td></tr>
      </tbody>
    </table>
    </section>
    <section>
    <h3>Future Work &amp; Conclusion</h3>

    <p>This study demonstrates that machine learning models, particularly Random Forest and XGBoost, when combined with Explainable AI (XAI) techniques such as LIME, can significantly enhance cybersecurity in Internet of Vehicles (IoV) systems. The models achieved high precision in distinguishing between valid and malicious traffic, but further calibration of predictive accuracy can improve overall resilience. The successful application of LIME highlights the growing demand for interpretability in cybersecurity solutions, especially in safety-critical environments where trust in model decisions is paramount.</p>

    <p>Integrating explainability bridges the gap between black-box model performance and transparent decision-making, which is essential for stakeholder confidence and real-time deployment in IoV security frameworks.</p>

    <p>Looking ahead, <strong>federated learning</strong> offers a transformative solution to privacy and data-sharing constraints in IoV ecosystems. By enabling decentralized model training across multiple vehicles, this approach avoids centralizing sensitive data, thereby minimizing risks of data breaches during transmission. Additionally, federated learning enhances system scalability and keeps critical information—such as location and vehicle identifiers—confined to edge nodes, improving both privacy and performance.</p>

    <p>Moreover, the integration of <strong>federated learning with blockchain</strong> technologies can ensure tamper-proof aggregation and verifiable model updates through immutable ledgers. This combination can facilitate predictive modeling that detects anomalous IoV behavior in real time and automatically triggers alerts or countermeasures to mitigate potential cyber threats before they escalate.</p>

    <p>However, future work is needed to explore the viability of these techniques in real-world deployments. Key research areas include:</p>
    <ul>
      <li>Evaluating communication overhead and synchronization latency in federated settings</li>
      <li>Assessing robustness of decentralized models against adversarial attacks</li>
      <li>Studying the trade-offs between computational efficiency and detection accuracy on resource-constrained vehicle nodes</li>
    </ul>

    <p>In conclusion, the integration of predictive ML models, federated learning, and blockchain represents a critical step forward in securing the rapidly evolving IoV landscape. These technologies together can ensure scalable, privacy-preserving, and trustworthy solutions that will enable safer autonomous and connected transportation systems in the future.</p>

    </section>
    `,
    tags: ["Cybersecurity", "Internet of Vehicles", "Machine Learning", "Privacy-Preserving ML"],
    pdf: "/assets/papers/acm-sac-paper.pdf",
    bibtex: "@inproceedings{10.1145/3672608.3707769, author={Patel, Tanish and Jhaveri, Rutvij and Thakker, Dhavalkumar and Verma, Sandeep and Ingle, Palash}, title={Enhancing Cybersecurity in Internet of Vehicles: A Machine Learning Approach with Explainable AI for Real-Time Threat Detection}, booktitle={Proceedings of the 40th ACM/SIGAPP Symposium on Applied Computing}, year={2025}, pages={2024--2031}, publisher={Association for Computing Machinery}, address={New York, NY, USA}, isbn={9798400706295}, doi={10.1145/3672608.3707769}, url={https://doi.org/10.1145/3672608.3707769}, keywords={artificial intelligence, cybersecurity, explainable artificial intelligence, internet of vehicles, machine learning}, abstract={The proliferation of IoV technologies has revolutionized the use of transport systems to a great level of improvement in safety and efficiency, and convenience to users. On the other hand, increased connectivity has also brought new vulnerabilities, making IoV networks susceptible to a wide range of cyber-attacks. The contribution of this paper is the in-depth study of the development and evaluation of advanced machine learning (ML) models that detect and classify network anomalies in IoV ecosystems. Several classification models have been studied in our research to achieve high accuracy for discriminating between benign and malicious traffic. This work further harnesses Explainable AI (XAI) methodologies through the LIME framework for enhanced interpretability of models' decision-making processes. Experimental results strongly advocate the strength of Random Forest and XGBoost, proving to be better on the binary and multi-class classification tasks, respectively. Due to resilience, preciseness, and scalability these models are a practical choice in real-world IoV security frameworks. Explainability integrated not only strengthens model reliability but also closes the gap between performance and interoperability in vehicular networks.}, location={Catania International Airport, Catania, Italy}, numpages={8}, series={SAC '25} }",
    authors: ["Tanish Patel", "Rutvij H Jhaveri", "Dhavalkumar Thakker", "Sandeep Verma", "Palash Ingle"],
    methodology: [
      "Collection of real-time vehicular telemetry data including speed, RPM, gas level, and steering angle from IoV systems",
      "Preprocessing pipeline with data cleaning, one-hot encoding, min-max scaling, SMOTE for class balancing, and PCA for dimensionality reduction",
      "Training and evaluation of multiple supervised learning models including Logistic Regression, Decision Tree, Support Vector Classifier, Random Forest, and XGBoost for binary and multi-class threat classification",
      "Integration of Explainable AI using LIME to interpret model predictions and identify critical features influencing classification decisions"
    ],
    results:
      "Random Forest and XGBoost achieved the highest performance, with up to 99% accuracy and F1 scores in both binary and multi-class tasks. The integration of LIME provided actionable interpretability, enabling identification of key sensor features such as RPM and gas level, thereby enhancing trust and transparency in real-time threat detection within IoV networks.",
    links: {
      DOI: "https://doi.org/10.1145/3672608.3707769",
    },

  },
];
