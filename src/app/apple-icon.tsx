import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Same mark as icon.svg, rendered as PNG for iOS home screens. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1b1a1f", position: "relative" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M9 18h20v5L16 39h13v5H9v-5l13-16H9z" fill="#f8f7f3" />
          <path d="M33 18h5.5v10.2L47 18h6.5L44.6 28.6 54 44h-6.4l-6.8-11.3-2.3 2.6V44H33z" fill="#f8f7f3" />
          <rect x="51" y="8" width="5" height="5" fill="#ff4d00" />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 25,
            top: 141,
            width: 127,
            height: 8,
            borderRadius: 4,
            background: "linear-gradient(90deg,#ff4d00,#e7eb4c 31%,#0b90cb 68%,#0c59c1)",
          }}
        />
      </div>
    ),
    size,
  );
}
