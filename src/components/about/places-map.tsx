"use client";

import DottedMap from "dotted-map";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { usePreferences } from "@/components/site/providers";
import { PLACES } from "@/constants/site";
import { cn } from "@/lib/utils";

// Built once: the dotted world and the numbers needed to place a point on it.
const map = new DottedMap({ height: 100, grid: "diagonal" });
const { width: W, height: H, region } = map.image;
const mercator = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const Y_TOP = mercator(region.lat.max);
const Y_SPAN = Y_TOP - mercator(region.lat.min);

/**
 * Latitude/longitude to map coordinates, using the same Mercator projection
 * and bounds the dotted map is drawn with, so markers land where they should.
 */
const project = (lat: number, lng: number) => ({
  x: ((lng - region.lng.min) / (region.lng.max - region.lng.min)) * W,
  y: ((Y_TOP - mercator(lat)) / Y_SPAN) * H,
});

const POINTS = PLACES.map((place) => ({ ...place, ...project(place.lat, place.lng) }));

const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const distance = Math.hypot(b.x - a.x, b.y - a.y);
  // Lift in proportion to length so short hops stay shallow.
  const lift = Math.min(14, distance * 0.35);
  return `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - lift} ${b.x} ${b.y}`;
};

// Every pair of places gets a line. Places that sit almost on top of each
// other (Ahmedabad/Gandhinagar, New York/Old Greenwich) share one set of
// lines, otherwise the same arc would be drawn twice.
const NODES = POINTS.filter(
  (place, i) => !POINTS.slice(0, i).some((earlier) => Math.hypot(earlier.x - place.x, earlier.y - place.y) < 1.5)
);
const WEB = NODES.flatMap((a, i) => NODES.slice(i + 1).map((b) => ({ key: `${a.label}-${b.label}`, d: arc(a, b) })));

type Hop = { id: number; from: number; to: number };
const HOP_MS = 1900;
const TRAIL = [1, 0.4, 0.15];

/**
 * World map (after Aceternity's World Map): a web of lines between all the
 * places, with a brighter arc that hops between them at random. The places
 * are not a route, so there is no order and no numbering.
 */
export function PlacesMap() {
  const { motion: motionPref } = usePreferences();
  const [hops, setHops] = useState<Hop[]>([]);

  // A neutral grey that reads on both the light and the dark card.
  const svgMap = useMemo(
    () => map.getSVG({ radius: 0.22, color: "#8a8a9470", shape: "circle", backgroundColor: "transparent" }),
    []
  );

  useEffect(() => {
    if (motionPref === "reduced" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let id = 0;
    let at = Math.floor(Math.random() * POINTS.length);
    const hop = () => {
      // Pick any other place; skip neighbours too close to draw an arc between.
      let to = at;
      for (let tries = 0; tries < 12; tries++) {
        const candidate = Math.floor(Math.random() * POINTS.length);
        const far = Math.hypot(POINTS[candidate].x - POINTS[at].x, POINTS[candidate].y - POINTS[at].y) > 2;
        if (candidate !== at && far) {
          to = candidate;
          break;
        }
      }
      if (to === at) return;
      const next = { id: id++, from: at, to };
      at = to;
      setHops((prev) => [next, ...prev].slice(0, TRAIL.length));
    };
    const first = window.setTimeout(hop, 400);
    const timer = window.setInterval(hop, HOP_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [motionPref]);

  const active = hops[0]?.to;
  const described = POINTS.filter((p) => p.description);
  const others = POINTS.filter((p) => !p.description);

  return (
    <div>
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data URI */}
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          alt=""
          className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_8%,white_92%,transparent)]"
          draggable={false}
        />
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`World map marking ${PLACES.map((p) => p.label).join(", ")}`}
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
        >
          {/* The standing web: every place linked to every other. */}
          {WEB.map((line, i) => (
            <motion.path
              key={line.key}
              d={line.d}
              fill="none"
              stroke="var(--brand)"
              strokeWidth={0.2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.38 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.07, ease: "easeOut" }}
            />
          ))}

          {/* The hop: one brighter arc travelling between random places. */}
          <AnimatePresence>
            {hops.map((hop, age) => (
              <motion.path
                key={hop.id}
                d={arc(POINTS[hop.from], POINTS[hop.to])}
                fill="none"
                stroke="var(--brand)"
                strokeWidth={0.42}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: TRAIL[age] }}
                exit={{ opacity: 0 }}
                transition={{ pathLength: { duration: 1.1, ease: "easeOut" }, opacity: { duration: 0.6 } }}
              />
            ))}
          </AnimatePresence>

          {POINTS.map((place, i) => (
            <g key={place.label}>
              {active === i && (
                <circle cx={place.x} cy={place.y} r={0.6} fill="var(--brand)" opacity={0.5}>
                  <animate attributeName="r" from="0.6" to="2.6" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={place.x} cy={place.y} r={0.6} fill="var(--brand)" />
              <text
                x={place.x + (place.dx ?? 1.4)}
                y={place.y + (place.dy ?? 0)}
                textAnchor={place.anchor ?? "start"}
                dominantBaseline="middle"
                fontSize={1.9}
                fontWeight={active === i ? 600 : 500}
                paintOrder="stroke"
                stroke="var(--card)"
                strokeWidth={0.7}
                strokeLinejoin="round"
                className={cn(
                  "hidden transition-[fill] duration-300 md:block",
                  active === i ? "fill-brand" : "fill-foreground"
                )}
              >
                {place.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <ul className="grid gap-3 px-2 pb-2 pt-2 sm:grid-cols-2 lg:grid-cols-5">
        {described.map((place) => {
          const isActive = POINTS[active ?? -1]?.label === place.label;
          return (
            <li
              key={place.label}
              className={cn(
                "rounded-xl border bg-background p-4 transition-colors duration-300",
                isActive && "border-brand/70"
              )}
            >
              <p className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                    isActive ? "bg-brand" : "bg-muted-foreground/40"
                  )}
                />
                {place.label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{place.description}</p>
            </li>
          );
        })}
      </ul>
      {others.length > 0 && (
        <p className="px-3 pb-2 pt-1 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Also {others.map((p) => p.label).join(" · ")}
        </p>
      )}
    </div>
  );
}
