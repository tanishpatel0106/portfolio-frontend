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
    description: (
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
  <meta charset="utf-8" />
  <meta name="generator" content="pandoc" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <meta name="author" content="Tanish Patel, Hrishikesh Kalola" />
  <meta name="author" content="PI - Introduction &amp; Supervised Learning  Tanish Patel, Hrishikesh Kalola" />
  <title>Understanding the Foundations of Machine Learning</title>
  <style>
    html {
      color: #1a1a1a;
      background-color: #fdfdfd;
    }
    body {
      margin: 0 auto;
      max-width: 36em;
      padding-left: 50px;
      padding-right: 50px;
      padding-top: 50px;
      padding-bottom: 50px;
      hyphens: auto;
      overflow-wrap: break-word;
      text-rendering: optimizeLegibility;
      font-kerning: normal;
    }
    @media (max-width: 600px) {
      body {
        font-size: 0.9em;
        padding: 12px;
      }
      h1 {
        font-size: 1.8em;
      }
    }
    @media print {
      html {
        background-color: white;
      }
      body {
        background-color: transparent;
        color: black;
        font-size: 12pt;
      }
      p, h2, h3 {
        orphans: 3;
        widows: 3;
      }
      h2, h3, h4 {
        page-break-after: avoid;
      }
    }
    p {
      margin: 1em 0;
    }
    a {
      color: #1a1a1a;
    }
    a:visited {
      color: #1a1a1a;
    }
    img {
      max-width: 100%;
    }
    svg {
      height: auto;
      max-width: 100%;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.4em;
    }
    h5, h6 {
      font-size: 1em;
      font-style: italic;
    }
    h6 {
      font-weight: normal;
    }
    ol, ul {
      padding-left: 1.7em;
      margin-top: 1em;
    }
    li > ol, li > ul {
      margin-top: 0;
    }
    blockquote {
      margin: 1em 0 1em 1.7em;
      padding-left: 1em;
      border-left: 2px solid #e6e6e6;
      color: #606060;
    }
    code {
      font-family: Menlo, Monaco, Consolas, 'Lucida Console', monospace;
      font-size: 85%;
      margin: 0;
      hyphens: manual;
    }
    pre {
      margin: 1em 0;
      overflow: auto;
    }
    pre code {
      padding: 0;
      overflow: visible;
      overflow-wrap: normal;
    }
    .sourceCode {
     background-color: transparent;
     overflow: visible;
    }
    hr {
      border: none;
      border-top: 1px solid #1a1a1a;
      height: 1px;
      margin: 1em 0;
    }
    table {
      margin: 1em 0;
      border-collapse: collapse;
      width: 100%;
      overflow-x: auto;
      display: block;
      font-variant-numeric: lining-nums tabular-nums;
    }
    table caption {
      margin-bottom: 0.75em;
    }
    tbody {
      margin-top: 0.5em;
      border-top: 1px solid #1a1a1a;
      border-bottom: 1px solid #1a1a1a;
    }
    th {
      border-top: 1px solid #1a1a1a;
      padding: 0.25em 0.5em 0.25em 0.5em;
    }
    td {
      padding: 0.125em 0.5em 0.25em 0.5em;
    }
    header {
      margin-bottom: 4em;
      text-align: center;
    }
    #TOC li {
      list-style: none;
    }
    #TOC ul {
      padding-left: 1.3em;
    }
    #TOC > ul {
      padding-left: 0;
    }
    #TOC a:not(:hover) {
      text-decoration: none;
    }
    code{white-space: pre-wrap;}
    span.smallcaps{font-variant: small-caps;}
    div.columns{display: flex; gap: min(4vw, 1.5em);}
    div.column{flex: auto; overflow-x: auto;}
    div.hanging-indent{margin-left: 1.5em; text-indent: -1.5em;}
    /* The extra [class] is a hack that increases specificity enough to
       override a similar rule in reveal.js */
    ul.task-list[class]{list-style: none;}
    ul.task-list li input[type="checkbox"] {
      font-size: inherit;
      width: 0.8em;
      margin: 0 0.8em 0.2em -1.6em;
      vertical-align: middle;
    }
  </style>
  <script
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js"
  type="text/javascript"></script>
</head>
<body>
<header id="title-block-header">
<h1 class="title">Understanding the Foundations of Machine Learning</h1>
<p class="author">Tanish Patel, Hrishikesh Kalola</p>
<p class="author">PI - Introduction &amp; Supervised Learning<br />
<br />
<em>Tanish Patel, Hrishikesh Kalola</em></p>
<p class="date">May 2025</p>
</header>
<h1 id="introduction">Introduction</h1>
<h2 id="what-is-machine-learning">What is Machine Learning?</h2>
<p>In the digital age, we are surrounded by intelligent systems that
seem to “know” what we want—be it personalized movie suggestions,
real-time voice assistants, or navigation apps that reroute us from
traffic. These capabilities stem not from hardcoded logic, but from a
field known as <strong>Machine Learning (ML)</strong>—a branch of
Artificial Intelligence (AI) that focuses on building systems that
<em>improve automatically through experience</em>.</p>
<p>At its core, machine learning is the science of enabling machines to
learn patterns from data, without being explicitly instructed on every
possible decision or rule. Instead of programming a rigid set of
instructions, we provide data to an algorithm that can recognize
patterns, make predictions, and adapt its behavior over time.</p>
<p>A widely accepted definition, given by Tom M. Mitchell, is:</p>
<blockquote>
<p>“A computer program is said to learn from experience <span
class="math inline">\(E\)</span> with respect to some task <span
class="math inline">\(T\)</span> and performance measure <span
class="math inline">\(P\)</span>, if its performance on <span
class="math inline">\(T\)</span>, as measured by <span
class="math inline">\(P\)</span>, improves with experience <span
class="math inline">\(E\)</span>.”</p>
</blockquote>
<p>To unpack this:</p>
<ul>
<li><p><strong>Experience (E)</strong>: The dataset or past interactions
the algorithm is exposed to.</p></li>
<li><p><strong>Task (T)</strong>: The specific goal—such as classifying
an image or recommending a product.</p></li>
<li><p><strong>Performance (P)</strong>: A metric that quantifies how
well the algorithm is doing—such as accuracy or error rate.</p></li>
</ul>
<p>This definition emphasizes the data-driven, performance-enhancing
nature of machine learning. It is not static—it evolves. And its goal is
<em>generalization</em>: the ability to perform well on unseen data.</p>
<h2 id="categories-of-machine-learning">Categories of Machine
Learning</h2>
<p>Machine Learning is not a single approach—it is an umbrella term
encompassing a range of techniques that differ in their data
assumptions, learning signals, and application styles. Broadly, ML
problems are categorized into three paradigms:</p>
<h3 class="unnumbered" id="supervised-learning">Supervised Learning</h3>
<p>The most intuitive form of learning, where the algorithm learns from
<strong>labeled data</strong>. Each example in the dataset includes both
an <strong>input</strong> (features) and an <strong>output</strong>
(target label), and the model’s job is to learn the mapping from inputs
to outputs.</p>
<p><em>Example:</em> Given historical house sales data (input: square
footage, location, number of rooms), predict the <strong>sale
price</strong> (output).</p>
<h3 class="unnumbered" id="unsupervised-learning">Unsupervised
Learning</h3>
<p>In this paradigm, the data comes <strong>without labels</strong>. The
algorithm attempts to discover hidden patterns or intrinsic structures
in the data. It is akin to learning by observation—finding groups,
anomalies, or latent variables.</p>
<p><em>Example:</em> Given a dataset of customer transactions, group
customers into segments based on purchasing behavior—without knowing
anything in advance about the customer types.</p>
<h3 class="unnumbered" id="reinforcement-learning">Reinforcement
Learning</h3>
<p>Here, learning happens through <strong>interaction</strong> with an
environment. An agent observes the state of the environment, takes an
action, and receives a reward. Over time, it learns a policy to maximize
cumulative rewards.</p>
<p><em>Example:</em> A robot learning to walk, where each step results
in feedback (reward or penalty), and over many trials, it learns to
balance and move effectively.</p>
<p>Each of these categories represents a unique learning objective and
methodology, and together they form the foundation of modern intelligent
systems.</p>
<h2 id="why-these-paradigms-matter">Why These Paradigms Matter</h2>
<p>These three paradigms are not just academic abstractions—they are
foundational to real-world AI systems across industries.</p>
<ul>
<li><p><strong>Supervised learning</strong> powers most of the AI
services we use daily: from medical diagnostics and financial
forecasting to image recognition and fraud detection.</p></li>
<li><p><strong>Unsupervised learning</strong> is crucial where labeling
is expensive or infeasible, such as in bioinformatics, cybersecurity,
and market segmentation.</p></li>
<li><p><strong>Reinforcement learning</strong> introduces the dimension
of <strong>sequential decision-making</strong>, used in robotics,
autonomous vehicles, game agents, and adaptive systems.</p></li>
</ul>
<p>Together, these paradigms cover a spectrum of learning styles:</p>
<ul>
<li><p>From <strong>explicit supervision
(label-driven)</strong>,</p></li>
<li><p>To <strong>implicit structure discovery
(pattern-driven)</strong>,</p></li>
<li><p>To <strong>dynamic interaction (reward-driven)</strong>.</p></li>
</ul>
<p>Understanding their principles not only allows us to apply them, but
also equips us to build hybrid or tailored learning architectures for
specific domains.</p>
<h2 id="real-world-impact-and-intuition">Real-World Impact and
Intuition</h2>
<p>Let us visualize how these paradigms function in familiar
scenarios:</p>
<table>
<caption>Examples of the three ML paradigms in practice</caption>
<thead>
<tr>
<th style="text-align: left;"><strong>Learning Type</strong></th>
<th style="text-align: left;"><strong>Real-World Scenario</strong></th>
<th style="text-align: left;"><strong>Learning Signal</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;">Supervised Learning</td>
<td style="text-align: left;">Diagnosing diseases from labeled
X-rays</td>
<td style="text-align: left;">Direct labels (e.g., COVID positive)</td>
</tr>
<tr>
<td style="text-align: left;">Unsupervised Learning</td>
<td style="text-align: left;">Grouping users based on browsing
habits</td>
<td style="text-align: left;">No labels; clustering or structure</td>
</tr>
<tr>
<td style="text-align: left;">Reinforcement Learning</td>
<td style="text-align: left;">Training a drone to land safely</td>
<td style="text-align: left;">Reward signal from environment</td>
</tr>
</tbody>
</table>
<p>Moreover, these paradigms are often used <em>together</em>. For
instance, a self-driving car might use:</p>
<ul>
<li><p>Supervised learning to detect objects (e.g., pedestrians, traffic
signs),</p></li>
<li><p>Unsupervised learning to analyze traffic patterns or road
layouts,</p></li>
<li><p>Reinforcement learning to make real-time navigation decisions
under uncertainty.</p></li>
</ul>
<h2 id="closing-thoughts">Closing Thoughts</h2>
<p>Machine learning is not magic—it is a mathematical and algorithmic
process grounded in optimization, probability, and information
theory.</p>
<p>As we delve deeper into each paradigm in the sections that follow, we
aim not just to define them, but to <strong>demystify their inner
workings</strong>, understand their <strong>mathematical
formulations</strong>, and explore <strong>realistic examples</strong>
that bring their concepts to life.</p>
<h1 id="supervised-learning-1">Supervised Learning</h1>
<h2 id="what-is-supervised-learning">What is Supervised Learning?</h2>
<p>Supervised learning is the most well-established and widely adopted
paradigm in machine learning. It refers to a learning process in which
an algorithm is trained on a dataset consisting of input-output pairs.
Each input is associated with a corresponding, explicitly provided
output, and the goal of the algorithm is to learn a mapping from the
input space to the output space that generalizes well to new, unseen
data.</p>
<p>Formally, let <span class="math inline">\(\mathcal{X}\)</span> denote
the input space and <span class="math inline">\(\mathcal{Y}\)</span>
denote the output space. Given a training dataset <span
class="math display">\[\mathcal{D} = \{(x_1, y_1), (x_2, y_2), \ldots,
(x_n, y_n)\},\]</span> where each <span class="math inline">\(x_i \in
\mathcal{X}\)</span> is a feature vector and each <span
class="math inline">\(y_i \in \mathcal{Y}\)</span> is its corresponding
label, the objective is to learn a function <span
class="math inline">\(f: \mathcal{X} \rightarrow \mathcal{Y}\)</span>
such that <span class="math inline">\(f(x)\)</span> approximates <span
class="math inline">\(y\)</span> as accurately as possible for both seen
and unseen examples.</p>
<p>The term “supervised” arises from the presence of labeled data, where
a “supervisor” provides the correct answers during training. This is in
contrast to unsupervised learning, where no output labels are provided,
or reinforcement learning, where learning is driven by delayed reward
signals.</p>
<p>To illustrate, consider the task of predicting whether an email is
spam. The input <span class="math inline">\(x\)</span> might be a vector
of features extracted from the email, such as word frequencies, the
number of links, or the presence of all-capital words. The corresponding
label <span class="math inline">\(y\)</span> is either 0 (not spam) or 1
(spam). The model learns patterns in the data that are indicative of
spam, and once trained, it can classify new emails with reasonable
accuracy.</p>
<p>Supervised learning is used extensively across domains:</p>
<ul>
<li><p>In healthcare, to predict diseases from patient records.</p></li>
<li><p>In finance, to estimate credit risk or forecast stock
trends.</p></li>
<li><p>In marketing, to identify customer churn or segment
buyers.</p></li>
<li><p>In natural language processing, to classify sentiments or detect
named entities.</p></li>
</ul>
<p>A key feature of supervised learning is its emphasis on
generalization. A model that performs well on the training data but
poorly on new data is said to <em>overfit</em>. Avoiding overfitting is
a central concern in the supervised learning workflow, often addressed
using techniques such as regularization, cross-validation, and model
complexity control.</p>
<p>The learning process typically involves defining a <em>loss
function</em>, which quantifies the difference between the predicted and
actual outputs, and using optimization algorithms such as gradient
descent to adjust the model parameters to minimize this loss over the
training set.</p>
<p>The versatility of supervised learning stems from the fact that it
encompasses a broad variety of models and techniques, from simple linear
regressors to deep neural networks with millions of parameters.
Regardless of the complexity of the model, the fundamental principle
remains the same: learn from labeled data to make accurate
predictions.</p>
<h2 id="types-of-supervised-learning-problems">Types of Supervised
Learning Problems</h2>
<p>Supervised learning problems can be broadly categorized into two
primary types based on the nature of the output variable:
<em>classification</em> and <em>regression</em>. Both types share the
same underlying training procedure, but differ in how outputs are
structured and how errors are measured.</p>
<h3 class="unnumbered" id="classification">Classification</h3>
<p>Classification problems involve predicting a discrete class label.
That is, the output variable <span class="math inline">\(y\)</span>
takes values from a finite set of categories <span
class="math inline">\(\{c_1, c_2, \ldots, c_K\}\)</span>. The model’s
objective is to assign each input <span class="math inline">\(x \in
\mathcal{X}\)</span> to one of these <span
class="math inline">\(K\)</span> classes. The output space in this case
is categorical, and models are evaluated based on their classification
accuracy or other metrics such as precision, recall, and F1-score.</p>
<p>An illustrative example is email spam detection. Each email is
represented as a set of features—word occurrences, sender metadata,
formatting clues—and the model predicts whether it belongs to the class
“Spam” or “Not Spam”. This is an example of <em>binary
classification</em>. In contrast, <em>multiclass classification</em>
tasks involve more than two possible categories. A classic example is
the MNIST dataset, where handwritten digits (0–9) must be classified
based on pixel intensities.</p>
<p>There also exists a more complex setting called <em>multilabel
classification</em>, where an instance may simultaneously belong to
multiple classes. For example, a movie might be tagged as both “Action”
and “Thriller” in a recommendation system. Such problems require
specialized loss functions and evaluation metrics that account for
multiple simultaneous labels.</p>
<p>The output of a classification model is often a probability
distribution over the possible classes. For example, in logistic
regression or neural networks with softmax activation, the model outputs
a probability vector <span class="math inline">\(\hat{y} = [p_1, p_2,
\ldots, p_K]\)</span>, where <span class="math inline">\(p_k\)</span> is
the predicted probability of class <span
class="math inline">\(c_k\)</span> given the input.</p>
<h3 class="unnumbered" id="regression">Regression</h3>
<p>In regression tasks, the goal is to predict a continuous-valued
output. The output variable <span class="math inline">\(y\)</span> is a
real number, and the function <span class="math inline">\(f: \mathcal{X}
\rightarrow \mathbb{R}\)</span> aims to approximate a numeric trend or
pattern in the data. Regression is useful when the response variable is
inherently quantitative.</p>
<p>Consider the problem of predicting house prices. Each house is
represented by features such as square footage, number of rooms, age,
and location. The target output is the price of the house, which can
take on any real value. The model must learn a continuous mapping from
these features to price.</p>
<p>Other examples of regression tasks include:</p>
<ul>
<li><p>Forecasting stock prices based on historical financial
indicators.</p></li>
<li><p>Estimating a person’s age from a facial photograph.</p></li>
<li><p>Predicting the expected sales volume based on seasonal
trends.</p></li>
</ul>
<p>In contrast to classification, where accuracy is a suitable metric,
regression models are evaluated using metrics that measure the deviation
between predicted and actual values. Common loss functions include:</p>
<ul>
<li><p><strong>Mean Squared Error (MSE):</strong> penalizes larger
errors more heavily.</p></li>
<li><p><strong>Mean Absolute Error (MAE):</strong> treats all errors
equally.</p></li>
<li><p><strong>Root Mean Squared Error (RMSE):</strong> interpretable in
the same units as the output.</p></li>
</ul>
<p>The learning algorithm adjusts the model’s parameters to minimize one
of these error metrics over the training data.</p>
<h3 class="unnumbered" id="comparison-and-selection">Comparison and
Selection</h3>
<p>The choice between classification and regression depends
fundamentally on the nature of the prediction problem. If the target
variable represents categories or classes, classification techniques are
used. If the target is a continuous quantity, regression methods are
more appropriate.</p>
<p>Interestingly, some problems can be modeled using either approach.
For instance, the probability that a customer will churn can be
estimated via regression (as a score between 0 and 1), and then
thresholded to perform classification (churn vs. no churn). Such
modeling flexibility allows practitioners to tailor solutions based on
business requirements and the nature of available data.</p>
<p>To summarize, supervised learning encompasses both classification and
regression, each suited to a specific type of predictive task.
Understanding this distinction is crucial, as it directly influences
model selection, training strategy, loss function, and performance
evaluation.</p>
<h2 id="mathematical-foundation-bonus">Mathematical Foundation
(Bonus)</h2>
<p>The mathematical foundation of supervised learning is built upon the
idea of function approximation. Given a set of input-output pairs, the
objective is to learn a function <span class="math inline">\(f\)</span>
from a hypothesis space <span
class="math inline">\(\mathcal{H}\)</span>, such that the predictions
<span class="math inline">\(f(x)\)</span> are as close as possible to
the true labels <span class="math inline">\(y\)</span>. The core
machinery behind this process involves defining a loss function,
formulating an optimization objective, and employing iterative learning
algorithms.</p>
<h3 class="unnumbered" id="problem-setup">Problem Setup</h3>
<p>Let us denote:</p>
<ul>
<li><p><span class="math inline">\(x \in \mathbb{R}^d\)</span>: a <span
class="math inline">\(d\)</span>-dimensional input feature
vector,</p></li>
<li><p><span class="math inline">\(y \in \mathcal{Y}\)</span>: the
target variable, either categorical or continuous,</p></li>
<li><p><span class="math inline">\(f(x; \theta)\)</span>: the predictive
model parameterized by <span class="math inline">\(\theta \in
\Theta\)</span>,</p></li>
<li><p><span class="math inline">\(\mathcal{D} = \{(x_i,
y_i)\}_{i=1}^n\)</span>: the training dataset.</p></li>
</ul>
<p>The goal is to find model parameters <span
class="math inline">\(\theta\)</span> such that the mapping <span
class="math inline">\(f(x; \theta)\)</span> closely approximates the
true function <span class="math inline">\(f^*(x)\)</span> that generated
the data.</p>
<h3 class="unnumbered" id="loss-functions">Loss Functions</h3>
<p>A key component in supervised learning is the <em>loss function</em>,
which quantifies the error between the predicted output <span
class="math inline">\(f(x)\)</span> and the true label <span
class="math inline">\(y\)</span>. The choice of loss function depends on
the nature of the task.</p>
<h4 id="mean-squared-error-mse">Mean Squared Error (MSE):</h4>
<p>Used primarily for regression tasks, the MSE is defined as: <span
class="math display">\[\mathcal{L}_{\text{MSE}}(\theta) = \frac{1}{n}
\sum_{i=1}^{n} \left( f(x_i; \theta) - y_i \right)^2.\]</span> This loss
penalizes larger errors more significantly due to the square term and is
differentiable, making it suitable for gradient-based optimization.</p>
<h4 id="mean-absolute-error-mae">Mean Absolute Error (MAE):</h4>
<p>An alternative regression loss, less sensitive to outliers: <span
class="math display">\[\mathcal{L}_{\text{MAE}}(\theta) = \frac{1}{n}
\sum_{i=1}^{n} \left| f(x_i; \theta) - y_i \right|.\]</span></p>
<h4 id="cross-entropy-loss">Cross-Entropy Loss:</h4>
<p>Common in classification, particularly for probabilistic models such
as logistic regression or neural networks with softmax output. For a
binary classification problem where <span class="math inline">\(y_i \in
\{0, 1\}\)</span> and the predicted probability is <span
class="math inline">\(\hat{y}_i = f(x_i; \theta)\)</span>, the loss is:
<span class="math display">\[\mathcal{L}_{\text{CE}}(\theta) = -
\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1
- \hat{y}_i) \right].\]</span></p>
<h3 class="unnumbered" id="empirical-risk-minimization-erm">Empirical
Risk Minimization (ERM)</h3>
<p>Supervised learning adheres to the principle of <em>Empirical Risk
Minimization</em>. The empirical risk (i.e., average loss over the
training data) is minimized to find the optimal parameters: <span
class="math display">\[\theta^* = \arg\min_{\theta \in \Theta}
\frac{1}{n} \sum_{i=1}^{n} \mathcal{L}(f(x_i; \theta), y_i).\]</span>
This is a standard optimization problem where the function to minimize
depends on both the loss and the model form.</p>
<p>In many modern applications, the hypothesis space <span
class="math inline">\(\mathcal{H}\)</span> is complex and
high-dimensional (e.g., deep neural networks), requiring sophisticated
optimization techniques such as stochastic gradient descent (SGD), Adam,
RMSProp, and their variants.</p>
<h3 class="unnumbered" id="gradient-descent">Gradient Descent</h3>
<p>A common approach to minimizing the loss is to update parameters
iteratively in the direction of the negative gradient of the loss
function: <span class="math display">\[\theta^{(t+1)} = \theta^{(t)} -
\eta \nabla_\theta \mathcal{L}(\theta^{(t)}),\]</span> where <span
class="math inline">\(\eta\)</span> is the learning rate and <span
class="math inline">\(\nabla_\theta \mathcal{L}\)</span> is the gradient
of the loss with respect to the model parameters.</p>
<p>For large datasets, computing the full gradient at each iteration can
be computationally expensive. This motivates the use of
<em>mini-batch</em> or <em>stochastic</em> gradient descent, where the
loss is computed on a small subset of the data at each step.</p>
<h3 class="unnumbered" id="bias-variance-tradeoff">Bias-Variance
Tradeoff</h3>
<p>A foundational concept in supervised learning is the bias-variance
decomposition of prediction error. Given a fixed data distribution, the
expected generalization error can be decomposed as: <span
class="math display">\[\mathbb{E}[(y - f(x))^2] = \text{Bias}^2 +
\text{Variance} + \text{Irreducible Noise}.\]</span></p>
<ul>
<li><p><strong>Bias:</strong> Error due to overly simplistic assumptions
in the model (e.g., a linear model for a non-linear
relationship).</p></li>
<li><p><strong>Variance:</strong> Error due to sensitivity to
fluctuations in the training data.</p></li>
<li><p><strong>Noise:</strong> Inherent randomness in the data that
cannot be eliminated.</p></li>
</ul>
<p>A good supervised model strikes a balance—too much bias leads to
underfitting, and too much variance leads to overfitting.</p>
<h3 class="unnumbered" id="overfitting-and-regularization">Overfitting
and Regularization</h3>
<p>Overfitting occurs when a model learns the noise in the training data
rather than the underlying pattern. This results in poor generalization
to unseen examples. To mitigate overfitting, various
<em>regularization</em> techniques are employed:</p>
<ul>
<li><p><strong>L2 Regularization (Ridge):</strong> <span
class="math display">\[\mathcal{L}_{\text{ridge}} =
\mathcal{L}_{\text{original}} + \lambda \|\theta\|^2,\]</span> which
penalizes large weights to prevent overly complex models.</p></li>
<li><p><strong>L1 Regularization (Lasso):</strong> <span
class="math display">\[\mathcal{L}_{\text{lasso}} =
\mathcal{L}_{\text{original}} + \lambda \|\theta\|_1,\]</span> which
induces sparsity by shrinking some weights to zero.</p></li>
<li><p><strong>Dropout:</strong> Randomly disables neurons during
training to prevent reliance on specific paths in the network.</p></li>
<li><p><strong>Early Stopping:</strong> Halts training when validation
performance deteriorates, even if training loss improves.</p></li>
</ul>
<h3 class="unnumbered" id="generalization-and-evaluation">Generalization
and Evaluation</h3>
<p>The success of supervised learning is ultimately judged not on how
well the model performs on the training set, but on how well it
generalizes to new data. This necessitates the use of a validation set
and often a separate test set. Metrics vary depending on the task:</p>
<ul>
<li><p><strong>Classification:</strong> Accuracy, Precision, Recall, F1
Score, AUC-ROC.</p></li>
<li><p><strong>Regression:</strong> MSE, RMSE, MAE, <span
class="math inline">\(R^2\)</span> score.</p></li>
</ul>
<p>Model selection and hyperparameter tuning are performed using
cross-validation to ensure that performance is not due to randomness in
the data split.</p>
<p>In summary, the mathematical formulation of supervised learning
offers a rich framework that unifies concepts from optimization,
probability theory, linear algebra, and statistics. From defining loss
functions to minimizing risk and balancing model complexity, each
component plays a vital role in the construction of accurate and robust
predictive models.</p>
<h2 id="algorithms-and-their-working">Algorithms and Their Working</h2>
<p>Supervised learning provides a broad landscape of algorithms, each
with unique characteristics and use-cases. While the underlying goal
across all algorithms is to learn the relationship between inputs and
outputs, the approach to modeling this relationship differs based on
assumptions, complexity, and the type of task (classification or
regression).</p>
<p>In this section, we provide a conceptual overview of some of the most
widely used supervised learning algorithms. The aim is not to derive
them fully, but to give an intuitive understanding of how they work and
when they are typically used.</p>
<h3 class="unnumbered"
id="linear-regression-for-regression-tasks">Linear Regression (for
Regression Tasks)</h3>
<p>Linear regression is one of the simplest and most interpretable
supervised learning algorithms. It assumes a linear relationship between
the input features and the output variable. The model predicts the
output as a weighted sum of the input features:</p>
<p><span class="math display">\[\hat{y} = w_0 + w_1 x_1 + w_2 x_2 +
\cdots + w_d x_d = \mathbf{w}^T \mathbf{x} + b\]</span></p>
<p>Here, <span class="math inline">\(\mathbf{x}\)</span> is the feature
vector, <span class="math inline">\(\mathbf{w}\)</span> is the vector of
learned weights, and <span class="math inline">\(b\)</span> is the
intercept. The goal is to find <span
class="math inline">\(\mathbf{w}\)</span> and <span
class="math inline">\(b\)</span> that minimize the prediction error,
typically using Mean Squared Error (MSE).</p>
<p><strong>Example:</strong> Predicting a house’s price based on size
and number of rooms. Each feature contributes linearly to the final
predicted price.</p>
<h3 class="unnumbered"
id="logistic-regression-for-binary-classification">Logistic Regression
(for Binary Classification)</h3>
<p>Despite its name, logistic regression is used for classification
tasks, especially when there are two possible classes (binary
classification). It models the probability that an input belongs to a
certain class using the logistic (sigmoid) function:</p>
<p><span class="math display">\[P(y = 1 \mid x) = \frac{1}{1 +
e^{-(\mathbf{w}^T \mathbf{x} + b)}}\]</span></p>
<p>If the predicted probability is greater than 0.5, the input is
classified into class 1; otherwise, into class 0.</p>
<p><strong>Example:</strong> Predicting whether a customer will churn
(yes/no) based on their account activity.</p>
<h3 class="unnumbered" id="decision-trees">Decision Trees</h3>
<p>Decision trees are intuitive, rule-based models that split the data
into regions based on feature values. The tree structure consists
of:</p>
<ul>
<li><p><strong>Internal nodes</strong> that ask questions about feature
values (e.g., “Is income &gt; $50,000?”),</p></li>
<li><p><strong>Branches</strong> that represent the outcome of those
decisions,</p></li>
<li><p><strong>Leaves</strong> that assign a final prediction (class or
value).</p></li>
</ul>
<p>The tree grows by selecting the feature and threshold that best
separates the data based on a metric like information gain or Gini
impurity (for classification) or variance reduction (for
regression).</p>
<p><strong>Example:</strong> Approving a loan application by following a
sequence of yes/no questions based on salary, employment, and credit
score.</p>
<h3 class="unnumbered" id="k-nearest-neighbors-k-nn">k-Nearest Neighbors
(k-NN)</h3>
<p>k-NN is a simple, instance-based algorithm. It does not involve any
training or model building. To classify a new input, it:</p>
<ol>
<li><p>Computes the distance (typically Euclidean) between the new point
and all points in the training data,</p></li>
<li><p>Selects the <span class="math inline">\(k\)</span> nearest
neighbors,</p></li>
<li><p>Predicts the most common label (for classification) or average
label (for regression) among these neighbors.</p></li>
</ol>
<p><strong>Example:</strong> Recommending a movie to a user based on
ratings given by similar users.</p>
<h3 class="unnumbered" id="support-vector-machines-svms">Support Vector
Machines (SVMs)</h3>
<p>SVMs are powerful classifiers that find the best boundary (called a
hyperplane) that separates the classes with the maximum margin. In two
dimensions, this boundary is a straight line; in higher dimensions, it
becomes a plane or hyperplane.</p>
<p>If the data is not linearly separable, SVMs can use kernel functions
(e.g., polynomial, RBF) to project the data into higher dimensions where
separation is possible.</p>
<p><strong>Example:</strong> Classifying emails as spam or not spam by
finding a decision boundary based on word frequencies.</p>
<h3 class="unnumbered" id="naive-bayes-classifier">Naive Bayes
Classifier</h3>
<p>Naive Bayes is a probabilistic classifier based on Bayes’ Theorem,
assuming that all features are conditionally independent given the class
label. Despite its simplicity, it performs surprisingly well on
high-dimensional data such as text classification.</p>
<p><span class="math display">\[P(y \mid x_1, \ldots, x_d) \propto P(y)
\prod_{i=1}^d P(x_i \mid y)\]</span></p>
<p><strong>Example:</strong> Classifying news articles into categories
(politics, sports, tech) based on word counts.</p>
<h3 class="unnumbered" id="neural-networks-introductory-view">Neural
Networks (Introductory View)</h3>
<p>Neural networks are a class of models inspired by the human brain.
They consist of layers of interconnected nodes (neurons), where each
node performs a weighted sum of its inputs followed by a non-linear
activation function. While deep neural networks can be complex, a simple
feedforward network with one hidden layer can already approximate many
functions.</p>
<p>Neural networks are trained using backpropagation and gradient
descent to minimize a loss function.</p>
<p><strong>Example:</strong> Recognizing handwritten digits from images
using the MNIST dataset.</p>
<h3 class="unnumbered" id="when-to-use-what">When to Use What?</h3>
<ul>
<li><p>Use <strong>linear regression</strong> when the relationship is
expected to be linear and interpretability is important.</p></li>
<li><p>Use <strong>logistic regression</strong> for simple binary
classification tasks.</p></li>
<li><p>Use <strong>decision trees</strong> when you need an
interpretable model that can capture non-linear relationships.</p></li>
<li><p>Use <strong>k-NN</strong> when you expect similar inputs to have
similar outputs and you have a small dataset.</p></li>
<li><p>Use <strong>SVMs</strong> for high-dimensional classification
tasks with well-separated classes.</p></li>
<li><p>Use <strong>naive Bayes</strong> for text or categorical data
with independence assumptions.</p></li>
<li><p>Use <strong>neural networks</strong> when the data is large and
complex and you can afford computational cost.</p></li>
</ul>
<h3 class="unnumbered" id="summary">Summary</h3>
<p>Supervised learning offers a rich set of algorithms, each with its
strengths and limitations. The best choice often depends on the nature
of the data, the complexity of the relationship between input and
output, and the need for interpretability, speed, or predictive
accuracy. In practice, experimentation and validation are key to finding
the most effective model for a given problem.</p>
<h2 id="detailed-case-studies">Detailed Case Studies</h2>
<p>Supervised learning, though formal in its structure, thrives in the
messiness of real-world applications. Whether it’s predicting numbers,
classifying behaviors, or automating decisions, the impact of these
models is only truly appreciated through grounded examples. In this
section, we explore three varied case studies—regression, binary
classification, and decision-based multi-class prediction—each
highlighting how theory meets practice in different industries.</p>
<h3 class="unnumbered"
id="case-study-1-predicting-house-prices-with-linear-regression">Case
Study 1: Predicting House Prices with Linear Regression</h3>
<p>Imagine you’re a data analyst working at a real estate firm. Your
team wants to build a tool to help estimate the selling price of a house
based on certain visible attributes—like square footage, number of
bedrooms, and how far the house is from the city center.</p>
<p>You are handed a dataset containing hundreds of such listings, each
with the final selling price. This is a classic example of a
<strong>regression problem</strong>, where the goal is to predict a
continuous outcome.</p>
<p>The simplest approach is to assume that house prices are
approximately linear in relation to these features. That is, as square
footage increases, price increases; as distance from the city increases,
price tends to drop. This leads to a model known as <em>linear
regression</em>.</p>
<p>Once trained, the model can instantly estimate how much a 3-bedroom,
2000-square-foot house located 5 km from the city might cost. More
importantly, the coefficients (weights) of the model offer business
insights: for instance, every extra kilometer from the city might reduce
the price by a few thousand dollars.</p>
<p><strong>Benefits:</strong></p>
<ul>
<li><p>Highly interpretable—each feature’s influence is clear.</p></li>
<li><p>Quick to train and test, even on large datasets.</p></li>
</ul>
<p><strong>Limitations:</strong></p>
<ul>
<li><p>Assumes linearity, which might not always be realistic.</p></li>
<li><p>Doesn’t handle sudden price jumps or neighborhood effects
well.</p></li>
</ul>
<h3 class="unnumbered"
id="case-study-2-detecting-email-spam-with-logistic-regression">Case
Study 2: Detecting Email Spam with Logistic Regression</h3>
<p>Now picture yourself working at a tech company building an email
service. Every day, users report emails as spam. Your task is to
automate this process.</p>
<p>You gather a large dataset of labeled emails—some marked spam, others
not. Each email is transformed into a vector of features: how often
certain keywords (like “free” or “win”) appear, whether the email has
many links, or if the subject line is in all capital letters.</p>
<p>Here, the task is <strong>binary classification</strong>: the model
must decide between two classes—spam or not spam.</p>
<p>You decide to use <em>logistic regression</em>, a simple and fast
classifier. It doesn’t just give a class label, but a
<em>probability</em>. An email with a spam score of 0.91 can be
confidently marked as spam, while one with a score of 0.55 might be
flagged for human review.</p>
<p>This model, trained on thousands of examples, can filter incoming
emails in real time. As spammers evolve, the model can be retrained
periodically with fresh data to adapt.</p>
<p><strong>Benefits:</strong></p>
<ul>
<li><p>Fast, lightweight, and easy to update.</p></li>
<li><p>Probabilistic output allows flexible decision
thresholds.</p></li>
</ul>
<p><strong>Limitations:</strong></p>
<ul>
<li><p>Assumes linear separation between classes.</p></li>
<li><p>May not capture complex patterns like embedded links or image
spam.</p></li>
</ul>
<h3 class="unnumbered"
id="case-study-3-classifying-plant-species-using-decision-trees">Case
Study 3: Classifying Plant Species Using Decision Trees</h3>
<p>Let’s shift context to a botanical research lab. Scientists are
working with a dataset of flower measurements—petal length, petal width,
sepal size—and trying to classify which species each flower belongs to
(e.g., Iris-setosa, Iris-versicolor, Iris-virginica).</p>
<p>This is a typical <strong>multi-class classification</strong>
problem, where the output variable has more than two possible
categories.</p>
<p>Unlike previous models, here you use a <em>decision tree</em>. The
tree grows by splitting data based on feature thresholds. For
example:</p>
<blockquote>
<p>If petal length &lt; 2.5 cm → Iris-setosa.<br />
Else if petal width &lt; 1.8 cm → Iris-versicolor.<br />
Else → Iris-virginica.</p>
</blockquote>
<p>Each branch in the tree corresponds to a decision based on one
feature. The process is similar to how a human might make decisions
using a flowchart.</p>
<p>This method is appealing to domain experts, as it reflects a logical
structure that’s easy to interpret and audit. It can also handle
non-linear relationships, unlike logistic regression.</p>
<p><strong>Benefits:</strong></p>
<ul>
<li><p>Easy to visualize and explain.</p></li>
<li><p>Handles both numerical and categorical data.</p></li>
<li><p>Captures feature interactions.</p></li>
</ul>
<p><strong>Limitations:</strong></p>
<ul>
<li><p>Can overfit if trees grow too deep.</p></li>
<li><p>May not perform well on noisy or small datasets unless
pruned.</p></li>
</ul>
<h3 class="unnumbered" id="comparing-the-three-case-studies">Comparing
the Three Case Studies</h3>
<table>
<caption>Comparison of supervised learning case studies</caption>
<thead>
<tr>
<th style="text-align: left;"><strong>Aspect</strong></th>
<th style="text-align: left;"><strong>House Pricing</strong></th>
<th style="text-align: left;"><strong>Email Spam</strong></th>
<th style="text-align: left;"><strong>Plant Species</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;">Type of Task</td>
<td style="text-align: left;">Regression</td>
<td style="text-align: left;">Binary Classification</td>
<td style="text-align: left;">Multiclass Classification</td>
</tr>
<tr>
<td style="text-align: left;">Input Features</td>
<td style="text-align: left;">Numeric (size, location)</td>
<td style="text-align: left;">Text-based indicators</td>
<td style="text-align: left;">Petal/Sepal measurements</td>
</tr>
<tr>
<td style="text-align: left;">Model Used</td>
<td style="text-align: left;">Linear Regression</td>
<td style="text-align: left;">Logistic Regression</td>
<td style="text-align: left;">Decision Tree</td>
</tr>
<tr>
<td style="text-align: left;">Output</td>
<td style="text-align: left;">Continuous value (price)</td>
<td style="text-align: left;">0 or 1 (spam/not)</td>
<td style="text-align: left;">Class label (3 species)</td>
</tr>
<tr>
<td style="text-align: left;">Interpretability</td>
<td style="text-align: left;">High</td>
<td style="text-align: left;">Moderate</td>
<td style="text-align: left;">High</td>
</tr>
<tr>
<td style="text-align: left;">Real-time Use</td>
<td style="text-align: left;">Medium</td>
<td style="text-align: left;">High</td>
<td style="text-align: left;">Medium</td>
</tr>
<tr>
<td style="text-align: left;">Strength</td>
<td style="text-align: left;">Simplicity</td>
<td style="text-align: left;">Speed + probability scores</td>
<td style="text-align: left;">Rule-based clarity</td>
</tr>
<tr>
<td style="text-align: left;">Weakness</td>
<td style="text-align: left;">Assumes linearity</td>
<td style="text-align: left;">Limited complexity</td>
<td style="text-align: left;">May overfit</td>
</tr>
</tbody>
</table>
<h3 class="unnumbered" id="theoretical-reflections">Theoretical
Reflections</h3>
<p>These examples illustrate the versatility of supervised learning:</p>
<ul>
<li><p>It can model both numeric and categorical outcomes.</p></li>
<li><p>It adapts to diverse data types—structured tabular data,
unstructured text, or measurements.</p></li>
<li><p>It allows both interpretable and highly flexible models depending
on the use-case.</p></li>
</ul>
<p>One of the key reasons supervised learning is so powerful is that it
builds on clearly defined feedback: for every input, there’s a known
correct output. This feedback loop, made possible by labeled data,
enables algorithms to fine-tune themselves with remarkable accuracy.</p>
<p>However, this strength also creates its biggest
limitation—<strong>the need for labeled data</strong>. In domains where
labeling is expensive or ambiguous (e.g., legal documents, rare
diseases), supervised learning may struggle. This is where other
paradigms like unsupervised and reinforcement learning begin to
shine.</p>
<p>Still, when labels are available, and the task is well-defined,
supervised learning remains the most effective and practical method in
the machine learning toolbox.</p>
<p>These case studies are just the beginning. From fraud detection to
language translation, face recognition to crop yield estimation, the
techniques behind these simple examples scale up to power some of the
most complex systems in the world today.</p>
<h2 id="evaluation-metrics">Evaluation Metrics</h2>
<p>Once a supervised learning model is trained, it is crucial to assess
how well it performs—not just on the training data, but more importantly
on <em>unseen data</em>. Evaluation metrics provide a quantitative way
to measure this performance. The choice of metric depends on the type of
task: classification or regression.</p>
<p>This section introduces common metrics, explains their intuition, and
shows when to use each one through practical examples.</p>
<h3 class="unnumbered" id="for-classification-tasks">For Classification
Tasks</h3>
<p>In classification, the model assigns inputs to categories. Evaluation
focuses on whether the predicted class matches the true class. Here are
the most widely used metrics:</p>
<h4 id="accuracy">Accuracy</h4>
<p>Accuracy is the simplest metric: <span
class="math display">\[\text{Accuracy} = \frac{\text{Number of correct
predictions}}{\text{Total number of predictions}}\]</span></p>
<p><strong>Example:</strong> If a model correctly classifies 90 out of
100 emails as spam or not spam, the accuracy is 90%.</p>
<p><strong>Limitation:</strong> Accuracy can be misleading in
<em>imbalanced datasets</em>. For example, if only 5% of emails are
spam, a model that always predicts “not spam” will still be 95%
accurate, but completely useless.</p>
<h4 id="precision-recall-and-f1-score">Precision, Recall, and
F1-Score</h4>
<p>To handle imbalanced scenarios, we use more nuanced metrics:</p>
<ul>
<li><p><strong>Precision</strong> — Out of all the predicted positives,
how many were actually positive? <span
class="math display">\[\text{Precision} = \frac{\text{True
Positives}}{\text{True Positives + False Positives}}\]</span></p></li>
<li><p><strong>Recall</strong> — Out of all actual positives, how many
did the model correctly identify? <span
class="math display">\[\text{Recall} = \frac{\text{True
Positives}}{\text{True Positives + False Negatives}}\]</span></p></li>
<li><p><strong>F1 Score</strong> — Harmonic mean of precision and
recall: <span class="math display">\[F1 = 2 \cdot \frac{\text{Precision}
\cdot \text{Recall}}{\text{Precision + Recall}}\]</span></p></li>
</ul>
<p><strong>Example:</strong> In a medical test for a rare disease:</p>
<ul>
<li><p>Precision answers: “Of those diagnosed as sick, how many truly
were?”</p></li>
<li><p>Recall answers: “Of all truly sick people, how many were
detected?”</p></li>
<li><p>F1 balances both and is ideal when you want a trade-off.</p></li>
</ul>
<h4 id="confusion-matrix">Confusion Matrix</h4>
<p>A confusion matrix is a tabular visualization of model performance.
It shows counts of:</p>
<ul>
<li><p><strong>True Positives (TP):</strong> Correctly predicted
positive class</p></li>
<li><p><strong>False Positives (FP):</strong> Incorrectly predicted
positive class</p></li>
<li><p><strong>True Negatives (TN):</strong> Correctly predicted
negative class</p></li>
<li><p><strong>False Negatives (FN):</strong> Missed positive
class</p></li>
</ul>
<p>This breakdown helps diagnose whether the model is favoring certain
types of errors—e.g., false alarms vs. missed detections.</p>
<h4
id="roc-auc-receiver-operating-characteristic---area-under-curve">ROC-AUC
(Receiver Operating Characteristic - Area Under Curve)</h4>
<p>ROC-AUC evaluates the model’s ability to distinguish between classes
across all thresholds. AUC stands for “area under the curve”, and ranges
from 0.5 (random guessing) to 1.0 (perfect classification).</p>
<p>Useful for:</p>
<ul>
<li><p>Comparing probabilistic classifiers (like logistic
regression)</p></li>
<li><p>Choosing optimal thresholds</p></li>
</ul>
<h3 class="unnumbered" id="for-regression-tasks">For Regression
Tasks</h3>
<p>Regression tasks involve predicting continuous values, so we need
metrics that measure the <em>distance</em> between predicted and actual
values.</p>
<h4 id="mean-absolute-error-mae-1">Mean Absolute Error (MAE)</h4>
<p>MAE is the average of absolute differences between predictions and
true values: <span class="math display">\[\text{MAE} = \frac{1}{n}
\sum_{i=1}^{n} |y_i - \hat{y}_i|\]</span></p>
<p><strong>Interpretation:</strong> If MAE = 5000 in a house price
model, the model is off by $5,000 on average.</p>
<h4 id="mean-squared-error-mse-and-root-mean-squared-error-rmse">Mean
Squared Error (MSE) and Root Mean Squared Error (RMSE)</h4>
<p>MSE penalizes larger errors more heavily (squares the errors): <span
class="math display">\[\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i -
\hat{y}_i)^2\]</span></p>
<p>RMSE is just the square root of MSE and is often easier to interpret:
<span class="math display">\[\text{RMSE} =
\sqrt{\text{MSE}}\]</span></p>
<p><strong>When to use:</strong></p>
<ul>
<li><p>Use MAE when all errors should be treated equally.</p></li>
<li><p>Use MSE/RMSE when large errors are worse than small
ones.</p></li>
</ul>
<h4 id="r2-score-coefficient-of-determination"><span
class="math inline">\(R^2\)</span> Score (Coefficient of
Determination)</h4>
<p><span class="math inline">\(R^2\)</span> measures how much of the
variance in the target variable is explained by the model. It ranges
from 0 (no predictive power) to 1 (perfect prediction):</p>
<p><span class="math display">\[R^2 = 1 - \frac{\sum (y_i -
\hat{y}_i)^2}{\sum (y_i - \bar{y})^2}\]</span></p>
<p><strong>Example:</strong> If <span class="math inline">\(R^2 =
0.92\)</span>, the model explains 92% of the variation in house
prices.</p>
<h3 class="unnumbered" id="choosing-the-right-metric">Choosing the Right
Metric</h3>
<p>There is no “one-size-fits-all” metric. It depends on the task:</p>
<ul>
<li><p><strong>Binary classification (balanced):</strong> Accuracy, F1
Score</p></li>
<li><p><strong>Binary classification (imbalanced):</strong> Precision,
Recall, F1, ROC-AUC</p></li>
<li><p><strong>Multiclass classification:</strong> Accuracy, per-class
precision/recall</p></li>
<li><p><strong>Regression (balanced errors):</strong> MAE</p></li>
<li><p><strong>Regression (penalize large errors):</strong> RMSE or
MSE</p></li>
</ul>
<p><strong>Practical tip:</strong> Always examine multiple metrics, and
consider visual tools (e.g., confusion matrix, residual plots) to get a
more complete picture.</p>
<p>Evaluation is not just about numbers—it’s about understanding your
model’s <em>behavior</em>, its strengths, its failure cases, and its
appropriateness for the task at hand.</p>
<h2 id="summary-1">Summary</h2>
<p>Supervised learning is a foundational pillar of modern machine
learning, offering a structured and intuitive framework for building
predictive models. It is defined by the presence of labeled data—where
every input is paired with a corresponding output—and the goal is to
learn a function that generalizes well from these examples.</p>
<p>Throughout this chapter, we have explored the essential components of
supervised learning from both theoretical and practical
perspectives.</p>
<h4 id="problem-types">Problem Types:</h4>
<p>We began by distinguishing between the two primary supervised
learning problems:</p>
<ul>
<li><p><strong>Classification</strong> — where the output variable
represents categories or discrete labels.</p></li>
<li><p><strong>Regression</strong> — where the output variable is
continuous and numeric.</p></li>
</ul>
<p>Understanding the nature of the prediction task is the first and most
crucial step in model design.</p>
<h4 id="mathematical-foundations">Mathematical Foundations:</h4>
<p>We delved into the mathematical backbone of supervised learning,
including:</p>
<ul>
<li><p>The formulation of learning as function approximation.</p></li>
<li><p>The role of <em>loss functions</em> in quantifying model
error.</p></li>
<li><p>The use of optimization techniques like gradient descent to
iteratively improve model performance.</p></li>
<li><p>The importance of concepts such as <em>bias-variance
tradeoff</em>, <em>overfitting</em>, and
<em>regularization</em>.</p></li>
</ul>
<p>These ideas form the core of how learning happens in practice—through
minimizing error on the training data while maintaining generalization
on new data.</p>
<h4 id="algorithms">Algorithms:</h4>
<p>We reviewed a range of supervised algorithms, from simple and
interpretable models to more complex and flexible ones:</p>
<ul>
<li><p><strong>Linear and Logistic Regression</strong> for
straightforward, linearly-separable problems.</p></li>
<li><p><strong>Decision Trees</strong> for rule-based learning and
interpretable model logic.</p></li>
<li><p><strong>Support Vector Machines</strong>, <strong>Naive
Bayes</strong>, <strong>k-NN</strong>, and <strong>Neural
Networks</strong> for handling various data complexities and
structures.</p></li>
</ul>
<p>Each algorithm comes with trade-offs in interpretability, training
speed, and suitability for different data types and sizes.</p>
<h4 id="case-studies">Case Studies:</h4>
<p>To bridge theory and practice, we explored real-world case
studies:</p>
<ul>
<li><p>House price prediction using linear regression.</p></li>
<li><p>Email spam detection with logistic regression.</p></li>
<li><p>Plant species classification using decision trees.</p></li>
</ul>
<p>These examples demonstrated how algorithms are applied, interpreted,
and refined in practical settings.</p>
<h4 id="model-evaluation">Model Evaluation:</h4>
<p>Finally, we emphasized the role of metrics in judging model
performance. We discussed:</p>
<ul>
<li><p><strong>Accuracy</strong>, <strong>Precision</strong>,
<strong>Recall</strong>, and <strong>F1 Score</strong> for
classification.</p></li>
<li><p><strong>MAE</strong>, <strong>MSE</strong>,
<strong>RMSE</strong>, and <strong><span
class="math inline">\(R^2\)</span></strong> for regression.</p></li>
<li><p>How to select metrics based on the nature and stakes of the
prediction task.</p></li>
</ul>
<p>Supervised learning succeeds when we have a clear mapping from inputs
to outputs, a sufficient amount of labeled data, and a well-defined
performance objective. It underpins many of the intelligent systems we
use every day—from recommendation engines and fraud detectors to medical
diagnostics and customer churn predictors.</p>
<p>This chapter has built a solid foundation in the principles,
algorithms, and practical considerations of supervised learning.
Equipped with this understanding, one can now begin to explore more
advanced techniques or adapt these methods to domain-specific challenges
with confidence and clarity.</p>
<h1
id="understanding-unsupervised-learning-concepts-and-case-studies">Understanding
Unsupervised Learning: Concepts and Case Studies</h1>
<h2 class="unnumbered" id="introduction-to-unsupervised-learning">1.
Introduction to Unsupervised Learning</h2>
<p>In many real-world situations, data is abundant but labels are
scarce. We may know a great deal about what we have—customer clicks,
genome sequences, user behavior logs, system events—but we often do not
know what it <em>means</em>. We lack predefined categories, outcomes, or
ground truths.</p>
<p>This is where <strong>unsupervised learning</strong> becomes
essential. It represents a class of machine learning techniques that
operate without explicit supervision. Unlike supervised learning, where
the model is trained on input-output pairs, unsupervised learning deals
solely with inputs and seeks to discover the hidden structure within
them.</p>
<p><em>Imagine being dropped in a city where you don’t speak the
language. You don’t have a map or a guide, but you begin to observe. You
notice clusters of shops, patterns in traffic, neighborhoods with
certain vibes. You haven’t been told what’s what, but you start to form
an internal understanding. This is what unsupervised learning does—it
learns by observing, not by instruction.</em></p>
<p>The goal of unsupervised learning is not to predict labels, but to
<em>reveal</em> patterns. It is used when we want to understand the
data, explore relationships, reduce complexity, or detect the
unexpected. This makes it a powerful tool for:</p>
<ul>
<li><p>Exploring unknown datasets,</p></li>
<li><p>Extracting features for downstream tasks,</p></li>
<li><p>Discovering previously unseen categories,</p></li>
<li><p>Identifying anomalies or outliers,</p></li>
<li><p>Visualizing complex, high-dimensional information.</p></li>
</ul>
<h2 class="unnumbered" id="core-intuition-and-theory">2. Core Intuition
and Theory</h2>
<p>Unsupervised learning revolves around a simple idea: <strong>data has
structure</strong>, and if we look closely enough, we can uncover
it.</p>
<p>There are two main paradigms of unsupervised learning:</p>
<ul>
<li><p><strong>Clustering:</strong> The task of grouping similar data
points together based on their inherent properties. It is the process of
identifying natural groupings without any prior label telling us what
those groups should be.</p></li>
<li><p><strong>Dimensionality Reduction:</strong> The process of
simplifying data by projecting it onto a lower-dimensional space. When
datasets contain hundreds or thousands of features, reducing
dimensionality helps in understanding the structure, visualizing the
data, and improving computational efficiency.</p></li>
</ul>
<p>Unlike supervised models, which optimize predictive accuracy,
unsupervised models optimize for <em>pattern discovery</em>. Their
outputs are often exploratory, helping us ask better questions, design
better experiments, and prepare data for more formal analyses.</p>
<p><em>Think of unsupervised learning as a microscope. You don’t know
exactly what you’re looking for, but you trust that by zooming in and
examining carefully, something meaningful will emerge.</em></p>
<h2 class="unnumbered"
id="case-study-1-customer-segmentation-in-marketing-clustering">3. Case
Study 1: Customer Segmentation in Marketing (Clustering)</h2>
<p>In the bustling world of e-commerce, millions of users shop, browse,
and interact with products daily. But who are they? What kinds of
customers exist? How do they differ?</p>
<p>Let’s say you work at a company that sells everything from fashion to
electronics. You have no labels for your customers—but you do have
behavioral data: how often they purchase, what categories they browse,
how much they spend, and when they shop.</p>
<p>This is where unsupervised learning—specifically,
<strong>clustering</strong>—steps in. Using clustering algorithms, the
company can segment customers into natural groups such as:</p>
<ul>
<li><p><strong>Bargain Seekers:</strong> Shop only during sales, low
spend per visit.</p></li>
<li><p><strong>High-Value Shoppers:</strong> Frequent purchases, high
cart values.</p></li>
<li><p><strong>Seasonal Buyers:</strong> Peak activity during festivals
or holidays.</p></li>
</ul>
<p>Each of these segments may have completely different motivations and
expectations. Now, instead of sending the same email to everyone, the
company tailors its campaigns—offering exclusive previews to high-value
shoppers and discounts to bargain seekers.</p>
<p><strong>What changed?</strong> Nothing about the customers
themselves. But unsupervised learning revealed the invisible structure
of user behavior, turning raw data into insight.</p>
<p><strong>Outcome:</strong> Smarter marketing, personalized
experiences, increased customer satisfaction—and all without manually
labeling a single shopper.</p>
<h2 class="unnumbered"
id="case-study-2-visualizing-gene-expression-data-dimensionality-reduction">4.
Case Study 2: Visualizing Gene Expression Data (Dimensionality
Reduction)</h2>
<p>In medical research, scientists often work with biological datasets
that are staggeringly complex. One such domain is <strong>gene
expression analysis</strong>, where each sample—say, a blood test or a
tumor biopsy—may contain expression levels for tens of thousands of
genes.</p>
<p>A dataset with 20,000 features per sample is difficult, if not
impossible, for a human to comprehend. Patterns remain hidden in the
high-dimensional fog.</p>
<p>To uncover them, researchers turn to <strong>dimensionality
reduction</strong>. Algorithms like <em>Principal Component Analysis
(PCA)</em> and <em>t-SNE</em> compress the data into just two or three
dimensions, preserving as much structural information as possible.</p>
<p>Once reduced, these data points can be visualized. And suddenly,
structure appears: groups of similar patients, potential subtypes of
diseases, gene patterns linked to treatment response.</p>
<p><em>What was once a chaotic table of numbers becomes a map.</em></p>
<p><strong>Outcome:</strong> Doctors and researchers gain new
hypotheses, detect hidden biological classes, and visualize data in a
way that informs future experiments. Without predefined labels, the
algorithm reveals structure that may guide diagnostics or drug
development.</p>
<h2 class="unnumbered"
id="case-study-3-anomaly-detection-in-network-security-clustering-based">5.
Case Study 3: Anomaly Detection in Network Security
(Clustering-Based)</h2>
<p>Picture a large organization with thousands of employees logging into
internal systems daily. Most of this activity is routine—but sometimes,
a cyberattack begins quietly: a strange login from a new country,
unusual access patterns, repeated failed attempts.</p>
<p>Yet there are no labels for attacks in the system logs. The IT team
doesn’t know what to look for until it’s too late.</p>
<p>This is where <strong>anomaly detection</strong>, an application of
unsupervised learning, becomes critical.</p>
<p>By learning the normal behavior of users—based on IP address, time of
login, access type, and location—the model creates a <em>baseline</em>.
It doesn’t need labels to know what “normal” is. It simply learns from
patterns.</p>
<p>Any new behavior that significantly deviates from this learned
structure is flagged as anomalous. It might be harmless—or it might be
the first sign of a breach.</p>
<p><strong>Outcome:</strong> Instead of waiting for damage to occur,
security teams are alerted in real-time to suspicious activity. This
proactive stance is powered not by explicit supervision, but by the
machine’s ability to recognize what doesn’t fit.</p>
<h2 class="unnumbered" id="summary-and-conceptual-reflection">6. Summary
and Conceptual Reflection</h2>
<p>Unsupervised learning is about uncovering the unknown. It transforms
unlabelled data into meaningful structure—groups, patterns,
insights—that often form the bedrock of deeper analysis or action.</p>
<p>Let us reflect on what makes it powerful:</p>
<ul>
<li><p>It learns from the data <em>itself</em>, not from external
answers.</p></li>
<li><p>It supports <strong>exploration</strong>—ideal when hypotheses
are not yet formed.</p></li>
<li><p>It aids in <strong>data compression</strong>, <strong>pattern
recognition</strong>, and <strong>anomaly detection</strong>.</p></li>
<li><p>It applies to a wide range of domains: retail, genomics,
cybersecurity, sociology, and beyond.</p></li>
</ul>
<p>But it is not without limitations:</p>
<ul>
<li><p>There is no “accuracy”—success is judged by human
interpretation.</p></li>
<li><p>Different algorithms may produce different results.</p></li>
<li><p>It requires domain knowledge to validate and interpret
outputs.</p></li>
</ul>
<p>Still, in an era where labeled data is expensive and raw data is
plentiful, unsupervised learning stands as a key enabler of discovery.
It is less about answers, and more about questions: <em>What patterns
exist? What is normal? What lies beneath the surface?</em></p>
<p>These questions are at the heart of science, curiosity, and
intelligence. And in that sense, unsupervised learning is not just a
technique—it is a way of seeing.</p>
<h1
id="learning-through-experience-an-intuitive-guide-to-reinforcement-learning">Learning
Through Experience: An Intuitive Guide to Reinforcement Learning</h1>
<h2 class="unnumbered" id="what-is-reinforcement-learning">1. What is
Reinforcement Learning?</h2>
<p>Not all learning happens by being told the correct answer. Sometimes,
we learn simply by doing—trying, failing, adjusting, and trying
again.</p>
<p>This is the essence of <strong>reinforcement learning (RL)</strong>.
It is a learning paradigm inspired by how humans and animals learn
through interaction and feedback. Unlike supervised learning, which
relies on correct labeled answers, reinforcement learning is based on
<em>rewards and consequences</em>. The learner, called the
<strong>agent</strong>, takes actions in an environment and receives
feedback in the form of rewards. Over time, the agent learns which
actions lead to better outcomes.</p>
<p>Imagine teaching a dog to fetch. You don’t give it a manual—you throw
a stick, wait, and reward it when it brings the stick back. At first,
the dog doesn’t understand. But after several trials, it learns: bring
back the stick → get a treat. This is reinforcement learning in its most
natural form.</p>
<p>In the computational world, reinforcement learning is used when a
decision-making system must learn from its own actions. There is no
dataset of correct answers—only a loop of actions, outcomes, and
learning.</p>
<h2 class="unnumbered" id="core-concepts-and-intuition">2. Core Concepts
and Intuition</h2>
<p>At the heart of reinforcement learning is the interaction between an
<strong>agent</strong> and an <strong>environment</strong>. The agent
observes the current <strong>state</strong> of the environment, takes an
<strong>action</strong>, and receives a <strong>reward</strong> and a
new <strong>state</strong>. This process repeats over time, forming a
sequence known as a <em>trajectory</em>.</p>
<p><strong>Key Concepts:</strong></p>
<ul>
<li><p><strong>Agent:</strong> The learner or decision-maker (e.g., a
robot, a trading bot, a game-playing AI).</p></li>
<li><p><strong>Environment:</strong> Everything the agent interacts with
(e.g., physical world, simulated game, user).</p></li>
<li><p><strong>State:</strong> The current situation of the environment
(e.g., robot’s position, game board, user profile).</p></li>
<li><p><strong>Action:</strong> The decision the agent takes at each
step (e.g., move left, increase price, recommend content).</p></li>
<li><p><strong>Reward:</strong> A numerical signal indicating the
success of an action (e.g., +1 for success, -1 for failure).</p></li>
<li><p><strong>Policy:</strong> The strategy that the agent follows to
decide its actions.</p></li>
</ul>
<p>Unlike supervised learning, reinforcement learning has two major
challenges:</p>
<p><strong>1. Delayed Rewards:</strong> The result of an action may not
be immediate. A move in a game may affect the outcome ten steps
later.</p>
<p><strong>2. Exploration vs. Exploitation:</strong> Should the agent
stick with what it knows works (exploit), or try new actions to discover
something better (explore)? This trade-off is at the core of intelligent
behavior.</p>
<p><em>Think of it like learning to play chess. There is no immediate
reward for moving your knight forward—but that move might eventually
help you win the game. Reinforcement learning involves figuring out
which moves, across time, lead to success.</em></p>
<h2 class="unnumbered" id="case-study-1-teaching-a-robot-to-walk">3.
Case Study 1: Teaching a Robot to Walk</h2>
<p>Consider a robot placed on a flat surface. It has legs, motors, and
sensors—but no knowledge of how to walk. It starts from scratch.</p>
<p>Every movement it makes changes its balance and position. Initially,
it falls. A lot. But the robot receives a small positive reward every
time it moves forward and a negative reward when it falls.</p>
<p>At first, its actions are random. But over hundreds or thousands of
trials, the robot learns patterns:</p>
<ul>
<li><p>Moving both legs forward slightly keeps it balanced.</p></li>
<li><p>Shifting its weight before stepping improves stability.</p></li>
</ul>
<p>The robot doesn’t learn from a teacher—it learns from experience. It
remembers which movements led to falling and which led to progress. Over
time, the robot develops a policy that keeps it upright and helps it
move efficiently.</p>
<p><strong>Outcome:</strong> Without being told how to walk, the robot
learns to do so through trial, error, and reinforcement. This is one of
the most powerful demonstrations of RL: learning complex behaviors from
scratch.</p>
<h2 class="unnumbered"
id="case-study-2-dynamic-pricing-in-e-commerce">4. Case Study 2: Dynamic
Pricing in E-Commerce</h2>
<p>Imagine you’re managing an online store. You want to adjust the price
of a product dynamically—sometimes increasing it to maximize revenue,
other times lowering it to attract more customers. But how do you know
which strategy works best?</p>
<p>Enter reinforcement learning.</p>
<p>Here, the <strong>agent</strong> is the pricing algorithm. The
<strong>environment</strong> is the marketplace of customers. The
<strong>action</strong> is setting a price. The <strong>reward</strong>
is the profit earned (price × quantity sold).</p>
<p>The catch? Customer behavior is unpredictable. Lowering prices may
increase sales today, but hurt long-term profits. Raising prices might
reduce conversions but create a sense of exclusivity.</p>
<p>The agent must learn a policy that balances short-term and long-term
gains. It experiments with different price points and learns from
customer responses. Over time, it discovers:</p>
<ul>
<li><p>What pricing strategy maximizes revenue for different customer
segments,</p></li>
<li><p>How seasonal factors affect willingness to pay,</p></li>
<li><p>When discounts yield the best return.</p></li>
</ul>
<p><strong>Outcome:</strong> The system adapts its pricing not based on
rules, but from live market interaction—just like a human would through
experience.</p>
<h2 class="unnumbered"
id="case-study-3-personalized-learning-in-edtech">5. Case Study 3:
Personalized Learning in EdTech</h2>
<p>Online learning platforms increasingly aim to personalize content for
each student. But every learner is unique—what works for one might not
work for another.</p>
<p>Reinforcement learning offers a solution.</p>
<p>Here, the <strong>agent</strong> is the tutoring system. The
<strong>environment</strong> is the student. The
<strong>actions</strong> are the learning materials presented (e.g., a
video, quiz, or concept explanation). The <strong>reward</strong> is
measured through student engagement, quiz scores, or progress
metrics.</p>
<p>The system begins with general assumptions. It tries different
exercises, monitors the student’s response, and slowly learns:</p>
<ul>
<li><p>What content keeps the student engaged?</p></li>
<li><p>At what pace should new material be introduced?</p></li>
<li><p>Which teaching sequence results in better retention?</p></li>
</ul>
<p>Over weeks, the system adapts. It learns the student’s strengths,
weaknesses, and preferred learning paths. It becomes, in a sense, an
intelligent tutor—one that improves over time with every
interaction.</p>
<p><strong>Outcome:</strong> A customized learning journey tailored by
an agent that learns directly from student behavior—empowering scalable,
personalized education.</p>
<h2 class="unnumbered" id="summary-and-conceptual-reflection-1">6.
Summary and Conceptual Reflection</h2>
<p>Reinforcement learning stands apart from other forms of machine
learning because of its interactivity. It is not passive. It learns not
from a static dataset, but from engaging with the world—making
decisions, observing consequences, and improving over time.</p>
<p><strong>Where RL excels:</strong></p>
<ul>
<li><p>When decisions must be made in sequence, not isolation.</p></li>
<li><p>When feedback is delayed, indirect, or partial.</p></li>
<li><p>When an agent must balance trying new things with sticking to
what works.</p></li>
</ul>
<p><strong>Challenges of RL:</strong></p>
<ul>
<li><p>It often requires thousands (or millions) of interactions to
learn well.</p></li>
<li><p>It is sensitive to how rewards are designed.</p></li>
<li><p>In real-world systems, bad decisions can have costly
consequences.</p></li>
</ul>
<p>Despite its challenges, reinforcement learning powers some of the
most impressive AI systems of our time—from robots that walk and fly, to
AIs that play complex games at superhuman levels, to recommendation
engines that adapt on the fly.</p>
<p><em>At its core, reinforcement learning is a philosophy: that
intelligence can emerge from interaction. That by doing, failing, and
trying again, even a machine can learn to make smarter
decisions.</em></p>
<p>In that way, reinforcement learning is not just a method—it is a
reflection of how learning itself happens in the real world.</p>
<h1 id="conclusion-the-three-pillars-of-machine-learning">Conclusion:
The Three Pillars of Machine Learning</h1>
<p>As we step back from the intricate journey through the three
foundational paradigms of machine learning—supervised, unsupervised, and
reinforcement learning—it becomes clear that each method is not just a
technique, but a unique philosophy of how a machine can learn.</p>
<p><strong>Supervised learning</strong> teaches by example. It is
grounded in the notion of clear instruction: a dataset where every input
is matched with the correct answer. The goal is to generalize from these
examples to make accurate predictions on new, unseen data. Whether it’s
diagnosing disease from X-rays, forecasting stock prices, or identifying
spam emails, supervised learning shines when historical labels are
available and the objective is well-defined.</p>
<p><strong>Unsupervised learning</strong>, in contrast, embraces
curiosity. There are no labels, no explicit instructions—only data. It
is the paradigm of discovery. Unsupervised algorithms uncover structure,
patterns, and anomalies hidden within complex data. They help us explore
the unknown, reduce complexity, and gain insights we weren’t even
looking for. From customer segmentation to gene clustering, it allows
data to tell its own story.</p>
<p><strong>Reinforcement learning</strong> takes a more active path.
Here, learning unfolds through interaction. An agent makes decisions,
experiences the consequences, and refines its strategy to maximize
long-term success. This paradigm mirrors the way humans and animals
learn—through trial, error, feedback, and adaptation. Whether it’s
training robots, personalizing education, or optimizing digital
strategies, reinforcement learning thrives in dynamic environments where
actions shape the future.</p>
<p>While these three approaches differ in their methods, they are deeply
connected by a single goal: enabling machines to learn from data in
meaningful ways. They complement each other:</p>
<ul>
<li><p>Supervised learning excels at precision,</p></li>
<li><p>Unsupervised learning excels at exploration,</p></li>
<li><p>Reinforcement learning excels at decision-making over
time.</p></li>
</ul>
<p>As a practitioner, understanding when and how to use each method is
crucial. Sometimes, a project will demand labeled data and supervised
models. Other times, the real value will come from clustering or
compressing high-dimensional information. And in certain cases, learning
must happen over time, through continuous action and adaptation.</p>
<p>Ultimately, machine learning is not just a toolbox of algorithms. It
is a way of approaching problems—of teaching systems to perceive,
reason, adapt, and improve. And these three paradigms form the pillars
upon which that learning is built.</p>
<p><em>Supervised, unsupervised, and reinforcement learning are not just
algorithms—they are different ways of seeing the world, learning from
it, and acting within it. Together, they give machines the ability to
understand, to discover, and to grow.</em></p>
</body>
</html>
    ),
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
    description: (
      <div>
        <p>
          Our approach allows fab partners to collaboratively train defect
          detection models without pooling data.
        </p>
        <p>
          We outline the federated pipeline and illustrate how SHAP explanations
          uncover failure modes in sensor streams. Extensive experiments
          highlight privacy benefits alongside production-level accuracy.
        </p>
      </div>
    ),
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
    description: (
      <div>
        <p>
          The project leverages distributed vehicle data to improve
          state-of-charge predictions in diverse driving conditions.
        </p>
        <p>
          We evaluate several regression strategies and analyze communication
          costs for fleet-wide training. The resulting model reduces range
          anxiety and demonstrates scalability on real-world EV deployments.
        </p>
      </div>
    ),
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
