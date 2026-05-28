import React from "react";

const CHART_WIDTH = 720;
const CHART_HEIGHT = 200;
const PADDING = { top: 18, right: 20, bottom: 28, left: 48 };

const series = [
  { date: "2024-07-01", count: 4 },
  { date: "2024-07-02", count: 0 },
  { date: "2024-07-03", count: 2 },
  { date: "2024-07-04", count: 1 },
  { date: "2024-07-05", count: 0 },
  { date: "2024-07-06", count: 3 },
  { date: "2024-07-07", count: 0 },
  { date: "2024-07-08", count: 5 },
  { date: "2024-07-09", count: 2 },
  { date: "2024-07-10", count: 0 },
  { date: "2024-07-11", count: 1 },
  { date: "2024-07-12", count: 0 },
  { date: "2024-07-13", count: 4 },
  { date: "2024-07-14", count: 2 },
  { date: "2024-07-15", count: 0 },
  { date: "2024-07-16", count: 3 },
  { date: "2024-07-17", count: 1 },
  { date: "2024-07-18", count: 0 },
  { date: "2024-07-19", count: 2 },
  { date: "2024-07-20", count: 0 },
  { date: "2024-07-21", count: 6 },
  { date: "2024-07-22", count: 2 },
  { date: "2024-07-23", count: 0 },
  { date: "2024-07-24", count: 1 },
  { date: "2024-07-25", count: 0 },
  { date: "2024-07-26", count: 3 },
  { date: "2024-07-27", count: 2 },
  { date: "2024-07-28", count: 0 },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));

const buildCumulative = (values: typeof series) => {
  let runningTotal = 0;
  return values.map((entry) => {
    runningTotal += entry.count;
    return { ...entry, cumulative: runningTotal };
  });
};

const buildStepAreaPath = (
  values: { x: number; y: number }[],
  baseline: number
) => {
  if (values.length === 0) return "";
  const [first, ...rest] = values;
  let path = `M ${first.x} ${baseline} L ${first.x} ${first.y}`;
  rest.forEach((point, index) => {
    const previous = values[index];
    path += ` L ${point.x} ${previous.y} L ${point.x} ${point.y}`;
  });
  path += ` L ${values[values.length - 1].x} ${baseline} Z`;
  return path;
};

const buildStepLinePath = (values: { x: number; y: number }[]) => {
  if (values.length === 0) return "";
  const [first, ...rest] = values;
  let path = `M ${first.x} ${first.y}`;
  rest.forEach((point, index) => {
    const previous = values[index];
    path += ` L ${point.x} ${previous.y} L ${point.x} ${point.y}`;
  });
  return path;
};

const createYAxisTicks = (maxValue: number) => {
  const safeMax = Math.max(maxValue, 1);
  return [0, Math.round(safeMax / 2), safeMax];
};

export const ApplicationsTimeseriesChart = () => {
  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const labelStep = Math.max(1, Math.ceil(series.length / 6));
  const cumulativeSeries = buildCumulative(series);
  const maxDaily = Math.max(...series.map((entry) => entry.count), 1);
  const maxCumulative = Math.max(
    ...cumulativeSeries.map((entry) => entry.cumulative),
    1
  );

  const xStep = innerWidth / series.length;
  const barWidth = xStep * 0.7;
  const barOffset = (xStep - barWidth) / 2;

  const yForValue = (value: number, maxValue: number) =>
    PADDING.top + innerHeight - (value / maxValue) * innerHeight;

  const dailyTicks = createYAxisTicks(maxDaily);
  const cumulativeTicks = createYAxisTicks(maxCumulative);

  const cumulativePoints = cumulativeSeries.map((entry, index) => ({
    x: PADDING.left + index * xStep + xStep / 2,
    y: yForValue(entry.cumulative, maxCumulative),
  }));

  const cumulativePath = buildStepAreaPath(
    cumulativePoints,
    PADDING.top + innerHeight
  );
  const cumulativeLinePath = buildStepLinePath(cumulativePoints);

  return (
    <section className="w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-neutral-500">Applications</p>
        <h2 className="text-lg font-semibold text-neutral-900">
          Activity over time
        </h2>
      </header>

      <div className="mt-6 flex flex-col gap-8">
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/40 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-700">
              Daily applications
            </p>
            <span className="text-xs text-neutral-500">Counts per day</span>
          </div>
          <svg
            role="img"
            aria-label="Daily application counts"
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="mt-4 h-52 w-full"
          >
            {dailyTicks.map((tick) => {
              const y = yForValue(tick, maxDaily);
              return (
                <g key={`daily-grid-${tick}`}>
                  <line
                    x1={PADDING.left}
                    x2={CHART_WIDTH - PADDING.right}
                    y1={y}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={PADDING.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-neutral-400 text-[11px]"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}
            {series.map((entry, index) => {
              const barHeight = (entry.count / maxDaily) * innerHeight;
              const x = PADDING.left + index * xStep + barOffset;
              const y = PADDING.top + innerHeight - barHeight;
              return (
                <rect
                  key={`daily-bar-${entry.date}`}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={3}
                  className="fill-slate-500"
                />
              );
            })}
          </svg>
        </div>

        <div className="rounded-xl border border-neutral-100 bg-neutral-50/40 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-700">
              Cumulative applications
            </p>
            <span className="text-xs text-neutral-500">Total to date</span>
          </div>
          <svg
            role="img"
            aria-label="Cumulative applications"
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="mt-4 h-56 w-full"
          >
            {cumulativeTicks.map((tick) => {
              const y = yForValue(tick, maxCumulative);
              return (
                <g key={`cumulative-grid-${tick}`}>
                  <line
                    x1={PADDING.left}
                    x2={CHART_WIDTH - PADDING.right}
                    y1={y}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={PADDING.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-neutral-400 text-[11px]"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}
            <path d={cumulativePath} fill="rgba(100, 116, 139, 0.16)" />
            <path
              d={cumulativeLinePath}
              fill="none"
              stroke="#64748B"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="square"
            />
            {series.map((entry, index) => {
              if (index % labelStep !== 0 && index !== series.length - 1) {
                return null;
              }
              const x = PADDING.left + index * xStep + xStep / 2;
              return (
                <text
                  key={`x-label-${entry.date}`}
                  x={x}
                  y={CHART_HEIGHT - 6}
                  textAnchor="middle"
                  className="fill-neutral-400 text-[11px]"
                >
                  {formatDate(entry.date)}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};
