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
  // {
  //   slug: "semiconductor-fl",
  //   thumbnail: "/images/PC-1.png",
  //   images: ["/images/PC-1.png", "/images/PC-2.png"],
  //   title: "Federated Learning for Semiconductor Fault Detection",
  //   category: "AI Research",
  //   role: "Lead Author",
  //   summary:
  //     "Combining federated learning and XAI to detect semiconductor defects while preserving privacy.",
  //   description: (
  //     <div>
  //       <p>
  //         Our approach allows fab partners to collaboratively train defect
  //         detection models without pooling data.
  //       </p>
  //       <p>
  //         We outline the federated pipeline and illustrate how SHAP explanations
  //         uncover failure modes in sensor streams. Extensive experiments
  //         highlight privacy benefits alongside production-level accuracy.
  //       </p>
  //     </div>
  //   ),
  //   tags: ["Federated Learning", "Explainable AI", "Semiconductor"],
  //   pdf: "/assets/papers/semiconductor_fl.pdf",
  //   bibtex: "@article{patel2024semi, ...}",
  //   authors: ["Tanish Patel", "Industry Partners"],
  //   methodology: [
  //     "Federated training across partners",
  //     "Explainable AI with SHAP",
  //   ],
  //   results:
  //     "Reached 98% accuracy on public dataset without sharing raw data.",
  //   links: {
  //     arxiv: "https://arxiv.org/abs/yyyy.yyyy",
  //     github: "https://github.com/yourname/semi-fl",
  //   },
  // },
  // {
  //   slug: "soc-prediction-ev",
  //   thumbnail: "/images/SOC_1.png",
  //   images: ["/images/SOC_1.png", "/images/SOC_2.png"],
  //   title: "Data-Driven SoC Prediction in Electric Vehicles",
  //   category: "Applied ML",
  //   role: "Research Assistant",
  //   summary:
  //     "Enhanced SoC estimation accuracy using federated learning across fleets.",
  //   description: (
  //     <div>
  //       <p>
  //         The project leverages distributed vehicle data to improve
  //         state-of-charge predictions in diverse driving conditions.
  //       </p>
  //       <p>
  //         We evaluate several regression strategies and analyze communication
  //         costs for fleet-wide training. The resulting model reduces range
  //         anxiety and demonstrates scalability on real-world EV deployments.
  //       </p>
  //     </div>
  //   ),
  //   tags: ["Federated Learning", "Electric Vehicles", "Regression"],
  //   pdf: "/assets/papers/soc_prediction.pdf",
  //   bibtex: "@article{patel2024soc, ...}",
  //   authors: ["Jane Doe", "EV Research Lab"],
  //   methodology: ["Federated regression", "Sklearn", "Power BI"],
  //   results: "Improved R2 scores across rounds while keeping data local.",
  //   links: {
  //     github: "https://github.com/yourname/soc-prediction",
  //   },
  // },
];
