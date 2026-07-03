import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Websites & Software That Grow Businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101413",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#9BA3A1", letterSpacing: 6, fontSize: 22 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5 }}>
            {[18, 40, 26, 52, 30].map((h, i) => (
              <div key={i} style={{ width: 6, height: h, background: "#FFDE38", borderRadius: 4 }} />
            ))}
          </div>
          THE ECHOZ LAB
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "#ffffff", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Websites & software that grow businesses.
          </div>
          <div style={{ color: "#9BA3A1", fontSize: 30 }}>
            Web • E-commerce • SaaS • AI · South-West Sydney
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
