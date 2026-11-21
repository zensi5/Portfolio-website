"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Square cursor that trails the pointer (after the Clapat "Jetton" template).
 * Grows into an outline over links and buttons, shows a label over [data-cursor],
 * and steps aside over text fields. Only on devices with a fine pointer.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-cursor");

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    const ratio = reduce ? 1 : 0.2;
    const setX = gsap.quickSetter(el, "x", "px");
    const setY = gsap.quickSetter(el, "y", "px");
    gsap.set(el, { xPercent: -50, yPercent: -50 });

    const tick = () => {
      pos.x += (mouse.x - pos.x) * ratio;
      pos.y += (mouse.y - pos.y) * ratio;
      setX(pos.x);
      setY(pos.y);
    };
    gsap.ticker.add(tick);

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      el.style.opacity = "1";

      const target = e.target as Element;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (target.closest("input, textarea, select")) el.dataset.state = "text";
      else if (target.closest("a, button, label, [role='button']")) el.dataset.state = "link";
      else if (labelled) {
        el.dataset.state = "label";
        if (label.current) label.current.textContent = labelled.dataset.cursor ?? "";
      } else el.dataset.state = "";

      // Feed the pointer position to any spotlight tile underneath
      const spot = target.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const onLeave = () => (el.style.opacity = "0");
    const onDown = () => gsap.to(el, { scale: 0.8, duration: 0.15 });
    const onUp = () => gsap.to(el, { scale: 1, duration: 0.3, ease: "back.out(3)" });

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true" style={{ opacity: 0 }}>
      <span ref={label} className="cursor__label" />
    </div>
  );
}
