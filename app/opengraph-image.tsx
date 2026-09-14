import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 30%, #dcc9b0 0%, #f5f4ed 45%, #e9e6da 100%)",
          fontFamily: "serif",
          color: "#57341e",
          padding: 64,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            letterSpacing: 8,
            textTransform: "uppercase",
            fontSize: 22,
            color: "#a1795a",
          }}
        >
          You are invited to the wedding of
        </div>
        <div style={{ display: "flex", fontSize: 108, marginTop: 24, fontStyle: "italic" }}>
          {site.couple.groom}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            color: "#e8877a",
            fontStyle: "italic",
            marginTop: -12,
          }}
        >
          &amp;
        </div>
        <div style={{ display: "flex", fontSize: 108, fontStyle: "italic", marginTop: -12 }}>
          {site.couple.bride}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontSize: 20,
            color: "#6f7a58",
          }}
        >
          {site.events.map((e) => `${e.name} · ${e.weekday}, ${e.monthShort} ${e.day} · ${e.venue.name}`).join("     ")}
        </div>
      </div>
    ),
    { ...size },
  );
}
