import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, ${profile.role}`;
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
          padding: 72,
          background: "#f8f7f3",
          color: "#000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 4, borderRadius: 4, background: "linear-gradient(90deg,#ff4d00,#e7eb4c 31%,#0b90cb 68%,#0c59c1)" }} />
          <div style={{ fontSize: 28, letterSpacing: 3, textTransform: "uppercase" }}>Portfolio</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, letterSpacing: -5, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 48, color: "#474747", marginTop: 20 }}>{`${profile.role} · React, Next.js, GSAP`}</div>
        </div>
        <div style={{ fontSize: 28, color: "#6b6b6b" }}>{`${profile.location}, ${profile.country}`}</div>
      </div>
    ),
    size,
  );
}
