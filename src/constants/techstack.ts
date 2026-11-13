import {
  siAnthropic,
  siDjango,
  siDocker,
  siDuckdb,
  siFastapi,
  siFlask,
  siNextdotjs,
  siNumba,
  siPandas,
  siPlotly,
  siPolars,
  siPostgresql,
  siPydantic,
  siPytest,
  siPytorch,
  siRedis,
  siScikitlearn,
  siScipy,
  siSqlalchemy,
  siSqlite,
  siStreamlit,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

/**
 * Tools shown in the home-page skills banner, in two rows.
 * A skill has a logo image (`src`), a vector brand icon (`icon`), or neither,
 * in which case only its name is shown.
 */
export type Skill = {
  title: string;
  src?: string;
  /** For a black logo image: flip it to white on the dark theme. */
  invertOnDark?: boolean;
  icon?: { path: string; hex: string };
};

const brand = (icon: { path: string; hex: string }) => ({ path: icon.path, hex: icon.hex });

/** Languages, data and machine learning. */
const dataAndMl: Skill[] = [
  { title: "Python", src: "/images/logos/python.png" },
  { title: "TypeScript", icon: brand(siTypescript) },
  { title: "C++", src: "/images/logos/C++.png" },
  { title: "C", src: "/images/logos/C.png" },
  { title: "NumPy", src: "/images/logos/numpy.png" },
  { title: "pandas", icon: brand(siPandas) },
  { title: "SciPy", icon: brand(siScipy) },
  { title: "Polars", icon: brand(siPolars) },
  { title: "Numba", icon: brand(siNumba) },
  { title: "Scikit-learn", icon: brand(siScikitlearn) },
  { title: "XGBoost" },
  { title: "PyTorch", icon: brand(siPytorch) },
  { title: "TensorFlow", src: "/images/logos/tensorflow.png" },
  { title: "OpenCV", src: "/images/logos/opencv.png" },
  { title: "DuckDB", icon: brand(siDuckdb) },
  { title: "Plotly", icon: brand(siPlotly) },
  { title: "Matplotlib", src: "/images/logos/matplot.png" },
  { title: "Seaborn", src: "/images/logos/seaborn.png" },
];

/** LLM APIs, engineering, platforms and data sources. */
const engineering: Skill[] = [
  { title: "OpenAI API", src: "/images/logos/openai.png", invertOnDark: true },
  { title: "Anthropic API", icon: brand(siAnthropic) },
  { title: "FastAPI", icon: brand(siFastapi) },
  { title: "Pydantic", icon: brand(siPydantic) },
  { title: "React", src: "/images/logos/react.png" },
  { title: "Next.js", icon: brand(siNextdotjs) },
  { title: "Tailwind CSS", icon: brand(siTailwindcss) },
  { title: "PostgreSQL", icon: brand(siPostgresql) },
  { title: "MySQL", src: "/images/logos/mysql.png" },
  { title: "SQLite", icon: brand(siSqlite) },
  { title: "SQLAlchemy", icon: brand(siSqlalchemy) },
  { title: "Redis", icon: brand(siRedis) },
  { title: "Docker", icon: brand(siDocker) },
  { title: "pytest", icon: brand(siPytest) },
  { title: "Playwright" },
  { title: "Streamlit", icon: brand(siStreamlit) },
  { title: "Flask", icon: brand(siFlask) },
  { title: "Django", icon: brand(siDjango) },
  { title: "Microsoft Azure", src: "/images/logos/azure.png" },
  { title: "Databricks", src: "/images/logos/databricks.png" },
  { title: "Microsoft Fabric", src: "/images/logos/fabric.png" },
  { title: "Power BI", src: "/images/logos/powerbi.png" },
  { title: "WRDS" },
  { title: "Bloomberg Data License" },
];

export const techstackRows: Skill[][] = [dataAndMl, engineering];
