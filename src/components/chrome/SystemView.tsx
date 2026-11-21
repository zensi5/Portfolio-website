"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Ruler } from "lucide-react";

type View = "design" | "system";

const INSPECTABLE = "h1, h2, h3, h4, p, a, button, li, dt, dd, label, img, video, input, textarea";
const MEDIA = new Set(["IMG", "VIDEO", "INPUT", "TEXTAREA", "CANVAS"]);

function fontName(family: string) {
  return /mono/i.test(family) ? "Roboto Mono" : "BDO Grotesk";
}

/** Which grid columns (1-based) an element spans, read from the live grid overlay. */
function columnSpan(rect: DOMRect) {
  const cols = [...document.querySelectorAll<HTMLElement>(".page-grid__col")].map((c) => c.getBoundingClientRect());
  if (!cols.length) return "";
  let a = cols.findIndex((c) => c.right > rect.left + 1);
  let b = cols.length - 1 - [...cols].reverse().findIndex((c) => c.left < rect.right - 1);
  a = Math.max(0, a);
  b = Math.max(a, b);
  return a === b ? `C${a + 1}` : `C${a + 1}–C${b + 1}`;
}

/** The nearest following element below, for the spacing readout. */
function gapBelow(el: Element, rect: DOMRect) {
  let node: Element | null = el;
  while (node && node !== document.body) {
    let sib = node.nextElementSibling;
    while (sib) {
      const r = sib.getBoundingClientRect();
      if (r.height > 0 && r.top >= rect.bottom - 1) return Math.round(r.top - rect.bottom);
      sib = sib.nextElementSibling;
    }
    node = node.parentElement;
  }
  return null;
}

/**
 * Design / System switch (after moisez.com). In System view the column grid turns signal
 * orange, columns are numbered, and hovering anything reveals its type spec, size and spacing.
 */
export function SystemView() {
  const [view, setView] = useState<View>("design");
  const [enabled, setEnabled] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLSpanElement>(null);
  const w = useRef<HTMLSpanElement>(null);
  const h = useRef<HTMLSpanElement>(null);
  const gap = useRef<HTMLDivElement>(null);
  const gapLabel = useRef<HTMLSpanElement>(null);
  const current = useRef<Element | null>(null);

  // Restore the saved view; the switch is only offered where a pointer can hover
  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches);
    if (document.documentElement.dataset.view === "system") setView("system");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (view === "system") root.dataset.view = "system";
    else delete root.dataset.view;
    try {
      localStorage.setItem("view", view);
    } catch {}
  }, [view]);

  // "S" toggles, as on the reference site
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "s" || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as Element).closest("input, textarea, select, [contenteditable]")) return;
      setView((v) => (v === "system" ? "design" : "system"));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [enabled]);

  // Inspector
  useEffect(() => {
    if (!enabled || view !== "system") {
      if (box.current) box.current.style.opacity = "0";
      current.current = null;
      return;
    }

    const draw = () => {
      const el = current.current;
      const b = box.current;
      if (!el || !b) return;
      const rect = el.getBoundingClientRect();
      b.style.opacity = "1";
      b.style.left = `${rect.left}px`;
      b.style.top = `${rect.top}px`;
      b.style.width = `${rect.width}px`;
      b.style.height = `${rect.height}px`;

      const cols = columnSpan(rect);
      const W = Math.round(rect.width);
      const H = Math.round(rect.height);
      if (MEDIA.has(el.tagName) || !el.textContent?.trim()) {
        tag.current!.textContent = `${el.tagName.toLowerCase()} / W ${W} × H ${H} px / ${cols}`;
      } else {
        const cs = getComputedStyle(el);
        const size = parseFloat(cs.fontSize);
        const lh = cs.lineHeight === "normal" ? 1.2 : parseFloat(cs.lineHeight) / size;
        const tr = cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing) / size;
        tag.current!.textContent = `${fontName(cs.fontFamily)} / ${Math.round(size)}px / LH ${lh.toFixed(2)} / TR ${tr.toFixed(3)}em / ${cs.fontWeight} / ${cols}`;
      }
      w.current!.textContent = `${W}`;
      h.current!.textContent = `${H}`;

      const g = gapBelow(el, rect);
      if (g !== null && g > 2 && g < 400) {
        gap.current!.style.display = "block";
        gap.current!.style.height = `${g}px`;
        gapLabel.current!.textContent = `${g}px of space`;
      } else gap.current!.style.display = "none";
    };

    const onMove = (e: PointerEvent) => {
      const t = (e.target as Element).closest(INSPECTABLE);
      if (!t || t.closest(".sys-ui")) return;
      const r = t.getBoundingClientRect();
      if (r.width > window.innerWidth * 0.95 && r.height > window.innerHeight * 0.8) return;
      if (t !== current.current) {
        current.current = t;
        draw();
      }
    };
    const onScroll = () => draw();

    document.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled, view]);

  return (
    <>
      {/* Column grid behind every page */}
      <div className="page-grid" aria-hidden="true">
        <div className="grid h-full grid-cols-4 px-4 md:grid-cols-12 md:px-12">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={`page-grid__col relative ${i >= 4 ? "hidden md:block" : ""}`}>
              <span
                className="page-grid__num absolute top-(--header-h) left-1.5 font-mono text-[11px] text-signal"
                style={{ "--i": i } as React.CSSProperties}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {enabled && (
        <>
          <div ref={box} className="sys-box sys-ui" aria-hidden="true" style={{ opacity: 0 }}>
            <span ref={tag} className="sys-tag" />
            <span className="sys-dim sys-dim--w">
              <span ref={w} className="sys-dim__label" />
            </span>
            <span className="sys-dim sys-dim--h">
              <span ref={h} className="sys-dim__label" />
            </span>
            <div ref={gap} className="sys-dim sys-dim--gap" style={{ display: "none", left: "1.5rem", top: "100%" }}>
              <span ref={gapLabel} className="sys-dim__label" />
            </div>
          </div>

          <div
            role="group"
            aria-label="View mode"
            className="sys-ui sys-switch fixed bottom-6 left-6 z-40 flex items-center gap-1 rounded-xl border border-ink/10 bg-beige/90 p-1 font-mono text-[11px] tracking-[0.08em] uppercase shadow-[0_10px_30px_-15px_rgb(0_0_0/0.3)] backdrop-blur"
          >
            {(
              [
                { id: "design", label: "Design", Icon: Eye },
                { id: "system", label: "System", Icon: Ruler },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                aria-keyshortcuts="S"
                onClick={() => setView(id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 transition-colors duration-300 ${
                  view === id ? (id === "system" ? "bg-signal text-white" : "bg-ink text-white") : "text-grey-400 hover:text-ink"
                }`}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
