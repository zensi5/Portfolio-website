"use client";

import { useEffect, useRef } from "react";
import { MOTION_OK } from "@/lib/gsap";

/** Decorative looping video: plays only while on screen and stays on its poster for reduced motion. */
export function LoopVideo({
  sources,
  poster,
  className = "",
}: {
  sources: { src: string; type: string }[];
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current!;
    if (!window.matchMedia(MOTION_OK).matches) return;
    let visible = false;
    const sync = () => (visible ? video.play().catch(() => {}) : video.pause());
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && video.preload === "none") video.preload = "auto";
      sync();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-hidden="true">
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
