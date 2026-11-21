"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { LoopVideo } from "../motion/LoopVideo";

/**
 * Signature scroll moment from the Webflow site: a small window between
 * "I build" and "for Modern Web" opens to full bleed as you scroll,
 * revealing "Interfaces that become Experiences".
 */
export function Build() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const section = ref.current!;
        const chip = () => {
          const small = window.innerWidth < 768;
          return { w: window.innerWidth * (small ? 0.28 : 0.12), h: window.innerHeight * (small ? 0.08 : 0.1) };
        };
        const frameInset = () => (window.innerWidth < 768 ? 12 : 24);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          ".build-window",
          {
            clipPath: () => {
              const c = chip();
              return `inset(${(window.innerHeight - c.h) / 2}px ${(window.innerWidth - c.w) / 2}px round 16px)`;
            },
          },
          { clipPath: () => `inset(${frameInset()}px ${frameInset()}px round 32px)`, duration: 1 },
          0,
        )
          .fromTo(".build-media", { scale: 1.4 }, { scale: 1, duration: 1 }, 0)
          .fromTo(".build-left", { x: 0 }, { x: () => -(window.innerWidth / 2), duration: 1 }, 0)
          .fromTo(".build-right", { x: 0 }, { x: () => window.innerWidth / 2, duration: 1 }, 0)
          .fromTo(
            ".build-text",
            { opacity: 0, y: "1.5rem" },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            window.innerWidth < 768 ? 0.6 : 0.45,
          )
          .to(".build-note", { opacity: 0, duration: 0.15 }, 0.7)
          .to({}, { duration: 0.25 });

        // "Keep scrolling" types itself in when the section arrives
        const note = SplitText.create(".build-note", { type: "chars", aria: "none" });
        gsap.from(note.chars, {
          opacity: 0,
          y: "0.5rem",
          duration: 0.33,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="build-heading" className="build relative">
      <h2 id="build-heading" className="sr-only">
        I build interfaces that become experiences for the modern web
      </h2>
      <div className="build-sticky sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <p aria-hidden="true" className="build-note absolute top-8 z-20 font-mono text-sm tracking-[0.1em] text-grey-300 uppercase">
          Keep scrolling
        </p>

        <div className="build-window absolute inset-3 overflow-hidden rounded-[2rem] bg-night md:inset-6">
          <LoopVideo
            className="build-media absolute inset-0 size-full object-cover"
            poster="/media/build-poster.webp"
            sources={[
              { src: "/media/build.webm", type: "video/webm" },
              { src: "/media/build.mp4", type: "video/mp4" },
            ]}
          />
          <p
            aria-hidden="true"
            className="build-text absolute inset-0 grid place-items-center px-6 text-center text-[1.75rem] leading-[1.05] tracking-[-0.02em] text-white md:text-[3.5rem]"
          >
            <span className="[text-shadow:0_2px_24px_rgb(0_0_0/0.55)] md:whitespace-nowrap">
              <span className="build-static block">I build</span>
              Interfaces that become Experiences
              <span className="build-static block">for Modern Web</span>
            </span>
          </p>
        </div>

        <p aria-hidden="true" className="build-left build-side right-[calc(50%+14vw+0.5rem)] md:right-[calc(50%+6vw+0.75rem)]">
          I build
        </p>
        <p aria-hidden="true" className="build-side build-right left-[calc(50%+14vw+0.5rem)] md:left-[calc(50%+6vw+0.75rem)]">
          for Modern Web
        </p>
      </div>
    </section>
  );
}
