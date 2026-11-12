import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared share-image layout: label, big title, optional summary, site footer. */
export function ogImage({
  label,
  title,
  summary,
}: {
  label: string;
  title: string;
  summary?: string;
}) {
  const size = title.length > 70 ? 54 : title.length > 40 ? 64 : 80;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0d",
          color: "#f5f5f6",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: 4, color: "#b7f34a" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#b7f34a" }} />
          {label.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: size, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2 }}>
            {title}
          </div>
          {summary && (
            <div style={{ fontSize: 28, lineHeight: 1.4, color: "#a3a3ad", maxWidth: 980 }}>
              {summary.length > 150 ? `${summary.slice(0, 147)}…` : summary}
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a3a3ad" }}>
          <div style={{ display: "flex", color: "#f5f5f6", fontWeight: 600 }}>{SITE.name}</div>
          <div style={{ display: "flex" }}>{SITE.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
