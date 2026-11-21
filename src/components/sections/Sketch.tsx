"use client";

import { useMemo, useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionLabel } from "../ui/SectionLabel";

/**
 * A single pencil line that draws itself on scroll (after moisez.com):
 * a scribbled signature, a wireframe, a React component, a phone in someone's hand.
 * Geometry is authored as clean shapes and given a seeded hand wobble at render time.
 */

type Pt = [number, number];
const BASE = 480;

// ---------- shape helpers ----------
const line = (a: Pt, b: Pt): Pt[] => [a, b];
const rect = (x: number, y: number, w: number, h: number): Pt[] => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
function ellipse(cx: number, cy: number, rx: number, ry: number, rot = 0, start = Math.PI / 2, n = 72): Pt[] {
  const r = (rot * Math.PI) / 180;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = start + (i / n) * Math.PI * 2;
    const x = rx * Math.cos(t);
    const y = ry * Math.sin(t);
    return [cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r)] as Pt;
  });
}
function sine(x0: number, x1: number, y: number, amp: number, periods: number): Pt[] {
  const n = 60;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return [x0 + (x1 - x0) * t, y + Math.sin(t * periods * Math.PI * 2) * amp * Math.sin(t * Math.PI)] as Pt;
  });
}
function roundRect(x: number, y: number, w: number, h: number, r: number, rot: number, cx: number, cy: number, startCorner = 3): Pt[] {
  // Corners clockwise from top-left; start at bottom-left (3) so the line can enter there
  const corners: [number, number, number][] = [
    [x + r, y + r, Math.PI],
    [x + w - r, y + r, -Math.PI / 2],
    [x + w - r, y + h - r, 0],
    [x + r, y + h - r, Math.PI / 2],
  ];
  const pts: Pt[] = [];
  for (let k = 0; k <= 4; k++) {
    const [ax, ay, a0] = corners[(startCorner + k) % 4];
    const steps = k === 4 ? 1 : 8;
    for (let i = 0; i <= steps; i++) {
      const t = a0 + (i / 8) * (Math.PI / 2);
      pts.push([ax + r * Math.cos(t), ay + r * Math.sin(t)]);
    }
  }
  const a = (rot * Math.PI) / 180;
  return pts.map(([px, py]) => [cx + (px - cx) * Math.cos(a) - (py - cy) * Math.sin(a), cy + (px - cx) * Math.sin(a) + (py - cy) * Math.cos(a)]);
}
const rotate = (p: Pt, rot: number, c: Pt): Pt => {
  const a = (rot * Math.PI) / 180;
  return [c[0] + (p[0] - c[0]) * Math.cos(a) - (p[1] - c[1]) * Math.sin(a), c[1] + (p[0] - c[0]) * Math.sin(a) + (p[1] - c[1]) * Math.cos(a)];
};

/** Resample a polyline, push it off-true with smooth seeded noise, and return a Catmull-Rom path. */
function hand(pts: Pt[], seed: number, maxAmp = 1.6, step = 10): string {
  // Small shapes get a gentler wobble so tiny circles stay round
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  const amp = Math.min(maxAmp, span * 0.03);
  if (span < 40) step = 3;
  const res: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[i + 1];
    const len = Math.hypot(bx - ax, by - ay);
    const n = Math.max(1, Math.round(len / step));
    for (let k = 0; k < n; k++) res.push([ax + ((bx - ax) * k) / n, ay + ((by - ay) * k) / n]);
  }
  res.push(pts[pts.length - 1]);
  const j = res.map(([x, y], i) => {
    const t = i + seed * 13.7;
    const nx = Math.sin(t * 0.21) * amp + Math.sin(t * 0.07 + seed) * amp * 0.9;
    const ny = Math.cos(t * 0.17 + seed * 2) * amp + Math.sin(t * 0.05) * amp * 0.9;
    return [x + nx, y + ny] as Pt;
  });
  let d = `M${j[0][0].toFixed(1)} ${j[0][1].toFixed(1)}`;
  for (let i = 0; i < j.length - 1; i++) {
    const p0 = j[Math.max(0, i - 1)];
    const p1 = j[i];
    const p2 = j[i + 1];
    const p3 = j[Math.min(j.length - 1, i + 2)];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

// ---------- the drawings, in pen order ----------
type Layout = {
  viewBox: [number, number];
  strokes: Pt[][];
  screen: Pt[];
  labels: { x: number; y: number; text: string }[];
  strokeWidth: number;
  labelSize: number;
};

const LABEL_TEXT = ["A sketch on the canvas", "A component in React", "A screen in someone's hand"];

/** Wide version: the line runs left to right along a baseline. */
function horizontal(): Layout {
  const C: Pt = [1405, 282];
  const R = 8;
  const strokes: Pt[][] = [];
  strokes.push([
    [40, 392], [82, 388], [46, 440], [88, 436],
    [98, 368], [101, 446], [102, 418], [130, 392], [108, 414], [136, 446],
    [158, 472], [190, BASE], [240, BASE],
    [240, 110], [562, 108], [562, BASE],
  ]);
  strokes.push(line([240, 160], [562, 160]));
  strokes.push(ellipse(264, 135, 6, 6), ellipse(286, 135, 6, 6), ellipse(308, 135, 6, 6));
  strokes.push(sine(272, 480, 212, 9, 4));
  strokes.push(line([272, 252], [528, 252]), line([272, 278], [470, 278]));
  strokes.push([...rect(272, 310, 132, 122), [404, 432], [272, 310]]);
  strokes.push(roundRect(424, 398, 106, 34, 17, 0, 477, 415, 3));
  strokes.push([[562, BASE], [700, BASE + 2], [862, BASE], [860, 352], ...ellipse(860, 300, 150, 52, 0, Math.PI / 2)]);
  strokes.push(ellipse(860, 300, 150, 52, 60));
  strokes.push(ellipse(860, 300, 150, 52, -60));
  strokes.push(ellipse(860, 300, 15, 15));
  strokes.push([[860, 352], [862, BASE], [1050, BASE + 1], [1255, BASE], rotate([1310, 440], R, C)]);
  strokes.push(roundRect(1310, 117, 190, 330, 26, R, ...C, 3));
  strokes.push(([[1330, 150], [1480, 150], [1480, 395], [1330, 395], [1330, 150]] as Pt[]).map((p) => rotate(p, R, C)));
  strokes.push(line(rotate([1375, 420], R, C), rotate([1435, 420], R, C)));
  return {
    viewBox: [1600, 560],
    strokes,
    screen: ([[1330, 150], [1480, 150], [1480, 395], [1330, 395]] as Pt[]).map((p) => rotate(p, R, C)),
    labels: [400, 860, 1405].map((x, i) => ({ x, y: BASE + 50, text: LABEL_TEXT[i] })),
    strokeWidth: 2.4,
    labelSize: 15,
  };
}

/** Tall version for phones: the line drops down the page through each stop. */
function vertical(): Layout {
  const C: Pt = [300, 1200];
  const R = 8;
  const strokes: Pt[][] = [];
  // "zk", then down into the wireframe and around its frame
  strokes.push([
    [70, 52], [118, 48], [74, 108], [122, 104],
    [138, 30], [141, 112], [142, 80], [176, 52], [150, 76], [182, 112],
    [230, 140], [300, 150], [300, 200],
    [480, 200], [480, 520], [120, 520], [120, 200], [300, 200],
  ]);
  strokes.push(line([120, 245], [480, 245]));
  strokes.push(ellipse(144, 222, 7, 7), ellipse(166, 222, 7, 7), ellipse(188, 222, 7, 7));
  strokes.push(sine(146, 400, 293, 10, 4));
  strokes.push(line([146, 335], [452, 335]), line([146, 362], [388, 362]));
  strokes.push([...rect(146, 392, 130, 104), [276, 496], [146, 392]]);
  strokes.push(roundRect(302, 458, 150, 38, 19, 0, 377, 477, 3));
  // out of the frame, down the right edge, into the atom
  strokes.push([[480, 500], [545, 502], [548, 640], [546, 780], [450, 780], ...ellipse(300, 780, 150, 52, 0, 0)]);
  strokes.push(ellipse(300, 780, 150, 52, 60));
  strokes.push(ellipse(300, 780, 150, 52, -60));
  strokes.push(ellipse(300, 780, 15, 15));
  // back to the edge and down into the phone
  strokes.push([[450, 780], [546, 782], [548, 1000], [545, 1330], rotate([392, 1345], R, C)]);
  strokes.push(roundRect(205, 1035, 190, 330, 26, R, ...C, 2));
  strokes.push(([[225, 1068], [375, 1068], [375, 1313], [225, 1313], [225, 1068]] as Pt[]).map((p) => rotate(p, R, C)));
  strokes.push(line(rotate([270, 1338], R, C), rotate([330, 1338], R, C)));
  return {
    viewBox: [600, 1470],
    strokes,
    screen: ([[225, 1068], [375, 1068], [375, 1313], [225, 1313]] as Pt[]).map((p) => rotate(p, R, C)),
    labels: [
      { x: 300, y: 572, text: LABEL_TEXT[0] },
      { x: 300, y: 955, text: LABEL_TEXT[1] },
      { x: 300, y: 1440, text: LABEL_TEXT[2] },
    ],
    strokeWidth: 3.4,
    labelSize: 21,
  };
}

function Art({ layout, className, label }: { layout: Layout; className: string; label: string }) {
  const paths = useMemo(() => layout.strokes.map((s, i) => hand(s, i + 1)), [layout]);
  const [w, h] = layout.viewBox;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-label={label}>
      <polygon className="sketch-screen" points={layout.screen.map((p) => p.join(",")).join(" ")} fill="var(--color-signal)" />
      <g fill="none" stroke="#2b2b2b" strokeWidth={layout.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {paths.map((d, i) => (
          <path key={i} className="sketch-stroke" d={d} />
        ))}
      </g>
      <circle className="sketch-pen" r={layout.strokeWidth * 2.9} cx="0" cy="0" fill="var(--color-signal)" opacity="0" />
      {layout.labels.map((l) => (
        <text
          key={l.text}
          className="sketch-label"
          x={l.x}
          y={l.y}
          textAnchor="middle"
          fill="#6b6b6b"
          style={{ font: `500 ${layout.labelSize}px var(--font-mono)`, letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          {l.text}
        </text>
      ))}
    </svg>
  );
}

const WIDE = horizontal();
const TALL = vertical();
const ARIA = "A hand-drawn line sketches a web page wireframe, loops into the React logo, and ends as an app screen on a phone.";

export function Sketch() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { wide: `${MOTION_OK} and (min-width: 768px)`, tall: `${MOTION_OK} and (max-width: 767px)` },
        (ctx) => {
          const { wide } = ctx.conditions as { wide: boolean; tall: boolean };
          const svg = ref.current!.querySelector<SVGSVGElement>(wide ? ".sketch-wide" : ".sketch-tall")!;
          const strokes = [...svg.querySelectorAll<SVGPathElement>(".sketch-stroke")];
          const pen = svg.querySelector<SVGCircleElement>(".sketch-pen")!;
          const labels = svg.querySelectorAll(".sketch-label");
          const screen = svg.querySelector(".sketch-screen");
          const lengths = strokes.map((st) => st.getTotalLength());
          const total = lengths.reduce((x, y) => x + y, 0);

          // Undrawn strokes stay hidden, or their round caps show up as stray dots
          gsap.set(strokes, { strokeDasharray: (i: number) => lengths[i], strokeDashoffset: (i: number) => lengths[i], visibility: "hidden" });
          gsap.set([screen, ...labels], { opacity: 0 });
          gsap.set(pen, { opacity: 1 });

          const tl = gsap.timeline({ defaults: { ease: "none" } });
          strokes.forEach((st, i) => {
            const state = { p: 0 };
            tl.to(state, {
              p: 1,
              duration: lengths[i] / total,
              onUpdate: () => {
                st.style.strokeDashoffset = String(lengths[i] * (1 - state.p));
                st.style.visibility = state.p > 0 ? "visible" : "hidden";
                const pt = st.getPointAtLength(lengths[i] * state.p);
                pen.setAttribute("cx", String(pt.x));
                pen.setAttribute("cy", String(pt.y));
              },
            });
          });
          // Labels appear as the pen reaches each stop, the screen lights up at the end
          tl.to(labels, { opacity: 1, duration: 0.03, stagger: 0.3 }, 0.22)
            .to(screen, { opacity: 1, duration: 0.06 }, ">-0.02")
            .to(pen, { opacity: 0, duration: 0.03 });

          if (wide) {
            // Hold the whole drawing in view, centred below the header, until the screen lights up
            gsap.timeline({
              scrollTrigger: { trigger: svg, start: "center 55%", end: "+=2200", pin: svg, scrub: 1, invalidateOnRefresh: true },
            }).add(tl);
          } else {
            // Phones: the tall drawing follows the scroll, so the pen stays near the same spot on screen
            gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 62%", end: "bottom 62%", scrub: 1 } }).add(tl);
          }
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="process" aria-labelledby="process-heading" className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[64rem] px-4 md:px-0">
        <SectionLabel id="process-heading">How I work</SectionLabel>
        <p className="mt-10 max-w-[48rem] text-[2rem] leading-[1.05] tracking-[-0.03em] md:mt-14 md:text-[3.5rem]">
          From the first sketch to the last line of React, I enjoy every part of making an interface.
        </p>
        <p className="mt-6 max-w-[38rem] text-lg leading-[1.45] text-grey-400">
          Design and code aren&apos;t two separate jobs for me. I think in layouts and in components at the same time, so
          what ships feels the way it was drawn: accessible, animated, and easy to use.
        </p>
      </div>

      <div className="mt-12 px-4 md:mt-16 md:px-8">
        <Art layout={WIDE} label={ARIA} className="sketch-wide mx-auto hidden h-auto w-full max-w-[90rem] md:block" />
        <Art layout={TALL} label={ARIA} className="sketch-tall mx-auto block h-auto w-full max-w-[26rem] md:hidden" />
      </div>
    </section>
  );
}
