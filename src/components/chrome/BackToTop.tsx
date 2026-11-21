"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const R = 22;
const C = 2 * Math.PI * R;

/** Floating arrow that shows how far down the page you are and takes you back up. */
export function BackToTop() {
  const ring = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      ring.current?.style.setProperty("stroke-dashoffset", String(C * (1 - p)));
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`back-to-top group fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-white/90 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.35)] backdrop-blur transition-[opacity,transform] duration-500 ease-(--ease-soft) md:right-6 md:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r={R} fill="none" stroke="rgb(0 0 0 / 0.08)" strokeWidth="2" />
        <circle
          ref={ring}
          cx="28"
          cy="28"
          r={R}
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <ArrowUp className="size-5 transition-transform duration-500 ease-(--ease-soft) group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
