"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Words fill from grey to ink as the text scrolls through the viewport.
 * Text renders fully inked by default, so reduced motion and no-JS read normally.
 */
export function ScrubText({
  as: Tag = "p",
  children,
  className = "",
  from = "#6b6b6b",
  start = "top 85%",
  end = "bottom 45%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  from?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(ref.current!, { type: "words" });
        gsap.fromTo(
          split.words,
          { color: from },
          {
            color: "currentColor",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start, end, scrub: 0.8 },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
