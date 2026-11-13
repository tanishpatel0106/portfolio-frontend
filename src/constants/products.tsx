export const products = [
  {
    href: "https://github.com/ai-at-the-margin/AIM-Replication",
    title: "AI at the Margin: Replicating an LLM stock-picking experiment on OpenAI and Anthropic models",
    description:
      "A reproducible pipeline that asks twelve language models for stock portfolios, resolves every ticker to an issuer with WRDS data and measures each book on a Barra-style factor model.",
    thumbnail: "/images/aim-1.webp",
    images: [
      "/images/aim-1.webp",
      "/images/aim-2.webp",
      "/images/aim-3.webp",
      "/images/aim-4.webp",
      "/images/aim-5.webp",
      "/images/aim-6.webp",
      "/images/aim-7.webp",
      "/images/aim-8.webp",
    ],
    imageAlt: [
      "Dashboard overview for the synthetic demo dataset: project summary and eight KPI cards for calls completed, valid portfolios, spend, holdings resolved, search use, estimation universe size and refusal rate",
      "Name overlap page: a 12 by 12 heatmap of mean Jaccard overlap between every pair of models for bare-request prompts, beside consensus names and the most frequently picked issuers, all from synthetic demo data",
      "Factor profiles page: every synthetic demo portfolio plotted on the first two principal components of its factor loadings, coloured by provider, next to a chart of name distance against factor distance",
      "Mandates page: a heatmap of mean factor loading for each of the Value, Quality, Momentum and Unconstrained mandates, and per-model bars of the change in the targeted factor, from synthetic demo data",
      "Search and queries page: dumbbell charts comparing momentum loadings offline and with web search available, by task and by model, above a heatmap of search invocation rates, from synthetic demo data",
      "AI crowd book page: KPI cards for the aggregate book, bars comparing crowd weight with market weight for the top 20 names, and the crowd book's factor exposures, from synthetic demo data",
      "Information date page: momentum loadings of offline Momentum-mandate books re-measured zero to 18 months back for each OpenAI model, and a scatter of implied against stated knowledge cutoff, from synthetic demo data",
      "Portfolio explorer with one simulated call opened: the call's factor loadings and its ten holdings, showing each ticker as written, the resolved issuer, the match method, weight, sector and exposures",
    ],
    stack: [
      "Python",
      "pandas",
      "NumPy",
      "SciPy",
      "DuckDB",
      "Apache Parquet",
      "asyncio and httpx",
      "RapidFuzz",
      "WRDS (Compustat, Capital IQ, I/B/E/S, CRSP)",
      "OpenAI Responses API",
      "Anthropic Messages API",
      "Barra-style factor model",
      "Bootstrap and permutation tests",
      "Principal component analysis",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "pytest",
    ],
    slug: "ai-at-the-margin",
    video: {
      src: "/videos/ai-at-the-margin.mp4",
      poster: "/videos/ai-at-the-margin-poster.webp",
      duration: 21,
    },
    featured: true,
    year: 2026,
    category: "finance",
    metrics: [
      { value: "12", label: "OpenAI and Anthropic models compared" },
      { value: "2,640", label: "planned model calls across three stages" },
      { value: "7", label: "factor exposures measured for every portfolio" },
      { value: "12", label: "dashboard pages" },
    ],
    content: (
      <div>
        <p data-label="Paper and question">
          {"I replicated the LLM portfolio experiment in OMI Advisory and Man Group's July 2026 paper, Artificial Intelligence, Alpha and the Architecture of Markets. The paper asks what a marginal AI investor would buy: when language models are asked for a ten-stock portfolio, do they converge on the same names, and do their books carry a consistent factor tilt? I rebuilt the full pipeline on twelve OpenAI and Anthropic models, keeping every choice the paper leaves open in configuration and a deviations log. The team later added DeepSeek and Kimi models for a pilot."}
        </p>
        <p data-label="Data">
          {"All market data comes from WRDS. I used Compustat daily prices for North America and global markets, Compustat FX, the Fama-French risk-free rate, point-in-time Compustat Snapshot fundamentals with a restated fallback, I/B/E/S forward earnings and Capital IQ as the security master. Each input has a primary and a fallback source, and a verification step probes table schemas at run time and picks a working source. It also computes an effective latest date for each table, which drops erroneous future-dated rows, and moves the as-of date back if prices or FX do not cover it."}
        </p>
        <p data-label="Portfolio collection">
          {"I wrote adapters for the OpenAI Responses API and the Anthropic Messages API that capture web-search queries, handle paused turns and record refusals. The design has three stages: four free-form framings asked 30 times per model, four 300 to 400 word institutional mandates asked 15 times, and the same eight prompts rerun on four models with web search available. That is 2,640 planned calls. The asynchronous runner retries transport errors with backoff, never retries refusals or malformed answers, resumes by deterministic call id, enforces a budget cap per stage and refuses to spend without a matching dry run."}
        </p>
        <p data-label="Ticker resolution">
          {"Models write tickers in many formats, such as BRK.B, 0700.HK, 600519.SS or ASML NA, so I built a resolver that maps each one to an issuer. It normalises the string against 30 canonical exchange codes, matches the ticker and exchange in Capital IQ, falls back to Compustat, and then to fuzzy matching on company names. Share classes, ADRs and cross-listings collapse to one issuer through the Capital IQ company id, so GOOGL and GOOG, or TSM and 2330.TW, count as the same name. Matches below a confidence threshold go to a review file."}
        </p>
        <p data-label="Factor model">
          {"Barra is not licensed on the account, so I built a Barra-style replica. It measures seven exposures for every issuer: size, value, quality, momentum, residual volatility, low volatility and beta. Returns are daily USD total returns. Momentum is an EWMA-weighted 504-day excess return lagged 21 days, with a simple 12-1 month return as a robustness check. Quality averages profitability, leverage, earnings variability and accruals. Each descriptor is winsorised and standardised against an estimation universe that approximates MSCI ACWI, so a book's loading is in standard deviations. Missing data stays missing and flagged rather than zero-filled."}
        </p>
        <p data-label="Analysis and dashboard">
          {"The analysis reproduces the paper's seven figures and adds new measures. It computes Jaccard name overlap with bootstrap confidence intervals over 2,000 draws, mandate effects with permutation tests, a four-part compliance test, web-search invocation rates and a rule-based query classifier scored with Cohen's kappa. The new analytics include a PCA of every book in factor space, an aggregate AI crowd book against market weights, and an implied information date that re-measures momentum books zero to 18 months back. I built a React dashboard with twelve pages over the exported results."}
        </p>
        <p data-label="What it shows">
          {"The pipeline measures how much models agree on names as the prompt becomes more specific, whether different names still produce similar factor positions, whether a mandate moves the factor it targets, and whether web search changes a momentum book. The screenshots come from the synthetic demo, which runs the whole design on simulated models and a synthetic market without API keys or WRDS access. In that demo the resolver matched 35,011 of 35,158 holdings. Demo numbers test the code path only and are not research results; the dashboard labels every page as synthetic."}
        </p>
      </div>
    ),
  },
  {
    href: "https://github.com/tanishpatel0106/FI-Acc-Dec-Wedmont",
    title: "LIFECYCLE: Lifetime-Utility Research Platform for Multi-Asset Retirement Portfolios",
    description:
      "A research platform that measures, in certainty-equivalent consumption, how much a cash-flow-aware multi-asset allocation is worth over 60/40 or a target-date glidepath across savings rates, withdrawal rates and economic regimes.",
    thumbnail: "/images/lifecycle-1.webp",
    images: [
      "/images/lifecycle-1.webp",
      "/images/lifecycle-2.webp",
      "/images/lifecycle-3.webp",
      "/images/lifecycle-4.webp",
      "/images/lifecycle-5.webp",
      "/images/lifecycle-6.webp",
      "/images/lifecycle-7.webp",
      "/images/lifecycle-8.webp",
    ],
    imageAlt: [
      "Withdrawal-Rate Sensitivity Lab showing the headline heatmap of certainty-equivalent consumption gain over 60/40 by withdrawal rate and years relative to retirement, with summary statistics and the public-data flag",
      "Detail card for the 5.0% withdrawal, at-retirement heatmap cell: policy weights, real wealth and consumption fan charts, portfolio weights by age and cumulative depletion probability against the 60/40 benchmark",
      "Research Lab dependence view: rolling and DCC correlation of US equity and 10-year Treasuries with change points, joint-loss frequency by decade, an inflation-regime table and Student-t copula tail statistics",
      "Fixed Income panel: par-bond table of duration, convexity and DV01 by maturity beside a parallel rate-shock chart comparing full repricing with the duration and convexity approximation",
      "Lifecycle Simulator with the investor form and results for a parametric dynamic policy against 60/40: certainty-equivalent consumption, depletion probability and wealth and consumption fan charts",
      "Policy Optimizer bar chart of certainty-equivalent gain over 60/40 with two-standard-error whiskers for ten policies, with each policy's certainty-equivalent consumption listed below",
      "Withdrawal Lab accumulation surface: heatmap of certainty-equivalent gain over a target-date glidepath by savings rate and starting age",
      "Strategy comparison of the parametric policy and 60/40 on common paths: paired certainty-equivalent table, per-path scatter plot and a divergent-path wealth chart",
    ],
    stack: [
      "Python",
      "NumPy",
      "Numba",
      "SciPy",
      "pandas",
      "FastAPI",
      "Pydantic",
      "Apache Arrow",
      "SQLite",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Plotly",
      "Docker",
      "Monte Carlo simulation",
      "Dynamic programming",
      "Stationary block bootstrap",
      "Markov-switching models",
      "DCC-GARCH",
    ],
    slug: "lifecycle",
    video: {
      src: "/videos/lifecycle.mp4",
      poster: "/videos/lifecycle-poster.webp",
      duration: 22,
    },
    featured: true,
    year: 2026,
    category: "finance",
    metrics: [
      { value: "91", label: "heatmap cells per decumulation sweep, each a cached, addressable run" },
      { value: "5", label: "scenario generators" },
      { value: "14", label: "allocation policy types" },
      { value: "27", label: "backend tests" },
    ],
    content: (
      <div>
        <p data-label="Problem">
          {"Most retirement tools ask whether a portfolio survives. I wanted to measure how much better off an investor is when the allocation responds to their own cash flows, horizon and the economic regime. LIFECYCLE answers that in certainty-equivalent consumption: the constant real spending level that gives the same lifetime utility as the simulated outcome. The headline exhibit is a heatmap of the percentage gain of an optimised policy over a 60/40 portfolio, across withdrawal rates from 2% to 8% and years relative to retirement."}
        </p>
        <p data-label="Data">
          {"I wrote ingestion for five public sources: the Kenneth French library, FRED, the Federal Reserve's Gürkaynak–Sack–Wright yield curves, the New York Fed ACM term premium and the SSA life table. A committed snapshot of 52,884 rows lets the panel build with no network access, and a manifest records the SHA-256 of every file. I also wrote WRDS ingestion for CRSP, bond and ETF series, which take priority when present. Treasury, TIPS and credit returns built from public yields are repriced month to month and tagged as model-generated."}
        </p>
        <p data-label="Market Models">
          {"The research layer studies how assets move together before anything is simulated. I implemented rolling 12, 36 and 60-month correlations, Ledoit–Wolf shrinkage, DCC-GARCH(1,1), Student-t copula tail dependence and PELT change points, with covariance forecasts scored out of sample by QLIKE. A fixed-income module prices bonds on the fitted curve and reports duration, DV01, convexity, rate-shock tables and a PCA of yield changes. Five scenario generators feed the simulator: historical cohorts, a stationary block bootstrap, a multivariate Student-t, a Markov-switching model and a yield-curve factor model."}
        </p>
        <p data-label="Lifecycle Kernel">
          {"The simulator is a Numba kernel that moves wealth forward monthly in real terms. It covers accumulation and decumulation in one model: labour income following the Cocco–Gomes–Maenhout profile, a pension, rebalancing costs, SSA mortality and a bequest motive. Spending can follow fixed real, fixed percentage, guardrails, bucket or amortised rules. Utility is CRRA with a consumption floor, and paths that cannot fund planned spending are flagged as shortfalls instead of being dropped. Every policy is compared with its benchmark on the same random paths, so differences are paired."}
        </p>
        <p data-label="Optimisation">
          {"I implemented 14 allocation policy types. The static ones include mean–variance, risk parity, mean–CVaR solved as a linear program and a CRRA-optimal constant mix fitted on simulated paths. The dynamic ones include regime-dependent mixes and a parametric policy that is fitted on one set of seeds and reported on another. As a reference point I solved a reduced three-asset problem by grid dynamic programming, with a 200-point cash-on-hand grid, a 21-point weight simplex and Markov-switching regimes."}
        </p>
        <p data-label="Runs and API">
          {"Every computation is a frozen specification whose SHA-256, combined with the data catalog hash, becomes its run ID, so an identical request returns from the cache. Runs are stored in a SQLite registry with the engine version, lockfile hash, seeds and timings. A sweep is a grid of such runs: the default decumulation surface has 91 cells, 13 withdrawal rates by 7 horizons, at 2,000 paths per cell. A FastAPI service exposes 25 operations under /v1, streams progress over server-sent events and returns path arrays as Arrow IPC."}
        </p>
        <p data-label="Research Terminal">
          {"The front end is a Next.js application with nine screens: an overview, a research lab, a fixed-income panel, a simulator, a policy optimizer, a withdrawal-rate lab, comparison and validation, a run history and a methodology page. It never computes analytics; each chart is drawn with Plotly from a backend run and carries that run's ID, spec hash and catalog hash. Clicking a heatmap cell opens the policy behind it, its wealth and consumption fans and its depletion probability, and any run can be exported as PDF, CSV, BibTeX or JSON."}
        </p>
        <p data-label="Validation">
          {"I wrote 27 backend tests on synthetic fixtures, covering accounting identities, recovery of the Merton solution, estimator recovery and the API. One test replays historical 60/40 cohorts against an independent spreadsheet-style loop and requires agreement to 1e-8. For results, the platform reports Monte Carlo, parameter and model uncertainty separately: convergence across 1,000 to 10,000 paths, a parameter bootstrap, and the same policy under three scenario generators. A result is called robust only if its sign survives all three, and a reproduce command re-executes any run and asserts identical summary statistics."}
        </p>
        <p data-label="Findings">
          {"On the public-data snapshot, with WRDS data still pending, the headline run compared a parametric dynamic policy with 60/40 for a risk aversion of 4 under the block bootstrap. Across the 91 cells the mean gain in certainty-equivalent consumption was 7.55%, the largest was 17.6%, and 80 cells were more than two standard errors from zero. Gains were close to zero for retirees withdrawing 3% or less and generally grew with the withdrawal rate. These numbers are model-dependent research output from one data vintage, not investment advice."}
        </p>
      </div>
    ),
  },
  {
    href: "https://github.com/Simulated-Investment-Manager-Platform/App-SIMP",
    title: "SIMP: A simulated asset manager, from index decision to fill",
    description:
      "A research platform that runs a synthetic S&P 500 index fund end to end, turning CRSP-based decisions into PM, trader and broker orders, executing them against BMLL-schema market data and measuring cost with notional-weighted TCA.",
    thumbnail: "/images/simp-1.webp",
    images: [
      "/images/simp-1.webp",
      "/images/simp-2.webp",
      "/images/simp-3.webp",
      "/images/simp-4.webp",
      "/images/simp-5.webp",
      "/images/simp-6.webp",
      "/images/simp-7.webp",
      "/images/simp-8.webp",
    ],
    imageAlt: [
      "SIMP overview screen: spotlight header, data-health strip for CRSP, BMLL, mapping and snapshot, and a bento grid with the S&P 500 index fund and Phase 1 generator cards, recent runs and links to studies and lineage, all labelled synthetic data",
      "Fund performance tab for the synthetic S&P 500 index fund: KPI tiles for tracking difference, tracking error, return, volatility, drawdown, Sharpe and ending NAV above a fund-versus-benchmark chart, daily active return and rolling tracking error",
      "Completed run detail for the T1 run with flows: progress steps, tracking difference, execution cost and notional traded, the run record with snapshot and policy hashes, a passed order-chain audit with 100% lineage, and the streamed log",
      "Blotter with a PM order expanded into MOC and VWAP trader orders, their child orders and fills, and the lineage drawer open showing the intraday price path with fills, the timeline, PM order details, implementation shortfall and repricings",
      "TCA screen showing the notional-weighted cost heatmap of order size against ADV and auction volume on a diverging scale, the concentration of rebalance notional by date, and cost by rebalance date beside tracking difference",
      "One-date study for the 20 March 2026 rebalance: cost under T0, MOC, VWAP, arrival, handoff and as executed, an MOC cost versus auction-size scatter, named largest orders and a T2 replay table of the top ten orders",
      "Market explorer for a synthetic security on 20 March 2026: closing auction, volume, imbalance, ADV, spread and VWAP tiles, close versus VWAP, closing auction volume, an intraday minute path and execution-venue shares",
      "Studies screen with the counterfactual chain selected: six completed runs from the handoff baseline through timing, flows, costs, fee and exclusion policy, and a chart attributing the tracking-difference change to each step",
    ],
    stack: [
      "Python 3.12",
      "FastAPI",
      "PostgreSQL 16",
      "SQLAlchemy",
      "Alembic",
      "Polars",
      "Parquet",
      "Pydantic",
      "Dramatiq",
      "Redis",
      "Next.js 15",
      "TypeScript",
      "TanStack Query",
      "ECharts",
      "Docker Compose",
      "pytest and Hypothesis",
      "Playwright",
      "Implementation shortfall",
      "Block bootstrap",
    ],
    slug: "simp",
    video: {
      src: "/videos/simp.mp4",
      poster: "/videos/simp-poster.webp",
      duration: 21,
    },
    featured: true,
    year: 2026,
    category: "finance",
    metrics: [
      { value: "1,002", label: "trading sessions per run on the synthetic NYSE calendar" },
      { value: "29", label: "Postgres tables in the order-chain and ledger schema" },
      { value: "56", label: "FastAPI endpoints" },
      { value: "66", label: "backend tests" },
    ],
    content: (
      <div>
        <p data-label="Problem">
          {"The team handed over a research notebook that replicated a four-year S&P 500 index fund, July 2022 to June 2026, under simple assumptions: decide on a Monday close, fill at Tuesday's close, pay no trading cost and see no investor flows. I wanted to know what that fund would have looked like if an asset manager had actually run it, with orders passing from a portfolio manager to a trading desk to brokers, executing against auction and intraday market data, and being measured the way a buy-side TCA team would. That meant replacing the notebook with a platform where every share could be traced and every number reproduced."}
        </p>
        <p data-label="Data">
          {"I built a Parquet lake with a manifest per pull, a SHA-256 hash for every file and schema contracts checked on write, so each run pinned the snapshot it read. The bundled data is synthetic: a generator writes CRSP CIZ v2 and BMLL Data Lab tables under their real column names, and every manifest, API response, export and screen carries a SYNTHETIC label. I wrote the live connectors, a WRDS loader that checks CIZ columns first and an isolated BMLL SDK puller, but they were not used for these images. I mapped securities point in time from PERMNO to ISIN to BMLL ListingId, sending unmapped names to a review queue."}
        </p>
        <p data-label="Order chain">
          {"I modelled the order chain as five Postgres tables, pm_order, trader_order, program, child_order and fill, with foreign keys running from each fill back through its child and trader order to the PM order, the decision and the run. On the ledger side I recorded fills, T+1 and T+2 settlement, dividends, flows and fees, which fed daily NAV and position tables. Every run ended with an audit requiring 100% fill lineage, no quantity overruns, timestamps that only moved forward and an explicit EXPIRED or CANCELLED status for any quantity left unfilled. Unsupported corporate events were never given an invented payoff; the affected names were excluded and exited before the ex-date."}
        </p>
        <p data-label="Engine">
          {"The engine ran a deterministic session loop: corporate actions and settlement before the open, then decisions, the desk, execution and post-close accounting. I checked the NAV identity every session against an independent P&L path and stopped the run with a named error on any break. Index replication decided at the announcement close, five sessions before the effective date, and traded the third-Friday closing auction, while the handoff's Monday-to-Tuesday timing stayed available for comparison. Investor flows followed an AR(1) process with Student-t shocks and a redemption jump, and flow orders were netted against same-day rebalance orders through internal crosses. Desk routing came from a validated YAML rules table."}
        </p>
        <p data-label="Execution and TCA">
          {"I implemented four execution tiers. T0 filled at the close, T1 applied auction and square-root impact models to daily BMLL data, T2 replayed intraday prints capped at 10% of each interval's volume, and T3 wrote a job spec for BMLL's Data Lab simulator. Analytics were notional-weighted throughout. Implementation shortfall was split into delay, execution, explicit and opportunity cost, every order was repriced at MOC, VWAP and arrival, and confidence intervals came from a block bootstrap by date with 2,000 resamples. A heatmap crossed order size against ADV and auction volume. A known-answer test injected a cost into generated fills and recovered it within 0.5 bps."}
        </p>
        <p data-label="Fund analytics">
          {"At fund level I computed tracking difference and tracking error, net and gross of fees, against CRSP's value-weighted return or the official total return, along with cash drag, beta, drawdown and worst days. To explain tracking difference, I built a counterfactual chain of six runs that switched one effect on at a time, from the handoff baseline through effective-date timing, investor flows, T1 costs, the management fee and the exclusion policy, and attributed each step's change. Sensitivity studies swept the provisional dividend rule, the exclusion policy, cost parameters at plus and minus 50% and the flow regime. A one-date study broke a single rebalance down order by order."}
        </p>
        <p data-label="Interface">
          {"I built the frontend in Next.js 15 and TypeScript with ten screens: Overview, Fund, Runs, Blotter, TCA, the one-date study, Market explorer, Studies, Data and Settings. Runs were submitted through a stepped form that checked data availability first, then streamed progress over server-sent events. The blotter expanded PM orders into trader orders, child orders and fills, and a lineage drawer showed the intraday price path, the timeline and the shortfall for a single order. Every filter lived in the URL so that views could be shared, and the TypeScript client was generated from the FastAPI OpenAPI schema. Buys were blue, sells orange, and cost used a diverging scale."}
        </p>
        <p data-label="Reproducibility and testing">
          {"Each run stored its config hash, git SHA, lake snapshot hash, corporate-action review hash and desk-policy hash, and random draws came from a seeded PCG64 stream per seed, component and date. The replay command re-ran a config on its pinned snapshot and failed unless the output hash matched; for the run in these images it matched. I wrote 66 backend tests covering Hypothesis property tests on the ledger, order-chain invariants, known-answer TCA, timing regressions, mapping, determinism, T2 caps and an OpenAPI contract snapshot. CI ran ruff, strict mypy, pytest, and the frontend lint, type check, Vitest and build. A Playwright journey drove a run from submission to a fill."}
        </p>
      </div>
    ),
  },
  {
  href: "https://github.com/tanishpatel0106/Visualiser-IMC",
  title: "Prosperity Trading Terminal",
  description:
    "A Bloomberg-style trading terminal and research platform for the IMC Prosperity algorithmic trading competition, supporting tick-by-tick market replay, strategy backtesting, order book visualization, execution simulation, and real-time performance analytics.",
  thumbnail: "/images/IMC-1.png",
  images: [
    "/images/IMC-1.png"
  ],
  stack: [
    "Algorithmic Trading",
    "Market Microstructure",
    "Backtesting Engines",
    "Order Book Replay",
    "Execution Modeling",
    "Strategy Research",
    "Market Making",
    "Mean Reversion",
    "Momentum Strategies",
    "PnL Attribution",
    "Technical Analysis",
    "FastAPI",
    "Python",
    "Pandas",
    "NumPy",
    "Pydantic",
    "SQLite",
    "REST APIs",
    "WebSockets",
    "React",
    "TypeScript",
    "Vite",
    "Zustand",
    "TradingView Lightweight Charts",
    "Real-Time Data Streaming",
    "Interactive Dashboards",
    "CSV Data Pipelines",
    "OHLCV Aggregation",
    "Performance Analytics",
    "Strategy Sandbox",
  ],
  slug: "prosperity-trading-terminal",
  featured: true,
  content: (
    <div>
      <p>
        This project explores the design of a professional-grade trading
        terminal for algorithmic strategy research in the IMC Prosperity
        competition. The platform is built to replay historical market data
        tick by tick, visualize order book dynamics, test trading strategies,
        and analyze execution quality from a single interactive workspace.
      </p>

      <p>
        I developed a full-stack trading research system with a FastAPI backend
        and a React TypeScript frontend. The backend handles market data
        loading, CSV normalization, replay orchestration, strategy execution,
        fill simulation, backtesting, and persistence. The frontend provides a
        Bloomberg-style interface with resizable panels, keyboard-driven replay
        controls, real-time charts, strategy configuration, and live PnL
        tracking.
      </p>

      <p>
        The core replay engine reconstructs historical order book states from
        IMC Prosperity price snapshots and trade prints. Users can select a
        product and trading day, step forward or backward through market events,
        adjust playback speed, and observe how the bid-ask ladder, depth chart,
        trade tape, candlestick chart, positions, fills, and PnL evolve over
        time.
      </p>

      <p>
        The strategy engine supports both built-in and user-uploaded trading
        strategies. It includes market-making, mean-reversion, momentum, and
        microstructure-based strategies, along with a sandbox runner that
        executes custom Python strategy files through the IMC Prosperity
        Trader interface. This makes it possible to test strategy logic against
        realistic historical market states without manually wiring replay,
        orders, fills, and position accounting.
      </p>

      <p>
        A major component of the project is the execution simulation layer.
        Because the competition data provides periodic order book snapshots
        rather than full Level 3 queue-level events, the platform implements
        multiple execution models. Conservative, balanced, and optimistic fill
        assumptions allow users to evaluate how sensitive a strategy is to
        passive fill uncertainty, book movement, and trade-print evidence.
      </p>

      <p>
        The terminal also includes a rich analytics and visualization workflow.
        The frontend supports candlestick, line, step, and OHLC chart modes,
        fill markers, volume bars, technical overlays, and more than 200
        configurable technical indicators. Backtest results are summarized
        through metrics such as total PnL, realized and unrealized PnL, Sharpe
        ratio, max drawdown, win rate, profit factor, trade count, and execution
        history.
      </p>

      <p>
        To support live strategy debugging, the platform streams replay updates
        through WebSockets and exposes detailed per-tick traces. Users can
        inspect submitted orders, fills, positions, strategy notes, and running
        PnL at each market event. The terminal also provides multiple workspace
        layouts for trading, analysis, strategy development, and debugging,
        making it easier to move from high-level performance review to
        tick-level diagnosis.
      </p>

      <p>
        Overall, Prosperity Trading Terminal demonstrates how market
        microstructure visualization, strategy backtesting, execution modeling,
        and full-stack engineering can be combined into a practical research
        environment for algorithmic trading. Instead of relying only on offline
        scripts, the system gives traders an interactive way to replay markets,
        understand strategy behavior, and diagnose performance under different
        execution assumptions.
      </p>
    </div>
  ),
},
  {
  href: "https://github.com/tanishpatel0106/DSI_AI_Adoption",
  title: "AI Adoption Value Realization Dashboard",
  description:
    "An executive Power BI system that turns a two-year, $4M enterprise AI adoption strategy into a tracked value-realization layer, modeling spend, revenue uplift, payback, KPI gates, roadmap progress, scenario NPV, and program risk for a $75M CPG e-commerce business.",
  thumbnail: "/images/DSI-1.webp",
  images: [
    "/images/DSI-1.webp",
    "/images/DSI-2.webp",
    "/images/DSI-3.webp",
    "/images/DSI-4.webp",
    "/images/DSI-5.png",
    "/images/DSI-6.png"
  ],
  stack: [
    "Power BI",
    "DAX",
    "TMDL Semantic Modeling",
    "Financial Modeling",
    "Synthetic Data Generation",
    "Scenario and NPV Analysis",
    "KPI Frameworks",
    "Python",
    "pandas",
    "Data Visualization",
  ],
  slug: "ai-value-realization-dashboard",
  content: (
    <div>
      <p>
        This project explores value realization for enterprise AI adoption. For
        a $75M CPG e-commerce business, a two-year, $4M AI adoption program
        projected roughly $16.5M in incremental revenue across four
        workstreams: forecasting and pricing, trend detection, personalization,
        and customer experience. The challenge was not just proposing the
        strategy, but proving that value was actually being realized as the
        investment was deployed.
      </p>

      <p>
        I built an executive Power BI dashboard that converts a static
        consulting-style AI roadmap into a living value-realization system. The
        dashboard allows leadership to track program spend, revenue uplift,
        gross-profit impact, payback timing, KPI performance, roadmap delivery,
        financial scenarios, and governance risks quarter by quarter.
      </p>

      <p>
        I developed the solution end to end, starting with a case-aligned
        synthetic dataset engineered to reconcile exactly to the program&apos;s
        headline economics. The model ties out to $4.0M in total spend, $16.5M
        in incremental revenue uplift, $6.6M in gross-profit uplift at a 40%
        margin, and $2.6M in net contribution. This ensures that the strategic
        narrative and the dashboard metrics remain internally consistent.
      </p>

      <p>
        The core of the system is a star-schema semantic model organized around
        a shared quarter dimension. The model includes seven tables and
        thirty-four DAX measures, authored as a Power BI Project using TMDL.
        Revenue uplift is modeled on a realized-in-period basis and allocated
        across workstreams using an iterative proportional fitting approach, so
        that the cumulative gross-profit curve crosses cumulative spend at the
        intended payback quarter.
      </p>

      <p>
        The report is organized into six executive-facing pages. The Executive
        Control Tower summarizes spend, uplift, ROI, and payback status. The
        Workstream Value Bridge decomposes the $16.5M uplift across AI
        initiatives and compares Year 1 versus Year 2 ramp. The KPI Gate
        Dashboard evaluates operational metrics against glide-path targets. The
        Roadmap Tracker monitors delivery progress across the 24-month program.
        The Scenario Simulator flexes the financial case across Bear, Base, and
        Bull assumptions. The Risk and Governance page connects underperforming
        KPIs to specific program risks and owners.
      </p>

      <p>
        On the financial-modeling side, I separated the program&apos;s headline
        multiple into distinct measures for gross revenue multiple, gross-profit
        ROI, and net-revenue ROI. This makes the financial interpretation more
        defensible because each number answers a different executive question.
        The scenario engine applies workstream-level uplift multipliers, gross
        margin assumptions, and discount-rate changes before rolling the
        program into a three-year NPV calculation.
      </p>

      <p>
        The KPI framework is direction-aware, meaning each metric is evaluated
        against its own expected improvement path rather than a single global
        threshold. Metrics are classified into red, amber, or green statuses
        based on their glide-path performance. I deliberately included red KPI
        cases and linked them to governance risks, so the dashboard functions as
        both a reporting layer and an accountability system.
      </p>

      <p>
        Overall, the project demonstrates how financial modeling, dimensional
        data design, DAX engineering, and executive BI storytelling can make an
        AI investment auditable. Instead of stopping at whether AI models were
        shipped, the dashboard reframes the program in P&amp;L terms and shows
        whether business value is being realized gate by gate.
      </p>
    </div>
  ),
},
  {
  href: "https://github.com/tanishpatel0106/MatchOdds-AI",
  title: "MatchOdds AI",
  description:
    "An agentic RAG system for NBA pre-game betting analysis that aggregates statistics, injuries, odds, historical matchups, news, and sentiment signals, then compares CoT, ReAct, and multi-agent reasoning strategies for calibrated game prediction.",
  thumbnail: "/images/MatchOdds1.webp",
  images: [
    "/images/MatchOdds1.webp",
    "/images/MatchOdds2.webp",
    "/images/MatchOdds3.png",
    "/images/MatchOdds4.png"
  ],
  stack: [
    "Agentic RAG",
    "Sports Analytics",
    "LLM Agents",
    "Chain-of-Thought",
    "Multi-Agent Debate",
    "ChromaDB",
    "FastAPI",
    "React",
    "Python",
    "NBA API",
  ],
  slug: "matchodds-ai",
  video: {
    src: "/videos/matchodds-ai.mp4",
    poster: "/videos/matchodds-ai-poster.webp",
    duration: 21,
  },
  content: (
    <div>
      <p>
        This project explores agentic retrieval-augmented generation for NBA
        pre-game betting analysis. Before tip-off, useful information is spread
        across fragmented sources such as injury reports, team statistics,
        head-to-head records, bookmaker odds, news coverage, and fan sentiment.
        MatchOdds AI was built to unify these signals into a structured
        analysis workflow that can produce evidence-grounded game predictions.
      </p>

      <p>
        I developed an end-to-end sports intelligence system that collects,
        organizes, retrieves, and reasons over NBA pre-game data. The system
        aggregates team performance statistics, historical matchups, injury
        reports, odds data, news sentiment, social signals, and semantically
        similar historical games. These sources form a shared evidence layer
        that can be passed into different reasoning backends for controlled
        comparison.
      </p>

      <p>
        The core retrieval layer uses a ChromaDB vector store containing
        embedded historical NBA game records with metadata such as team,
        season, home/away status, rest context, and back-to-back indicators.
        Given an upcoming matchup, the system retrieves similar historical
        games and combines them with structured tools for team stats,
        head-to-head records, injuries, odds, and sentiment signals.
      </p>

      <p>
        To study how different LLM reasoning strategies behave on the same
        forecasting task, I implemented three interchangeable analysis methods.
        The chain-of-thought baseline gathers all evidence deterministically
        before a single structured reasoning pass. The ReAct agent decides
        which tools to call step by step, observes intermediate results, and
        then produces a final report. The multi-agent debate system separates
        reasoning across specialized agents, including a stats agent, matchup
        agent, and market agent, before synthesizing their views into a
        consensus prediction.
      </p>

      <p>
        The evaluation framework backtests the system on historical NBA games
        using proper scoring and calibration metrics. Each method is evaluated
        with Brier score, log loss, expected calibration error, accuracy,
        precision, recall, and F1. The project also studies whether information
        density improves prediction quality and uses ablation experiments to
        measure which data sources contribute the most predictive signal.
      </p>

      <p>
        The main empirical finding is that the simpler chain-of-thought
        baseline outperforms both the single ReAct agent and the multi-agent
        debate system across the measured metrics. This result highlights an
        important design lesson for agentic systems: when all relevant evidence
        can be gathered reliably upfront, a single structured reasoning pass may
        be more stable than iterative tool-calling or multi-agent coordination.
      </p>

      <p>
        The project also includes a user-facing application for generating NBA
        matchup reports. The interface allows users to select a game, choose a
        reasoning method, and view structured outputs such as win probability,
        key factors, similar historical games, reasoning traces, calibration
        results, and evaluation charts. This makes the system both a practical
        betting-analysis assistant and a research platform for comparing LLM
        reasoning architectures.
      </p>

      <p>
        Overall, MatchOdds AI demonstrates how retrieval, structured sports
        data, vector search, and LLM reasoning can be combined into an
        interpretable pre-game analytics system. Beyond predicting winners, the
        project shows how agent design, evidence availability, calibration, and
        output consistency affect the reliability of LLM-powered decision
        systems in high-noise forecasting tasks.
      </p>
    </div>
  ),
},
  {
  href: "https://github.com/tanishpatel0106/DynamicResourceAllocation",
  title: "Dynamic Resource Allocation in Cloud Computing",
  description:
    "A power-aware, SLA-bound deep reinforcement learning scheduler for cloud computing, built with a custom Gymnasium simulator, PyTorch RL agents, FastAPI orchestration, and a React monitoring dashboard.",
  thumbnail: "/images/DR-Thumb.webp",
  images: [
    "/images/DR-Thumb.webp",
    "/images/DRA-1.webp",
    "/images/DRA-2.webp",
    "/images/DRA-3.webp",
  ],
  stack: [
    "Deep Reinforcement Learning",
    "Cloud Scheduling",
    "Gymnasium",
    "PyTorch",
    "Double DQN",
    "PPO",
    "Hierarchical Agentic RL",
    "Lagrangian CMDP",
    "FastAPI",
    "WandB"
  ],
  slug: "cloud-rl",
  video: {
    src: "/videos/cloud-rl.mp4",
    poster: "/videos/cloud-rl-poster.webp",
    duration: 22,
  },
  content: (
    <div>
      <p>
        This project explores dynamic resource allocation in cloud computing,
        where queued jobs must be assigned to heterogeneous servers while
        balancing two competing objectives: reducing cluster power consumption
        and satisfying SLA latency deadlines. Since server power is non-linear
        with respect to utilization, simple scheduling heuristics can miss
        important long-horizon trade-offs between energy efficiency, queue
        pressure, and deadline violations.
      </p>

      <p>
        I built an end-to-end reinforcement learning system that models the
        cloud cluster as a discrete-time Markov Decision Process. The custom
        Gymnasium environment represents server utilization, memory usage,
        power capacity, queued job requirements, job duration, and wait time.
        At each step, the scheduler decides which queued job should run on
        which server, or whether the system should wait when no valid placement
        exists.
      </p>

      <p>
        The core environment uses a heterogeneous server fleet with efficient,
        standard, and power-hungry machine tiers. The action space jointly
        combines queue-slot selection and server placement, while invalid-action
        masking ensures that infeasible job-server assignments are blocked both
        during action selection and during value-target computation. The reward
        function combines normalized active power with SLA violation signals
        and continuous queue-pressure shaping, allowing the agent to learn
        before deadlines are actually missed.
      </p>

      <p>
        I implemented and compared multiple scheduling agents across different
        reinforcement learning paradigms. The system includes a Double DQN
        agent for discrete off-policy control, a PPO actor-critic agent for
        stable on-policy learning, a hierarchical agentic-RL scheduler with
        separate power and SLA sub-agents supervised by a learned arbitrator,
        and a Lagrangian CMDP-style offline agent that treats SLA violations as
        a constrained cost rather than only a soft reward penalty.
      </p>

      <p>
        The project also extends the baseline scheduler with sleep and wake
        server actions. In this setting, servers can be placed into a low-power
        standby state and later reactivated with a wake-up delay. This changes
        the scheduling problem from pure placement into true power-aware control:
        the agent must decide not only where to place jobs, but also when to
        keep capacity active, when to save energy, and how to avoid violating
        SLA constraints during workload bursts.
      </p>

      <p>
        To make experiments reproducible, I designed a full evaluation harness
        with train/test seed splits, deterministic heterogeneous fleets,
        synthetic Poisson workloads, Google trace-sampled workloads, baseline
        heuristics, logging, and held-out greedy evaluation. The system reports
        reward, power consumption, SLA violation rate, and power-SLA trade-offs
        across learned agents and classical baselines such as Shortest Job
        First, First-Fit Decreasing, and Round Robin.
      </p>

      <p>
        Beyond the RL engine, the project includes a full-stack experimentation
        interface. A FastAPI backend orchestrates training jobs, a SQLite store
        persists run metadata and metrics, WebSockets stream live training
        updates, and a React dashboard visualizes training curves, power usage,
        SLA violations, and model comparisons through interactive Recharts
        components.
      </p>

      <p>
        Overall, this project demonstrates how deep reinforcement learning can
        be used to build a practical, monitorable, and extensible cloud
        scheduling system. Instead of treating resource allocation as a static
        heuristic problem, the framework learns policies that adapt to bursty
        workloads, heterogeneous infrastructure, non-linear power behavior, and
        explicit SLA constraints.
      </p>
    </div>
  ),
},
  {
  href: "https://docs.google.com/presentation/d/1G7gwhbNBzrtuOHRz2x5eNaSgxluANCQH5tDbGcE5lro/edit?usp=sharing",
  title: "Data Valuation for Sparse Surface Ocean Carbon Data",
  description:
    "A Shapley-based data valuation pipeline for sparse surface ocean carbon prediction, ranking climate and Earth system data sources by their marginal contribution to regional fCO₂ prediction performance.",
  thumbnail: "/images/data-valuation-1.webp",
  images: [
    "/images/data-valuation-1.webp"
  ],
  stack: [
    "Data Valuation",
    "Geospatial ML",
    "Ocean Carbon Modeling",
    "Pandas",
    "NumPy",
    "Joblib",
  ],
  slug: "data-valuation-ocean-carbon",
  content: (
    <div>
      <p>
        This project explores data valuation for sparse surface ocean carbon
        prediction. The ocean surface is vast, but direct surface carbon
        observations cover only a small fraction of the full ocean domain. This
        sparsity creates an important modeling question: when training machine
        learning models with multiple climate and Earth system data sources,
        which sources are actually helping prediction, and which may be weak,
        redundant, or harmful?
      </p>

      <p>
        I developed an end-to-end source-level valuation pipeline that treats
        each data source as a player in a cooperative game. The pipeline builds
        source-labeled training pools, generates fixed regional task sets using
        ocean-region masks, trains models on different source coalitions, and
        evaluates each coalition using negative RMSE on the target task set.
        This makes it possible to measure how much each source contributes to
        regional fCO₂ prediction performance.
      </p>

      <p>
        The core modeling engine uses an XGBoost regressor trained repeatedly on
        coalitions of sources. For each coalition S, the utility function is
        defined as v(S) = -RMSE on a fixed regional evaluation set. Higher
        utility therefore corresponds to lower prediction error. This setup
        allows source contribution to be measured in terms of actual downstream
        predictive value rather than simple data volume.
      </p>

      <p>
        To assign credit fairly, I implemented both exact and approximate
        Shapley valuation. Exact Shapley evaluates all 2ⁿ possible source
        coalitions, while approximate Shapley uses Monte Carlo permutation
        sampling to estimate average marginal contribution more scalably. A
        positive Shapley value indicates that a source improves prediction
        performance, a near-zero value suggests weak or redundant contribution,
        and a negative value indicates that the source may introduce noise,
        mismatch, or poor transfer to the selected target region.
      </p>

      <p>
        The project also includes a full visualization workflow. It generates
        spatial source valuation maps, cumulative contribution curves,
        coalition-size utility diagnostics, source-ranking plots, and
        interpretation figures. These visualizations show that data value is
        not uniformly distributed: a small number of sources can contribute
        strongly to regional prediction, while others may add little value or
        reduce performance.
      </p>

      <p>
        Overall, this project demonstrates how Shapley-based data valuation can
        make geoscientific machine learning pipelines more interpretable and
        selective. Instead of treating all available training data as equally
        useful, the framework provides a principled way to rank, diagnose, and
        visualize which data sources matter most for sparse ocean carbon
        prediction.
      </p>
    </div>
  ),
},
  {
  href: "https://stress-tester-five.vercel.app",
  title: "StressTester: AI-Assisted Financial Stress Testing Engine",
  description:
    "An end-to-end Next.js application that combines deterministic financial simulations with a 4-stage AI pipeline to extract assumptions, generate stress scenarios, compute KPI deltas, and produce mitigation playbooks for enterprise finance teams.",
  thumbnail: "/images/stress-tester-1.png",
  images: [
    "/images/stress-tester-1.png",
    "/images/stress-tester-2.webp",
    "/images/stress-tester-3.webp",
    "/images/stress-tester-4.png",
    "/images/stress-tester-5.png",
  ],
  stack: [
    "Next.js",
    "TypeScript",
    "LLM Pipelines",
    "Financial Modeling",
    "Stress Testing",
    "Deterministic Simulation",
    "Schema Validation",
    "Vercel",
  ],
  slug: "stress-tester",
  content: (
    <div>
      <p>
        StressTester is a financial stress testing platform that lets finance
        teams explore how operating plans, cash flow, and KPIs behave under
        real-world shocks. It replaces brittle spreadsheet-based models with a
        repeatable pipeline that maintains clear lineage from structured inputs
        through shock propagation to outcome dashboards and actionable
        mitigations.
      </p>

      <p>
        The core of the system is a deterministic stress engine that ingests
        structured financial data — P&L, balance sheet, cash flow, and operating
        metrics — and applies shock vectors (revenue declines, cost increases,
        liquidity compression) to propagate KPI deltas across baseline vs.
        stressed trajectories. This engine is the source of truth and is never
        mutated by AI outputs, enforcing a strict separation between
        deterministic calculations and generative workflows.
      </p>

      <p>
        Layered on top is a 4-stage AI pipeline: assumption extraction pulls
        business drivers (pricing, churn, utilization, margin) from uploaded
        operating plans; scenario generation produces risk-aligned stressors
        across market, revenue, cost, and liquidity dimensions; mitigation
        playbooks draft actionable responses tied to specific stress drivers;
        and an executive summary stage produces decision-ready narratives. Each
        AI output is forced through validated schemas before ingestion — invalid
        responses are rejected and re-requested.
      </p>

      <p>
        Safety and governance are first-class concerns. The system prohibits the
        AI from generating &ldquo;recovery&rdquo; scenarios as stress outputs — mitigations        
        are the only approved improvement pathway. Determinism and AI remain
        cleanly separated so that core KPI calculations are always auditable and
        reproducible regardless of whether the AI workflow is enabled.
      </p>

      <p>
        The frontend is built in Next.js with TypeScript and provides
        dashboards for KPI trajectories, scenario timelines, mitigation
        playbooks, and detailed data tables. The project is deployed on Vercel
        and designed with a forward roadmap toward ERP/CRM data connectors,
        industry-specific scenario packs, audit trails for compliance, and
        policy controls for AI workflow governance.
      </p>
    </div>
  ),
},
  {
  href: "", // update if needed
  title: "Agentic NLP-to-SQL: Secure Multi-Agent Analytics Copilot",
  description:
    "A security-first, multi-agent natural language to SQL system with clarification, schema grounding, accounting-aware query generation, and safe execution across SQL backends",
  thumbnail: "/images/nlp2sql-4.webp",
  images: [
    "/images/nlp2sql-4.webp",
  ],
  stack: [
    "LLM Agents",
    "NLP-to-SQL",
    "SQL Validation & Governance",
    "Accounting Analytics",
    "Retrieval / Schema Grounding",
    "Backend APIs",
    "Security Engineering"
  ],
  slug: "nlp2sql-agentic",
  content: (
    <div>
      <p>
        This project is an agentic NLP-to-SQL analytics copilot designed to
        convert natural-language business questions into safe, executable SQL
        while maintaining strict governance over what data can be accessed and
        how queries are formed. Instead of relying on a single prompt-to-SQL
        step, the system uses a multi-agent workflow that explicitly separates
        interpretation, clarification, query synthesis, validation, and
        execution—making it significantly more robust for real-world analytics
        use cases.
      </p>

      <p>
        The pipeline begins with an intent and constraint extraction phase that
        interprets user questions into a structured representation (metrics,
        filters, grouping, time windows, and entity scope). When queries are
        ambiguous (e.g., missing date ranges, unclear grain, conflicting
        filters), a clarification agent triggers targeted follow-up questions
        rather than guessing—improving correctness and preventing silent
        semantic errors in downstream SQL.
      </p>

      <p>
        A SQL generation agent then produces database-compliant SQL using
        schema-grounded mappings (table/column allow-lists and usage rules) to
        avoid hallucinated fields. For financial and operational analytics, an
        accounting-aware agent handles domain semantics such as period logic,
        aggregation rules, and common reporting patterns (e.g., revenue vs.
        expense rollups, variance-style comparisons, and grouping at the correct
        reporting level), enabling reliable “business logic aware” query
        generation.
      </p>

      <p>
        Safety is treated as a first-class requirement. A dedicated validation
        layer enforces read-only constraints, blocks dangerous statements,
        prevents SQL injection patterns, restricts schema exposure, and rejects
        overly broad queries. This ensures the system can be used in
        enterprise-like contexts where compliance, least-privilege access, and
        auditability matter as much as raw query accuracy.
      </p>

      <p>
        The backend is organized as modular APIs that orchestrate the multi-agent
        flow and support execution across multiple SQL backends (e.g., SQL
        Server, SQLite). The design also anticipates production deployment and
        evolution—capturing operational notes (including Kubernetes/AKS-related
        deployment considerations) and a forward path for integrating modern
        agent interoperability standards (e.g., MCP-style migration).
      </p>

      <p>
        Overall, the project demonstrates how agentic decomposition improves
        reliability and governance for NLP-driven analytics: users get a
        conversational interface for querying data, while the system enforces
        guardrails that keep the output correct, safe, and aligned with the
        underlying schema and business rules. Future extensions include richer
        semantic retrieval over data dictionaries, policy-based row-level access
        control, and automated evaluation harnesses for query accuracy and
        security regressions.
      </p>
    </div>
  ),
},
  {
    href: "https://github.com/tanishpatel0106/IEOR4576-Project", // update if needed
  title: "Statistical Arbitrage: Factor-Based Mean Reversion Trading System",
  description:
    "A multi-factor statistical arbitrage framework using PCA-based factor models, residual mean reversion, and systematic trade analytics",
  thumbnail: "/images/SA-4.jpeg",
  images: [
    "/images/SA-1.jpeg",
    "/images/SA-2.jpeg",
    "/images/SA-3.jpeg",
    "/images/SA-4.jpeg",
  ],
  stack: [
    "Quantitative Finance",
    "Statistical Arbitrage",
    "Factor Models",
    "Time Series Analysis",
    "Algorithmic Trading"
  ],
  slug: "stat-arb",
  content: (
    <div>
      <p>
        This project presents the design and implementation of a factor-based
        statistical arbitrage trading framework aimed at exploiting mean
        reversion in equity price dynamics. The system is built around the core
        hypothesis that asset returns can be decomposed into systematic factor
        components and idiosyncratic residuals, with the latter exhibiting
        statistically predictable reversion behavior over time.
      </p>

      <p>
        The methodology begins with the construction of a dynamic factor model
        using Principal Component Analysis (PCA) applied to a cross-section of
        asset returns. These latent factors capture common market and sectoral
        movements, enabling the isolation of residual returns that are
        orthogonal to broad market behavior. Diagnostic analysis is performed to
        evaluate factor stability, variance explained, and residual
        stationarity, ensuring that the extracted signals are economically and
        statistically meaningful.
      </p>

      <p>
        Trading signals are generated by modeling the residual processes as
        mean-reverting stochastic systems, with z-score normalization used to
        quantify deviations from equilibrium. Positions are entered when
        residuals exceed predefined statistical thresholds and exited as they
        revert toward their long-run mean. This approach allows for systematic,
        market-neutral trade construction while explicitly controlling exposure
        to common risk factors.
      </p>

      <p>
        A comprehensive trade analytics module evaluates performance at both the
        trade and portfolio levels. Metrics such as cumulative returns, hit
        ratios, holding period distributions, drawdowns, and risk-adjusted
        performance are analyzed to assess the robustness of the strategy across
        different market conditions. The framework also enables detailed
        inspection of individual trades, providing transparency into signal
        behavior and execution outcomes.
      </p>

      <p>
        The strategy is implemented in a modular research pipeline, separating
        factor diagnostics, signal generation, and trade evaluation. This design
        facilitates rapid experimentation with alternative factor definitions,
        reversion thresholds, and universe selections, while maintaining a clean
        and extensible codebase suitable for further research or production
        deployment.
      </p>

      <p>
        The project demonstrates that factor-neutral statistical arbitrage can
        produce consistent mean-reversion signals when supported by rigorous
        diagnostics and disciplined trade analytics. Future extensions include
        dynamic factor re-estimation, transaction cost modeling, intraday signal
        refinement, and portfolio-level optimization across multiple statistical
        arbitrage strategies.
      </p>
    </div>
  ),
  },
  {
    href: "https://github.com/tanishpatel0106/IEOR4571-FX-Cross",
    title: "FX-Cross: Machine Learning–Driven Trading Signal Generation",
    description:
      "Probabilistic FX trading strategies using time series smoothing, machine learning, and deep learning models",
    thumbnail: "/images/fx2.jpeg",
    images: [
      "/images/fx1.jpeg",
      "/images/fx2.jpeg",
      "/images/fx3.jpeg",
      "/images/fx4.jpeg",
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
      "/images/paperchaseai2.webp",
      // "/images/paperchaseai3.webp"
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
    thumbnail: "/images/diagram_minor.webp",
    images: [
      "/images/diagram_minor.webp",
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
      "Time Series Forecasting with Exogenous Variables for Restaurants Globally",
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
    thumbnail: "/images/WhatsApp-Image-2024-06-16-at-06.54.51.jpeg",
    images: [
      "/images/WhatsApp-Image-2024-06-16-at-06.54.51.jpeg",
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
      "/images/illust_2.webp",
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
    thumbnail: "/images/image-1.png",
    images: [
      "/images/image-1.png",
      "/images/image.png",
      "/images/plot1.png",
      "/images/WhatsApp-Image-2023-11-09-at-00.42.51_d3d6b530.jpg",
      "/images/WhatsApp-Image-2023-11-09-at-00.44.40_07aa976d.jpg",
    ],
    stack: ["HTML/CSS", "Django", "Scikit-Learn", "Streamlit"],
    slug: "prognosisappointment",
    category: "ml",
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
    thumbnail: "/images/Setup.webp",
    images: [
      "/images/Setup.webp"
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
    thumbnail: "/images/SOC_1.webp",
    images: [
      "/images/SOC_1.webp",
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
