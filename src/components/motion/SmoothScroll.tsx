"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/** Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. Off for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
